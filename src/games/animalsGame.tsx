import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from './utils/types';
import { getGridColsClass } from './utils/gameUtils';
import { animals } from '../lib/animals';

interface AnimalsGameProps {
  difficulty: Difficulty; // Assuming Difficulty enum is defined in types.ts
  onComplete: (moves: number, time: number) => void; // Function to call when the game is completed
}

const AnimalsGame: React.FC<AnimalsGameProps> = ({ difficulty, onComplete }) => {
  const [board, setBoard] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === board.length) {
      // Assuming you track moves and time within this component
      onComplete(0, 0); // Replace 0, 0 with actual moves and time
    }
  }, [matchedCards, board.length, onGameComplete]);

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
      default:
        numberOfPairs = 6;
    }

    const selectedAnimals = animals.sort(() => 0.5 - Math.random()).slice(0, numberOfPairs);
    const initialBoard: CardData[] = [];

    selectedAnimals.forEach((animal, index) => {
      initialBoard.push({
        id: `${index}-1`,
        content: animal,
        type: 'animal',
        isFlipped: false,
        isMatched: false,
      });
      initialBoard.push({
        id: `${index}-2`,
        content: animal,
        type: 'animal',
        isFlipped: false,
        isMatched: false,
      });
    });

    setBoard(initialBoard.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsChecking(false);
  };

  const handleCardClick = (index: number) => {
    if (isChecking || board[index].isFlipped || board[index].isMatched) {
      return;
    }

    const newBoard = [...board];
    newBoard[index].isFlipped = true;
    setBoard(newBoard);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlippedCards;

      if (newBoard[firstIndex].content === newBoard[secondIndex].content) {
        const newMatchedCards = [...matchedCards, firstIndex, secondIndex];
        setMatchedCards(newMatchedCards);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          newBoard[firstIndex].isFlipped = false;
          newBoard[secondIndex].isFlipped = false;
          setBoard([...newBoard]);
          setIsChecking(false);
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  const gridColsClass = getGridColsClass(board.length);

  return (
    <div className={`grid ${gridColsClass} gap-4 p-4`}>
      {board.map((card, index) => (
        <div
          key={card.id}
          className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer aspect-square transition-transform duration-300 ${
            card.isFlipped || card.isMatched ? 'transform rotate-y-180 bg-blue-500 dark:bg-blue-600 text-white' : ''
          }`}
          onClick={() => handleCardClick(index)}
          style={{ perspective: '1000px' }}
        >
          <div
            className={`absolute backface-hidden w-full h-full flex items-center justify-center text-lg font-semibold ${
              card.isFlipped || card.isMatched ? 'transform rotate-y-180' : ''
            }`}
          >
            {card.isFlipped || card.isMatched ? card.content : '?'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalsGame;