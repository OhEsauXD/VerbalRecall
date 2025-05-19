
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
  id: number; // 1-10
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
  {
    id: 6,
    title: "Sección 6: Comprensión Lectora",
    topic: "Pirámides Alrededor del Mundo",
    passage: `Pyramids, iconic structures of antiquity, are found in various parts of the world, most notably in Egypt, Mesoamerica (by civilizations like the Maya and Aztecs), and Sudan (Nubian pyramids). While sharing a general pyramidal shape, these structures differed significantly in their purpose, construction techniques, and cultural significance.
Egyptian pyramids, such as the Great Pyramid of Giza, are the oldest and were primarily built as tombs for pharaohs and their consorts during the Old and Middle Kingdom periods (circa 2686–1650 BC). They were constructed with massive stone blocks, showcasing remarkable engineering precision, and were intended to protect the ruler's body and possessions for the afterlife.
Mesoamerican pyramids, like those at Chichen Itza (Maya) or Teotihuacan (pre-Aztec), were generally stepped pyramids with temples on top. Their construction often involved stone, rubble, and adobe, and they served as religious centers for ceremonies, sacrifices, and astronomical observations. Many were built over centuries, with newer structures often encasing older ones. They were central to the urban landscape and spiritual life of these civilizations, rather than solely funerary monuments.
Nubian pyramids, found in Sudan, are smaller and steeper than their Egyptian counterparts. Built by the rulers of the Kushite kingdoms (circa 700 BC – AD 350), they also served as tombs but were influenced by both Egyptian and local traditions. They often featured offering chapels at their base and were part of larger necropolis complexes. The geographical spread and chronological development of pyramids highlight diverse cultural responses to themes of power, religion, and the afterlife.`,
    questions: [
      {
        id: "6-1",
        questionText: "According to the passage, what was the primary purpose of Egyptian pyramids?",
        options: [
          { text: "Astronomical observatories", isCorrect: false },
          { text: "Tombs for pharaohs", isCorrect: true },
          { text: "Public gathering spaces", isCorrect: false },
          { text: "Fortified military outposts", isCorrect: false },
        ],
        explanation: "El pasaje indica que las pirámides egipcias 'fueron construidas principalmente como tumbas para los faraones'.",
      },
      {
        id: "6-2",
        questionText: "How did Mesoamerican pyramids typically differ architecturally from Egyptian ones?",
        options: [
          { text: "They were smoother and made of a single stone type.", isCorrect: false },
          { text: "They were smaller and used exclusively for burials.", isCorrect: false },
          { text: "They were generally stepped and had temples on top.", isCorrect: true },
          { text: "They were built underground for better preservation.", isCorrect: false },
        ],
        explanation: "Las pirámides mesoamericanas 'eran generalmente pirámides escalonadas con templos en la cima', lo que las distingue de las egipcias.",
      },
      {
        id: "6-3",
        questionText: "Which civilization built smaller, steeper pyramids in Sudan?",
        options: [
          { text: "The Romans", isCorrect: false },
          { text: "The Greeks", isCorrect: false },
          { text: "The Kushite kingdoms", isCorrect: true },
          { text: "The Persian Empire", isCorrect: false },
        ],
        explanation: "Las pirámides nubias en Sudán 'fueron construidas por los gobernantes de los reinos de Kush'.",
      },
      {
        id: "6-4",
        questionText: "What does the term 'chronological development' refer to in the context of pyramids?",
        options: [
          { text: "The order in which different pyramid types were discovered by archaeologists.", isCorrect: false },
          { text: "The historical timeline and evolution of pyramid construction across different cultures.", isCorrect: true },
          { text: "The time it took to build a single pyramid.", isCorrect: false },
          { text: "The lifespan of the rulers buried within the pyramids.", isCorrect: false },
        ],
        explanation: "'Desarrollo cronológico' se refiere a 'la línea de tiempo histórica y la evolución de la construcción de pirámides' en diversas culturas.",
      },
      {
        id: "6-5",
        questionText: "What is the main idea of the passage?",
        options: [
          { text: "All pyramids worldwide served the exact same purpose.", isCorrect: false },
          { text: "Egyptian pyramids are the only true pyramids.", isCorrect: false },
          { text: "Pyramids in different regions, while sharing a shape, had distinct purposes and construction styles.", isCorrect: true },
          { text: "Pyramid construction ceased after the Egyptian Old Kingdom.", isCorrect: false },
        ],
        explanation: "La idea principal es que, aunque comparten una forma general, las pirámides en Egipto, Mesoamérica y Sudán 'diferían significativamente en su propósito, técnicas de construcción y significado cultural'.",
      },
    ],
  },
  {
    id: 7,
    title: "Sección 7: Comprensión Lectora",
    topic: "El Ciclo de Vida de las Ranas",
    passage: `The life cycle of a frog is a classic example of metamorphosis, a biological process involving a conspicuous and relatively abrupt change in the animal's body structure through cell growth and differentiation. Most frogs begin life as eggs, typically laid in water or moist environments to prevent desiccation. These eggs hatch into aquatic larvae known as tadpoles.
Tadpoles are distinctly different from adult frogs. They possess gills for breathing underwater, a finned tail for swimming, and lack limbs. They are primarily herbivorous, feeding on algae and plant matter. Over several weeks to months, depending on the species and environmental conditions, tadpoles undergo a remarkable transformation. Hind legs begin to appear, followed by front legs. The tail gradually shortens as it is absorbed by the body, and lungs develop to replace the gills, preparing the tadpole for a terrestrial existence. Internally, the digestive system also changes to adapt to a carnivorous diet of insects and other small invertebrates.
Once metamorphosis is complete, the young frog, or froglet, emerges onto land, though many species remain close to water. Adult frogs are characterized by their strong hind legs for jumping, protruding eyes, and a sticky tongue used to catch prey. They breathe through both lungs and their permeable skin, which must remain moist.
Frogs play a vital role in their ecosystems as both predators and prey. However, many frog populations worldwide are declining due to habitat loss, pollution, climate change, and infectious diseases like chytridiomycosis. Conservation efforts are critical to protect these amphibians and the delicate balance of their environments.`,
    questions: [
      {
        id: "7-1",
        questionText: "What is the term for the aquatic larval stage of a frog?",
        options: [
          { text: "Nymph", isCorrect: false },
          { text: "Pupa", isCorrect: false },
          { text: "Tadpole", isCorrect: true },
          { text: "Polliwog", isCorrect: false }, // Polliwog is another name for tadpole, but tadpole is used in the text.
        ],
        explanation: "La etapa larval acuática de una rana se conoce como 'renacuajo' (tadpole).",
      },
      {
        id: "7-2",
        questionText: "Which of these features is characteristic of a tadpole but NOT an adult frog?",
        options: [
          { text: "Lungs for breathing air", isCorrect: false },
          { text: "A diet of insects", isCorrect: false },
          { text: "Gills and a finned tail", isCorrect: true },
          { text: "Strong hind legs for jumping", isCorrect: false },
        ],
        explanation: "Los renacuajos poseen 'branquias para respirar bajo el agua y una cola con aletas para nadar', características que pierden al convertirse en ranas adultas.",
      },
      {
        id: "7-3",
        questionText: "The word 'desiccation' in the first paragraph most nearly means:",
        options: [
          { text: "Freezing", isCorrect: false },
          { text: "Predation", isCorrect: false },
          { text: "Drying out", isCorrect: true },
          { text: "Contamination", isCorrect: false },
        ],
        explanation: "En el contexto de los huevos puestos en agua, 'desecación' (desiccation) significa 'secarse' o perder humedad.",
      },
      {
        id: "7-4",
        questionText: "What can be inferred about the dietary needs of frogs during their life cycle?",
        options: [
          { text: "They remain herbivorous throughout their lives.", isCorrect: false },
          { text: "They switch from a herbivorous diet as tadpoles to a carnivorous diet as adults.", isCorrect: true },
          { text: "They primarily eat fish at all stages.", isCorrect: false },
          { text: "Adult frogs do not need to eat frequently.", isCorrect: false },
        ],
        explanation: "El pasaje indica que los renacuajos son herbívoros y que su sistema digestivo cambia para adaptarse a una dieta carnívora de adultos.",
      },
      {
        id: "7-5",
        questionText: "Which is NOT mentioned as a threat to frog populations?",
        options: [
          { text: "Habitat loss", isCorrect: false },
          { text: "Over-hunting for food", isCorrect: true },
          { text: "Pollution", isCorrect: false },
          { text: "Chytridiomycosis", isCorrect: false },
        ],
        explanation: "El texto menciona la pérdida de hábitat, la contaminación, el cambio climático y enfermedades como la quitridiomicosis como amenazas, pero no la caza excesiva para alimento.",
      },
    ],
  },
  {
    id: 8,
    title: "Sección 8: Comprensión Lectora",
    topic: "Los Orígenes del Cacao",
    passage: `Cacao, the plant from which chocolate is made, has a rich history deeply rooted in Mesoamerican civilizations. The Olmecs, one of the earliest major civilizations in Mexico (circa 1500–400 BC), were likely the first to cultivate and use cacao beans. They consumed it as a bitter, frothy beverage. Later, the Mayans (circa 250–900 AD) revered cacao, considering it a food of the gods. Mayan texts and pottery depict cacao in religious ceremonies, and the beans were so valuable they were used as currency. They mixed ground cacao with water, chili peppers, cornmeal, and spices.
The Aztecs (circa 1300–1521 AD) adopted cacao cultivation and customs from the Maya. They also consumed it as a drink called "xocolatl" (meaning "bitter water"), which was often reserved for royalty, warriors, and priests due to its esteemed status. It was believed to impart strength and wisdom.
Christopher Columbus encountered cacao beans on his fourth voyage in 1502, but it was Hernán Cortés who recognized its economic potential after observing its use in the Aztec empire. Cortés introduced cacao to Spain in the early 16th century. Initially, the Spanish kept chocolate a secret, adding sugar, honey, and vanilla to counteract its bitterness, transforming it into a sweet, warm beverage popular among the aristocracy.
From Spain, chocolate's popularity slowly spread across Europe throughout the 17th and 18th centuries, becoming a luxury item. The Industrial Revolution in the 19th century brought technological advancements like the cocoa press, which allowed for the creation of solid chocolate and made it more affordable and accessible to the masses, leading to the global phenomenon it is today.`,
    questions: [
      {
        id: "8-1",
        questionText: "Which Mesoamerican civilization is believed to have been the first to cultivate cacao?",
        options: [
          { text: "The Aztecs", isCorrect: false },
          { text: "The Incas", isCorrect: false },
          { text: "The Olmecs", isCorrect: true },
          { text: "The Toltecs", isCorrect: false },
        ],
        explanation: "Se cree que los 'olmecas' fueron 'probablemente los primeros en cultivar y usar los granos de cacao'.",
      },
      {
        id: "8-2",
        questionText: "How did the Mayans primarily use cacao beans, according to the passage?",
        options: [
          { text: "As a building material", isCorrect: false },
          { text: "As a common food staple for everyone", isCorrect: false },
          { text: "In religious ceremonies and as currency", isCorrect: true },
          { text: "Exclusively for making sweet desserts", isCorrect: false },
        ],
        explanation: "Los mayas usaban el cacao 'en ceremonias religiosas' y los granos 'eran tan valiosos que se usaban como moneda'.",
      },
      {
        id: "8-3",
        questionText: "Who is credited with introducing cacao to Spain?",
        options: [
          { text: "Christopher Columbus", isCorrect: false },
          { text: "Montezuma II", isCorrect: false },
          { text: "Ferdinand Magellan", isCorrect: false },
          { text: "Hernán Cortés", isCorrect: true },
        ],
        explanation: "Fue 'Hernán Cortés quien reconoció su potencial económico... e introdujo el cacao en España'.",
      },
      {
        id: "8-4",
        questionText: "How did the Spanish initially alter the Mesoamerican cacao beverage?",
        options: [
          { text: "They made it more bitter and spicy.", isCorrect: false },
          { text: "They added sugar, honey, and vanilla.", isCorrect: true },
          { text: "They fermented it to create an alcoholic drink.", isCorrect: false },
          { text: "They served it cold with ice.", isCorrect: false },
        ],
        explanation: "Los españoles 'añadieron azúcar, miel y vainilla para contrarrestar su amargor'.",
      },
      {
        id: "8-5",
        questionText: "What major development in the 19th century made chocolate more accessible to the general public?",
        options: [
          { text: "The discovery of new cacao plantations in Africa.", isCorrect: false },
          { text: "A royal decree making chocolate available to all.", isCorrect: false },
          { text: "Technological advancements like the cocoa press.", isCorrect: true },
          { text: "A significant drop in the price of sugar.", isCorrect: false },
        ],
        explanation: "La Revolución Industrial trajo 'avances tecnológicos como la prensa de cacao', lo que permitió la creación de chocolate sólido y lo hizo más accesible.",
      },
    ],
  },
  {
    id: 9,
    title: "Sección 9: Comprensión Lectora",
    topic: "Energía Nuclear: Pros y Contras",
    passage: `Nuclear energy, derived from atomic reactions, presents a complex dichotomy of substantial benefits and significant risks. The primary method, nuclear fission, involves splitting heavy atomic nuclei (usually uranium or plutonium) to release a large amount of energy, which is used to heat water, produce steam, and drive turbines to generate electricity. A potential future method, nuclear fusion, aims to replicate the sun's process by fusing light atomic nuclei, promising even greater energy yields with less radioactive waste, though it remains technologically challenging.
One of the main advantages of nuclear power is its high energy density and low greenhouse gas emissions during operation. Unlike fossil fuels, nuclear reactors do not directly produce carbon dioxide, making nuclear energy a potential tool in combating climate change. It also provides a stable and reliable baseload power supply, not dependent on weather conditions like solar or wind power.
However, nuclear energy carries inherent risks. The radioactive materials used and produced are hazardous, requiring careful management and long-term storage of nuclear waste, which can remain dangerous for thousands of years. The potential for catastrophic accidents, though statistically low, is a major public concern, underscored by incidents like Chernobyl (1986) and Fukushima Daiichi (2011). These events have led to heightened safety regulations and, in some countries, a re-evaluation or phasing out of nuclear power.
The proliferation of nuclear materials for weapons development is another significant concern. Public perception of nuclear energy is often polarized, influenced by safety records, waste disposal issues, and the association with nuclear weapons. Balancing the promise of clean, abundant energy with these profound challenges remains a critical global debate.`,
    questions: [
      {
        id: "9-1",
        questionText: "What is the primary process used in current nuclear power plants to generate energy?",
        options: [
          { text: "Nuclear fusion", isCorrect: false },
          { text: "Geothermal extraction", isCorrect: false },
          { text: "Nuclear fission", isCorrect: true },
          { text: "Solar concentration", isCorrect: false },
        ],
        explanation: "El método principal es la 'fisión nuclear, que implica la división de núcleos atómicos pesados'.",
      },
      {
        id: "9-2",
        questionText: "What is a major environmental benefit of nuclear energy during its operation, as mentioned in the passage?",
        options: [
          { text: "It produces no waste products.", isCorrect: false },
          { text: "It has low greenhouse gas emissions.", isCorrect: true },
          { text: "It enhances local biodiversity.", isCorrect: false },
          { text: "It replenishes uranium resources.", isCorrect: false },
        ],
        explanation: "Una ventaja principal es sus 'bajas emisiones de gases de efecto invernadero durante la operación'.",
      },
      {
        id: "9-3",
        questionText: "The word 'dichotomy' in the first sentence most nearly means:",
        options: [
          { text: "Agreement", isCorrect: false },
          { text: "A division into two contrasting parts", isCorrect: true },
          { text: "A complex solution", isCorrect: false },
          { text: "A source of confusion", isCorrect: false },
        ],
        explanation: "'Dicotomía' se refiere a una 'división en dos partes o ideas opuestas o muy diferentes', como los beneficios y riesgos de la energía nuclear.",
      },
      {
        id: "9-4",
        questionText: "Which of the following is NOT listed as a significant concern or risk associated with nuclear energy?",
        options: [
          { text: "The high cost of uranium fuel", isCorrect: true },
          { text: "Long-term storage of radioactive waste", isCorrect: false },
          { text: "Potential for catastrophic accidents", isCorrect: false },
          { text: "Proliferation of nuclear materials for weapons", isCorrect: false },
        ],
        explanation: "El pasaje menciona el almacenamiento de residuos, accidentes y proliferación de armas como preocupaciones, pero no el alto costo del uranio específicamente.",
      },
      {
        id: "9-5",
        questionText: "What is implied about nuclear fusion compared to nuclear fission?",
        options: [
          { text: "It is currently the most widely used nuclear technology.", isCorrect: false },
          { text: "It produces more long-lived radioactive waste.", isCorrect: false },
          { text: "It is technologically simpler to achieve.", isCorrect: false },
          { text: "It promises greater energy with less radioactive waste but is difficult to achieve.", isCorrect: true },
        ],
        explanation: "La fusión nuclear 'promete mayores rendimientos energéticos con menos residuos radiactivos, aunque sigue siendo tecnológicamente desafiante'.",
      },
    ],
  },
  {
    id: 10,
    title: "Sección 10: Comprensión Lectora",
    topic: "La Carrera Espacial Soviético-Estadounidense",
    passage: `The Soviet-American Space Race was a critical component of the Cold War, a period of geopolitical tension between the United States and the Soviet Union and their respective allies. Spanning roughly from 1957 to 1975, this competition saw both superpowers vie for supremacy in spaceflight capability, driven by national pride, ideological rivalry, and strategic military implications.
The race effectively began with the Soviet launch of Sputnik 1, the first artificial satellite, on October 4, 1957. This event shocked the United States, spurring significant investment in science education and aerospace research, and leading to the creation of NASA in 1958. The Soviets achieved further milestones, including sending the first animal (Laika) into orbit in 1957, the first human (Yuri Gagarin) into space in 1961, and the first spacewalk (Alexei Leonov) in 1965.
The United States, initially lagging, focused its efforts on President John F. Kennedy's ambitious goal, set in 1961, of landing a man on the Moon and returning him safely to Earth before the end of the decade. This culminated in the Apollo 11 mission, which successfully landed Neil Armstrong and Buzz Aldrin on the Moon on July 20, 1969. This achievement is widely regarded as a turning point, effectively marking a major victory for the U.S. in the Space Race.
While the Moon landing was a pinnacle, the Space Race continued with further missions, including the development of space stations like the Soviet Salyut and the American Skylab. The competition fostered rapid advancements in rocketry, materials science, and telecommunications. Eventually, tensions eased, leading to cooperative ventures such as the Apollo-Soyuz Test Project in 1975, which symbolized a new era of détente and collaboration in space exploration.`,
    questions: [
      {
        id: "10-1",
        questionText: "What event is considered the effective start of the Space Race?",
        options: [
          { text: "The creation of NASA", isCorrect: false },
          { text: "Yuri Gagarin's spaceflight", isCorrect: false },
          { text: "The Soviet launch of Sputnik 1", isCorrect: true },
          { text: "The Apollo 11 Moon landing", isCorrect: false },
        ],
        explanation: "La carrera 'comenzó efectivamente con el lanzamiento soviético del Sputnik 1'.",
      },
      {
        id: "10-2",
        questionText: "Which of these was a direct response by the United States to the launch of Sputnik 1?",
        options: [
          { text: "The immediate launch of its own manned Moon mission.", isCorrect: false },
          { text: "A proposal for joint space exploration with the Soviets.", isCorrect: false },
          { text: "Increased investment in science education and the creation of NASA.", isCorrect: true },
          { text: "A reduction in military spending to focus on space.", isCorrect: false },
        ],
        explanation: "El lanzamiento del Sputnik 1 'impulsó una inversión significativa en educación científica e investigación aeroespacial, y llevó a la creación de la NASA'.",
      },
      {
        id: "10-3",
        questionText: "Who was the first human to travel into space?",
        options: [
          { text: "Neil Armstrong", isCorrect: false },
          { text: "Alexei Leonov", isCorrect: false },
          { text: "Yuri Gagarin", isCorrect: true },
          { text: "Buzz Aldrin", isCorrect: false },
        ],
        explanation: "Los soviéticos lograron enviar al 'primer humano (Yuri Gagarin) al espacio en 1961'.",
      },
      {
        id: "10-4",
        questionText: "What major achievement by the United States is considered a turning point in the Space Race?",
        options: [
          { text: "The launch of the Skylab space station.", isCorrect: false },
          { text: "The first successful spacewalk.", isCorrect: false },
          { text: "The Apollo 11 Moon landing.", isCorrect: true },
          { text: "Sending the first animal into orbit.", isCorrect: false },
        ],
        explanation: "El 'aterrizaje lunar del Apolo 11... es ampliamente considerado como un punto de inflexión'.",
      },
      {
        id: "10-5",
        questionText: "What did the Apollo-Soyuz Test Project in 1975 symbolize?",
        options: [
          { text: "The continuation of intense rivalry in space.", isCorrect: false },
          { text: "A new era of détente and collaboration.", isCorrect: true },
          { text: "The Soviet Union's dominance in space station technology.", isCorrect: false },
          { text: "The United States' withdrawal from space exploration.", isCorrect: false },
        ],
        explanation: "El Proyecto de Prueba Apolo-Soyuz 'simbolizó una nueva era de distensión y colaboración en la exploración espacial'.",
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

export const INITIAL_TEST_DURATION = 50 * 60; // 50 minutes in seconds
export const TOTAL_SECTIONS = 10; // Total number of sections

    