export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the primary purpose of QuickCheck?",
    options: [
      "Static code linting",
      "Property-based testing with randomly generated inputs",
      "Runtime performance profiling",
      "Package dependency management"
    ],
    correctIndex: 1,
    explanation: "QuickCheck verifies that mathematical properties hold true across hundreds of automatically generated edge cases, providing higher confidence than manual unit tests."
  },
  {
    question: "What does 'shrinking' mean in the context of QuickCheck?",
    options: [
      "Reducing the size of the compiled binary",
      "Automatically finding the smallest possible input that still triggers a test failure",
      "Deleting unused variables from the code",
      "Compressing the test output"
    ],
    correctIndex: 1,
    explanation: "When a property fails, QuickCheck 'shrinks' the large, random input that caused the failure into the minimal counterexample, making it easy for the developer to understand the bug."
  },
  {
    question: "A QuickCheck property function must return which type?",
    options: ["IO ()", "String", "Bool", "Int"],
    correctIndex: 2,
    explanation: "Properties are predicates that evaluate to `True` if the invariant holds for the given inputs, and `False` if it is violated."
  },
  {
    question: "How do you test a custom Algebraic Data Type (like a Tree) with QuickCheck?",
    options: [
      "You cannot test custom types",
      "By defining a custom `Arbitrary` instance to generate random valid values",
      "By converting the tree to a String first",
      "By using `foldl` instead of `foldl'`"
    ],
    correctIndex: 1,
    explanation: "Implementing the `Arbitrary` typeclass for your custom type teaches QuickCheck how to construct random, well-formed instances of that type for testing."
  }
];