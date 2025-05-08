
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image'; // Import next/image

interface GameCardProps {
  cardId: string;
  text?: string; // Make text optional
  imageUrl?: string; // Add imageUrl prop for general images
  flagUrl?: string; // Add specific flagUrl prop
  nation?: string; // Add nation name prop (optional)
  nationality?: string; // Add nationality prop (optional)
  spanishName?: string; // Add Spanish name prop (optional)
  dataAiHint?: string; // Add AI hint prop for images
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (cardId: string) => void;
  language: 'en' | 'es' | 'infinitive' | 'past'; // Language now reflects the content
  isHintActive: boolean;
  cardType?: 'name' | 'image' | 'verb' | 'adjective' | 'plant' | 'food' | 'transportBuilding' | 'pastTense' | 'regularPastTense' | 'nation' | 'nationality'; // Add nation types
}

const GameCard: React.FC<GameCardProps> = ({
  cardId,
  text,
  imageUrl,
  flagUrl, // Destructure flagUrl
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
}) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(cardId);
    }
  };

  // Base styling
  const baseCardStyle = `
    w-24 h-32 md:w-32 md:h-40
    flex items-center justify-center
    cursor-pointer transition-transform duration-500 transform-style-3d
    rounded-lg shadow-md
  `;

  // Card face styling
  const faceStyle = `
    absolute inset-0 w-full h-full
    flex flex-col items-center justify-center
    rounded-lg backface-hidden p-2 text-center overflow-hidden
  `;

  // Back face (visible when flipped=false)
  const getHintColor = () => {
    if (isHintActive && !isFlipped && !isMatched) {
      // Hint logic based on language or cardType
      if (language === 'en' || language === 'infinitive' || cardType === 'nation') { // English text, infinitive verb, name card, or nation card (flag)
        return 'bg-blue-200';
      } else if (language === 'es' || language === 'past' || cardType === 'nationality') { // Spanish text, image, past tense verb, or nationality card
        if (cardType === 'image') {
            return 'bg-yellow-200'; // Distinct hint for general image cards
        }
        // Hint for Spanish text, Past Tense, or Nationality
        return 'bg-green-200';
      }
    }
    return 'bg-secondary text-secondary-foreground'; // Default back face
  };

  const backFaceStyle = cn(
    faceStyle,
    getHintColor(),
    isFlipped ? 'rotate-y-180' : ''
  );

  // Front face (visible when flipped=true or matched=true)
  const frontFaceStyle = cn(
    faceStyle,
    'bg-card text-card-foreground rotate-y-180', // White background for text/image visibility
    isMatched ? 'bg-accent text-accent-foreground' : '', // Accent background for matched
    isFlipped ? '' : 'rotate-y-180' // Start rotated if not flipped
  );

  const cardContainerStyle = cn(
    baseCardStyle,
    'relative', // Needed for absolute positioning of faces
    isFlipped || isMatched ? 'rotate-y-180' : '' // Rotate container when flipped/matched
  );

  // Determine font style based on card content (Spanish text, Past Tense, Nationality are italic)
  const fontStyle = (language === 'es' || language === 'past' || cardType === 'nationality') ? 'italic' : '';
  const spanishNameStyle = cardType === 'image' ? 'italic text-xs mt-1' : '';
  const nationNameStyle = cardType === 'nation' ? 'text-xs mt-1 font-semibold' : ''; // Style for nation name below flag

  const renderFrontContent = () => {
    if (cardType === 'nation') {
      return (
        <>
          {flagUrl && (
            <Image
              src={flagUrl}
              alt={`${nation} flag`}
              width={80} // Adjusted size
              height={50} // Adjusted size for flag aspect ratio
              className="object-contain max-w-full max-h-[60%] rounded-sm border border-muted" // Border for flags
            />
          )}
          {nation && ( // Display nation name below the flag
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
       // Display text (verb, adjective, nationality, etc.)
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
      {/* Back Face */}
      <Card className={backFaceStyle}>
        <CardContent className="p-0">
          <span className="text-4xl">?</span>
        </CardContent>
      </Card>

      {/* Front Face */}
      <Card className={frontFaceStyle}>
        <CardContent className="p-0 flex flex-col items-center justify-center w-full h-full">
          {renderFrontContent()}
        </CardContent>
      </Card>
    </div>
  );
};

// Add necessary CSS for 3D transforms and backface visibility
const styles = `
  .transform-style-3d { transform-style: preserve-3d; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  // Ensure head exists before appending
  if (document.head) {
     document.head.appendChild(styleSheet);
  } else {
    // Fallback if head is not immediately available (e.g., during SSR hydration)
    document.addEventListener('DOMContentLoaded', () => {
         if (document.head) {
            document.head.appendChild(styleSheet);
         }
     });
  }
}


export default GameCard;

    