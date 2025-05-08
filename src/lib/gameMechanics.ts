// matchingGame.ts
import { animals } from './animals';
import { food } from './food';
import { nations } from './nations';
import { plants } from './plants';
import { transportBuildings } from './transportBuildings';
import { verbs } from './verbs';
import { regularPastTense } from './regularPastTense';
import { pastTense } from './pastTense';
import { adjectives } from './adjectives';

export type GameType = 'past-tense-verbs' | 'synonyms-adjectives' | 'national-capitals' | 'animal-habitats' | 'food-origins' | 'plant-locations' | 'transport-types';

interface GamePair {
  item1: string;
  item2: string;
}

const allGameData: Record<GameType, GamePair[]> = {
  'past-tense-verbs': verbs.map((verb, index) => ({ item1: verb, item2: regularPastTense[index] || pastTense[index] })),
  'synonyms-adjectives': adjectives.map((adjective, index) => ({ item1: adjective.split(', ')[0], item2: adjective.split(', ')[1] })),
  'national-capitals': nations.map(nation => ({ item1: nation.country, item2: nation.capital })),
  'animal-habitats': animals.map(animal => ({ item1: animal.name, item2: animal.habitat })),
  'food-origins': food.map(foodItem => ({ item1: foodItem.name, item2: foodItem.origin })),
  'plant-locations': plants.map(plant => ({ item1: plant.name, item2: plant.location })),
  'transport-types': transportBuildings.map(item => ({ item1: item.building, item2: item.transport })),
};

export function generateGamePairs(gameType: GameType, numberOfPairs: number): GamePair[] {
  const data = allGameData[gameType];
  if (!data) {
    return [];
  }

  const shuffledData = data.sort(() => 0.5 - Math.random());
  return shuffledData.slice(0, numberOfPairs);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function checkMatch(item1: string, item2: string, gameType: GameType): boolean {
  const data = allGameData[gameType];
  if (!data) {
    return false;
  }

  return data.some(pair =>
    (pair.item1 === item1 && pair.item2 === item2) || (pair.item1 === item2 && pair.item2 === item1)
  );
}
```

```typescript
// gameMechanics.ts
import { generateGamePairs, shuffleArray, checkMatch, GameType } from './matchingGame';

export { generateGamePairs, shuffleArray, checkMatch, GameType };
```

```typescript
// page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { GameSelection } from '@/components/GameSelection';
import { GameCard } from '@/components/GameCard';
import { GameStatus } from '@/components/GameStatus';
import { DifficultySelector } from '@/components/DifficultySelector';
import { CompletionDialog } from '@/components/CompletionDialog';
import { generateGamePairs, shuffleArray, checkMatch, GameType } from '@/gameMechanics'; // Updated import
import { Button } from '@/components/ui/button';

export default function Home() {
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [pairs, setPairs] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [isGameComplete, setIsGameComplete] = useState(false);

  const getNumberOfPairs = (difficulty: string) => {
    switch (difficulty) {
      case 'medium':
        return 10;
      case 'hard':
        return 15;
      case 'easy':
      default:
        return 5;
    }
  };

  useEffect(() => {
    if (gameType) {
      const numberOfPairs = getNumberOfPairs(difficulty);
      const newPairs = generateGamePairs(gameType, numberOfPairs);
      setPairs(newPairs);

      const initialCards = newPairs.flatMap(pair => [
        { ...pair, id: Math.random(), flipped: false, matched: false, value: pair.item1 },
        { ...pair, id: Math.random(), flipped: false, matched: false, value: pair.item2 },
      ]);
      setCards(shuffleArray(initialCards));
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setIsGameComplete(false);
    }
  }, [gameType, difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [index1, index2] = flippedCards;
      const card1 = cards[index1];
      const card2 = cards[index2];

      if (checkMatch(card1.value, card2.value, gameType!)) { // Using the imported function
        const newMatchedCards = [...matchedCards, index1, index2];
        setMatchedCards(newMatchedCards);

        const newCards = cards.map((card, index) =>
          newMatchedCards.includes(index) ? { ...card, matched: true } : card
        );
        setCards(newCards);

        if (newMatchedCards.length === cards.length && cards.length > 0) {
          setIsGameComplete(true);
        }
      }

      setTimeout(() => {
        const newCards = cards.map((card, index) =>
          flippedCards.includes(index) ? { ...card, flipped: false } : card
        );
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);

      setMoves(moves + 1);
    }
  }, [flippedCards, cards, matchedCards, moves, gameType]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) {
      return;
    }

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], flipped: true };
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  const handleNewGame = (selectedGameType: GameType) => {
    setGameType(selectedGameType);
  };

  const handleRestartGame = () => {
    if (gameType) {
      const numberOfPairs = getNumberOfPairs(difficulty);
      const newPairs = generateGamePairs(gameType, numberOfPairs);
      setPairs(newPairs);

      const initialCards = newPairs.flatMap(pair => [
        { ...pair, id: Math.random(), flipped: false, matched: false, value: pair.item1 },
        { ...pair, id: Math.random(), flipped: false, matched: false, value: pair.item2 },
      ]);
      setCards(shuffleArray(initialCards));
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setIsGameComplete(false);
    }
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    // Restart the game with the new difficulty
    if (gameType) {
        const numberOfPairs = getNumberOfPairs(newDifficulty);
        const newPairs = generateGamePairs(gameType, numberOfPairs);
        setPairs(newPairs);

        const initialCards = newPairs.flatMap(pair => [
            { ...pair, id: Math.random(), flipped: false, matched: false, value: pair.item1 },
            { ...pair, id: Math.random(), flipped: false, matched: false, value: pair.item2 },
        ]);
        setCards(shuffleArray(initialCards));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setIsGameComplete(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {!gameType ? (
        <>
          <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Select a Game</h1>
          <DifficultySelector difficulty={difficulty} onDifficultyChange={handleDifficultyChange} />
          <GameSelection onSelectGame={handleNewGame} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center w-full max-w-4xl mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">{gameType.replace('-', ' ')} Match</h1>
            <GameStatus moves={moves} totalPairs={pairs.length} matchedPairs={matchedCards.length / 2} />
          </div>
           <div className="grid grid-cols-4 gap-4 max-w-4xl w-full">
            {cards.map((card, index) => (
              <GameCard
                key={card.id}
                value={card.value}
                isFlipped={card.flipped || card.matched}
                isMatched={card.matched}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          <div className="mt-6 flex space-x-4">
            <Button onClick={() => setGameType(null)} variant="outline">Choose Another Game</Button>
            <Button onClick={handleRestartGame}>Restart Game</Button>
             <DifficultySelector difficulty={difficulty} onDifficultyChange={handleDifficultyChange} />
          </div>
        </>
      )}
      <CompletionDialog isOpen={isGameComplete} onRestart={handleRestartGame} moves={moves} />
    </div>
  );
}