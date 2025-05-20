
'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import DashboardLayout from '@/components/DashboardLayout';
import DifficultySelector from '@/components/DifficultySelector';
import CompletionDialog from '@/components/CompletionDialog';
import GameSelection from '@/components/GameSelection';
import GameEngine from '@/components/GameEngine';
import { pastTensePairs } from '@/lib/pastTense';
import { regularPastTensePairs } from '@/lib/regularPastTense';
import { nationPairs } from '@/lib/nations';
import { verbPairs } from '@/lib/verbs';
import { adjectivePairs } from '@/lib/adjectives';
import { animalPairs } from '@/lib/animals';
import { plantPairs } from '@/lib/plants';
import { foodPairs } from '@/lib/food';
import { transportBuildingPairs } from '@/lib/transportBuildings';
import { verbLockSources } from '@/lib/verbLock';
import { combinationLockSubjects } from '@/lib/combinationLock';
import { toeflTestSections } from '@/lib/toeflTestData'; 
import { TOTAL_GRAMMAR_SECTIONS, QUESTIONS_PER_GRAMMAR_SECTION } from '@/lib/toeflGrammarTestData';


export type Difficulty = 'easy' | 'medium' | 'hard';
// Added 'toeflGrammar' to GameType
export type GameType = 'verbs' | 'adjectives' | 'animals' | 'plants' | 'food' | 'transportBuildings' | 'pastTense' | 'regularPastTense' | 'nations' | 'trivia' | 'verbLock' | 'spanishEnglishTrivia' | 'combinationLock' | 'toeflPractice' | 'toeflGrammar'; 
type ViewState = 'selection' | 'difficulty' | 'game'; 

interface CompletionDialogState {
  isOpen: boolean;
  moves: number; 
  time: number;  
  itemType: GameType | null;
}

export default function Home() {
  const router = useRouter(); 
  const [view, setView] = useState<ViewState>('selection');
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | null>(null);
  const [isHintActive, setIsHintActive] = useState(false);
  const [completionDialog, setCompletionDialog] = useState<CompletionDialogState>({
    isOpen: false,
    moves: 0,
    time: 0,
    itemType: null,
  });

  const toggleHint = () => {
    setIsHintActive(prev => !prev);
  };

  const resetAllGameStates = () => {
    setIsHintActive(false);
  };

  const handleSelectGameType = (type: GameType) => {
    if (type === 'toeflPractice') {
      router.push('/toefl-practice/start'); 
      return;
    }
    if (type === 'toeflGrammar') { // Handle new TOEFL Grammar Test
      router.push('/toefl-grammar/start');
      return;
    }
    setCurrentGameType(type);
    setCurrentDifficulty(null);
    setView('difficulty');
    resetAllGameStates();
  };

  const handleGoBackToSelection = () => {
    setView('selection');
    setCurrentGameType(null);
    setCurrentDifficulty(null);
    resetAllGameStates();
  };

  const handleGoBackToDifficulty = () => {
    setView('difficulty');
    setIsHintActive(false);
  };

  const handleGoHome = () => {
    setView('selection');
    setCurrentGameType(null);
    setCurrentDifficulty(null);
    resetAllGameStates();
  };

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    setCurrentDifficulty(selectedDifficulty);
    setView('game');
    setIsHintActive(false);
  };

  const handleGameComplete = (result: { moves?: number; time?: number; score?: number; questionsAttempted?: number; locksSolved?: number }) => {
    if (currentGameType) {
      let dialogMoves = 0; 
      let dialogTime = 0; 

      if (currentGameType === 'trivia' || currentGameType === 'spanishEnglishTrivia') {
        dialogMoves = result.questionsAttempted || 0;
        dialogTime = result.score || 0;
      } else if (currentGameType === 'verbLock' || currentGameType === 'combinationLock') {
        dialogMoves = result.locksSolved || 0;
        dialogTime = result.score || 0;
      }
      else {
        dialogMoves = result.moves || 0;
        dialogTime = result.time || 0;
      }

      setCompletionDialog({
        isOpen: true,
        moves: dialogMoves,
        time: dialogTime,
        itemType: currentGameType,
      });
    }
  };


  const handlePlayAgainFromDialog = () => {
    setCompletionDialog({ isOpen: false, moves: 0, time: 0, itemType: null });
    handleGoHome();
  };

  const getItemTypeCounts = (gameType: GameType | null) => {
    switch (gameType) {
      case 'verbs':
        return { easy: 15, medium: 30, hard: Math.min(60, verbPairs.length) };
      case 'adjectives':
        return { easy: 15, medium: 30, hard: Math.min(60, adjectivePairs.length) };
      case 'animals':
        return { easy: 15, medium: 30, hard: Math.min(60, animalPairs.length) };
      case 'plants':
        return { easy: 15, medium: 30, hard: Math.min(60, plantPairs.length) };
      case 'food':
        return { easy: 15, medium: 30, hard: Math.min(60, foodPairs.length) };
      case 'transportBuildings':
        return { easy: 15, medium: 30, hard: Math.min(60, transportBuildingPairs.length) };
      case 'pastTense':
        return { easy: 15, medium: 30, hard: pastTensePairs.length };
      case 'regularPastTense':
        return { easy: 15, medium: 30, hard: regularPastTensePairs.length };
      case 'nations':
        return { easy: 15, medium: 30, hard: nationPairs.length };
      case 'trivia':
      case 'spanishEnglishTrivia':
        return { easy: 10, medium: 15, hard: Math.min(20, verbLockSources.length) };
      case 'verbLock':
        return { easy: 10, medium: 15, hard: Math.min(20, verbLockSources.length) }; 
      case 'combinationLock':
        return { easy: 3, medium: 5, hard: Math.min(7, combinationLockSubjects.length) };
      case 'toeflPractice': 
        const totalToeflQuestions = toeflTestSections.reduce((sum, sec) => sum + sec.questions.length, 0);
        return { easy: totalToeflQuestions, medium: totalToeflQuestions, hard: totalToeflQuestions }; 
      case 'toeflGrammar': // Difficulty not applicable for TOEFL Grammar in the same way
        const totalGrammarQuestions = TOTAL_GRAMMAR_SECTIONS * QUESTIONS_PER_GRAMMAR_SECTION;
        return { easy: totalGrammarQuestions, medium: totalGrammarQuestions, hard: totalGrammarQuestions };
      default:
        return { easy: 15, medium: 30, hard: 60 };
    }
  };

  const getItemTypeName = (gameType: GameType | null): string => {
     switch (gameType) {
      case 'verbs': return 'Verbs';
      case 'adjectives': return 'Adjectives';
      case 'animals': return 'Animals';
      case 'plants': return 'Plants';
      case 'food': return 'Food Items';
      case 'transportBuildings': return 'Transport/Buildings';
      case 'pastTense': return 'Irregular Past Tense Verbs';
      case 'regularPastTense': return 'Regular Past Tense Verbs';
      case 'nations': return 'Nations & Nationalities';
      case 'trivia': return 'Past Participle Trivia';
      case 'spanishEnglishTrivia': return 'Spanish to English Verb Trivia';
      case 'verbLock': return 'Verb Combination Lock';
      case 'combinationLock': return 'Combination Lock';
      case 'toeflPractice': return 'TOEFL Reading Practice Test';
      case 'toeflGrammar': return 'TOEFL Grammar Practice Test'; // New type name
      default: return 'Items';
    }
  }


  const renderContent = () => {
    switch (view) {
      case 'selection':
        return <GameSelection onSelectGame={handleSelectGameType} />;
      case 'difficulty':
        if (!currentGameType) return <GameSelection onSelectGame={handleSelectGameType} />;
         if (currentGameType === 'toeflPractice') { 
            router.push('/toefl-practice/start');
            return <div className="text-foreground">Redirecting to TOEFL Reading Test...</div>;
        }
        if (currentGameType === 'toeflGrammar') { // New check for grammar test
            router.push('/toefl-grammar/start');
            return <div className="text-foreground">Redirecting to TOEFL Grammar Test...</div>;
        }
        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold text-center my-4 text-foreground">
              Select Difficulty for {getItemTypeName(currentGameType)}
            </h2>
            <DifficultySelector
              itemType={getItemTypeName(currentGameType) as any}
              onSelectDifficulty={handleSelectDifficulty}
              onGoBack={handleGoBackToSelection}
              currentDifficulty={currentDifficulty}
              itemCounts={getItemTypeCounts(currentGameType)}
              isTrivia={currentGameType === 'trivia' || currentGameType === 'verbLock' || currentGameType === 'spanishEnglishTrivia' || currentGameType === 'combinationLock'}
            />
          </div>
        );
      case 'game':
        if (currentGameType && currentDifficulty) {
          return (
            <GameEngine
              gameType={currentGameType}
              difficulty={currentDifficulty}
              onGameComplete={handleGameComplete}
              onBackToDifficulty={handleGoBackToDifficulty}
              isHintActive={isHintActive}
              onToggleHint={toggleHint}
            />
          );
        }
        setView('selection'); 
        return <GameSelection onSelectGame={handleSelectGameType} />;
      default:
        return <GameSelection onSelectGame={handleSelectGameType} />;
    }
  };

  return (
    <DashboardLayout
      onSelectGameTypeFromSidebar={handleSelectGameType}
      onGoHome={handleGoHome}
    >
      {renderContent()}
      
      {completionDialog.isOpen && completionDialog.itemType && (
        <CompletionDialog
          isOpen={completionDialog.isOpen}
          moves={completionDialog.moves}
          time={completionDialog.time}
          onPlayAgain={handlePlayAgainFromDialog}
          itemType={completionDialog.itemType}
        />
      )}
    </DashboardLayout>
  );
}
