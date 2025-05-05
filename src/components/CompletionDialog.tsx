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

interface CompletionDialogProps {
  isOpen: boolean;
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({ isOpen, moves, time, onPlayAgain }) => {

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onPlayAgain}> {/* Use onOpenChange to handle closing */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            You matched all the verb pairs!
            <br />
            You completed the game in <strong>{moves} moves</strong> and <strong>{formatTime(time)}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onPlayAgain}>Play Again</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CompletionDialog;
