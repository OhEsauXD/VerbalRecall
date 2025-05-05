'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameCardProps {
  cardId: string;
  verb: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (cardId: string) => void;
  language: 'en' | 'es';
}

const GameCard: React.FC<GameCardProps> = ({
  cardId,
  verb,
  isFlipped,
  isMatched,
  onClick,
  language,
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
    rounded-lg backface-hidden p-2 text-center
  `;

  // Back face (visible when flipped=false)
  const backFaceStyle = cn(
    faceStyle,
    'bg-secondary text-secondary-foreground', // Soft gray background
    isFlipped ? 'rotate-y-180' : ''
  );

  // Front face (visible when flipped=true or matched=true)
  const frontFaceStyle = cn(
    faceStyle,
    'bg-card text-card-foreground rotate-y-180', // White background for text visibility
    isMatched ? 'bg-accent text-accent-foreground' : '', // Teal background for matched
    isFlipped ? '' : 'rotate-y-180' // Start rotated if not flipped
  );

  const cardContainerStyle = cn(
    baseCardStyle,
    'relative', // Needed for absolute positioning of faces
    isFlipped || isMatched ? 'rotate-y-180' : '' // Rotate container when flipped/matched
  );

  const fontStyle = language === 'es' ? 'italic' : ''; // Example: italic for Spanish

  return (
    <div className={cardContainerStyle} onClick={handleClick} role="button" aria-pressed={isFlipped}>
      {/* Back Face */}
      <Card className={backFaceStyle}>
        <CardContent className="p-0">
          {/* Optionally show a logo or pattern on the back */}
          <span className="text-4xl">?</span>
        </CardContent>
      </Card>

      {/* Front Face */}
      <Card className={frontFaceStyle}>
        <CardContent className="p-0">
          <span className={cn("text-sm md:text-base font-medium", fontStyle)}>{verb}</span>
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
