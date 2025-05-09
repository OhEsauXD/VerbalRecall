
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { CombinationLockChallenge } from '@/lib/combinationLock';
import { cn } from '@/lib/utils';

interface CombinationLockGameProps {
  challenge: CombinationLockChallenge;
  onCombinationSubmit: (isCorrect: boolean) => void;
  // difficulty might be used later for hint system or other features
}

const CombinationLockGame: React.FC<CombinationLockGameProps> = ({ challenge, onCombinationSubmit }) => {
  const initialSelectedIndices: [number, number, number, number] = [0, 0, 0, 0];
  const [selectedKeyIndices, setSelectedKeyIndices] = useState<[number, number, number, number]>(initialSelectedIndices);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  useEffect(() => {
    setSelectedKeyIndices([0, 0, 0, 0]);
    setFeedback({ message: '', type: '' });
  }, [challenge]); // Reset when challenge changes

  const handleKeyRotation = (keyIndex: number, direction: 'up' | 'down') => {
    setSelectedKeyIndices(prevIndices => {
      const newIndices = [...prevIndices] as [number, number, number, number];
      const currentOptionKey = `key${keyIndex + 1}` as keyof CombinationLockChallenge['options'];
      const numOptions = challenge.options[currentOptionKey]?.length || 1;
      
      if (direction === 'up') {
        newIndices[keyIndex] = (newIndices[keyIndex] - 1 + numOptions) % numOptions;
      } else {
        newIndices[keyIndex] = (newIndices[keyIndex] + 1) % numOptions;
      }
      return newIndices;
    });
    setFeedback({ message: '', type: '' });
  };

  const handleSubmit = () => {
    const isCorrect = selectedKeyIndices.every((selectedIndex, index) => selectedIndex === challenge.correctIndices[index]);
    
    if (isCorrect) {
      setFeedback({ message: 'Correct! Subject Unlocked!', type: 'success' });
      setTimeout(() => {
        onCombinationSubmit(true);
      }, 1500); 
    } else {
      setFeedback({ message: 'Incorrect. Try again!', type: 'error' });
       setTimeout(() => {
         setFeedback({ message: '', type: '' }); 
       }, 2000);
    }
  };

  const keyLabels: (keyof CombinationLockChallenge['options'])[] = ['key1', 'key2', 'key3', 'key4'];
  // For this game, the "label" for each tumbler is just its position (1st item, 2nd item, etc.)
  const displayLabels = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Unlock Subject: <span className="italic text-accent">{challenge.subjectName}</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-4 text-center">Guess the four items related to this subject.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 w-full">
        {keyLabels.map((keyName, index) => (
          <div key={keyName} className="flex flex-col items-center space-y-2 p-3 bg-muted rounded-md shadow">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{displayLabels[index]}</span>
            <Button variant="ghost" size="icon" onClick={() => handleKeyRotation(index, 'up')} aria-label={`Previous option for ${displayLabels[index]}`}>
              <ChevronUp className="h-6 w-6" />
            </Button>
            <div 
              className={cn(
                "h-16 w-full flex items-center justify-center text-lg md:text-xl font-semibold border-2 rounded-md p-2 text-center break-words overflow-hidden",
                feedback.type === 'success' && selectedKeyIndices[index] === challenge.correctIndices[index] ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400' : 
                feedback.type === 'error' && selectedKeyIndices[index] !== challenge.correctIndices[index] ? 'border-destructive bg-destructive/10 text-destructive' :
                'border-border bg-background'
              )}
            >
              {challenge.options[keyName]?.[selectedKeyIndices[index]] ?? 'N/A'} 
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleKeyRotation(index, 'down')} aria-label={`Next option for ${displayLabels[index]}`}>
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        ))}
      </div>

      {feedback.message && (
        <div className={cn(
          "flex items-center text-md font-medium mb-4 p-3 rounded-md w-full justify-center",
          feedback.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
          feedback.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : ''
        )}>
          {feedback.type === 'success' && <CheckCircle className="h-5 w-5 mr-2" />}
          {feedback.type === 'error' && <XCircle className="h-5 w-5 mr-2" />}
          {feedback.message}
        </div>
      )}

      <Button 
        onClick={handleSubmit} 
        className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
        disabled={feedback.type === 'success'}
      >
        Submit Combination
      </Button>
    </div>
  );
};

export default CombinationLockGame;
