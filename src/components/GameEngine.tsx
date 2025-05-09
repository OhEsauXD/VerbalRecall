
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TriviaGame from '@/components/TriviaGame';
import VerbLockGame from '@/components/VerbLockGame';
import { verbPairs, generateGameBoard as generateVerbGameBoard, CardData as VerbCardData } from '@/lib/verbs';
import { generateAdjectiveGameBoard, AdjectiveCardData } from '@/lib/adjectives';
import { generateAnimalGameBoard, AnimalCardData } from '@/lib/animals';
import { generatePlantGameBoard, PlantCardData } from '@/lib/plants';
import { generateFoodGameBoard, FoodCardData } from '@/lib/food';
import { generateTransportBuildingGameBoard, TransportBuildingCardData } from '@/lib/transportBuildings';
import { generatePastTenseGameBoard, PastTenseCardData } from '@/lib/pastTense';
import { generateRegularPastTenseGameBoard, RegularPastTenseCardData } from '@/lib/regularPastTense';
import { generateNationGameBoard, NationCardData } from '@/lib/nations';
import { verbLocks, VerbLock } from '@/lib/verbLock';
import type { GameType as PageGameType, Difficulty as PageDifficulty } from '@/app/page';

export type GameType = PageGameType;
export type Difficulty = PageDifficulty;

type SpecificCardData =
  | VerbCardData
  | AdjectiveCardData
  | AnimalCardData
  | PlantCardData
  | FoodCardData
  | TransportBuildingCardData
  | PastTenseCardData
  | RegularPastTenseCardData
  | NationCardData;

type GenericCard = {
  id: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  language?: 'en' | 'es' | 'infinitive' | 'past';
  text?: string;
  verb?: string;
  tense?: 'infinitive' | 'past';
  type?: 'name' | 'image' | 'nation' | 'nationality';
  name?: string;
  spanishName?: string;
  imageUrl?: string;
  dataAiHint?: string;
  nation?: string;
  nationality?: string;
  flagUrl?: string;
};

export interface TriviaQuestion {
  id: number;
  clue: string; // Spanish verb
  answer: string; // Cleaned English verb
  answerLetters: string[];
  userGuess: string[];
  revealedIndices: Set<number>;
  isAttempted: boolean; // Has the user submitted an answer for this question
  isCorrect: boolean | null; // null = not submitted, true = correct, false = incorrect after one attempt
}


interface GameEngineProps {
  gameType: GameType;
  difficulty: Difficulty;
  onGameComplete: (result: { moves?: number; time?: number; score?: number; questionsAttempted?: number; locksSolved?: number }) => void;
  onBackToDifficulty: () => void;
  isHintActive: boolean; // For matching games
  onToggleHint: () => void; // For matching games
}

const GameEngine: React.FC<GameEngineProps> = ({
  gameType,
  difficulty,
  onGameComplete,
  onBackToDifficulty,
  isHintActive: isMatchingHintActive,
  onToggleHint: onToggleMatchingHint,
}) => {
  // Matching Game State
  const [cards, setCards] = useState<GenericCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Trivia Game State
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [currentTriviaQuestionIndex, setCurrentTriviaQuestionIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [isTriviaHintActive, setIsTriviaHintActive] = useState(false);

  // Verb Lock Game State
  const [verbLockSet, setVerbLockSet] = useState<readonly VerbLock[]>([]);
  const [currentVerbLockQuestIndex, setCurrentVerbLockQuestIndex] = useState(0); // Renamed from currentVerbLockIndex
  const [verbLockScore, setVerbLockScore] = useState(0);
  // isHintActive for verb lock might not be needed or handled differently

  // General Game State
  const [isGameActive, setIsGameActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false); // For matching game card check delay
  const [time, setTime] = useState(0);


  const cleanVerb = (verb: string): string => {
    return verb.replace(/^to[\s_]*/, '').replace(/[\s_]/g, '').toLowerCase();
  };

  const generateTriviaGameData = useCallback((diff: Difficulty): TriviaQuestion[] => {
    let numQuestions: number;
    switch (diff) {
      case 'easy': numQuestions = 10; break;
      case 'medium': numQuestions = 15; break;
      case 'hard': numQuestions = 20; break;
      default: numQuestions = 10;
    }
    const shuffledVerbs = [...verbPairs].sort(() => 0.5 - Math.random());
    return shuffledVerbs.slice(0, numQuestions).map(pair => {
      const cleanedAnswer = cleanVerb(pair.en);
      return {
        id: pair.id,
        clue: pair.es,
        answer: cleanedAnswer,
        answerLetters: cleanedAnswer.split(''),
        userGuess: Array(cleanedAnswer.length).fill(''),
        revealedIndices: new Set<number>(),
        isAttempted: false,
        isCorrect: null,
      };
    });
  }, []);

  const generateVerbLockGameSet = useCallback((diff: Difficulty): readonly VerbLock[] => {
    let numLocks: number;
    switch (diff) {
      case 'easy': numLocks = 10; break;
      case 'medium': numLocks = 15; break;
      case 'hard': numLocks = Math.min(20, verbLocks.length); break; // Cap at available locks
      default: numLocks = 10;
    }
    const shuffledLocks = [...verbLocks].sort(() => 0.5 - Math.random());
    return shuffledLocks.slice(0, numLocks);
  }, []);


  const getBoardGenerator = useCallback(() => {
    switch (gameType) {
      case 'verbs': return generateVerbGameBoard;
      case 'adjectives': return generateAdjectiveGameBoard;
      case 'animals': return generateAnimalGameBoard;
      case 'plants': return generatePlantGameBoard;
      case 'food': return generateFoodGameBoard;
      case 'transportBuildings': return generateTransportBuildingGameBoard;
      case 'pastTense': return generatePastTenseGameBoard;
      case 'regularPastTense': return generateRegularPastTenseGameBoard;
      case 'nations': return generateNationGameBoard;
      default: return () => [];
    }
  }, [gameType]);

  useEffect(() => {
    setIsGameActive(false);
    setTime(0);

    if (gameType === 'trivia') {
      setTriviaQuestions(generateTriviaGameData(difficulty));
      setCurrentTriviaQuestionIndex(0);
      setTriviaScore(0);
      setIsTriviaHintActive(false);
    } else if (gameType === 'verbLock') {
      setVerbLockSet(generateVerbLockGameSet(difficulty));
      setCurrentVerbLockQuestIndex(0);
      setVerbLockScore(0);
      // Reset any verb lock specific states here
    } else {
      const generator = getBoardGenerator();
      if (generator) {
        const newBoard = generator(difficulty);
        setCards(newBoard as GenericCard[]);
      } else {
        setCards([]);
      }
      setFlippedCards([]);
      setMatchedPairs([]);
      setMoves(0);
    }
    setIsGameActive(true);
  }, [gameType, difficulty, getBoardGenerator, generateTriviaGameData, generateVerbLockGameSet]);


  const handleCardClick = (cardId: string) => {
    if (gameType === 'trivia' || gameType === 'verbLock' || isChecking || flippedCards.length >= 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    setMoves((prevMoves) => prevMoves + 1);
    setCards((prevCards) => prevCards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstCardId);
      const secondCard = cards.find((c) => c.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setCards((prevCards) => prevCards.map((c) => (c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c)));
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) => prevCards.map((c) => (newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c)));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  // Matching game completion
  useEffect(() => {
    if (gameType !== 'trivia' && gameType !== 'verbLock' && isGameActive && cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsGameActive(false);
      onGameComplete({ moves, time });
    }
  }, [matchedPairs, cards, isGameActive, moves, time, onGameComplete, gameType]);


  const handleTimerUpdate = (currentTime: number) => {
    setTime(currentTime);
  };

  const getGridColsClass = (diff: Difficulty | null) => diff === 'easy' ? 'grid-cols-5 sm:grid-cols-6' :
                       diff === 'medium' ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' :
                       'grid-cols-8 sm:grid-cols-10 md:grid-cols-12';


  const handleTriviaInputChange = (questionIndex: number, letterIndex: number, value: string) => {
    setTriviaQuestions(prev => prev.map((q, i) => {
      if (i === questionIndex) {
        const newUserGuess = [...q.userGuess];
        newUserGuess[letterIndex] = value.toLowerCase();
        return { ...q, userGuess: newUserGuess };
      }
      return q;
    }));
  };

  const handleTriviaSubmit = () => {
    if (currentTriviaQuestionIndex >= triviaQuestions.length) return;

    const currentQ = triviaQuestions[currentTriviaQuestionIndex];
    let questionScore = 0;
    let allCorrect = true;

    for (let i = 0; i < currentQ.answerLetters.length; i++) {
      if (currentQ.userGuess[i] === currentQ.answerLetters[i] && !currentQ.revealedIndices.has(i)) {
        questionScore++;
      }
      if (currentQ.userGuess[i] !== currentQ.answerLetters[i]) {
        allCorrect = false;
      }
    }
    setTriviaScore(prev => prev + questionScore);
    
    setTriviaQuestions(prev => prev.map((q, i) =>
      i === currentTriviaQuestionIndex ? { ...q, isAttempted: true, isCorrect: allCorrect } : q
    ));

    setTimeout(() => {
        if (currentTriviaQuestionIndex < triviaQuestions.length - 1) {
            setCurrentTriviaQuestionIndex(prev => prev + 1);
          } else {
            setIsGameActive(false);
            onGameComplete({ questionsAttempted: triviaQuestions.length, score: triviaScore + questionScore });
          }
    }, 1500);
  };

  const handleTriviaHint = () => {
    if (currentTriviaQuestionIndex >= triviaQuestions.length || triviaScore <= 0) return;

    setTriviaScore(prev => prev - 1);
    setTriviaQuestions(prev => prev.map((q, i) => {
      if (i === currentTriviaQuestionIndex) {
        const unrevealedIndices = q.answerLetters
          .map((_, idx) => idx)
          .filter(idx => !q.revealedIndices.has(idx) && q.userGuess[idx] !== q.answerLetters[idx]);

        if (unrevealedIndices.length > 0) {
          const randomIndexToReveal = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
          const newRevealedIndices = new Set(q.revealedIndices);
          newRevealedIndices.add(randomIndexToReveal);
          const newUserGuess = [...q.userGuess];
          newUserGuess[randomIndexToReveal] = q.answerLetters[randomIndexToReveal];
          return { ...q, userGuess: newUserGuess, revealedIndices: newRevealedIndices };
        }
      }
      return q;
    }));
  };

  const handleVerbLockSolved = (isCorrect: boolean) => {
    if (currentVerbLockQuestIndex >= verbLockSet.length) return;

    if (isCorrect) {
      setVerbLockScore(prev => prev + 1); // Or some other scoring logic
    }
    // Always move to next, or end game
    if (currentVerbLockQuestIndex < verbLockSet.length - 1) {
      setCurrentVerbLockQuestIndex(prev => prev + 1);
    } else {
      setIsGameActive(false);
      onGameComplete({ locksSolved: currentVerbLockQuestIndex + (isCorrect ? 1: 0), score: verbLockScore + (isCorrect ? 1: 0) });
    }
  };

  const renderActiveGame = () => {
    if (gameType === 'trivia' && triviaQuestions.length > 0 && currentTriviaQuestionIndex < triviaQuestions.length) {
      return (
        <TriviaGame
          question={triviaQuestions[currentTriviaQuestionIndex]}
          questionIndex={currentTriviaQuestionIndex}
          onInputChange={handleTriviaInputChange}
          onSubmit={handleTriviaSubmit}
        />
      );
    } else if (gameType === 'verbLock' && verbLockSet.length > 0 && currentVerbLockQuestIndex < verbLockSet.length) {
      return (
        <VerbLockGame
          verbLock={verbLockSet[currentVerbLockQuestIndex]}
          onCombinationSubmit={handleVerbLockSolved}
          difficulty={difficulty}
        />
      );
    }
    else if (gameType !== 'crossword' && gameType !== 'trivia' && gameType !== 'verbLock') {
      return (
        <div className={`grid ${getGridColsClass(difficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
          {cards.map((card) => {
            let cardProps: React.ComponentProps<typeof GameCard> = {
              key: card.id, cardId: card.id, isFlipped: card.isFlipped, isMatched: card.isMatched,
              onClick: handleCardClick, isHintActive: isMatchingHintActive, language: 'en', cardType: card.type as any,
            };
            if (card.text) cardProps.text = card.text;
            if (card.verb) cardProps.text = card.verb;
            if (card.language) cardProps.language = card.language;
            if (card.tense) cardProps.language = card.tense as 'en' | 'es';
            if (card.type === 'image' || (gameType === 'animals' && card.type === 'image') || (gameType === 'plants' && card.type === 'image') || (gameType === 'food' && card.type === 'image') || (gameType === 'transportBuildings' && card.type === 'image')) {
              cardProps.imageUrl = card.imageUrl; cardProps.spanishName = card.spanishName; cardProps.dataAiHint = card.dataAiHint;
            } else if (card.type === 'name') { cardProps.text = card.name; }
            if (gameType === 'nations') {
              if (card.type === 'nation') { cardProps.nation = card.nation; cardProps.flagUrl = card.flagUrl; cardProps.language = 'en'; }
              else if (card.type === 'nationality') { cardProps.nationality = card.nationality; cardProps.text = card.nationality; cardProps.language = 'es'; }
            }
            return <GameCard {...cardProps} />;
          })}
        </div>
      );
    }
    return <div className="text-foreground">Loading game...</div>;
  };


  return (
    <div className="flex flex-col items-center w-full">
      <GameStatus
        moves={moves} // For matching game
        score={gameType === 'trivia' ? triviaScore : gameType === 'verbLock' ? verbLockScore : undefined}
        isGameActive={isGameActive}
        onTimerUpdate={handleTimerUpdate}
        isHintActive={gameType === 'trivia' ? isTriviaHintActive : (gameType === 'verbLock' ? false : isMatchingHintActive) } // verbLock might not have a simple hint toggle
        onToggleHint={gameType === 'trivia' ? handleTriviaHint : (gameType === 'verbLock' ? () => {} : onToggleMatchingHint)} // Provide no-op for verbLock if no hint
        gameType={gameType}
        canUseHint={gameType === 'trivia' ? triviaScore > 0 : gameType !== 'verbLock'}
        totalItems={gameType === 'verbLock' ? verbLockSet.length : (gameType === 'trivia' ? triviaQuestions.length : undefined)}
        currentItemIndex={gameType === 'verbLock' ? currentVerbLockQuestIndex : (gameType === 'trivia' ? currentTriviaQuestionIndex : undefined)}
      />
      {renderActiveGame()}
      <Button onClick={onBackToDifficulty} variant="outline" className="mt-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Difficulty Selection
      </Button>
    </div>
  );
};

export default GameEngine;
