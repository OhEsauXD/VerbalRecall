import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, CardData } from '../games/utils/types';
import { getGridColsClass } from '../games/utils/gameUtils';
import { transportBuildings } from '../lib/transportBuildings';

interface TransportBuildingsGameProps {
 difficulty: Difficulty;
  onComplete: (moves: number, time: number) => void;
}

const TransportBuildingsGame: React.FC<TransportBuildingsGameProps> = ({ difficulty }) => {
  const [board, setBoard] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [canClick, setCanClick] = useState(true);

  const getBoardSize = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case 'easy':
        return 12; // 6 pairs
      case 'medium':
        return 18; // 9 pairs
      case 'hard':
        return 24; // 12 pairs
      default:
        return 12;
    }
  };

  const startGame = useCallback(() => {
    const boardSize = getBoardSize(difficulty);
    const selectedTransportBuildings = transportBuildings.sort(() => 0.5 - Math.random()).slice(0, boardSize / 2);
    const initialBoard: CardData[] = [...selectedTransportBuildings, ...selectedTransportBuildings]
      .sort(() => 0.5 - Math.random())
      .map((item, index) => ({
        id: index,
        content: item,
        type: 'transportBuilding', // Add type for potential future use
        isFlipped: false,
        isMatched: false,
      }));
    setBoard(initialBoard);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsGameComplete(false);
    setCanClick(true); // Ensure clicking is enabled at the start
  }, [difficulty]);

  useEffect(() => { // Use useCallback for startGame to avoid unnecessary re-creations
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length === board.length && board.length > 0) {
      setIsGameComplete(true);
    }
  }, [matchedCards, board]);

  const handleCardClick = useCallback((index: number) => {
    if (!canClick || board[index].isFlipped || board[index].isMatched) {
      return;
    }

    const newBoard = [...board];
    newBoard[index].isFlipped = true;
    setBoard(newBoard);

    setFlippedCards(prev => [...prev, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanClick(false);
      const [firstIndex, secondIndex] = flippedCards;
      if (board[firstIndex].content === board[secondIndex].content) {
        const newBoard = [...board];
        newBoard[firstIndex].isMatched = true;
        newBoard[secondIndex].isMatched = true;
        setBoard(newBoard);
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]); // Clear flipped cards after a match
        setCanClick(true);
      } else {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[firstIndex].isFlipped = false;
          newBoard[secondIndex].isFlipped = false;
          setBoard(newBoard);
          setFlippedCards([]);
          setCanClick(true); // Re-enable clicking after mismatch timeout
        }, 1000);
 }
    }
  }, [flippedCards, board, canClick]); // Add canClick to dependencies

  const gridColsClass = getGridColsClass(Math.sqrt(getBoardSize(difficulty))); // Assuming a square grid

  return (
    <div className={`grid ${gridColsClass} gap-4 p-4`}>
      {board.map((card, index) => (
        <div
          key={card.id}
          className={`bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-300
            ${card.isFlipped || card.isMatched ? 'bg-blue-500 text-white dark:bg-blue-700' : ''}
            ${card.isMatched ? 'opacity-50' : ''}
          `}
          style={{ aspectRatio: '1 / 1' }}
          onClick={() => handleCardClick(index)}
        >
          {card.isFlipped || card.isMatched ? card.content : ''}
        </div>
      ))}
      {isGameComplete && (
        <div>
          Game Complete! {/* This can be removed as GameController handles completion dialog */}
          {/* You would likely render a CompletionDialog here */}
        </div>
      )}
    </div>
  );
};

export default TransportBuildingsGame;