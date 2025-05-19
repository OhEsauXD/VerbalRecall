
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Placeholder for a more specific component to render each question type
const GrammarQuestionRenderer: React.FC<{
    question: ToeflGrammarQuestion;
    currentAnswer: ToeflGrammarAnswer | undefined;
    onAnswerChange: (answer: Partial<ToeflGrammarAnswer>) => void;
    isTimeUp: boolean;
}> = ({ question, currentAnswer, onAnswerChange, isTimeUp }) => {
    
    // Find the corresponding answer for the current question
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
        // Basic placeholder for paragraph editing
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
  
  // sectionId from URL is the 1-based index of the grammar *section* (1-5)
  const currentDisplaySectionId = parseInt(params.id as string, 10);

  const [testState, setTestState] = useState<ToeflGrammarTestState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<ToeflGrammarQuestion | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<ToeflGrammarAnswer | undefined>(undefined);
  
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showNextSectionDialog, setShowNextSectionDialog] = useState(false);

  // Derived states
  const currentGlobalQIndex = testState?.currentGlobalQuestionIndex ?? 0;
  const { sectionId: actualCurrentSectionId, questionIndexInSection } = getGrammarSectionAndQuestionIndex(currentGlobalQIndex);


  const loadStateAndQuestion = useCallback(() => {
    const savedStateRaw = localStorage.getItem('toeflGrammarTestState');
    if (savedStateRaw) {
      const savedState: ToeflGrammarTestState = JSON.parse(savedStateRaw);
      
      const elapsed = savedState.startTime ? Math.floor((Date.now() - savedState.startTime) / 1000) : 0;
      const timeRemaining = Math.max(0, INITIAL_GRAMMAR_TEST_DURATION - elapsed);

      const updatedState = { ...savedState, timeRemaining };
      setTestState(updatedState);

      if (timeRemaining <= 0 && !isTimeUp) {
        setIsTimeUp(true);
      }
      
      const { sectionId: targetSectionId, questionIndexInSection: targetQIndexInSection } = getGrammarSectionAndQuestionIndex(updatedState.currentGlobalQuestionIndex);
      const sectionData = toeflGrammarTestSections.find(sec => sec.id === targetSectionId);
      
      if (sectionData && sectionData.questions[targetQIndexInSection]) {
        setCurrentQuestion(sectionData.questions[targetQIndexInSection]);
        const existingAnswer = updatedState.sectionStates[targetSectionId]?.answers.find(
          a => a.questionId === sectionData.questions[targetQIndexInSection].id
        );
        setCurrentAnswer(existingAnswer || { questionId: sectionData.questions[targetQIndexInSection].id, isMarkedForReview: false });
      } else {
        // End of test or invalid index
        router.push('/toefl-grammar/results');
      }
    } else {
      // No saved state, should redirect to start
      router.push('/toefl-grammar/start');
    }
  }, [router, isTimeUp]);

  useEffect(() => {
    loadStateAndQuestion();
  }, [currentGlobalQIndex, loadStateAndQuestion]); // Reload when global index changes

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
        const newAnswerData = { ...(prev || { questionId: currentQuestion.id, isMarkedForReview: false }), ...answerUpdate };
        
        setTestState(currentState => {
            if (!currentState) return null;
            const { sectionId: currentSId } = getGrammarSectionAndQuestionIndex(currentState.currentGlobalQuestionIndex);
            const sectionAnswers = [...(currentState.sectionStates[currentSId]?.answers || [])];
            const existingAnswerIndex = sectionAnswers.findIndex(a => a.questionId === currentQuestion.id);

            if (existingAnswerIndex > -1) {
                sectionAnswers[existingAnswerIndex] = newAnswerData;
            } else {
                sectionAnswers.push(newAnswerData);
            }
            const updatedSectionStates = {
                ...currentState.sectionStates,
                [currentSId]: { ...currentState.sectionStates[currentSId], answers: sectionAnswers }
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

    if (newSectionId !== oldSectionId && direction === 'next') {
      // Moving to the start of a new section
      setShowNextSectionDialog(true); // Or show review screen first
    } else if (newGlobalIndex === (TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION) -1 && direction === 'next' && (questionIndexInSection === QUESTIONS_PER_GRAMMAR_SECTION -1)){
       // This logic is tricky, if it's the last question of the last section, "Next" should behave like "Finish Section"
       setShowReviewDialog(true);
    }
    else {
      setTestState(prev => prev ? { ...prev, currentGlobalQuestionIndex: newGlobalIndex } : null);
    }
  };
  
  const handleFinishSection = () => {
      // Logic to show review screen or directly go to next section dialog
      setShowReviewDialog(true); // For now, always show review dialog
  };

  const confirmProceedToNextSection = () => {
    setShowNextSectionDialog(false);
    if (!testState) return;
    
    const nextGlobalIndex = testState.currentGlobalQuestionIndex + 1; // This assumes we are at the end of a section
    const { sectionId: nextSectionId } = getGrammarSectionAndQuestionIndex(nextGlobalIndex);

    if (nextSectionId <= TOTAL_GRAMMAR_SECTIONS && nextGlobalIndex < (TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION)) {
         setTestState(prev => prev ? { ...prev, currentGlobalQuestionIndex: nextGlobalIndex } : null);
         router.push(`/toefl-grammar/section/${nextSectionId}`);
    } else {
      // Last section completed, go to results
      router.push('/toefl-grammar/results');
    }
  };
  
  const confirmReviewAndProceed = () => {
    setShowReviewDialog(false);
    if (!testState) return;

    const currentGlobalIdx = testState.currentGlobalQuestionIndex;
    const { sectionId: currentSectId, questionIndexInSection: qIdxInSect } = getGrammarSectionAndQuestionIndex(currentGlobalIdx);
    
    if (qIdxInSect === QUESTIONS_PER_GRAMMAR_SECTION - 1) { // If it's the last question of the current section
        const nextSectionId = currentSectId + 1;
        if (nextSectionId <= TOTAL_GRAMMAR_SECTIONS) {
            const nextGlobalQuestionIndex = currentSectId * QUESTIONS_PER_GRAMMAR_SECTION;
            setTestState(prev => prev ? { ...prev, currentGlobalQuestionIndex: nextGlobalQuestionIndex } : null);
            router.push(`/toefl-grammar/section/${nextSectionId}`);
        } else {
            router.push('/toefl-grammar/results');
        }
    } else {
        // This case should ideally not be hit if review is only at section end
        // but as a fallback, just advance to the next question in the current section
        handleNavigateQuestion('next');
    }
  };


  if (!currentQuestion || !testState) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading grammar question...</div>;
  }

  const isLastQuestionOfTest = currentGlobalQIndex === (TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION) - 1;
  const isLastQuestionOfSection = questionIndexInSection === QUESTIONS_PER_GRAMMAR_SECTION - 1;


  return (
    <TooltipProvider>
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

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-accent flex items-center">
            {currentQuestion.type === 'sentenceRestructuring' ? (currentQuestion as SentenceRestructuringQuestion).prompt : `Pregunta ${questionIndexInSection + 1}`}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                        <Info className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{currentQuestion.category}</p> {/* Simple tooltip for now */}
                </TooltipContent>
            </Tooltip>
          </CardTitle>
          {currentQuestion.type === 'sentenceRestructuring' && <CardDescription>{(currentQuestion as SentenceRestructuringQuestion).originalSentence}</CardDescription>}
           {currentQuestion.type === 'sentenceCompletion' && <CardDescription>{(currentQuestion as SentenceCompletionQuestion).questionText.replace('___', '_____')}</CardDescription>}

        </CardHeader>
        <CardContent>
          <GrammarQuestionRenderer 
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
                {actualCurrentSectionId === TOTAL_GRAMMAR_SECTIONS ? 'Finalizar Prueba' : 'Finalizar Sección y Revisar'}
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

      {/* Section Review Dialog Placeholder */}
      <AlertDialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revisión de Sección {actualCurrentSectionId}</AlertDialogTitle>
            <AlertDialogDescription>
              Aquí se mostraría un resumen de las preguntas (respondidas, marcadas, no respondidas).
              <br/> ¿Desea continuar a la siguiente sección o finalizar la prueba?
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
      
      {/* Next Section Confirmation Dialog (simplified) */}
      <AlertDialog open={showNextSectionDialog} onOpenChange={setShowNextSectionDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Navegación</AlertDialogTitle>
            <AlertDialogDescription>
                ¿Está seguro que desea continuar a la siguiente sección? No podrá regresar a esta sección.
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
    </TooltipProvider>
  );
};

export default ToeflGrammarSectionPage;
