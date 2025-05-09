export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameType = 'verbs' | 'adjectives' | 'animals' | 'plants' | 'food' | 'transportBuildings' | 'pastTense' | 'regularPastTense' | 'nations';

export type ViewState = 'selection' | 'difficulty' | 'game' | 'completed';

export interface CardData {
  id: string | number;
  content: string;
  type: string; // This might need refinement depending on specific game types
  isFlipped: boolean;
  isMatched: boolean;
}