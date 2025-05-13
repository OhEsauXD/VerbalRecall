'use client';

import React, { useState, useEffect } from 'react';
import type { GameType } from '@/app/page'; 

interface GameStatusProps {
  moves: number; 
  score?: number; 
  isGameActive: boolean;
  onTimerUpdate: (time: number) => void;
  isHintActive?: boolean; // Kept for potential future use or other game types
  onToggleHint?: () => void; // Kept for potential future use
  gameType: GameType; 
  canUseHint?: boolean; 
  totalItems?: number; 
  currentItemIndex?: number; 
}

const GameStatus: React.FC<GameStatusProps> = ({
  moves,
  score,
  isGameActive,
  onTimerUpdate,
  // isHintActive and onToggleHint are no longer directly used by this component
  // for verbLock or trivia, as those games handle their specific hints/audio toggles internally.
  // They are kept in props for potential other game types or future refactoring.
  gameType,
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

  return (
    <div className="flex flex-col items-center my-4 p-4 bg-muted rounded-lg shadow w-full max-w-md">
      <div className="flex justify-around w-full">
        {gameType === 'trivia' || gameType === 'spanishEnglishTrivia' ? (
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
        ) : gameType === 'verbLock' || gameType === 'combinationLock' ? (
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
      {/* Hint button is removed from GameStatus for verbLock/trivia as they handle it internally.
          It could be conditionally rendered here for other game types if needed.
      */}
    </div>
  );
};

export default GameStatus;
