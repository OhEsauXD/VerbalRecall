'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TriviaGame from '@/components/TriviaGame';
import VerbLockGame from '@/components/VerbLockGame';
import CombinationLockGame from '@/components/CombinationLockGame'; // Import new game
import { generateGameBoard as generateVerbGameBoard, CardData as VerbCardData } from '@/lib/verbs';
import { generateAdjectiveGameBoard, AdjectiveCardData } from '@/lib/adjectives';
import { generateAnimalGameBoard, AnimalCardData } from '@/lib/animals';
import { generatePlantGameBoard, PlantCardData } from '@/lib/plants';
import { generateFoodGameBoard, FoodCardData } from '@/lib/food';
import { generateTransportBuildingGameBoard, TransportBuildingCardData } from '@/lib/transportBuildings';
import { generatePastTenseGameBoard, PastTenseCardData } from '@/lib/pastTense';
import { generateRegularPastTenseGameBoard, RegularPastTenseCardData } from '@/lib/regularPastTense';
import { generateNationGameBoard, NationCardData } from '@/lib/nations';
import { verbLockSources, VerbLockSource, VerbLockChallenge, globalDistractorPools, DistractorPools } from '@/lib/verbLock';
import { combinationLockSubjects, CombinationLockChallenge as LibCombinationLockChallenge, shuffleArray as shuffleCombinationLockArray } from '@/lib/combinationLock';
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
  clue: string; 
  answer: string; 
  answerLetters: string[];
  userGuess: string[];
  revealedIndices: Set<number>;
  isAttempted: boolean;
  isCorrect: boolean | null;
  clueLanguage?: 'en' | 'es'; 
}


interface GameEngineProps {
  gameType: GameType;
  difficulty: Difficulty;
  onGameComplete: (result: { moves?: number; time?: number; score?: number; questionsAttempted?: number; locksSolved?: number }) => void;
  onBackToDifficulty: () => void;
  // isHintActive and onToggleHint are now primarily for matching games
  // Trivia and VerbLock manage their own hint/audio states internally
  isHintActive: boolean; 
  onToggleHint: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({
  gameType,
  difficulty,
  onGameComplete,
  onBackToDifficulty,
  isHintActive: isMatchingGameHintActive, // Renamed for clarity
  onToggleHint: onToggleMatchingGameHint, // Renamed for clarity
}) => {
  const [cards, setCards] = useState<GenericCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [currentTriviaQuestionIndex, setCurrentTriviaQuestionIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  // Trivia game will manage its own hint button interaction state

  const [verbLockChallenges, setVerbLockChallenges] = useState<VerbLockChallenge[]>([]);
  const [currentVerbLockQuestIndex, setCurrentVerbLockQuestIndex] = useState(0);
  const [verbLockScore, setVerbLockScore] = useState(0);
  const [verbLocksSolvedCount, setVerbLocksSolvedCount] = useState(0);
  // VerbLock game will manage its own mute button interaction state

  const [combinationLockChallenges, setCombinationLockChallenges] = useState<LibCombinationLockChallenge[]>([]);
  const [currentCombinationLockIndex, setCurrentCombinationLockIndex] = useState(0);
  const [combinationLockScore, setCombinationLockScore] = useState(0);
  const [combinationLocksSolvedCount, setCombinationLocksSolvedCount] = useState(0);

  const [isGameActive, setIsGameActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [time, setTime] = useState(0);


  const cleanVerb = (verb: string): string => {
    return verb.replace(/^to[\s_]*/, '').replace(/[\s_]/g, '').toLowerCase();
  };

 const generateTriviaGameData = useCallback((gameType: GameType, diff: Difficulty): TriviaQuestion[] => {
    let numQuestions: number;
    switch (diff) {
      case 'easy': numQuestions = 10; break;
      case 'medium': numQuestions = 15; break;
      case 'hard': numQuestions = 20; break;
      default: numQuestions = 10;
    }

    const availableSources = verbLockSources.filter(source => 
        source.englishBase.correct && 
        (gameType === 'trivia' ? source.englishPastParticiple.correct : true) && 
        (gameType === 'spanishEnglishTrivia' ? source.spanishInfinitive.correct : true) 
    );
    const shuffledSources = [...availableSources].sort(() => 0.5 - Math.random());
    
    const actualNumQuestions = Math.min(numQuestions, shuffledSources.length);

    return shuffledSources.slice(0, actualNumQuestions).map(source => {
      let clue = '';
      let answer = '';
      let clueLanguage: 'en' | 'es' = 'en';

      if (gameType === 'trivia') { 
        clue = source.englishBase.correct; 
        answer = cleanVerb(source.englishPastParticiple.correct);
        clueLanguage = 'en';
      } else if (gameType === 'spanishEnglishTrivia') { 
        clue = source.spanishInfinitive.correct;
        answer = cleanVerb(source.englishBase.correct);
        clueLanguage = 'es';
      }

      return {
        id: source.id, 
        clue: clue,
        answer: answer,
        answerLetters: answer.split(''),
        userGuess: Array(answer.length).fill(''),
        revealedIndices: new Set<number>(),
        isAttempted: false,
        isCorrect: null,
        clueLanguage: clueLanguage,
      };
    });
  }, []);


  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateSingleVerbLockChallenge = useCallback((source: VerbLockSource): VerbLockChallenge => {
    const challengeOptions: VerbLockChallenge['options'] = { key1: [], key2: [], key3: [], key4: [] };
    const challengeCorrectIndices: [number, number, number, number] = [0, 0, 0, 0];

    const formDetails = [
      source.spanishInfinitive,
      source.englishBase,
      source.englishPastSimple,
      source.englishPastParticiple,
    ];
    const distractorCategories: (keyof DistractorPools)[] = [
      'spanishInfinitives',
      'englishBases',
      'englishPastSimples',
      'englishPastParticiples',
    ];

    formDetails.forEach((detail, index) => {
      const keyName = `key${index + 1}` as keyof VerbLockChallenge['options'];
      let currentKeyDisplayOptions: string[] = [detail.correct];

      if (detail.commonMistake && detail.commonMistake !== detail.correct) {
        currentKeyDisplayOptions.push(detail.commonMistake);
      }

      const pool = globalDistractorPools[distractorCategories[index]];
      const shuffledPool = shuffleArray([...pool]);

      let distractorIdx = 0;
      while (currentKeyDisplayOptions.length < 5 && distractorIdx < shuffledPool.length) {
        const distractor = shuffledPool[distractorIdx];
        if (!currentKeyDisplayOptions.includes(distractor)) {
          currentKeyDisplayOptions.push(distractor);
        }
        distractorIdx++;
      }

      distractorIdx = 0;
      while (currentKeyDisplayOptions.length < 5 && pool.length > 0) {
          currentKeyDisplayOptions.push(shuffledPool[distractorIdx % shuffledPool.length]);
          distractorIdx++;
          if (distractorIdx > pool.length * 2 && currentKeyDisplayOptions.length < 5) break;
      }

      const genericFillers = ["Option A", "Option B", "Option C", "Option D", "Option E", "Option F", "Option G"];
      let fillerIdx = 0;
      while (currentKeyDisplayOptions.length < 5) {
          let filler = genericFillers[fillerIdx % genericFillers.length];
          if (!currentKeyDisplayOptions.includes(filler)) {
            currentKeyDisplayOptions.push(filler);
          } else {
            currentKeyDisplayOptions.push(`${filler} ${fillerIdx + 1}`);
          }
          fillerIdx++;
      }

      const finalShuffledOptions = shuffleArray(currentKeyDisplayOptions.slice(0,5));
      challengeOptions[keyName] = Object.freeze(finalShuffledOptions as readonly string[]);
      const correctIdx = finalShuffledOptions.indexOf(detail.correct);
      challengeCorrectIndices[index] = correctIdx !== -1 ? correctIdx : 0;
    });

    return {
      id: source.id,
      spanishDisplayTitle: source.spanishInfinitive.correct,
      englishBaseDisplayTitle: source.englishBase.correct,
      options: challengeOptions,
      correctIndices: Object.freeze(challengeCorrectIndices),
      gerund: source.gerund,
    };
  }, []);

  const generateVerbLockChallenges = useCallback((diff: Difficulty): VerbLockChallenge[] => {
    let numLocks: number;
    switch (diff) {
      case 'easy': numLocks = 10; break;
      case 'medium': numLocks = 15; break;
      case 'hard': numLocks = Math.min(20, verbLockSources.length); break;
      default: numLocks = 10;
    }
    const shuffledSources = shuffleArray([...verbLockSources]);
    const selectedSources = shuffledSources.slice(0, numLocks);
    return selectedSources.map(sourceItem => generateSingleVerbLockChallenge(sourceItem));
  }, [generateSingleVerbLockChallenge]);

  const generateCombinationLockChallenges = useCallback((diff: Difficulty): LibCombinationLockChallenge[] => {
    let numLocksToGenerate: number;
    switch (diff) {
      case 'easy': numLocksToGenerate = 3; break;
      case 'medium': numLocksToGenerate = 5; break;
      case 'hard': numLocksToGenerate = Math.min(7, combinationLockSubjects.length); break;
      default: numLocksToGenerate = 3;
    }

    const shuffledSubjects = shuffleCombinationLockArray([...combinationLockSubjects]);
    const selectedSubjects = shuffledSubjects.slice(0, numLocksToGenerate);
    
    const challenges: LibCombinationLockChallenge[] = [];

    selectedSubjects.forEach((subject, lockIndex) => {
      if (subject.items.length < 4) {
        console.warn(`Subject "${subject.name}" has fewer than 4 items. Skipping for Combination Lock.`);
        return;
      }
      const shuffledItems = shuffleCombinationLockArray([...subject.items]);
      const correctItemsForLock = shuffledItems.slice(0, 4) as [string, string, string, string];
      
      const challengeOptions: LibCombinationLockChallenge['options'] = { key1: [], key2: [], key3: [], key4: [] };
      const challengeCorrectIndices: [number, number, number, number] = [0, 0, 0, 0];

      correctItemsForLock.forEach((correctItem, itemIndex) => {
        const keyName = `key${itemIndex + 1}` as keyof LibCombinationLockChallenge['options'];
        let currentTumblerOptions: string[] = [correctItem];
        
        const subjectDistractors = subject.items.filter(
          item => !correctItemsForLock.includes(item) && item !== correctItem
        );
        const shuffledSubjectDistractors = shuffleCombinationLockArray([...subjectDistractors]);

        for (let i = 0; currentTumblerOptions.length < 5 && i < shuffledSubjectDistractors.length; i++) {
          if (!currentTumblerOptions.includes(shuffledSubjectDistractors[i])) {
            currentTumblerOptions.push(shuffledSubjectDistractors[i]);
          }
        }

        if (currentTumblerOptions.length < 5) {
          const globalDistractorItems: string[] = [];
          combinationLockSubjects.forEach(s => {
            if (s.id !== subject.id) {
              s.items.forEach(item => {
                if (!correctItemsForLock.includes(item) && !currentTumblerOptions.includes(item)) {
                  globalDistractorItems.push(item);
                }
              });
            }
          });
          const shuffledGlobalDistractors = shuffleCombinationLockArray(globalDistractorItems);
          for (let i = 0; currentTumblerOptions.length < 5 && i < shuffledGlobalDistractors.length; i++) {
             if (!currentTumblerOptions.includes(shuffledGlobalDistractors[i])) {
                currentTumblerOptions.push(shuffledGlobalDistractors[i]);
            }
          }
        }
        const genericFillers = ["Option A", "Option B", "Option C", "Option D", "Option E"];
        let fillerIdx = 0;
        while (currentTumblerOptions.length < 5) {
            let filler = genericFillers[fillerIdx % genericFillers.length];
             if (!currentTumblerOptions.includes(filler)) {
                currentTumblerOptions.push(filler);
            } else {
                 currentTumblerOptions.push(`${filler} ${fillerIdx + 1}`);
            }
            fillerIdx++;
        }


        const finalShuffledOptions = shuffleCombinationLockArray(currentTumblerOptions.slice(0, 5));
        challengeOptions[keyName] = Object.freeze(finalShuffledOptions as readonly string[]);
        const correctIdx = finalShuffledOptions.indexOf(correctItem);
        challengeCorrectIndices[itemIndex] = correctIdx !== -1 ? correctIdx : 0;
      });

      challenges.push({
        id: `${subject.id}_lock${lockIndex}`,
        subjectName: subject.name,
        correctItems: Object.freeze(correctItemsForLock),
        options: challengeOptions,
        correctIndices: Object.freeze(challengeCorrectIndices),
      });
    });
    return challenges;
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

    if (gameType === 'trivia' || gameType === 'spanishEnglishTrivia') {
      setTriviaQuestions(generateTriviaGameData(gameType, difficulty));
      setCurrentTriviaQuestionIndex(0);
      setTriviaScore(0);
    } else if (gameType === 'verbLock') {
      setVerbLockChallenges(generateVerbLockChallenges(difficulty));
      setCurrentVerbLockQuestIndex(0);
      setVerbLockScore(0);
      setVerbLocksSolvedCount(0);
    } else if (gameType === 'combinationLock') {
      setCombinationLockChallenges(generateCombinationLockChallenges(difficulty));
      setCurrentCombinationLockIndex(0);
      setCombinationLockScore(0);
      setCombinationLocksSolvedCount(0);
    }
     else {
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
  }, [gameType, difficulty, getBoardGenerator, generateTriviaGameData, generateVerbLockChallenges, generateCombinationLockChallenges]);


  const handleCardClick = (cardId: string) => {
    if (gameType === 'trivia' || gameType === 'verbLock' || gameType === 'spanishEnglishTrivia' || gameType === 'combinationLock' || isChecking || flippedCards.length >= 2) return;
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

  useEffect(() => {
    if (gameType !== 'trivia' && gameType !== 'verbLock' && gameType !== 'spanishEnglishTrivia' && gameType !== 'combinationLock' && isGameActive && cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsGameActive(false);
      onGameComplete({ moves, time });
    }
  }, [matchedPairs, cards, isGameActive, moves, time, onGameComplete, gameType]);


  const handleTimerUpdate = (currentTime: number) => {
    setTime(currentTime);
  };

  const getGridColsClass = (diff: Difficulty | null) => {
    switch (diff) {
      case 'easy':
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6';
      case 'medium':
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10';
      case 'hard':
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10';
      default:
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5';
    }
  };


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
    const userAnswer = currentQ.userGuess.join('').toLowerCase();
    const correctAnswer = currentQ.answer.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    let finalScore = triviaScore;
    if (isCorrect) {
      finalScore += 1;
    } else {
      finalScore = Math.max(0, finalScore - 1);
    }
    setTriviaScore(finalScore);

    setTriviaQuestions(prev => prev.map((q, i) =>
      i === currentTriviaQuestionIndex ? { ...q, isAttempted: true, isCorrect: isCorrect } : q
    ));

    setTimeout(() => {
        if (currentTriviaQuestionIndex < triviaQuestions.length - 1) {
            setCurrentTriviaQuestionIndex(prev => prev + 1);
          } else {
            setIsGameActive(false);
            onGameComplete({ questionsAttempted: triviaQuestions.length, score: finalScore });
          }
    }, 1500);
  };

  const handleTriviaHint = () => {
    if (currentTriviaQuestionIndex >= triviaQuestions.length || triviaScore <= 0) return;

    setTriviaScore(prev => Math.max(0, prev - 1)); // Deduct point for hint

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
    if (currentVerbLockQuestIndex >= verbLockChallenges.length) return;

    let newScore = verbLockScore;
    let solvedCount = verbLocksSolvedCount;

    if (isCorrect) {
      newScore += 1;
      solvedCount +=1;
    } else {
      newScore = Math.max(0, newScore - 1);
    }
    setVerbLockScore(newScore);
    setVerbLocksSolvedCount(solvedCount);

    if (currentVerbLockQuestIndex < verbLockChallenges.length - 1) {
      setCurrentVerbLockQuestIndex(prev => prev + 1);
    } else {
      setIsGameActive(false);
      onGameComplete({ locksSolved: solvedCount, score: newScore });
    }
  };

   const handleCombinationLockSolved = (isCorrect: boolean) => {
    if (currentCombinationLockIndex >= combinationLockChallenges.length) return;
    
    let newScore = combinationLockScore;
    let solvedCount = combinationLocksSolvedCount;

    if (isCorrect) {
      newScore += 1;
      solvedCount += 1;
    } else {
      newScore = Math.max(0, newScore - 1);
    }
    setCombinationLockScore(newScore);
    setCombinationLocksSolvedCount(solvedCount);

    if (currentCombinationLockIndex < combinationLockChallenges.length - 1) {
      setCurrentCombinationLockIndex(prev => prev + 1);
    } else {
      setIsGameActive(false);
      onGameComplete({ locksSolved: solvedCount, score: newScore });
    }
  };


  const renderActiveGame = () => {
    if ((gameType === 'trivia' || gameType === 'spanishEnglishTrivia') && triviaQuestions.length > 0 && currentTriviaQuestionIndex < triviaQuestions.length) {
      return (
        <TriviaGame
          question={triviaQuestions[currentTriviaQuestionIndex]}
          questionIndex={currentTriviaQuestionIndex}
          onInputChange={handleTriviaInputChange}
          onSubmit={handleTriviaSubmit}
          gameType={gameType}
          // Pass down score and hint handler for TriviaGame to manage its own hint button
          score={triviaScore}
          onHint={handleTriviaHint}
        />
      );
    } else if (gameType === 'verbLock' && verbLockChallenges.length > 0 && currentVerbLockQuestIndex < verbLockChallenges.length) {
      return (
        <VerbLockGame
          verbLock={verbLockChallenges[currentVerbLockQuestIndex]}
          onCombinationSubmit={handleVerbLockSolved}
          difficulty={difficulty}
          // VerbLockGame manages its own audio mute, not a traditional "hint" button passed here
        />
      );
    } else if (gameType === 'combinationLock' && combinationLockChallenges.length > 0 && currentCombinationLockIndex < combinationLockChallenges.length) {
      return (
        <CombinationLockGame
          challenge={combinationLockChallenges[currentCombinationLockIndex]}
          onCombinationSubmit={handleCombinationLockSolved}
        />
      );
    }
    else if (gameType !== 'trivia' && gameType !== 'verbLock' && gameType !== 'spanishEnglishTrivia' && gameType !== 'combinationLock') {
      return (
        <div className={`grid ${getGridColsClass(difficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
          {cards.map((card) => {
            let cardProps: React.ComponentProps<typeof GameCard> = {
              key: card.id, cardId: card.id, isFlipped: card.isFlipped, isMatched: card.isMatched,
              onClick: handleCardClick, isHintActive: isMatchingGameHintActive, language: 'en', cardType: card.type as any,
            };
            if (card.text) cardProps.text = card.text;
            if (card.verb) cardProps.text = card.verb;
            if (card.language) cardProps.language = card.language;
            if (card.tense) cardProps.language = card.tense as 'infinitive' | 'past'; 
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
        moves={moves}
        score={
          (gameType === 'trivia' || gameType === 'spanishEnglishTrivia') ? triviaScore :
          (gameType === 'verbLock') ? verbLockScore :
          (gameType === 'combinationLock') ? combinationLockScore :
          undefined
        }
        isGameActive={isGameActive}
        onTimerUpdate={handleTimerUpdate}
        // For matching games, pass the general hint state and toggle
        isHintActive={gameType !== 'trivia' && gameType !== 'verbLock' && gameType !== 'spanishEnglishTrivia' && gameType !== 'combinationLock' ? isMatchingGameHintActive : undefined}
        onToggleHint={gameType !== 'trivia' && gameType !== 'verbLock' && gameType !== 'spanishEnglishTrivia' && gameType !== 'combinationLock' ? onToggleMatchingGameHint : undefined}
        gameType={gameType}
        canUseHint={gameType !== 'trivia' && gameType !== 'verbLock' && gameType !== 'spanishEnglishTrivia' && gameType !== 'combinationLock'} // Trivia and VerbLock handle their own hint/audio disabling
        totalItems={(gameType === 'verbLock' || gameType === 'trivia' || gameType === 'spanishEnglishTrivia' || gameType === 'combinationLock') ? 
            (gameType === 'verbLock' ? verbLockChallenges.length : gameType === 'combinationLock' ? combinationLockChallenges.length : triviaQuestions.length) 
            : undefined}
        currentItemIndex={
            (gameType === 'verbLock' || gameType === 'trivia' || gameType === 'spanishEnglishTrivia' || gameType === 'combinationLock') ? 
            (gameType === 'verbLock' ? currentVerbLockQuestIndex : gameType === 'combinationLock' ? currentCombinationLockIndex : currentTriviaQuestionIndex) 
            : undefined
        }
      />
      {renderActiveGame()}
      <Button onClick={onBackToDifficulty} variant="outline" className="mt-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Difficulty Selection
      </Button>
    </div>
  );
};

export default GameEngine;
