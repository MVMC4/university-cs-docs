export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the 'Von Neumann Bottleneck'?",
    options: [
      "The physical limit of silicon transistor size",
      "The disparity between CPU processing speed and shared memory bus speed",
      "The inability of functional languages to compile to machine code",
      "The maximum size of modern hard drives"
    ],
    correctIndex: 1,
    explanation: "Imperative code mirrors the Von Neumann architecture, where the CPU must constantly fetch and mutate shared memory across a bus, creating a performance bottleneck."
  },
  {
    question: "Which of the following best describes 'Referential Transparency'?",
    options: [
      "Using highly descriptive and clear variable names",
      "Replacing an expression with its evaluated value without changing program behavior",
      "Making all source code open-source and publicly available",
      "Writing extensive comments to explain complex logic"
    ],
    correctIndex: 1,
    explanation: "Referential transparency means an expression can be substituted with its resulting value (or vice versa) without altering the program's outcome, a direct result of using pure functions."
  },
  {
    question: "Lambda Calculus, the mathematical foundation of functional programming, was developed by:",
    options: [
      "Alonzo Church",
      "Alan Turing",
      "John von Neumann",
      "Haskell Curry"
    ],
    correctIndex: 0,
    explanation: "Alonzo Church developed Lambda Calculus in the 1930s as a formal system for expressing computation based on function abstraction and application."
  },
  {
    question: "Which of the following is considered a 'side effect' in programming?",
    options: [
      "Returning a computed integer value",
      "Pattern matching on an Algebraic Data Type",
      "Modifying a global variable or writing to a file",
      "Currying a function to accept arguments one at a time"
    ],
    correctIndex: 2,
    explanation: "Side effects are operations that alter state outside the function's local scope, such as mutating global variables, performing I/O, or throwing unhandled exceptions."
  },
  {
    question: "Why does Functional Programming handle concurrency more safely than Imperative Programming?",
    options: [
      "It utilizes faster and more advanced locking mechanisms",
      "It is designed to run exclusively on single-core processors",
      "It silently ignores runtime errors to maintain execution flow",
      "It inherently lacks shared mutable state, preventing race conditions"
    ],
    correctIndex: 3,
    explanation: "Because functional programming relies on immutable data and pure functions, multiple threads can evaluate expressions simultaneously without the risk of race conditions or deadlocks."
  }
];