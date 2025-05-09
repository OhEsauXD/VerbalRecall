'use client';

import { useState } from 'react';
import { ViewState, GameType, Difficulty } from '../games/utils/types';
// Assume these components exist
import GameSelection from './GameSelection'; // Assuming this component exists
import DifficultySelector from './DifficultySelector'; // Assuming this component exists
import CompletionDialog from './CompletionDialog'; // Assuming this component exists
import VerbsGame from '../games/verbsGame';
import AdjectivesGame from '../games/adjectivesGame';
import AnimalsGame from '../games/animalsGame';
import PlantsGame from '../games/plantsGame';
import FoodGame from '../games/foodGame';
import TransportBuildingsGame from '../games/transportBuildingsGame';
import PastTenseGame from '../games/pastTenseGame';
import RegularPastTenseGame from '../games/regularPastTenseGame';
import NationsGame from '../games/nationsGame';
// import VerbsGame from '../games/verbsGame';
// ... other game imports

const GameController: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('selection');
  const [currentGameType, setCurrentGameType] = useState<GameType | undefined>(undefined);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | undefined>(undefined);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionMoves, setCompletionMoves] = useState(0);
  const [completionTime, setCompletionTime] = useState(0);
  const [completedGameType, setCompletedGameType] = useState<GameType | undefined>(undefined);

  const handleSelectGame = (gameType: GameType) => {
    setCurrentGameType(gameType);
    setViewState('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setCurrentDifficulty(difficulty);
    setViewState('game');
    // Here you would typically initialize the game state based on gameType and difficulty
  };

  const handleGameCompletion = (moves: number, time: number) => {
    // Logic to handle game completion, e.g., show score, etc.
    setViewState('completed');
    setCompletionMoves(moves);
    setCompletionTime(time);
    setCompletedGameType(currentGameType);
    setShowCompletionDialog(true);
  };

  const handlePlayAgain = () => {
    setViewState('selection');
    setCurrentGameType(undefined);
    setCurrentDifficulty(undefined);
    setShowCompletionDialog(false);
    setCompletionMoves(0);
  };

  const renderGameComponent = () => {
    if (!currentGameType || !currentDifficulty) {
 return <div>Error: Game type or difficulty not selected.</div>;
    }

    switch (currentGameType) {
      case 'verbs':
        return <VerbsGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
      case 'adjectives':
        return <AdjectivesGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'animals':
 return <AnimalsGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'plants':
 return <PlantsGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'food':
 return <FoodGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'transportBuildings':
 return <TransportBuildingsGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'pastTense':
 return <PastTenseGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'regularPastTense':
 return <RegularPastTenseGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
 case 'nations':
 return <NationsGame difficulty={currentDifficulty} onComplete={handleGameCompletion} />;
      default:
        return <div>Game type not implemented yet.</div>;
    }
  };

  return (
    <div>
      {viewState === 'selection' && <GameSelection onSelectGame={handleSelectGame} />}
      {viewState === 'difficulty' && currentGameType && <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />}
      {viewState === 'game' && renderGameComponent()}
      {viewState === 'completed' && showCompletionDialog && (
        <CompletionDialog
          isOpen={showCompletionDialog}
          onPlayAgain={handlePlayAgain}
          moves={completionMoves}
          time={completionTime} itemType={completedGameType} />
      )}
    </div>
  );
};

export default GameController;