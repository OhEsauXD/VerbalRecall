import { Difficulty, GameType } from "./types";

export const resetGameState = (gameType: GameType, difficulty: Difficulty) => {
  // This is a placeholder. The actual card generation logic
  // will depend on the specific game type and should be handled
  // within the individual game modules or a more specific utility.
  // For now, it returns a basic structure.
  return {
    cards: [], // Array to hold card data
    flippedCards: [], // Array of indices of flipped cards
    matchedPairs: 0, // Count of matched pairs
    moves: 0, // Count of moves
    startTime: null, // Start time of the game
    endTime: null, // End time of the game
    gameDuration: 0, // Duration of the game in seconds
    gameCompleted: false, // Flag to indicate if the game is completed
    hintActive: false, // Flag to indicate if a hint is active
    hintCardIndex: null, // Index of the card revealed by a hint
    hintTimer: null, // Timer for the hint
  };
};

export const getGridColsClass = (gridSize: number): string => {
  switch (gridSize) {
    case 12:
      return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12";
    case 16:
      return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12"; // Adjust as needed
    case 20:
      return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12"; // Adjust as needed
    default:
      return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12";
  }
};