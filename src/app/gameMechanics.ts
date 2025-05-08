import { useState, useEffect, useCallback } from 'react';

interface Card {
  id: number;
  value: any; // Can be any type, as per the prompt's restriction
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: Card[];
  flippedCards: number[]; // Array of indices of flipped cards
  isProcessing: boolean;
  moves: number;
  matches: number;
  gameTime: number;
  isGameComplete: boolean;
}

/**
 * Initializes the game state with a shuffled deck of cards.
 * The values for the cards should be provided externally.
 *
 * @param cardValues - An array of values for the cards. Each value should appear twice.
 * @returns The initial game state.
 */
export function initializeGame(cardValues: any[]): GameState {
  const cards: Card[] = [];
  const shuffledValues = shuffleArray([...cardValues, ...cardValues]);

  for (let i = 0; i < shuffledValues.length; i++) {
    cards.push({
      id: i,
      value: shuffledValues[i],
      isFlipped: false,
      isMatched: false,
    });
  }

  return {
    cards,
    flippedCards: [],
    isProcessing: false,
    moves: 0,
    matches: 0,
 gameTime: 0,
 isGameComplete: false,
  };
}

/**
 * Handles a card flip action.
 *
 * @param currentState - The current game state.
 * @param cardIndex - The index of the card that was flipped.
 * @returns The new game state after the flip.
 */
export function handleCardFlip(currentState: GameState, cardIndex: number): GameState {
 const newCards = [...currentState.cards];
  const newFlippedCards = [...currentState.flippedCards];
  let newMoves = currentState.moves;
  let newMatches = currentState.matches;
  let isProcessing = currentState.isProcessing;

  // Ignore if card is already flipped or matched, or if currently processing a match
  if (newCards[cardIndex].isFlipped || newCards[cardIndex].isMatched || isProcessing) {
    return currentState;
  }

  // Flip the card
  newCards[cardIndex].isFlipped = true;
  newFlippedCards.push(cardIndex);
  newMoves++;

  // Check for a match if two cards are flipped
  if (newFlippedCards.length === 2) {
    isProcessing = true;
    const [cardIndex1, cardIndex2] = newFlippedCards;

    if (newCards[cardIndex1].value === newCards[cardIndex2].value) {
      // Match found
      newCards[cardIndex1].isMatched = true;
      newCards[cardIndex2].isMatched = true;
      newMatches++;
      newFlippedCards.length = 0; // Clear flipped cards
      isProcessing = false;
    } else {
      // No match, flip back after a delay (handled externally by the UI)
      // The UI will need to call a function to flip these back after a timeout
      // The flipBackNonMatchingCards function is provided for this purpose
    }
  } else if (newFlippedCards.length > 2) {
 // This can happen if a user clicks very quickly. Handle by flipping back previous cards.
      for (let i = 0; i < newFlippedCards.length - 1; i++) {
 newCards[newFlippedCards[i]].isFlipped = false;
      }
      newFlippedCards.splice(0, newFlippedCards.length - 1); // Keep only the last flipped card
      isProcessing = false;
  }


  return {
    ...currentState,
    cards: newCards,
    flippedCards: newFlippedCards,
    isProcessing,
    moves: newMoves,
    matches: newMatches,
 gameTime: currentState.gameTime,
 isGameComplete: currentState.isGameComplete,
  };
}

/**
 * Resets the game to its initial state with a new shuffle.
 *
 * @param currentState - The current game state.
 * @param cardValues - The original array of values for the cards.
 * @returns The new, reset game state.
 */
export function resetGame(currentState: GameState, cardValues: any[]): GameState {
    return initializeGame(cardValues);
}


/**
 * Flips back the currently flipped cards that did not match.
 * This function is intended to be called by the UI after a delay
 * when a non-match is detected.
 *
 * @param currentState - The current game state.
 * @returns The new game state with non-matching cards flipped back.
 */
export function flipBackNonMatchingCards(currentState: GameState): GameState {
    if (currentState.flippedCards.length !== 2 || !currentState.isProcessing) {
        return currentState; // Only act if there are exactly two flipped cards
    }

    const newCards = [...currentState.cards];
    const [cardIndex1, cardIndex2] = currentState.flippedCards;

    // Check if they are not already matched (shouldn't be, but good practice)
    if (!newCards[cardIndex1].isMatched && !newCards[cardIndex2].isMatched) {
        newCards[cardIndex1].isFlipped = false;
        newCards[cardIndex2].isFlipped = false;
    }


    return {
        ...currentState,
        cards: newCards,
        flippedCards: [], // Clear flipped cards
        isProcessing: false, // Release processing lock
 gameTime: currentState.gameTime,
 isGameComplete: currentState.isGameComplete,
    };
}


/**
 * Helper function to shuffle an array.
 * @param array - The array to shuffle.
 * @returns A new shuffled array.
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}

// Custom hook to manage the game state
export function useMemoryGame(cardValues: any[]) {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame(cardValues));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setGameState(initializeGame(cardValues));
  }, [cardValues]);

  const handleCardClick = useCallback((cardIndex: number) => {
    if (!isGameStarted || gameState.isGameComplete) return;

    const newState = handleCardFlip(gameState, cardIndex);
    setGameState(newState);

    // If two cards are flipped and they don't match, schedule a flip back
    if (newState.flippedCards.length === 2 && newState.isProcessing) {
        setTimeout(() => {
            setGameState(prevState => flipBackNonMatchingCards(prevState));
        }, 1000); // 1-second delay
    }
  }, [gameState, isGameStarted]);

  const playAgain = useCallback(() => {
    setIsGameStarted(false);
    setGameState(initializeGame(cardValues));
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [cardValues, timer]);

  // Effect for starting the timer when the game starts
  useEffect(() => {
    if (isGameStarted && !gameState.isGameComplete && timer === null) {
      const gameTimer = setInterval(() => {
        setGameState(prevState => ({
          ...prevState,
          gameTime: prevState.gameTime + 1,
        }));
      }, 1000);
      setTimer(gameTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isGameStarted, gameState.isGameComplete, timer]);

  // Effect to check for game completion
  useEffect(() => {
    if (isGameStarted && gameState.matches === cardValues.length) {
      setGameState(prevState => ({
        ...prevState,
        isGameComplete: true,
      }));
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }
  }, [isGameStarted, gameState.matches, cardValues.length, timer]);

  return {
    gameState,
    isGameStarted,
    startGame,
    handleCardClick,
    playAgain,
  };
}

// Define a type for the game subjects
export type GameSubject = 'animals' | 'food' | 'nations' | 'plants' | 'transport/buildings' | 'adjectives' | 'verbs' | 'past tense';

// Interfaces for different game types
export interface AnimalsGame {
  type: 'animals';
  data: string[]; // Array of animal names
}

export interface WordsGame {
  type: 'adjectives' | 'verbs' | 'past tense';
  data: { base: string; match: string }[]; // Array of objects with base and matching words
}

export interface ImageTextGame {
  type: 'food' | 'nations' | 'plants' | 'transport/buildings';
  data: { image: string; text: string }[]; // Array of objects with image URLs and corresponding text
}