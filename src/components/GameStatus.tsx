'use client';

import React, { useState, useEffect } from 'react';

interface GameStatusProps {
  moves: number;
  isGameActive: boolean;
  onTimerUpdate: (time: number) => void; // Callback to update time in parent
}

const GameStatus: React.FC<GameStatusProps> = ({ moves, isGameActive, onTimerUpdate }) => {
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
    <div className="flex justify-around items-center my-4 p-4 bg-muted rounded-lg shadow">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Moves</div>
        <div className="text-xl font-semibold">{moves}</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Time</div>
        <div className="text-xl font-semibold">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default GameStatus;
