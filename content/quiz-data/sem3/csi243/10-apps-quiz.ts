export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "Which tools are standard for managing Haskell dependencies and GHC versions?",
    options: ["npm / yarn", "pip / venv", "Stack / Cabal", "Maven / Gradle"],
    correctIndex: 2,
    explanation: "Stack and Cabal are the standard build tools and package managers in the Haskell ecosystem."
  },
  {
    question: "To prove a custom `Functor` instance is valid, you must mathematically prove:",
    options: [
      "That the code compiles without warnings",
      "The Identity and Composition laws",
      "That it uses the `map` function internally",
      "That it executes in O(1) time"
    ],
    correctIndex: 1,
    explanation: "Functor laws (Identity and Composition) are mathematical guarantees that ensure the `fmap` implementation behaves predictably and preserves structure."
  },
  {
    question: "What does the type signature `main :: IO ()` signify?",
    options: [
      "A pure mathematical function",
      "The entry point of an impure application that performs side effects",
      "A compile-time type error",
      "An empty list"
    ],
    correctIndex: 1,
    explanation: "Every executable Haskell application must start with an `IO` action. `()` indicates it returns no meaningful value, similar to `void` in C/Java."
  },
  {
    question: "In the Tree Functor proof, what is the base case?",
    options: ["Node a l r", "Empty", "Leaf a", "Nil"],
    correctIndex: 1,
    explanation: "Structural induction on the `Tree` type begins with the simplest constructor, which is `Empty`."
  },
  {
    question: "Why is it important to separate pure logic from the IO monad?",
    options: [
      "Pure code is slower",
      "It makes the code impossible to test",
      "It ensures core logic is deterministic, referentially transparent, and easy to reason about",
      "IO is the only way to define variables"
    ],
    correctIndex: 2,
    explanation: "Keeping business logic pure allows you to use equational reasoning, write simple unit tests, and avoid unpredictable side effects."
  }
];