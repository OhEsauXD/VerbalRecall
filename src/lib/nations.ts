
export type NationPair = {
  id: number;
  nation: string; // Country name
  nationality: string; // Adjective form of nationality
  countryCode: string; // ISO 3166-1 alpha-2 code for flag lookup
};

// List of nation/nationality pairs (expandable)
// Flag URLs use a common pattern, e.g., https://flagcdn.com/w160/us.png
export const nationPairs: NationPair[] = [
  { id: 291, nation: 'United States', nationality: 'American', countryCode: 'us' },
  { id: 292, nation: 'Canada', nationality: 'Canadian', countryCode: 'ca' },
  { id: 293, nation: 'Mexico', nationality: 'Mexican', countryCode: 'mx' },
  { id: 294, nation: 'Brazil', nationality: 'Brazilian', countryCode: 'br' },
  { id: 295, nation: 'Argentina', nationality: 'Argentinian', countryCode: 'ar' },
  { id: 296, nation: 'United Kingdom', nationality: 'British', countryCode: 'gb' },
  { id: 297, nation: 'France', nationality: 'French', countryCode: 'fr' },
  { id: 298, nation: 'Germany', nationality: 'German', countryCode: 'de' },
  { id: 299, nation: 'Italy', nationality: 'Italian', countryCode: 'it' },
  { id: 300, nation: 'Spain', nationality: 'Spanish', countryCode: 'es' },
  { id: 301, nation: 'Portugal', nationality: 'Portuguese', countryCode: 'pt' },
  { id: 302, nation: 'Russia', nationality: 'Russian', countryCode: 'ru' },
  { id: 303, nation: 'China', nationality: 'Chinese', countryCode: 'cn' },
  { id: 304, nation: 'Japan', nationality: 'Japanese', countryCode: 'jp' },
  { id: 305, nation: 'South Korea', nationality: 'South Korean', countryCode: 'kr' },
  { id: 306, nation: 'India', nationality: 'Indian', countryCode: 'in' },
  { id: 307, nation: 'Australia', nationality: 'Australian', countryCode: 'au' },
  { id: 308, nation: 'New Zealand', nationality: 'New Zealander', countryCode: 'nz' },
  { id: 309, nation: 'Egypt', nationality: 'Egyptian', countryCode: 'eg' },
  { id: 310, nation: 'South Africa', nationality: 'South African', countryCode: 'za' },
  { id: 311, nation: 'Nigeria', nationality: 'Nigerian', countryCode: 'ng' },
  { id: 312, nation: 'Kenya', nationality: 'Kenyan', countryCode: 'ke' },
  { id: 313, nation: 'Greece', nationality: 'Greek', countryCode: 'gr' },
  { id: 314, nation: 'Turkey', nationality: 'Turkish', countryCode: 'tr' },
  { id: 315, nation: 'Sweden', nationality: 'Swedish', countryCode: 'se' },
  { id: 316, nation: 'Norway', nationality: 'Norwegian', countryCode: 'no' },
  { id: 317, nation: 'Denmark', nationality: 'Danish', countryCode: 'dk' },
  { id: 318, nation: 'Finland', nationality: 'Finnish', countryCode: 'fi' },
  { id: 319, nation: 'Netherlands', nationality: 'Dutch', countryCode: 'nl' },
  { id: 320, nation: 'Belgium', nationality: 'Belgian', countryCode: 'be' },
  { id: 321, nation: 'Switzerland', nationality: 'Swiss', countryCode: 'ch' },
  { id: 322, nation: 'Austria', nationality: 'Austrian', countryCode: 'at' },
  { id: 323, nation: 'Ireland', nationality: 'Irish', countryCode: 'ie' },
  { id: 324, nation: 'Poland', nationality: 'Polish', countryCode: 'pl' },
  { id: 325, nation: 'Ukraine', nationality: 'Ukrainian', countryCode: 'ua' },
  { id: 326, nation: 'Chile', nationality: 'Chilean', countryCode: 'cl' },
  { id: 327, nation: 'Colombia', nationality: 'Colombian', countryCode: 'co' },
  { id: 328, nation: 'Peru', nationality: 'Peruvian', countryCode: 'pe' },
  { id: 329, nation: 'Venezuela', nationality: 'Venezuelan', countryCode: 've' },
  { id: 330, nation: 'Cuba', nationality: 'Cuban', countryCode: 'cu' },
  { id: 331, nation: 'Saudi Arabia', nationality: 'Saudi Arabian', countryCode: 'sa' },
  { id: 332, nation: 'United Arab Emirates', nationality: 'Emirati', countryCode: 'ae' },
  { id: 333, nation: 'Israel', nationality: 'Israeli', countryCode: 'il' },
  { id: 334, nation: 'Iran', nationality: 'Iranian', countryCode: 'ir' },
  { id: 335, nation: 'Iraq', nationality: 'Iraqi', countryCode: 'iq' },
  { id: 336, nation: 'Vietnam', nationality: 'Vietnamese', countryCode: 'vn' },
  { id: 337, nation: 'Thailand', nationality: 'Thai', countryCode: 'th' },
  { id: 338, nation: 'Philippines', nationality: 'Filipino', countryCode: 'ph' },
  { id: 339, nation: 'Malaysia', nationality: 'Malaysian', countryCode: 'my' },
  { id: 340, nation: 'Indonesia', nationality: 'Indonesian', countryCode: 'id' },
  { id: 341, nation: 'Singapore', nationality: 'Singaporean', countryCode: 'sg' },
  { id: 342, nation: 'Morocco', nationality: 'Moroccan', countryCode: 'ma' },
  { id: 343, nation: 'Algeria', nationality: 'Algerian', countryCode: 'dz' },
  { id: 344, nation: 'Tunisia', nationality: 'Tunisian', countryCode: 'tn' },
  { id: 345, nation: 'Libya', nationality: 'Libyan', countryCode: 'ly' },
  { id: 346, nation: 'Pakistan', nationality: 'Pakistani', countryCode: 'pk' },
  { id: 347, nation: 'Bangladesh', nationality: 'Bangladeshi', countryCode: 'bd' },
  { id: 348, nation: 'Sri Lanka', nationality: 'Sri Lankan', countryCode: 'lk' },
  { id: 349, nation: 'Nepal', nationality: 'Nepalese', countryCode: 'np' },
  { id: 350, nation: 'Bhutan', nationality: 'Bhutanese', countryCode: 'bt' },

];

// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the nations game
export type NationCardData = {
    id: string; // Unique ID for the card instance (e.g., "nation-300", "nationality-300")
    pairId: number; // ID linking the nation and nationality pair
    type: 'nation' | 'nationality'; // Type of content on the card
    nation?: string; // Country name (only for 'nation' type)
    nationality?: string; // Nationality adjective (only for 'nationality' type)
    flagUrl?: string; // URL for the nation's flag (only for 'nation' type)
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the nations game board based on difficulty
export function generateNationGameBoard(difficulty: 'easy' | 'medium' | 'hard'): NationCardData[] {
  let numberOfPairs: number;
  switch (difficulty) {
    case 'easy':
      numberOfPairs = 15;
      break;
    case 'medium':
      numberOfPairs = 30;
      break;
    case 'hard':
      // Use the actual number of available nation pairs for hard difficulty
      numberOfPairs = nationPairs.length;
      break;
    default:
      numberOfPairs = 15; // Default to easy
  }

  // Ensure numberOfPairs does not exceed the available pairs
  numberOfPairs = Math.min(numberOfPairs, nationPairs.length);

  const selectedPairs = shuffle(nationPairs).slice(0, numberOfPairs);

  const gameCards: NationCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add nation card (with flag)
    gameCards.push({
      id: `nation-${pair.id}`, // Unique prefix
      pairId: pair.id,
      type: 'nation',
      nation: pair.nation,
      flagUrl: `https://flagcdn.com/w160/${pair.countryCode}.png`, // Construct flag URL
      isFlipped: false,
      isMatched: false,
    });
    // Add nationality card (text only)
    gameCards.push({
      id: `nationality-${pair.id}`, // Unique prefix
      pairId: pair.id,
      type: 'nationality',
      nationality: pair.nationality,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}

    