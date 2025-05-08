'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image'; // Import next/image

interface GameCardProps {
  cardId: string;
  text?: string; // Make text optional
  imageUrl?: string; // Add imageUrl prop
  dataAiHint?: string; // Add AI hint prop for images
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (cardId: string) => void;
  language: 'en' | 'es' | 'name' | 'image'; // Update language prop to include card type for animals
  isHintActive: boolean;
  cardType?: 'name' | 'image' | 'verb' | 'adjective'; // Add cardType prop to distinguish animal cards
}

const GameCard: React.FC<GameCardProps> = ({
  cardId,
  text,
  imageUrl,
  dataAiHint,
  isFlipped,
  isMatched,
  onClick,
  language, // Still needed for text cards
  isHintActive,
  cardType, // Used for hint logic
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
    flex items-center justify-center
    rounded-lg backface-hidden p-2 text-center overflow-hidden
  `;

  // Back face (visible when flipped=false)
  const getHintColor = () => {
    if (isHintActive && !isFlipped && !isMatched) {
        // Hint logic based on card type
      if (cardType === 'name' || language === 'en') { // English verbs/adjectives or animal name
        return 'bg-blue-200';
      } else if (cardType === 'image' || language === 'es') { // Spanish verbs/adjectives or animal image
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

  const fontStyle = language === 'es' ? 'italic' : '';

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
        <CardContent className="p-0 flex items-center justify-center w-full h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={dataAiHint || "Animal image"}
              width={100} // Adjust size as needed
              height={100} // Adjust size as needed
              className="object-contain max-w-full max-h-full rounded-md"
              data-ai-hint={dataAiHint} // Add data-ai-hint
            />
          ) : (
            <span className={cn("text-sm md:text-base font-medium", fontStyle)}>{text}</span>
          )}
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
  document.head.appendChild(styleSheet);
}


export default GameCard;

    