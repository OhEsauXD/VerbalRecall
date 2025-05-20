
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
  id: number; // 1, 2, 3, 4 (for grouping, e.g., Part A, Part B, Part C)
  audioContent: AudioContent;
  questions: ListeningQuestion[];
}

// PLACEHOLDER DATA - Needs to be fully populated
export const toeflListeningSections: ToeflListeningSectionData[] = [
  // Part A: Mini Dialogues (Example: Aim for 5 dialogues, 2 questions each = 10 questions)
  {
    id: 1,
    audioContent: {
      type: 'mini-dialogue',
      title: 'Mini-Dialogue Set 1',
      instructions: "Listen to several short dialogues. After each dialogue, you will be asked a question about it. You can play each dialogue only twice.",
      dialogues: [
        { speaker: "Man", line: "The math class was brutal today, wasn't it?" },
        { speaker: "Woman", line: "Tell me about it! And the professor said the final will be even harder." },
      ],
    },
    questions: [
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
    ],
  },
  // Part B: Longer Conversation (Example: Aim for 1 conversation, 10 questions)
  {
    id: 2,
    audioContent: {
      type: 'conversation',
      title: 'Conversation: Planning a Study Group',
      instructions: "Listen to a conversation between two students. You can play the conversation only twice.",
      dialogues: [ // Using dialogues for structure, can be a single script string too
        { speaker: "Student A (Female)", line: "Hey Mark, are you free to form a study group for the upcoming history exam? I'm a bit overwhelmed by the amount of reading." },
        { speaker: "Student B (Male)", line: "That's a great idea, Sarah! I was thinking the same thing. When and where were you thinking of meeting?" },
        { speaker: "Student A (Female)", line: "How about the library? Maybe Wednesday afternoon? Say, around 3 PM? They have those group study rooms." },
        { speaker: "Student B (Male)", line: "Wednesday at 3 PM works for me. Should we invite anyone else? Maybe Jenny? She seems to take good notes." },
        { speaker: "Student A (Female)", line: "Good call. I'll ask her. So, library, Wednesday, 3 PM. We can divide the chapters and then discuss them. Sound good?" },
        { speaker: "Student B (Male)", line: "Perfect. I'll start reviewing the first few chapters then. See you Wednesday!" },
      ],
    },
    questions: [
      {
        id: "conv1-q1",
        questionText: "Why does Sarah want to form a study group?",
        options: [
          { text: "She wants to make new friends.", isCorrect: false },
          { text: "She finds the library too quiet.", isCorrect: false },
          { text: "She feels overwhelmed by the reading material.", isCorrect: true },
          { text: "Mark asked her to organize it.", isCorrect: false },
        ],
        explanation: "Sarah menciona que está 'un poco abrumada por la cantidad de lectura'.",
      },
      // ... Add 9 more questions for this conversation
    ],
  },
  // Part C: Lecture (Example: Aim for 2 lectures, 10 questions each)
  {
    id: 3,
    audioContent: {
      type: 'lecture',
      title: 'Lecture: The Impact of Climate Change on Coastal Ecosystems',
      instructions: "Listen to part of a lecture in an environmental science class. You can play the lecture only twice.",
      script: "Good morning, everyone. Today, we're going to delve into a critical issue: the impact of climate change on our coastal ecosystems. As global temperatures rise, we're seeing a number of alarming trends. Sea level rise, primarily due to thermal expansion of water and melting glaciers and ice sheets, is perhaps the most direct threat. This leads to coastal erosion, saltwater intrusion into freshwater aquifers, and increased frequency of coastal flooding, displacing communities and destroying habitats. Furthermore, ocean acidification, caused by the absorption of excess atmospheric carbon dioxide, is severely impacting marine organisms with calcium carbonate shells, like corals and shellfish. Coral reefs, which are biodiversity hotspots, are experiencing widespread bleaching events. Warmer waters also alter species distribution and can lead to an increase in harmful algal blooms. The intricate web of life in these ecosystems is being disrupted at an unprecedented rate, and understanding these mechanisms is key to formulating effective mitigation and adaptation strategies. We'll explore some of these strategies in our next session...",
    },
    questions: [
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
  // Add one more lecture section (id: 4) for a total of ~40 questions.
  // For brevity, I'll just show the structure.
  {
    id: 4, // This would be the second lecture or another set of mini-dialogues/conversation.
    audioContent: {
      type: 'lecture', // Or 'conversation' or 'mini-dialogue'
      title: 'Lecture: The Psychology of Decision Making (Placeholder)',
      instructions: "Listen to part of a lecture. You can play it twice.",
      script: "Placeholder script for the second major audio segment. This needs to be about 5-7 minutes of content to support around 10 questions. It could cover topics like cognitive biases, heuristics, or different models of decision making. Ensure the language is academic but accessible, typical of a university lecture.",
    },
    questions: [
      // Placeholder for 10 questions related to this second lecture/segment
      { id: "lec2-q1", questionText: "Placeholder Question 1 for Lecture 2?", options: [{text: "Opt A", isCorrect: false}, {text: "Opt B (Correct)", isCorrect: true}], explanation: "Placeholder explanation." },
    ],
  }
];

export const INITIAL_LISTENING_TEST_DURATION = 40 * 60; // 40 minutes
export const TOTAL_LISTENING_PARTS = toeflListeningSections.length; // Dynamically based on defined sections

// UserInfo can be imported from toeflTestData or toeflGrammarTestData if structure is identical
// For now, let's assume it's the same. If not, define it here.
export type { UserInfo } from './toeflTestData';

export type ToeflListeningAnswer = {
  questionId: string;
  selectedOptionIndex: number | null;
  isMarkedForReview: boolean;
};

export type ToeflListeningTestState = {
  currentAudioPartId: number; // Which section/audio script is currently active (1-indexed)
  // currentQuestionIndexInPart: number; // If questions are shown one by one after audio
  answers: ToeflListeningAnswer[];
  startTime: number | null;
  timeRemaining: number;
  userInfo?: UserInfo;
  audioPlayCounts: { [audioPartId: number]: number }; // Track plays per audio part
};

// Helper function (if needed for more granular progress within a part)
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
  // Should not happen if globalIndex is valid
  return { partId: sections[sections.length-1].id, questionIndexInPart: sections[sections.length-1].questions.length -1 };
};

