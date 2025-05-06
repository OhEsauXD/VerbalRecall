
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DifficultySelector from '@/components/DifficultySelector';
import GameCard from '@/components/GameCard';
import GameStatus from '@/components/GameStatus';
import CompletionDialog from '@/components/CompletionDialog';
import { generateGameBoard, CardData } from '@/lib/verbs';
import { generateAdjectiveGameBoard, AdjectiveCardData } from '@/lib/adjectives';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


type Difficulty = 'easy' | 'medium' | 'hard';

export default function Home() {
  // State for Verb Game
  const [verbDifficulty, setVerbDifficulty] = useState<Difficulty | null>(null);
  const [verbCards, setVerbCards] = useState<CardData[]>([]);
  const [verbFlippedCards, setVerbFlippedCards] = useState<string[]>([]);
  const [verbMatchedPairs, setVerbMatchedPairs] = useState<number[]>([]);
  const [verbMoves, setVerbMoves] = useState(0);
  const [isVerbGameActive, setIsVerbGameActive] = useState(false);
  const [isVerbChecking, setIsVerbChecking] = useState(false);
  const [showVerbCompletionDialog, setShowVerbCompletionDialog] = useState(false);
  const [verbFinalTime, setVerbFinalTime] = useState(0);

  // State for Adjective Game
  const [adjectiveDifficulty, setAdjectiveDifficulty] = useState<Difficulty | null>(null);
  const [adjectiveCards, setAdjectiveCards] = useState<AdjectiveCardData[]>([]);
  const [adjectiveFlippedCards, setAdjectiveFlippedCards] = useState<string[]>([]);
  const [adjectiveMatchedPairs, setAdjectiveMatchedPairs] = useState<number[]>([]);
  const [adjectiveMoves, setAdjectiveMoves] = useState(0);
  const [isAdjectiveGameActive, setIsAdjectiveGameActive] = useState(false);
  const [isAdjectiveChecking, setIsAdjectiveChecking] = useState(false);
  const [showAdjectiveCompletionDialog, setShowAdjectiveCompletionDialog] = useState(false);
  const [adjectiveFinalTime, setAdjectiveFinalTime] = useState(0);


  // Function to start a new verb game
  const startVerbGame = useCallback((selectedDifficulty: Difficulty) => {
    setVerbDifficulty(selectedDifficulty);
    const newBoard = generateGameBoard(selectedDifficulty);
    setVerbCards(newBoard);
    setVerbFlippedCards([]);
    setVerbMatchedPairs([]);
    setVerbMoves(0);
    setIsVerbGameActive(true);
    setShowVerbCompletionDialog(false);
    setVerbFinalTime(0);
  }, []);

  // Function to start a new adjective game
  const startAdjectiveGame = useCallback((selectedDifficulty: Difficulty) => {
    setAdjectiveDifficulty(selectedDifficulty);
    const newBoard = generateAdjectiveGameBoard(selectedDifficulty);
    setAdjectiveCards(newBoard);
    setAdjectiveFlippedCards([]);
    setAdjectiveMatchedPairs([]);
    setAdjectiveMoves(0);
    setIsAdjectiveGameActive(true);
    setShowAdjectiveCompletionDialog(false);
    setAdjectiveFinalTime(0);
  }, []);

  // Handle verb difficulty selection
  const handleSelectVerbDifficulty = (selectedDifficulty: Difficulty) => {
    startVerbGame(selectedDifficulty);
  };

  // Handle adjective difficulty selection
  const handleSelectAdjectiveDifficulty = (selectedDifficulty: Difficulty) => {
    startAdjectiveGame(selectedDifficulty);
  };

  // Handle verb card click
  const handleVerbCardClick = (cardId: string) => {
    if (isVerbChecking || verbFlippedCards.length >= 2 || verbCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }

    const newFlippedCards = [...verbFlippedCards, cardId];
    setVerbFlippedCards(newFlippedCards);
    setVerbMoves((prevMoves) => prevMoves + 1);

    setVerbCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setIsVerbChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = verbCards.find((card) => card.id === firstCardId);
      const secondCard = verbCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setVerbMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setVerbCards((prevCards) =>
          prevCards.map((card) =>
            card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card
          )
        );
        setVerbFlippedCards([]);
        setIsVerbChecking(false);
      } else {
        setTimeout(() => {
          setVerbCards((prevCards) =>
            prevCards.map((card) =>
              newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setVerbFlippedCards([]);
          setIsVerbChecking(false);
        }, 1000);
      }
    }
  };

  // Handle adjective card click
  const handleAdjectiveCardClick = (cardId: string) => {
    if (isAdjectiveChecking || adjectiveFlippedCards.length >= 2 || adjectiveCards.find(c => c.id === cardId)?.isFlipped) {
      return;
    }

    const newFlippedCards = [...adjectiveFlippedCards, cardId];
    setAdjectiveFlippedCards(newFlippedCards);
    setAdjectiveMoves((prevMoves) => prevMoves + 1);

    setAdjectiveCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setIsAdjectiveChecking(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = adjectiveCards.find((card) => card.id === firstCardId);
      const secondCard = adjectiveCards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setAdjectiveMatchedPairs((prevMatched) => [...prevMatched, firstCard.pairId]);
        setAdjectiveCards((prevCards) =>
          prevCards.map((card) =>
            card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card
          )
        );
        setAdjectiveFlippedCards([]);
        setIsAdjectiveChecking(false);
      } else {
        setTimeout(() => {
          setAdjectiveCards((prevCards) =>
            prevCards.map((card) =>
              newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setAdjectiveFlippedCards([]);
          setIsAdjectiveChecking(false);
        }, 1000);
      }
    }
  };


  // Check for verb game completion
  useEffect(() => {
    if (verbCards.length > 0 && verbMatchedPairs.length === verbCards.length / 2) {
      setIsVerbGameActive(false);
      setShowVerbCompletionDialog(true);
    }
  }, [verbMatchedPairs, verbCards.length]);

  // Check for adjective game completion
  useEffect(() => {
    if (adjectiveCards.length > 0 && adjectiveMatchedPairs.length === adjectiveCards.length / 2) {
      setIsAdjectiveGameActive(false);
      setShowAdjectiveCompletionDialog(true);
    }
  }, [adjectiveMatchedPairs, adjectiveCards.length]);

   const handleVerbTimerUpdate = (currentTime: number) => {
       if (!isVerbGameActive && showVerbCompletionDialog) {
          if (verbFinalTime === 0) {
             setVerbFinalTime(currentTime);
          }
       } else if (isVerbGameActive) {
           setVerbFinalTime(currentTime);
       }
  };

  const handleAdjectiveTimerUpdate = (currentTime: number) => {
    if (!isAdjectiveGameActive && showAdjectiveCompletionDialog) {
       if (adjectiveFinalTime === 0) {
          setAdjectiveFinalTime(currentTime);
       }
    } else if (isAdjectiveGameActive) {
        setAdjectiveFinalTime(currentTime);
    }
};

  const handleVerbPlayAgain = () => {
    setShowVerbCompletionDialog(false);
    setVerbDifficulty(null);
    setVerbCards([]);
    setIsVerbGameActive(false);
  };

  const handleAdjectivePlayAgain = () => {
    setShowAdjectiveCompletionDialog(false);
    setAdjectiveDifficulty(null);
    setAdjectiveCards([]);
    setIsAdjectiveGameActive(false);
  };


  const gridColsClass = (difficulty: Difficulty | null) => difficulty === 'easy' ? 'grid-cols-5 sm:grid-cols-6' :
                       difficulty === 'medium' ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' :
                       'grid-cols-8 sm:grid-cols-10 md:grid-cols-12';

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center my-6 text-primary">Verbal Recall</h1>
      
      {/* Verb Game Section */}
      <section className="w-full flex flex-col items-center mb-12">
        <h2 className="text-2xl font-semibold text-center my-4 text-primary-foreground">Verb Matching Game</h2>
        <p className="text-center text-muted-foreground mb-8">Match the English and Spanish verbs!</p>

        {!verbDifficulty && <DifficultySelector itemType="Verbs" onSelectDifficulty={handleSelectVerbDifficulty} currentDifficulty={verbDifficulty} />}

        {verbDifficulty && (
          <>
            <GameStatus moves={verbMoves} isGameActive={isVerbGameActive} onTimerUpdate={handleVerbTimerUpdate} />
            <div className={`grid ${gridColsClass(verbDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000`}>
              {verbCards.map((card) => (
                <GameCard
                  key={card.id}
                  cardId={card.id}
                  text={card.verb}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onClick={handleVerbCardClick}
                  language={card.language}
                />
              ))}
            </div>
            <Button onClick={() => setVerbDifficulty(null)} variant="outline" className="mt-8">
              Change Verb Difficulty
            </Button>
          </>
        )}
      </section>

      <Separator className="my-8" />

      {/* Adjective Game Section */}
      <section className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center my-4 text-primary-foreground">Adjective Matching Game</h2>
        <p className="text-center text-muted-foreground mb-8">Match the English and Spanish adjectives!</p>

        {!adjectiveDifficulty && <DifficultySelector itemType="Adjectives" onSelectDifficulty={handleSelectAdjectiveDifficulty} currentDifficulty={adjectiveDifficulty} />}

        {adjectiveDifficulty && (
          <>
            <GameStatus moves={adjectiveMoves} isGameActive={isAdjectiveGameActive} onTimerUpdate={handleAdjectiveTimerUpdate} />
            <div className={`grid ${gridColsClass(adjectiveDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000`}>
              {adjectiveCards.map((card) => (
                <GameCard
                  key={card.id}
                  cardId={card.id}
                  text={card.text}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onClick={handleAdjectiveCardClick}
                  language={card.language}
                />
              ))}
            </div>
            <Button onClick={() => setAdjectiveDifficulty(null)} variant="outline" className="mt-8">
              Change Adjective Difficulty
            </Button>
          </>
        )}
      </section>


      <CompletionDialog
        isOpen={showVerbCompletionDialog}
        moves={verbMoves}
        time={verbFinalTime}
        onPlayAgain={handleVerbPlayAgain}
        itemType="verb"
      />
       <CompletionDialog
        isOpen={showAdjectiveCompletionDialog}
        moves={adjectiveMoves}
        time={adjectiveFinalTime}
        onPlayAgain={handleAdjectivePlayAgain}
        itemType="adjective"
      />
    </div>
  );
}
