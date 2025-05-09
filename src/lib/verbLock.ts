
export type VerbFormDetail = {
  correct: string;
  commonMistake?: string; // A common misspelling or error for THIS specific correct form
};

export type DistractorPools = {
  spanishInfinitives: readonly string[];
  englishBases: readonly string[];
  englishPastSimples: readonly string[];
  englishPastParticiples: readonly string[];
};

export interface VerbLockSource {
  id: number;
  spanishInfinitive: VerbFormDetail;
  englishBase: VerbFormDetail;
  englishPastSimple: VerbFormDetail;
  englishPastParticiple: VerbFormDetail;
  gerund: string;
}

// This will be the type of object constructed by GameEngine and passed to VerbLockGame
export interface VerbLockChallenge {
  id: number;
  spanishDisplayTitle: string; // from spanishInfinitive.correct, for the lock title
  englishBaseDisplayTitle: string; // from englishBase.correct, for the lock title
  options: {
    key1: readonly string[]; // 5 options for Spanish Infinitive tumbler
    key2: readonly string[]; // 5 options for English Base Form tumbler
    key3: readonly string[]; // 5 options for English Past Simple tumbler
    key4: readonly string[]; // 5 options for English Past Participle tumbler
  };
  correctIndices: readonly [number, number, number, number]; // Index of the correct option in each of the above shuffled lists
  gerund: string;
}


// Global pool of distractors (can be expanded for more variety)
export const globalDistractorPools: DistractorPools = {
  spanishInfinitives: ["comer", "vivir", "tener", "hacer", "cantar", "correr", "bailar", "aprender", "jugar", "decir", "poder", "querer", "saber", "poner", "traducir", "enviar", "recibir", "leer", "estar", "venir", "partir", "volver", "mirar", "observar", "notar", "escuchar", "sentir", "tomar", "ofrecer", "pedir", "prestar", "ignorar", "recordar", "conocer", "amar", "desear", "odiar", "preferir", "necesitar", "viajar", "entrar", "salir", "ocurrir", "cruzar", "detener", "esperar", "faltar", "pagar", "cumplir", "quitar", "colocar", "sacar", "mover", "dejar", "lucir", "sonar", "verse", "opinar", "permanecer", "restar", "ajustar", "encajar", "dudar", "suponer", "imaginar", "confiar", "transportar", "usar (ropa)", "conducir", "agarrar"],
  englishBases: ["eat", "live", "have", "do", "sing", "run", "dance", "learn", "play", "say", "can", "want", "know", "put", "translate", "send", "receive", "read", "be (state)", "come", "depart", "return", "watch", "observe", "notice", "listen", "feel", "take", "offer", "ask for", "lend", "ignore", "remember", "meet", "love", "wish", "hate", "prefer", "need", "travel", "enter", "exit", "happen", "cross", "stop", "wait", "miss", "pay", "fulfill", "remove", "place", "take out", "move", "leave", "look (like)", "sound", "appear", "opine", "remain", "be left", "fit", "match", "doubt", "suppose", "imagine", "trust", "transport", "wear", "drive", "grab"],
  englishPastSimples: ["ate", "lived", "had", "did", "sang", "ran", "danced", "learnt", "played", "said", "could", "wanted", "knew", "put", "translated", "sent", "received", "read", "was", "came", "departed", "returned", "watched", "observed", "noticed", "listened", "felt", "took", "offered", "asked", "lent", "ignored", "remembered", "met", "loved", "wished", "hated", "preferred", "needed", "travelled", "entered", "exited", "happened", "crossed", "stopped", "waited", "missed", "paid", "fulfilled", "removed", "placed", "took out", "moved", "left", "looked", "sounded", "appeared", "opined", "remained", "was left", "fitted", "matched", "doubted", "supposed", "imagined", "thought", "trusted", "transported", "wore", "drove", "grabbed"],
  englishPastParticiples: ["eaten", "lived", "had", "done", "sung", "run", "danced", "learnt", "played", "said", "could (modal)", "wanted", "known", "put", "translated", "sent", "received", "read", "been", "come", "departed", "returned", "watched", "observed", "noticed", "listened", "felt", "taken", "offered", "asked", "lent", "ignored", "remembered", "met", "loved", "wished", "hated", "preferred", "needed", "travelled", "entered", "exited", "happened", "crossed", "stopped", "waited", "missed", "paid", "fulfilled", "removed", "placed", "taken out", "moved", "left", "looked", "sounded", "appeared", "opined", "remained", "been left", "fitted", "matched", "doubted", "supposed", "imagined", "thought", "trusted", "transported", "worn", "driven", "grabbed"],
};

let nextId = 400; // Starting ID for verb locks
export const verbLockSources: readonly VerbLockSource[] = [
  {
    id: nextId++,
    spanishInfinitive: { correct: "hablar", commonMistake: "ablar" },
    englishBase: { correct: "speak", commonMistake: "speek" },
    englishPastSimple: { correct: "spoke", commonMistake: "spoked" },
    englishPastParticiple: { correct: "spoken", commonMistake: "speaked" },
    gerund: "speaking"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "romper", commonMistake: "ronper" },
    englishBase: { correct: "break", commonMistake: "brake" },
    englishPastSimple: { correct: "broke", commonMistake: "breaked" },
    englishPastParticiple: { correct: "broken", commonMistake: "broked" },
    gerund: "breaking"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "comer", commonMistake: "commer" },
    englishBase: { correct: "eat", commonMistake: "eet" },
    englishPastSimple: { correct: "ate", commonMistake: "eated" },
    englishPastParticiple: { correct: "eaten", commonMistake: "ate" }, // 'ate' can be a mistake for p.p.
    gerund: "eating"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "vivir", commonMistake: "vibir" },
    englishBase: { correct: "live", commonMistake: "life" },
    englishPastSimple: { correct: "lived", commonMistake: "livd" },
    englishPastParticiple: { correct: "lived", commonMistake: "lifed" },
    gerund: "living"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "tener", commonMistake: "tenner" },
    englishBase: { correct: "have", commonMistake: "haf" },
    englishPastSimple: { correct: "had", commonMistake: "haved" },
    englishPastParticiple: { correct: "had", commonMistake: "haden" },
    gerund: "having"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "escribir", commonMistake: "escribir" }, // No obvious common mistake
    englishBase: { correct: "write", commonMistake: "rite" },
    englishPastSimple: { correct: "wrote", commonMistake: "writed" },
    englishPastParticiple: { correct: "written", commonMistake: "wrote" }, // 'wrote' can be mistake for p.p.
    gerund: "writing"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "ser", commonMistake: "cer" },
    englishBase: { correct: "be", commonMistake: "bee" },
    englishPastSimple: { correct: "was/were", commonMistake: "was" }, // 'was' alone is incomplete if 'were' is needed
    englishPastParticiple: { correct: "been", commonMistake: "bein" },
    gerund: "being"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "ir", commonMistake: "hacer" }, // Confused with "to do/make"
    englishBase: { correct: "go", commonMistake: "goed" },
    englishPastSimple: { correct: "went", commonMistake: "gone" }, // 'gone' is p.p.
    englishPastParticiple: { correct: "gone", commonMistake: "went" }, // 'went' is simple past
    gerund: "going"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "ver", commonMistake: "veer" },
    englishBase: { correct: "see", commonMistake: "sea" },
    englishPastSimple: { correct: "saw", commonMistake: "seed" },
    englishPastParticiple: { correct: "seen", commonMistake: "saw" }, // 'saw' is simple past
    gerund: "seeing"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "dar", commonMistake: "darr" },
    englishBase: { correct: "give", commonMistake: "gif" },
    englishPastSimple: { correct: "gave", commonMistake: "gived" },
    englishPastParticiple: { correct: "given", commonMistake: "gave" }, // 'gave' is simple past
    gerund: "giving"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "saber", commonMistake: "savier" },
    englishBase: { correct: "know", commonMistake: "no" }, // Homophone
    englishPastSimple: { correct: "knew", commonMistake: "knowed" },
    englishPastParticiple: { correct: "known", commonMistake: "knew" }, // 'knew' is simple past
    gerund: "knowing"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "querer", commonMistake: "qerer" },
    englishBase: { correct: "want", commonMistake: "wont" }, // Common confusion
    englishPastSimple: { correct: "wanted", commonMistake: "wantd" },
    englishPastParticiple: { correct: "wanted", commonMistake: "want" },
    gerund: "wanting"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "llegar", commonMistake: "yegar" }, // Phonetic spelling
    englishBase: { correct: "arrive", commonMistake: "arive" },
    englishPastSimple: { correct: "arrived", commonMistake: "arrivd" },
    englishPastParticiple: { correct: "arrived", commonMistake: "arriven" },
    gerund: "arriving"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "pasar", commonMistake: "pazar" },
    englishBase: { correct: "pass", commonMistake: "pas" }, // Missing 's'
    englishPastSimple: { correct: "passed", commonMistake: "past" }, // Common confusion with noun
    englishPastParticiple: { correct: "passed", commonMistake: "passd" },
    gerund: "passing"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "deber", commonMistake: "dever" },
    englishBase: { correct: "must", commonMistake: "should" }, // Semantic, not orthographic
    englishPastSimple: { correct: "had to", commonMistake: "musted" }, // Incorrect formation
    englishPastParticiple: { correct: "had to", commonMistake: "must have" }, // Modals are tricky
    gerund: "owing" // Or "having to"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "poner", commonMistake: "ponner" },
    englishBase: { correct: "put", commonMistake: "putt" },
    englishPastSimple: { correct: "put", commonMistake: "putted" },
    englishPastParticiple: { correct: "put", commonMistake: "putten" },
    gerund: "putting"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "parecer", commonMistake: "parezer" },
    englishBase: { correct: "seem", commonMistake: "seam" }, // Homophone
    englishPastSimple: { correct: "seemed", commonMistake: "seemd" },
    englishPastParticiple: { correct: "seemed", commonMistake: "seemen" },
    gerund: "seeming"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "quedar", commonMistake: "qedar" },
    englishBase: { correct: "stay", commonMistake: "stai" },
    englishPastSimple: { correct: "stayed", commonMistake: "staid" }, // Archaic word
    englishPastParticiple: { correct: "stayed", commonMistake: "stayd" },
    gerund: "staying"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "creer", commonMistake: "creer" }, // No common mistake
    englishBase: { correct: "believe", commonMistake: "beleive" }, // Common i/e swap
    englishPastSimple: { correct: "believed", commonMistake: "believd" },
    englishPastParticiple: { correct: "believed", commonMistake: "belieft" },
    gerund: "believing"
  },
  {
    id: nextId++,
    spanishInfinitive: { correct: "llevar", commonMistake: "yevar" }, // Phonetic
    englishBase: { correct: "carry", commonMistake: "cary" },
    englishPastSimple: { correct: "carried", commonMistake: "carryed" }, // Incorrect -y ending
    englishPastParticiple: { correct: "carried", commonMistake: "caried" },
    gerund: "carrying"
  }
] as const;
