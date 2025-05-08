// src/types/game.ts

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameType = 'words' | 'images';

export type ViewState = 'loading' | 'selecting' | 'playing' | 'finished';

export interface CardData {
  id: string;
  value: string; // Can be a word or an image URL
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  difficulty: Difficulty;
  gameType: GameType;
  viewState: ViewState;
  cards: CardData[];
  flippedCards: number[]; // Indices of currently flipped cards
  matchedPairs: number;
  moves: number;
  timer: number;
}

export interface GameConfig {
  pairs: number;
  timer: number;
}