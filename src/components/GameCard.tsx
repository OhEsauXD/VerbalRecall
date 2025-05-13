
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image'; 

interface GameCardProps {
  cardId: string;
  text?: string;
  imageUrl?: string;
  flagUrl?: string;
  nation?: string;
  nationality?: string;
  spanishName?: string;
  dataAiHint?: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (cardId: string) => void;
  language: 'en' | 'es' | 'infinitive' | 'past';
  isHintActive: boolean;
  cardType?: 'name' | 'image' | 'verb' | 'adjective' | 'plant' | 'food' | 'transportBuilding' | 'pastTense' | 'regularPastTense' | 'nation' | 'nationality';
  onSpeak?: (text: string, lang: string) => void; // New prop for speaking text
}

const GameCard: React.FC<GameCardProps> = ({
  cardId,
  text,
  imageUrl,
  flagUrl,
  nation,
  nationality,
  spanishName,
  dataAiHint,
  isFlipped,
  isMatched,
  onClick,
  language,
  isHintActive,
  cardType,
  onSpeak, // Destructure new prop
}) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(cardId);
    }
  };

  const handleSpeak = () => {
    if (onSpeak && (isFlipped || isMatched)) {
      let textToSpeak = '';
      let langToUse = 'en-US';

      if (cardType === 'nation' && nation) {
        textToSpeak = nation;
        langToUse = 'en-US';
      } else if (cardType === 'nationality' && nationality) {
        textToSpeak = nationality;
        langToUse = 'es-ES'; // Assuming nationality is in Spanish as per current setup
      } else if (cardType === 'image' && spanishName) {
        textToSpeak = spanishName;
        langToUse = 'es-ES';
      } else if (text) {
        textToSpeak = text;
        if (language === 'es') langToUse = 'es-ES';
        else if (language === 'en' || language === 'infinitive' || language === 'past') langToUse = 'en-US';
      }
      
      if (textToSpeak) {
        onSpeak(textToSpeak, langToUse);
      }
    }
  };

  const baseCardStyle = `
    w-24 h-32 md:w-32 md:h-40
    flex items-center justify-center
    cursor-pointer transition-transform duration-500 transform-style-3d
    rounded-lg shadow-md
  `;

  const faceStyle = `
    absolute inset-0 w-full h-full
    flex flex-col items-center justify-center
    rounded-lg backface-hidden p-2 text-center overflow-hidden
  `;

  const getHintColor = () => {
    if (isHintActive && !isFlipped && !isMatched) {
      if (language === 'en' || language === 'infinitive' || cardType === 'nation') {
        return 'bg-blue-200';
      } else if (language === 'es' || language === 'past' || cardType === 'nationality' || cardType === 'image') {
         return cardType === 'image' ? 'bg-yellow-200' : 'bg-green-200';
      }
    }
    return 'bg-secondary text-secondary-foreground';
  };

  const backFaceStyle = cn(
    faceStyle,
    getHintColor(),
    isFlipped ? 'rotate-y-180' : ''
  );

  const frontFaceStyle = cn(
    faceStyle,
    'bg-card text-card-foreground rotate-y-180',
    isMatched ? 'bg-accent text-accent-foreground' : '',
    isFlipped ? '' : 'rotate-y-180'
  );

  const cardContainerStyle = cn(
    baseCardStyle,
    'relative',
    isFlipped || isMatched ? 'rotate-y-180' : ''
  );

  const fontStyle = (language === 'es' || language === 'past' || cardType === 'nationality') ? 'italic' : '';
  const spanishNameStyle = cardType === 'image' ? 'italic text-xs mt-1' : '';
  const nationNameStyle = cardType === 'nation' ? 'text-xs mt-1 font-semibold' : '';

  const renderFrontContent = () => {
    if (cardType === 'nation') {
      return (
        <>
          {flagUrl && (
            <Image
              src={flagUrl}
              alt={`${nation} flag`}
              width={80}
              height={50}
              className="object-contain max-w-full max-h-[60%] rounded-sm border border-muted"
            />
          )}
          {nation && (
            <span className={cn("block", nationNameStyle)}>{nation}</span>
          )}
        </>
      );
    } else if (imageUrl) {
      return (
        <>
          <Image
            src={imageUrl}
            alt={dataAiHint || "Item image"}
            width={80}
            height={80}
            className="object-contain max-w-full max-h-[70%] rounded-md"
            data-ai-hint={dataAiHint}
          />
          {spanishName && (
            <span className={cn("block", spanishNameStyle)}>{spanishName}</span>
          )}
        </>
      );
    } else {
      const displayText = cardType === 'nationality' ? nationality : text;
      return (
        <span className={cn("text-sm md:text-base font-medium", fontStyle)}>
          {displayText}
        </span>
      );
    }
  };

  return (
    <div className={cardContainerStyle} onClick={handleClick} role="button" aria-pressed={isFlipped}>
      <Card className={backFaceStyle}>
        <CardContent className="p-0">
          <span className="text-4xl">?</span>
        </CardContent>
      </Card>
      <Card className={frontFaceStyle} onClick={handleSpeak} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSpeak()}>
        <CardContent className="p-0 flex flex-col items-center justify-center w-full h-full">
          {renderFrontContent()}
        </CardContent>
      </Card>
    </div>
  );
};

const styles = `
  .transform-style-3d { transform-style: preserve-3d; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  if (document.head) {
     document.head.appendChild(styleSheet);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
         if (document.head) {
            document.head.appendChild(styleSheet);
         }
     });
  }
}

export default GameCard;
