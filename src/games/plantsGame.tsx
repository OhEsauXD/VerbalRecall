import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from '../utils/types';
import { getGridColsClass } from '../utils/gameUtils';
import { plants } from '@/lib/plants';

interface PlantsGameProps {
  difficulty: Difficulty;
  // Changed prop name and added parameters
  onComplete: (moves: number, time: number) => void;
}

const PlantsGame: React.FC<PlantsGameProps> = ({ difficulty, onGameComplete }) => {
  const [board, setBoard] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length === board.length && board.length > 0) {
      // Need to track and pass moves and time
      // This is a placeholder, actual implementation needed in component
      onGameComplete(0, 0);
    }
  }, [matchedCards, board.length, onGameComplete]);

  const startGame = () => {
    let gameData: string[] = [];
    let gridSize: number = 0;

    switch (difficulty) {
      case 'easy':
        gameData = plants.slice(0, 8);
        gridSize = 4;
        break;
      case 'medium':
        gameData = plants.slice(0, 12);
        gridSize = 4;
        break;
      case 'hard':
        gameData = plants.slice(0, 18);
        gridSize = 6;
        break;
    }

    const duplicatedData = [...gameData, ...gameData];
    const shuffledData = duplicatedData.sort(() => Math.random() - 0.5);

    const initialBoard: CardData[] = shuffledData.map((item, index) => ({
      id: index,
      content: item,
      isFlipped: false,
      isMatched: false,
      type: 'plant',
    }));

    setBoard(initialBoard);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (isProcessing || board[index].isFlipped || board[index].isMatched) {
      return;
    }

    const newBoard = [...board];
    newBoard[index].isFlipped = true;
    setBoard(newBoard);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = flippedCards;

      if (board[firstIndex].content === board[secondIndex].content) {
        const newBoard = [...board];
        newBoard[firstIndex].isMatched = true;
        newBoard[secondIndex].isMatched = true;
        setBoard(newBoard);
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[firstIndex].isFlipped = false;
          newBoard[secondIndex].isFlipped = false;
          setBoard(newBoard);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [flippedCards, board, matchedCards]);

  let gridSize = 0;
  switch (difficulty) {
    case 'easy':
      gridSize = 4;
      break;
    case 'medium':
      gridSize = 4;
      break;
    case 'hard':
      gridSize = 6;
      break;
  }

  const gridColsClass = getGridColsClass(gridSize);

  return (
    <div className="flex flex-col items-center">
      <div className={`grid ${gridColsClass} gap-4 p-4`}>
        {board.map((card, index) => (
          <div
            key={card.id}
            className={`flex items-center justify-center w-20 h-20 border rounded cursor-pointer
              ${card.isFlipped || card.isMatched ? 'bg-blue-200' : 'bg-gray-300'}
              ${card.isMatched ? 'opacity-50' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="text-sm text-center">{card.content}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantsGame;