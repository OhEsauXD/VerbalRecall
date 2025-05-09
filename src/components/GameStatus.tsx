
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import type { GameType } from '@/app/page'; // Import GameType

interface GameStatusProps {
  moves: number; // For matching game
  score?: number; // Optional score for trivia game / verb lock game
  isGameActive: boolean;
  onTimerUpdate: (time: number) => void;
  isHintActive: boolean; // General hint active state
  onToggleHint: () => void; // General hint toggle function
  gameType: GameType; // To differentiate display
  canUseHint?: boolean; // Optional: to disable hint button based on score
  totalItems?: number; // For trivia (total questions) or verbLock (total locks)
  currentItemIndex?: number; // For trivia (current question) or verbLock (current lock)
}

const GameStatus: React.FC<GameStatusProps> = ({
  moves,
  score,
  isGameActive,
  onTimerUpdate,
  isHintActive,
  onToggleHint,
  gameType,
  canUseHint = true,
  totalItems,
  currentItemIndex,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isGameActive) {
      setTime(0);
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimerUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isGameActive, onTimerUpdate]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const hintButtonText = gameType === 'trivia' ? (isHintActive ? 'Hint Used' : 'Use Hint (-1 Pt)') : (isHintActive ? 'Hide Hints' : 'Show Hints');


  return (
    <div className="flex flex-col items-center my-4 p-4 bg-muted rounded-lg shadow w-full max-w-md">
      <div className="flex justify-around w-full">
        {gameType === 'trivia' ? (
          <>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Question</div>
              <div className="text-xl font-semibold">{currentItemIndex !== undefined ? currentItemIndex + 1 : '-'}/{totalItems ?? '-'}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-xl font-semibold">{score ?? 0}</div>
            </div>
          </>
        ) : gameType === 'verbLock' ? (
          <>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Lock</div>
              <div className="text-xl font-semibold">{currentItemIndex !== undefined ? currentItemIndex + 1 : '-'}/{totalItems ?? '-'}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-xl font-semibold">{score ?? 0}</div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Moves</div>
            <div className="text-xl font-semibold">{moves}</div>
          </div>
        )}
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Time</div>
          <div className="text-xl font-semibold">{formatTime(time)}</div>
        </div>
      </div>
      {gameType !== 'verbLock' && ( // Hint button not applicable for verb lock in current design
        <Button
          onClick={onToggleHint}
          variant={isHintActive && gameType !== 'trivia' ? "default" : "outline"}
          className="mt-4"
          aria-pressed={isHintActive}
          disabled={!canUseHint || (gameType === 'trivia' && isHintActive)}
        >
          <Lightbulb className="mr-2 h-4 w-4" /> {hintButtonText}
        </Button>
      )}
    </div>
  );
};

export default GameStatus;
