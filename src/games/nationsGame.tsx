import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from '../games/utils/types';
import { resetGameState, getGridColsClass } from '../games/utils/gameUtils';
import { nations } from '../lib/nations';

interface NationsGameProps {
  difficulty: Difficulty;
}

const NationsGame: React.FC<NationsGameProps> = ({ difficulty }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameComplete(true);
    }
  }, [matchedCards, cards]);

  const startGame = () => {
    setIsGameComplete(false);
    setMatchedCards([]);
    setFlippedCards([]);

    let numberOfPairs: number;
    switch (difficulty) {
      case 'easy':
        numberOfPairs = 6; // 12 cards
        break;
      case 'medium':
        numberOfPairs = 10; // 20 cards
        break;
      case 'hard':
        numberOfPairs = 15; // 30 cards
        break;
      default:
        numberOfPairs = 6;
    }

    const selectedNations = nations.sort(() => 0.5 - Math.random()).slice(0, numberOfPairs);
    const initialCards: CardData[] = [];

    selectedNations.forEach((nation, index) => {
      initialCards.push({
        id: `nation-${index}-1`,
        content: nation,
        type: 'nation',
        isFlipped: false,
        isMatched: false,
      });
      initialCards.push({
        id: `nation-${index}-2`,
        content: nation,
        type: 'nation',
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(initialCards.sort(() => 0.5 - Math.random()));
  };

  const handleCardClick = (index: number) => {
    if (isGameComplete || flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (newCards[firstIndex].content === newCards[secondIndex].content) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const gridColsClass = getGridColsClass(cards.length);

  return (
    <div className={`grid ${gridColsClass} gap-4 p-4`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`relative w-full h-20 bg-gray-200 rounded-md flex items-center justify-center text-lg font-semibold cursor-pointer transition-transform transform ${
            card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
          }`}
          onClick={() => handleCardClick(index)}
        >
          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
            ?
          </div>
          <div className="absolute inset-0 flex items-center justify-center rotate-y-180 backface-hidden">
            {card.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NationsGame;