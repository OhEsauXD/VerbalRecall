
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { GameType } from '@/app/page';


interface GameSelectionProps {
  onSelectGame: (type: GameType) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ onSelectGame }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 md:p-8 w-full">
       {/* Verb Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=1"
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

      {/* Verb Trivia Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=10"
            alt="Abstract representation of trivia or question marks"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="quiz brain"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Verb Trivia Challenge</CardTitle>
          <CardDescription className="text-muted-foreground">
            Translate Spanish verbs to English by typing the correct letters. Use hints wisely and test your recall!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('trivia')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Verb Trivia
          </Button>
        </CardFooter>
      </Card>

      {/* Verb Lock Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=11" // New random seed
            alt="Abstract representation of a combination lock"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="lock combination"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Verb Combination Lock</CardTitle>
          <CardDescription className="text-muted-foreground">
            Unlock verb forms! Match Spanish infinitives with English base, past simple, and past participle.
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('verbLock')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Verb Lock
          </Button>
        </CardFooter>
      </Card>

      {/* Irregular Past Tense Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=7"
            alt="Abstract representation of past tense verbs"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="time clock"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Irregular Past Tense</CardTitle>
          <CardDescription className="text-muted-foreground">
            Match infinitive verbs with their irregular simple past/past participle forms. Sharpen your grammar skills!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('pastTense')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Irregular Past
          </Button>
        </CardFooter>
      </Card>

      {/* Regular Past Tense Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=8"
            alt="Abstract representation of regular past tense verbs"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="rules gears"
          />
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-semibold text-primary">Regular Past Tense</CardTitle>
          <CardDescription className="text-muted-foreground">
            Practice matching infinitive verbs with their regular simple past/past participle forms ending in "-ed".
          </CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button onClick={() => onSelectGame('regularPastTense')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Regular Past
          </Button>
        </CardFooter>
      </Card>


       {/* Adjective Game Card */}
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
          <Image
            src="https://picsum.photos/400/200?random=2"
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
            src="https://picsum.photos/400/200?random=3"
            alt="Abstract representation of animals"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="animals nature"
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
                src="https://picsum.photos/400/200?random=4"
                alt="Abstract representation of plants"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint="plants garden"
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

        {/* Food Game Card */}
        <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
            <CardHeader className="p-0">
            <Image
                src="https://picsum.photos/400/200?random=5"
                alt="Abstract representation of food, candy, and drinks"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint="food drink"
            />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
            <CardTitle className="mb-2 text-xl font-semibold text-primary">Food/Candy/Drink Game</CardTitle>
            <CardDescription className="text-muted-foreground">
                Match foods, candies, and drinks in English and Spanish with their pictures. Test your culinary vocabulary!
            </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
            <Button onClick={() => onSelectGame('food')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Play Food Items
            </Button>
            </CardFooter>
        </Card>

        {/* Transport/Buildings Game Card */}
        <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
            <CardHeader className="p-0">
            <Image
                src="https://picsum.photos/400/200?random=6"
                alt="Abstract representation of transport and buildings"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint="city transport"
            />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
            <CardTitle className="mb-2 text-xl font-semibold text-primary">Transport/Buildings Game</CardTitle>
            <CardDescription className="text-muted-foreground">
                Match transportation methods and building types in English and Spanish with their pictures. Explore the city!
            </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
            <Button onClick={() => onSelectGame('transportBuildings')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Play Transport/Buildings
            </Button>
            </CardFooter>
        </Card>

         {/* Nations & Nationalities Game Card */}
        <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground flex flex-col">
            <CardHeader className="p-0">
            <Image
                src="https://picsum.photos/400/200?random=9"
                alt="Abstract representation of nations and flags"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                data-ai-hint="flags world"
            />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
            <CardTitle className="mb-2 text-xl font-semibold text-primary">Nations & Nationalities</CardTitle>
            <CardDescription className="text-muted-foreground">
                Match country flags and names with their corresponding nationalities. Test your geography knowledge!
            </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto">
            <Button onClick={() => onSelectGame('nations')} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Play Nations
            </Button>
            </CardFooter>
        </Card>
    </div>
  );
};

export default GameSelection;
