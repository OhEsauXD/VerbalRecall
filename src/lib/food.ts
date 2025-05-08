import { CardType } from '@/components/GameCard';

export type FoodPair = {
  id: number;
  en: string;
  es: string;
  type: 'food' | 'candy' | 'drink'; // Categorize the item
  imageHint: string; // Hint for Unsplash search
};

// Combined list of 60 food/candy/drink pairs
export const foodPairs: FoodPair[] = [
  // Food (20)
  { id: 61, en: 'Apple', es: 'Manzana', type: 'food', imageHint: 'apple fruit' },
  { id: 62, en: 'Banana', es: 'Plátano', type: 'food', imageHint: 'banana fruit' },
  { id: 63, en: 'Bread', es: 'Pan', type: 'food', imageHint: 'bread bakery' },
  { id: 64, en: 'Cheese', es: 'Queso', type: 'food', imageHint: 'cheese dairy' },
  { id: 65, en: 'Chicken', es: 'Pollo', type: 'food', imageHint: 'chicken meat' },
  { id: 66, en: 'Egg', es: 'Huevo', type: 'food', imageHint: 'egg breakfast' },
  { id: 67, en: 'Rice', es: 'Arroz', type: 'food', imageHint: 'rice grain' },
  { id: 68, en: 'Pasta', es: 'Pasta', type: 'food', imageHint: 'pasta noodles' },
  { id: 69, en: 'Salad', es: 'Ensalada', type: 'food', imageHint: 'salad green' },
  { id: 70, en: 'Soup', es: 'Sopa', type: 'food', imageHint: 'soup bowl' },
  { id: 71, en: 'Fish', es: 'Pescado', type: 'food', imageHint: 'fish seafood' },
  { id: 72, en: 'Meat', es: 'Carne', type: 'food', imageHint: 'meat steak' },
  { id: 73, en: 'Pizza', es: 'Pizza', type: 'food', imageHint: 'pizza slice' },
  { id: 74, en: 'Burger', es: 'Hamburguesa', type: 'food', imageHint: 'burger fastfood' },
  { id: 75, en: 'Fries', es: 'Papas Fritas', type: 'food', imageHint: 'fries potato' },
  { id: 76, en: 'Sandwich', es: 'Sándwich', type: 'food', imageHint: 'sandwich lunch' },
  { id: 77, en: 'Cereal', es: 'Cereal', type: 'food', imageHint: 'cereal breakfast' },
  { id: 78, en: 'Yogurt', es: 'Yogur', type: 'food', imageHint: 'yogurt dairy' },
  { id: 79, en: 'Butter', es: 'Mantequilla', type: 'food', imageHint: 'butter dairy' },
  { id: 80, en: 'Jam', es: 'Mermelada', type: 'food', imageHint: 'jam sweet' },

  // Candies (20)
  { id: 81, en: 'Chocolate', es: 'Chocolate', type: 'candy', imageHint: 'chocolate bar' },
  { id: 82, en: 'Lollipop', es: 'Chupeta', type: 'candy', imageHint: 'lollipop colorful' },
  { id: 83, en: 'Gummy Bear', es: 'Osito de Goma', type: 'candy', imageHint: 'gummy bear' },
  { id: 84, en: 'Candy Cane', es: 'Bastón de Caramelo', type: 'candy', imageHint: 'candy cane' },
  { id: 85, en: 'Jelly Bean', es: 'Gomita', type: 'candy', imageHint: 'jelly bean' },
  { id: 86, en: 'Marshmallow', es: 'Malvavisco', type: 'candy', imageHint: 'marshmallow white' },
  { id: 87, en: 'Caramel', es: 'Caramelo', type: 'candy', imageHint: 'caramel sweet' },
  { id: 88, en: 'Toffee', es: 'Toffee', type: 'candy', imageHint: 'toffee chewy' },
  { id: 89, en: 'Fudge', es: 'Dulce de Leche', type: 'candy', imageHint: 'fudge chocolate' },
  { id: 90, en: 'Licorice', es: 'Regaliz', type: 'candy', imageHint: 'licorice black' },
  { id: 91, en: 'Bubble Gum', es: 'Chicle', type: 'candy', imageHint: 'bubble gum' },
  { id: 92, en: 'Hard Candy', es: 'Caramelo Duro', type: 'candy', imageHint: 'hard candy' },
  { id: 93, en: 'Cotton Candy', es: 'Algodón de Azúcar', type: 'candy', imageHint: 'cotton candy' },
  { id: 94, en: 'Nougat', es: 'Turrón', type: 'candy', imageHint: 'nougat nuts' },
  { id: 95, en: 'Mint', es: 'Menta', type: 'candy', imageHint: 'mint green' },
  { id: 96, en: 'Taffy', es: 'Caramelo Blando', type: 'candy', imageHint: 'taffy chewy' },
  { id: 97, en: 'Jawbreaker', es: 'Rompemandíbulas', type: 'candy', imageHint: 'jawbreaker large' },
  { id: 98, en: 'Sour Candy', es: 'Caramelo Ácido', type: 'candy', imageHint: 'sour candy' },
  { id: 99, en: 'Rock Candy', es: 'Caramelo de Roca', type: 'candy', imageHint: 'rock candy' },
  { id: 100, en: 'Gumdrop', es: 'Gota de Goma', type: 'candy', imageHint: 'gumdrop colorful' },

  // Drinks (20)
  { id: 101, en: 'Water', es: 'Agua', type: 'drink', imageHint: 'water bottle' },
  { id: 102, en: 'Milk', es: 'Leche', type: 'drink', imageHint: 'milk glass' },
  { id: 103, en: 'Juice', es: 'Jugo', type: 'drink', imageHint: 'juice orange' },
  { id: 104, en: 'Soda', es: 'Refresco', type: 'drink', imageHint: 'soda can' },
  { id: 105, en: 'Coffee', es: 'Café', type: 'drink', imageHint: 'coffee cup' },
  { id: 106, en: 'Tea', es: 'Té', type: 'drink', imageHint: 'tea cup' },
  { id: 107, en: 'Beer', es: 'Cerveza', type: 'drink', imageHint: 'beer glass' },
  { id: 108, en: 'Wine', es: 'Vino', type: 'drink', imageHint: 'wine glass' },
  { id: 109, en: 'Lemonade', es: 'Limonada', type: 'drink', imageHint: 'lemonade yellow' },
  { id: 110, en: 'Smoothie', es: 'Batido', type: 'drink', imageHint: 'smoothie fruit' },
  { id: 111, en: 'Hot Chocolate', es: 'Chocolate Caliente', type: 'drink', imageHint: 'hot chocolate' },
  { id: 112, en: 'Iced Tea', es: 'Té Helado', type: 'drink', imageHint: 'iced tea' },
  { id: 113, en: 'Energy Drink', es: 'Bebida Energética', type: 'drink', imageHint: 'energy drink' },
  { id: 114, en: 'Milkshake', es: 'Malteada', type: 'drink', imageHint: 'milkshake sweet' },
  { id: 115, en: 'Cocktail', es: 'Cóctel', type: 'drink', imageHint: 'cocktail colorful' },
  { id: 116, en: 'Champagne', es: 'Champaña', type: 'drink', imageHint: 'champagne bubbly' },
  { id: 117, en: 'Cider', es: 'Sidra', type: 'drink', imageHint: 'cider apple' },
  { id: 118, en: 'Coconut Water', es: 'Agua de Coco', type: 'drink', imageHint: 'coconut water' },
  { id: 119, en: 'Kombucha', es: 'Kombucha', type: 'drink', imageHint: 'kombucha fermented' },
  { id: 120, en: 'Sports Drink', es: 'Bebida Deportiva', type: 'drink', imageHint: 'sports drink' },
];


// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the food/candy/drink game
export type FoodCardData = {
    id: string; // Unique ID for the card instance (e.g., "name-en-61", "image-61")
    pairId: number; // ID linking the name and image pair
    language: 'en' | 'es'; // 'en' for name, 'es' for image (representing the Spanish name association)
    type: Extract<CardType, 'name' | 'image'>; // Use the imported CardType
    name?: string; // Item name (only for 'name' type)
    spanishName?: string; // Spanish name (only for 'image' type)
    imageUrl?: string; // Placeholder image URL (only for 'image' type)
    dataAiHint?: string; // AI hint for image search
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the food/candy/drink game board based on difficulty
export function generateFoodGameBoard(difficulty: 'easy' | 'medium' | 'hard'): FoodCardData[] {
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

  const selectedPairs = shuffle(foodPairs).slice(0, numberOfPairs);

  const gameCards: FoodCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add name card (English only)
    gameCards.push({
      id: `food-name-${pair.id}`, // Prefix to avoid ID collision
      pairId: pair.id,
      language: 'en', // English name card
      type: 'name',
      name: pair.en, // Use only English name
      isFlipped: false,
      isMatched: false,
    });
    // Add image card (Associated with Spanish name)
    gameCards.push({
      id: `food-image-${pair.id}`, // Prefix to avoid ID collision
      pairId: pair.id,
      language: 'es', // Associate image card with Spanish name
      type: 'image',
      spanishName: pair.es, // Add the Spanish name here
      // Use Picsum for placeholder images initially
      imageUrl: `https://picsum.photos/seed/${pair.id + 200}/100/100`, // Further offset seed
      dataAiHint: pair.imageHint, // Store the hint
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
