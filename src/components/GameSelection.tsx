
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { GameType } from '@/app/page'; // Import GameType


interface GameSelectionProps {
  onSelectGame: (type: GameType) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ onSelectGame }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 md:p-8 w-full">
       {/* Verb Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=1" // Added random query
            alt="Abstract representation of verbs"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="language learning"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Verb Matching Game</CardTitle>
          <CardDescription className="text-muted-foreground">
            Test your knowledge of common English and Spanish verbs. Match the pairs as quickly as you can!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('verbs')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Verbs
          </Button>
        </CardFooter>
      </Card>

       {/* Adjective Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=2" // Added random query
            alt="Abstract representation of adjectives"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="colorful abstract"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Adjective Matching Game</CardTitle>
          <CardDescription className="text-muted-foreground">
            Challenge your recall of English and Spanish adjectives. Find all the matching pairs to win!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('adjectives')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Adjectives
          </Button>
        </CardFooter>
      </Card>

      {/* Animal Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=3" // Added random query
            alt="Abstract representation of animals"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="animals nature" // AI Hint for animal image
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Animal Matching Game</CardTitle>
          <CardDescription className="text-muted-foreground">
            Match the animal names in English and Spanish with their pictures. Can you identify them all?
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('animals')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Animals
          </Button>
        </CardFooter>
      </Card>

        {/* Plant Game Card */}
        <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
            <CardHeader className="p-0">
            <Image
                src="https://picsum.photos/400/200?random=4" // Added random query
                alt="Abstract representation of plants"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint="plants garden" // AI Hint for plant image
            />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
            <CardTitle className="mb-2 text-xl font-semibold text-primary">Veggie/Flower/Tree Game</CardTitle>
            <CardDescription className="text-muted-foreground">
                Match vegetables, flowers, and trees in English and Spanish with their pictures. Explore nature!
            </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
            <Button onClick={() => onSelectGame('plants')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Play Plants
            </Button>
            </CardFooter>
        </Card>
    </div>
  );
};

export default GameSelection;
