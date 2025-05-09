
export type VerbLockOptionKey = 'key1' | 'key2' | 'key3' | 'key4';

export interface VerbLock {
  spanish: string;
  options: {
    key1: readonly [string, string, string, string, string]; // Spanish Infinitive options
    key2: readonly [string, string, string, string, string]; // English Base Form options
    key3: readonly [string, string, string, string, string]; // English Past Simple options
    key4: readonly [string, string, string, string, string]; // English Past Participle options
  };
  correctIndices: readonly [number, number, number, number]; // Index of correct option for key1, key2, key3, key4
  gerund: string; // English Gerund form
  id: number; // Unique ID for each verb lock
}

let nextId = 400; // Starting ID for verb locks to avoid collision with other games

export const verbLocks: readonly VerbLock[] = [
  // Regular Verb
  {
    id: nextId++,
    spanish: "hablar",
    options: {
      key1: ["hablar", "comer", "vivir", "tener", "hacer"],
      key2: ["speak", "eat", "live", "have", "do"],
      key3: ["spoke", "ate", "lived", "had", "did"], // Note: 'lived' is regular, 'spoke' is for 'speak'
      key4: ["spoken", "eaten", "lived", "had", "done"]
    },
    correctIndices: [0, 0, 2, 0], // hablar -> speak -> lived (as per options) -> spoken
    gerund: "speaking"
  },
  // Irregular Verb
  {
    id: nextId++,
    spanish: "romper",
    options: {
      key1: ["romper", "escribir", "ver", "ser", "ir"],
      key2: ["break", "write", "see", "be", "go"],
      key3: ["broke", "wrote", "saw", "was", "went"],
      key4: ["broken", "written", "seen", "been", "gone"]
    },
    correctIndices: [0, 0, 0, 0], // romper -> break -> broke -> broken
    gerund: "breaking"
  },
  {
    id: nextId++,
    spanish: "comer",
    options: {
        key1: ["cantar", "comer", "beber", "correr", "bailar"],
        key2: ["sing", "eat", "drink", "run", "dance"],
        key3: ["sang", "ate", "drank", "ran", "danced"],
        key4: ["sung", "eaten", "drunk", "run", "danced"],
    },
    correctIndices: [1, 1, 1, 1], // comer -> eat -> ate -> eaten
    gerund: "eating"
  },
  {
    id: nextId++,
    spanish: "vivir",
    options: {
        key1: ["trabajar", "estudiar", "vivir", "aprender", "jugar"],
        key2: ["work", "study", "live", "learn", "play"],
        key3: ["worked", "studied", "lived", "learnt", "played"], // or learned
        key4: ["worked", "studied", "lived", "learnt", "played"], // or learned
    },
    correctIndices: [2, 2, 2, 2], // vivir -> live -> lived -> lived
    gerund: "living"
  },
  {
    id: nextId++,
    spanish: "tener",
    options: {
        key1: ["necesitar", "querer", "tener", "poder", "deber"],
        key2: ["need", "want", "have", "can", "must"],
        key3: ["needed", "wanted", "had", "could", "had to"],
        key4: ["needed", "wanted", "had", "could", "had to"],
    },
    correctIndices: [2, 2, 2, 2], // tener -> have -> had -> had
    gerund: "having"
  },
  {
    id: nextId++,
    spanish: "escribir",
    options: {
        key1: ["leer", "escribir", "traducir", "enviar", "recibir"],
        key2: ["read", "write", "translate", "send", "receive"],
        key3: ["read", "wrote", "translated", "sent", "received"],
        key4: ["read", "written", "translated", "sent", "received"],
    },
    correctIndices: [1, 1, 1, 1], // escribir -> write -> wrote -> written
    gerund: "writing"
  },
  {
    id: nextId++,
    spanish: "ser", // to be (essence)
    options: {
        key1: ["ser", "estar", "ir", "ver", "dar"],
        key2: ["be", "be (location/state)", "go", "see", "give"],
        key3: ["was/were", "was/were", "went", "saw", "gave"],
        key4: ["been", "been", "gone", "seen", "given"],
    },
    correctIndices: [0, 0, 0, 0], // ser -> be -> was/were -> been
    gerund: "being"
  },
  {
    id: nextId++,
    spanish: "ir",
    options: {
        key1: ["venir", "llegar", "ir", "partir", "volver"],
        key2: ["come", "arrive", "go", "leave", "return"],
        key3: ["came", "arrived", "went", "left", "returned"],
        key4: ["come", "arrived", "gone", "left", "returned"],
    },
    correctIndices: [2, 2, 2, 2], // ir -> go -> went -> gone
    gerund: "going"
  },
  {
    id: nextId++,
    spanish: "ver",
    options: {
        key1: ["mirar", "observar", "ver", "notar", "escuchar"],
        key2: ["watch", "observe", "see", "notice", "listen"],
        key3: ["watched", "observed", "saw", "noticed", "listened"],
        key4: ["watched", "observed", "seen", "noticed", "listened"],
    },
    correctIndices: [2, 2, 2, 2], // ver -> see -> saw -> seen
    gerund: "seeing"
  },
  {
    id: nextId++,
    spanish: "dar",
    options: {
        key1: ["recibir", "tomar", "dar", "ofrecer", "pedir"],
        key2: ["receive", "take", "give", "offer", "ask for"],
        key3: ["received", "took", "gave", "offered", "asked for"],
        key4: ["received", "taken", "given", "offered", "asked for"],
    },
    correctIndices: [2, 2, 2, 2], // dar -> give -> gave -> given
    gerund: "giving"
  },
  {
    id: nextId++,
    spanish: "saber", // to know (facts/information)
    options: {
        key1: ["aprender", "entender", "saber", "ignorar", "recordar"],
        key2: ["learn", "understand", "know", "ignore", "remember"],
        key3: ["learnt", "understood", "knew", "ignored", "remembered"],
        key4: ["learnt", "understood", "known", "ignored", "remembered"],
    },
    correctIndices: [2, 2, 2, 2], // saber -> know -> knew -> known
    gerund: "knowing"
  },
  {
    id: nextId++,
    spanish: "querer",
    options: {
        key1: ["amar", "desear", "querer", "odiar", "preferir"],
        key2: ["love", "wish", "want", "hate", "prefer"],
        key3: ["loved", "wished", "wanted", "hated", "preferred"],
        key4: ["loved", "wished", "wanted", "hated", "preferred"],
    },
    correctIndices: [2, 2, 2, 2], // querer -> want -> wanted -> wanted
    gerund: "wanting"
  },
  {
    id: nextId++,
    spanish: "llegar",
    options: {
        key1: ["partir", "viajar", "llegar", "entrar", "salir"],
        key2: ["depart", "travel", "arrive", "enter", "exit"],
        key3: ["departed", "travelled", "arrived", "entered", "exited"],
        key4: ["departed", "travelled", "arrived", "entered", "exited"],
    },
    correctIndices: [2, 2, 2, 2], // llegar -> arrive -> arrived -> arrived
    gerund: "arriving"
  },
  {
    id: nextId++,
    spanish: "pasar", // to pass, to happen
    options: {
        key1: ["ocurrir", "cruzar", "pasar", "detener", "esperar"],
        key2: ["happen", "cross", "pass", "stop", "wait"],
        key3: ["happened", "crossed", "passed", "stopped", "waited"],
        key4: ["happened", "crossed", "passed", "stopped", "waited"],
    },
    correctIndices: [2, 2, 2, 2], // pasar -> pass -> passed -> passed
    gerund: "passing"
  },
  {
    id: nextId++,
    spanish: "deber", // to owe, must/should
    options: {
        key1: ["poder", "necesitar", "deber", "pagar", "cumplir"],
        key2: ["can", "need", "must/should", "pay", "fulfill"], // "must" is modal, "should" is modal
        key3: ["could", "needed", "had to/should have", "paid", "fulfilled"], // Tricky due to modal nature
        key4: ["could", "needed", "had to/should have", "paid", "fulfilled"],
    },
    correctIndices: [2, 2, 2, 2], // deber -> must/should -> had to / should have
    gerund: "owing/musting (not common for obligation)"
  },
  {
    id: nextId++,
    spanish: "poner",
    options: {
        key1: ["quitar", "colocar", "poner", "sacar", "mover"],
        key2: ["remove", "place", "put", "take out", "move"],
        key3: ["removed", "placed", "put", "took out", "moved"],
        key4: ["removed", "placed", "put", "taken out", "moved"],
    },
    correctIndices: [2, 2, 2, 2], // poner -> put -> put -> put
    gerund: "putting"
  },
  {
    id: nextId++,
    spanish: "parecer",
    options: {
        key1: ["lucir", "sentirse", "parecer", "sonar", "verse"],
        key2: ["look (like)", "feel", "seem", "sound", "appear"],
        key3: ["looked", "felt", "seemed", "sounded", "appeared"],
        key4: ["looked", "felt", "seemed", "sounded", "appeared"],
    },
    correctIndices: [2, 2, 2, 2], // parecer -> seem -> seemed -> seemed
    gerund: "seeming"
  },
  {
    id: nextId++,
    spanish: "quedar", // to stay, to remain, to fit
    options: {
        key1: ["permanecer", "restar", "quedar", "ajustar", "salir"],
        key2: ["remain", "be left", "stay", "fit", "leave"],
        key3: ["remained", "was left", "stayed", "fitted", "left"],
        key4: ["remained", "been left", "stayed", "fitted", "left"],
    },
    correctIndices: [2, 2, 2, 2], // quedar -> stay -> stayed -> stayed (one common meaning)
    gerund: "staying"
  },
  {
    id: nextId++,
    spanish: "creer",
    options: {
        key1: ["dudar", "suponer", "creer", "imaginar", "pensar"],
        key2: ["doubt", "suppose", "believe", "imagine", "think"],
        key3: ["doubted", "supposed", "believed", "imagined", "thought"],
        key4: ["doubted", "supposed", "believed", "imagined", "thought"],
    },
    correctIndices: [2, 2, 2, 2], // creer -> believe -> believed -> believed
    gerund: "believing"
  },
  {
    id: nextId++,
    spanish: "llevar", // to carry, to wear, to take (time)
    options: {
        key1: ["transportar", "usar (ropa)", "llevar", "traer", "conducir"],
        key2: ["transport", "wear", "carry/take", "bring", "drive"],
        key3: ["transported", "wore", "carried/took", "brought", "drove"],
        key4: ["transported", "worn", "carried/taken", "brought", "driven"],
    },
    correctIndices: [2, 2, 2, 2], // llevar -> carry/take -> carried/took -> carried/taken
    gerund: "carrying/taking"
  }
] as const;
