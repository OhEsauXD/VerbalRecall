
export type LockItem = string;

export interface LockSubject {
  id: string; // Unique ID for the subject, e.g., "farmAnimals"
  name: string; // Display name, e.g., "Farm Animals"
  items: readonly LockItem[];
}

export const combinationLockSubjects: readonly LockSubject[] = [
  {
    id: "farmAnimals",
    name: "Farm Animals",
    items: ["cow", "pig", "sheep", "chicken", "horse", "goat", "duck", "goose", "turkey", "donkey", "llama", "alpaca", "rabbit", "rooster", "bull", "steer", "hen", "chick", "ram", "ewe", "cat", "dog"],
  },
  {
    id: "domesticAnimals",
    name: "Domestic Animals",
    items: ["dog", "cat", "hamster", "guinea pig", "rabbit", "fish", "parrot", "turtle", "ferret", "mouse", "rat", "snake", "lizard", "chinchilla", "canary", "gerbil", "iguana", "goldfish", "bearded dragon", "hermit crab"],
  },
  {
    id: "seaAnimals",
    name: "Sea Animals",
    items: ["fish", "shark", "whale", "dolphin", "octopus", "crab", "lobster", "shrimp", "squid", "jellyfish", "starfish", "seahorse", "clam", "oyster", "seal", "walrus", "sea turtle", "eel", "stingray", "coral", "pufferfish", "anglerfish"],
  },
  {
    id: "jungleAnimals",
    name: "Jungle Animals",
    items: ["monkey", "tiger", "jaguar", "snake", "parrot", "toucan", "sloth", "gorilla", "chimpanzee", "orangutan", "leopard", "anaconda", "piranha", "tree frog", "iguana", "capybara", "ocelot", "tapir", "anteater", "armadillo", "boa constrictor", "macaw"],
  },
  {
    id: "plants",
    name: "Plants (General)",
    items: ["rose", "tulip", "sunflower", "daisy", "lily", "orchid", "fern", "moss", "ivy", "cactus", "grass", "shrub", "vine", "herb", "succulent", "bonsai", "bamboo", "pitcher plant", "venus flytrap", "seaweed", "algae", "mushroom"],
  },
  {
    id: "veggies",
    name: "Vegetables",
    items: ["carrot", "broccoli", "tomato", "potato", "lettuce", "onion", "garlic", "cucumber", "bell pepper", "spinach", "corn", "pea", "bean", "cauliflower", "eggplant", "zucchini", "pumpkin", "radish", "asparagus", "cabbage", "celery", "beetroot"],
  },
  {
    id: "trees",
    name: "Trees",
    items: ["oak", "pine", "maple", "birch", "willow", "palm", "apple tree", "orange tree", "cherry tree", "sequoia", "redwood", "cedar", "fir", "spruce", "cypress", "elm", "ash", "beech", "poplar", "banyan", "baobab", "eucalyptus"],
  },
  {
    id: "healthFood",
    name: "Healthy Foods",
    items: ["apple", "banana", "broccoli", "spinach", "oats", "quinoa", "salmon", "chicken breast", "almonds", "walnuts", "yogurt", "avocado", "berries", "sweet potato", "lentils", "beans", "kale", "chia seeds", "flax seeds", "green tea", "olive oil", "tofu"],
  },
  {
    id: "junkFood",
    name: "Junk Foods",
    items: ["pizza", "burger", "fries", "hot dog", "soda", "chips", "candy bar", "ice cream", "donut", "cookie", "cake", "nachos", "popcorn", "milkshake", "fried chicken", "onion rings", "slushy", "cupcake", "gummy bears", "pretzel", "chocolate", "pastry"],
  },
  {
    id: "countries",
    name: "Countries",
    items: ["USA", "Canada", "Mexico", "Brazil", "Argentina", "UK", "France", "Germany", "Italy", "Spain", "Portugal", "Russia", "China", "Japan", "South Korea", "India", "Australia", "Egypt", "South Africa", "Nigeria", "Kenya", "Greece"],
  },
];

// Type for a single lock challenge presented to the user
export interface CombinationLockChallenge {
  id: string; // Unique ID for this specific challenge instance, e.g., "farmAnimals_lock1"
  subjectName: string; // Display name of the subject for this lock
  // The four items the user needs to guess for this specific lock.
  correctItems: readonly [LockItem, LockItem, LockItem, LockItem];
  // For each of the 4 tumblers, 5 options (1 correct, 4 distractors)
  options: {
    key1: readonly string[]; // Options for correctItems[0]
    key2: readonly string[]; // Options for correctItems[1]
    key3: readonly string[]; // Options for correctItems[2]
    key4: readonly string[]; // Options for correctItems[3]
  };
  // Index of the correct item within each options array
  correctIndices: readonly [number, number, number, number];
}

// Helper to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
