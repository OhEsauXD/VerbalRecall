'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TriviaQuestion } from '@/components/GameEngine'; 
import { cn } from '@/lib/utils';
import type { GameType } from '@/app/page';
import { Lightbulb } from 'lucide-react';

interface TriviaGameProps {
  question: TriviaQuestion;
  questionIndex: number; 
  onInputChange: (questionIndex: number, letterIndex: number, value: string) => void;
  onSubmit: () => void;
  gameType: GameType;
  score: number; // Added score prop
  onHint: () => void; // Added hint callback
}

const TriviaGame: React.FC<TriviaGameProps> = ({
  question,
  questionIndex,
  onInputChange,
  onSubmit,
  gameType,
  score,
  onHint,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isHintButtonUsed, setIsHintButtonUsed] = useState(false);


  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, question.answerLetters.length);
    setIsHintButtonUsed(false); // Reset hint used state for new question
  }, [question.answerLetters.length, questionIndex]); // Depend on questionIndex to reset for new question

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

  const getTriviaTitle = () => {
    if (gameType === 'spanishEnglishTrivia') {
      return "What is the English base form of:";
    }
    return "What is the Past Participle of:";
  };

  const getClueText = () => {
    if (gameType === 'spanishEnglishTrivia' || question.clueLanguage === 'es') {
      return question.clue; 
    }
    return `to ${question.clue}`; 
  }

  const handleHintClick = () => {
    if (score > 0) {
      onHint();
      setIsHintButtonUsed(true);
    }
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-card text-card-foreground rounded-lg shadow-lg w-full max-w-2xl">
      <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2 text-center">
        {getTriviaTitle()}
      </h3>
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
        {getClueText()}
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
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <Button onClick={onSubmit} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
            Submit Answer
            </Button>
            <Button 
            onClick={handleHintClick} 
            variant="outline" 
            className="flex-1 text-lg py-3"
            disabled={score <= 0 || isHintButtonUsed || question.revealedIndices.size >= question.answerLetters.length}
            >
            <Lightbulb className="mr-2 h-5 w-5" /> Hint (-1 Pt)
            </Button>
        </div>
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
