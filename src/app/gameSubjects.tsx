'use client';

import React from 'react';
import GameStatus from '@/components/GameStatus';
import GameCard, { CardType as GameCardType } from '@/components/GameCard'; // Import CardType and rename it
import { Button } from '@/components/ui/button'; // Removed unused import of CardType as GameCardType
import { CardData as VerbCardData } from '@/lib/verbs';
import { AdjectiveCardData } from '@/lib/adjectives';
import { AnimalCardData } from '@/lib/animals';
import { PlantCardData } from '@/lib/plants';
import { FoodCardData } from '@/lib/food';
import { TransportBuildingCardData } from '@/lib/transportBuildings';
import { PastTenseCardData } from '@/lib/pastTense';
import { RegularPastTenseCardData } from '@/lib/regularPastTense';
import { NationCardData } from '@/lib/nations';

export type GameType = 'verbs' | 'adjectives' | 'animals' | 'plants' | 'food' | 'transportBuildings' | 'pastTense' | 'regularPastTense' | 'nations'; // Add 'nations'
type Difficulty = 'easy' | 'medium' | 'hard';

interface GameSubjectsProps {
  currentGameType: GameType | null; // Keep CardType for type safety
  isHintActive: boolean;
  toggleHint: () => void;
  getGridColsClass: (difficulty: Difficulty | null) => string;
  handleGoBackToDifficulty: () => void;

  // Verb Game Props
  verbCards: VerbCardData[];
  verbMoves: number;
  isVerbGameActive: boolean;
  handleVerbCardClick: (cardId: string) => void;
  handleVerbTimerUpdate: (currentTime: number) => void;
  verbDifficulty: Difficulty | null;

  // Adjective Game Props
  adjectiveCards: AdjectiveCardData[];
  adjectiveMoves: number;
  isAdjectiveGameActive: boolean;
  handleAdjectiveCardClick: (cardId: string) => void;
  handleAdjectiveTimerUpdate: (currentTime: number) => void;
  adjectiveDifficulty: Difficulty | null;

  // Animal Game Props
  animalCards: AnimalCardData[];
  animalMoves: number;
  isAnimalGameActive: boolean;
  handleAnimalCardClick: (cardId: string) => void;
  handleAnimalTimerUpdate: (currentTime: number) => void;
  animalDifficulty: Difficulty | null;

  // Plant Game Props
  plantCards: PlantCardData[];
  plantMoves: number;
  isPlantGameActive: boolean;
  handlePlantCardClick: (cardId: string) => void;
  handlePlantTimerUpdate: (currentTime: number) => void;
  plantDifficulty: Difficulty | null;

  // Food Game Props
  foodCards: FoodCardData[];
  foodMoves: number;
  isFoodGameActive: boolean;
  handleFoodCardClick: (cardId: string) => void;
  handleFoodTimerUpdate: (currentTime: number) => void;
  foodDifficulty: Difficulty | null;

  // Transport/Buildings Game Props
  transportBuildingCards: TransportBuildingCardData[];
  transportBuildingMoves: number;
  isTransportBuildingGameActive: boolean;
  handleTransportBuildingCardClick: (cardId: string) => void;
  handleTransportBuildingTimerUpdate: (currentTime: number) => void;
  transportBuildingDifficulty: Difficulty | null;

  // Irregular Past Tense Game Props
  pastTenseCards: PastTenseCardData[];
  pastTenseMoves: number;
  isPastTenseGameActive: boolean;
  handlePastTenseCardClick: (cardId: string) => void;
  handlePastTenseTimerUpdate: (currentTime: number) => void;
  pastTenseDifficulty: Difficulty | null;

  // Regular Past Tense Game Props
  regularPastTenseCards: RegularPastTenseCardData[];
  regularPastTenseMoves: number;
  isRegularPastTenseGameActive: boolean;
  handleRegularPastTenseCardClick: (cardId: string) => void;
  handleRegularPastTenseTimerUpdate: (currentTime: number) => void;
  regularPastTenseDifficulty: Difficulty | null;

   // Nations & Nationalities Game Props
  nationCards: NationCardData[];
  nationMoves: number;
  isNationGameActive: boolean;
  handleNationCardClick: (cardId: string) => void;
  handleNationTimerUpdate: (currentTime: number) => void;
  nationDifficulty: Difficulty | null;
}

const GameSubjects: React.FC<GameSubjectsProps> = ({
  currentGameType,
  isHintActive,
  toggleHint,
  getGridColsClass,
  handleGoBackToDifficulty,

  // Verb Game Props
  verbCards,
  verbMoves,
  isVerbGameActive,
  handleVerbCardClick,
  handleVerbTimerUpdate,
  verbDifficulty,

  // Adjective Game Props
  adjectiveCards,
  adjectiveMoves,
  isAdjectiveGameActive,
  handleAdjectiveCardClick,
  handleAdjectiveTimerUpdate,
  adjectiveDifficulty,

  // Animal Game Props
  animalCards,
  animalMoves,
  isAnimalGameActive,
  handleAnimalCardClick,
  handleAnimalTimerUpdate,
  animalDifficulty,

  // Plant Game Props
  plantCards,
  plantMoves,
  isPlantGameActive,
  handlePlantCardClick,
  handlePlantTimerUpdate,
  plantDifficulty,

  // Food Game Props
  foodCards,
  foodMoves,
  isFoodGameActive,
  handleFoodCardClick,
  handleFoodTimerUpdate,
  foodDifficulty,

  // Transport/Buildings Game Props
  transportBuildingCards,
  transportBuildingMoves,
  isTransportBuildingGameActive,
  handleTransportBuildingCardClick,
  handleTransportBuildingTimerUpdate,
  transportBuildingDifficulty,

  // Irregular Past Tense Game Props
  pastTenseCards,
  pastTenseMoves,
  isPastTenseGameActive,
  handlePastTenseCardClick,
  handlePastTenseTimerUpdate,
  pastTenseDifficulty,

  // Regular Past Tense Game Props
  regularPastTenseCards,
  regularPastTenseMoves,
  isRegularPastTenseGameActive,
  handleRegularPastTenseCardClick,
  handleRegularPastTenseTimerUpdate,
  regularPastTenseDifficulty,

  // Nations & Nationalities Game Props
  nationCards,
  nationMoves,
  isNationGameActive,
  handleNationCardClick,
  handleNationTimerUpdate,
  nationDifficulty,
}) => {
  switch (currentGameType) {
    case 'verbs':
      return (
        <>
          <GameStatus
            moves={verbMoves}
            isGameActive={isVerbGameActive}
            onTimerUpdate={handleVerbTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(verbDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {verbCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.verb}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleVerbCardClick}
                language={card.language}
                isHintActive={isHintActive}
                cardType="verb"
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'adjectives':
      return (
        <>
          <GameStatus
            moves={adjectiveMoves}
            isGameActive={isAdjectiveGameActive}
            onTimerUpdate={handleAdjectiveTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(adjectiveDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {adjectiveCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.text}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleAdjectiveCardClick}
                language={card.language}
                isHintActive={isHintActive}
                cardType="adjective"
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'animals':
      return (
        <>
          <GameStatus
            moves={animalMoves}
            isGameActive={isAnimalGameActive}
            onTimerUpdate={handleAnimalTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(animalDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {animalCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.type === 'name' ? card.name : undefined}
                imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                spanishName={card.type === 'image' ? card.spanishName : undefined}
                dataAiHint={card.dataAiHint}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleAnimalCardClick}
                language={card.language}
                isHintActive={isHintActive}
                cardType={card.type} // No longer need to cast
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'plants':
      return (
        <>
          <GameStatus
            moves={plantMoves}
            isGameActive={isPlantGameActive}
            onTimerUpdate={handlePlantTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(plantDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {plantCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.type === 'name' ? card.name : undefined}
                imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                spanishName={card.type === 'image' ? card.spanishName : undefined}
                dataAiHint={card.dataAiHint}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handlePlantCardClick}
                language={card.language}
                isHintActive={isHintActive}
                cardType={card.type} // No longer need to cast
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'food':
      return (
        <>
          <GameStatus
            moves={foodMoves}
            isGameActive={isFoodGameActive}
            onTimerUpdate={handleFoodTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(foodDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {foodCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.type === 'name' ? card.name : undefined}
                imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                spanishName={card.type === 'image' ? card.spanishName : undefined}
                dataAiHint={card.dataAiHint}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleFoodCardClick}
                language={card.language}
                isHintActive={isHintActive}
                cardType={card.type} // No longer need to cast
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'transportBuildings':
      return (
        <>
          <GameStatus
            moves={transportBuildingMoves}
            isGameActive={isTransportBuildingGameActive}
            onTimerUpdate={handleTransportBuildingTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(transportBuildingDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {transportBuildingCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.type === 'name' ? card.name : undefined}
                imageUrl={card.type === 'image' ? card.imageUrl : undefined}
                spanishName={card.type === 'image' ? card.spanishName : undefined}
                dataAiHint={card.dataAiHint}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleTransportBuildingCardClick}
                language={card.language}
                isHintActive={isHintActive}
                cardType={card.type} // No longer need to cast
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'pastTense':
      return (
        <>
          <GameStatus
            moves={pastTenseMoves}
            isGameActive={isPastTenseGameActive}
            onTimerUpdate={handlePastTenseTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(pastTenseDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {pastTenseCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.text}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handlePastTenseCardClick}
                language={card.tense as 'en' | 'es'} // Cast tense to language for hint color
                isHintActive={isHintActive}
                cardType="pastTense" // Specific type for hint logic if needed
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'regularPastTense':
      return (
        <>
          <GameStatus
            moves={regularPastTenseMoves}
            isGameActive={isRegularPastTenseGameActive}
            onTimerUpdate={handleRegularPastTenseTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(regularPastTenseDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {regularPastTenseCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.text}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleRegularPastTenseCardClick}
                language={card.tense as 'en' | 'es'} // Cast tense to language for hint color
                isHintActive={isHintActive}
                cardType="pastTense" // Use same cardType for hint logic
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    case 'nations':
      return (
        <>
          <GameStatus
            moves={nationMoves}
            isGameActive={isNationGameActive}
            onTimerUpdate={handleNationTimerUpdate}
            isHintActive={isHintActive}
            onToggleHint={toggleHint}
          />
          <div className={`grid ${getGridColsClass(nationDifficulty)} gap-2 md:gap-4 place-items-center perspective-1000 w-full px-2 md:px-0`}>
            {nationCards.map((card) => (
              <GameCard
                key={card.id}
                cardId={card.id}
                text={card.type === 'nationality' ? card.nationality : card.nation} // Display nation or nationality
                imageUrl={card.type === 'nation' ? card.flagUrl : undefined} // Display flag for nation
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleNationCardClick}
                language={card.type === 'nation' ? 'en' : 'es'} // 'en' for nation (flag), 'es' for nationality (text) for hint
                isHintActive={isHintActive}
                cardType={card.type} // No longer need to cast
              />
            ))}
          </div>
          <Button onClick={handleGoBackToDifficulty} variant="outline" className="mt-8">
            Back to Difficulty
          </Button>
        </>
      );
    default:
      return null;
  }
};

export default GameSubjects;