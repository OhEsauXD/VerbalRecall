
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onGoBack: () => void;
  currentDifficulty: Difficulty | null;
  itemType: string; // Generic enough for all game types
  itemCounts: { easy: number; medium: number; hard: number };
  isTrivia?: boolean; // Optional flag for trivia game
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelectDifficulty,
  onGoBack,
  currentDifficulty,
  itemType,
  itemCounts,
  isTrivia = false,
}) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  const getItemText = (level: Difficulty) => {
    if (isTrivia) {
      return `${itemCounts[level]} Questions`;
    }
    const pluralItemType = itemCounts[level] !== 1 && !itemType.endsWith('s') && itemType !== 'Nations & Nationalities'
      ? itemType + 's'
      : itemType.endsWith('s') || itemType === 'Nations & Nationalities'
      ? itemType
      : itemType + 's'; // Fallback pluralization
    
    // Adjust "items" specifically for Nations & Nationalities to "pairs" for matching
    const displayItemType = itemType === 'Nations & Nationalities' && !isTrivia ? 'pairs' : pluralItemType;

    return `${itemCounts[level]} ${displayItemType}`;
  };


  return (
    <div className="flex flex-col items-center space-y-4 my-8 w-full">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {difficulties.map((level) => (
          <Button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            variant={currentDifficulty === level ? 'default' : 'outline'}
            className="capitalize px-6 py-2 rounded-md shadow-sm"
            aria-pressed={currentDifficulty === level}
          >
            {level} ({getItemText(level)})
          </Button>
        ))}
      </div>
       <Button onClick={onGoBack} variant="ghost" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
       </Button>
    </div>
  );
};

export default DifficultySelector;
