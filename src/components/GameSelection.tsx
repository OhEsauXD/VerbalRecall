
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Import next/image
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { GameType } from '@/app/page';

interface GameSelectionProps {
  onSelectGame: (type: GameType) => void;
}

interface GameCardData {
  type: GameType;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  aiHint: string;
  buttonText: string;
}

const gameCategories: Record<string, GameCardData[]> = {
  trivia: [
    {
      type: 'trivia',
      title: 'Verb Trivia Challenge',
      description: 'Translate Spanish verbs to English by typing the correct letters. Use hints wisely and test your recall!',
      imageSrc: 'https://picsum.photos/400/200?random=10',
      imageAlt: 'Abstract representation of trivia or question marks',
      aiHint: 'quiz brain',
      buttonText: 'Play Verb Trivia',
    },
  ],
  lock: [
    {
      type: 'verbLock',
      title: 'Verb Combination Lock',
      description: 'Unlock verb forms! Match Spanish infinitives with English base, past simple, and past participle.',
      imageSrc: 'https://picsum.photos/400/200?random=11',
      imageAlt: 'Abstract representation of a combination lock',
      aiHint: 'lock combination',
      buttonText: 'Play Verb Lock',
    },
  ],
  memory: [
    {
      type: 'verbs',
      title: 'Verb Matching Game',
      description: 'Test your knowledge of common English and Spanish verbs. Match the pairs as quickly as you can!',
      imageSrc: 'https://picsum.photos/400/200?random=1',
      imageAlt: 'Abstract representation of verbs',
      aiHint: 'language learning',
      buttonText: 'Play Verbs',
    },
    {
      type: 'pastTense',
      title: 'Irregular Past Tense',
      description: 'Match infinitive verbs with their irregular simple past/past participle forms. Sharpen your grammar skills!',
      imageSrc: 'https://picsum.photos/400/200?random=7',
      imageAlt: 'Abstract representation of past tense verbs',
      aiHint: 'time clock',
      buttonText: 'Play Irregular Past',
    },
    {
      type: 'regularPastTense',
      title: 'Regular Past Tense',
      description: 'Practice matching infinitive verbs with their regular simple past/past participle forms ending in "-ed".',
      imageSrc: 'https://picsum.photos/400/200?random=8',
      imageAlt: 'Abstract representation of regular past tense verbs',
      aiHint: 'rules gears',
      buttonText: 'Play Regular Past',
    },
    {
      type: 'adjectives',
      title: 'Adjective Matching Game',
      description: 'Challenge your recall of English and Spanish adjectives. Find all the matching pairs to win!',
      imageSrc: 'https://picsum.photos/400/200?random=2',
      imageAlt: 'Abstract representation of adjectives',
      aiHint: 'colorful abstract',
      buttonText: 'Play Adjectives',
    },
    {
      type: 'animals',
      title: 'Animal Matching Game',
      description: 'Match the animal names in English and Spanish with their pictures. Can you identify them all?',
      imageSrc: 'https://picsum.photos/400/200?random=3',
      imageAlt: 'Abstract representation of animals',
      aiHint: 'animals nature',
      buttonText: 'Play Animals',
    },
    {
      type: 'plants',
      title: 'Veggie/Flower/Tree Game',
      description: 'Match vegetables, flowers, and trees in English and Spanish with their pictures. Explore nature!',
      imageSrc: 'https://picsum.photos/400/200?random=4',
      imageAlt: 'Abstract representation of plants',
      aiHint: 'plants garden',
      buttonText: 'Play Plants',
    },
    {
      type: 'food',
      title: 'Food/Candy/Drink Game',
      description: 'Match foods, candies, and drinks in English and Spanish with their pictures. Test your culinary vocabulary!',
      imageSrc: 'https://picsum.photos/400/200?random=5',
      imageAlt: 'Abstract representation of food, candy, and drinks',
      aiHint: 'food drink',
      buttonText: 'Play Food Items',
    },
    {
      type: 'transportBuildings',
      title: 'Transport/Buildings Game',
      description: 'Match transportation methods and building types in English and Spanish with their pictures. Explore the city!',
      imageSrc: 'https://picsum.photos/400/200?random=6',
      imageAlt: 'Abstract representation of transport and buildings',
      aiHint: 'city transport',
      buttonText: 'Play Transport/Buildings',
    },
    {
      type: 'nations',
      title: 'Nations & Nationalities',
      description: 'Match country flags and names with their corresponding nationalities. Test your geography knowledge!',
      imageSrc: 'https://picsum.photos/400/200?random=9',
      imageAlt: 'Abstract representation of nations and flags',
      aiHint: 'flags world',
      buttonText: 'Play Nations',
    },
  ],
};

const GameCategoryCarousel: React.FC<{ title: string; games: GameCardData[]; onSelectGame: (type: GameType) => void }> = ({ title, games, onSelectGame }) => (
  <div className="mb-12 w-full max-w-4xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-primary">{title}</h2>
    <Carousel
      opts={{
        align: "start",
        loop: games.length > 3,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {games.map((game) => (
          <CarouselItem key={game.type} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 max-w-[360px] sm:max-w-none">
            <div className="p-1 h-full">
              <Card className="w-full h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src={game.imageSrc}
                    alt={game.imageAlt}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                    data-ai-hint={game.aiHint}
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="mb-2 text-xl font-semibold text-primary">{game.title}</CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {game.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button onClick={() => onSelectGame(game.type)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {game.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {games.length > 1 && (
        <>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground hidden sm:flex" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground hidden sm:flex" />
        </>
      )}
    </Carousel>
  </div>
);

const GameSelection: React.FC<GameSelectionProps> = ({ onSelectGame }) => {
  return (
    // Removed padding from here, relies on DashboardLayout's padding
    <div className="flex flex-col items-center w-full">
      <GameCategoryCarousel title="Trivia Games" games={gameCategories.trivia} onSelectGame={onSelectGame} />
      <GameCategoryCarousel title="Combination Lock Games" games={gameCategories.lock} onSelectGame={onSelectGame} />
      <GameCategoryCarousel title="Memory Matching Games" games={gameCategories.memory} onSelectGame={onSelectGame} />
    </div>
  );
};

export default GameSelection;
