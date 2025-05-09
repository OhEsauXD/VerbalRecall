'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { GameType } from '@/app/page';

interface CompletionDialogProps {
  isOpen: boolean;
  moves: number; // For memory games: actual moves. For trivia/lock: attempts/items solved.
  time: number;  // For memory games: time in seconds. For trivia/lock: final score.
  onPlayAgain: () => void;
  itemType: GameType;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({ isOpen, moves, time, onPlayAgain, itemType }) => {

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  };

  if (!isOpen) return null;

  let title = "Congratulations!";
  let description = "";

  if (itemType === 'trivia') {
    title = "Past Participle Trivia Complete!"; 
    description = `You attempted <strong>${moves} questions</strong>.
                   <br />
                   Your final score is <strong>${time}</strong>.`;
  } else if (itemType === 'spanishEnglishTrivia') {
    title = "Spanish to English Verb Trivia Complete!";
    description = `You attempted <strong>${moves} questions</strong>.
                   <br />
                   Your final score is <strong>${time}</strong>.`;
  } else if (itemType === 'verbLock') {
    title = "Verb Lock Challenge Complete!";
    description = `You attempted <strong>${verbLockSources.length} locks</strong> and successfully solved <strong>${moves}</strong>.
                   <br />
                   Your final score is <strong>${time}</strong>.`;
  } else if (itemType === 'combinationLock') {
    title = "Thematic Lock Challenge Complete!";
    description = `You attempted <strong>${combinationLockSubjects.length} locks</strong> and successfully solved <strong>${moves}</strong>.
                   <br />
                   Your final score is <strong>${time}</strong>.`;
  }
   else {
    const itemTextMap: Record<Exclude<GameType, 'trivia' | 'crossword' | 'verbLock' | 'spanishEnglishTrivia' | 'combinationLock'>, string> = {
        'verbs': 'verb',
        'adjectives': 'adjective',
        'animals': 'animal name/picture',
        'plants': 'plant name/picture',
        'food': 'food/candy/drink name/picture',
        'transportBuildings': 'transport/building name/picture',
        'pastTense': 'irregular past tense verb',
        'regularPastTense': 'regular past tense verb',
        'nations': 'nation/nationality',
    };
    const itemText = itemTextMap[itemType as Exclude<GameType, 'trivia' | 'crossword' | 'verbLock' | 'spanishEnglishTrivia' | 'combinationLock'>] || 'item';
    description = `You matched all the ${itemText} pairs!
                   <br />
                   You completed the game in <strong>${moves} moves</strong> and <strong>${formatTime(time)}</strong>.`;
  }


  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onPlayAgain()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription dangerouslySetInnerHTML={{ __html: description }} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onPlayAgain}>Play Again</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompletionDialog;
