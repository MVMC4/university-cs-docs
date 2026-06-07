export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What does the type signature `Int -> Int -> Int` actually mean in Haskell?",
    options: [
      "It takes a tuple of two Ints and returns an Int",
      "It takes two Ints simultaneously, similar to C or Java",
      "It takes an Int, and returns a function that takes an Int and returns an Int",
      "It is a syntax error; arrows can only appear once"
    ],
    correctIndex: 2,
    explanation: "Due to currying and the right-associativity of the `->` operator, `Int -> Int -> Int` is parsed as `Int -> (Int -> Int)`."
  },
  {
    question: "Which keyword is used to define local variables or helper functions at the END of a function definition?",
    options: [
      "where",
      "let",
      "in",
      "def"
    ],
    correctIndex: 0,
    explanation: "`where` clauses are placed at the bottom of a function to provide bottom-up local bindings, keeping the main logic clean. `let ... in` is used for inline expressions."
  },
  {
    question: "What is the precise type of the literal `[1, 2, 3]` in Haskell?",
    options: [
      "A heterogeneous Tuple",
      "An imperative Array",
      "A generic List type without specific element typing",
      "[Int]"
    ],
    correctIndex: 3,
    explanation: "Lists in Haskell are homogeneous (all elements must be of the same type) and are denoted by square brackets. The compiler infers the type as `[Int]`."
  },
  {
    question: "What is the primary purpose of the `$` operator in Haskell?",
    options: [
      "It mathematically composes two functions together",
      "It applies a function with the lowest precedence to avoid nested parentheses",
      "It adds two numerical values together",
      "It defines a new global variable"
    ],
    correctIndex: 1,
    explanation: "The `$` operator is right-associative function application with the lowest precedence, effectively acting as an open parenthesis that closes at the end of the line."
  },
  {
    question: "How does Haskell's `Integer` type differ from `Int`?",
    options: [
      "`Integer` is a fixed 64-bit machine word",
      "`Integer` is a floating-point number",
      "`Integer` is an arbitrary-precision mathematical integer",
      "`Integer` is simply a string representation of a number"
    ],
    correctIndex: 2,
    explanation: "`Int` is fixed-precision (bounded by machine architecture), while `Integer` has arbitrary precision and can grow as large as available memory allows, preventing overflow."
  }
];