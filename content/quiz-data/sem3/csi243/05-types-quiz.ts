export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What algorithm does GHC primarily use for type inference?",
    options: ["Dijkstra's Algorithm", "Hindley-Milner (Algorithm W)", "QuickSort", "A* Search"],
    correctIndex: 1,
    explanation: "The Hindley-Milner algorithm deduces the most general type for expressions without requiring explicit type annotations."
  },
  {
    question: "What is Parametric Polymorphism?",
    options: [
      "A function that behaves differently depending on the type",
      "A function that works uniformly for any type (e.g., `length :: [a] -> Int`)",
      "A function that takes no parameters",
      "A loop that iterates over types"
    ],
    correctIndex: 1,
    explanation: "Parametric polymorphism uses type variables (like `a`) to indicate that the function's logic is independent of the specific type."
  },
  {
    question: "What is Unification in the context of Haskell's type system?",
    options: [
      "Combining two modules into one",
      "The process of making two types identical by substituting type variables",
      "Deleting type annotations to make code cleaner",
      "Runtime type casting"
    ],
    correctIndex: 1,
    explanation: "Unification is how the compiler 'checks' types. It attempts to find a substitution for type variables that makes two types match."
  },
  {
    question: "Which typeclass must a type implement to support the `<` and `>` operators?",
    options: ["Eq", "Show", "Ord", "Num"],
    correctIndex: 2,
    explanation: "The `Ord` typeclass provides ordering operations like `<`, `>`, `<=`, `>=`, and `compare`. It inherently requires the type to also be an instance of `Eq`."
  },
  {
    question: "What does the constraint `Eq a =>` mean in a type signature?",
    options: [
      "The type `a` must be an integer",
      "The type `a` must implement the `Eq` typeclass",
      "The type `a` is equal to nothing",
      "It is a syntax error"
    ],
    correctIndex: 1,
    explanation: "It is a type constraint indicating that whatever type `a` is, it must support equality testing (`==` and `/=`)."
  }
];