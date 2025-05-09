import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from '../games/utils/types';
import { getGridColsClass } from '../games/utils/gameUtils';
import { adjectives } from '../lib/adjectives';

export interface AdjectivesGameProps {
  difficulty: Difficulty;
  onComplete: (moves: number, time: number) => void;
}

const AdjectivesGame: React.FC<AdjectivesGameProps> = ({ difficulty, onComplete }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isBoardLocked, setIsBoardLocked] = useState<boolean>(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    // NOTE: Timer and move tracking are not implemented in this component yet.
    // You would need to add state and logic for those here.
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      onComplete(0, 0); // Pass actual moves and time when implemented
    }
  }, [matchedCards, cards.length, onGameComplete]);

  const startGame = () => {
    let numberOfPairs: number;
    switch (difficulty) {
      case 'easy':
        numberOfPairs = 6;
        break;
      case 'medium':
        numberOfPairs = 10;
        break;
      case 'hard':
        numberOfPairs = 15;
        break;
    }

    const selectedAdjectives = adjectives.sort(() => 0.5 - Math.random()).slice(0, numberOfPairs);
    const initialCards: CardData[] = [];

    selectedAdjectives.forEach((adjective, index) => {
      initialCards.push({
        id: `adjective-${index}-1`,
        content: adjective,
        type: 'adjective',
        isFlipped: false,
        isMatched: false,
      });
      initialCards.push({
        id: `adjective-${index}-2`,
        content: adjective,
        type: 'adjective',
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(initialCards.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsBoardLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isBoardLocked || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;

    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsBoardLocked(true);
      const [firstIndex, secondIndex] = newFlippedCards;

      if (newCards[firstIndex].content === newCards[secondIndex].content) {
        // Match found
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setIsBoardLocked(false);
      } else {
        // No match, flip back
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards([...newCards]);
          setIsBoardLocked(false);
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  const gridColsClass = getGridColsClass(cards.length / 2); // Assuming number of pairs determines grid size

  return (
    <div className={`grid ${gridColsClass} gap-4 p-4`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`relative flex items-center justify-center w-full h-24 bg-gray-200 rounded-lg cursor-pointer transition-transform duration-500 transform ${
            card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
          }`}
          onClick={() => handleCardClick(index)}
          style={{ perspective: '1000px' }}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center backface-hidden ${
              card.isFlipped || card.isMatched ? 'hidden' : ''
            }`}
          >
            {/* Card back */}
            <span className="text-2xl font-bold text-gray-700">?</span>
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center rotate-y-180 backface-hidden ${
              card.isFlipped || card.isMatched ? '' : 'hidden'
            } ${card.isMatched ? 'bg-green-300' : 'bg-white'}`}
          >
            {/* Card front */}
            <span className="text-lg text-gray-800">{card.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdjectivesGame;