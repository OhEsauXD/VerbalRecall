import React, { useState, useEffect } from 'react';
import { Difficulty, CardData } from '../utils/types'; // Assuming types are here
import { getGridColsClass } from '../utils/gameUtils'; // Assuming utility functions are here
import { pastTensePairs } from '@/lib/pastTense'; // Assuming your data is here

interface PastTenseGameProps {
  difficulty: Difficulty;
  onComplete: (moves: number, time: number) => void; // Callback for game completion
}

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === board.length) {
      // Game is completed, assuming you have state for moves and time
      // Replace 0, 0 with actual moves and time state variables
      onGameComplete();
    }
  }, [matchedCards, board.length, onGameComplete]);

  const startGame = () => {
    let pairs: { verb: string; past: string }[] = [];
    switch (difficulty) {
      case 'easy':
        pairs = pastTensePairs.slice(0, 8); // Example: take first 8 pairs for easy
        break;
      case 'medium':
        pairs = pastTensePairs.slice(0, 12); // Example: take first 12 pairs
        break;
      case 'hard':
        pairs = pastTensePairs.slice(0, 18); // Example: take first 18 pairs
        break;
      default:
        pairs = pastTensePairs.slice(0, 8);
    }

    const initialBoard: CardData[] = [];
    pairs.forEach((pair, index) => {
      initialBoard.push({
        id: `verb-${index}`,
        content: pair.verb,
        isFlipped: false,
        isMatched: false,
        type: 'verb',
      });
      initialBoard.push({
        id: `past-${index}`,
        content: pair.past,
        isFlipped: false,
        isMatched: false,
        type: 'past',
      });
    });

    // Shuffle the board
    const shuffledBoard = initialBoard.sort(() => Math.random() - 0.5);
    setBoard(shuffledBoard);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || board[index].isFlipped || board[index].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const newBoard = board.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setBoard(newBoard);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = newBoard[firstIndex];
      const secondCard = newBoard[secondIndex];

      // Check for match (verb and its corresponding past tense)
      const isMatch =
        (firstCard.type === 'verb' && secondCard.type === 'past' && firstCard.content === pastTensePairs.find(p => p.past === secondCard.content)?.verb) ||
        (firstCard.type === 'past' && secondCard.type === 'verb' && secondCard.content === pastTensePairs.find(p => p.past === firstCard.content)?.verb);


      if (isMatch) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]); // Reset flipped cards immediately for a match
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          const resetBoard = board.map((card, i) =>
            newFlippedCards.includes(i) ? { ...card, isFlipped: false } : card
          );
          setBoard(resetBoard);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getGridColsClass = (size: number): string => {
    // This function should ideally be in gameUtils.ts
    switch (size) {
      case 16:
        return 'grid-cols-4';
      case 24:
        return 'grid-cols-6';
      case 36:
        return 'grid-cols-6'; // Or a larger grid if needed
      default:
        return 'grid-cols-4';
    }
  };


  return (
    <div className={`grid ${getGridColsClass(board.length)} gap-4 p-4`}>
      {board.map((card, index) => (
        <div
          key={card.id}
          className={`flex items-center justify-center aspect-square rounded-md cursor-pointer transition-all ${
            card.isFlipped || card.isMatched ? 'bg-blue-500 text-white' : 'bg-gray-200'
          } ${card.isMatched ? 'opacity-50' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          {card.isFlipped || card.isMatched ? card.content : '?'}
        </div>
      ))}
    </div>
  );
};

export default PastTenseGame;