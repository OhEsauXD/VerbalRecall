
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import { generateGameBoard, CardData as VerbCardData } from '@/lib/verbs';
import { generateAdjectiveGameBoard, AdjectiveCardData } from '@/lib/adjectives';
import { generateAnimalGameBoard, AnimalCardData } from '@/lib/animals';
import { generatePlantGameBoard, PlantCardData } from '@/lib/plants';
import { generateFoodGameBoard, FoodCardData } from '@/lib/food';
import { generateTransportBuildingGameBoard, TransportBuildingCardData } from '@/lib/transportBuildings';
import { generatePastTenseGameBoard, PastTenseCardData } from '@/lib/pastTense';
import { generateRegularPastTenseGameBoard, RegularPastTenseCardData } from '@/lib/regularPastTense';
import { generateNationGameBoard, NationCardData } from '@/lib/nations';

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

// A more generic card type that can hold properties from all specific card types
type GenericCard = {
  id: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  // Verb/Adjective/PastTense specific
  language?: 'en' | 'es' | 'infinitive' | 'past';
  text?: string;
  verb?: string; // from VerbCardData
  tense?: 'infinitive' | 'past'; // from PastTenseCardData
  // Image/Name specific (Animals, Plants, Food, Transport/Buildings)
  type?: 'name' | 'image' | 'nation' | 'nationality';
  name?: string; // For animal/plant/food/transport name cards
  spanishName?: string; // For animal/plant/food/transport image cards
  imageUrl?: string;
  dataAiHint?: string;
  // Nation specific
  nation?: string;
  nationality?: string;
  flagUrl?: string;
};


interface GameEngineProps {
  gameType: GameType;
  difficulty: Difficulty;
  onGameComplete: (moves: number, time: number) => void;
  onBackToDifficulty: () => void;
  isHintActive: boolean;
  onToggleHint: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({
  gameType,
  difficulty,
  onGameComplete,
  onBackToDifficulty,
  isHintActive,
  onToggleHint,
}) => {
  const [cards, setCards] = useState<GenericCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [time, setTime] = useState(0);

  const getBoardGenerator = useCallback(() => {
    switch (gameType) {
      case 'verbs': return generateGameBoard;
      case 'adjectives': return generateAdjectiveGameBoard;
      case 'animals': return generateAnimalGameBoard;
      case 'plants': return generatePlantGameBoard;
      case 'food': return generateFoodGameBoard;
      case 'transportBuildings': return generateTransportBuildingGameBoard;
      case 'pastTense': return generatePastTenseGameBoard;
      case 'regularPastTense': return generateRegularPastTenseGameBoard;
      case 'nations': return generateNationGameBoard;
      default:
        // This should ideally not happen if gameType is always valid
        console.error('Invalid game type in GameEngine:', gameType);
        return () => []; // Return a function that returns an empty array
    }
  }, [gameType]);

  useEffect(() => {
    setIsGameActive(false); // Stop timer during setup
    const generator = getBoardGenerator();
    if (generator) {
      const newBoard = generator(difficulty);
      setCards(newBoard as GenericCard[]); // Cast to GenericCard[]
    } else {
      setCards([]); // Handle case where generator might be undefined
    }
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(true); // Start timer after setup
  }, [gameType, difficulty, getBoardGenerator]);

  const handleCardClick = (cardId: string) => {
    if (isChecking || flippedCards.length >= 2) return;
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
    if (isGameActive && cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsGameActive(false); // Stop timer
      onGameComplete(moves, time);
    }
  }, [matchedPairs, cards, isGameActive, moves, time, onGameComplete]);


  const handleTimerUpdate = (currentTime: number) => {
    setTime(currentTime);
  };

  const getGridColsClass = (difficulty: Difficulty | null) => difficulty === 'easy' ? 'grid-cols-5 sm:grid-cols-6' :
                       difficulty === 'medium' ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' :
                       'grid-cols-8 sm:grid-cols-10 md:grid-cols-12';

  return (
    <div className="flex flex-col items-center w-full">
      <GameStatus
        moves={moves}
        isGameActive={isGameActive}
        onTimerUpdate={handleTimerUpdate}
        isHintActive={isHintActive}
        onToggleHint={onToggleHint}
      />
      <div className={`grid ${getGridColsClass(difficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
        {cards.map((card) => {
          // Map GenericCard to GameCardProps
          let cardProps: React.ComponentProps<typeof GameCard> = {
            key: card.id,
            cardId: card.id,
            isFlipped: card.isFlipped,
            isMatched: card.isMatched,
            onClick: handleCardClick,
            isHintActive: isHintActive,
            language: 'en', // Default, will be overridden
            cardType: card.type as any, // Cast for now, should be refined
          };

          if (card.text) cardProps.text = card.text;
          if (card.verb) cardProps.text = card.verb; // For VerbGame
          if (card.language) cardProps.language = card.language;
          if (card.tense) cardProps.language = card.tense as 'en' | 'es'; // For PastTenseGame

          if (card.type === 'image' || (gameType === 'animals' && card.type === 'image') || (gameType === 'plants' && card.type === 'image') || (gameType === 'food' && card.type === 'image') || (gameType === 'transportBuildings' && card.type === 'image')) {
            cardProps.imageUrl = card.imageUrl;
            cardProps.spanishName = card.spanishName;
            cardProps.dataAiHint = card.dataAiHint;
          } else if (card.type === 'name') {
             cardProps.text = card.name;
          }

          if (gameType === 'nations') {
            if (card.type === 'nation') {
              cardProps.nation = card.nation;
              cardProps.flagUrl = card.flagUrl;
              cardProps.language = 'en'; // Hint color for flag/nation name
            } else if (card.type === 'nationality') {
              cardProps.nationality = card.nationality;
              cardProps.text = card.nationality;
              cardProps.language = 'es'; // Hint color for nationality text
            }
          }

          return <GameCard {...cardProps} />;
        })}
      </div>
      <Button onClick={onBackToDifficulty} variant="outline" className="mt-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Difficulty Selection
      </Button>
    </div>
  );
};

export default GameEngine;
