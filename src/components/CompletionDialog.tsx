
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
  itemType: 'verb' | 'adjective' | 'animal' | 'plant'; // Add 'plant'
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({ isOpen, moves, time, onPlayAgain, itemType }) => {

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  };

  if (!isOpen) return null;

  // Customize message based on itemType
  const itemText = itemType === 'verb' ? 'verb' :
                   itemType === 'adjective' ? 'adjective' :
                   itemType === 'animal' ? 'animal name/picture' :
                   'plant name/picture'; // Add plant text

  return (
    <AlertDialog open={isOpen} onOpenChange={onPlayAgain}> {/* Use onOpenChange to handle closing */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            You matched all the {itemText} pairs!
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
