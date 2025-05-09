import { Difficulty } from './types';

export const resetGameState = (setCards: (cards: any[]) => void, setIsGameComplete: (isComplete: boolean) => void, setMoves: (moves: number) => void, setTime: (time: number) => void, setIsGameActive: (isActive: boolean) => void, setIsHintActive: (isHintActive: boolean) => void) => {
  setCards([]);
  setIsGameComplete(false);
  setMoves(0);
  setTime(0);
  setIsGameActive(false);
  setIsHintActive(false);
};

export const getGridColsClass = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case Difficulty.Easy:
      return 'grid-cols-4';
    case Difficulty.Medium:
      return 'grid-cols-5';
    case Difficulty.Hard:
      return 'grid-cols-6';
    default:
      return 'grid-cols-4';
  }
};