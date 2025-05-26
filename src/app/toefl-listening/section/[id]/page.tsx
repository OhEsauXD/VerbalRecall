
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
  ToeflListeningSectionData,
} from '@/lib/toeflListeningTestData';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, Play, Pause, RotateCcw, Volume2, ChevronRight, ChevronLeft } from 'lucide-react';
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
  const [currentAudioPartData, setCurrentAudioPartData] = useState<ToeflListeningSectionData | null>(null);
  const [activeSubDialogue, setActiveSubDialogue] = useState<MiniDialogueAudio | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<ListeningQuestion[]>([]);
  
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showNextPartDialog, setShowNextPartDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  // For specific sub-dialogue or lecture/conversation
  const [currentSegmentPlayCount, setCurrentSegmentPlayCount] = useState(0); 
  const [hasCurrentSegmentAudioPlayedOnce, setHasCurrentSegmentAudioPlayedOnce] = useState(false); 
  const MAX_PLAYS_PER_SEGMENT = 2;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0); 
  // currentSubDialogueIndex will be managed by testState now.

  const loadStateAndContent = useCallback(() => {
    const savedStateRaw = localStorage.getItem('toeflListeningTestState');
    if (savedStateRaw) {
      const savedState: ToeflListeningTestState = JSON.parse(savedStateRaw);
      
      const elapsed = savedState.startTime ? Math.floor((Date.now() - savedState.startTime) / 1000) : 0;
      const timeRemaining = Math.max(0, INITIAL_LISTENING_TEST_DURATION - elapsed);

      const partData = toeflListeningSections.find(part => part.id === currentAudioPartId);
      setCurrentAudioPartData(partData || null);

      if (partData) {
        let currentQuestionsForDisplay: ListeningQuestion[] = [];
        let playCountForCurrentSegment = 0;
        let segmentId = `part_${currentAudioPartId}`;

        if (partData.audioContent.type === 'mini-dialogue' && partData.audioContent.miniDialogueSet) {
          const subDialogue = partData.audioContent.miniDialogueSet[savedState.currentMiniDialogueAudioIndex || 0];
          setActiveSubDialogue(subDialogue || null);
          if (subDialogue) {
            currentQuestionsForDisplay = subDialogue.questions;
            segmentId = subDialogue.id; 
          }
        } else {
          setActiveSubDialogue(null);
          currentQuestionsForDisplay = partData.questions;
        }
        setActiveQuestions(currentQuestionsForDisplay);
        playCountForCurrentSegment = savedState.audioPlayCounts?.[segmentId] || 0;
        setCurrentSegmentPlayCount(playCountForCurrentSegment);
        setHasCurrentSegmentAudioPlayedOnce(playCountForCurrentSegment > 0);
      } else {
        router.push('/toefl-listening/results'); 
        return;
      }
      
      const updatedState = { 
        ...savedState, 
        currentAudioPartId: currentAudioPartId,
        timeRemaining 
      };
      setTestState(updatedState);
      setCurrentLineIndex(0); // Reset line index when part/sub-dialogue changes

      if (timeRemaining <= 0 && !isTimeUp) {
        setIsTimeUp(true);
      }
    } else {
      router.push('/toefl-listening/start');
    }
  }, [currentAudioPartId, router, isTimeUp]);

  useEffect(() => {
    loadStateAndContent();
  }, [currentAudioPartId, testState?.currentMiniDialogueAudioIndex, loadStateAndContent]); // Reload if sub-dialogue index changes

  const updateSegmentPlayCountInStorage = (segmentId: string, newCount: number) => {
    setTestState(prevTestState => {
        if (!prevTestState) return null;
        const newAudioPlayCounts = {
            ...(prevTestState.audioPlayCounts || {}),
            [segmentId]: newCount,
        };
        const updatedTestState = {...prevTestState, audioPlayCounts: newAudioPlayCounts};
        localStorage.setItem('toeflListeningTestState', JSON.stringify(updatedTestState));
        return updatedTestState;
    });
  };
  
  const handleAudioEnded = useCallback(() => {
    if (!currentAudioPartData || !testState || !audioRef.current) {
      setIsAudioPlaying(false);
      return;
    }

    const { audioContent } = currentAudioPartData;
    let segmentId = `part_${currentAudioPartId}`;

    if (audioContent.type === 'lecture') {
      setIsAudioPlaying(false);
      const newPlayCount = currentSegmentPlayCount + 1;
      setCurrentSegmentPlayCount(newPlayCount);
      if (!hasCurrentSegmentAudioPlayedOnce) setHasCurrentSegmentAudioPlayedOnce(true);
      updateSegmentPlayCountInStorage(segmentId, newPlayCount);
    } else if (audioContent.type === 'conversation' && audioContent.conversationScript) {
      const nextLine = currentLineIndex + 1;
      if (nextLine < audioContent.conversationScript.length) {
        setCurrentLineIndex(nextLine);
        audioRef.current.src = audioContent.conversationScript[nextLine].audioSrc;
        audioRef.current.load();
        audioRef.current.play().catch(e => { setIsAudioPlaying(false); });
      } else {
        setIsAudioPlaying(false);
        const newPlayCount = currentSegmentPlayCount + 1;
        setCurrentSegmentPlayCount(newPlayCount);
        if (!hasCurrentSegmentAudioPlayedOnce) setHasCurrentSegmentAudioPlayedOnce(true);
        updateSegmentPlayCountInStorage(segmentId, newPlayCount);
      }
    } else if (audioContent.type === 'mini-dialogue' && audioContent.miniDialogueSet && activeSubDialogue) {
      segmentId = activeSubDialogue.id;
      const nextLineInCurrentDialogue = currentLineIndex + 1;
      if (nextLineInCurrentDialogue < activeSubDialogue.script.length) {
        setCurrentLineIndex(nextLineInCurrentDialogue);
        audioRef.current.src = activeSubDialogue.script[nextLineInCurrentDialogue].audioSrc;
        audioRef.current.load();
        audioRef.current.play().catch(e => { setIsAudioPlaying(false); });
      } else {
        setIsAudioPlaying(false);
        const newPlayCount = currentSegmentPlayCount + 1;
        setCurrentSegmentPlayCount(newPlayCount);
        if (!hasCurrentSegmentAudioPlayedOnce) setHasCurrentSegmentAudioPlayedOnce(true);
        updateSegmentPlayCountInStorage(segmentId, newPlayCount);
      }
    }
  }, [currentAudioPartData, testState, currentSegmentPlayCount, hasCurrentSegmentAudioPlayedOnce, currentLineIndex, activeSubDialogue]);

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
          localStorage.setItem('toeflListeningTestState', JSON.stringify(updatedState));
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

  const playCurrentSegmentAudio = useCallback(() => {
    if (!currentAudioPartData || currentSegmentPlayCount >= MAX_PLAYS_PER_SEGMENT || isAudioPlaying || !audioRef.current) return;

    setIsAudioPlaying(true);
    setCurrentLineIndex(0); 

    let firstAudioSrc = "";
    const { audioContent } = currentAudioPartData;

    if (audioContent.type === 'lecture' && audioContent.audioSrc) {
        firstAudioSrc = audioContent.audioSrc;
    } else if (audioContent.type === 'conversation' && audioContent.conversationScript && audioContent.conversationScript.length > 0) {
        firstAudioSrc = audioContent.conversationScript[0].audioSrc;
    } else if (audioContent.type === 'mini-dialogue' && activeSubDialogue && activeSubDialogue.script.length > 0) {
        firstAudioSrc = activeSubDialogue.script[0].audioSrc;
    } else {
        toast({ title: "Audio Error", description: "No audio source found for this segment.", variant: "destructive" });
        setIsAudioPlaying(false);
        return;
    }
    
    console.log("Attempting to play audio:", firstAudioSrc);
    audioRef.current.src = firstAudioSrc;
    audioRef.current.load();
    audioRef.current.play().catch(e => {
      console.error("Error starting audio playback:", e);
      toast({ title: "Audio Error", description: "Could not play audio. Check console.", variant: "destructive" });
      setIsAudioPlaying(false);
    });
  }, [currentAudioPartData, activeSubDialogue, currentSegmentPlayCount, isAudioPlaying, toast]);

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    if (isTimeUp || !testState || !hasCurrentSegmentAudioPlayedOnce) return;
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

  const allQuestionsInCurrentSegmentAnswered = activeQuestions.every(q =>
    testState?.answers.find(a => a.questionId === q.id)?.selectedOptionIndex !== null &&
    testState?.answers.find(a => a.questionId === q.id)?.selectedOptionIndex !== undefined
  );

  const handleNext = () => {
    if (!currentAudioPartData || !testState) return;
    if (!allQuestionsInCurrentSegmentAnswered && hasCurrentSegmentAudioPlayedOnce) {
      toast({ title: "Incomplete Section", description: "Please answer all questions for this audio segment before proceeding.", variant: 'destructive' });
      return;
    }
    setShowNextPartDialog(true);
  };
  
  const confirmNext = () => {
    setShowNextPartDialog(false);
    if (!currentAudioPartData || !testState) return;

    if (audioRef.current) audioRef.current.pause();
    setIsAudioPlaying(false);
    setHasCurrentSegmentAudioPlayedOnce(false); // Reset for the next segment
    setCurrentSegmentPlayCount(0); // Reset for the next segment
    setCurrentLineIndex(0);

    let nextAudioPartId = currentAudioPartId;
    let nextSubDialogueIndex = testState.currentMiniDialogueAudioIndex;

    if (currentAudioPartData.audioContent.type === 'mini-dialogue' && currentAudioPartData.audioContent.miniDialogueSet) {
      if (nextSubDialogueIndex < currentAudioPartData.audioContent.miniDialogueSet.length - 1) {
        nextSubDialogueIndex++;
      } else {
        nextAudioPartId++;
        nextSubDialogueIndex = 0; // Reset for next main part if it's also mini-dialogues
      }
    } else {
      nextAudioPartId++;
      nextSubDialogueIndex = 0; // Reset for next main part
    }

    localStorage.setItem('toeflListeningTestState', JSON.stringify({...testState, currentAudioPartId: nextAudioPartId, currentMiniDialogueAudioIndex: nextSubDialogueIndex, audioPlayCounts: testState.audioPlayCounts })); 
    
    if (nextAudioPartId <= TOTAL_LISTENING_PARTS) {
        if (currentAudioPartData.audioContent.type === 'mini-dialogue' && currentAudioPartId === nextAudioPartId) {
            // Still in the same main part, just moving to next sub-dialogue
            setTestState(prev => prev ? ({...prev, currentMiniDialogueAudioIndex: nextSubDialogueIndex}) : null);
            // loadStateAndContent will be called due to testState.currentMiniDialogueAudioIndex change
        } else {
             router.push(`/toefl-listening/section/${nextAudioPartId}`);
        }
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
        if (currentAudioPartData?.audioContent.type === 'mini-dialogue' && activeSubDialogue) {
            return `Playing Dialogue (Line ${currentLineIndex + 1}/${activeSubDialogue.script.length})...`;
        } else if (currentAudioPartData?.audioContent.type === 'conversation' && currentAudioPartData.audioContent.conversationScript) {
            return `Playing Line ${currentLineIndex + 1}/${currentAudioPartData.audioContent.conversationScript.length}...`;
        }
        return "Playing Audio...";
    }
    if (currentSegmentPlayCount === 0) return `Play Audio Segment`;
    if (currentSegmentPlayCount < MAX_PLAYS_PER_SEGMENT) return `Replay Audio Segment (${MAX_PLAYS_PER_SEGMENT - currentSegmentPlayCount} left)`;
    return "No Replays Left";
  };
  
  const getOverallProgressText = () => {
    if (!currentAudioPartData || !testState) return "";
    if (currentAudioPartData.audioContent.type === 'mini-dialogue' && currentAudioPartData.audioContent.miniDialogueSet) {
        const totalDialogues = currentAudioPartData.audioContent.miniDialogueSet.length;
        return `Part ${currentAudioPartId}: Dialogue ${testState.currentMiniDialogueAudioIndex + 1} of ${totalDialogues}`;
    }
    return `Part ${currentAudioPartId} of ${TOTAL_LISTENING_PARTS}`;
  };
  
  const getSegmentTitle = () => {
    if (!currentAudioPartData) return "Loading...";
    if (currentAudioPartData.audioContent.type === 'mini-dialogue' && activeSubDialogue) {
        return `${currentAudioPartData.audioContent.title || `Part ${currentAudioPartId}`} - Dialogue ${testState ? testState.currentMiniDialogueAudioIndex + 1 : ''}`;
    }
    return currentAudioPartData.audioContent.title || `Part ${currentAudioPartId}`;
  };


  if (!currentAudioPartData || !testState) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading listening section...</div>;
  }

  const isLastSegmentOfTest = 
    currentAudioPartId === TOTAL_LISTENING_PARTS &&
    (currentAudioPartData.audioContent.type !== 'mini-dialogue' || 
     (currentAudioPartData.audioContent.miniDialogueSet && testState.currentMiniDialogueAudioIndex === currentAudioPartData.audioContent.miniDialogueSet.length - 1));


  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <audio ref={audioRef} />
      <header className="flex justify-between items-center mb-4 sticky top-0 bg-background py-2 z-10">
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-sm"> <Home className="mr-2 h-4 w-4" /> Cancelar y Volver</Button>
          </AlertDialogTrigger>
          <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Tu progreso se perderá.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Continuar</AlertDialogCancel><AlertDialogAction onClick={handleCancelTest} className="bg-destructive hover:bg-destructive/90">Salir</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
        </AlertDialog>

        <div className="text-center">
            <h1 className="text-lg md:text-xl font-bold text-primary">{getSegmentTitle()}</h1>
            <p className="text-xs text-muted-foreground">{getOverallProgressText()}</p>
        </div>

        <div className="text-right">
          <div className={`text-lg font-semibold ${testState.timeRemaining < 300 && testState.timeRemaining > 0 ? 'text-destructive' : 'text-foreground'}`}>
            Tiempo: {formatTime(testState.timeRemaining)}
          </div>
          <div className="text-xs text-muted-foreground">Plays Used: {currentSegmentPlayCount}/{MAX_PLAYS_PER_SEGMENT}</div>
        </div>
      </header>

      <Card className="w-full max-w-3xl mx-auto mb-6">
        <CardHeader>
          <CardTitle className="text-md md:text-lg text-accent">
            {currentAudioPartData.audioContent.instructions || "Listen carefully to the audio."}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <Button onClick={playCurrentSegmentAudio} disabled={currentSegmentPlayCount >= MAX_PLAYS_PER_SEGMENT || isAudioPlaying || isTimeUp} className="w-full sm:w-auto">
                {isAudioPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {getPlayButtonText()}
            </Button>
        </CardContent>
      </Card>

      {hasCurrentSegmentAudioPlayedOnce && !isTimeUp && (
        <div className="space-y-4 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-center text-primary mb-3">Questions</h3>
          {activeQuestions.map((q, index) => (
            <div key={q.id} className="mb-3">
              <ListeningQuestionRenderer
                question={q}
                currentAnswer={testState.answers.find(a => a.questionId === q.id)}
                onAnswerChange={handleAnswerChange}
                isInteractive={hasCurrentSegmentAudioPlayedOnce && !isTimeUp}
                questionNumber={index + 1} // Question number within the current segment
              />
              <div className="mt-1 flex items-center space-x-2 pl-1">
                <Checkbox id={`mark-review-${q.id}`} checked={testState.answers.find(a => a.questionId === q.id)?.isMarkedForReview || false} onCheckedChange={() => toggleMarkForReview(q.id)} disabled={isTimeUp || !hasCurrentSegmentAudioPlayedOnce} />
                <Label htmlFor={`mark-review-${q.id}`} className="text-xs font-medium text-muted-foreground">Mark for Review</Label>
              </div>
            </div>
          ))}
        </div>
      )}
      {!hasCurrentSegmentAudioPlayedOnce && !isTimeUp && (
          <p className="text-center text-muted-foreground mt-6">Please play the audio to see the questions for this segment.</p>
      )}

      <footer className="mt-8 text-center">
         <AlertDialog open={showNextPartDialog} onOpenChange={setShowNextPartDialog}>
            <AlertDialogTrigger asChild>
                 <Button onClick={handleNext} disabled={isTimeUp || !hasCurrentSegmentAudioPlayedOnce || isAudioPlaying || (!allQuestionsInCurrentSegmentAnswered && activeQuestions.length > 0) } className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-md">
                    {isLastSegmentOfTest ? 'Finish Listening Test' : (currentAudioPartData.audioContent.type === 'mini-dialogue' ? 'Next Dialogue/Questions' : 'Next Audio Part')}
                    <ChevronRight className="ml-2 h-5 w-5"/>
                  </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Confirm Navigation</AlertDialogTitle><AlertDialogDescription>Are you sure you want to move to the next segment? You cannot return to this audio segment.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={confirmNext}>Proceed</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </footer>

       {isTimeUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 text-center bg-background"><CardTitle className="text-xl text-destructive mb-3">Time's Up!</CardTitle><CardDescription className="mb-3">Your time has expired.</CardDescription><Button onClick={() => router.push('/toefl-listening/results')}>View Results</Button></Card>
        </div>
      )}
    </div>
  );
};

export default ToeflListeningSectionPage;
