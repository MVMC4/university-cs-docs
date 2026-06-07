export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is a Functor in Haskell?",
    options: [
      "A module that returns other modules",
      "A structure or context that can be mapped over using `fmap`",
      "A recursive data type",
      "A loop construct"
    ],
    correctIndex: 1,
    explanation: "A Functor abstracts the concept of applying a function to values inside a context (like a List or Maybe) without altering the context's structure."
  },
  {
    question: "What distinguishes a Monad from a Functor?",
    options: [
      "Monads can handle multiple arguments simultaneously",
      "Monads allow sequencing of dependent computations via the `>>=` (bind) operator",
      "Monads are untyped",
      "Monads cannot use `fmap`"
    ],
    correctIndex: 1,
    explanation: "While Functors apply independent transformations, Monads allow the output of one effectful computation to determine the next computation, enabling chaining."
  },
  {
    question: "What does the type `IO a` represent?",
    options: [
      "A pure string value",
      "A recipe or description of an action that, when executed, yields a value of type `a`",
      "An unrecoverable runtime error",
      "A global mutable variable"
    ],
    correctIndex: 1,
    explanation: "`IO` separates pure math from impure reality. An `IO a` value is not the result itself, but a description of how to get it."
  },
  {
    question: "What does `fmap (*2) (Just 5)` evaluate to?",
    options: ["10", "Just 10", "Nothing", "A type error"],
    correctIndex: 1,
    explanation: "`fmap` applies the function `(*2)` to the value inside the `Just` context, preserving the `Just` wrapper."
  },
  {
    question: "Which syntactic construct is used to sequence Monadic actions cleanly?",
    options: ["for-loops", "do-notation", "while-loops", "try/catch blocks"],
    correctIndex: 1,
    explanation: "`do` blocks provide imperative-looking syntax that the compiler desugars into chained `>>=` (bind) operations."
  }
];