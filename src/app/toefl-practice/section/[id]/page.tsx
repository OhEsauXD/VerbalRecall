
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toeflTestSections, ToeflQuestion, ToeflAnswer, ToeflTestState, INITIAL_TEST_DURATION, TOTAL_SECTIONS } from '@/lib/toeflTestData';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardTitle, CardDescription } from '@/components/ui/card'; // Added Card imports
import { useToast } from '@/hooks/use-toast';

const ToeflSectionPage = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const sectionId = parseInt(params.id as string, 10);

  const [currentSectionData, setCurrentSectionData] = useState(toeflTestSections.find(sec => sec.id === sectionId));
  const [testState, setTestState] = useState<ToeflTestState | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showNextSectionDialog, setShowNextSectionDialog] = useState(false);

  const loadState = useCallback(() => {
    const savedStateRaw = localStorage.getItem('toeflTestState');
    if (savedStateRaw) {
      const savedState: ToeflTestState = JSON.parse(savedStateRaw);
      // If navigating to a different section than saved, or if it's a fresh start, reset appropriately
      if (savedState.currentSection !== sectionId || !savedState.startTime) {
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
      } else {
        // Recalculate time remaining if state is loaded
        const elapsed = Math.floor((Date.now() - savedState.startTime!) / 1000);
        const remaining = Math.max(0, INITIAL_TEST_DURATION - elapsed);
        savedState.timeRemaining = remaining;
        setTestState(savedState);
        if (remaining === 0) setIsTimeUp(true);
      }
    } else {
      // First time loading any section
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
  }, [sectionId]);

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
        if (remaining === 0) {
          setIsTimeUp(true);
          clearInterval(timerInterval);
          toast({ title: "Time's Up!", description: "Navigating to results.", variant: 'destructive' });
          router.push('/toefl-practice/results');
          return { ...prev, timeRemaining: 0 };
        }
        // Save state periodically
        localStorage.setItem('toeflTestState', JSON.stringify({ ...prev, timeRemaining: remaining }));
        return { ...prev, timeRemaining: remaining };
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
    if (nextSectionId <= TOTAL_SECTIONS) {
      const newState = { ...testState, currentSection: nextSectionId };
      localStorage.setItem('toeflTestState', JSON.stringify(newState));
      router.push(`/toefl-practice/section/${nextSectionId}`);
    } else {
      // Last section completed, go to results
      localStorage.setItem('toeflTestState', JSON.stringify(testState)); // Save final answers
      router.push('/toefl-practice/results');
    }
  };


  if (!currentSectionData || !testState) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading section...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="flex justify-between items-center mb-6 sticky top-0 bg-background py-2 z-10">
        <h1 className="text-2xl font-bold text-primary">{currentSectionData.title} - {currentSectionData.topic}</h1>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Progress: Section {currentSectionData.id} of {TOTAL_SECTIONS}</div>
          <div className={`text-xl font-semibold ${testState.timeRemaining < 60 ? 'text-destructive' : 'text-foreground'}`}>
            Time: {formatTime(testState.timeRemaining)}
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

