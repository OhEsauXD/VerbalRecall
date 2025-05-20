
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toeflTestSections, ToeflQuestion, ToeflAnswer, ToeflTestState, INITIAL_TEST_DURATION, TOTAL_SECTIONS } from '@/lib/toeflTestData';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Home } from 'lucide-react'; // Import Home icon

const ToeflSectionPage = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const sectionId = parseInt(params.id as string, 10);

  const [currentSectionData, setCurrentSectionData] = useState(toeflTestSections.find(sec => sec.id === sectionId));
  const [testState, setTestState] = useState<ToeflTestState | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showNextSectionDialog, setShowNextSectionDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false); // New state for cancel dialog

  const loadState = useCallback(() => {
    const savedStateRaw = localStorage.getItem('toeflTestState');
    if (savedStateRaw) {
      const savedState: ToeflTestState = JSON.parse(savedStateRaw);
      
      const elapsed = savedState.startTime ? Math.floor((Date.now() - savedState.startTime) / 1000) : 0;
      const timeRemaining = Math.max(0, INITIAL_TEST_DURATION - elapsed);

      const newState: ToeflTestState = {
        ...savedState, 
        currentSection: sectionId, 
        timeRemaining: timeRemaining,
      };

      if (!savedState.startTime || !savedState.answers || savedState.answers.length === 0) {
        newState.startTime = savedState.startTime || Date.now(); 
        newState.timeRemaining = savedState.startTime ? timeRemaining : INITIAL_TEST_DURATION;
        if (!savedState.answers || savedState.answers.length === 0) {
             newState.answers = toeflTestSections.flatMap(sec =>
                sec.questions.map(q => ({ questionId: q.id, selectedOptionIndex: null }))
            );
        }
      }
      
      setTestState(newState);
      localStorage.setItem('toeflTestState', JSON.stringify(newState)); 
      if (newState.timeRemaining <= 0 && !isTimeUp) setIsTimeUp(true);

    } else {
      const initialAnswers = toeflTestSections.flatMap(sec =>
        sec.questions.map(q => ({ questionId: q.id, selectedOptionIndex: null }))
      );
      const newState: ToeflTestState = {
        currentSection: sectionId,
        answers: initialAnswers,
        startTime: Date.now(),
        timeRemaining: INITIAL_TEST_DURATION,
      };
      setTestState(newState);
      localStorage.setItem('toeflTestState', JSON.stringify(newState));
    }
  }, [sectionId, isTimeUp]);

  useEffect(() => {
    loadState();
    setCurrentSectionData(toeflTestSections.find(sec => sec.id === sectionId));
  }, [sectionId, loadState]);

  useEffect(() => {
    if (!testState || !testState.startTime || isTimeUp) return;

    const timerInterval = setInterval(() => {
      setTestState(prev => {
        if (!prev || !prev.startTime) return prev;
        const elapsed = Math.floor((Date.now() - prev.startTime!) / 1000);
        const remaining = Math.max(0, INITIAL_TEST_DURATION - elapsed);
        
        const updatedState = { ...prev, timeRemaining: remaining };
        
        if (remaining <= 0 && !isTimeUp) { 
          setIsTimeUp(true);
          clearInterval(timerInterval);
          toast({ title: "Time's Up!", description: "Navigating to results.", variant: 'destructive' });
          localStorage.setItem('toeflTestState', JSON.stringify(updatedState)); 
          router.push('/toefl-practice/results');
          return updatedState;
        }
        if (remaining > 0) {
            localStorage.setItem('toeflTestState', JSON.stringify(updatedState));
        }
        return updatedState;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [testState, isTimeUp, router, toast]);


  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    if (isTimeUp || !testState) return;
    setTestState(prev => {
      if (!prev) return null;
      const newAnswers = prev.answers.map(ans =>
        ans.questionId === questionId ? { ...ans, selectedOptionIndex: optionIndex } : ans
      );
      const newState = { ...prev, answers: newAnswers };
      localStorage.setItem('toeflTestState', JSON.stringify(newState));
      return newState;
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const allQuestionsAnswered = currentSectionData?.questions.every(q =>
    testState?.answers.find(a => a.questionId === q.id)?.selectedOptionIndex !== null
  );

  const handleNextSection = () => {
    if (!currentSectionData || !testState) return;
    if (!allQuestionsAnswered) {
      toast({ title: "Incomplete Section", description: "Please answer all questions before proceeding.", variant: 'destructive' });
      return;
    }
    setShowNextSectionDialog(true);
  };
  
  const confirmNextSection = () => {
    setShowNextSectionDialog(false);
    if (!currentSectionData || !testState) return;

    const nextSectionId = currentSectionData.id + 1;
    localStorage.setItem('toeflTestState', JSON.stringify(testState)); 
    
    if (nextSectionId <= TOTAL_SECTIONS) {
      router.push(`/toefl-practice/section/${nextSectionId}`);
    } else {
      router.push('/toefl-practice/results');
    }
  };

  const handleCancelTest = () => {
    localStorage.removeItem('toeflTestState');
    sessionStorage.removeItem('toeflUserInfo'); // Ensure user info is also cleared
    router.push('/');
  };


  if (!currentSectionData || !testState) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading section...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="flex justify-between items-center mb-6 sticky top-0 bg-background py-2 z-10">
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-sm">
                <Home className="mr-2 h-4 w-4" /> Cancelar y Volver al Inicio
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Si vuelves al inicio, tu progreso en esta prueba se perderá. ¿Deseas continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continuar Prueba</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelTest} className="bg-destructive hover:bg-destructive/90">
                Salir y Perder Progreso
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
                {currentSectionData.title}
            </h1>
            <p className="text-sm text-muted-foreground">
                {currentSectionData.topic} (Sección {currentSectionData.id} de {TOTAL_SECTIONS})
            </p>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground">Progreso Global</div>
          <div className={`text-xl font-semibold ${testState.timeRemaining < 300 && testState.timeRemaining > 0 ? 'text-destructive' : 'text-foreground'}`}>
            Tiempo: {formatTime(testState.timeRemaining)}
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Reading Passage */}
        <div className="md:w-3/5 prose prose-lg dark:prose-invert max-w-none bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-accent">{currentSectionData.topic}</h2>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto text-base leading-relaxed pr-2">
            {currentSectionData.passage.split('\\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="md:w-2/5 space-y-6">
          {currentSectionData.questions.map((q, qIndex) => (
            <Card key={q.id} className="bg-card p-4 rounded-lg shadow">
              <p className="text-lg font-semibold mb-3 text-card-foreground">{qIndex + 1}. {q.questionText}</p>
              <RadioGroup
                // Ensure key changes when question changes to reset RadioGroup internal state if needed
                key={`${q.id}-options`} 
                value={testState.answers.find(a => a.questionId === q.id)?.selectedOptionIndex?.toString()}
                onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                disabled={isTimeUp}
                aria-label={`Question ${qIndex + 1}`}
              >
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={optIndex.toString()} id={`${q.id}-opt-${optIndex}`} />
                    <Label htmlFor={`${q.id}-opt-${optIndex}`} className="text-base text-card-foreground cursor-pointer">{String.fromCharCode(97 + optIndex)}) {opt.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>
          ))}
        </div>
      </div>

      <footer className="mt-8 text-center">
         <AlertDialog open={showNextSectionDialog} onOpenChange={setShowNextSectionDialog}>
            <AlertDialogTrigger asChild>
                 <Button
                    onClick={handleNextSection}
                    disabled={isTimeUp || !allQuestionsAnswered}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
                  >
                    {currentSectionData.id === TOTAL_SECTIONS ? 'Finish Test' : 'Next Section'}
                  </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Confirm Navigation</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to move to the {currentSectionData.id === TOTAL_SECTIONS ? 'results page' : 'next section'}? You cannot return to this section.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmNextSection}>Proceed</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </footer>
       {isTimeUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 text-center bg-background">
            <CardTitle className="text-2xl text-destructive mb-4">Time's Up!</CardTitle>
            <CardDescription className="mb-4">Your time for the test has expired. Your answers have been submitted.</CardDescription>
            <Button onClick={() => router.push('/toefl-practice/results')}>View Results</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ToeflSectionPage;

