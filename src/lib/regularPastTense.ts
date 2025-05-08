
export type RegularPastTensePair = {
  id: number;
  infinitive: string; // Base form of the verb
  past: string; // Simple past / past participle (always ends in -ed for regular)
};

// List of 60 common regular verbs with their past forms
export const regularPastTensePairs: RegularPastTensePair[] = [
  { id: 231, infinitive: 'walk', past: 'walked' },
  { id: 232, infinitive: 'talk', past: 'talked' },
  { id: 233, infinitive: 'play', past: 'played' },
  { id: 234, infinitive: 'work', past: 'worked' },
  { id: 235, infinitive: 'study', past: 'studied' },
  { id: 236, infinitive: 'ask', past: 'asked' },
  { id: 237, infinitive: 'need', past: 'needed' },
  { id: 238, infinitive: 'want', past: 'wanted' },
  { id: 239, infinitive: 'look', past: 'looked' },
  { id: 240, infinitive: 'use', past: 'used' },
  { id: 241, infinitive: 'call', past: 'called' },
  { id: 242, infinitive: 'try', past: 'tried' },
  { id: 243, infinitive: 'help', past: 'helped' },
  { id: 244, infinitive: 'start', past: 'started' },
  { id: 245, infinitive: 'move', past: 'moved' },
  { id: 246, infinitive: 'live', past: 'lived' },
  { id: 247, infinitive: 'believe', past: 'believed' },
  { id: 248, infinitive: 'happen', past: 'happened' },
  { id: 249, infinitive: 'provide', past: 'provided' },
  { id: 250, infinitive: 'include', past: 'included' },
  { id: 251, infinitive: 'continue', past: 'continued' },
  { id: 252, infinitive: 'change', past: 'changed' },
  { id: 253, infinitive: 'watch', past: 'watched' },
  { id: 254, infinitive: 'follow', past: 'followed' },
  { id: 255, infinitive: 'stop', past: 'stopped' },
  { id: 256, infinitive: 'create', past: 'created' },
  { id: 257, infinitive: 'open', past: 'opened' },
  { id: 258, infinitive: 'seem', past: 'seemed' },
  { id: 259, infinitive: 'add', past: 'added' },
  { id: 260, infinitive: 'remember', past: 'remembered' },
  { id: 261, infinitive: 'love', past: 'loved' },
  { id: 262, infinitive: 'consider', past: 'considered' },
  { id: 263, infinitive: 'appear', past: 'appeared' },
  { id: 264, infinitive: 'wait', past: 'waited' },
  { id: 265, infinitive: 'serve', past: 'served' },
  { id: 266, infinitive: 'die', past: 'died' },
  { id: 267, infinitive: 'expect', past: 'expected' },
  { id: 268, infinitive: 'stay', past: 'stayed' },
  { id: 269, infinitive: 'reach', past: 'reached' },
  { id: 270, infinitive: 'kill', past: 'killed' },
  { id: 271, infinitive: 'remain', past: 'remained' },
  { id: 272, infinitive: 'suggest', past: 'suggested' },
  { id: 273, infinitive: 'raise', past: 'raised' },
  { id: 274, infinitive: 'pass', past: 'passed' },
  { id: 275, infinitive: 'require', past: 'required' },
  { id: 276, infinitive: 'report', past: 'reported' },
  { id: 277, infinitive: 'decide', past: 'decided' },
  { id: 278, infinitive: 'pull', past: 'pulled' },
  { id: 279, infinitive: 'return', past: 'returned' },
  { id: 280, infinitive: 'explain', past: 'explained' },
  { id: 281, infinitive: 'hope', past: 'hoped' },
  { id: 282, infinitive: 'develop', past: 'developed' },
  { id: 283, infinitive: 'carry', past: 'carried' },
  { id: 284, infinitive: 'thank', past: 'thanked' },
  { id: 285, infinitive: 'receive', past: 'received' },
  { id: 286, infinitive: 'join', past: 'joined' },
  { id: 287, infinitive: 'agree', past: 'agreed' },
  { id: 288, infinitive: 'pick', past: 'picked' },
  { id: 289, infinitive: 'support', past: 'supported' },
  { id: 290, infinitive: 'end', past: 'ended' },
];


// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the regular past tense game
export type RegularPastTenseCardData = {
    id: string; // Unique ID for the card instance (e.g., "reg-infinitive-231", "reg-past-231")
    pairId: number; // ID linking the infinitive and past form pair
    tense: 'infinitive' | 'past'; // Type of verb form on the card
    text: string; // The verb form itself
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the regular past tense game board based on difficulty
export function generateRegularPastTenseGameBoard(difficulty: 'easy' | 'medium' | 'hard'): RegularPastTenseCardData[] {
  let numberOfPairs: number;
  switch (difficulty) {
    case 'easy':
      numberOfPairs = 15;
      break;
    case 'medium':
      numberOfPairs = 30;
      break;
    case 'hard':
       // Use the actual number of available regular verb pairs for hard difficulty
      numberOfPairs = regularPastTensePairs.length;
      break;
    default:
      numberOfPairs = 15; // Default to easy
  }

  // Ensure numberOfPairs does not exceed the available pairs
  numberOfPairs = Math.min(numberOfPairs, regularPastTensePairs.length);

  const selectedPairs = shuffle(regularPastTensePairs).slice(0, numberOfPairs);

  const gameCards: RegularPastTenseCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add infinitive card
    gameCards.push({
      id: `reg-infinitive-${pair.id}`, // Unique prefix
      pairId: pair.id,
      tense: 'infinitive',
      text: pair.infinitive,
      isFlipped: false,
      isMatched: false,
    });
    // Add past tense card
    gameCards.push({
      id: `reg-past-${pair.id}`, // Unique prefix
      pairId: pair.id,
      tense: 'past',
      text: pair.past,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
