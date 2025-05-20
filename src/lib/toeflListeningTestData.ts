
export interface ListeningQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface ListeningQuestion {
  id: string; // e.g., "l1-q1" (lecture 1, question 1), "md1-q1" (mini-dialogue 1, question 1)
  questionText: string;
  options: ListeningQuestionOption[];
  explanation: string; // Spanish explanation for the correct answer
}

export interface DialogueLine {
  speaker: string; // e.g., "Man", "Woman", "Narrator", "Professor"
  line: string;
}

export interface AudioContent {
  type: 'lecture' | 'conversation' | 'mini-dialogue';
  title?: string; // e.g., "Lecture: The Impact of Social Media"
  script?: string; // For lectures or longer conversations if not broken down
  dialogues?: DialogueLine[]; // For mini-dialogues or structured conversations
  instructions?: string; // e.g. "Listen to a conversation between a student and a professor."
}

export interface ToeflListeningSectionData {
  id: number; // 1, 2, 3, 4, 5 (for grouping, e.g., Part A, Part B, Part C)
  audioContent: AudioContent;
  questions: ListeningQuestion[];
}

export const toeflListeningSections: ToeflListeningSectionData[] = [
  // Part 1: Mini Dialogues
  {
    id: 1,
    audioContent: {
      type: 'mini-dialogue',
      title: 'Mini-Dialogue Set 1',
      instructions: "Listen to several short dialogues. After each dialogue, you will be asked a question about it. You can play each dialogue only twice.",
      dialogues: [
        { speaker: "Man", line: "The math class was brutal today, wasn't it?" },
        { speaker: "Woman", line: "Tell me about it! And the professor said the final will be even harder." },
        // Add 4 more dialogues here for a total of 5
      ],
    },
    questions: [ // 2 questions per mini-dialogue
      {
        id: "md1-q1",
        questionText: "What does the woman imply about the final exam?",
        options: [
          { text: "It will be easier than today's class.", isCorrect: false },
          { text: "It will be more challenging.", isCorrect: true },
          { text: "She is not planning to take it.", isCorrect: false },
          { text: "The professor will provide a study guide.", isCorrect: false },
        ],
        explanation: "La mujer dice que el final 'será aún más difícil', lo que implica que será más desafiante.",
      },
      {
        id: "md1-q2",
        questionText: "How does the man likely feel after the woman's comment?",
        options: [
          { text: "Relieved", isCorrect: false },
          { text: "Discouraged", isCorrect: true },
          { text: "Indifferent", isCorrect: false },
          { text: "Excited", isCorrect: false },
        ],
        explanation: "Dado que la clase ya fue 'brutal', escuchar que el final será peor probablemente lo desanime.",
      },
      // Add 8 more questions here for the 4 additional mini-dialogues
    ],
  },
  // Part 2: Longer Conversation
  {
    id: 2,
    audioContent: {
      type: 'conversation',
      title: 'Conversation: Planning a Summer Trip',
      instructions: "Listen to a conversation between two students. You can play the conversation only twice.",
      dialogues: [
        { speaker: "Student A (Female)", line: "Hey Mark, have you thought about what you're doing this summer? I was thinking of maybe taking a road trip." },
        { speaker: "Student B (Male)", line: "A road trip sounds amazing, Sarah! Where were you thinking of going? I've always wanted to see the national parks out west." },
        { speaker: "Student A (Female)", line: "That's exactly what I had in mind! Maybe Yellowstone and the Grand Canyon? We'd need to plan the route and figure out camping spots though." },
        { speaker: "Student B (Male)", line: "Definitely. And we'd have to budget for gas and food. How long were you thinking of going for? Two weeks? Three?" },
        { speaker: "Student A (Female)", line: "Three weeks would be ideal to really explore. We could also invite Jenny and Tom; they mentioned wanting to do something similar. The more, the merrier for sharing driving and costs!" },
        { speaker: "Student B (Male)", line: "Good idea. Let's talk to them. We should probably start looking at maps and park reservations soon if we're serious. Summer's not too far off." },
        { speaker: "Student A (Female)", line: "Agreed. I'm excited already! This could be an epic adventure." }
      ],
    },
    questions: [ // 10 questions for the conversation
      {
        id: "conv1-q1",
        questionText: "What is the main topic of the conversation?",
        options: [
          { text: "Planning a study group.", isCorrect: false },
          { text: "Discussing their favorite national parks.", isCorrect: false },
          { text: "Organizing a summer road trip.", isCorrect: true },
          { text: "Budgeting for college expenses.", isCorrect: false },
        ],
        explanation: "Sarah inicia la conversación proponiendo un 'viaje por carretera' para el verano, y Mark se muestra entusiasmado con la idea de visitar parques nacionales.",
      },
      {
        id: "conv1-q2",
        questionText: "Which national parks does Sarah specifically mention wanting to visit?",
        options: [
          { text: "Yosemite and Zion.", isCorrect: false },
          { text: "Yellowstone and the Grand Canyon.", isCorrect: true },
          { text: "The Everglades and Acadia.", isCorrect: false },
          { text: "Rocky Mountain and Glacier.", isCorrect: false },
        ],
        explanation: "Sarah menciona explícitamente 'Yellowstone y el Gran Cañón' como posibles destinos.",
      },
      // ... Add 8 more questions for this conversation
    ],
  },
  // Part 3: Lecture 1
  {
    id: 3,
    audioContent: {
      type: 'lecture',
      title: 'Lecture: The Impact of Climate Change on Coastal Ecosystems',
      instructions: "Listen to part of a lecture in an environmental science class. You can play the lecture only twice.",
      script: "Good morning, everyone. Today, we're going to delve into a critical issue: the impact of climate change on our coastal ecosystems. As global temperatures rise, we're seeing a number of alarming trends. Sea level rise, primarily due to thermal expansion of water and melting glaciers and ice sheets, is perhaps the most direct threat. This leads to coastal erosion, saltwater intrusion into freshwater aquifers, and increased frequency of coastal flooding, displacing communities and destroying habitats. Furthermore, ocean acidification, caused by the absorption of excess atmospheric carbon dioxide, is severely impacting marine organisms with calcium carbonate shells, like corals and shellfish. Coral reefs, which are biodiversity hotspots, are experiencing widespread bleaching events. Warmer waters also alter species distribution and can lead to an increase in harmful algal blooms. The intricate web of life in these ecosystems is being disrupted at an unprecedented rate, and understanding these mechanisms is key to formulating effective mitigation and adaptation strategies. We'll explore some of these strategies in our next session...",
    },
    questions: [ // 10 questions for this lecture
      {
        id: "lec1-q1",
        questionText: "What is the main topic of the lecture?",
        options: [
          { text: "The benefits of coastal ecosystems.", isCorrect: false },
          { text: "Strategies for preventing sea-level rise.", isCorrect: false },
          { text: "The effects of climate change on coastal environments.", isCorrect: true },
          { text: "The history of oceanography.", isCorrect: false },
        ],
        explanation: "El profesor introduce el tema como 'el impacto del cambio climático en nuestros ecosistemas costeros'.",
      },
      // ... Add 9 more questions for this lecture
    ],
  },
  // Part 4: Lecture 2 - History of Cacao (NEW)
  {
    id: 4,
    audioContent: {
      type: 'lecture',
      title: 'Lecture: The Journey of Cacao - From Ancient Ritual to Global Treat',
      instructions: "Listen to part of a lecture on the history of cacao. You can play it twice.",
      script: "Welcome, class. Today we embark on a fascinating journey tracing the history of cacao, the plant that gives us chocolate. Its story begins in Mesoamerica, with the Olmec civilization, around 1500 BC, being among the first to cultivate and utilize cacao beans. They prepared a bitter, frothy beverage, a far cry from the sweet chocolate we know today. The Mayans, succeeding the Olmecs, elevated cacao to a divine status, considering it a food of the gods and even using the beans as currency. Their texts and pottery frequently depict cacao in religious ceremonies and as a symbol of wealth and power. They would often mix ground cacao with water, chili peppers, cornmeal, and spices to create their ceremonial drink. \n\nLater, the Aztecs adopted many Mayan customs regarding cacao, calling their version 'xocolatl,' meaning 'bitter water.' For the Aztecs, this drink was typically reserved for royalty, warriors, and priests, believed to impart strength, wisdom, and even act as an aphrodisiac. When Christopher Columbus encountered cacao beans on his fourth voyage in 1502, he didn't fully grasp their significance. However, it was Hernán Cortés who, after observing its widespread use and value in the Aztec empire, introduced cacao to Spain in the early 16th century. \n\nThe Spanish court initially kept chocolate a closely guarded secret. They began to transform the beverage by adding sugar, honey, vanilla, and sometimes cinnamon, to counteract its natural bitterness, making it a sweet, warm, and highly prized drink among the aristocracy. For nearly a century, Spain monopolized the chocolate trade. Gradually, as knowledge and supplies spread, chocolate's popularity extended across Europe during the 17th and 18th centuries, though it remained largely a luxury item for the elite. \n\nThe 19th century marked a pivotal turning point with the Industrial Revolution. Key inventions like the cocoa press by Coenraad Johannes van Houten in 1828, which separated cocoa butter from cocoa solids, and the subsequent development of solid eating chocolate by companies like Fry's and Cadbury, democratized chocolate. It became more affordable, and its forms diversified, leading to the bars, truffles, and myriad confections we enjoy globally today. So, from a sacred, bitter brew of ancient civilizations to a universally beloved treat, cacao's journey is a testament to cultural exchange and technological innovation.",
    },
    questions: [
      {
        id: "lec2-q1",
        questionText: "Which civilization is credited as being among the first to cultivate cacao?",
        options: [
          { text: "The Aztecs", isCorrect: false },
          { text: "The Incas", isCorrect: false },
          { text: "The Olmecs", isCorrect: true },
          { text: "The Spanish", isCorrect: false },
        ],
        explanation: "El profesor menciona que los 'olmecas... fueron de los primeros en cultivar y utilizar los granos de cacao'.",
      },
      {
        id: "lec2-q2",
        questionText: "How did the Mayans view cacao?",
        options: [
          { text: "As a common food for all people.", isCorrect: false },
          { text: "As a divine substance and a form of currency.", isCorrect: true },
          { text: "Primarily as a dye for fabrics.", isCorrect: false },
          { text: "As a simple flavoring for water.", isCorrect: false },
        ],
        explanation: "Los mayas 'elevaron el cacao a un estatus divino, considerándolo un alimento de los dioses e incluso usando los granos como moneda'.",
      },
      {
        id: "lec2-q3",
        questionText: "What was the Aztec name for their cacao beverage?",
        options: [
          { text: "Chocolatl", isCorrect: false },
          { text: "Theobroma", isCorrect: false },
          { text: "Xocolatl", isCorrect: true },
          { text: "Cacao brew", isCorrect: false },
        ],
        explanation: "Los aztecas llamaban a su bebida de cacao 'xocolatl', que significa 'agua amarga'.",
      },
      {
        id: "lec2-q4",
        questionText: "Who was primarily responsible for introducing cacao to Europe?",
        options: [
          { text: "Christopher Columbus", isCorrect: false },
          { text: "An Aztec emperor", isCorrect: false },
          { text: "Portuguese traders", isCorrect: false },
          { text: "Hernán Cortés", isCorrect: true },
        ],
        explanation: "Aunque Colón encontró los granos, fue 'Hernán Cortés quien... introdujo el cacao en España'.",
      },
      {
        id: "lec2-q5",
        questionText: "How did the Spanish initially modify the cacao drink?",
        options: [
          { text: "They made it even more bitter by adding new spices.", isCorrect: false },
          { text: "They added sugar, honey, and vanilla.", isCorrect: true },
          { text: "They served it cold and diluted it significantly.", isCorrect: false },
          { text: "They mixed it with alcoholic beverages.", isCorrect: false },
        ],
        explanation: "Los españoles 'comenzaron a transformar la bebida añadiendo azúcar, miel, vainilla... para contrarrestar su amargor natural'.",
      },
      {
        id: "lec2-q6",
        questionText: "For about how long did Spain maintain a monopoly on the chocolate trade?",
        options: [
          { text: "A decade", isCorrect: false },
          { text: "Fifty years", isCorrect: false },
          { text: "Nearly a century", isCorrect: true },
          { text: "Over two centuries", isCorrect: false },
        ],
        explanation: "El pasaje dice: 'Durante casi un siglo, España monopolizó el comercio del chocolate'.",
      },
      {
        id: "lec2-q7",
        questionText: "What was the status of chocolate in Europe during the 17th and 18th centuries?",
        options: [
          { text: "A common drink for all social classes.", isCorrect: false },
          { text: "Primarily used for medicinal purposes.", isCorrect: false },
          { text: "Largely a luxury item for the elite.", isCorrect: true },
          { text: "Forbidden by most religious authorities.", isCorrect: false },
        ],
        explanation: "Durante los siglos XVII y XVIII, el chocolate 'siguió siendo en gran medida un artículo de lujo para la élite'.",
      },
      {
        id: "lec2-q8",
        questionText: "What invention in the 19th century was crucial for creating solid eating chocolate?",
        options: [
          { text: "The steam engine", isCorrect: false },
          { text: "The cocoa press", isCorrect: true },
          { text: "The refrigeration unit", isCorrect: false },
          { text: "The automatic grinder", isCorrect: false },
        ],
        explanation: "La 'prensa de cacao por Coenraad Johannes van Houten... que separaba la manteca de cacao de los sólidos de cacao' fue clave.",
      },
      {
        id: "lec2-q9",
        questionText: "What general trend describes the evolution of chocolate consumption?",
        options: [
          { text: "From a sweet treat to a bitter ceremonial drink.", isCorrect: false },
          { text: "From a commoner's drink to a royal luxury.", isCorrect: false },
          { text: "From a sacred, bitter brew to a universally beloved sweet treat.", isCorrect: true },
          { text: "From a solid food item to a primarily liquid beverage.", isCorrect: false },
        ],
        explanation: "El pasaje concluye que el viaje del cacao es 'desde una infusión sagrada y amarga... hasta una golosina dulce universalmente amada'.",
      },
      {
        id: "lec2-q10",
        questionText: "What does the lecture imply about the Olmecs' cacao beverage compared to modern chocolate?",
        options: [
          { text: "It was sweeter and creamier.", isCorrect: false },
          { text: "It was very similar in taste and preparation.", isCorrect: false },
          { text: "It was primarily eaten as a solid.", isCorrect: false },
          { text: "It was a bitter, frothy drink, unlike sweet modern chocolate.", isCorrect: true },
        ],
        explanation: "Los olmecas preparaban una 'bebida amarga y espumosa, muy diferente del chocolate dulce que conocemos hoy'.",
      },
    ],
  },
  // Part 5: Lecture 3 - Volcanoes Around the World (NEW)
  {
    id: 5,
    audioContent: {
      type: 'lecture',
      title: 'Lecture: Volcanoes - Earth\'s Fiery Architects',
      instructions: "Listen to part of a lecture about volcanoes. You can play it twice.",
      script: "Good afternoon. Today, we turn our attention to one of Earth's most powerful and awe-inspiring natural phenomena: volcanoes. A volcano is essentially a rupture in the crust of a planetary-mass object, such as Earth, that allows hot lava, volcanic ash, and gases to escape from a magma chamber below the surface. Most volcanoes are found where tectonic plates are diverging or converging. For example, the Pacific Ring of Fire, an area encircling the Pacific Ocean basin, is home to over 75% of the world's active and dormant volcanoes due to intense plate tectonic activity. \n\nThere are several types of volcanoes, classified by their shape and eruption style. Shield volcanoes, like Mauna Loa in Hawaii, are characterized by broad, gently sloping sides formed by fluid basaltic lava flows. Stratovolcanoes, or composite volcanoes, such as Mount Fuji in Japan or Mount Rainier in the United States, are conical and built up by many layers of hardened lava, tephra, pumice, and ash. These are often associated with more explosive eruptions. Cinder cones are simpler structures built from ejected lava fragments called cinders that fall back around the vent. Calderas are large, cauldron-like depressions that form when a volcano collapses, often after a massive eruption. \n\nVolcanic eruptions can have profound impacts, both destructive and constructive. Destructive effects include lava flows that engulf landscapes, pyroclastic flows – fast-moving currents of hot gas and volcanic matter – that can be incredibly deadly, and ash falls that can blanket vast areas, disrupt air travel, and cause respiratory problems. Volcanic gases, like sulfur dioxide, can also contribute to acid rain and short-term climate cooling. \n\nHowever, volcanoes also play a crucial role in creating land and enriching soil. Volcanic ash and lava break down to form highly fertile soils, ideal for agriculture. Geothermal energy, harnessed from the Earth's internal heat associated with volcanic activity, provides a renewable energy source in many regions. Furthermore, volcanic activity is responsible for releasing gases that helped form Earth's early atmosphere and oceans. Understanding volcanoes, their behavior, and their hazards is vital for mitigating risks to communities living in their vicinity and for appreciating their role in shaping our planet.",
    },
    questions: [
      {
        id: "lec3-q1",
        questionText: "What is the primary cause for the location of most volcanoes?",
        options: [
          { text: "Random occurrences in Earth's crust.", isCorrect: false },
          { text: "Areas with frequent meteorite impacts.", isCorrect: false },
          { text: "Where tectonic plates are diverging or converging.", isCorrect: true },
          { text: "Deep ocean trenches exclusively.", isCorrect: false },
        ],
        explanation: "El profesor indica que 'la mayoría de los volcanes se encuentran donde las placas tectónicas divergen o convergen'.",
      },
      {
        id: "lec3-q2",
        questionText: "Which region is mentioned as having over 75% of the world's active and dormant volcanoes?",
        options: [
          { text: "The Mid-Atlantic Ridge", isCorrect: false },
          { text: "The East African Rift Valley", isCorrect: false },
          { text: "The Himalayan Mountain Range", isCorrect: false },
          { text: "The Pacific Ring of Fire", isCorrect: true },
        ],
        explanation: "El 'Anillo de Fuego del Pacífico... alberga más del 75% de los volcanes activos y durmientes del mundo'.",
      },
      {
        id: "lec3-q3",
        questionText: "How are shield volcanoes, like Mauna Loa, characterized?",
        options: [
          { text: "By steep, conical shapes and explosive eruptions.", isCorrect: false },
          { text: "By broad, gently sloping sides formed by fluid lava.", isCorrect: true },
          { text: "By being primarily underwater structures.", isCorrect: false },
          { text: "By frequent, small ejections of cinders.", isCorrect: false },
        ],
        explanation: "Los volcanes en escudo se caracterizan por 'laderas anchas y de pendiente suave formadas por flujos de lava basáltica fluida'.",
      },
      {
        id: "lec3-q4",
        questionText: "What is a stratovolcano (composite volcano) primarily composed of?",
        options: [
          { text: "Only solidified basaltic lava.", isCorrect: false },
          { text: "Loose cinders and volcanic bombs.", isCorrect: false },
          { text: "Many layers of hardened lava, tephra, pumice, and ash.", isCorrect: true },
          { text: "A single, large magma chamber near the surface.", isCorrect: false },
        ],
        explanation: "Los estratovolcanes están 'constituidos por muchas capas de lava endurecida, tefra, piedra pómez y ceniza'.",
      },
      {
        id: "lec3-q5",
        questionText: "What are pyroclastic flows?",
        options: [
          { text: "Slow-moving rivers of molten lava.", isCorrect: false },
          { text: "Deposits of fertile volcanic soil.", isCorrect: false },
          { text: "Fast-moving currents of hot gas and volcanic matter.", isCorrect: true },
          { text: "Columns of ash rising high into the atmosphere.", isCorrect: false },
        ],
        explanation: "Los flujos piroclásticos son 'corrientes de rápido movimiento de gas caliente y material volcánico'.",
      },
      {
        id: "lec3-q6",
        questionText: "Which of these is NOT mentioned as a destructive effect of volcanic eruptions?",
        options: [
          { text: "Lava flows engulfing landscapes.", isCorrect: false },
          { text: "Creation of new landmasses.", isCorrect: true },
          { text: "Ash falls disrupting air travel.", isCorrect: false },
          { text: "Volcanic gases contributing to acid rain.", isCorrect: false },
        ],
        explanation: "La creación de nuevas masas de tierra se menciona como un efecto constructivo, no destructivo, de los volcanes.",
      },
      {
        id: "lec3-q7",
        questionText: "What is a constructive role of volcanoes mentioned in the lecture?",
        options: [
          { text: "Causing short-term climate cooling.", isCorrect: false },
          { text: "Enriching soil for agriculture.", isCorrect: true },
          { text: "Increasing the salinity of oceans.", isCorrect: false },
          { text: "Preventing earthquakes in surrounding areas.", isCorrect: false },
        ],
        explanation: "Los volcanes 'enriquecen el suelo', ya que 'la ceniza volcánica y la lava se descomponen para formar suelos altamente fértiles'.",
      },
      {
        id: "lec3-q8",
        questionText: "What is geothermal energy related to?",
        options: [
          { text: "Energy derived from wind patterns near volcanoes.", isCorrect: false },
          { text: "The Earth's internal heat associated with volcanic activity.", isCorrect: true },
          { text: "Solar energy concentrated by volcanic mountain slopes.", isCorrect: false },
          { text: "Energy from burning volcanic gases.", isCorrect: false },
        ],
        explanation: "La energía geotérmica se 'aprovecha del calor interno de la Tierra asociado con la actividad volcánica'.",
      },
      {
        id: "lec3-q9",
        questionText: "How did volcanic activity contribute to Earth's early development?",
        options: [
          { text: "By creating the planet's magnetic field.", isCorrect: false },
          { text: "By releasing gases that helped form the atmosphere and oceans.", isCorrect: true },
          { text: "By carving out major river valleys.", isCorrect: false },
          { text: "By initiating the process of plate tectonics.", isCorrect: false },
        ],
        explanation: "La actividad volcánica es 'responsable de liberar gases que ayudaron a formar la atmósfera y los océanos primitivos de la Tierra'.",
      },
      {
        id: "lec3-q10",
        questionText: "What is a caldera?",
        options: [
          { text: "The main vent of a very active volcano.", isCorrect: false },
          { text: "A type of volcanic rock rich in crystals.", isCorrect: false },
          { text: "A small cone built from ejected lava fragments.", isCorrect: false },
          { text: "A large depression formed when a volcano collapses.", isCorrect: true },
        ],
        explanation: "Las calderas son 'grandes depresiones con forma de caldero que se forman cuando un volcán colapsa'.",
      },
    ],
  },
];

export const INITIAL_LISTENING_TEST_DURATION = 40 * 60; // 40 minutes
export const TOTAL_LISTENING_PARTS = toeflListeningSections.length; // Now 5

export type { UserInfo } from './toeflTestData';

export type ToeflListeningAnswer = {
  questionId: string;
  selectedOptionIndex: number | null;
  isMarkedForReview: boolean;
};

export type ToeflListeningTestState = {
  currentAudioPartId: number;
  answers: ToeflListeningAnswer[];
  startTime: number | null;
  timeRemaining: number;
  userInfo?: UserInfo;
  audioPlayCounts: { [audioPartId: number]: number };
};

export const getListeningPartAndQuestionIndex = (
  globalIndex: number,
  sections: ToeflListeningSectionData[]
): { partId: number; questionIndexInPart: number } => {
  let questionsCounted = 0;
  for (const section of sections) {
    if (globalIndex < questionsCounted + section.questions.length) {
      return {
        partId: section.id,
        questionIndexInPart: globalIndex - questionsCounted,
      };
    }
    questionsCounted += section.questions.length;
  }
  return { partId: sections[sections.length-1].id, questionIndexInPart: sections[sections.length-1].questions.length -1 };
};
