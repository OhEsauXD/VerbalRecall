
export interface GrammarQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface SentenceCompletionQuestion {
  id: string;
  type: 'sentenceCompletion';
  questionText: string; // Sentence with a blank, e.g., "The cat ____ on the mat."
  options: GrammarQuestionOption[];
  explanation: string; // Spanish explanation for the correct answer
  category: string; // e.g., 'Verb Tense', 'Prepositions'
}

export interface ErrorIdentificationQuestion {
  id: string;
  type: 'errorIdentification';
  sentenceParts: { text: string; id: string }[]; // e.g., [{text: "The books", id:"A"}, {text:"is", id:"B"}, ...]
  errorPartId: string; // ID of the incorrect part (e.g., "B")
  explanation: string;
  category: string;
}

export interface ParagraphEditingQuestion {
  id: string;
  type: 'paragraphEditing';
  paragraphText: string; // Text with numbered gaps, e.g., "Sentence one. [1] this happened. Sentence two [2] that occurred."
  gaps: {
    [gapNumber: string]: {
      options: GrammarQuestionOption[];
      prompt?: string; // Optional prompt for the gap
    };
  };
  explanation: string; // General explanation for the paragraph or key corrections
  category: string;
}

export interface SentenceRestructuringQuestion {
  id: string;
  type: 'sentenceRestructuring';
  originalSentence: string;
  prompt: string; // e.g., "Choose the sentence that best restructures the original sentence to emphasize..."
  options: GrammarQuestionOption[];
  explanation: string;
  category: string;
}

export type ToeflGrammarQuestion =
  | SentenceCompletionQuestion
  | ErrorIdentificationQuestion
  | ParagraphEditingQuestion
  | SentenceRestructuringQuestion;

export interface ToeflGrammarSectionData {
  id: number; // 1-5 for grammar
  title: string; // e.g., "Sección 1: Sintaxis Básica"
  questions: ToeflGrammarQuestion[];
}

// Placeholder data - THIS NEEDS TO BE FILLED WITH ACTUAL QUESTIONS
export const toeflGrammarTestSections: ToeflGrammarSectionData[] = [
  // Section 1: Basic Syntax (10 Qs)
  {
    id: 1,
    title: "Sección 1: Sintaxis Básica",
    questions: [
      // 4x Sentence Completion
      { id: "g1-1", type: 'sentenceCompletion', questionText: "The cat ___ sleeping.", options: [{text:"is", isCorrect:true}, {text:"are", isCorrect:false}, {text:"be", isCorrect:false}, {text:"am", isCorrect:false}], explanation: "El verbo 'to be' concuerda con 'cat' en singular: 'is'.", category: "Subject-Verb Agreement" },
      { id: "g1-2", type: 'sentenceCompletion', questionText: "They ___ to the park yesterday.", options: [{text:"go", isCorrect:false}, {text:"goes", isCorrect:false}, {text:"went", isCorrect:true}, {text:"gone", isCorrect:false}], explanation: "'Yesterday' indica pasado simple: 'went'.", category: "Basic Tenses" },
      { id: "g1-3", type: 'sentenceCompletion', questionText: "She ___ a new car.", options: [{text:"have", isCorrect:false}, {text:"has", isCorrect:true}, {text:"haves", isCorrect:false}, {text:"having", isCorrect:false}], explanation: "Para 'she', se usa 'has'.", category: "Subject-Verb Agreement" },
      { id: "g1-4", type: 'sentenceCompletion', questionText: "We ___ watching TV now.", options: [{text:"is", isCorrect:false}, {text:"are", isCorrect:true}, {text:"am", isCorrect:false}, {text:"be", isCorrect:false}], explanation: "'Now' indica presente continuo con 'we': 'are watching'.", category: "Basic Tenses" },
      // 3x Error Identification
      { id: "g1-5", type: 'errorIdentification', sentenceParts: [{text:"The dogs",id:"A"}, {text:"barks",id:"B"}, {text:"loudly at",id:"C"}, {text:"the mailman.",id:"D"}], errorPartId: "B", explanation: "'Dogs' es plural, requiere 'bark' (sin 's').", category: "Subject-Verb Agreement" },
      { id: "g1-6", type: 'errorIdentification', sentenceParts: [{text:"She",id:"A"}, {text:"goed",id:"B"}, {text:"to the store",id:"C"}, {text:"this morning.",id:"D"}], errorPartId: "B", explanation: "El pasado de 'go' es 'went', no 'goed'.", category: "Basic Tenses" },
      { id: "g1-7", type: 'errorIdentification', sentenceParts: [{text:"My brother and I",id:"A"}, {text:"is",id:"B"}, {text:"going to",id:"C"}, {text:"the cinema.",id:"D"}], errorPartId: "B", explanation: "Sujeto compuesto ('My brother and I') requiere 'are'.", category: "Subject-Verb Agreement" },
      // 2x Paragraph Editing (Simplified for placeholder)
      { id: "g1-8", type: 'paragraphEditing', paragraphText: "The sun shine brightly. [1] Birds was singing. It were a beautiful day.", gaps: {"1": {prompt: "Connective", options: [{text:"So", isCorrect:true}, {text:"But", isCorrect:false}]}}, explanation: "'Shine' debería ser 'shines'. 'Birds was' debería ser 'Birds were'. 'It were' debería ser 'It was'. 'So' conecta las ideas.", category: "Basic Syntax" },
      { id: "g1-9", type: 'paragraphEditing', paragraphText: "He play soccer. [1] He score a goal.", gaps: {"1": {prompt: "Pronoun", options: [{text:"Then", isCorrect:true}, {text:"Also", isCorrect:false}]}}, explanation: "'Play' debería ser 'plays'. 'Score' debería ser 'scores'. 'Then' indica secuencia.", category: "Basic Tenses" },
      // 1x Sentence Restructuring
      { id: "g1-10", type: 'sentenceRestructuring', originalSentence: "Quickly the fox jumped.", prompt: "Reorder for natural English.", options: [{text:"The fox jumped quickly.", isCorrect:true}, {text:"Jumped the fox quickly.", isCorrect:false}], explanation: "El adverbio 'quickly' usualmente sigue al verbo.", category: "Word Order" },
    ]
  },
  // Section 2: Intermediate Structures (10 Qs) - Placeholders
  {
    id: 2,
    title: "Sección 2: Estructuras Intermedias",
    questions: [
        { id: "g2-1", type: 'sentenceCompletion', questionText: "This is placeholder for Section 2 Question 1.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G2-1", category: "Modifiers" },
        // ... add 9 more placeholder questions for section 2
        { id: "g2-10", type: 'sentenceCompletion', questionText: "This is placeholder for Section 2 Question 10.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G2-10", category: "Parallelism" },
    ]
  },
  // Section 3: Advanced Grammar (10 Qs) - Placeholders
  {
    id: 3,
    title: "Sección 3: Gramática Avanzada",
    questions: [
        { id: "g3-1", type: 'sentenceCompletion', questionText: "This is placeholder for Section 3 Question 1.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G3-1", category: "Reduction Clauses" },
        // ... add 9 more placeholder questions for section 3
        { id: "g3-10", type: 'sentenceCompletion', questionText: "This is placeholder for Section 3 Question 10.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G3-10", category: "Inversions" },
    ]
  },
  // Section 4: Contextual Usage (10 Qs) - Placeholders
  {
    id: 4,
    title: "Sección 4: Uso Contextual",
    questions: [
        { id: "g4-1", type: 'sentenceCompletion', questionText: "This is placeholder for Section 4 Question 1.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G4-1", category: "Transition Words" },
        // ... add 9 more placeholder questions for section 4
        { id: "g4-10", type: 'sentenceCompletion', questionText: "This is placeholder for Section 4 Question 10.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G4-10", category: "Cohesion" },
    ]
  },
  // Section 5: Mixed Challenge (10 Qs) - Placeholders
  {
    id: 5,
    title: "Sección 5: Desafío Mixto",
    questions: [
        { id: "g5-1", type: 'sentenceCompletion', questionText: "This is placeholder for Section 5 Question 1.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G5-1", category: "Mixed Concepts" },
        // ... add 9 more placeholder questions for section 5
        { id: "g5-10", type: 'sentenceCompletion', questionText: "This is placeholder for Section 5 Question 10.", options: [{text:"Option A", isCorrect:true}, {text:"Option B", isCorrect:false}], explanation: "Explanation for G5-10", category: "Mixed Concepts" },
    ]
  },
];

export const INITIAL_GRAMMAR_TEST_DURATION = 40 * 60; // 40 minutes in seconds
export const TOTAL_GRAMMAR_SECTIONS = 5;
export const QUESTIONS_PER_GRAMMAR_SECTION = 10;

// Re-using UserInfo from toeflTestData.ts is fine if the structure is the same.
// If not, define a specific UserInfo for grammar test here.
// For simplicity, let's assume it's the same.
export type { UserInfo } from './toeflTestData';


export type ToeflGrammarAnswer = {
  questionId: string;
  // For sentenceCompletion & sentenceRestructuring:
  selectedOptionIndex?: number | null;
  // For errorIdentification:
  selectedErrorPartId?: string | null;
  // For paragraphEditing:
  selectedGapAnswers?: { [gapNumber: string]: string | null };
  isMarkedForReview: boolean;
};

export type ToeflGrammarSectionState = {
  answers: ToeflGrammarAnswer[];
  // Potentially store current question index within section if needed for review screen.
}

export type ToeflGrammarTestState = {
  currentGlobalQuestionIndex: number; // Overall progress (0-49)
  sectionStates: { [sectionId: number]: ToeflGrammarSectionState };
  startTime: number | null;
  timeRemaining: number;
  userInfo?: UserInfo; // Store user info once collected
};

// Helper function to get current section and question index within section
export const getGrammarSectionAndQuestionIndex = (globalIndex: number): { sectionId: number, questionIndexInSection: number } => {
    const sectionId = Math.floor(globalIndex / QUESTIONS_PER_GRAMMAR_SECTION) + 1;
    const questionIndexInSection = globalIndex % QUESTIONS_PER_GRAMMAR_SECTION;
    return { sectionId, questionIndexInSection };
};
