'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DifficultySelector from '@/components/DifficultySelector';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import CompletionDialog from '@/components/CompletionDialog';
import GameSelection from '@/components/GameSelection'; // Import the new component
import { generateGameBoard, CardData } from '@/lib/verbs';
import { generateAdjectiveGameBoard, AdjectiveCardData } from '@/lib/adjectives';
import { Button } from '@/components/ui/button';

type Difficulty = 'easy' | 'medium' | 'hard';
type GameType = 'verbs' | 'adjectives';
type ViewState = 'selection' | 'difficulty' | 'game';

export default function Home() {
  const [view, setView] = useState<ViewState>('selection');
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);

  // Verb Game State
  const [verbDifficulty, setVerbDifficulty] = useState<Difficulty | null>(null);
  const [verbCards, setVerbCards] = useState<CardData[]>([]);
  const [verbFlippedCards, setVerbFlippedCards] = useState<string[]>([]);
  const [verbMatchedPairs, setVerbMatchedPairs] = useState<number[]>([]);
  const [verbMoves, setVerbMoves] = useState(0);
  const [isVerbGameActive, setIsVerbGameActive] = useState(false);
  const [isVerbChecking, setIsVerbChecking] = useState(false);
  const [showVerbCompletionDialog, setShowVerbCompletionDialog] = useState(false);
  const [verbFinalTime, setVerbFinalTime] = useState(0);

  // Adjective Game State
  const [adjectiveDifficulty, setAdjectiveDifficulty] = useState<Difficulty | null>(null);
  const [adjectiveCards, setAdjectiveCards] = useState<AdjectiveCardData[]>([]);
  const [adjectiveFlippedCards, setAdjectiveFlippedCards] = useState<string[]>([]);
  const [adjectiveMatchedPairs, setAdjectiveMatchedPairs] = useState<number[]>([]);
  const [adjectiveMoves, setAdjectiveMoves] = useState(0);
  const [isAdjectiveGameActive, setIsAdjectiveGameActive] = useState(false);
  const [isAdjectiveChecking, setIsAdjectiveChecking] = useState(false);
  const [showAdjectiveCompletionDialog, setShowAdjectiveCompletionDialog] = useState(false);
  const [adjectiveFinalTime, setAdjectiveFinalTime] = useState(0);

  // Hint State
  const [isHintActive, setIsHintActive] = useState(false);

  const toggleHint = () => {
    setIsHintActive(prev => !prev);
  };

  const resetGameState = (difficultyStateSetter: Function, cardStateSetter: Function, gameActiveSetter: Function) => {
     difficultyStateSetter(null);
     cardStateSetter([]);
     gameActiveSetter(false);
     setVerbFlippedCards([]);
     setVerbMatchedPairs([]);
     setVerbMoves(0);
     setAdjectiveFlippedCards([]);
     setAdjectiveMatchedPairs([]);
     setAdjectiveMoves(0);
     setIsHintActive(false);
  }

  const handleSelectGameType = (type: GameType) => {
    setCurrentGameType(type);
    setView('difficulty');
  };

  const handleGoBackToSelection = () => {
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive);
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive);
  };

    const handleGoBackToDifficulty = () => {
        setView('difficulty');
        if (currentGameType === 'verbs') {
            resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive);
        } else if (currentGameType === 'adjectives') {
            resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive);
        }
    };


  // --- Verb Game Logic ---
  const startVerbGame = useCallback((selectedDifficulty: Difficulty) => {
    setVerbDifficulty(selectedDifficulty);
    const newBoard = generateGameBoard(selectedDifficulty);
    setVerbCards(newBoard);
    setVerbFlippedCards([]);
    setVerbMatchedPairs([]);
    setVerbMoves(0);
    setIsVerbGameActive(true);
    setShowVerbCompletionDialog(false);
    setVerbFinalTime(0);
    setView('game'); // Move to game view
    setIsHintActive(false);
  }, []);

  const handleVerbCardClick = (cardId: string) => {
    if (isVerbChecking || verbFlippedCards.length >= 2 || verbCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...verbFlippedCards, cardId];
    setVerbFlippedCards(newFlippedCards);
    setVerbMoves((prevMoves) => prevMoves + 1);
    setVerbCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsVerbChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = verbCards.find((card) => card.id === firstCardId);
      const secondCard = verbCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setVerbMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setVerbCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setVerbFlippedCards([]);
        setIsVerbChecking(false);
      } else {
        setTimeout(() => {
          setVerbCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setVerbFlippedCards([]);
          setIsVerbChecking(false);
        }, 1000);
      }
    }
  };

  const handleVerbTimerUpdate = (currentTime: number) => {
    if (!isVerbGameActive && showVerbCompletionDialog) {
       if (verbFinalTime === 0) setVerbFinalTime(currentTime);
    } else if (isVerbGameActive) {
        setVerbFinalTime(currentTime);
    }
  };

  const handleVerbPlayAgain = () => {
    setShowVerbCompletionDialog(false);
    setView('selection'); // Go back to game selection after completion
    setCurrentGameType(null);
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive);
  };

  useEffect(() => {
    if (isVerbGameActive && verbCards.length > 0 && verbMatchedPairs.length === verbCards.length / 2) {
      setIsVerbGameActive(false);
      setShowVerbCompletionDialog(true);
    }
  }, [verbMatchedPairs, verbCards.length, isVerbGameActive]);

  // --- Adjective Game Logic ---
  const startAdjectiveGame = useCallback((selectedDifficulty: Difficulty) => {
    setAdjectiveDifficulty(selectedDifficulty);
    const newBoard = generateAdjectiveGameBoard(selectedDifficulty);
    setAdjectiveCards(newBoard);
    setAdjectiveFlippedCards([]);
    setAdjectiveMatchedPairs([]);
    setAdjectiveMoves(0);
    setIsAdjectiveGameActive(true);
    setShowAdjectiveCompletionDialog(false);
    setAdjectiveFinalTime(0);
    setView('game'); // Move to game view
    setIsHintActive(false);
  }, []);

  const handleAdjectiveCardClick = (cardId: string) => {
    if (isAdjectiveChecking || adjectiveFlippedCards.length >= 2 || adjectiveCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...adjectiveFlippedCards, cardId];
    setAdjectiveFlippedCards(newFlippedCards);
    setAdjectiveMoves((prevMoves) => prevMoves + 1);
    setAdjectiveCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsAdjectiveChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = adjectiveCards.find((card) => card.id === firstCardId);
      const secondCard = adjectiveCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setAdjectiveMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setAdjectiveCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setAdjectiveFlippedCards([]);
        setIsAdjectiveChecking(false);
      } else {
        setTimeout(() => {
          setAdjectiveCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setAdjectiveFlippedCards([]);
          setIsAdjectiveChecking(false);
        }, 1000);
      }
    }
  };

   const handleAdjectiveTimerUpdate = (currentTime: number) => {
    if (!isAdjectiveGameActive && showAdjectiveCompletionDialog) {
       if (adjectiveFinalTime === 0) setAdjectiveFinalTime(currentTime);
    } else if (isAdjectiveGameActive) {
        setAdjectiveFinalTime(currentTime);
    }
  };


  const handleAdjectivePlayAgain = () => {
    setShowAdjectiveCompletionDialog(false);
    setView('selection'); // Go back to game selection after completion
    setCurrentGameType(null);
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive);
  };

   useEffect(() => {
    if (isAdjectiveGameActive && adjectiveCards.length > 0 && adjectiveMatchedPairs.length === adjectiveCards.length / 2) {
      setIsAdjectiveGameActive(false);
      setShowAdjectiveCompletionDialog(true);
    }
  }, [adjectiveMatchedPairs, adjectiveCards.length, isAdjectiveGameActive]);


  // --- Difficulty Selection ---
  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    if (currentGameType === 'verbs') {
      startVerbGame(selectedDifficulty);
    } else if (currentGameType === 'adjectives') {
      startAdjectiveGame(selectedDifficulty);
    }
  };

  // --- Grid Columns ---
  const getGridColsClass = (difficulty: Difficulty | null) => difficulty === 'easy' ? 'grid-cols-5 sm:grid-cols-6' :
                       difficulty === 'medium' ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' :
                       'grid-cols-8 sm:grid-cols-10 md:grid-cols-12';


  const renderContent = () => {
    switch (view) {
      case 'selection':
        return <GameSelection onSelectGame={handleSelectGameType} />;
      case 'difficulty':
        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold text-center my-4 text-primary-foreground">
                Select Difficulty for {currentGameType === 'verbs' ? 'Verbs' : 'Adjectives'}
            </h2>
            <DifficultySelector
              itemType={currentGameType === 'verbs' ? 'Verbs' : 'Adjectives'}
              onSelectDifficulty={handleSelectDifficulty}
              onGoBack={handleGoBackToSelection}
              // Pass null initially, will be set by the specific game logic later
              currentDifficulty={currentGameType === 'verbs' ? verbDifficulty : adjectiveDifficulty}
            />
          </div>
        );
      case 'game':
        if (currentGameType === 'verbs') {
          return (
            <>
              <GameStatus
                moves={verbMoves}
                isGameActive={isVerbGameActive}
                onTimerUpdate={handleVerbTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(verbDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {verbCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.verb}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handleVerbCardClick}
                    language={card.language}
                    isHintActive={isHintActive}
                  />
                ))}
              </div>
              <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
                Back to Difficulty
              </Button>
            </>
          );
        } else if (currentGameType === 'adjectives') {
          return (
             <>
              <GameStatus
                moves={adjectiveMoves}
                isGameActive={isAdjectiveGameActive}
                onTimerUpdate={handleAdjectiveTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(adjectiveDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {adjectiveCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.text}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handleAdjectiveCardClick}
                    language={card.language}
                     isHintActive={isHintActive}
                  />
                ))}
              </div>
              <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
                Back to Difficulty
              </Button>
            </>
          );
        }
        return null; // Should not happen if currentGameType is set
      default:
        return <GameSelection onSelectGame={handleSelectGameType} />;
    }
  };

  return (
    <DashboardLayout>
        <div className="flex flex-col items-center justify-start p-4 w-full h-full"> {/* Ensure content takes full height */}
          {renderContent()}
        </div>


      <CompletionDialog
        isOpen={showVerbCompletionDialog}
        moves={verbMoves}
        time={verbFinalTime}
        onPlayAgain={handleVerbPlayAgain}
        itemType="verb"
      />
       <CompletionDialog
        isOpen={showAdjectiveCompletionDialog}
        moves={adjectiveMoves}
        time={adjectiveFinalTime}
        onPlayAgain={handleAdjectivePlayAgain}
        itemType="adjective"
      />
    </DashboardLayout>
  );
}
