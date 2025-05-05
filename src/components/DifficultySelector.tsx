'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  currentDifficulty: Difficulty | null;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty, currentDifficulty }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

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
          {level} ({level === 'easy' ? 15 : level === 'medium' ? 30 : 60} Verbs)
        </Button>
      ))}
    </div>
  );
};

export default DifficultySelector;
