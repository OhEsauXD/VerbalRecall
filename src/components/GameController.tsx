'use client';

import React, { useState, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DifficultySelector from '@/components/DifficultySelector';
import GameSelection from '@/components/GameSelection';
import CompletionDialog from '@/components/CompletionDialog'; // Will be used within game components
import GameStatus from '@/components/GameStatus'; // Will be used within game components
import VerbsGame from '@/games/verbs/VerbsGame';
import { Difficulty, GameType, ViewState } from '@/games/utils/types';
import { getGridColsClass } from '@/games/utils/gameUtils'; // Assuming getGridColsClass is here or will be

const GameController: React.FC = () => {
  const [view, setView] = useState<ViewState>('selection');
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | null>(null); // Added state for current difficulty

  const handleSelectGameType = (type: GameType) => {
    setCurrentGameType(type);
    setView('difficulty');
    setCurrentDifficulty(null); // Reset difficulty when changing game type
  };

  const handleGoBackToSelection = () => {
    setView('selection');
    setCurrentGameType(null);
    setCurrentDifficulty(null);
    // TODO: Reset game states in individual game components when they are implemented
  };

  const handleGoBackToDifficulty = () => {
    setView('difficulty');
    // TODO: Reset the current game's state
  };

  const handleGoHome = () => {
    setView('selection');
    setCurrentGameType(null);
    setCurrentDifficulty(null);
    // TODO: Reset game states in individual game components
  };

  // This will be passed to the game components to handle difficulty selection
  const handleSelectDifficulty = useCallback((selectedDifficulty: Difficulty) => {
    setCurrentDifficulty(selectedDifficulty);
    setView('game');
  }, []);


  const renderContent = () => {
    switch (view) {
      case 'selection':
        return <GameSelection onSelectGame={handleSelectGameType} />;
      case 'difficulty':
        // Dynamically calculate the hard difficulty count based on the available pairs
        // This logic will need to be adjusted or passed down from the game data sources
        const itemCounts = currentGameType === 'pastTense' // This logic is temporary and needs to be refined
            ? { easy: 15, medium: 30, hard: 50 } // Example counts, adjust based on actual data
            : currentGameType === 'regularPastTense'
            ? { easy: 15, medium: 30, hard: 50 } // Example counts
            : currentGameType === 'nations'
            ? { easy: 15, medium: 30, hard: 50 } // Example counts
            : { easy: 15, medium: 30, hard: 60 }; // Default for other games

        const itemType = currentGameType === 'verbs' ? 'Verbs' :
                         currentGameType === 'adjectives' ? 'Adjectives' :
                         currentGameType === 'animals' ? 'Animals' :
                         currentGameType === 'plants' ? 'Plants' :
                         currentGameType === 'food' ? 'Food Items' :
                         currentGameType === 'transportBuildings' ? 'Transport/Buildings' :
                         currentGameType === 'pastTense' ? 'Irregular Past Tense Verbs' :
                         currentGameType === 'regularPastTense' ? 'Regular Past Tense Verbs' :
                         'Nations & Nationalities'; // Add Nation text


        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold text-center my-4 text-foreground">
                Select Difficulty for {itemType}
            </h2>
            <DifficultySelector
              itemType={itemType as any}
              onSelectDifficulty={handleSelectDifficulty}
              onGoBack={handleGoBackToSelection}
              currentDifficulty={currentDifficulty}
              itemCounts={itemCounts}
            />
          </div>
        );
      case 'game':
        // Conditionally render the active game component
        if (!currentGameType || !currentDifficulty) {
          // Should not happen if state transitions are handled correctly
          return <p>Error: Game type or difficulty not selected.</p>;
        }

        switch (currentGameType) {
          case 'verbs':
            return <VerbsGame difficulty={currentDifficulty} onGoBackToDifficulty={handleGoBackToDifficulty} />;
          // TODO: Add other game components here
          default:
            return <p>Game type not implemented yet.</p>; // Placeholder
        }

      default:
        return <GameSelection onSelectGame={handleSelectGameType} />;
    }
  };

  return (
    <DashboardLayout
      onSelectGameTypeFromSidebar={handleSelectGameType}
      onGoHome={handleGoHome}
    >
        <div className="flex flex-col items-center justify-start p-4 w-full h-full">
          {renderContent()}
        </div>
      {/* CompletionDialog and GameStatus will be handled by individual game components */}
    </DashboardLayout>
  );
};

export default GameController;