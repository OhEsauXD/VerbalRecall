
export type AdjectivePair = {
  id: number;
  en: string;
  es: string;
};

// List of 60 adjective pairs
export const adjectivePairs: AdjectivePair[] = [
  { id: 1, en: 'big', es: 'grande' },
  { id: 2, en: 'small', es: 'pequeño/a' },
  { id: 3, en: 'happy', es: 'feliz' },
  { id: 4, en: 'sad', es: 'triste' },
  { id: 5, en: 'good', es: 'bueno/a' },
  { id: 6, en: 'bad', es: 'malo/a' },
  { id: 7, en: 'beautiful', es: 'hermoso/a' },
  { id: 8, en: 'ugly', es: 'feo/a' },
  { id: 9, en: 'new', es: 'nuevo/a' },
  { id: 10, en: 'old', es: 'viejo/a' },
  { id: 11, en: 'young', es: 'joven' },
  { id: 12, en: 'long', es: 'largo/a' },
  { id: 13, en: 'short', es: 'corto/a' }, // For length
  { id: 14, en: 'tall', es: 'alto/a' }, // For height
  { id: 15, en: 'easy', es: 'fácil' },
  { id: 16, en: 'difficult', es: 'difícil' },
  { id: 17, en: 'fast', es: 'rápido/a' },
  { id: 18, en: 'slow', es: 'lento/a' },
  { id: 19, en: 'hot', es: 'caliente' },
  { id: 20, en: 'cold', es: 'frío/a' },
  { id: 21, en: 'rich', es: 'rico/a' },
  { id: 22, en: 'poor', es: 'pobre' },
  { id: 23, en: 'strong', es: 'fuerte' },
  { id: 24, en: 'weak', es: 'débil' },
  { id: 25, en: 'clean', es: 'limpio/a' },
  { id: 26, en: 'dirty', es: 'sucio/a' },
  { id: 27, en: 'dark', es: 'oscuro/a' },
  { id: 28, en: 'light', es: 'claro/a' }, // For color/brightness
  { id: 29, en: 'heavy', es: 'pesado/a' },
  { id: 30, en: 'light', es: 'ligero/a' }, // For weight
  { id: 31, en: 'early', es: 'temprano/a' },
  { id: 32, en: 'late', es: 'tarde' },
  { id: 33, en: 'important', es: 'importante' },
  { id: 34, en: 'interesting', es: 'interesante' },
  { id: 35, en: 'boring', es: 'aburrido/a' },
  { id: 36, en: 'expensive', es: 'caro/a' },
  { id: 37, en: 'cheap', es: 'barato/a' },
  { id: 38, en: 'kind', es: 'amable' },
  { id: 39, en: 'intelligent', es: 'inteligente' },
  { id: 40, en: 'stupid', es: 'estúpido/a' },
  { id: 41, en: 'brave', es: 'valiente' },
  { id: 42, en: 'cowardly', es: 'cobarde' },
  { id: 43, en: 'generous', es: 'generoso/a' },
  { id: 44, en: 'selfish', es: 'egoísta' },
  { id: 45, en: 'polite', es: 'educado/a' }, // Can also mean well-mannered
  { id: 46, en: 'rude', es: 'grosero/a' },
  { id: 47, en: 'funny', es: 'divertido/a' },
  { id: 48, en: 'serious', es: 'serio/a' },
  { id: 49, en: 'quiet', es: 'callado/a' },
  { id: 50, en: 'noisy', es: 'ruidoso/a' },
  { id: 51, en: 'patient', es: 'paciente' },
  { id: 52, en: 'impatient', es: 'impaciente' },
  { id: 53, en: 'honest', es: 'honesto/a' },
  { id: 54, en: 'dishonest', es: 'deshonesto/a' },
  { id: 55, en: 'famous', es: 'famoso/a' },
  { id: 56, en: 'unknown', es: 'desconocido/a' },
  { id: 57, en: 'possible', es: 'posible' },
  { id: 58, en: 'impossible', es: 'imposible' },
  { id: 59, en: 'correct', es: 'correcto/a' },
  { id: 60, en: 'incorrecto/a' },
];

// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Function to generate the game board based on difficulty
export type AdjectiveCardData = {
    id: string; // Unique ID for the card instance (e.g., "en-1", "es-1")
    pairId: number; // ID linking the English and Spanish pair
    language: 'en' | 'es';
    text: string; // Changed from verb to text to be more generic
    isFlipped: boolean;
    isMatched: boolean;
}

export function generateAdjectiveGameBoard(difficulty: 'easy' | 'medium' | 'hard'): AdjectiveCardData[] {
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

  const selectedPairs = shuffle(adjectivePairs).slice(0, numberOfPairs);

  const gameCards: AdjectiveCardData[] = [];
  selectedPairs.forEach((pair) => {
    gameCards.push({
      id: `adj-en-${pair.id}`, // Prefix with adj to avoid ID collision with verbs
      pairId: pair.id,
      language: 'en',
      text: pair.en,
      isFlipped: false,
      isMatched: false,
    });
    gameCards.push({
      id: `adj-es-${pair.id}`, // Prefix with adj
      pairId: pair.id,
      language: 'es',
      text: pair.es,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
