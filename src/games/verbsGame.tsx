import React, { useState, useEffect } from 'react';
import { verbs } from '../lib/verbs';
import { Difficulty, CardData, GameType } from '../games/utils/types';
import { resetGameState, getGridColsClass } from '../games/utils/gameUtils';

interface VerbsGameProps {
  difficulty: Difficulty;
  onComplete: (moves: number, time: number) => void; // Changed prop name to onComplete
}


const VerbsGame: React.FC<VerbsGameProps> = ({ difficulty, onGameComplete }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsGameComplete(true);
      onGameComplete();
    }
  }, [matchedCards, cards.length, onGameComplete]);

  const startGame = () => {
    const numPairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 10 : 15;
    const selectedVerbs = verbs.sort(() => 0.5 - Math.random()).slice(0, numPairs);
    const initialCards: CardData[] = selectedVerbs.flatMap((verb, index) => [
      { id: `${index}-1`, content: verb, isFlipped: false, isMatched: false },
      { id: `${index}-2`, content: verb, isFlipped: false, isMatched: false },
    ]);
    setCards(initialCards.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsGameComplete(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
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
      if (cards[firstIndex].content === cards[secondIndex].content) {
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

  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;
  const gridColsClass = getGridColsClass(gridSize);

  return (
    <div className={`grid ${gridColsClass} gap-4 p-4`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`flex items-center justify-center rounded-md text-white text-lg font-bold cursor-pointer
            ${card.isMatched ? 'bg-green-500' : card.isFlipped ? 'bg-blue-500' : 'bg-gray-500'}
            ${card.isMatched || card.isFlipped ? '' : 'hover:bg-gray-600'}
            transition-all duration-300 ease-in-out`}
          style={{ paddingBottom: '100%', position: 'relative' }} // To make cards square
          onClick={() => handleCardClick(index)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {card.isFlipped || card.isMatched ? card.content : ''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerbsGame;