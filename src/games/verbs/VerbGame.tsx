import React, { useState, useEffect } from 'react';
import { CardData, Difficulty } from './types';
import { getGridColsClass, shuffleArray } from './utils';
import { Button } from '@/components/ui/button';
import { GameComponent } from '../types';
interface VerbGameProps {
  difficulty: Difficulty;
  onComplete: () => void;
}

const verbs = [
  { english: 'run', spanish: 'correr' },
  { english: 'eat', spanish: 'comer' },
  { english: 'drink', spanish: 'beber' },
  { english: 'sleep', spanish: 'dormir' },
  { english: 'read', spanish: 'leer' },
  { english: 'write', spanish: 'escribir' },
  { english: 'speak', spanish: 'hablar' },
  { english: 'listen', spanish: 'escuchar' },
  { english: 'see', spanish: 'ver' },
  { english: 'hear', spanish: 'oír' },
  { english: 'walk', spanish: 'caminar' },
  { english: 'sing', spanish: 'cantar' },
  { english: 'dance', spanish: 'bailar' },
  { english: 'swim', spanish: 'nadar' },
  { english: 'fly', spanish: 'volar' },
  { english: 'drive', spanish: 'conducir' },
  { english: 'cook', spanish: 'cocinar' },
  { english: 'clean', spanish: 'limpiar' },
  { english: 'study', spanish: 'estudiar' },
  { english: 'work', spanish: 'trabajar' },
];

const VerbGame: GameComponent = ({ difficulty, onComplete }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedPairs === cards.length / 2 && cards.length > 0) {
      onComplete();
    }
  }, [matchedPairs, cards.length, onComplete]);

  const initializeGame = () => {
    let numberOfPairs: number;
    switch (difficulty) {
      case Difficulty.Easy:
        numberOfPairs = 6;
        break;
      case Difficulty.Medium:
        numberOfPairs = 10;
        break;
      case Difficulty.Hard:
        numberOfPairs = 15;
        break;
      default:
        numberOfPairs = 6;
    }

    const selectedVerbs = shuffleArray(verbs).slice(0, numberOfPairs);

    const initialCards: CardData[] = [];
    selectedVerbs.forEach((verb, index) => {
      initialCards.push({ id: index * 2, value: verb.english, isFlipped: false, isMatched: false, type: 'english' });
      initialCards.push({ id: index * 2 + 1, value: verb.spanish, isFlipped: false, isMatched: false, type: 'spanish' });
    });

    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.includes(id) || cards.find(card => card.id === id)?.isMatched) {
      return;
    }

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    const newCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstCardId, secondCardId] = newFlipped;
      const firstCard = newCards.find(card => card.id === firstCardId);
      const secondCard = newCards.find(card => card.id === secondCardId);

      if (firstCard && secondCard &&
        ((firstCard.type === 'english' && secondCard.type === 'spanish' && verbs.find(v => v.english === firstCard.value && v.spanish === secondCard.value)) ||
         (firstCard.type === 'spanish' && secondCard.type === 'english' && verbs.find(v => v.spanish === firstCard.value && v.english === secondCard.value)))
      ) {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card
            )
          );
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const gridColsClass = getGridColsClass(difficulty);

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {cards.map((card) => (
        <Button
          key={card.id}
          className={`p-4 aspect-square flex items-center justify-center text-center text-wrap text-lg transition-all duration-300 ${
            card.isFlipped || card.isMatched ? 'bg-blue-500 text-white' : 'bg-gray-300'
          } ${card.isMatched ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => handleCardClick(card.id)}
          disabled={isChecking || card.isMatched}
        >
          {card.isFlipped || card.isMatched ? card.value : '?'}
        </Button>
      ))}
    </div>
  );
};

export default VerbGame;