
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DifficultySelector from '@/components/DifficultySelector';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import CompletionDialog from '@/components/CompletionDialog';
import GameSelection from '@/components/GameSelection';
import { generateGameBoard, CardData as VerbCardData } from '@/lib/verbs';
import { generateAdjectiveGameBoard, AdjectiveCardData } from '@/lib/adjectives';
import { generateAnimalGameBoard, AnimalCardData } from '@/lib/animals';
import { generatePlantGameBoard, PlantCardData } from '@/lib/plants'; // Import plant game logic
import { Button } from '@/components/ui/button';

type Difficulty = 'easy' | 'medium' | 'hard';
export type GameType = 'verbs' | 'adjectives' | 'animals' | 'plants'; // Add 'plants'
type ViewState = 'selection' | 'difficulty' | 'game';

export default function Home() {
  const [view, setView] = useState<ViewState>('selection');
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);

  // Verb Game State
  const [verbDifficulty, setVerbDifficulty] = useState<Difficulty | null>(null);
  const [verbCards, setVerbCards] = useState<VerbCardData[]>([]);
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

  // Animal Game State
  const [animalDifficulty, setAnimalDifficulty] = useState<Difficulty | null>(null);
  const [animalCards, setAnimalCards] = useState<AnimalCardData[]>([]);
  const [animalFlippedCards, setAnimalFlippedCards] = useState<string[]>([]);
  const [animalMatchedPairs, setAnimalMatchedPairs] = useState<number[]>([]);
  const [animalMoves, setAnimalMoves] = useState(0);
  const [isAnimalGameActive, setIsAnimalGameActive] = useState(false);
  const [isAnimalChecking, setIsAnimalChecking] = useState(false);
  const [showAnimalCompletionDialog, setShowAnimalCompletionDialog] = useState(false);
  const [animalFinalTime, setAnimalFinalTime] = useState(0);

  // Plant Game State
  const [plantDifficulty, setPlantDifficulty] = useState<Difficulty | null>(null);
  const [plantCards, setPlantCards] = useState<PlantCardData[]>([]);
  const [plantFlippedCards, setPlantFlippedCards] = useState<string[]>([]);
  const [plantMatchedPairs, setPlantMatchedPairs] = useState<number[]>([]);
  const [plantMoves, setPlantMoves] = useState(0);
  const [isPlantGameActive, setIsPlantGameActive] = useState(false);
  const [isPlantChecking, setIsPlantChecking] = useState(false);
  const [showPlantCompletionDialog, setShowPlantCompletionDialog] = useState(false);
  const [plantFinalTime, setPlantFinalTime] = useState(0);


  // Hint State
  const [isHintActive, setIsHintActive] = useState(false);

  const toggleHint = () => {
    setIsHintActive(prev => !prev);
  };

  const resetGameState = (difficultyStateSetter: Function, cardStateSetter: Function, gameActiveSetter: Function, flippedSetter: Function, matchedSetter: Function, movesSetter: Function) => {
     difficultyStateSetter(null);
     cardStateSetter([]);
     gameActiveSetter(false);
     flippedSetter([]);
     matchedSetter([]);
     movesSetter(0);
     setIsHintActive(false); // Reset hint as well
  }

  const handleSelectGameType = (type: GameType) => {
    setCurrentGameType(type);
    setView('difficulty');
    // Reset other game states
    if (type !== 'verbs') {
        resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
    }
    if (type !== 'adjectives') {
         resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
    }
     if (type !== 'animals') {
         resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
    }
    if (type !== 'plants') {
        resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
    }
  };

  const handleGoBackToSelection = () => {
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
    resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
    resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
  };

    const handleGoBackToDifficulty = () => {
        setView('difficulty');
        if (currentGameType === 'verbs') {
            resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
        } else if (currentGameType === 'adjectives') {
            resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
        } else if (currentGameType === 'animals') {
            resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
        } else if (currentGameType === 'plants') {
            resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
        }
    };

  const handleGoHome = () => {
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
    resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
    resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
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
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
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
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
  };

   useEffect(() => {
    if (isAdjectiveGameActive && adjectiveCards.length > 0 && adjectiveMatchedPairs.length === adjectiveCards.length / 2) {
      setIsAdjectiveGameActive(false);
      setShowAdjectiveCompletionDialog(true);
    }
  }, [adjectiveMatchedPairs, adjectiveCards.length, isAdjectiveGameActive]);


  // --- Animal Game Logic ---
  const startAnimalGame = useCallback((selectedDifficulty: Difficulty) => {
    setAnimalDifficulty(selectedDifficulty);
    const newBoard = generateAnimalGameBoard(selectedDifficulty);
    setAnimalCards(newBoard);
    setAnimalFlippedCards([]);
    setAnimalMatchedPairs([]);
    setAnimalMoves(0);
    setIsAnimalGameActive(true);
    setShowAnimalCompletionDialog(false);
    setAnimalFinalTime(0);
    setView('game'); // Move to game view
    setIsHintActive(false);
  }, []);

  const handleAnimalCardClick = (cardId: string) => {
    if (isAnimalChecking || animalFlippedCards.length >= 2 || animalCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...animalFlippedCards, cardId];
    setAnimalFlippedCards(newFlippedCards);
    setAnimalMoves((prevMoves) => prevMoves + 1);
    setAnimalCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsAnimalChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = animalCards.find((card) => card.id === firstCardId);
      const secondCard = animalCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setAnimalMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setAnimalCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setAnimalFlippedCards([]);
        setIsAnimalChecking(false);
      } else {
        setTimeout(() => {
          setAnimalCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setAnimalFlippedCards([]);
          setIsAnimalChecking(false);
        }, 1000);
      }
    }
  };

   const handleAnimalTimerUpdate = (currentTime: number) => {
    if (!isAnimalGameActive && showAnimalCompletionDialog) {
       if (animalFinalTime === 0) setAnimalFinalTime(currentTime);
    } else if (isAnimalGameActive) {
        setAnimalFinalTime(currentTime);
    }
  };


  const handleAnimalPlayAgain = () => {
    setShowAnimalCompletionDialog(false);
    setView('selection'); // Go back to game selection after completion
    setCurrentGameType(null);
    resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
  };

   useEffect(() => {
    if (isAnimalGameActive && animalCards.length > 0 && animalMatchedPairs.length === animalCards.length / 2) {
      setIsAnimalGameActive(false);
      setShowAnimalCompletionDialog(true);
    }
  }, [animalMatchedPairs, animalCards.length, isAnimalGameActive]);

  // --- Plant Game Logic ---
  const startPlantGame = useCallback((selectedDifficulty: Difficulty) => {
    setPlantDifficulty(selectedDifficulty);
    const newBoard = generatePlantGameBoard(selectedDifficulty);
    setPlantCards(newBoard);
    setPlantFlippedCards([]);
    setPlantMatchedPairs([]);
    setPlantMoves(0);
    setIsPlantGameActive(true);
    setShowPlantCompletionDialog(false);
    setPlantFinalTime(0);
    setView('game');
    setIsHintActive(false);
  }, []);

  const handlePlantCardClick = (cardId: string) => {
    if (isPlantChecking || plantFlippedCards.length >= 2 || plantCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...plantFlippedCards, cardId];
    setPlantFlippedCards(newFlippedCards);
    setPlantMoves((prevMoves) => prevMoves + 1);
    setPlantCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsPlantChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = plantCards.find((card) => card.id === firstCardId);
      const secondCard = plantCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setPlantMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setPlantCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setPlantFlippedCards([]);
        setIsPlantChecking(false);
      } else {
        setTimeout(() => {
          setPlantCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setPlantFlippedCards([]);
          setIsPlantChecking(false);
        }, 1000);
      }
    }
  };

   const handlePlantTimerUpdate = (currentTime: number) => {
    if (!isPlantGameActive && showPlantCompletionDialog) {
       if (plantFinalTime === 0) setPlantFinalTime(currentTime);
    } else if (isPlantGameActive) {
        setPlantFinalTime(currentTime);
    }
  };


  const handlePlantPlayAgain = () => {
    setShowPlantCompletionDialog(false);
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
  };

   useEffect(() => {
    if (isPlantGameActive && plantCards.length > 0 && plantMatchedPairs.length === plantCards.length / 2) {
      setIsPlantGameActive(false);
      setShowPlantCompletionDialog(true);
    }
  }, [plantMatchedPairs, plantCards.length, isPlantGameActive]);


  // --- Difficulty Selection ---
  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    if (currentGameType === 'verbs') {
      startVerbGame(selectedDifficulty);
    } else if (currentGameType === 'adjectives') {
      startAdjectiveGame(selectedDifficulty);
    } else if (currentGameType === 'animals') {
        startAnimalGame(selectedDifficulty);
    } else if (currentGameType === 'plants') {
        startPlantGame(selectedDifficulty);
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
        const itemType = currentGameType === 'verbs' ? 'Verbs' :
                         currentGameType === 'adjectives' ? 'Adjectives' :
                         currentGameType === 'animals' ? 'Animals' :
                         'Plants'; // Add Plants type
        const currentDifficulty = currentGameType === 'verbs' ? verbDifficulty :
                                currentGameType === 'adjectives' ? adjectiveDifficulty :
                                currentGameType === 'animals' ? animalDifficulty :
                                plantDifficulty; // Add Plant difficulty
        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold text-center my-4 text-foreground">
                Select Difficulty for {itemType}
            </h2>
            <DifficultySelector
              itemType={itemType}
              onSelectDifficulty={handleSelectDifficulty}
              onGoBack={handleGoBackToSelection}
              currentDifficulty={currentDifficulty}
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
                    cardType='verb'
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
                     cardType='adjective'
                  />
                ))}
              </div>
              <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
                Back to Difficulty
              </Button>
            </>
          );
        } else if (currentGameType === 'animals') {
           return (
             <>
              <GameStatus
                moves={animalMoves}
                isGameActive={isAnimalGameActive}
                onTimerUpdate={handleAnimalTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(animalDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {animalCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.type === 'name' ? card.name : undefined}
                    imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                    spanishName={card.type === 'image' ? card.spanishName : undefined}
                    dataAiHint={card.dataAiHint}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handleAnimalCardClick}
                    language={card.language}
                    isHintActive={isHintActive}
                    cardType={card.type}
                  />
                ))}
              </div>
              <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
                Back to Difficulty
              </Button>
            </>
          );
        } else if (currentGameType === 'plants') { // Add Plants case
           return (
             <>
              <GameStatus
                moves={plantMoves}
                isGameActive={isPlantGameActive}
                onTimerUpdate={handlePlantTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(plantDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {plantCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.type === 'name' ? card.name : undefined}
                    imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                    spanishName={card.type === 'image' ? card.spanishName : undefined}
                    dataAiHint={card.dataAiHint}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handlePlantCardClick}
                    language={card.language}
                    isHintActive={isHintActive}
                    cardType={card.type}
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
    <DashboardLayout
      onSelectGameTypeFromSidebar={handleSelectGameType}
      onGoHome={handleGoHome}
    >
        <div className="flex flex-col items-center justify-start p-4 w-full h-full">
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
       <CompletionDialog
        isOpen={showAnimalCompletionDialog}
        moves={animalMoves}
        time={animalFinalTime}
        onPlayAgain={handleAnimalPlayAgain}
        itemType="animal"
      />
       <CompletionDialog
        isOpen={showPlantCompletionDialog}
        moves={plantMoves}
        time={plantFinalTime}
        onPlayAgain={handlePlantPlayAgain}
        itemType="plant"
      />
    </DashboardLayout>
  );
}
