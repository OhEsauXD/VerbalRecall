
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  toeflGrammarTestSections,
  ToeflGrammarQuestion,
  ToeflGrammarTestState,
  INITIAL_GRAMMAR_TEST_DURATION,
  TOTAL_GRAMMAR_SECTIONS,
  QUESTIONS_PER_GRAMMAR_SECTION,
  SentenceCompletionQuestion,
  ErrorIdentificationQuestion,
  ParagraphEditingQuestion,
  SentenceRestructuringQuestion,
  ToeflGrammarAnswer,
  getGrammarSectionAndQuestionIndex,
} from '@/lib/toeflGrammarTestData';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Import Chevron icons
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Placeholder for a more specific component to render each question type
const GrammarQuestionRenderer: React.FC<{
    question: ToeflGrammarQuestion;
    currentAnswer: ToeflGrammarAnswer | undefined;
    onAnswerChange: (answer: Partial<ToeflGrammarAnswer>) => void;
    isTimeUp: boolean;
}> = ({ question, currentAnswer, onAnswerChange, isTimeUp }) => {
    
    const questionAnswer = currentAnswer?.questionId === question.id ? currentAnswer : undefined;

    switch (question.type) {
        case 'sentenceCompletion':
        case 'sentenceRestructuring':
            const scQuestion = question as SentenceCompletionQuestion | SentenceRestructuringQuestion;
            return (
                <RadioGroup
                    value={questionAnswer?.selectedOptionIndex?.toString()}
                    onValueChange={(value) => onAnswerChange({ selectedOptionIndex: parseInt(value) })}
                    disabled={isTimeUp}
                    className="space-y-2"
                >
                    {scQuestion.options.map((opt, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`${question.id}-opt-${index}`} />
                            <Label htmlFor={`${question.id}-opt-${index}`} className="text-base text-card-foreground cursor-pointer">
                                {String.fromCharCode(97 + index)}) {opt.text}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            );
        case 'errorIdentification':
            const eiQuestion = question as ErrorIdentificationQuestion;
            return (
                <div className="space-y-2">
                    <p className="text-lg text-card-foreground mb-3">
                        {eiQuestion.sentenceParts.map(part => (
                            <span key={part.id} className={part.id === questionAnswer?.selectedErrorPartId ? 'underline decoration-primary decoration-2' : ''}>
                                {part.text}{part.id !== eiQuestion.sentenceParts[eiQuestion.sentenceParts.length -1].id ? ' ' : ''}
                            </span>
                        ))}
                    </p>
                    <RadioGroup
                        value={questionAnswer?.selectedErrorPartId ?? undefined}
                        onValueChange={(value) => onAnswerChange({ selectedErrorPartId: value })}
                        disabled={isTimeUp}
                        className="flex flex-wrap gap-2"
                    >
                        {eiQuestion.sentenceParts.map(part => (
                            <div key={part.id} className="flex items-center">
                                <RadioGroupItem value={part.id} id={`${question.id}-part-${part.id}`} />
                                <Label htmlFor={`${question.id}-part-${part.id}`} className="ml-2 cursor-pointer">{part.id}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            );
        case 'paragraphEditing':
            const peQuestion = question as ParagraphEditingQuestion;
            return (
                <div className="space-y-4">
                    <p className="text-base text-card-foreground whitespace-pre-line">{peQuestion.paragraphText}</p>
                    {Object.entries(peQuestion.gaps).map(([gapNum, gapData]) => (
                        <div key={gapNum}>
                            <Label className="font-semibold">Gap [{gapNum}]{gapData.prompt ? `: ${gapData.prompt}` : ''}</Label>
                            <RadioGroup
                                value={questionAnswer?.selectedGapAnswers?.[gapNum] ?? undefined}
                                onValueChange={(value) => {
                                    const existingAnswers = questionAnswer?.selectedGapAnswers || {};
                                    onAnswerChange({ selectedGapAnswers: {...existingAnswers, [gapNum]: value }});
                                }}
                                disabled={isTimeUp}
                                className="mt-1 space-y-1"
                            >
                                {gapData.options.map((opt, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt.text} id={`${question.id}-gap${gapNum}-opt-${index}`} />
                                        <Label htmlFor={`${question.id}-gap${gapNum}-opt-${index}`} className="cursor-pointer">{opt.text}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>
            );
        default:
            return <p className="text-destructive">Unsupported question type</p>;
    }
};


const ToeflGrammarSectionPage = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const currentDisplaySectionId = parseInt(params.id as string, 10);

  const [testState, setTestState] = useState<ToeflGrammarTestState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<ToeflGrammarQuestion | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<ToeflGrammarAnswer | undefined>(undefined);
  
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showNextSectionDialog, setShowNextSectionDialog] = useState(false);
  const [isInstructionVisible, setIsInstructionVisible] = useState(true); // New state for instruction visibility

  const currentGlobalQIndex = testState?.currentGlobalQuestionIndex ?? 0;
  const { sectionId: actualCurrentSectionId, questionIndexInSection } = getGrammarSectionAndQuestionIndex(currentGlobalQIndex);


  const loadStateAndQuestion = useCallback(() => {
    const savedStateRaw = localStorage.getItem('toeflGrammarTestState');
    if (savedStateRaw) {
      const savedState: ToeflGrammarTestState = JSON.parse(savedStateRaw);
      
      const elapsed = savedState.startTime ? Math.floor((Date.now() - savedState.startTime) / 1000) : 0;
      const timeRemaining = Math.max(0, INITIAL_GRAMMAR_TEST_DURATION - elapsed);

      const currentGlobalIdxFromStorage = savedState.currentGlobalQuestionIndex;
      const updatedState = { ...savedState, timeRemaining, currentGlobalQuestionIndex: currentGlobalIdxFromStorage };
      
      setTestState(updatedState); 

      if (timeRemaining <= 0 && !isTimeUp) {
        setIsTimeUp(true);
      }
      
      const { sectionId: targetSectionId, questionIndexInSection: targetQIndexInSection } = getGrammarSectionAndQuestionIndex(currentGlobalIdxFromStorage);
      const sectionData = toeflGrammarTestSections.find(sec => sec.id === targetSectionId);
      
      if (sectionData && sectionData.questions[targetQIndexInSection]) {
        setCurrentQuestion(sectionData.questions[targetQIndexInSection]);
        const existingAnswer = updatedState.sectionStates[targetSectionId]?.answers.find(
          a => a.questionId === sectionData.questions[targetQIndexInSection].id
        );
        setCurrentAnswer(existingAnswer || { questionId: sectionData.questions[targetQIndexInSection].id, isMarkedForReview: false });
        // Set instruction visibility based on question index in section
        setIsInstructionVisible(targetQIndexInSection === 0);
      } else {
        // This case could mean end of test or invalid index.
        // If currentGlobalIdxFromStorage is beyond the last question, navigate to results.
        if (currentGlobalIdxFromStorage >= TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION) {
            router.push('/toefl-grammar/results');
        }
        // If it's just an issue finding current section data for a valid index, might indicate bad state or navigation.
        // For now, a push to results might be too aggressive. Consider logging or a soft redirect.
        // console.error("Could not load question data for index:", currentGlobalIdxFromStorage);
        // If section data is fine but specific question not found, it's also an issue.
      }
    } else {
      router.push('/toefl-grammar/start');
    }
  }, [router, isTimeUp]); // Removed params.id as it's not directly used here, loadStateAndQuestion is the primary dep

  useEffect(() => {
    loadStateAndQuestion();
  }, [params.id, loadStateAndQuestion]); 

   useEffect(() => {
    // This effect now specifically listens to changes in the global question index
    // in the testState, which is modified by navigation actions.
    if (testState?.currentGlobalQuestionIndex !== undefined) {
        loadStateAndQuestion();
    }
  }, [testState?.currentGlobalQuestionIndex, loadStateAndQuestion]);


  useEffect(() => {
    if (!testState || !testState.startTime || isTimeUp) return;

    const timerInterval = setInterval(() => {
      setTestState(prev => {
        if (!prev || !prev.startTime) return prev;
        const elapsed = Math.floor((Date.now() - prev.startTime) / 1000);
        const remaining = Math.max(0, INITIAL_GRAMMAR_TEST_DURATION - elapsed);
        
        const updatedState = { ...prev, timeRemaining: remaining };
        
        if (remaining <= 0 && !isTimeUp) {
          setIsTimeUp(true);
          clearInterval(timerInterval);
          toast({ title: "Time's Up!", description: "Navigating to results.", variant: 'destructive' });
          localStorage.setItem('toeflGrammarTestState', JSON.stringify(updatedState));
          router.push('/toefl-grammar/results');
          return updatedState;
        }
        if (remaining > 0) {
            // Save state periodically only if time is not up
            // Consider throttling this if performance becomes an issue,
            // but for now, saving every second is usually fine.
            localStorage.setItem('toeflGrammarTestState', JSON.stringify(updatedState));
        }
        return updatedState;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [testState, isTimeUp, router, toast]);

  const handleAnswerChange = (answerUpdate: Partial<ToeflGrammarAnswer>) => {
    if (isTimeUp || !currentQuestion || !testState) return;

    setCurrentAnswer(prev => {
        // Ensure newAnswerData is correctly formed for the *current* question
        const newAnswerData = { ...(prev && prev.questionId === currentQuestion.id ? prev : { questionId: currentQuestion.id, isMarkedForReview: false }), ...answerUpdate };
        
        setTestState(currentState => {
            if (!currentState) return null;
            const { sectionId: currentSId } = getGrammarSectionAndQuestionIndex(currentState.currentGlobalQuestionIndex);
            // Ensure sectionStates[currentSId] exists
            const currentSectionState = currentState.sectionStates[currentSId] || { answers: [] };
            const sectionAnswers = [...currentSectionState.answers];
            const existingAnswerIndex = sectionAnswers.findIndex(a => a.questionId === currentQuestion.id);

            if (existingAnswerIndex > -1) {
                sectionAnswers[existingAnswerIndex] = newAnswerData;
            } else {
                sectionAnswers.push(newAnswerData);
            }
            const updatedSectionStates = {
                ...currentState.sectionStates,
                [currentSId]: { ...currentSectionState, answers: sectionAnswers }
            };
            const updatedTestState = { ...currentState, sectionStates: updatedSectionStates };
            localStorage.setItem('toeflGrammarTestState', JSON.stringify(updatedTestState));
            return updatedTestState;
        });
        return newAnswerData;
    });
  };

  const toggleMarkForReview = () => {
    if (!currentQuestion) return;
    handleAnswerChange({ isMarkedForReview: !currentAnswer?.isMarkedForReview });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNavigateQuestion = (direction: 'next' | 'prev') => {
    if (!testState) return;
    let newGlobalIndex = testState.currentGlobalQuestionIndex;
    if (direction === 'next') {
      newGlobalIndex = Math.min(newGlobalIndex + 1, (TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION) - 1);
    } else {
      newGlobalIndex = Math.max(newGlobalIndex - 1, 0);
    }

    const { sectionId: newSectionId } = getGrammarSectionAndQuestionIndex(newGlobalIndex);
    const { sectionId: oldSectionId } = getGrammarSectionAndQuestionIndex(testState.currentGlobalQuestionIndex);

    // Determine if it's the last question of the current section trying to go next
    const isLastOfCurrentSection = questionIndexInSection === QUESTIONS_PER_GRAMMAR_SECTION -1;
    
    if (newSectionId !== oldSectionId && direction === 'next') {
      // This case means user is trying to go from, e.g., Q10 of S1 to S2.
      // The actual navigation to the new section page will happen in confirmProceedToNextSection or confirmReviewAndProceed
      // This dialog confirms if they want to leave the current section.
      setShowNextSectionDialog(true); 
    } else if (isLastOfCurrentSection && direction === 'next') { 
       // This means user is on the last question of a section (e.g., Q10 of S1) and clicks "Next".
       // Show the review dialog for the current section.
       setShowReviewDialog(true);
    }
    else {
      // Regular navigation within the same section
      setTestState(prev => {
        if (!prev) return null;
        const newState = { ...prev, currentGlobalQuestionIndex: newGlobalIndex };
        localStorage.setItem('toeflGrammarTestState', JSON.stringify(newState)); // Save updated state
        return newState;
      });
    }
  };
  
  const handleFinishSection = () => {
      // This is called when the user clicks the "Finish Section" button (which appears on the last question of a section)
      // or "Finish Test" (if it's the last question of the entire test).
      setShowReviewDialog(true); // Always show review dialog for the current section before proceeding
  };

  const confirmProceedToNextSection = () => {
    // This is called from the dialog that appears when trying to cross section boundaries
    // (e.g. from S1 Q10 to S2 Q1 by clicking "Next" on S1 Q10).
    setShowNextSectionDialog(false);
    if (!testState) return;
    
    // Calculate the global index of the first question of the *next* section.
    // actualCurrentSectionId is 1-indexed. If we are on section 1, next is section 2.
    // The first question of section 2 is at global index (2-1) * Q_PER_S = 1 * 10 = 10.
    const nextSectionFirstGlobalIndex = actualCurrentSectionId * QUESTIONS_PER_GRAMMAR_SECTION; 

    if (nextSectionFirstGlobalIndex < (TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION)) {
         setTestState(prev => {
             if (!prev) return null;
             const newState = { ...prev, currentGlobalQuestionIndex: nextSectionFirstGlobalIndex };
             localStorage.setItem('toeflGrammarTestState', JSON.stringify(newState));
             return newState;
         });
         router.push(`/toefl-grammar/section/${actualCurrentSectionId + 1}`);
    } else { // Should not happen if TOTAL_GRAMMAR_SECTIONS is correct, implies trying to go beyond last section.
      localStorage.setItem('toeflGrammarTestState', JSON.stringify(testState)); 
      router.push('/toefl-grammar/results');
    }
  };
  
  const confirmReviewAndProceed = () => {
    // Called from the "Finish Section" / "Finish Test" review dialog.
    setShowReviewDialog(false);
    if (!testState) return;

    // actualCurrentSectionId is 1-indexed.
    const nextSectionId = actualCurrentSectionId + 1;
    
    if (nextSectionId <= TOTAL_GRAMMAR_SECTIONS) {
        // Calculate the global index of the first question of the next section.
        // If current actualCurrentSectionId is 1, next global index is 1 * 10 = 10 (start of section 2).
        const nextGlobalQuestionIndex = actualCurrentSectionId * QUESTIONS_PER_GRAMMAR_SECTION;
        setTestState(prev => {
            if (!prev) return null;
            const newState = { ...prev, currentGlobalQuestionIndex: nextGlobalQuestionIndex };
            localStorage.setItem('toeflGrammarTestState', JSON.stringify(newState));
            return newState;
        });
        router.push(`/toefl-grammar/section/${nextSectionId}`);
    } else { 
        // This means it was the last section, go to results.
        localStorage.setItem('toeflGrammarTestState', JSON.stringify(testState)); 
        router.push('/toefl-grammar/results');
    }
  };

  const getQuestionTypeInstructions = (type: ToeflGrammarQuestion['type'] | undefined): React.ReactNode => {
    if (!type) return null;
    switch (type) {
      case 'sentenceCompletion':
        return (
          <ul className="list-disc pl-5 space-y-1 text-sm text-left text-muted-foreground">
            <li>Lee la oración completa para entender el contexto general.</li>
            <li>Presta atención a las palabras clave que rodean el espacio en blanco; pueden indicar el tiempo verbal, la concordancia necesaria, o la preposición correcta.</li>
            <li>Considera la estructura gramatical de la oración.</li>
            <li>Evalúa cada opción para ver cuál encaja mejor gramaticalmente y en significado.</li>
          </ul>
        );
      case 'errorIdentification':
        return (
          <ul className="list-disc pl-5 space-y-1 text-sm text-left text-muted-foreground">
            <li>Lee la oración completa cuidadosamente primero.</li>
            <li>Analiza cada parte subrayada (A, B, C, D) buscando errores comunes de gramática.</li>
            <li>Busca errores en: concordancia sujeto-verbo, tiempos verbales, pronombres, adjetivos/adverbios, preposiciones, artículos, estructura de la oración, y elección de palabras.</li>
            <li>Si no encuentras un error obvio, revisa si alguna parte suena extraña o poco natural en inglés formal.</li>
          </ul>
        );
      case 'paragraphEditing':
        return (
          <ul className="list-disc pl-5 space-y-1 text-sm text-left text-muted-foreground">
            <li>Lee el párrafo completo para captar la idea principal y el flujo del texto.</li>
            <li>Para cada espacio numerado, considera el contexto de las oraciones que lo rodean.</li>
            <li>Si hay una indicación (prompt) para el espacio, úsala como guía principal.</li>
            <li>Evalúa las opciones para cada espacio, buscando la que mejor complete la idea, mantenga la coherencia, la cohesión (uso de conectores, pronombres) y la corrección gramatical.</li>
            <li>Asegúrate de que los tiempos verbales sean consistentes y lógicos dentro del párrafo.</li>
          </ul>
        );
      case 'sentenceRestructuring':
        return (
          <ul className="list-disc pl-5 space-y-1 text-sm text-left text-muted-foreground">
            <li>Lee la oración original cuidadosamente para entender su significado completo.</li>
            <li>Analiza la indicación (prompt) para entender qué aspecto de la oración se debe enfatizar, clarificar o cómo debe ser reestructurada (ej. voz pasiva, empezar con una frase específica).</li>
            <li>Evalúa cada opción para ver cuál cumple mejor con la indicación, manteniendo el significado original (o el cambio de énfasis solicitado) y la corrección gramatical.</li>
            <li>Presta atención a los cambios en el orden de las palabras, la voz (activa/pasiva), el uso de conjunciones y la puntuación.</li>
          </ul>
        );
      default:
        return <p className="text-sm text-left text-muted-foreground">Selecciona la mejor opción para completar la pregunta.</p>;
    }
  };


  if (!currentQuestion || !testState) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading grammar question...</div>;
  }

  const isLastQuestionOfTest = currentGlobalQIndex === (TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION) - 1;
  const isLastQuestionOfSection = questionIndexInSection === QUESTIONS_PER_GRAMMAR_SECTION - 1;


  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="flex justify-between items-center mb-6 sticky top-0 bg-background py-2 z-10">
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary">
                TOEFL Gramática - Sección {actualCurrentSectionId}
            </h1>
            <p className="text-sm text-muted-foreground">Pregunta {questionIndexInSection + 1} de {QUESTIONS_PER_GRAMMAR_SECTION}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Progreso Global: {currentGlobalQIndex + 1} / {TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION}</div>
          <div className={`text-xl font-semibold ${testState.timeRemaining < 300 && testState.timeRemaining > 0 ? 'text-destructive' : 'text-foreground'}`}>
            Tiempo: {formatTime(testState.timeRemaining)}
          </div>
        </div>
      </header>

      {/* Instruction Section */}
      <Card className="w-full max-w-2xl mx-auto mb-4">
        <CardHeader className="p-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-md text-accent">
              Instrucciones para este tipo de pregunta ({currentQuestion.category})
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsInstructionVisible(!isInstructionVisible)} className="h-7 w-7">
              {isInstructionVisible ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        {isInstructionVisible && (
          <CardContent className="p-3 pt-0">
            {getQuestionTypeInstructions(currentQuestion?.type)}
          </CardContent>
        )}
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-accent">
            <span>
                {currentQuestion.type === 'sentenceRestructuring' ? (currentQuestion as SentenceRestructuringQuestion).prompt : `Pregunta ${questionIndexInSection + 1}`}
            </span>
          </CardTitle>
          {currentQuestion.type === 'sentenceRestructuring' && <CardDescription>Oración Original: {(currentQuestion as SentenceRestructuringQuestion).originalSentence}</CardDescription>}
          {currentQuestion.type === 'sentenceCompletion' && <CardDescription>{(currentQuestion as SentenceCompletionQuestion).questionText.replace('___', '_____')}</CardDescription>}
        </CardHeader>
        <CardContent>
          <GrammarQuestionRenderer 
            key={currentQuestion.id} 
            question={currentQuestion} 
            currentAnswer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            isTimeUp={isTimeUp}
          />
          <div className="mt-4 flex items-center space-x-2">
            <Checkbox 
                id={`mark-review-${currentQuestion.id}`}
                checked={currentAnswer?.isMarkedForReview || false}
                onCheckedChange={toggleMarkForReview}
                disabled={isTimeUp}
            />
            <Label htmlFor={`mark-review-${currentQuestion.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Marcar para Revisión
            </Label>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8 flex justify-between items-center max-w-2xl mx-auto">
        <Button 
            onClick={() => handleNavigateQuestion('prev')} 
            disabled={isTimeUp || currentGlobalQIndex === 0}
            variant="outline"
        >
            Anterior
        </Button>
        
        {isLastQuestionOfSection ? (
            <Button 
                onClick={handleFinishSection} 
                disabled={isTimeUp}
                className="bg-primary hover:bg-primary/90"
            >
                {actualCurrentSectionId === TOTAL_GRAMMAR_SECTIONS ? 'Finalizar Prueba' : 'Finalizar Sección'}
            </Button>
        ) : (
            <Button 
                onClick={() => handleNavigateQuestion('next')} 
                disabled={isTimeUp || isLastQuestionOfTest}
            >
                Siguiente
            </Button>
        )}
      </footer>

      <AlertDialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revisión de Sección {actualCurrentSectionId}</AlertDialogTitle>
            <AlertDialogDescription>
              Has llegado al final de esta sección. Aquí podrías revisar tus respuestas (función pendiente).
              <br/> ¿Deseas continuar a la siguiente sección o finalizar la prueba si es la última?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver a Preguntas</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReviewAndProceed}>
                {actualCurrentSectionId === TOTAL_GRAMMAR_SECTIONS ? 'Ver Resultados' : 'Siguiente Sección'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={showNextSectionDialog} onOpenChange={setShowNextSectionDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Navegación</AlertDialogTitle>
            <AlertDialogDescription>
                Estás a punto de pasar a la siguiente sección. No podrás regresar a la sección actual una vez que avances.
                ¿Estás seguro que deseas continuar?
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmProceedToNextSection}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {isTimeUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 text-center bg-background">
            <CardTitle className="text-2xl text-destructive mb-4">¡Tiempo Terminado!</CardTitle>
            <CardDescription className="mb-4">Su tiempo para la prueba ha expirado. Sus respuestas han sido enviadas.</CardDescription>
            <Button onClick={() => router.push('/toefl-grammar/results')}>Ver Resultados</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ToeflGrammarSectionPage;
