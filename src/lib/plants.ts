
export type PlantPair = {
  id: number;
  en: string;
  es: string;
  type: 'vegetable' | 'flower' | 'tree'; // Categorize the plant
  imageHint: string; // Hint for Unsplash search
};

// Combined list of 60 vegetables, flowers, and trees
export const plantPairs: PlantPair[] = [
  // Vegetables (20)
  { id: 1, en: 'Carrot', es: 'Zanahoria', type: 'vegetable', imageHint: 'carrot vegetable' },
  { id: 2, en: 'Broccoli', es: 'Brócoli', type: 'vegetable', imageHint: 'broccoli vegetable' },
  { id: 3, en: 'Tomato', es: 'Tomate', type: 'vegetable', imageHint: 'tomato fruit' }, // Botanically a fruit, often used as vegetable
  { id: 4, en: 'Potato', es: 'Papa/Patata', type: 'vegetable', imageHint: 'potato root' },
  { id: 5, en: 'Lettuce', es: 'Lechuga', type: 'vegetable', imageHint: 'lettuce leaves' },
  { id: 6, en: 'Onion', es: 'Cebolla', type: 'vegetable', imageHint: 'onion bulb' },
  { id: 7, en: 'Garlic', es: 'Ajo', type: 'vegetable', imageHint: 'garlic bulb' },
  { id: 8, en: 'Cucumber', es: 'Pepino', type: 'vegetable', imageHint: 'cucumber green' },
  { id: 9, en: 'Bell Pepper', es: 'Pimiento', type: 'vegetable', imageHint: 'pepper colorful' },
  { id: 10, en: 'Spinach', es: 'Espinaca', type: 'vegetable', imageHint: 'spinach leaves' },
  { id: 11, en: 'Corn', es: 'Maíz/Elote', type: 'vegetable', imageHint: 'corn cob' },
  { id: 12, en: 'Pea', es: 'Guisante/Chícharo', type: 'vegetable', imageHint: 'pea pod' },
  { id: 13, en: 'Bean', es: 'Frijol/Judía', type: 'vegetable', imageHint: 'bean legume' },
  { id: 14, en: 'Cauliflower', es: 'Coliflor', type: 'vegetable', imageHint: 'cauliflower white' },
  { id: 15, en: 'Eggplant', es: 'Berenjena', type: 'vegetable', imageHint: 'eggplant purple' },
  { id: 16, en: 'Zucchini', es: 'Calabacín', type: 'vegetable', imageHint: 'zucchini green' },
  { id: 17, en: 'Pumpkin', es: 'Calabaza', type: 'vegetable', imageHint: 'pumpkin orange' },
  { id: 18, en: 'Radish', es: 'Rábano', type: 'vegetable', imageHint: 'radish root' },
  { id: 19, en: 'Asparagus', es: 'Espárrago', type: 'vegetable', imageHint: 'asparagus green' },
  { id: 20, en: 'Cabbage', es: 'Col/Repollo', type: 'vegetable', imageHint: 'cabbage head' },

  // Flowers (20)
  { id: 21, en: 'Rose', es: 'Rosa', type: 'flower', imageHint: 'rose flower' },
  { id: 22, en: 'Tulip', es: 'Tulipán', type: 'flower', imageHint: 'tulip colorful' },
  { id: 23, en: 'Sunflower', es: 'Girasol', type: 'flower', imageHint: 'sunflower yellow' },
  { id: 24, en: 'Daisy', es: 'Margarita', type: 'flower', imageHint: 'daisy white' },
  { id: 25, en: 'Lily', es: 'Lirio', type: 'flower', imageHint: 'lily elegant' },
  { id: 26, en: 'Orchid', es: 'Orquídea', type: 'flower', imageHint: 'orchid tropical' },
  { id: 27, en: 'Carnation', es: 'Clavel', type: 'flower', imageHint: 'carnation pink' },
  { id: 28, en: 'Poppy', es: 'Amapola', type: 'flower', imageHint: 'poppy red' },
  { id: 29, en: 'Daffodil', es: 'Narciso', type: 'flower', imageHint: 'daffodil yellow' },
  { id: 30, en: 'Peony', es: 'Peonía', type: 'flower', imageHint: 'peony large' },
  { id: 31, en: 'Hyacinth', es: 'Jacinto', type: 'flower', imageHint: 'hyacinth fragrant' },
  { id: 32, en: 'Marigold', es: 'Caléndula', type: 'flower', imageHint: 'marigold orange' },
  { id: 33, en: 'Violet', es: 'Violeta', type: 'flower', imageHint: 'violet purple' },
  { id: 34, en: 'Lavender', es: 'Lavanda', type: 'flower', imageHint: 'lavender purple' },
  { id: 35, en: 'Hibiscus', es: 'Hibisco', type: 'flower', imageHint: 'hibiscus tropical' },
  { id: 36, en: 'Jasmine', es: 'Jazmín', type: 'flower', imageHint: 'jasmine white' },
  { id: 37, en: 'Magnolia', es: 'Magnolia', type: 'flower', imageHint: 'magnolia large' },
  { id: 38, en: 'Iris', es: 'Iris', type: 'flower', imageHint: 'iris purple' },
  { id: 39, en: 'Lotus', es: 'Loto', type: 'flower', imageHint: 'lotus water' },
  { id: 40, en: 'Chrysanthemum', es: 'Crisantemo', type: 'flower', imageHint: 'mum flower' },

  // Trees (20)
  { id: 41, en: 'Oak', es: 'Roble', type: 'tree', imageHint: 'oak tree' },
  { id: 42, en: 'Pine', es: 'Pino', type: 'tree', imageHint: 'pine tree' },
  { id: 43, en: 'Maple', es: 'Arce', type: 'tree', imageHint: 'maple leaf' },
  { id: 44, en: 'Birch', es: 'Abedul', type: 'tree', imageHint: 'birch bark' },
  { id: 45, en: 'Willow', es: 'Sauce', type: 'tree', imageHint: 'willow weeping' },
  { id: 46, en: 'Palm', es: 'Palmera', type: 'tree', imageHint: 'palm tropical' },
  { id: 47, en: 'Apple Tree', es: 'Manzano', type: 'tree', imageHint: 'apple tree' },
  { id: 48, en: 'Orange Tree', es: 'Naranjo', type: 'tree', imageHint: 'orange tree' },
  { id: 49, en: 'Cherry Blossom', es: 'Cerezo (flor)', type: 'tree', imageHint: 'cherry blossom' },
  { id: 50, en: 'Sequoia', es: 'Secuoya', type: 'tree', imageHint: 'sequoia giant' },
  { id: 51, en: 'Redwood', es: 'Secuoya roja', type: 'tree', imageHint: 'redwood tall' },
  { id: 52, en: 'Cedar', es: 'Cedro', type: 'tree', imageHint: 'cedar wood' },
  { id: 53, en: 'Fir', es: 'Abeto', type: 'tree', imageHint: 'fir christmas' },
  { id: 54, en: 'Spruce', es: 'Pícea', type: 'tree', imageHint: 'spruce evergreen' },
  { id: 55, en: 'Cypress', es: 'Ciprés', type: 'tree', imageHint: 'cypress tall' },
  { id: 56, en: 'Elm', es: 'Olmo', type: 'tree', imageHint: 'elm street' },
  { id: 57, en: 'Ash', es: 'Fresno', type: 'tree', imageHint: 'ash wood' },
  { id: 58, en: 'Beech', es: 'Haya', type: 'tree', imageHint: 'beech smooth' },
  { id: 59, en: 'Poplar', es: 'Álamo', type: 'tree', imageHint: 'poplar tall' },
  { id: 60, en: 'Banyan', es: 'Baniano', type: 'tree', imageHint: 'banyan roots' },
];


// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the plant game
export type PlantCardData = {
    id: string; // Unique ID for the card instance (e.g., "name-en-1", "image-1")
    pairId: number; // ID linking the name and image pair
    language: 'en' | 'es'; // 'en' for name, 'es' for image (representing the Spanish name association)
    type: 'name' | 'image'; // Explicitly define the card type
    name?: string; // Plant name (only for 'name' type)
    spanishName?: string; // Spanish name (only for 'image' type)
    imageUrl?: string; // Placeholder image URL (only for 'image' type)
    dataAiHint?: string; // AI hint for image search
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the plant game board based on difficulty
export function generatePlantGameBoard(difficulty: 'easy' | 'medium' | 'hard'): PlantCardData[] {
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

  const selectedPairs = shuffle(plantPairs).slice(0, numberOfPairs);

  const gameCards: PlantCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add name card (English only)
    gameCards.push({
      id: `plant-name-${pair.id}`, // Prefix to avoid ID collision
      pairId: pair.id,
      language: 'en', // English name card
      type: 'name',
      name: pair.en, // Use only English name
      isFlipped: false,
      isMatched: false,
    });
    // Add image card (Associated with Spanish name)
    gameCards.push({
      id: `plant-image-${pair.id}`, // Prefix to avoid ID collision
      pairId: pair.id,
      language: 'es', // Associate image card with Spanish name
      type: 'image',
      spanishName: pair.es, // Add the Spanish name here
      // Use Picsum for placeholder images initially
      imageUrl: `https://picsum.photos/seed/${pair.id + 100}/100/100`, // Offset seed
      dataAiHint: pair.imageHint, // Store the hint
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
