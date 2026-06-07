export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is lazy evaluation in Haskell?",
    options: [
      "Executing code as fast as possible on multiple cores",
      "Delaying computation until the result is actually needed, storing it as a thunk",
      "Ignoring runtime errors to maintain execution flow",
      "Compiling code without type checking"
    ],
    correctIndex: 1,
    explanation: "Lazy evaluation enables infinite data structures and avoids unnecessary work by only evaluating expressions when their values are demanded."
  },
  {
    question: "What is a 'thunk'?",
    options: [
      "A type of infinite loop",
      "An unevaluated expression or suspended computation",
      "A specific type of runtime error",
      "A build framework like Stack"
    ],
    correctIndex: 1,
    explanation: "Thunks are pointers to code that represent delayed work. They are evaluated only when needed."
  },
  {
    question: "What is the time complexity of the `map` function on a list of length n?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctIndex: 2,
    explanation: "`map` applies the given function to each of the n elements exactly once, resulting in linear O(n) time complexity."
  },
  {
    question: "How do you prevent space leaks when folding over large lists?",
    options: [
      "Use `map` instead of `fold`",
      "Use the strict `foldl'` from `Data.List`",
      "Store intermediate results in global variables",
      "Avoid recursion entirely"
    ],
    correctIndex: 1,
    explanation: "`foldl'` forces the evaluation of the accumulator at each step, preventing the buildup of large chains of unevaluated thunks."
  },
  {
    question: "What does WHNF stand for in the context of strict evaluation?",
    options: [
      "Whole Head Normal Form",
      "Weak Head Normal Form",
      "Wide Haskell Normal Function",
      "Working Heap Normal Format"
    ],
    correctIndex: 1,
    explanation: "Weak Head Normal Form means the expression has been evaluated just enough to reveal its outermost constructor, preventing thunk buildup."
  }
];