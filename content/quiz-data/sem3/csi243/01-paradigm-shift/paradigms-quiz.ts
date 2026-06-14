export const quizData = [
  {
    question: "What is the primary focus of the Imperative programming paradigm?",
    options: [
      "Evaluating mathematical functions without state changes.",
      "Describing a sequence of commands that change the program's state.",
      "Expressing programs as a set of facts and logical rules.",
      "Organizing software design around data and objects."
    ],
    correctIndex: 1,
    explanation: "The Imperative paradigm focuses on *how* to achieve a goal by describing sequential commands that mutate state."
  },
  {
    question: "Which of the following is NOT one of the four key concepts of the Object-Oriented paradigm?",
    options: [
      "Encapsulation",
      "Polymorphism",
      "Pattern Matching",
      "Inheritance"
    ],
    correctIndex: 2,
    explanation: "The four key concepts of OOP are Abstraction, Encapsulation, Inheritance, and Polymorphism. Pattern matching is a functional/logic concept."
  },
  {
    question: "The Logic programming paradigm is fundamentally based on which mathematical concept?",
    options: [
      "Lambda calculus",
      "Graph theory",
      "Formal logic and logical deduction",
      "Boolean algebra"
    ],
    correctIndex: 2,
    explanation: "The Logic paradigm is based on formal logic, where programs are expressed as facts and rules, and computation is logical deduction."
  },
  {
    question: "How does the Functional paradigm fundamentally treat computation?",
    options: [
      "As the execution of sequential memory operations.",
      "As the evaluation of mathematical functions, avoiding state changes.",
      "As the manipulation of objects through method calls.",
      "As the unification of logical predicates."
    ],
    correctIndex: 1,
    explanation: "The Functional paradigm treats computation as the evaluation of mathematical functions and avoids changing state and mutable data."
  },
  {
    question: "What is the defining characteristic of a declarative paradigm?",
    options: [
      "It focuses on *how* to compute a result step-by-step.",
      "It focuses on *what* to compute, rather than the control flow.",
      "It relies heavily on mutable global state.",
      "It requires explicit memory management."
    ],
    correctIndex: 1,
    explanation: "A declarative paradigm focuses on *what* to compute, abstracting away the underlying control flow and state mutations."
  },
  {
    question: "In the Von Neumann architecture, what connects the CPU and memory?",
    options: [
      "A dedicated cache bus",
      "A shared bus",
      "A direct register link",
      "A fiber optic channel"
    ],
    correctIndex: 1,
    explanation: "In the Von Neumann architecture, the CPU and memory are separated by a shared bus, which is the source of the Von Neumann bottleneck."
  },
  {
    question: "What did John Backus identify as the 'Von Neumann bottleneck'?",
    options: [
      "The limited number of registers in the CPU.",
      "The performance limitation caused by repeatedly shuttling data across the shared bus between CPU and memory.",
      "The slow speed of the arithmetic logic unit (ALU).",
      "The inability of the CPU to execute instructions in parallel."
    ],
    correctIndex: 1,
    explanation: "Backus identified the bottleneck as the performance limitation caused by the constant fetching and storing of data across the shared bus."
  },
  {
    question: "Which sequence correctly represents the imperative execution cycle?",
    options: [
      "DECODE, FETCH, STORE, EXECUTE",
      "FETCH, DECODE, EXECUTE, STORE",
      "EXECUTE, FETCH, DECODE, STORE",
      "STORE, FETCH, EXECUTE, DECODE"
    ],
    correctIndex: 1,
    explanation: "The standard Von Neumann execution cycle is FETCH, DECODE, EXECUTE, STORE."
  },
  {
    question: "What is the underlying execution model of Functional Programming?",
    options: [
      "The fetch-execute cycle",
      "Graph reduction and β-reduction",
      "Object instantiation and method dispatch",
      "Logical unification and backtracking"
    ],
    correctIndex: 1,
    explanation: "Functional execution relies on graph reduction and β-reduction, evaluating expressions by substituting arguments until a value is reached."
  },
  {
    question: "Which paradigm relies on facts, rules, and unification?",
    options: [
      "Imperative",
      "Object-Oriented",
      "Logic",
      "Functional"
    ],
    correctIndex: 2,
    explanation: "The Logic paradigm relies on facts, rules, unification, and backtracking to perform computation."
  },
  {
    question: "What is the primary mechanism for code reuse in the Object-Oriented paradigm?",
    options: [
      "Function composition",
      "Higher-order functions",
      "Inheritance",
      "Logical deduction"
    ],
    correctIndex: 2,
    explanation: "Inheritance is the mechanism where a new class derives properties and characteristics from an existing class, facilitating code reuse in OOP."
  },
  {
    question: "Polymorphism in OOP allows objects to:",
    options: [
      "Share the same memory address.",
      "Respond to the same method call in their own specific way.",
      "Change their internal state without methods.",
      "Bypass encapsulation rules."
    ],
    correctIndex: 1,
    explanation: "Polymorphism is the ability of different objects to respond to the same method call in their own specific way."
  },
  {
    question: "Encapsulation in OOP restricts:",
    options: [
      "The use of inheritance.",
      "Direct access to internal state by bundling data and methods.",
      "The number of methods a class can have.",
      "The polymorphic behavior of objects."
    ],
    correctIndex: 1,
    explanation: "Encapsulation bundles data and methods, restricting direct access to the internal state of an object."
  },
  {
    question: "Which of the following languages is explicitly classified under the Functional paradigm?",
    options: [
      "Prolog",
      "Java",
      "Haskell",
      "C++"
    ],
    correctIndex: 2,
    explanation: "Haskell, along with Lisp and Erlang, is explicitly classified under the Functional paradigm."
  },
  {
    question: "Which of the following languages is explicitly classified under the Logic paradigm?",
    options: [
      "Lisp",
      "Prolog",
      "Python",
      "Erlang"
    ],
    correctIndex: 1,
    explanation: "Prolog is explicitly classified under the Logic paradigm."
  }
];