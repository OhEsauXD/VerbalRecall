
export type VerbPair = {
  id: number;
  en: string;
  es: string;
};

// List of 60 verb pairs (expandable)
export const verbPairs: VerbPair[] = [
  { id: 1, en: 'to be', es: 'ser/estar' },
  { id: 2, en: 'to have', es: 'tener' },
  { id: 3, en: 'to do', es: 'hacer' },
  { id: 4, en: 'to say', es: 'decir' },
  { id: 5, en: 'to go', es: 'ir' },
  { id: 6, en: 'to get', es: 'conseguir' },
  { id: 7, en: 'to make', es: 'hacer' }, // Note: 'hacer' can mean 'to do' or 'to make'
  { id: 8, en: 'to know', es: 'saber/conocer' },
  { id: 9, en: 'to think', es: 'pensar' },
  { id: 10, en: 'to see', es: 'ver' },
  { id: 11, en: 'to come', es: 'venir' },
  { id: 12, en: 'to want', es: 'querer' },
  { id: 13, en: 'to use', es: 'usar' },
  { id: 14, en: 'to find', es: 'encontrar' },
  { id: 15, en: 'to give', es: 'dar' },
  { id: 16, en: 'to tell', es: 'decir/contar' },
  { id: 17, en: 'to work', es: 'trabajar' },
  { id: 18, en: 'to call', es: 'llamar' },
  { id: 19, en: 'to try', es: 'intentar' },
  { id: 20, en: 'to ask', es: 'preguntar' },
  { id: 21, en: 'to need', es: 'necesitar' },
  { id: 22, en: 'to feel', es: 'sentir' },
  { id: 23, en: 'to become', es: 'convertirse/llegar a ser' },
  { id: 24, en: 'to leave', es: 'salir/dejar' },
  { id: 25, en: 'to put', es: 'poner' },
  { id: 26, en: 'to mean', es: 'significar' },
  { id: 27, en: 'to keep', es: 'guardar/mantener' },
  { id: 28, en: 'to let', es: 'permitir/dejar' },
  { id: 29, en: 'to begin', es: 'empezar' },
  { id: 30, en: 'to seem', es: 'parecer' },
  { id: 31, en: 'to help', es: 'ayudar' },
  { id: 32, en: 'to talk', es: 'hablar' },
  { id: 33, en: 'to turn', es: 'girar/convertir' },
  { id: 34, en: 'to start', es: 'comenzar/empezar' },
  { id: 35, en: 'to show', es: 'mostrar' },
  { id: 36, en: 'to hear', es: 'oír' },
  { id: 37, en: 'to play', es: 'jugar/tocar' },
  { id: 38, en: 'to run', es: 'correr' },
  { id: 39, en: 'to move', es: 'mover' },
  { id: 40, en: 'to like', es: 'gustar' },
  { id: 41, en: 'to live', es: 'vivir' },
  { id: 42, en: 'to believe', es: 'creer' },
  { id: 43, en: 'to hold', es: 'sostener/mantener' },
  { id: 44, en: 'to bring', es: 'traer' },
  { id: 45, en: 'to happen', es: 'suceder/ocurrir' },
  { id: 46, en: 'to write', es: 'escribir' },
  { id: 47, en: 'to provide', es: 'proporcionar' },
  { id: 48, en: 'to sit', es: 'sentarse' },
  { id: 49, en: 'to stand', es: 'estar de pie' },
  { id: 50, en: 'to lose', es: 'perder' },
  { id: 51, en: 'to pay', es: 'pagar' },
  { id: 52, en: 'to meet', es: 'conocer/reunirse' },
  { id: 53, en: 'to include', es: 'incluir' },
  { id: 54, en: 'to continue', es: 'continuar' },
  { id: 55, en: 'to set', es: 'establecer/poner' },
  { id: 56, en: 'to learn', es: 'aprender' },
  { id: 57, en: 'to change', es: 'cambiar' },
  { id: 58, en: 'to lead', es: 'liderar/guiar' },
  { id: 59, en: 'to understand', es: 'entender/comprender' },
  { id: 60, en: 'to watch', es: 'mirar/observar' },
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
export type CardData = {
    id: string; // Unique ID for the card instance (e.g., "en-1", "es-1")
    pairId: number; // ID linking the English and Spanish pair
    language: 'en' | 'es';
    verb: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export function generateGameBoard(difficulty: 'easy' | 'medium' | 'hard'): CardData[] {
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

  // Select the required number of verb pairs
  const selectedPairs = shuffle(verbPairs).slice(0, numberOfPairs);

  // Create card data for both English and Spanish verbs
  const gameCards: CardData[] = [];
  selectedPairs.forEach((pair) => {
    gameCards.push({
      id: `en-${pair.id}`,
      pairId: pair.id,
      language: 'en',
      verb: pair.en,
      isFlipped: false,
      isMatched: false,
    });
    gameCards.push({
      id: `es-${pair.id}`,
      pairId: pair.id,
      language: 'es',
      verb: pair.es,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Shuffle the combined list of cards
  return shuffle(gameCards);
}

