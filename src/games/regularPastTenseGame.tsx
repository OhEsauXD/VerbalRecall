import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from '../utils/types'; // Adjust import path if necessary
import { getGridColsClass } from '../utils/gameUtils'; // Adjust import path if necessary
import { regularPastTensePairs } from '../../lib/regularPastTense'; // Adjust import path if necessary
import Card from '../../components/ui/card'; // Adjust import path based on your Card component location

interface RegularPastTenseGameProps {
 difficulty: Difficulty;
  onComplete: (moves: number, time: number) => void;
}

const RegularPastTenseGame: React.FC<RegularPastTenseGameProps> = ({ difficulty, onGameComplete }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      // Placeholder for actual moves and time
      onGameComplete(0, 0); 
    }
  }, [matchedCards, cards.length, onGameComplete]);

  const startGame = () => {
    let pairsCount: number;
    switch (difficulty) {
      case 'easy':
        pairsCount = 8;
        break;
      case 'medium':
        pairsCount = 12;
        break;
      case 'hard':
        pairsCount = 18;
        break;
    }

    const selectedPairs = regularPastTensePairs.slice(0, pairsCount);
    const initialCards: CardData[] = [];

    selectedPairs.forEach((pair, index) => {
      initialCards.push({
        id: `card-${index}-1`,
        content: pair[0],
        type: 'base',
        isFlipped: false,
        isMatched: false,
      });
      initialCards.push({
        id: `card-${index}-2`,
        content: pair[1],
        type: 'past',
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffledCards = initialCards.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsProcessing(false);
  };

  const handleCardClick = (index: number) => {
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = newCards[firstIndex];
      const secondCard = newCards[secondIndex];

      const matchedPair = regularPastTensePairs.find(
        (pair) =>
          (pair[0] === firstCard.content && pair[1] === secondCard.content) ||
          (pair[0] === secondCard.content && pair[1] === firstCard.content)
      );

      if (matchedPair) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const gridColsClass = getGridColsClass(Math.sqrt(cards.length)); // Assuming a square grid

  return (
    <div className={`grid gap-4 ${gridColsClass}`}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          onClick={() => handleCardClick(index)}
          className={`flex h-20 items-center justify-center rounded-md border p-4 ${
            card.isFlipped || card.isMatched ? 'bg-gray-200' : 'bg-white'
          } ${card.isMatched ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {card.isFlipped || card.isMatched ? card.content : ''}
        </Card>
      ))}
    </div>
  );
};

export default RegularPastTenseGame;