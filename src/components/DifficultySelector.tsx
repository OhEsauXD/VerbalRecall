

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // Import back icon

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onGoBack: () => void; // Function to go back to game selection
  currentDifficulty: Difficulty | null;
  itemType: 'Verbs' | 'Adjectives' | 'Animals' | 'Plants' | 'Food Items' | 'Transport/Buildings' | 'Irregular Past Tense Verbs' | 'Regular Past Tense Verbs' | 'Nations & Nationalities'; // Added Nations
  itemCounts: { easy: number; medium: number; hard: number }; // Accept item counts as prop
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty, onGoBack, currentDifficulty, itemType, itemCounts }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  // Adjust pluralization based on itemType
  const pluralItemType = itemType.endsWith('s') || itemType === 'Nations & Nationalities' ? 'items' : itemType; // Adjust for Nations

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

    