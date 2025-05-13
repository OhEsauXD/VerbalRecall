
'use client';

import React, { useState, useEffect } from 'react';
import type { GameType } from '@/app/page'; 
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Lightbulb } from 'lucide-react'; // Added Lightbulb

interface GameStatusProps {
  moves: number; 
  score?: number; 
  isGameActive: boolean;
  onTimerUpdate: (time: number) => void;
  isHintActive?: boolean;
  onToggleHint?: () => void;
  gameType: GameType; 
  canUseHint?: boolean; 
  totalItems?: number; 
  currentItemIndex?: number; 
  isMuted?: boolean; // Mute state for memory games
  onToggleMute?: () => void; // Toggle mute for memory games
}

const GameStatus: React.FC<GameStatusProps> = ({
  moves,
  score,
  isGameActive,
  onTimerUpdate,
  isHintActive,
  onToggleHint,
  gameType,
  canUseHint,
  totalItems,
  currentItemIndex,
  isMuted,
  onToggleMute,
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

  const isMemoryGame = gameType !== 'trivia' && gameType !== 'verbLock' && gameType !== 'spanishEnglishTrivia' && gameType !== 'combinationLock';

  return (
    <div className="flex flex-col items-center my-4 p-4 bg-muted rounded-lg shadow w-full max-w-md">
      <div className="flex justify-around w-full items-center">
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
        {isMemoryGame && onToggleMute && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="text-foreground hover:text-accent"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        )}
      </div>
      {isMemoryGame && canUseHint && onToggleHint && (
         <Button
            onClick={onToggleHint}
            variant={isHintActive ? "default" : "outline"}
            className="mt-4"
            aria-pressed={isHintActive}
          >
            <Lightbulb className="mr-2 h-4 w-4" /> {isHintActive ? 'Hints ON' : 'Hints OFF'}
          </Button>
      )}
    </div>
  );
};

export default GameStatus;
