
'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TriviaQuestion } from '@/components/GameEngine'; 
import { cn } from '@/lib/utils';

interface TriviaGameProps {
  question: TriviaQuestion;
  questionIndex: number; 
  onInputChange: (questionIndex: number, letterIndex: number, value: string) => void;
  onSubmit: () => void;
}

const TriviaGame: React.FC<TriviaGameProps> = ({
  question,
  questionIndex,
  onInputChange,
  onSubmit,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, question.answerLetters.length);
  }, [question.answerLetters.length]);

  useEffect(() => {
    if (question) {
      const firstEmptyOrFocusableInputIndex = question.userGuess.findIndex(
        (guess, idx) => guess === '' && !question.revealedIndices.has(idx)
      );
      if (firstEmptyOrFocusableInputIndex !== -1 && inputRefs.current[firstEmptyOrFocusableInputIndex]) {
        inputRefs.current[firstEmptyOrFocusableInputIndex]?.focus();
      } else if (inputRefs.current[0]) { 
        inputRefs.current[0]?.focus();
      }
    }
  }, [question]);

  const handleInputChange = (index: number, value: string) => {
    const char = value.slice(-1).toUpperCase(); 
    if (/^[A-Z]*$/.test(char)) { 
      onInputChange(questionIndex, index, char);
      if (char && index < question.answerLetters.length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') { 
        onInputChange(questionIndex, index, '');
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && question.userGuess[index] === '' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < question.answerLetters.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-card text-card-foreground rounded-lg shadow-lg w-full max-w-2xl">
      <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2 text-center">
        What is the Past Participle of:
      </h3>
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
        to {question.clue}
      </p>

      <div className="flex justify-center gap-1 md:gap-2 mb-6 flex-wrap">
        {question.answerLetters.map((_, index) => (
          <Input
            key={`${question.id}-${index}`}
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength={1}
            value={question.userGuess[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              "w-12 h-14 md:w-14 md:h-16 text-2xl md:text-3xl text-center uppercase font-bold rounded-md border-2 focus:border-primary focus:ring-primary",
              question.revealedIndices.has(index) ? "bg-muted text-muted-foreground border-muted-foreground cursor-not-allowed" : "bg-input text-foreground border-input",
              question.isAttempted && !question.revealedIndices.has(index) && (question.userGuess[index] === question.answerLetters[index] ? "border-green-500" : "border-destructive"),
            )}
            readOnly={question.revealedIndices.has(index) || question.isAttempted}
            aria-label={`Letter ${index + 1} of the answer`}
          />
        ))}
      </div>

      {!question.isAttempted && (
        <Button onClick={onSubmit} className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
          Submit Answer
        </Button>
      )}

      {question.isAttempted && question.isCorrect === true && (
        <p className="text-green-500 font-semibold text-lg mt-4">Correct! Moving to next question...</p>
      )}
      {question.isAttempted && question.isCorrect === false && (
        <div className="mt-4 text-center">
            <p className="text-destructive font-semibold text-lg">Incorrect. The correct answer was:</p>
            <p className="text-accent font-bold text-2xl mt-1">{question.answer.toUpperCase()}</p>
            <p className="text-muted-foreground text-sm mt-2">Moving to next question...</p>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;

