import { Difficulty } from './types';

export function resetGameState() {
  // Placeholder for reset game state logic
  console.log("Game state reset");
}

export function getGridColsClass(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.Easy:
      return 'grid-cols-3';
    case Difficulty.Medium:
      return 'grid-cols-4';
    case Difficulty.Hard:
      return 'grid-cols-5';
    default:
      return 'grid-cols-3';
  }
}

// Add other shared utility functions here