
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

export const toeflGrammarTestSections: ToeflGrammarSectionData[] = [
  // Section 1: Basic Syntax (10 Qs)
  {
    id: 1,
    title: "Sección 1: Sintaxis Básica",
    questions: [
      // Sentence Completion (4)
      { id: "g1-1-sc", type: 'sentenceCompletion', questionText: "The cat and the dog ___ playing in the yard.", options: [{text:"is", isCorrect:false}, {text:"are", isCorrect:true}, {text:"was", isCorrect:false}, {text:"be", isCorrect:false}], explanation: "Un sujeto compuesto ('The cat and the dog') requiere el verbo plural 'are'.", category: "Subject-Verb Agreement" },
      { id: "g1-2-sc", type: 'sentenceCompletion', questionText: "She ___ to the library every Friday.", options: [{text:"go", isCorrect:false}, {text:"goes", isCorrect:true}, {text:"going", isCorrect:false}, {text:"went", isCorrect:false}], explanation: "Para la tercera persona del singular en presente simple ('She'), se usa 'goes'.", category: "Basic Tenses" },
      { id: "g1-3-sc", type: 'sentenceCompletion', questionText: "My books are ___ the table.", options: [{text:"in", isCorrect:false}, {text:"on", isCorrect:true}, {text:"at", isCorrect:false}, {text:"under", isCorrect:false}], explanation: "'On' se usa para indicar que algo está sobre una superficie.", category: "Prepositions" },
      { id: "g1-4-sc", type: 'sentenceCompletion', questionText: "This is ___ apple I bought yesterday.", options: [{text:"a", isCorrect:false}, {text:"an", isCorrect:true}, {text:"the", isCorrect:false}, {text:"some", isCorrect:false}], explanation: "'An' se usa antes de palabras que comienzan con sonido de vocal, como 'apple'.", category: "Articles" },
      // Error Identification (3)
      { id: "g1-5-ei", type: 'errorIdentification', sentenceParts: [{text:"The children",id:"A"}, {text:"plays",id:"B"}, {text:"happily in",id:"C"}, {text:"the park.",id:"D"}], errorPartId: "B", explanation: "'Children' es plural, por lo que el verbo debe ser 'play' (sin 's').", category: "Subject-Verb Agreement" },
      { id: "g1-6-ei", type: 'errorIdentification', sentenceParts: [{text:"Yesterday,",id:"A"}, {text:"we watch",id:"B"}, {text:"a very interesting",id:"C"}, {text:"movie.",id:"D"}], errorPartId: "B", explanation: "'Yesterday' indica tiempo pasado, por lo que el verbo debe ser 'watched'.", category: "Basic Tenses" },
      { id: "g1-7-ei", type: 'errorIdentification', sentenceParts: [{text:"She gave",id:"A"}, {text:"a gift",id:"B"}, {text:"to you and",id:"C"}, {text:"I.",id:"D"}], errorPartId: "D", explanation: "Después de una preposición como 'to', se usa el pronombre objeto 'me', no 'I'. Debería ser 'to you and me'.", category: "Pronouns" },
      // Paragraph Editing (2)
      { id: "g1-8-pe", type: 'paragraphEditing', 
        paragraphText: "My friend [1] to visit me last week. We [2] a great time.", 
        gaps: {
          "1": {prompt: "Verb tense", options: [{text:"come", isCorrect:false}, {text:"came", isCorrect:true}, {text:"comes", isCorrect:false}, {text:"coming", isCorrect:false}]},
          "2": {prompt: "Verb tense", options: [{text:"have", isCorrect:false}, {text:"has", isCorrect:false}, {text:"had", isCorrect:true}, {text:"having", isCorrect:false}]}
        }, 
        explanation: "'Last week' indica pasado, por lo que se usa 'came'. 'Had a great time' es la expresión correcta en pasado.", category: "Basic Tenses" 
      },
      { id: "g1-9-pe", type: 'paragraphEditing', 
        paragraphText: "The team [1] very hard for the competition. Their coach believe [2] in them.", 
        gaps: {
          "1": {prompt: "Verb form", options: [{text:"practice", isCorrect:false}, {text:"practices", isCorrect:true}, {text:"practicing", isCorrect:false}, {text:"is practice", isCorrect:false}]},
          "2": {prompt: "Verb form", options: [{text:"believe", isCorrect:false}, {text:"believes", isCorrect:true}, {text:"believing", isCorrect:false}, {text:"is believe", isCorrect:false}]}
        }, 
        explanation: "'The team' (singular colectivo a menudo) usa 'practices'. 'Their coach' (singular) usa 'believes'.", category: "Subject-Verb Agreement" 
      },
      // Sentence Restructuring (1)
      { id: "g1-10-sr", type: 'sentenceRestructuring', originalSentence: "The dog big barked at the mailman.", prompt: "Choose the sentence with the correct word order.", options: [{text:"Big the dog barked at the mailman.", isCorrect:false}, {text:"The big dog barked at the mailman.", isCorrect:true}, {text:"Barked the big dog at the mailman.", isCorrect:false}, {text:"The dog barked big at the mailman.", isCorrect:false}], explanation: "En inglés, los adjetivos ('big') generalmente preceden al sustantivo ('dog') que modifican.", category: "Word Order" },
    ]
  },
  // Section 2: Intermediate Structures (10 Qs)
  {
    id: 2,
    title: "Sección 2: Estructuras Intermedias",
    questions: [
      // Sentence Completion (4)
      { id: "g2-1-sc", type: 'sentenceCompletion', questionText: "If I ___ more time, I would travel the world.", options: [{text:"have", isCorrect:false}, {text:"had", isCorrect:true}, {text:"will have", isCorrect:false}, {text:"having", isCorrect:false}], explanation: "Esta es una oración condicional de segundo tipo (hipotética), que usa 'If + pasado simple, ...would + infinitivo'.", category: "Conditionals" },
      { id: "g2-2-sc", type: 'sentenceCompletion', questionText: "The book ___ I borrowed from the library is very interesting.", options: [{text:"who", isCorrect:false}, {text:"which", isCorrect:true}, {text:"whose", isCorrect:false}, {text:"whom", isCorrect:false}], explanation: "'Which' se usa como pronombre relativo para referirse a cosas (el libro).", category: "Relative Clauses" },
      { id: "g2-3-sc", type: 'sentenceCompletion', questionText: "She is interested ___ learning Japanese.", options: [{text:"on", isCorrect:false}, {text:"in", isCorrect:true}, {text:"about", isCorrect:false}, {text:"for", isCorrect:false}], explanation: "La preposición correcta después de 'interested' es 'in'.", category: "Prepositions" },
      { id: "g2-4-sc", type: 'sentenceCompletion', questionText: "He decided ___ a new car instead of a used one.", options: [{text:"buying", isCorrect:false}, {text:"to buy", isCorrect:true}, {text:"buy", isCorrect:false}, {text:"bought", isCorrect:false}], explanation: "El verbo 'decide' va seguido de un infinitivo con 'to'.", category: "Verb Patterns (Gerunds/Infinitives)" },
      // Error Identification (3)
      { id: "g2-5-ei", type: 'errorIdentification', sentenceParts: [{text:"The man",id:"A"}, {text:"which lives next door",id:"B"}, {text:"is a doctor.",id:"C"}, {text:"No error.",id:"D"}], errorPartId: "B", explanation: "Para referirse a personas en cláusulas relativas, se usa 'who' o 'that', no 'which'. Debería ser 'who lives' o 'that lives'.", category: "Relative Clauses" },
      { id: "g2-6-ei", type: 'errorIdentification', sentenceParts: [{text:"She enjoys",id:"A"}, {text:"to swim, to hike,",id:"B"}, {text:"and read books.",id:"C"}, {text:"No error.",id:"D"}], errorPartId: "C", explanation: "Para mantener el paralelismo con los gerundios ('swimming', 'hiking'), 'read books' debería ser 'reading books'.", category: "Parallelism" },
      { id: "g2-7-ei", type: 'errorIdentification', sentenceParts: [{text:"Despite of the rain,",id:"A"}, {text:"they decided",id:"B"}, {text:"to go for",id:"C"}, {text:"a walk.",id:"D"}], errorPartId: "A", explanation: "'Despite' no va seguido de 'of'. Se usa 'despite the rain' o 'in spite of the rain'.", category: "Conjunctions/Prepositions" },
      // Paragraph Editing (2)
      { id: "g2-8-pe", type: 'paragraphEditing', 
        paragraphText: "The city offers many attractions. For example, [1] is a famous museum. [2], there are beautiful parks.", 
        gaps: {
          "1": {prompt: "Pronoun choice", options: [{text:"it", isCorrect:false}, {text:"there", isCorrect:true}, {text:"here", isCorrect:false}, {text:"that", isCorrect:false}]},
          "2": {prompt: "Transition word", options: [{text:"However", isCorrect:false}, {text:"Additionally", isCorrect:true}, {text:"Therefore", isCorrect:false}, {text:"Nevertheless", isCorrect:false}]}
        }, 
        explanation: "'There is/are' se usa para indicar existencia. 'Additionally' (Además) añade más información.", category: "Transition Words" 
      },
      { id: "g2-9-pe", type: 'paragraphEditing', 
        paragraphText: "Learning a new language can be challenging. [1], it requires dedication. [2] effort, progress can be made.", 
        gaps: {
          "1": {prompt: "Connective", options: [{text:"However", isCorrect:false}, {text:"Indeed", isCorrect:true}, {text:"Unless", isCorrect:false}, {text:"Although", isCorrect:false}]},
          "2": {prompt: "Preposition", options: [{text:"By", isCorrect:false}, {text:"With", isCorrect:true}, {text:"From", isCorrect:false}, {text:"Into", isCorrect:false}]}
        }, 
        explanation: "'Indeed' (De hecho) refuerza la idea. 'With effort' (Con esfuerzo) es la frase correcta.", category: "Cohesion" 
      },
      // Sentence Restructuring (1)
      { id: "g2-10-sr", type: 'sentenceRestructuring', originalSentence: "Because the weather was bad, the picnic was cancelled.", prompt: "Rewrite using 'Due to'.", options: [{text:"Due to the bad weather, the picnic was cancelled.", isCorrect:true}, {text:"Due to the weather was bad, the picnic was cancelled.", isCorrect:false}, {text:"The picnic was cancelled due to the weather was bad.", isCorrect:false}, {text:"Bad weather due to, the picnic was cancelled.", isCorrect:false}], explanation: "'Due to' va seguido de una frase nominal ('the bad weather').", category: "Sentence Structure" },
    ]
  },
  // Section 3: Advanced Grammar (10 Qs)
  {
    id: 3,
    title: "Sección 3: Gramática Avanzada",
    questions: [
      // Sentence Completion (4)
      { id: "g3-1-sc", type: 'sentenceCompletion', questionText: "Not only ___ the exam, but she also received the highest score.", options: [{text:"she passed", isCorrect:false}, {text:"did she pass", isCorrect:true}, {text:"she did pass", isCorrect:false}, {text:"passed she", isCorrect:false}], explanation: "Cuando una oración comienza con 'Not only', se produce una inversión sujeto-verbo auxiliar ('did she pass').", category: "Inversions" },
      { id: "g3-2-sc", type: 'sentenceCompletion', questionText: "The project, ___ was completed last month, received positive feedback.", options: [{text:"that", isCorrect:false}, {text:"which", isCorrect:true}, {text:"it", isCorrect:false}, {text:"what", isCorrect:false}], explanation: "'Which' se usa en cláusulas relativas no restrictivas (separadas por comas) para referirse a cosas.", category: "Relative Clauses (Non-restrictive)" },
      { id: "g3-3-sc", type: 'sentenceCompletion', questionText: "___ he studied hard, he wouldn't have failed the test.", options: [{text:"If", isCorrect:false}, {text:"Had", isCorrect:true}, {text:"Unless", isCorrect:false}, {text:"Should", isCorrect:false}], explanation: "En condicionales de tercer tipo, 'If he had studied' puede invertirse como 'Had he studied'.", category: "Conditionals (Inversion)" },
      { id: "g3-4-sc", type: 'sentenceCompletion', questionText: "She insisted on ___ for the meal, despite our offers.", options: [{text:"pay", isCorrect:false}, {text:"paying", isCorrect:true}, {text:"to pay", isCorrect:false}, {text:"paid", isCorrect:false}], explanation: "Después de la preposición 'on', se usa un gerundio ('paying').", category: "Verb Patterns (Preposition + Gerund)" },
      // Error Identification (3)
      { id: "g3-5-ei", type: 'errorIdentification', sentenceParts: [{text:"Scarcely the rain had stopped",id:"A"}, {text:"when",id:"B"}, {text:"the sun came",id:"C"}, {text:"out.",id:"D"}], errorPartId: "A", explanation: "Con 'Scarcely...when', se usa inversión en la primera cláusula: 'Scarcely had the rain stopped...'.", category: "Inversions" },
      { id: "g3-6-ei", type: 'errorIdentification', sentenceParts: [{text:"The committee",id:"A"}, {text:"is comprised of",id:"B"}, {text:"experts from",id:"C"}, {text:"various fields.",id:"D"}], errorPartId: "B", explanation: "Aunque 'comprised of' es común, formalmente 'comprise' significa 'consistir en' y no necesita 'of'. Es mejor 'is composed of' o 'comprises'. Aquí, 'comprises' sería más conciso que 'is composed of'. Si el error es 'is comprised of', 'comprises' es la corrección ideal. La opción más simple es remover 'of'.", category: "Word Choice/Usage" },
      { id: "g3-7-ei", type: 'errorIdentification', sentenceParts: [{text:"Having finished his homework,",id:"A"}, {text:"the television",id:"B"}, {text:"was turned on",id:"C"}, {text:"by him.",id:"D"}], errorPartId: "B", explanation: "Esto es un 'dangling participle'. El sujeto de 'Having finished' (implícitamente 'he') debe ser el sujeto de la cláusula principal. Una corrección sería: 'Having finished his homework, he turned on the television'.", category: "Participle Clauses" },
      // Paragraph Editing (2)
      { id: "g3-8-pe", type: 'paragraphEditing', 
        paragraphText: "The report highlighted several key issues. [1], financial mismanagement was a major concern. [2] importance was the lack of strategic planning.", 
        gaps: {
          "1": {prompt: "Adverbial phrase", options: [{text:"Primarily", isCorrect:true}, {text:"Therefore", isCorrect:false}, {text:"Despite", isCorrect:false}, {text:"Although", isCorrect:false}]},
          "2": {prompt: "Phrase for emphasis", options: [{text:"Also of", isCorrect:false}, {text:"Of equal", isCorrect:true}, {text:"Next", isCorrect:false}, {text:"Moreover", isCorrect:false}]}
        }, 
        explanation: "'Primarily' indica el punto principal. 'Of equal importance' introduce otro punto con énfasis similar.", category: "Emphasis/Connectors" 
      },
      { id: "g3-9-pe", type: 'paragraphEditing', 
        paragraphText: "The ancient ruins, [1] for centuries, offered a glimpse into the past. Archaeologists worked [2] to uncover its secrets.", 
        gaps: {
          "1": {prompt: "Participle clause", options: [{text:"standing", isCorrect:true}, {text:"stood", isCorrect:false}, {text:"were standing", isCorrect:false}, {text:"to stand", isCorrect:false}]},
          "2": {prompt: "Adverb", options: [{text:"diligent", isCorrect:false}, {text:"diligently", isCorrect:true}, {text:"more diligent", isCorrect:false}, {text:"diligence", isCorrect:false}]}
        }, 
        explanation: "'Standing' (present participle) describe las ruinas. 'Diligently' (adverbio) modifica el verbo 'worked'.", category: "Participle Clauses/Adverbs" 
      },
      // Sentence Restructuring (1)
      { id: "g3-10-sr", type: 'sentenceRestructuring', originalSentence: "The artist is talented, and her work is innovative.", prompt: "Combine using 'not only... but also'.", options: [{text:"Not only the artist is talented, but also her work is innovative.", isCorrect:false}, {text:"The artist is not only talented, but her work is also innovative.", isCorrect:true}, {text:"Not only is the artist talented, but her work is also innovative.", isCorrect:false}, {text:"The artist is talented not only, but also her work is innovative.", isCorrect:false}], explanation: "La estructura correcta es '...not only [adjective/phrase], but also [adjective/phrase]...' o con inversión si 'Not only' inicia la oración. Aquí, la segunda opción es la más natural sin inversión forzada.", category: "Correlative Conjunctions" },
    ]
  },
  // Section 4: Contextual Usage (10 Qs)
  {
    id: 4,
    title: "Sección 4: Uso Contextual",
    questions: [
      // Sentence Completion (4)
      { id: "g4-1-sc", type: 'sentenceCompletion', questionText: "The study's findings were ___; they contradicted most previous research.", options: [{text:"predictable", isCorrect:false}, {text:"anomalous", isCorrect:true}, {text:"consistent", isCorrect:false}, {text:"trivial", isCorrect:false}], explanation: "'Anomalous' (anómalo) significa que se desvía de lo que es estándar, normal o esperado, lo cual encaja con contradecir investigaciones previas.", category: "Vocabulary in Context" },
      { id: "g4-2-sc", type: 'sentenceCompletion', questionText: "Despite the initial setbacks, the team showed remarkable ___ and completed the project.", options: [{text:"apathy", isCorrect:false}, {text:"resilience", isCorrect:true}, {text:"fragility", isCorrect:false}, {text:"indecision", isCorrect:false}], explanation: "'Resilience' (resiliencia) es la capacidad de recuperarse rápidamente de las dificultades, lo cual es apropiado aquí.", category: "Vocabulary in Context" },
      { id: "g4-3-sc", type: 'sentenceCompletion', questionText: "The professor's explanation was so ___ that even students new to the subject could understand it.", options: [{text:"convoluted", isCorrect:false}, {text:"lucid", isCorrect:true}, {text:"obscure", isCorrect:false}, {text:"esoteric", isCorrect:false}], explanation: "'Lucid' (lúcido) significa expresado claramente y fácil de entender.", category: "Vocabulary in Context" },
      { id: "g4-4-sc", type: 'sentenceCompletion', questionText: "The negotiations reached an ___ when neither side was willing to compromise.", options: [{text:"agreement", isCorrect:false}, {text:"impasse", isCorrect:true}, {text:"epiphany", isCorrect:false}, {text:"ovation", isCorrect:false}], explanation: "Un 'impasse' es una situación en la que no es posible ningún progreso, lo cual describe una negociación estancada.", category: "Vocabulary in Context" },
      // Error Identification (3)
      { id: "g4-5-ei", type: 'errorIdentification', sentenceParts: [{text:"The affect of the new policy",id:"A"}, {text:"was not immediately",id:"B"}, {text:"apparent to",id:"C"}, {text:"most employees.",id:"D"}], errorPartId: "A", explanation: "'Affect' es generalmente un verbo; el sustantivo correcto aquí es 'effect' (efecto).", category: "Word Choice (Affect/Effect)" },
      { id: "g4-6-ei", type: 'errorIdentification', sentenceParts: [{text:"There are less",id:"A"}, {text:"opportunities for",id:"B"}, {text:"advancement in this company",id:"C"}, {text:"than in others.",id:"D"}], errorPartId: "A", explanation: "'Opportunities' es un sustantivo contable plural, por lo que se debe usar 'fewer' en lugar de 'less'.", category: "Word Choice (Less/Fewer)" },
      { id: "g4-7-ei", type: 'errorIdentification', sentenceParts: [{text:"The manager, along with his team,",id:"A"}, {text:"were responsible",id:"B"}, {text:"for overseeing",id:"C"}, {text:"the project's budget.",id:"D"}], errorPartId: "B", explanation: "Cuando una frase como 'along with his team' separa el sujeto ('manager') del verbo, el verbo concuerda con el sujeto principal. 'Manager' es singular, por lo que el verbo debe ser 'was'.", category: "Subject-Verb Agreement (Interrupting Phrases)" },
      // Paragraph Editing (2)
      { id: "g4-8-pe", type: 'paragraphEditing', 
        paragraphText: "The novel received critical acclaim. [1], its complex plot was praised. [2], some readers found it difficult to follow.", 
        gaps: {
          "1": {prompt: "Connecting phrase", options: [{text:"Specifically", isCorrect:true}, {text:"However", isCorrect:false}, {text:"Therefore", isCorrect:false}, {text:"Because", isCorrect:false}]},
          "2": {prompt: "Contrastive conjunction", options: [{text:"Moreover", isCorrect:false}, {text:"On the other hand", isCorrect:true}, {text:"Consequently", isCorrect:false}, {text:"As a result", isCorrect:false}]}
        }, 
        explanation: "'Specifically' introduce un detalle específico del elogio. 'On the other hand' introduce un punto de vista contrastante.", category: "Transition Words" 
      },
      { id: "g4-9-pe", type: 'paragraphEditing', 
        paragraphText: "Effective communication is vital in any organization. [1] ensures that tasks are completed efficiently. [2], it fosters a positive work environment.", 
        gaps: {
          "1": {prompt: "Pronoun referring to communication", options: [{text:"He", isCorrect:false}, {text:"It", isCorrect:true}, {text:"They", isCorrect:false}, {text:"She", isCorrect:false}]},
          "2": {prompt: "Additive conjunction", options: [{text:"Furthermore", isCorrect:true}, {text:"Nevertheless", isCorrect:false}, {text:"Otherwise", isCorrect:false}, {text:"Hence", isCorrect:false}]}
        }, 
        explanation: "'It' se refiere a 'effective communication'. 'Furthermore' añade otra razón o beneficio.", category: "Cohesion/Pronoun Reference" 
      },
      // Sentence Restructuring (1)
      { id: "g4-10-sr", type: 'sentenceRestructuring', originalSentence: "The politician's speech was long; it was also boring.", prompt: "Combine into one sentence using a suitable conjunction.", options: [{text:"The politician's speech was long, but it was boring.", isCorrect:false}, {text:"The politician's speech was long and boring.", isCorrect:true}, {text:"The politician's speech was long, or it was boring.", isCorrect:false}, {text:"Although the politician's speech was long, it was boring.", isCorrect:false}], explanation: "'And' es adecuado para combinar dos atributos negativos o descriptivos de la misma cosa.", category: "Sentence Combining" },
    ]
  },
  // Section 5: Mixed Challenge (10 Qs)
  {
    id: 5,
    title: "Sección 5: Desafío Mixto",
    questions: [
      // Sentence Completion (4)
      { id: "g5-1-sc", type: 'sentenceCompletion', questionText: "Had it not been for her quick thinking, the situation ___ much worse.", options: [{text:"would be", isCorrect:false}, {text:"would have been", isCorrect:true}, {text:"will be", isCorrect:false}, {text:"is", isCorrect:false}], explanation: "Esto es una condición pasada irreal (tercer condicional) con inversión. La cláusula de resultado usa 'would have + participio pasado'.", category: "Conditionals (Mixed)" },
      { id: "g5-2-sc", type: 'sentenceCompletion', questionText: "The data, ___ from various sources, was analyzed meticulously.", options: [{text:"collecting", isCorrect:false}, {text:"collected", isCorrect:true}, {text:"was collected", isCorrect:false}, {text:"to collect", isCorrect:false}], explanation: "'Collected' es un participio pasado usado aquí para formar una cláusula participial reducida que modifica 'data'.", category: "Participle Clauses" },
      { id: "g5-3-sc", type: 'sentenceCompletion', questionText: "It's essential that every student ___ the assignment on time.", options: [{text:"submit", isCorrect:true}, {text:"submits", isCorrect:false}, {text:"submitted", isCorrect:false}, {text:"is submitting", isCorrect:false}], explanation: "En cláusulas con 'essential that', 'important that', etc., se usa la forma base del verbo (subjuntivo) para todos los sujetos.", category: "Subjunctive Mood" },
      { id: "g5-4-sc", type: 'sentenceCompletion', questionText: "Neither the manager ___ the employees were aware of the upcoming changes.", options: [{text:"or", isCorrect:false}, {text:"nor", isCorrect:true}, {text:"and", isCorrect:false}, {text:"but", isCorrect:false}], explanation: "La conjunción correlativa correcta es 'neither...nor'.", category: "Correlative Conjunctions" },
      // Error Identification (3)
      { id: "g5-5-ei", type: 'errorIdentification', sentenceParts: [{text:"The professor",id:"A"}, {text:"suggested that the students",id:"B"}, {text:"to review their notes",id:"C"}, {text:"before the exam.",id:"D"}], errorPartId: "C", explanation: "Después de 'suggested that [subject]', se usa la forma base del verbo (subjuntivo) o 'should + forma base'. 'To review' es incorrecto; debería ser 'review' o 'should review'.", category: "Subjunctive Mood/Verb Patterns" },
      { id: "g5-6-ei", type: 'errorIdentification', sentenceParts: [{text:"This new software",id:"A"}, {text:"is more superior",id:"B"}, {text:"than the",id:"C"}, {text:"previous version.",id:"D"}], errorPartId: "B", explanation: "'Superior' ya es comparativo y no necesita 'more'. Se dice 'is superior to'.", category: "Comparative Adjectives" },
      { id: "g5-7-ei", type: 'errorIdentification', sentenceParts: [{text:"Each of the candidates",id:"A"}, {text:"have",id:"B"}, {text:"their own unique",id:"C"}, {text:"strengths.",id:"D"}], errorPartId: "B", explanation: "'Each' es singular, por lo que el verbo debe ser 'has'.", category: "Subject-Verb Agreement (Each/Every)" },
      // Paragraph Editing (2)
      { id: "g5-8-pe", type: 'paragraphEditing', 
        paragraphText: "The company faced financial difficulties. [1], they had to reduce their workforce. [2], this decision was met with understanding from most employees.", 
        gaps: {
          "1": {prompt: "Result conjunction", options: [{text:"Consequently", isCorrect:true}, {text:"Nevertheless", isCorrect:false}, {text:"Meanwhile", isCorrect:false}, {text:"Besides", isCorrect:false}]},
          "2": {prompt: "Contrastive conjunction", options: [{text:"Therefore", isCorrect:false}, {text:"However", isCorrect:true}, {text:"Moreover", isCorrect:false}, {text:"Thus", isCorrect:false}]}
        }, 
        explanation: "'Consequently' (Por consiguiente) indica un resultado. 'However' (Sin embargo) introduce un contraste.", category: "Transition Words" 
      },
      { id: "g5-9-pe", type: 'paragraphEditing', 
        paragraphText: "The journey was long and arduous. [1] the challenges, the explorers persevered. Their determination [2] them to their destination.", 
        gaps: {
          "1": {prompt: "Prepositional phrase", options: [{text:"Despite", isCorrect:true}, {text:"Although", isCorrect:false}, {text:"Because of", isCorrect:false}, {text:"Unless", isCorrect:false}]},
          "2": {prompt: "Verb tense", options: [{text:"lead", isCorrect:false}, {text:"led", isCorrect:true}, {text:"leading", isCorrect:false}, {text:"leads", isCorrect:false}]}
        }, 
        explanation: "'Despite' (A pesar de) va seguido de una frase nominal. 'Led' es el pasado simple de 'lead'.", category: "Conjunctions/Prepositions/Tenses" 
      },
      // Sentence Restructuring (1)
      { id: "g5-10-sr", type: 'sentenceRestructuring', originalSentence: "The city has many historical sites. It also has vibrant nightlife.", prompt: "Combine using a semicolon and a conjunctive adverb.", options: [{text:"The city has many historical sites; furthermore, it has vibrant nightlife.", isCorrect:true}, {text:"The city has many historical sites, furthermore it has vibrant nightlife.", isCorrect:false}, {text:"The city has many historical sites; and it has vibrant nightlife.", isCorrect:false}, {text:"The city has many historical sites; so it has vibrant nightlife.", isCorrect:false}], explanation: "Un punto y coma (;) puede unir dos cláusulas independientes, y 'furthermore' (además) es un adverbio conjuntivo apropiado para añadir información.", category: "Punctuation/Sentence Combining" },
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

    