import { CardType } from '@/components/GameCard';

export type TransportBuildingPair = {
  id: number;
  en: string;
  es: string;
  type: 'transport' | 'building'; // Categorize the item
  imageHint: string; // Hint for Unsplash search
};

// Combined list of 60 transport/buildings pairs
export const transportBuildingPairs: TransportBuildingPair[] = [
  // Transport (30)
  { id: 121, en: 'Car', es: 'Coche/Carro', type: 'transport', imageHint: 'car vehicle' },
  { id: 122, en: 'Bus', es: 'Autobús', type: 'transport', imageHint: 'bus vehicle' },
  { id: 123, en: 'Bicycle', es: 'Bicicleta', type: 'transport', imageHint: 'bicycle cycle' },
  { id: 124, en: 'Motorcycle', es: 'Motocicleta', type: 'transport', imageHint: 'motorcycle vehicle' },
  { id: 125, en: 'Train', es: 'Tren', type: 'transport', imageHint: 'train rail' },
  { id: 126, en: 'Airplane', es: 'Avión', type: 'transport', imageHint: 'airplane sky' },
  { id: 127, en: 'Boat', es: 'Barco', type: 'transport', imageHint: 'boat water' },
  { id: 128, en: 'Ship', es: 'Barco/Nave', type: 'transport', imageHint: 'ship large' },
  { id: 129, en: 'Subway', es: 'Metro', type: 'transport', imageHint: 'subway underground' },
  { id: 130, en: 'Tram', es: 'Tranvía', type: 'transport', imageHint: 'tram city' },
  { id: 131, en: 'Truck', es: 'Camión', type: 'transport', imageHint: 'truck vehicle' },
  { id: 132, en: 'Van', es: 'Furgoneta', type: 'transport', imageHint: 'van vehicle' },
  { id: 133, en: 'Taxi', es: 'Taxi', type: 'transport', imageHint: 'taxi car' },
  { id: 134, en: 'Helicopter', es: 'Helicóptero', type: 'transport', imageHint: 'helicopter flying' },
  { id: 135, en: 'Rocket', es: 'Cohete', type: 'transport', imageHint: 'rocket space' },
  { id: 136, en: 'Scooter', es: 'Patinete/Scooter', type: 'transport', imageHint: 'scooter electric' },
  { id: 137, en: 'Skateboard', es: 'Monopatín', type: 'transport', imageHint: 'skateboard sport' },
  { id: 138, en: 'Ferry', es: 'Ferry', type: 'transport', imageHint: 'ferry water' },
  { id: 139, en: 'Canoe', es: 'Canoa', type: 'transport', imageHint: 'canoe boat' },
  { id: 140, en: 'Kayak', es: 'Kayak', type: 'transport', imageHint: 'kayak boat' },
  { id: 141, en: 'Hot Air Balloon', es: 'Globo Aerostático', type: 'transport', imageHint: 'hot air balloon' },
  { id: 142, en: 'Cable Car', es: 'Teleférico', type: 'transport', imageHint: 'cable car' },
  { id: 143, en: 'Ambulance', es: 'Ambulancia', type: 'transport', imageHint: 'ambulance emergency' },
  { id: 144, en: 'Fire Truck', es: 'Camión de Bomberos', type: 'transport', imageHint: 'fire truck' },
  { id: 145, en: 'Police Car', es: 'Coche de Policía', type: 'transport', imageHint: 'police car' },
  { id: 146, en: 'Tractor', es: 'Tractor', type: 'transport', imageHint: 'tractor farm' },
  { id: 147, en: 'Golf Cart', es: 'Carrito de Golf', type: 'transport', imageHint: 'golf cart' },
  { id: 148, en: 'Forklift', es: 'Carretilla Elevadora', type: 'transport', imageHint: 'forklift warehouse' },
  { id: 149, en: 'Segway', es: 'Segway', type: 'transport', imageHint: 'segway electric' },
  { id: 150, en: 'Wheelchair', es: 'Silla de Ruedas', type: 'transport', imageHint: 'wheelchair accessibility' },

  // Buildings (30)
  { id: 151, en: 'House', es: 'Casa', type: 'building', imageHint: 'house home' },
  { id: 152, en: 'Apartment', es: 'Apartamento', type: 'building', imageHint: 'apartment building' },
  { id: 153, en: 'School', es: 'Escuela', type: 'building', imageHint: 'school education' },
  { id: 154, en: 'Hospital', es: 'Hospital', type: 'building', imageHint: 'hospital medical' },
  { id: 155, en: 'Library', es: 'Biblioteca', type: 'building', imageHint: 'library books' },
  { id: 156, en: 'Museum', es: 'Museo', type: 'building', imageHint: 'museum art' },
  { id: 157, en: 'Church', es: 'Iglesia', type: 'building', imageHint: 'church religion' },
  { id: 158, en: 'Mosque', es: 'Mezquita', type: 'building', imageHint: 'mosque religion' },
  { id: 159, en: 'Synagogue', es: 'Sinagoga', type: 'building', imageHint: 'synagogue religion' },
  { id: 160, en: 'Temple', es: 'Templo', type: 'building', imageHint: 'temple religion' },
  { id: 161, en: 'Castle', es: 'Castillo', type: 'building', imageHint: 'castle historic' },
  { id: 162, en: 'Palace', es: 'Palacio', type: 'building', imageHint: 'palace royal' },
  { id: 163, en: 'Office Building', es: 'Edificio de Oficinas', type: 'building', imageHint: 'office skyscraper' },
  { id: 164, en: 'Skyscraper', es: 'Rascacielos', type: 'building', imageHint: 'skyscraper city' },
  { id: 165, en: 'Factory', es: 'Fábrica', type: 'building', imageHint: 'factory industrial' },
  { id: 166, en: 'Warehouse', es: 'Almacén', type: 'building', imageHint: 'warehouse storage' },
  { id: 167, en: 'Store', es: 'Tienda', type: 'building', imageHint: 'store shopping' },
  { id: 168, en: 'Supermarket', es: 'Supermercado', type: 'building', imageHint: 'supermarket grocery' },
  { id: 169, en: 'Restaurant', es: 'Restaurante', type: 'building', imageHint: 'restaurant food' },
  { id: 170, en: 'Cafe', es: 'Cafetería', type: 'building', imageHint: 'cafe coffee' },
  { id: 171, en: 'Bank', es: 'Banco', type: 'building', imageHint: 'bank money' },
  { id: 172, en: 'Post Office', es: 'Oficina de Correos', type: 'building', imageHint: 'post office' },
  { id: 173, en: 'Police Station', es: 'Comisaría', type: 'building', imageHint: 'police station' },
  { id: 174, en: 'Fire Station', es: 'Estación de Bomberos', type: 'building', imageHint: 'fire station' },
  { id: 175, en: 'Airport', es: 'Aeropuerto', type: 'building', imageHint: 'airport travel' },
  { id: 176, en: 'Train Station', es: 'Estación de Tren', type: 'building', imageHint: 'train station' },
  { id: 177, en: 'Bus Station', es: 'Estación de Autobuses', type: 'building', imageHint: 'bus station' },
  { id: 178, en: 'Stadium', es: 'Estadio', type: 'building', imageHint: 'stadium sports' },
  { id: 179, en: 'Theater', es: 'Teatro', type: 'building', imageHint: 'theater stage' },
  { id: 180, en: 'Cinema', es: 'Cine', type: 'building', imageHint: 'cinema movie' },
];

// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Type for the card data used in the transport/buildings game
export type TransportBuildingCardData = {
    id: string; // Unique ID for the card instance (e.g., "name-en-121", "image-121")
    pairId: number; // ID linking the name and image pair
 type: Extract<CardType, 'name' | 'image'>; // Use CardType and specifically allow 'name' and 'image'
    language: 'en' | 'es'; // 'en' for name, 'es' for image (representing the Spanish name association)
    type: 'name' | 'image'; // Explicitly define the card type
    name?: string; // Item name (only for 'name' type)
    spanishName?: string; // Spanish name (only for 'image' type)
    imageUrl?: string; // Placeholder image URL (only for 'image' type)
    dataAiHint?: string; // AI hint for image search
    isFlipped: boolean;
    isMatched: boolean;
}

// Function to generate the transport/buildings game board based on difficulty
export function generateTransportBuildingGameBoard(difficulty: 'easy' | 'medium' | 'hard'): TransportBuildingCardData[] {
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

  const selectedPairs = shuffle(transportBuildingPairs).slice(0, numberOfPairs);

  const gameCards: TransportBuildingCardData[] = [];
  selectedPairs.forEach((pair) => {
    // Add name card (English only)
    gameCards.push({
      id: `tb-name-${pair.id}`, // Prefix to avoid ID collision
      pairId: pair.id,
      language: 'en', // English name card
      type: 'name' as const, // Use 'as const' for literal type inference
      name: pair.en, // Use only English name
      isFlipped: false,
      isMatched: false,
    });
    // Add image card (Associated with Spanish name)
    gameCards.push({
      id: `tb-image-${pair.id}`, // Prefix to avoid ID collision
      pairId: pair.id,
      language: 'es', // Associate image card with Spanish name
      type: 'image' as const, // Use 'as const' for literal type inference
      spanishName: pair.es, // Add the Spanish name here
      // Use Picsum for placeholder images initially
      imageUrl: `https://picsum.photos/seed/${pair.id + 300}/100/100`, // Further offset seed
      dataAiHint: pair.imageHint, // Store the hint
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffle(gameCards);
}
