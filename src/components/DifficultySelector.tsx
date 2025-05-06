
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  currentDifficulty: Difficulty | null;
  itemType: 'Verbs' | 'Adjectives'; // To customize the button text
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty, currentDifficulty, itemType }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const itemCounts = {
    easy: 15,
    medium: 30,
    hard: 60,
  };

  return (
    <div className="flex justify-center space-x-4 my-8">
      {difficulties.map((level) => (
        <Button
          key={level}
          onClick={() => onSelectDifficulty(level)}
          variant={currentDifficulty === level ? 'default' : 'outline'} // Highlight selected
          className="capitalize px-6 py-2 rounded-md shadow-sm"
          aria-pressed={currentDifficulty === level}
        >
          {level} ({itemCounts[level]} {itemType})
        </Button>
      ))}
    </div>
  );
};

export default DifficultySelector;
