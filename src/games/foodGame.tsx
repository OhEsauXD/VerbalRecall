import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from '../utils/types';
import { food } from '@/lib/food'; // Assuming food data is exported as 'food'
import { getGridColsClass } from '../utils/gameUtils'; // Assuming getGridColsClass is in gameUtils

interface FoodGameProps {
  difficulty: Difficulty; // Difficulty enum from types.ts
  onComplete: (moves: number, time: number) => void; // Function to call upon game completion
}

const FoodGame: React.FC<FoodGameProps> = ({ difficulty, onComplete }) => {
  const [board, setBoard] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0); // Add moves state

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === board.length) {
      // All cards matched, game is complete.
      // Need to add timer logic here to get the time. For now, passing 0.
      onComplete(moves, 0);
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

    const selectedFood = food.slice(0, numberOfPairs);
    const gameFood = [...selectedFood, ...selectedFood];

    const shuffledFood = gameFood.sort(() => Math.random() - 0.5);

    const initialBoard: CardData[] = shuffledFood.map((item, index) => ({
      id: index,
      content: item,
      isFlipped: false,
      isMatched: false,
      type: 'food', // Add type for clarity
    }));

    setBoard(initialBoard);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (isChecking || board[index].isFlipped || board[index].isMatched) {
      return;
    }

    const newBoard = [...board];
    newBoard[index].isFlipped = true;
    setBoard(newBoard);

    setFlippedCards((prev) => [...prev, index]);
    setMoves((prev) => prev + 1); // Increment moves on each valid card click
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedCards;

      if (board[firstIndex].content === board[secondIndex].content) {
        const newBoard = [...board];
        newBoard[firstIndex].isMatched = true;
        newBoard[secondIndex].isMatched = true;
        setBoard(newBoard);
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[firstIndex].isFlipped = false;
          newBoard[secondIndex].isFlipped = false;
          setBoard(newBoard);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, board]);

  const getGridSize = () => {
    switch (difficulty) {
      case 'easy':
        return 4;
      case 'medium':
        return 5;
      case 'hard':
        return 6;
      default:
        return 4;
    }
  };

  const gridColsClass = getGridColsClass(getGridSize());

  return (
    <div className={`grid ${gridColsClass} gap-4 p-4`}>
      {board.map((card, index) => (
        <div
          key={card.id}
          className={`relative flex items-center justify-center rounded-lg bg-gray-200 p-4 text-center text-lg font-bold cursor-pointer transition-all duration-300 ${
            card.isFlipped || card.isMatched ? 'bg-blue-500 text-white' : ''
          } ${card.isMatched ? 'opacity-50' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          {card.isFlipped || card.isMatched ? card.content : '❓'}
        </div>
      ))}
    </div>
  );
};

export default FoodGame;