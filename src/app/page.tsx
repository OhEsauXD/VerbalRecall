
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
import { generatePlantGameBoard, PlantCardData } from '@/lib/plants';
import { generateFoodGameBoard, FoodCardData } from '@/lib/food';
import { generateTransportBuildingGameBoard, TransportBuildingCardData } from '@/lib/transportBuildings';
import { generatePastTenseGameBoard, PastTenseCardData, pastTensePairs } from '@/lib/pastTense'; // Import Past Tense game logic and pairs
import { Button } from '@/components/ui/button';

type Difficulty = 'easy' | 'medium' | 'hard';
export type GameType = 'verbs' | 'adjectives' | 'animals' | 'plants' | 'food' | 'transportBuildings' | 'pastTense'; // Add 'pastTense'
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

  // Food Game State
  const [foodDifficulty, setFoodDifficulty] = useState<Difficulty | null>(null);
  const [foodCards, setFoodCards] = useState<FoodCardData[]>([]);
  const [foodFlippedCards, setFoodFlippedCards] = useState<string[]>([]);
  const [foodMatchedPairs, setFoodMatchedPairs] = useState<number[]>([]);
  const [foodMoves, setFoodMoves] = useState(0);
  const [isFoodGameActive, setIsFoodGameActive] = useState(false);
  const [isFoodChecking, setIsFoodChecking] = useState(false);
  const [showFoodCompletionDialog, setShowFoodCompletionDialog] = useState(false);
  const [foodFinalTime, setFoodFinalTime] = useState(0);

  // Transport/Buildings Game State
  const [transportBuildingDifficulty, setTransportBuildingDifficulty] = useState<Difficulty | null>(null);
  const [transportBuildingCards, setTransportBuildingCards] = useState<TransportBuildingCardData[]>([]);
  const [transportBuildingFlippedCards, setTransportBuildingFlippedCards] = useState<string[]>([]);
  const [transportBuildingMatchedPairs, setTransportBuildingMatchedPairs] = useState<number[]>([]);
  const [transportBuildingMoves, setTransportBuildingMoves] = useState(0);
  const [isTransportBuildingGameActive, setIsTransportBuildingGameActive] = useState(false);
  const [isTransportBuildingChecking, setIsTransportBuildingChecking] = useState(false);
  const [showTransportBuildingCompletionDialog, setShowTransportBuildingCompletionDialog] = useState(false);
  const [transportBuildingFinalTime, setTransportBuildingFinalTime] = useState(0);

  // Past Tense Game State
  const [pastTenseDifficulty, setPastTenseDifficulty] = useState<Difficulty | null>(null);
  const [pastTenseCards, setPastTenseCards] = useState<PastTenseCardData[]>([]);
  const [pastTenseFlippedCards, setPastTenseFlippedCards] = useState<string[]>([]);
  const [pastTenseMatchedPairs, setPastTenseMatchedPairs] = useState<number[]>([]);
  const [pastTenseMoves, setPastTenseMoves] = useState(0);
  const [isPastTenseGameActive, setIsPastTenseGameActive] = useState(false);
  const [isPastTenseChecking, setIsPastTenseChecking] = useState(false);
  const [showPastTenseCompletionDialog, setShowPastTenseCompletionDialog] = useState(false);
  const [pastTenseFinalTime, setPastTenseFinalTime] = useState(0);


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
    if (type !== 'food') {
        resetGameState(setFoodDifficulty, setFoodCards, setIsFoodGameActive, setFoodFlippedCards, setFoodMatchedPairs, setFoodMoves);
    }
    if (type !== 'transportBuildings') {
        resetGameState(setTransportBuildingDifficulty, setTransportBuildingCards, setIsTransportBuildingGameActive, setTransportBuildingFlippedCards, setTransportBuildingMatchedPairs, setTransportBuildingMoves);
    }
    if (type !== 'pastTense') {
        resetGameState(setPastTenseDifficulty, setPastTenseCards, setIsPastTenseGameActive, setPastTenseFlippedCards, setPastTenseMatchedPairs, setPastTenseMoves);
    }
  };

  const handleGoBackToSelection = () => {
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
    resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
    resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
    resetGameState(setFoodDifficulty, setFoodCards, setIsFoodGameActive, setFoodFlippedCards, setFoodMatchedPairs, setFoodMoves);
    resetGameState(setTransportBuildingDifficulty, setTransportBuildingCards, setIsTransportBuildingGameActive, setTransportBuildingFlippedCards, setTransportBuildingMatchedPairs, setTransportBuildingMoves);
    resetGameState(setPastTenseDifficulty, setPastTenseCards, setIsPastTenseGameActive, setPastTenseFlippedCards, setPastTenseMatchedPairs, setPastTenseMoves);
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
        } else if (currentGameType === 'food') {
            resetGameState(setFoodDifficulty, setFoodCards, setIsFoodGameActive, setFoodFlippedCards, setFoodMatchedPairs, setFoodMoves);
        } else if (currentGameType === 'transportBuildings') {
            resetGameState(setTransportBuildingDifficulty, setTransportBuildingCards, setIsTransportBuildingGameActive, setTransportBuildingFlippedCards, setTransportBuildingMatchedPairs, setTransportBuildingMoves);
        } else if (currentGameType === 'pastTense') {
             resetGameState(setPastTenseDifficulty, setPastTenseCards, setIsPastTenseGameActive, setPastTenseFlippedCards, setPastTenseMatchedPairs, setPastTenseMoves);
        }
    };

  const handleGoHome = () => {
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setVerbDifficulty, setVerbCards, setIsVerbGameActive, setVerbFlippedCards, setVerbMatchedPairs, setVerbMoves);
    resetGameState(setAdjectiveDifficulty, setAdjectiveCards, setIsAdjectiveGameActive, setAdjectiveFlippedCards, setAdjectiveMatchedPairs, setAdjectiveMoves);
    resetGameState(setAnimalDifficulty, setAnimalCards, setIsAnimalGameActive, setAnimalFlippedCards, setAnimalMatchedPairs, setAnimalMoves);
    resetGameState(setPlantDifficulty, setPlantCards, setIsPlantGameActive, setPlantFlippedCards, setPlantMatchedPairs, setPlantMoves);
    resetGameState(setFoodDifficulty, setFoodCards, setIsFoodGameActive, setFoodFlippedCards, setFoodMatchedPairs, setFoodMoves);
    resetGameState(setTransportBuildingDifficulty, setTransportBuildingCards, setIsTransportBuildingGameActive, setTransportBuildingFlippedCards, setTransportBuildingMatchedPairs, setTransportBuildingMoves);
    resetGameState(setPastTenseDifficulty, setPastTenseCards, setIsPastTenseGameActive, setPastTenseFlippedCards, setPastTenseMatchedPairs, setPastTenseMoves);
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


  // --- Food Game Logic ---
  const startFoodGame = useCallback((selectedDifficulty: Difficulty) => {
    setFoodDifficulty(selectedDifficulty);
    const newBoard = generateFoodGameBoard(selectedDifficulty);
    setFoodCards(newBoard);
    setFoodFlippedCards([]);
    setFoodMatchedPairs([]);
    setFoodMoves(0);
    setIsFoodGameActive(true);
    setShowFoodCompletionDialog(false);
    setFoodFinalTime(0);
    setView('game');
    setIsHintActive(false);
  }, []);

  const handleFoodCardClick = (cardId: string) => {
    if (isFoodChecking || foodFlippedCards.length >= 2 || foodCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...foodFlippedCards, cardId];
    setFoodFlippedCards(newFlippedCards);
    setFoodMoves((prevMoves) => prevMoves + 1);
    setFoodCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsFoodChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = foodCards.find((card) => card.id === firstCardId);
      const secondCard = foodCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setFoodMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setFoodCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setFoodFlippedCards([]);
        setIsFoodChecking(false);
      } else {
        setTimeout(() => {
          setFoodCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setFoodFlippedCards([]);
          setIsFoodChecking(false);
        }, 1000);
      }
    }
  };

   const handleFoodTimerUpdate = (currentTime: number) => {
    if (!isFoodGameActive && showFoodCompletionDialog) {
       if (foodFinalTime === 0) setFoodFinalTime(currentTime);
    } else if (isFoodGameActive) {
        setFoodFinalTime(currentTime);
    }
  };


  const handleFoodPlayAgain = () => {
    setShowFoodCompletionDialog(false);
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setFoodDifficulty, setFoodCards, setIsFoodGameActive, setFoodFlippedCards, setFoodMatchedPairs, setFoodMoves);
  };

   useEffect(() => {
    if (isFoodGameActive && foodCards.length > 0 && foodMatchedPairs.length === foodCards.length / 2) {
      setIsFoodGameActive(false);
      setShowFoodCompletionDialog(true);
    }
  }, [foodMatchedPairs, foodCards.length, isFoodGameActive]);

  // --- Transport/Buildings Game Logic ---
  const startTransportBuildingGame = useCallback((selectedDifficulty: Difficulty) => {
    setTransportBuildingDifficulty(selectedDifficulty);
    const newBoard = generateTransportBuildingGameBoard(selectedDifficulty);
    setTransportBuildingCards(newBoard);
    setTransportBuildingFlippedCards([]);
    setTransportBuildingMatchedPairs([]);
    setTransportBuildingMoves(0);
    setIsTransportBuildingGameActive(true);
    setShowTransportBuildingCompletionDialog(false);
    setTransportBuildingFinalTime(0);
    setView('game');
    setIsHintActive(false);
  }, []);

  const handleTransportBuildingCardClick = (cardId: string) => {
    if (isTransportBuildingChecking || transportBuildingFlippedCards.length >= 2 || transportBuildingCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...transportBuildingFlippedCards, cardId];
    setTransportBuildingFlippedCards(newFlippedCards);
    setTransportBuildingMoves((prevMoves) => prevMoves + 1);
    setTransportBuildingCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsTransportBuildingChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = transportBuildingCards.find((card) => card.id === firstCardId);
      const secondCard = transportBuildingCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setTransportBuildingMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setTransportBuildingCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setTransportBuildingFlippedCards([]);
        setIsTransportBuildingChecking(false);
      } else {
        setTimeout(() => {
          setTransportBuildingCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setTransportBuildingFlippedCards([]);
          setIsTransportBuildingChecking(false);
        }, 1000);
      }
    }
  };

   const handleTransportBuildingTimerUpdate = (currentTime: number) => {
    if (!isTransportBuildingGameActive && showTransportBuildingCompletionDialog) {
       if (transportBuildingFinalTime === 0) setTransportBuildingFinalTime(currentTime);
    } else if (isTransportBuildingGameActive) {
        setTransportBuildingFinalTime(currentTime);
    }
  };

  const handleTransportBuildingPlayAgain = () => {
    setShowTransportBuildingCompletionDialog(false);
    setView('selection');
    setCurrentGameType(null);
    resetGameState(setTransportBuildingDifficulty, setTransportBuildingCards, setIsTransportBuildingGameActive, setTransportBuildingFlippedCards, setTransportBuildingMatchedPairs, setTransportBuildingMoves);
  };

   useEffect(() => {
    if (isTransportBuildingGameActive && transportBuildingCards.length > 0 && transportBuildingMatchedPairs.length === transportBuildingCards.length / 2) {
      setIsTransportBuildingGameActive(false);
      setShowTransportBuildingCompletionDialog(true);
    }
  }, [transportBuildingMatchedPairs, transportBuildingCards.length, isTransportBuildingGameActive]);

    // --- Past Tense Game Logic ---
    const startPastTenseGame = useCallback((selectedDifficulty: Difficulty) => {
        setPastTenseDifficulty(selectedDifficulty);
        const newBoard = generatePastTenseGameBoard(selectedDifficulty);
        setPastTenseCards(newBoard);
        setPastTenseFlippedCards([]);
        setPastTenseMatchedPairs([]);
        setPastTenseMoves(0);
        setIsPastTenseGameActive(true);
        setShowPastTenseCompletionDialog(false);
        setPastTenseFinalTime(0);
        setView('game');
        setIsHintActive(false);
    }, []);

    const handlePastTenseCardClick = (cardId: string) => {
        if (isPastTenseChecking || pastTenseFlippedCards.length >= 2 || pastTenseCards.find(c => c.id === cardId)?.isFlipped) {
            return;
        }
        const newFlippedCards = [...pastTenseFlippedCards, cardId];
        setPastTenseFlippedCards(newFlippedCards);
        setPastTenseMoves((prevMoves) => prevMoves + 1);
        setPastTenseCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

        if (newFlippedCards.length === 2) {
            setIsPastTenseChecking(true);
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = pastTenseCards.find((card) => card.id === firstCardId);
            const secondCard = pastTenseCards.find((card) => card.id === secondCardId);

            if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
                setPastTenseMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
                setPastTenseCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
                setPastTenseFlippedCards([]);
                setIsPastTenseChecking(false);
            } else {
                setTimeout(() => {
                    setPastTenseCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
                    setPastTenseFlippedCards([]);
                    setIsPastTenseChecking(false);
                }, 1000);
            }
        }
    };

    const handlePastTenseTimerUpdate = (currentTime: number) => {
        if (!isPastTenseGameActive && showPastTenseCompletionDialog) {
            if (pastTenseFinalTime === 0) setPastTenseFinalTime(currentTime);
        } else if (isPastTenseGameActive) {
            setPastTenseFinalTime(currentTime);
        }
    };

    const handlePastTensePlayAgain = () => {
        setShowPastTenseCompletionDialog(false);
        setView('selection');
        setCurrentGameType(null);
        resetGameState(setPastTenseDifficulty, setPastTenseCards, setIsPastTenseGameActive, setPastTenseFlippedCards, setPastTenseMatchedPairs, setPastTenseMoves);
    };

    useEffect(() => {
        if (isPastTenseGameActive && pastTenseCards.length > 0 && pastTenseMatchedPairs.length === pastTenseCards.length / 2) {
            setIsPastTenseGameActive(false);
            setShowPastTenseCompletionDialog(true);
        }
    }, [pastTenseMatchedPairs, pastTenseCards.length, isPastTenseGameActive]);


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
    } else if (currentGameType === 'food') {
        startFoodGame(selectedDifficulty);
    } else if (currentGameType === 'transportBuildings') {
        startTransportBuildingGame(selectedDifficulty);
    } else if (currentGameType === 'pastTense') {
        startPastTenseGame(selectedDifficulty);
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
                         currentGameType === 'plants' ? 'Plants' :
                         currentGameType === 'food' ? 'Food Items' :
                         currentGameType === 'transportBuildings' ? 'Transport/Buildings' :
                         'Past Tense Verbs'; // Add Past Tense type text
        const currentDifficulty = currentGameType === 'verbs' ? verbDifficulty :
                                currentGameType === 'adjectives' ? adjectiveDifficulty :
                                currentGameType === 'animals' ? animalDifficulty :
                                currentGameType === 'plants' ? plantDifficulty :
                                currentGameType === 'food' ? foodDifficulty :
                                currentGameType === 'transportBuildings' ? transportBuildingDifficulty :
                                pastTenseDifficulty; // Add Past Tense difficulty
        // Dynamically calculate the hard difficulty count for Past Tense
        const itemCounts = currentGameType === 'pastTense'
            ? { easy: 15, medium: 30, hard: pastTensePairs.length }
            : { easy: 15, medium: 30, hard: 60 };

        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold text-center my-4 text-foreground">
                Select Difficulty for {itemType}
            </h2>
            <DifficultySelector
              itemType={itemType as any} // Cast needed due to widened type
              onSelectDifficulty={handleSelectDifficulty}
              onGoBack={handleGoBackToSelection}
              currentDifficulty={currentDifficulty}
              itemCounts={itemCounts} // Pass dynamic counts
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
        } else if (currentGameType === 'plants') {
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
        } else if (currentGameType === 'food') {
           return (
             <>
              <GameStatus
                moves={foodMoves}
                isGameActive={isFoodGameActive}
                onTimerUpdate={handleFoodTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(foodDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {foodCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.type === 'name' ? card.name : undefined}
                    imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                    spanishName={card.type === 'image' ? card.spanishName : undefined}
                    dataAiHint={card.dataAiHint}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handleFoodCardClick}
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
        } else if (currentGameType === 'transportBuildings') {
           return (
             <>
              <GameStatus
                moves={transportBuildingMoves}
                isGameActive={isTransportBuildingGameActive}
                onTimerUpdate={handleTransportBuildingTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(transportBuildingDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {transportBuildingCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.type === 'name' ? card.name : undefined}
                    imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                    spanishName={card.type === 'image' ? card.spanishName : undefined}
                    dataAiHint={card.dataAiHint}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handleTransportBuildingCardClick}
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
        } else if (currentGameType === 'pastTense') { // Add Past Tense case
           return (
             <>
              <GameStatus
                moves={pastTenseMoves}
                isGameActive={isPastTenseGameActive}
                onTimerUpdate={handlePastTenseTimerUpdate}
                isHintActive={isHintActive}
                onToggleHint={toggleHint}
              />
              <div className={`grid ${getGridColsClass(pastTenseDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
                {pastTenseCards.map((card) => (
                  <GameCard
                    key={card.id}
                    cardId={card.id}
                    text={card.text}
                    isFlipped={card.isFlipped}
                    isMatched={card.isMatched}
                    onClick={handlePastTenseCardClick}
                    language={card.tense as 'en' | 'es'} // Cast tense to language for hint color
                    isHintActive={isHintActive}
                    cardType='pastTense' // Specific type for hint logic if needed
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
       <CompletionDialog
        isOpen={showFoodCompletionDialog}
        moves={foodMoves}
        time={foodFinalTime}
        onPlayAgain={handleFoodPlayAgain}
        itemType="food"
      />
      <CompletionDialog
        isOpen={showTransportBuildingCompletionDialog}
        moves={transportBuildingMoves}
        time={transportBuildingFinalTime}
        onPlayAgain={handleTransportBuildingPlayAgain}
        itemType="transportBuilding"
      />
       <CompletionDialog
        isOpen={showPastTenseCompletionDialog}
        moves={pastTenseMoves}
        time={pastTenseFinalTime}
        onPlayAgain={handlePastTensePlayAgain}
        itemType="pastTense"
      />
    </DashboardLayout>
  );
}
