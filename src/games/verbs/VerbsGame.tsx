'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import CompletionDialog from '@/components/CompletionDialog';
import { generateGameBoard, CardData } from '@/lib/verbs'; // Import CardData specific to verbs
import { Difficulty } from '@/games/utils/types'; // Import shared Difficulty type
import { getGridColsClass } from '@/games/utils/gameUtils'; // Import utility function

interface VerbsGameProps {
  difficulty: Difficulty;
  onGameComplete: (moves: number, time: number) => void;
  onGoBackToDifficulty: () => void;
}

const VerbsGame: React.FC<VerbsGameProps> = ({ difficulty, onGameComplete, onGoBackToDifficulty }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [isHintActive, setIsHintActive] = useState(false);

  const toggleHint = () => {
    setIsHintActive(prev => !prev);
  };

  const startGame = useCallback((selectedDifficulty: Difficulty) => {
    const newBoard = generateGameBoard(selectedDifficulty);
    setCards(newBoard);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsGameActive(true);
    setShowCompletionDialog(false);
    setFinalTime(0);
    setIsHintActive(false);
  }, []);

  useEffect(() => {
    startGame(difficulty);
  }, [difficulty, startGame]);

  const handleCardClick = (cardId: string) => {
    if (isChecking || flippedCards.length >= 2 || cards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    setMoves((prevMoves) => prevMoves + 1);
    setCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card));

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setCards((prevCards) => prevCards.map((card) => card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card));
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) => prevCards.map((card) => newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const handleTimerUpdate = (currentTime: number) => {
    if (!isGameActive && showCompletionDialog) {
       if (finalTime === 0) setFinalTime(currentTime);
    } else if (isGameActive) {
        setFinalTime(currentTime);
    }
  };


  const handlePlayAgain = () => {
    setShowCompletionDialog(false);
    startGame(difficulty); // Restart with the same difficulty
  };

  useEffect(() => {
    if (isGameActive && cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsGameActive(false);
      setShowCompletionDialog(true);
      onGameComplete(moves, finalTime); // Notify parent component of completion
    }
  }, [matchedPairs, cards.length, isGameActive, moves, finalTime, onGameComplete]);


  return (
    <>
      <GameStatus
        moves={moves}
        isGameActive={isGameActive}
        onTimerUpdate={handleTimerUpdate}
        isHintActive={isHintActive}
        onToggleHint={toggleHint}
      />
      <div className={`grid ${getGridColsClass(difficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
        {cards.map((card) => (
          <GameCard
            key={card.id}
            cardId={card.id}
            text={card.verb}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={handleCardClick}
            language={card.language}
            isHintActive={isHintActive}
            cardType='verb'
          />
        ))}
      </div>
      <CompletionDialog
        isOpen={showCompletionDialog}
        moves={moves}
        time={finalTime}
        onPlayAgain={handlePlayAgain}
        itemType="verb"
      />
      <Button onClick={onGoBackToDifficulty} variant="outline" className="mt-8">
        Back to Difficulty
      </Button>
    </>
  );
};

export default VerbsGame;