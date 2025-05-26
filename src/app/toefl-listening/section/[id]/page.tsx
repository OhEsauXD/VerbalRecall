
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  toeflListeningSections,
  ToeflListeningTestState,
  INITIAL_LISTENING_TEST_DURATION,
  TOTAL_LISTENING_PARTS,
  ListeningQuestion,
  AudioContent,
  ToeflListeningAnswer,
  MiniDialogueAudio,
  DialogueLine,
} from '@/lib/toeflListeningTestData';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, Play, RotateCcw, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ListeningQuestionRendererProps {
  question: ListeningQuestion;
  currentAnswer: ToeflListeningAnswer | undefined;
  onAnswerChange: (questionId: string, optionIndex: number) => void;
  isInteractive: boolean;
  questionNumber: number;
}

const ListeningQuestionRenderer: React.FC<ListeningQuestionRendererProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  isInteractive,
  questionNumber,
}) => {
  return (
    <Card key={question.id} className="mb-4 bg-card text-card-foreground p-4 rounded-lg shadow">
      <p className="text-md font-semibold mb-2">
        {questionNumber}. {question.questionText}
      </p>
      <RadioGroup
        value={currentAnswer?.selectedOptionIndex?.toString()}
        onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
        disabled={!isInteractive}
        className="space-y-1"
      >
        {question.options.map((opt, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`${question.id}-opt-${index}`} />
            <Label htmlFor={`${question.id}-opt-${index}`} className="text-sm cursor-pointer">
              {String.fromCharCode(97 + index)}) {opt.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};

const ToeflListeningSectionPage = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const currentAudioPartId = parseInt(params.id as string, 10);

  const [testState, setTestState] = useState<ToeflListeningTestState | null>(null);
  const [currentAudioContent, setCurrentAudioContent] = useState<AudioContent | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<ListeningQuestion[]>([]);
  
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showNextPartDialog, setShowNextPartDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const [audioPlayCount, setAudioPlayCount] = useState(0); 
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasAudioPlayedOnce, setHasAudioPlayedOnce] = useState(false); 
  const MAX_PLAYS_PER_PART = 2;

  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [currentSubDialogueIndex, setCurrentSubDialogueIndex] = useState(0); 
  const [currentLineIndex, setCurrentLineIndex] = useState(0); 

  const loadStateAndContent = useCallback(() => {
    const savedStateRaw = localStorage.getItem('toeflListeningTestState');
    if (savedStateRaw) {
      const savedState: ToeflListeningTestState = JSON.parse(savedStateRaw);
      
      const elapsed = savedState.startTime ? Math.floor((Date.now() - savedState.startTime) / 1000) : 0;
      const timeRemaining = Math.max(0, INITIAL_LISTENING_TEST_DURATION - elapsed);

      const partData = toeflListeningSections.find(part => part.id === currentAudioPartId);

      if (partData) {
        setCurrentAudioContent(partData.audioContent);
        setCurrentQuestions(partData.questions);
        const playCountForThisPart = savedState.audioPlayCounts?.[currentAudioPartId] || 0;
        setAudioPlayCount(playCountForThisPart);
        setHasAudioPlayedOnce(playCountForThisPart > 0);
        setCurrentSubDialogueIndex(savedState.currentMiniDialogueAudioIndex || 0); 
        setCurrentLineIndex(savedState.currentLineIndex || 0);      
      } else {
        router.push('/toefl-listening/results'); 
        return;
      }
      
      const updatedState = { 
        ...savedState, 
        currentAudioPartId: currentAudioPartId,
        currentMiniDialogueAudioIndex: savedState.currentMiniDialogueAudioIndex || 0, 
        currentLineIndex: savedState.currentLineIndex || 0,
        timeRemaining 
      };
      setTestState(updatedState);

      if (timeRemaining <= 0 && !isTimeUp) {
        setIsTimeUp(true);
      }
    } else {
      router.push('/toefl-listening/start');
    }
  }, [currentAudioPartId, router, isTimeUp]);

  useEffect(() => {
    loadStateAndContent();
  }, [currentAudioPartId, loadStateAndContent]);

  const updateAudioPlayCountInStorage = (newCount: number) => {
    setTestState(prevTestState => {
        if (!prevTestState) return null;
        const newAudioPlayCounts = {
            ...(prevTestState.audioPlayCounts || {}),
            [currentAudioPartId]: newCount,
        };
        const updatedTestState = {...prevTestState, audioPlayCounts: newAudioPlayCounts};
        localStorage.setItem('toeflListeningTestState', JSON.stringify(updatedTestState));
        return updatedTestState;
    });
  };
  
  const handleAudioEnded = useCallback(() => {
    if (!currentAudioContent || !testState || !audioRef.current) {
        setIsAudioPlaying(false);
        return;
    }

    if (currentAudioContent.type === 'lecture') {
        setIsAudioPlaying(false);
        const newOverallPlayCount = (audioPlayCount || 0) + 1;
        setAudioPlayCount(newOverallPlayCount);
        if (!hasAudioPlayedOnce) setHasAudioPlayedOnce(true);
        updateAudioPlayCountInStorage(newOverallPlayCount);
    } else if (currentAudioContent.type === 'conversation' && currentAudioContent.conversationScript) {
        const nextLine = currentLineIndex + 1;
        if (nextLine < currentAudioContent.conversationScript.length) {
            setCurrentLineIndex(nextLine);
            const nextAudioSrc = currentAudioContent.conversationScript[nextLine].audioSrc;
            console.log("Playing next conversation line:", nextAudioSrc);
            audioRef.current.src = nextAudioSrc;
            audioRef.current.load();
            audioRef.current.play().catch(e => {
                console.error("Error playing next conversation line:", e); setIsAudioPlaying(false);
            });
        } else {
            setIsAudioPlaying(false);
            const newOverallPlayCount = (audioPlayCount || 0) + 1;
            setAudioPlayCount(newOverallPlayCount);
            if (!hasAudioPlayedOnce) setHasAudioPlayedOnce(true);
            updateAudioPlayCountInStorage(newOverallPlayCount);
        }
    } else if (currentAudioContent.type === 'mini-dialogue' && currentAudioContent.miniDialogueSet) {
        const currentDialogue = currentAudioContent.miniDialogueSet[currentSubDialogueIndex];
        const nextLineInCurrentDialogue = currentLineIndex + 1;

        if (currentDialogue && nextLineInCurrentDialogue < currentDialogue.script.length) {
            setCurrentLineIndex(nextLineInCurrentDialogue);
            const nextAudioSrc = currentDialogue.script[nextLineInCurrentDialogue].audioSrc;
            console.log("Playing next mini-dialogue line:", nextAudioSrc);
            audioRef.current.src = nextAudioSrc;
            audioRef.current.load();
            audioRef.current.play().catch(e => {
                console.error("Error playing next mini-dialogue line:", e); setIsAudioPlaying(false);
            });
        } else { 
            const nextSubDialogue = currentSubDialogueIndex + 1;
            if (nextSubDialogue < currentAudioContent.miniDialogueSet.length) {
                setCurrentSubDialogueIndex(nextSubDialogue);
                setCurrentLineIndex(0);
                const firstLineOfNextDialogue = currentAudioContent.miniDialogueSet[nextSubDialogue].script[0];
                if (firstLineOfNextDialogue) {
                    const nextAudioSrc = firstLineOfNextDialogue.audioSrc;
                    console.log("Playing first line of next mini-dialogue:", nextAudioSrc);
                    audioRef.current.src = nextAudioSrc;
                    audioRef.current.load();
                    audioRef.current.play().catch(e => {
                        console.error("Error playing first line of next mini-dialogue:", e); setIsAudioPlaying(false);
                    });
                } else {
                    setIsAudioPlaying(false); // Should not happen if data is correct
                }
            } else { 
                setIsAudioPlaying(false);
                const newOverallPlayCount = (audioPlayCount || 0) + 1;
                setAudioPlayCount(newOverallPlayCount);
                if (!hasAudioPlayedOnce) setHasAudioPlayedOnce(true);
                updateAudioPlayCountInStorage(newOverallPlayCount);
            }
        }
    }
  }, [currentAudioContent, testState, audioPlayCount, hasAudioPlayedOnce, currentLineIndex, currentSubDialogueIndex]);


  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleAudioError = (e: Event) => {
      setIsAudioPlaying(false);
      console.error("Audio playback error:", e);
      toast({ title: "Audio Error", description: "Could not play audio. Please check file path or console.", variant: "destructive" });
    };
    
    audioElement.addEventListener('ended', handleAudioEnded);
    audioElement.addEventListener('error', handleAudioError);
    return () => {
      audioElement.removeEventListener('ended', handleAudioEnded);
      audioElement.removeEventListener('error', handleAudioError);
    };
  }, [handleAudioEnded, toast]);


  useEffect(() => {
    if (!testState || !testState.startTime || isTimeUp) return;

    const timerInterval = setInterval(() => {
      setTestState(prev => {
        if (!prev || !prev.startTime) return prev;
        const elapsed = Math.floor((Date.now() - prev.startTime) / 1000);
        const remaining = Math.max(0, INITIAL_LISTENING_TEST_DURATION - elapsed);
        
        const updatedState = { ...prev, timeRemaining: remaining };
        
        if (remaining <= 0 && !isTimeUp) {
          setIsTimeUp(true);
          clearInterval(timerInterval);
          if (audioRef.current) audioRef.current.pause();
          toast({ title: "Time's Up!", description: "Navigating to results.", variant: 'destructive' });
          localStorage.setItem('toeflListeningTestState', JSON.stringify(updatedTestState));
          router.push('/toefl-listening/results');
          return updatedState;
        }
        if (remaining > 0 && prev.timeRemaining !== remaining) { 
            localStorage.setItem('toeflListeningTestState', JSON.stringify(updatedState));
        }
        return updatedState;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [testState, isTimeUp, router, toast]);


  const playAudio = useCallback(() => {
    if (!currentAudioContent || audioPlayCount >= MAX_PLAYS_PER_PART || isAudioPlaying || !audioRef.current) return;

    setIsAudioPlaying(true);
    setCurrentLineIndex(0); 
    setCurrentSubDialogueIndex(0); 

    let firstAudioSrc = "";

    if (currentAudioContent.type === 'lecture' && currentAudioContent.audioSrc) {
        firstAudioSrc = currentAudioContent.audioSrc;
    } else if (currentAudioContent.type === 'conversation' && currentAudioContent.conversationScript && currentAudioContent.conversationScript.length > 0) {
        firstAudioSrc = currentAudioContent.conversationScript[0].audioSrc;
    } else if (currentAudioContent.type === 'mini-dialogue' && currentAudioContent.miniDialogueSet && currentAudioContent.miniDialogueSet.length > 0 && currentAudioContent.miniDialogueSet[0].script.length > 0) {
        firstAudioSrc = currentAudioContent.miniDialogueSet[0].script[0].audioSrc;
    } else {
        toast({ title: "Audio Error", description: "No audio source found for this section.", variant: "destructive" });
        setIsAudioPlaying(false);
        return;
    }
    
    console.log("Attempting to play audio:", firstAudioSrc);
    if (audioRef.current) {
        audioRef.current.src = firstAudioSrc;
        audioRef.current.load(); // Explicitly load the new source
        audioRef.current.play().catch(e => {
          console.error("Error starting audio playback:", e);
          toast({ title: "Audio Error", description: "Could not play audio. Check console for details.", variant: "destructive" });
          setIsAudioPlaying(false);
        });
    }
  }, [currentAudioContent, audioPlayCount, isAudioPlaying, toast]);

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    if (isTimeUp || !testState || !hasAudioPlayedOnce) return;

    setTestState(prev => {
      if (!prev) return null;
      
      const existingAnswerIndex = prev.answers.findIndex(ans => ans.questionId === questionId);
      let newAnswers = [...prev.answers];

      if (existingAnswerIndex > -1) {
        newAnswers[existingAnswerIndex] = { ...newAnswers[existingAnswerIndex], selectedOptionIndex: optionIndex };
      } else {
        newAnswers.push({ questionId, selectedOptionIndex: optionIndex, isMarkedForReview: false });
      }
      
      const newState = { ...prev, answers: newAnswers };
      localStorage.setItem('toeflListeningTestState', JSON.stringify(newState));
      return newState;
    });
  };

  const toggleMarkForReview = (questionId: string) => {
    if (isTimeUp || !testState) return;
    setTestState(prev => {
        if (!prev) return null;
        const existingAnswer = prev.answers.find(ans => ans.questionId === questionId);
        let newAnswers;

        if (existingAnswer) {
            newAnswers = prev.answers.map(ans =>
                ans.questionId === questionId ? { ...ans, isMarkedForReview: !ans.isMarkedForReview } : ans
            );
        } else {
            newAnswers = [...prev.answers, { questionId, selectedOptionIndex: null, isMarkedForReview: true }];
        }
        
        const newState = { ...prev, answers: newAnswers };
        localStorage.setItem('toeflListeningTestState', JSON.stringify(newState));
        return newState;
    });
  };


  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const allQuestionsInSectionAnswered = currentQuestions.every(q =>
    testState?.answers.find(a => a.questionId === q.id)?.selectedOptionIndex !== null &&
    testState?.answers.find(a => a.questionId === q.id)?.selectedOptionIndex !== undefined
  );

  const handleNextPart = () => {
    if (!currentAudioContent || !testState) return;
    if (!allQuestionsInSectionAnswered) {
      toast({ title: "Incomplete Section", description: "Please answer all questions before proceeding.", variant: 'destructive' });
      return;
    }
    setShowNextPartDialog(true);
  };
  
  const confirmNextPart = () => {
    setShowNextPartDialog(false);
    if (!currentAudioContent || !testState) return;

    if (audioRef.current) audioRef.current.pause();
    setIsAudioPlaying(false);

    const nextPartId = currentAudioPartId + 1;
    localStorage.setItem('toeflListeningTestState', JSON.stringify({...testState, currentMiniDialogueAudioIndex: 0, currentLineIndex: 0})); 
    
    if (nextPartId <= TOTAL_LISTENING_PARTS) {
      router.push(`/toefl-listening/section/${nextPartId}`);
    } else {
      router.push('/toefl-listening/results');
    }
  };

  const handleCancelTest = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsAudioPlaying(false);
    localStorage.removeItem('toeflListeningTestState');
    sessionStorage.removeItem('toeflListeningUserInfo');
    router.push('/');
  };

  const getPlayButtonText = () => {
    if (isAudioPlaying) {
        if (currentAudioContent?.type === 'mini-dialogue' && currentAudioContent.miniDialogueSet) {
          const currentDialogue = currentAudioContent.miniDialogueSet[currentSubDialogueIndex];
          if(currentDialogue) {
            return `Playing Dialogue ${currentSubDialogueIndex + 1} (Line ${currentLineIndex + 1}/${currentDialogue.script.length})...`;
          }
        } else if (currentAudioContent?.type === 'conversation' && currentAudioContent.conversationScript) {
            return `Playing Line ${currentLineIndex + 1}/${currentAudioContent.conversationScript.length}...`;
        }
        return "Playing Audio...";
    }
    if (audioPlayCount === 0) return `Play Audio Segment`;
    if (audioPlayCount < MAX_PLAYS_PER_PART) return `Replay Audio Segment (${MAX_PLAYS_PER_PART - audioPlayCount} left)`;
    return "No Replays Left";
  };
  
  const currentPartFirstGlobalQuestionIndex = toeflListeningSections
    .slice(0, currentAudioPartId - 1)
    .reduce((sum, sec) => sum + sec.questions.length, 0);


  if (!currentAudioContent || !testState) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading listening section...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <audio ref={audioRef} />
      <header className="flex justify-between items-center mb-4 sticky top-0 bg-background py-2 z-10">
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-sm">
                <Home className="mr-2 h-4 w-4" /> Cancelar y Volver al Inicio
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>Si vuelves al inicio, tu progreso en esta prueba se perderá. ¿Deseas continuar?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continuar Prueba</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelTest} className="bg-destructive hover:bg-destructive/90">Salir y Perder Progreso</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="text-center">
            <h1 className="text-lg md:text-xl font-bold text-primary">
                TOEFL Listening - {currentAudioContent.title || `Part ${currentAudioPartId}`}
            </h1>
            <p className="text-xs text-muted-foreground">
                Listening Part {currentAudioPartId} of {TOTAL_LISTENING_PARTS}
            </p>
        </div>

        <div className="text-right">
          <div className={`text-lg font-semibold ${testState.timeRemaining < 300 && testState.timeRemaining > 0 ? 'text-destructive' : 'text-foreground'}`}>
            Tiempo: {formatTime(testState.timeRemaining)}
          </div>
          <div className="text-xs text-muted-foreground">
            Plays Used: {audioPlayCount}/{MAX_PLAYS_PER_PART}
          </div>
        </div>
      </header>

      <Card className="w-full max-w-3xl mx-auto mb-6">
        <CardHeader>
          <CardTitle className="text-md md:text-lg text-accent">
            {currentAudioContent.title || (currentAudioContent.type === 'mini-dialogue' ? 'Mini-Dialogue Set' : 'Audio Segment')}
          </CardTitle>
          <CardDescription>
            {currentAudioContent.instructions || "Listen carefully to the audio."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <Button 
                onClick={playAudio} 
                disabled={audioPlayCount >= MAX_PLAYS_PER_PART || isAudioPlaying || isTimeUp}
                className="w-full sm:w-auto"
            >
                {isAudioPlaying ? <Volume2 className="mr-2 h-5 w-5 animate-pulse" /> : <Play className="mr-2 h-5 w-5" />}
                {getPlayButtonText()}
            </Button>
        </CardContent>
      </Card>

      {hasAudioPlayedOnce && !isTimeUp && (
        <div className="space-y-4 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-center text-primary mb-3">Questions</h3>
          {currentQuestions.map((q, index) => (
            <div key={q.id} className="mb-3">
              <ListeningQuestionRenderer
                question={q}
                currentAnswer={testState.answers.find(a => a.questionId === q.id)}
                onAnswerChange={handleAnswerChange}
                isInteractive={hasAudioPlayedOnce && !isTimeUp}
                questionNumber={currentPartFirstGlobalQuestionIndex + index + 1}
              />
              <div className="mt-1 flex items-center space-x-2 pl-1">
                <Checkbox
                  id={`mark-review-${q.id}`}
                  checked={testState.answers.find(a => a.questionId === q.id)?.isMarkedForReview || false}
                  onCheckedChange={() => toggleMarkForReview(q.id)}
                  disabled={isTimeUp || !hasAudioPlayedOnce}
                />
                <Label htmlFor={`mark-review-${q.id}`} className="text-xs font-medium text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mark for Review
                </Label>
              </div>
            </div>
          ))}
        </div>
      )}
      {!hasAudioPlayedOnce && !isTimeUp && (
          <p className="text-center text-muted-foreground mt-6">Please play the audio to see the questions.</p>
      )}


      <footer className="mt-8 text-center">
         <AlertDialog open={showNextPartDialog} onOpenChange={setShowNextPartDialog}>
            <AlertDialogTrigger asChild>
                 <Button
                    onClick={handleNextPart}
                    disabled={isTimeUp || !allQuestionsInSectionAnswered || !hasAudioPlayedOnce || isAudioPlaying}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-md"
                  >
                    {currentAudioPartId === TOTAL_LISTENING_PARTS ? 'Finish Listening Test' : 'Next Audio Part'}
                  </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Confirm Navigation</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to move to the {currentAudioPartId === TOTAL_LISTENING_PARTS ? 'results page' : 'next audio part'}? You cannot return to this audio part.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmNextPart}>Proceed</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </footer>

       {isTimeUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 text-center bg-background">
            <CardTitle className="text-xl text-destructive mb-3">Time's Up!</CardTitle>
            <CardDescription className="mb-3">Your time for the listening test has expired. Your answers have been submitted.</CardDescription>
            <Button onClick={() => router.push('/toefl-listening/results')}>View Results</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ToeflListeningSectionPage;


    