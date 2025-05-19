
export interface ToeflQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface ToeflQuestion {
  id: string;
  questionText: string;
  options: ToeflQuestionOption[];
  explanation: string;
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
    title: "Section 1: Reading Comprehension",
    topic: "The Himalayan Mountain Range",
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
        explanation: "The passage states, 'Formed by the collision of the Indian-Australian plate with the Eurasian plate...'",
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
        explanation: "The passage lists Bhutan, India, Nepal, China, and Pakistan. Bangladesh is not mentioned.",
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
        explanation: "The passage states, 'The diverse ecosystems of the Himalayas vary with altitude...'",
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
        explanation: "The passage mentions, 'Climate change poses a significant threat to the Himalayan glaciers...'",
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
        explanation: "The passage states, 'They are considered sacred in Hinduism and Buddhism...'",
      },
    ],
  },
  {
    id: 2,
    title: "Section 2: Reading Comprehension",
    topic: "The Medicinal Properties of Aloe Vera",
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
        explanation: "The passage states, 'Native to the Arabian Peninsula...'",
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
        explanation: "The passage mentions, 'The plant's thick, fleshy leaves contain a gel-like substance...'",
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
        explanation: "The passage highlights its 'anti-inflammatory and antimicrobial properties' for soothing skin.",
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
        explanation: "The passage warns that internal consumption 'can have laxative effects or interact with medications.'",
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
        explanation: "The passage states, 'some individuals may experience allergic reactions. It's always advisable to do a patch test...'",
      },
    ],
  },
  {
    id: 3,
    title: "Section 3: Reading Comprehension",
    topic: "Whale Migration Patterns",
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
        explanation: "The passage states they travel to warmer waters 'to give birth, where calves can survive and grow more easily.'",
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
        explanation: "The passage says, 'Polar waters are rich in krill and small fish...'",
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
        explanation: "Sonar signals from other whales for navigation is not explicitly mentioned as a cue in the passage.",
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
        explanation: "The passage refers to 'whale migration routes, known as migratory corridors.'",
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
        explanation: "The passage states, 'Climate change is also impacting migration by altering water temperatures and food distribution...'",
      },
    ],
  },
  {
    id: 4,
    title: "Section 4: Reading Comprehension",
    topic: "The Great Wall of China: A Historical Marvel",
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
        explanation: "The passage states, '...selective stretches later joined together by Qin Shi Huang...'",
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
        explanation: "The passage mentions, 'The most well-known sections of the wall were built by the Ming dynasty...'",
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
        explanation: "The passage states its purpose included 'border control, allowing the imposition of duties on goods transported along the Silk Road, regulation or encouragement of trade...'",
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
        explanation: "The passage notes, 'Millions of laborers...were conscripted...and many perished under harsh conditions.'",
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
        explanation: "The passage mentions, 'sections of the wall are deteriorating due to natural erosion and human activity...'",
      },
    ],
  },
  {
    id: 5,
    title: "Section 5: Reading Comprehension",
    topic: "Tundra Ecosystems and Climate",
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
        explanation: "The passage defines permafrost as 'a layer of permanently frozen subsoil.'",
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
        explanation: "The passage states the tundra is 'treeless' and vegetation consists of 'low-growing plants'. Tall trees are not typical.",
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
        explanation: "The passage explains, 'Thawing permafrost can release large amounts of greenhouse gases...'",
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
        explanation: "The passage defines 'shrubification' as 'The warming climate is also allowing taller shrubs and even some trees to encroach on tundra areas...'",
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
        explanation: "The passage mentions adaptations such as 'thick fur or feathers, and hibernation or migration strategies.'",
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

    