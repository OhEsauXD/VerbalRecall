

import { CardType } from '@/components/GameCard';

export type AnimalPair = {
  id: number;
  en: string;
  es: string;
  imageHint: string; // Hint for Unsplash search
};

// List of 60 animal pairs
export const animalPairs: AnimalPair[] = [
  { id: 1, en: 'Dog', es: 'Perro', imageHint: 'dog pet' },
  { id: 2, en: 'Cat', es: 'Gato', imageHint: 'cat pet' },
  { id: 3, en: 'Horse', es: 'Caballo', imageHint: 'horse farm' },
  { id: 4, en: 'Cow', es: 'Vaca', imageHint: 'cow farm' },
  { id: 5, en: 'Sheep', es: 'Oveja', imageHint: 'sheep farm' },
  { id: 6, en: 'Pig', es: 'Cerdo', imageHint: 'pig farm' },
  { id: 7, en: 'Chicken', es: 'Pollo/Gallina', imageHint: 'chicken farm' },
  { id: 8, en: 'Duck', es: 'Pato', imageHint: 'duck water' },
  { id: 9, en: 'Goose', es: 'Ganso', imageHint: 'goose water' },
  { id: 10, en: 'Rabbit', es: 'Conejo', imageHint: 'rabbit cute' },
  { id: 11, en: 'Mouse', es: 'Ratón', imageHint: 'mouse small' },
  { id: 12, en: 'Lion', es: 'León', imageHint: 'lion wild' },
  { id: 13, en: 'Tiger', es: 'Tigre', imageHint: 'tiger wild' },
  { id: 14, en: 'Bear', es: 'Oso', imageHint: 'bear forest' },
  { id: 15, en: 'Elephant', es: 'Elefante', imageHint: 'elephant large' },
  { id: 16, en: 'Monkey', es: 'Mono', imageHint: 'monkey jungle' },
  { id: 17, en: 'Giraffe', es: 'Jirafa', imageHint: 'giraffe tall' },
  { id: 18, en: 'Zebra', es: 'Cebra', imageHint: 'zebra stripes' },
  { id: 19, en: 'Kangaroo', es: 'Canguro', imageHint: 'kangaroo australia' },
  { id: 20, en: 'Wolf', es: 'Lobo', imageHint: 'wolf wild' },
  { id: 21, en: 'Fox', es: 'Zorro', imageHint: 'fox cunning' },
  { id: 22, en: 'Deer', es: 'Ciervo', imageHint: 'deer forest' },
  { id: 23, en: 'Squirrel', es: 'Ardilla', imageHint: 'squirrel tree' },
  { id: 24, en: 'Bird', es: 'Pájaro', imageHint: 'bird flying' },
  { id: 25, en: 'Fish', es: 'Pez', imageHint: 'fish water' },
  { id: 26, en: 'Shark', es: 'Tiburón', imageHint: 'shark ocean' },
  { id: 27, en: 'Whale', es: 'Ballena', imageHint: 'whale ocean' },
  { id: 28, en: 'Dolphin', es: 'Delfín', imageHint: 'dolphin ocean' },
  { id: 29, en: 'Octopus', es: 'Pulpo', imageHint: 'octopus tentacles' },
  { id: 30, en: 'Crab', es: 'Cangrejo', imageHint: 'crab beach' },
  { id: 31, en: 'Snake', es: 'Serpiente', imageHint: 'snake reptile' },
  { id: 32, en: 'Lizard', es: 'Lagarto', imageHint: 'lizard reptile' },
  { id: 33, en: 'Turtle', es: 'Tortuga', imageHint: 'turtle shell' },
  { id: 34, en: 'Frog', es: 'Rana', imageHint: 'frog pond' },
  { id: 35, en: 'Butterfly', es: 'Mariposa', imageHint: 'butterfly insect' },
  { id: 36, en: 'Bee', es: 'Abeja', imageHint: 'bee insect' },
  { id: 37, en: 'Ant', es: 'Hormiga', imageHint: 'ant insect' },
  { id: 38, en: 'Spider', es: 'Araña', imageHint: 'spider web' },
  { id: 39, en: 'Eagle', es: 'Águila', imageHint: 'eagle bird' },
  { id: 40, en: 'Owl', es: 'Búho', imageHint: 'owl night' },
  { id: 41, en: 'Penguin', es: 'Pingüino', imageHint: 'penguin cold' },
  { id: 42, en: 'Panda', es: 'Panda', imageHint: 'panda bear' },
  { id: 43, en: 'Koala', es: 'Koala', imageHint: 'koala australia' },
  { id: 44, en: 'Camel', es: 'Camello', imageHint: 'camel desert' },
  { id: 45, en: 'Rhino', es: 'Rinoceronte', imageHint: 'rhino africa' },
  { id: 46, en: 'Hippo', es: 'Hipopótamo', imageHint: 'hippo water' },
  { id: 47, en: 'Gorilla', es: 'Gorila', imageHint: 'gorilla ape' },
  { id: 48, en: 'Chimpanzee', es: 'Chimpancé', imageHint: 'chimpanzee ape' },
  { id: 49, en: 'Crocodile', es: 'Cocodrilo', imageHint: 'crocodile reptile' },
  { id: 50, en: 'Alligator', es: 'Caimán', imageHint: 'alligator reptile' },
  { id: 51, en: 'Bat', es: 'Murciélago', imageHint: 'bat flying' },
  { id: 52, en: 'Seal', es: 'Foca', imageHint: 'seal ocean' },
  { id: 53, en: 'Walrus', es: 'Morsa', imageHint: 'walrus cold' },
  { id: 54, en: 'Otter', es: 'Nutria', imageHint: 'otter water' },
  { id: 55, en: 'Beaver', es: 'Castor', imageHint: 'beaver dam' },
  { id: 56, en: 'Skunk', es: 'Zorrillo', imageHint: 'skunk black' },
  { id: 57, en: 'Raccoon', es: 'Mapache', imageHint: 'raccoon nocturnal' },
  { id: 58, en: 'Hedgehog', es: 'Erizo', imageHint: 'hedgehog spines' },
  { id: 59, en: 'Badger', es: 'Tejón', imageHint: 'badger burrow' },
  { id: 60, en: 'Moose', es: 'Alce', imageHint: 'moose large' },
];

// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the animal game
export type AnimalCardData = {
    id: string; // Unique ID for the card instance (e.g., "name-en-1", "image-1")
    pairId: number; // ID linking the name and image pair
    language: 'en' | 'es'; // Use 'en' for name, 'es' for image (representing the Spanish name association)
    type: 'name' | 'image'; // Use the imported CardType with 'name' and 'image'
    name?: string; // Animal name (only for 'name' type)
    spanishName?: string; // Spanish name (only for 'image' type)
    imageUrl?: string; // Placeholder image URL (only for 'image' type)
    dataAiHint?: string; // AI hint for image search
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the animal game board based on difficulty
export function generateAnimalGameBoard(difficulty: 'easy' | 'medium' | 'hard'): AnimalCardData[] {
  let numberOfPairs: number;
  switch (difficulty) {
    case 'easy':
      numberOfPairs = 15;
      break;
    case 'medium':
      numberOfPairs = 30;
      break;
    case 'hard':
      numberOfPairs = 60;
      break;
    default:
      numberOfPairs = 15; // Default to easy
  }

  const selectedPairs = shuffle(animalPairs).slice(0, numberOfPairs);

  const gameCards: AnimalCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add name card (English only)
    gameCards.push({
      id: `name-${pair.id}`, // Keep unique prefix
      pairId: pair.id,
      language: 'en', // English name card
      type: 'name',
      name: pair.en, // Use only English name
      isFlipped: false,
      isMatched: false,
    });
    // Add image card (Associated with Spanish name)
    gameCards.push({
      id: `image-${pair.id}`, // Keep unique prefix
      pairId: pair.id,
      language: 'es', // Associate image card with Spanish name
      type: 'image',
      spanishName: pair.es, // Add the Spanish name here
      // Use Picsum for placeholder images initially
      imageUrl: `https://picsum.photos/seed/${pair.id}/100/100`,
      dataAiHint: pair.imageHint, // Store the hint
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
