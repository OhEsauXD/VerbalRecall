export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameType = 'verbs' | 'adjectives' | 'animals' | 'plants' | 'food' | 'transportBuildings' | 'pastTense' | 'regularPastTense' | 'nations';
export type ViewState = 'selection' | 'difficulty' | 'game';

export interface DifficultySelectorProps {
  itemType: string;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onGoBack: () => void;
  currentDifficulty: Difficulty | null;
  itemCounts: { easy: number; medium: number; hard: number };
}