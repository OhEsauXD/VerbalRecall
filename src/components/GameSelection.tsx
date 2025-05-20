
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { GameType } from '@/app/page';
import { BookOpenCheck, SpellCheck2, Headphones } from 'lucide-react';

interface GameSelectionProps {
  onSelectGame: (type: GameType) => void;
}

interface GameCardData {
  type: GameType;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  aiHint?: string;
  icon?: React.ReactNode;
  buttonText: string;
}

const gameCategories: Record<string, GameCardData[]> = {
  practiceTests: [
    {
      type: 'toeflPractice',
      title: 'TOEFL Reading Practice',
      description: 'Prepare for the TOEFL test with reading comprehension passages and multiple-choice questions. Timed sections and PDF results.',
      icon: <BookOpenCheck className="w-24 h-24 text-primary mx-auto my-6" />,
      buttonText: 'Start TOEFL Reading',
    },
    {
      type: 'toeflGrammar',
      title: 'TOEFL Grammar Practice',
      description: 'Sharpen your English grammar with varied question types. Timed sections and detailed feedback.',
      icon: <SpellCheck2 className="w-24 h-24 text-primary mx-auto my-6" />,
      buttonText: 'Start TOEFL Grammar',
    },
    {
      type: 'toeflListening',
      title: 'TOEFL Listening Practice',
      description: 'Test your auditory comprehension with lectures, conversations, and mini-dialogues. Includes audio playback and timed sections.',
      icon: <Headphones className="w-24 h-24 text-primary mx-auto my-6" />,
      buttonText: 'Start TOEFL Listening',
    },
  ],
  trivia: [
    {
      type: 'trivia',
      title: 'Past Participle Trivia',
      description: 'Enter the Past Participle for the given English verb. Test your knowledge of verb forms!',
      imageSrc: 'https://picsum.photos/400/200?random=10',
      imageAlt: 'Abstract representation of verb forms or grammar books',
      aiHint: 'grammar books',
      buttonText: 'Play Past Participle Trivia',
    },
    {
      type: 'spanishEnglishTrivia',
      title: 'Spanish to English Verb Trivia',
      description: 'Translate Spanish infinitive verbs to their English base form. ¡Buena suerte!',
      imageSrc: 'https://picsum.photos/400/200?random=12',
      imageAlt: 'Abstract representation of language translation',
      aiHint: 'translation dictionary',
      buttonText: 'Play ES to EN Trivia',
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
    {
      type: 'combinationLock',
      title: 'Thematic Combination Lock',
      description: 'Guess four related items from a given category. Rotate the tumblers to find the correct words!',
      imageSrc: 'https://picsum.photos/400/200?random=13',
      imageAlt: 'Abstract representation of a thematic combination lock',
      aiHint: 'themed lock',
      buttonText: 'Play Thematic Lock',
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

const GameCategoryCarousel: React.FC<{ title: string; games: GameCardData[]; onSelectGame: (type: GameType) => void; router: ReturnType<typeof useRouter> }> = ({ title, games, onSelectGame, router }) => (
  <div className="mb-12 w-full max-w-4xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-primary">{title}</h2>
    <Carousel
      opts={{
        align: "start",
        loop: games.length > 1,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {games.map((game) => (
          <CarouselItem key={game.type} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 max-w-[360px] sm:max-w-none">
            <div className="p-1 h-full">
              <Card className="w-full h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
                <CardHeader className="p-0">
                  {game.imageSrc ? (
                    <Image
                      src={game.imageSrc}
                      alt={game.imageAlt || game.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                      data-ai-hint={game.aiHint}
                    />
                  ) : game.icon ? (
                     <div className="w-full h-48 flex items-center justify-center bg-muted">
                        {game.icon}
                     </div>
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-muted">
                      {/* Default icon if none specified */}
                      <BookOpenCheck className="w-16 h-16 text-primary" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="mb-2 text-xl font-semibold text-primary">{game.title}</CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {game.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button
                    onClick={() => {
                      if (game.type === 'toeflPractice') {
                        router.push('/toefl-practice/start');
                      } else if (game.type === 'toeflGrammar') {
                        router.push('/toefl-grammar/start');
                      } else if (game.type === 'toeflListening') {
                        router.push('/toefl-listening/start');
                      }
                       else {
                        onSelectGame(game.type);
                      }
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
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
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full">
      <GameCategoryCarousel title="Practice Tests" games={gameCategories.practiceTests} onSelectGame={onSelectGame} router={router} />
      <GameCategoryCarousel title="Trivia Games" games={gameCategories.trivia} onSelectGame={onSelectGame} router={router} />
      <GameCategoryCarousel title="Combination Lock Games" games={gameCategories.lock} onSelectGame={onSelectGame} router={router} />
      <GameCategoryCarousel title="Memory Matching Games" games={gameCategories.memory} onSelectGame={onSelectGame} router={router} />
    </div>
  );
};

export default GameSelection;
