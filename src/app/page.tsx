'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DifficultySelector from '@/components/DifficultySelector';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import CompletionDialog from '@/components/CompletionDialog';
import { generateGameBoard, CardData } from '@/lib/verbs';
import { Button } from '@/components/ui/button';

type Difficulty = 'easy' | 'medium' | 'hard';

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false); // To prevent clicking during check
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  // Function to start a new game
  const startGame = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    const newBoard = generateGameBoard(selectedDifficulty);
    setCards(newBoard);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsGameActive(true);
    setShowCompletionDialog(false);
    setFinalTime(0); // Reset final time
  }, []);

  // Handle difficulty selection
  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    startGame(selectedDifficulty);
  };

  // Handle card click
  const handleCardClick = (cardId: string) => {
    if (isChecking || flippedCards.length >= 2 || cards.find(c => c.id === cardId)?.isFlipped) {
      return; // Ignore clicks if already checking, 2 cards flipped, or card already flipped/matched
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    setMoves((prevMoves) => prevMoves + 1);

    // Update card state to flipped
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsChecking(true); // Prevent further clicks during check
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]); // Clear flipped cards immediately on match
        setIsChecking(false); // Allow clicks again
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false); // Allow clicks again after delay
        }, 1000); // 1 second delay
      }
    }
  };

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsGameActive(false); // Stop the timer
      setShowCompletionDialog(true);
    }
  }, [matchedPairs, cards.length]);

   // Update final time when game becomes inactive and completion dialog is shown
   const handleTimerUpdate = (currentTime: number) => {
       if (!isGameActive && showCompletionDialog) {
          // Only set final time once when dialog is shown
          if (finalTime === 0) {
             setFinalTime(currentTime);
          }
       } else if (isGameActive) {
           // Keep track of current time while active, used if game ends abruptly
           setFinalTime(currentTime);
       }
  };

  // Handle playing again from the completion dialog
  const handlePlayAgain = () => {
    setShowCompletionDialog(false);
    setDifficulty(null); // Go back to difficulty selection
    setCards([]);
    setIsGameActive(false);
  };

  // Determine grid columns based on difficulty for better layout
  const gridColsClass = difficulty === 'easy' ? 'grid-cols-5 sm:grid-cols-6' :
                       difficulty === 'medium' ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' :
                       'grid-cols-8 sm:grid-cols-10 md:grid-cols-12';

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center my-6 text-primary">Verbal Recall</h1>
      <p className="text-center text-muted-foreground mb-8">Match the English and Spanish verbs!</p>

      {!difficulty && <DifficultySelector onSelectDifficulty={handleSelectDifficulty} currentDifficulty={difficulty} />}

      {difficulty && (
        <>
          <GameStatus moves={moves} isGameActive={isGameActive} onTimerUpdate={handleTimerUpdate} />
          <div className={`grid ${gridColsClass} gap-2 md:gap-4 place-items-center perspective-1000`}>
            {cards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                verb={card.verb}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleCardClick}
                language={card.language}
              />
            ))}
          </div>
           <Button onClick={() => setDifficulty(null)} variant="outline" className="mt-8">
            Change Difficulty
           </Button>
        </>
      )}

      <CompletionDialog
        isOpen={showCompletionDialog}
        moves={moves}
        time={finalTime} // Pass finalTime here
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}
