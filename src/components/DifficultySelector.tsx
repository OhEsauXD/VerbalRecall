'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // Import back icon

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onGoBack: () => void; // Function to go back to game selection
  currentDifficulty: Difficulty | null;
  itemType: 'Verbs' | 'Adjectives' | 'Animals' | 'Plants' | 'Food Items' | 'Transport/Buildings'; // Add 'Transport/Buildings'
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty, onGoBack, currentDifficulty, itemType }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const itemCounts = {
    easy: 15,
    medium: 30,
    hard: 60,
  };

  // Adjust pluralization based on itemType
  const pluralItemType = itemType === 'Plants' || itemType === 'Food Items' || itemType === 'Transport/Buildings' ? 'items' : itemType;


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
            {level} ({itemCounts[level]} {pluralItemType})
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
