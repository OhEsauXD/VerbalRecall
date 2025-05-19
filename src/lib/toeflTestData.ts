
export interface ToeflQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface ToeflQuestion {
  id: string;
  questionText: string;
  options: ToeflQuestionOption[];
  explanation: string; // Will now be in Spanish, brief, and for the correct answer.
}

export interface ToeflReadingSectionData {
  id: number; // 1-5
  title: string;
  topic: string;
  passage: string;
  questions: ToeflQuestion[];
}

export const toeflTestSections: ToeflReadingSectionData[] = [
  {
    id: 1,
    title: "Sección 1: Comprensión Lectora",
    topic: "La Cordillera del Himalaya",
    passage: `The Himalayas, a vast mountain range in Asia, separate the plains of the Indian subcontinent from the Tibetan Plateau. This colossal range is home to some of the planet's highest peaks, including Mount Everest. Formed by the collision of the Indian-Australian plate with the Eurasian plate, the Himalayas are geologically young and still rising. This ongoing tectonic activity makes the region prone to earthquakes.
The range spans across five countries: Bhutan, India, Nepal, China, and Pakistan. It is the source of several major river systems, such as the Indus, Ganges, and Brahmaputra, which provide water for billions of people. The diverse ecosystems of the Himalayas vary with altitude, from subtropical forests at the base to alpine tundra and permanent ice and snow at the highest elevations. This biodiversity includes many unique species of flora and fauna, some of which are endangered.
The Himalayas have also played a significant role in shaping the cultures of South Asia and Tibet. They are considered sacred in Hinduism and Buddhism, with numerous monasteries and pilgrimage sites nestled in their valleys. The formidable terrain has historically acted as a natural barrier, influencing migration patterns and trade routes for centuries. Climate change poses a significant threat to the Himalayan glaciers, which are receding at an alarming rate, potentially impacting water resources and increasing risks of glacial lake outburst floods.`,
    questions: [
      {
        id: "1-1",
        questionText: "What is the primary geological process responsible for the formation of the Himalayas?",
        options: [
          { text: "Volcanic eruptions", isCorrect: false },
          { text: "Erosion by rivers", isCorrect: false },
          { text: "Collision of tectonic plates", isCorrect: true },
          { text: "Glacial movements", isCorrect: false },
        ],
        explanation: "El pasaje indica que las Himalayas se formaron por la 'colisión de la placa Indo-Australiana con la placa Euroasiática', siendo esta la causa geológica principal.",
      },
      {
        id: "1-2",
        questionText: "Which of the following is NOT mentioned as a country the Himalayas span across?",
        options: [
          { text: "Nepal", isCorrect: false },
          { text: "Bangladesh", isCorrect: true },
          { text: "India", isCorrect: false },
          { text: "China", isCorrect: false },
        ],
        explanation: "El texto menciona que la cordillera atraviesa Bután, India, Nepal, China y Pakistán. Bangladesh no está en esta lista.",
      },
      {
        id: "1-3",
        questionText: "The Himalayan ecosystems are described as:",
        options: [
          { text: "Uniform across all altitudes", isCorrect: false },
          { text: "Primarily desert-like", isCorrect: false },
          { text: "Diverse and varying with altitude", isCorrect: true },
          { text: "Mainly man-made forests", isCorrect: false },
        ],
        explanation: "El pasaje describe los ecosistemas como 'diversos' y que 'varían con la altitud', mostrando una heterogeneidad ecológica.",
      },
      {
        id: "1-4",
        questionText: "What is a significant threat to Himalayan glaciers mentioned in the passage?",
        options: [
          { text: "Over-tourism", isCorrect: false },
          { text: "Deforestation", isCorrect: false },
          { text: "Industrial pollution", isCorrect: false },
          { text: "Climate change", isCorrect: true },
        ],
        explanation: "El cambio climático es señalado como una 'amenaza significativa' para los glaciares del Himalaya, causando su retroceso.",
      },
      {
        id: "1-5",
        questionText: "The Himalayas are culturally significant primarily in which religions?",
        options: [
          { text: "Christianity and Islam", isCorrect: false },
          { text: "Hinduism and Buddhism", isCorrect: true },
          { text: "Judaism and Sikhism", isCorrect: false },
          { text: "Shintoism and Taoism", isCorrect: false },
        ],
        explanation: "Se menciona que la cordillera es 'considerada sagrada en el Hinduismo y el Budismo', destacando su importancia en estas religiones.",
      },
    ],
  },
  {
    id: 2,
    title: "Sección 2: Comprensión Lectora",
    topic: "Las Propiedades Medicinales del Aloe Vera",
    passage: `Aloe vera, a succulent plant species of the genus Aloe, has been renowned for its medicinal properties for thousands of years. Native to the Arabian Peninsula, it is now cultivated worldwide. The plant's thick, fleshy leaves contain a gel-like substance rich in vitamins, minerals, amino acids, and antioxidants. This gel is widely used in traditional and modern medicine, as well as in the cosmetic industry.
Historically, aloe vera was used by ancient civilizations, including the Egyptians, Greeks, and Romans, to treat wounds, burns, and skin ailments. Its anti-inflammatory and antimicrobial properties help soothe irritated skin and promote healing. Studies have shown that aloe vera can accelerate the healing of first and second-degree burns more effectively than some conventional medications.
Internally, aloe vera juice is sometimes consumed for its purported benefits in aiding digestion and boosting the immune system. However, the scientific evidence for these internal uses is less robust, and consumption of certain parts of the aloe plant can have laxative effects or interact with medications.
In cosmetics, aloe vera is a common ingredient in lotions, creams, and sunscreens due to its moisturizing and soothing effects. It helps hydrate the skin, reduce redness, and alleviate conditions like eczema and psoriasis. While generally considered safe for topical use, some individuals may experience allergic reactions. It's always advisable to do a patch test before applying aloe vera products extensively. Further research continues to explore the full potential of this versatile plant.`,
    questions: [
      {
        id: "2-1",
        questionText: "Where is Aloe vera originally native to?",
        options: [
          { text: "South America", isCorrect: false },
          { text: "The Arabian Peninsula", isCorrect: true },
          { text: "Southeast Asia", isCorrect: false },
          { text: "Sub-Saharan Africa", isCorrect: false },
        ],
        explanation: "El pasaje establece que el aloe vera es 'Nativo de la Península Arábiga'.",
      },
      {
        id: "2-2",
        questionText: "What part of the Aloe vera plant contains the medicinally rich gel?",
        options: [
          { text: "The roots", isCorrect: false },
          { text: "The flowers", isCorrect: false },
          { text: "The thick, fleshy leaves", isCorrect: true },
          { text: "The seeds", isCorrect: false },
        ],
        explanation: "Se indica que 'Las gruesas y carnosas hojas de la planta contienen una sustancia gelatinosa' rica en componentes medicinales.",
      },
      {
        id: "2-3",
        questionText: "Which property of Aloe vera helps in treating burns and skin irritations?",
        options: [
          { text: "Its vibrant color", isCorrect: false },
          { text: "Its high sugar content", isCorrect: false },
          { text: "Its anti-inflammatory and antimicrobial properties", isCorrect: true },
          { text: "Its ability to grow in arid climates", isCorrect: false },
        ],
        explanation: "Las 'propiedades antiinflamatorias y antimicrobianas' del aloe vera son las que ayudan a calmar la piel irritada y promover la curación.",
      },
      {
        id: "2-4",
        questionText: "What caution is advised regarding the internal consumption of Aloe vera?",
        options: [
          { text: "It is always completely safe.", isCorrect: false },
          { text: "It can have laxative effects or interact with medications.", isCorrect: true },
          { text: "It primarily boosts energy levels.", isCorrect: false },
          { text: "It is only effective when cooked.", isCorrect: false },
        ],
        explanation: "El texto advierte que el consumo interno 'puede tener efectos laxantes o interactuar con medicamentos'.",
      },
      {
        id: "2-5",
        questionText: "Why is a patch test recommended before extensive topical use of Aloe vera products?",
        options: [
          { text: "To enhance its effectiveness", isCorrect: false },
          { text: "Because it can stain clothing", isCorrect: false },
          { text: "Because some individuals may experience allergic reactions", isCorrect: true },
          { text: "To ensure the product is fresh", isCorrect: false },
        ],
        explanation: "Se recomienda una prueba de parche porque 'algunas personas pueden experimentar reacciones alérgicas'.",
      },
    ],
  },
  {
    id: 3,
    title: "Sección 3: Comprensión Lectora",
    topic: "Patrones de Migración de las Ballenas",
    passage: `Whale migration is one of the most remarkable phenomena in the animal kingdom, involving vast journeys across oceans. Many whale species, particularly baleen whales like humpbacks and gray whales, undertake seasonal migrations between feeding grounds in cold, polar waters and breeding grounds in warmer, tropical waters. These migrations can cover thousands of kilometers, making them some of the longest of any mammal.
The primary driver for these migrations is resource availability and reproductive needs. Polar waters are rich in krill and small fish during the summer months, providing abundant food for whales to build up blubber reserves. However, these cold waters are not ideal for newborn calves, which lack the thick blubber layer needed for insulation. Consequently, pregnant females travel to warmer waters to give birth, where calves can survive and grow more easily.
Whales navigate these extensive routes using a variety of cues, believed to include the Earth's magnetic field, an innate sense of direction, celestial navigation (using the sun and stars), and possibly by following underwater geographical features. The exact mechanisms are still a subject of ongoing research. These journeys are perilous, exposing whales to threats such as predation by orcas, entanglement in fishing gear, and vessel strikes.
Conservation efforts are crucial for protecting whale migration routes, known as migratory corridors. Understanding these patterns helps in implementing measures like adjusting shipping lanes or regulating fishing activities in critical areas. Climate change is also impacting migration by altering water temperatures and food distribution, potentially disrupting these ancient and vital journeys.`,
    questions: [
      {
        id: "3-1",
        questionText: "Why do many whale species migrate to warmer waters?",
        options: [
          { text: "To find more abundant food sources", isCorrect: false },
          { text: "To escape predators found in cold waters", isCorrect: false },
          { text: "For breeding and for newborn calves to survive", isCorrect: true },
          { text: "To follow ocean currents more easily", isCorrect: false },
        ],
        explanation: "Las ballenas migran a aguas más cálidas 'para dar a luz, donde los ballenatos pueden sobrevivir y crecer más fácilmente', lo cual es crucial para la reproducción.",
      },
      {
        id: "3-2",
        questionText: "Which of these is mentioned as a primary food source for whales in polar waters?",
        options: [
          { text: "Seaweed", isCorrect: false },
          { text: "Krill and small fish", isCorrect: true },
          { text: "Plankton only", isCorrect: false },
          { text: "Larger marine mammals", isCorrect: false },
        ],
        explanation: "El pasaje indica que 'Las aguas polares son ricas en krill y peces pequeños', siendo estas sus fuentes de alimento principales allí.",
      },
      {
        id: "3-3",
        questionText: "Which of the following is NOT mentioned as a potential navigation cue for whales?",
        options: [
          { text: "Earth's magnetic field", isCorrect: false },
          { text: "Sonar signals from other whales", isCorrect: true },
          { text: "Celestial navigation", isCorrect: false },
          { text: "Underwater geographical features", isCorrect: false },
        ],
        explanation: "El texto menciona el campo magnético terrestre, la navegación celestial y características geográficas submarinas como señales de navegación, pero no las señales de sónar de otras ballenas.",
      },
      {
        id: "3-4",
        questionText: "What is a 'migratory corridor' in the context of whales?",
        options: [
          { text: "A type of whale food", isCorrect: false },
          { text: "A specific breeding ground", isCorrect: false },
          { text: "The routes whales follow during migration", isCorrect: true },
          { text: "A period of rest during migration", isCorrect: false },
        ],
        explanation: "Un 'corredor migratorio' se define en el pasaje como 'las rutas que las ballenas siguen durante la migración'.",
      },
      {
        id: "3-5",
        questionText: "How is climate change mentioned to be impacting whale migration?",
        options: [
          { text: "By making navigation easier", isCorrect: false },
          { text: "By increasing the number of predators", isCorrect: false },
          { text: "By altering water temperatures and food distribution", isCorrect: true },
          { text: "By strengthening ocean currents", isCorrect: false },
        ],
        explanation: "Se explica que el cambio climático impacta la migración 'alterando las temperaturas del agua y la distribución de alimentos'.",
      },
    ],
  },
  {
    id: 4,
    title: "Sección 4: Comprensión Lectora",
    topic: "La Gran Muralla China: Una Maravilla Histórica",
    passage: `The Great Wall of China is an immense series of fortifications built across the historical northern borders of ancient Chinese states and Imperial China as protection against various migratory groups from the Eurasian Steppe. Several walls were built from as early as the 7th century BC, with selective stretches later joined together by Qin Shi Huang (220–206 BC), the first Emperor of China. Little of that wall remains. Later on, many successive dynasties built and maintained multiple stretches of border walls. The most well-known sections of the wall were built by the Ming dynasty (1368–1644).
The primary purpose of the Great Wall was not just military defense but also border control, allowing the imposition of duties on goods transported along the Silk Road, regulation or encouragement of trade, and the control of immigration and emigration. The construction of the Wall was a monumental undertaking, utilizing materials ranging from stone and brick to tamped earth and wood, depending on the terrain and available resources. Millions of laborers, including soldiers, convicts, and commoners, were conscripted for its construction, and many perished under harsh conditions.
Contrary to popular myth, the Great Wall is not a single continuous structure but a network of walls and fortifications. Its total length, including all its branches, is estimated to be over 21,000 kilometers. While it served as a formidable barrier, it was not impenetrable and was breached on several occasions. Today, the Great Wall is a powerful symbol of Chinese strength and endurance, a major tourist attraction, and a UNESCO World Heritage site. However, sections of the wall are deteriorating due to natural erosion and human activity, prompting ongoing preservation efforts.`,
    questions: [
      {
        id: "4-1",
        questionText: "Who is credited with joining together selective stretches of earlier walls to form a more unified Great Wall?",
        options: [
          { text: "Confucius", isCorrect: false },
          { text: "Genghis Khan", isCorrect: false },
          { text: "Qin Shi Huang", isCorrect: true },
          { text: "Emperor Wu of Han", isCorrect: false },
        ],
        explanation: "Qin Shi Huang, el primer Emperador de China, es acreditado por 'unir tramos selectivos' de murallas anteriores.",
      },
      {
        id: "4-2",
        questionText: "Which dynasty is responsible for building the most well-known sections of the Great Wall today?",
        options: [
          { text: "Han Dynasty", isCorrect: false },
          { text: "Tang Dynasty", isCorrect: false },
          { text: "Ming Dynasty", isCorrect: true },
          { text: "Song Dynasty", isCorrect: false },
        ],
        explanation: "Las secciones más famosas de la muralla que se conocen hoy fueron construidas por 'la dinastía Ming'.",
      },
      {
        id: "4-3",
        questionText: "Besides military defense, what was another significant purpose of the Great Wall?",
        options: [
          { text: "Astronomical observation", isCorrect: false },
          { text: "Religious pilgrimages", isCorrect: false },
          { text: "Border control and trade regulation", isCorrect: true },
          { text: "Agricultural irrigation systems", isCorrect: false },
        ],
        explanation: "Además de la defensa, la Gran Muralla servía para 'el control fronterizo, permitiendo la imposición de aranceles... y la regulación del comercio'.",
      },
      {
        id: "4-4",
        questionText: "Which statement about the construction of the Great Wall is true according to the passage?",
        options: [
          { text: "It was built entirely by volunteer workers.", isCorrect: false },
          { text: "Only stone was used in its construction.", isCorrect: false },
          { text: "It was built quickly with minimal casualties.", isCorrect: false },
          { text: "Millions of laborers were conscripted, and many died.", isCorrect: true },
        ],
        explanation: "El pasaje afirma que 'Millones de trabajadores... fueron reclutados para su construcción, y muchos perecieron'.",
      },
      {
        id: "4-5",
        questionText: "What is a current challenge facing the Great Wall?",
        options: [
          { text: "Overgrowth of vegetation", isCorrect: false },
          { text: "Deterioration due to erosion and human activity", isCorrect: true },
          { text: "Lack of tourist interest", isCorrect: false },
          { text: "Government plans to dismantle it", isCorrect: false },
        ],
        explanation: "Actualmente, 'secciones de la muralla se están deteriorando debido a la erosión natural y la actividad humana'.",
      },
    ],
  },
  {
    id: 5,
    title: "Sección 5: Comprensión Lectora",
    topic: "Ecosistemas de Tundra y Clima",
    passage: `The tundra is a vast, treeless biome characterized by low temperatures, short growing seasons, and limited precipitation. It is primarily found in the high latitudes of the Arctic and on mountaintops (alpine tundra). A defining feature of Arctic tundra is permafrost, a layer of permanently frozen subsoil. This frozen ground restricts drainage and limits the depth to which plant roots can penetrate, shaping the vegetation that can survive.
Tundra vegetation consists mainly of low-growing plants such as mosses, lichens, sedges, grasses, and dwarf shrubs. These plants are adapted to withstand harsh conditions, including strong winds, nutrient-poor soil, and a short period for growth and reproduction. Animals in the tundra, like caribou, Arctic foxes, snowy owls, and lemmings, have also developed specific adaptations to survive the extreme cold and scarce food resources, such as thick fur or feathers, and hibernation or migration strategies.
Tundra ecosystems are highly sensitive to climate change. Rising global temperatures are causing permafrost to thaw, which has several consequences. Thawing permafrost can release large amounts of greenhouse gases (carbon dioxide and methane) trapped in the frozen organic matter, further accelerating global warming. It also leads to changes in the landscape, such as the formation of thermokarst (uneven ground caused by thawing ice) and can damage infrastructure built on previously stable frozen ground.
The warming climate is also allowing taller shrubs and even some trees to encroach on tundra areas, a phenomenon known as 'shrubification.' This can alter the habitat for native tundra species and affect the overall ecosystem dynamics, including changes in albedo (the amount of sunlight reflected by the surface).`,
    questions: [
      {
        id: "5-1",
        questionText: "What is permafrost?",
        options: [
          { text: "A type of tundra animal", isCorrect: false },
          { text: "A layer of permanently frozen subsoil", isCorrect: true },
          { text: "The short summer season in the tundra", isCorrect: false },
          { text: "A specific type of tundra plant", isCorrect: false },
        ],
        explanation: "El permafrost se define como 'una capa de subsuelo permanentemente congelado', una característica clave de la tundra ártica.",
      },
      {
        id: "5-2",
        questionText: "Which type of vegetation is NOT typically dominant in tundra ecosystems?",
        options: [
          { text: "Mosses and lichens", isCorrect: false },
          { text: "Tall, broadleaf trees", isCorrect: true },
          { text: "Grasses and sedges", isCorrect: false },
          { text: "Dwarf shrubs", isCorrect: false },
        ],
        explanation: "La tundra es un bioma 'sin árboles' y su vegetación consiste en plantas de bajo crecimiento; los árboles altos de hoja ancha no son típicos.",
      },
      {
        id: "5-3",
        questionText: "What is a significant consequence of thawing permafrost mentioned in the passage?",
        options: [
          { text: "Increased soil fertility", isCorrect: false },
          { text: "Release of trapped greenhouse gases", isCorrect: true },
          { text: "A decrease in local temperatures", isCorrect: false },
          { text: "Expansion of tundra animal populations", isCorrect: false },
        ],
        explanation: "Una consecuencia importante del descongelamiento del permafrost es la 'liberación de grandes cantidades de gases de efecto invernadero'.",
      },
      {
        id: "5-4",
        questionText: "What does 'shrubification' refer to in the context of tundra ecosystems?",
        options: [
          { text: "The process of tundra animals developing thicker fur", isCorrect: false },
          { text: "The seasonal migration of tundra animals", isCorrect: false },
          { text: "The encroachment of taller shrubs into tundra areas due to warming", isCorrect: true },
          { text: "The scientific study of tundra shrubs", isCorrect: false },
        ],
        explanation: "La 'arbustificación' es 'el avance de arbustos más altos e incluso algunos árboles en áreas de tundra' debido al calentamiento.",
      },
      {
        id: "5-5",
        questionText: "How are animals in the tundra adapted to survive?",
        options: [
          { text: "By primarily eating fruits and nuts", isCorrect: false },
          { text: "Through adaptations like thick fur, hibernation, or migration", isCorrect: true },
          { text: "By building complex underground burrows in the permafrost", isCorrect: false },
          { text: "By relying on abundant water sources from melting glaciers", isCorrect: false },
        ],
        explanation: "Los animales de la tundra han desarrollado adaptaciones como 'pelaje o plumas gruesas, y estrategias de hibernación o migración' para sobrevivir.",
      },
    ],
  },
];

export type UserInfo = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  grado: string;
  grupo: string;
  carrera: string;
  otraCarrera?: string; // Added for "Otra" option
};

export type ToeflAnswer = {
  questionId: string;
  selectedOptionIndex: number | null;
};

export type ToeflTestState = {
  currentSection: number;
  answers: ToeflAnswer[];
  startTime: number | null; // Timestamp when the test started
  timeRemaining: number; // in seconds
};

export const INITIAL_TEST_DURATION = 25 * 60; // 25 minutes in seconds
export const TOTAL_SECTIONS = 5;

    