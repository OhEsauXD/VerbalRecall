'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface GameStatusProps {
  moves: number;
  isGameActive: boolean;
  onTimerUpdate: (time: number) => void; // Callback to update time in parent
  isHintActive: boolean;
  onToggleHint: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ moves, isGameActive, onTimerUpdate, isHintActive, onToggleHint }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isGameActive) {
      setTime(0); // Reset timer when game starts/restarts
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimerUpdate(newTime); // Update parent state
          return newTime;
        });
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    // Cleanup function to clear interval when component unmounts or game becomes inactive
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isGameActive, onTimerUpdate]); // Rerun effect when game active state changes

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center my-4 p-4 bg-muted rounded-lg shadow w-full max-w-md">
      <div className="flex justify-around w-full">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Moves</div>
          <div className="text-xl font-semibold">{moves}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Time</div>
          <div className="text-xl font-semibold">{formatTime(time)}</div>
        </div>
      </div>
      <Button 
        onClick={onToggleHint} 
        variant={isHintActive ? "default" : "outline"} 
        className="mt-4"
        aria-pressed={isHintActive}
      >
        <Lightbulb className="mr-2 h-4 w-4" /> {isHintActive ? 'Hide Hints' : 'Show Hints'}
      </Button>
    </div>
  );
};

export default GameStatus;