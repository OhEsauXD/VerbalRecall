
export type PastTensePair = {
  id: number;
  infinitive: string; // Base form of the verb
  past: string; // Simple past / past participle (can be the same for regular verbs)
};

// List of 60 common irregular and regular verbs with their past forms
// Note: For some irregular verbs, simple past and past participle are the same.
// For simplicity in this game, we'll use one common past form.
// For regular verbs, the simple past and past participle are the same (-ed).
export const pastTensePairs: PastTensePair[] = [
  // Irregular Verbs
  { id: 181, infinitive: 'be', past: 'was/were' }, // (been) - simplified
  { id: 182, infinitive: 'have', past: 'had' },
  { id: 183, infinitive: 'do', past: 'did' }, // (done)
  { id: 184, infinitive: 'say', past: 'said' },
  { id: 185, infinitive: 'go', past: 'went' }, // (gone)
  { id: 186, infinitive: 'get', past: 'got' }, // (got/gotten)
  { id: 187, infinitive: 'make', past: 'made' },
  { id: 188, infinitive: 'know', past: 'knew' }, // (known)
  { id: 189, infinitive: 'think', past: 'thought' },
  { id: 190, infinitive: 'see', past: 'saw' }, // (seen)
  { id: 191, infinitive: 'come', past: 'came' }, // (come)
  { id: 192, infinitive: 'take', past: 'took' }, // (taken)
  { id: 193, infinitive: 'find', past: 'found' },
  { id: 194, infinitive: 'give', past: 'gave' }, // (given)
  { id: 195, infinitive: 'tell', past: 'told' },
  { id: 196, infinitive: 'become', past: 'became' }, // (become)
  { id: 197, infinitive: 'leave', past: 'left' },
  { id: 198, infinitive: 'put', past: 'put' },
  { id: 199, infinitive: 'mean', past: 'meant' },
  { id: 200, infinitive: 'keep', past: 'kept' },
  { id: 201, infinitive: 'let', past: 'let' },
  { id: 202, infinitive: 'begin', past: 'began' }, // (begun)
  { id: 203, infinitive: 'hear', past: 'heard' },
  { id: 204, infinitive: 'run', past: 'ran' }, // (run)
  { id: 205, infinitive: 'bring', past: 'brought' },
  { id: 206, infinitive: 'write', past: 'wrote' }, // (written)
  { id: 207, infinitive: 'sit', past: 'sat' },
  { id: 208, infinitive: 'stand', past: 'stood' },
  { id: 209, infinitive: 'lose', past: 'lost' },
  { id: 210, infinitive: 'pay', past: 'paid' },
  { id: 211, infinitive: 'meet', past: 'met' },
  { id: 212, infinitive: 'set', past: 'set' },
  { id: 213, infinitive: 'learn', past: 'learnt/learned' },
  { id: 214, infinitive: 'lead', past: 'led' },
  { id: 215, infinitive: 'understand', past: 'understood' },
  { id: 216, infinitive: 'speak', past: 'spoke' }, // (spoken)
  { id: 217, infinitive: 'read', past: 'read' }, // Pronunciation changes
  { id: 218, infinitive: 'spend', past: 'spent' },
  { id: 219, infinitive: 'grow', past: 'grew' }, // (grown)
  { id: 220, infinitive: 'win', past: 'won' },
  { id: 221, infinitive: 'teach', past: 'taught' },
  { id: 222, infinitive: 'buy', past: 'bought' },
  { id: 223, infinitive: 'send', past: 'sent' },
  { id: 224, infinitive: 'build', past: 'built' },
  { id: 225, infinitive: 'fall', past: 'fell' }, // (fallen)
  { id: 226, infinitive: 'cut', past: 'cut' },
  { id: 227, infinitive: 'drive', past: 'drove' }, // (driven)
  { id: 228, infinitive: 'eat', past: 'ate' }, // (eaten)
  { id: 229, infinitive: 'drink', past: 'drank' }, // (drunk)
  { id: 230, infinitive: 'sleep', past: 'slept' },

  // Regular Verbs (added for variety, all end in -ed)
  { id: 231, infinitive: 'walk', past: 'walked' },
  { id: 232, infinitive: 'talk', past: 'talked' },
  { id: 233, infinitive: 'play', past: 'played' },
  { id: 234, infinitive: 'work', past: 'worked' },
  { id: 235, infinitive: 'start', past: 'started' },
  { id: 236, infinitive: 'help', past: 'helped' },
  { id: 237, infinitive: 'use', past: 'used' },
  { id: 238, infinitive: 'want', past: 'wanted' },
  { id: 239, infinitive: 'look', past: 'looked' },
  { id: 240, infinitive: 'ask', past: 'asked' },
];

// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the past tense game
export type PastTenseCardData = {
    id: string; // Unique ID for the card instance (e.g., "infinitive-181", "past-181")
    pairId: number; // ID linking the infinitive and past form pair
    tense: 'infinitive' | 'past'; // Type of verb form on the card
    text: string; // The verb form itself
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the past tense game board based on difficulty
export function generatePastTenseGameBoard(difficulty: 'easy' | 'medium' | 'hard'): PastTenseCardData[] {
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

  const selectedPairs = shuffle(pastTensePairs).slice(0, numberOfPairs);

  const gameCards: PastTenseCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add infinitive card
    gameCards.push({
      id: `infinitive-${pair.id}`, // Unique prefix
      pairId: pair.id,
      tense: 'infinitive',
      text: pair.infinitive,
      isFlipped: false,
      isMatched: false,
    });
    // Add past tense card
    gameCards.push({
      id: `past-${pair.id}`, // Unique prefix
      pairId: pair.id,
      tense: 'past',
      text: pair.past,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
