
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { VerbLockChallenge } from '@/lib/verbLock'; // Updated import
import { cn } from '@/lib/utils';
import type { Difficulty } from '@/app/page';

interface VerbLockGameProps {
  verbLock: VerbLockChallenge; // Use the new VerbLockChallenge type
  onCombinationSubmit: (isCorrect: boolean) => void;
  difficulty: Difficulty;
}

const VerbLockGame: React.FC<VerbLockGameProps> = ({ verbLock, onCombinationSubmit, difficulty }) => {
  const initialSelectedIndices: [number, number, number, number] = [0, 0, 0, 0];
  const [selectedKeyIndices, setSelectedKeyIndices] = useState<[number, number, number, number]>(initialSelectedIndices);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [showGerund, setShowGerund] = useState(false);

  useEffect(() => {
    setSelectedKeyIndices([0, 0, 0, 0]);
    setFeedback({ message: '', type: '' });
    setShowGerund(false);
  }, [verbLock]); // Reset when verbLock (challenge) changes

  const handleKeyRotation = (keyIndex: number, direction: 'up' | 'down') => {
    setSelectedKeyIndices(prevIndices => {
      const newIndices = [...prevIndices] as [number, number, number, number];
      const currentOptionKey = `key${keyIndex + 1}` as keyof VerbLockChallenge['options'];
      // verbLock.options[currentOptionKey] might be undefined if not all keys are present (though current logic ensures 4 keys)
      const numOptions = verbLock.options[currentOptionKey]?.length || 1; // Default to 1 to prevent NaN if undefined
      
      if (direction === 'up') {
        newIndices[keyIndex] = (newIndices[keyIndex] - 1 + numOptions) % numOptions;
      } else {
        newIndices[keyIndex] = (newIndices[keyIndex] + 1) % numOptions;
      }
      return newIndices;
    });
    setFeedback({ message: '', type: '' });
    setShowGerund(false);
  };

  const handleSubmit = () => {
    const isCorrect = selectedKeyIndices.every((selectedIndex, index) => selectedIndex === verbLock.correctIndices[index]);
    
    if (isCorrect) {
      setFeedback({ message: 'Correct!', type: 'success' });
      setShowGerund(true);
      setTimeout(() => {
        onCombinationSubmit(true);
      }, 1500); 
    } else {
      setFeedback({ message: 'Incorrect. Try again!', type: 'error' });
      setShowGerund(false);
       setTimeout(() => {
         setFeedback({ message: '', type: '' }); 
       }, 2000);
    }
  };

  const keyLabels: (keyof VerbLockChallenge['options'])[] = ['key1', 'key2', 'key3', 'key4'];
  const displayLabels = ['Spanish Infinitive', 'English Base', 'Past Simple', 'Past Participle'];
  
  const englishInfinitive = verbLock.englishBaseDisplayTitle;


  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Unlock the Verb: <span className="italic text-accent">to {englishInfinitive}</span>
      </h2>

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
                feedback.type === 'success' && selectedKeyIndices[index] === verbLock.correctIndices[index] ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400' : 
                feedback.type === 'error' && selectedKeyIndices[index] !== verbLock.correctIndices[index] ? 'border-destructive bg-destructive/10 text-destructive' :
                'border-border bg-background'
              )}
            >
              {verbLock.options[keyName]?.[selectedKeyIndices[index]] ?? 'N/A'} 
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

      {showGerund && (
        <div className="text-lg font-semibold text-accent mb-4">
          Gerund: <span className="italic">{verbLock.gerund}</span>
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

export default VerbLockGame;
