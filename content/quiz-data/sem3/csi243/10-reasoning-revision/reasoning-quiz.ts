export const quizData = [
  {
    question: "What does a precondition record?",
    options: [
      "What is true of the result after the function runs",
      "What must be true of the arguments before the function is applied",
      "The function's type signature",
      "The number of steps the function takes",
    ],
    correctIndex: 1,
    explanation: "A specification has a purpose, a precondition constraining the arguments, and a postcondition describing the result. Preconditions are assertions valid before execution.",
  },
  {
    question: "For `fac :: Integer -> Integer`, what is the relationship between the type and Iv?",
    options: [
      "They are identical",
      "The type is narrower than Iv",
      "The type is wider: it admits negatives the specification excludes",
      "Iv is undefined for numeric types",
    ],
    correctIndex: 2,
    explanation: "Iv is the non-negative integers, but Integer admits every integer, so Ie is non-empty. That gap is exactly why fac (-1) fails to terminate unless the case is handled.",
  },
  {
    question: "Which is NOT a way to handle an argument outside the precondition?",
    options: [
      "Reject it with error",
      "Extend the base case to define it",
      "Return Maybe so the caller handles it",
      "Rely on the type checker to reject it automatically",
    ],
    correctIndex: 3,
    explanation: "The type checker cannot know your precondition; it only checks that types are used consistently. fac (-1) is perfectly well typed and still loops forever.",
  },
  {
    question: "Why is \"this code is correct\" an incomplete claim?",
    options: [
      "Correctness requires a formal proof in every case",
      "Correctness is relative to a stated specification",
      "Only compiled code can be correct",
      "Haskell code is always correct if it type checks",
    ],
    correctIndex: 1,
    explanation: "A function is correct with respect to a specification: for every argument satisfying the precondition it terminates and satisfies the postcondition. Change the specification and the same code may become wrong.",
  },
  {
    question: "Why is `x = x + 1` not referentially transparent?",
    options: [
      "It uses addition",
      "The same text denotes different values before and after, so it cannot be replaced by one value",
      "x is not declared",
      "It is referentially transparent",
    ],
    correctIndex: 1,
    explanation: "Referential transparency means an expression can be replaced by its value without changing behaviour. An assignment changes what x denotes over time, so no single replacement value exists. Functional programs have no assignment statements.",
  },
  {
    question: "In a structural induction over a list, what are the two cases?",
    options: [
      "Positive and negative",
      "[] as the base case, and (x:xs) as the inductive step",
      "Empty and infinite",
      "head and tail",
    ],
    correctIndex: 1,
    explanation: "The proof follows the same split as the function definition. Prove it for [], assume it for xs, then show it holds for (x:xs). Every finite list is built from [] by consing.",
  },
  {
    question: "Why is a completed induction stronger than ten passing tests?",
    options: [
      "It runs faster",
      "It covers every finite input, not just those tested",
      "It also proves termination",
      "Tests cannot detect faults",
    ],
    correctIndex: 1,
    explanation: "Tests show only that those specific inputs worked. An induction establishes the base case and shows the property is preserved, so it covers all finite inputs — though termination must still be argued separately.",
  },
  {
    question: "Which happens first when an expression is submitted?",
    options: [
      "Evaluation",
      "Type analysis",
      "Syntax analysis",
      "They happen simultaneously",
    ],
    correctIndex: 2,
    explanation: "Syntax analysis checks conformance to the language's syntax. Only if it passes does type analysis run, and only if both pass does evaluation begin. This is why a type error prevents evaluation entirely.",
  },
  {
    question: "Which is a semantic error rather than a syntax error?",
    options: [
      "Unbalanced parentheses",
      "A missing else branch",
      "Division by zero",
      "A type mismatch",
    ],
    correctIndex: 2,
    explanation: "Semantic errors concern the meaning of the program and surface during execution. Syntax errors concern the structure of the language and are caught before the program runs.",
  },
  {
    question: "Testing `isDigitChar`, why include '/' and ':'?",
    options: [
      "They are common in file paths",
      "They lie immediately outside the range boundaries and expose a mistaken strict comparison",
      "They are the only non-digit characters",
      "They test the type signature",
    ],
    correctIndex: 1,
    explanation: "'/' and ':' sit immediately either side of '0' and '9'. A fault such as using > instead of >= passes ordinary examples while wrongly rejecting a boundary digit; only a test at the exact edge reveals it.",
  },
  {
    question: "Why is the naive `fib` exponential?",
    options: [
      "Recursion is inherently slow",
      "Each call makes two more, and overlapping subproblems are recomputed many times",
      "Integer arithmetic is slow",
      "It builds a very long list",
    ],
    correctIndex: 1,
    explanation: "Work roughly doubles for each increase of one in n, giving O(2ⁿ). The cause is recomputation — fib 5 evaluates fib 2 three separate times. An accumulator version computes each value once and is linear.",
  },
  {
    question: "Why does `take 5 [1..]` terminate?",
    options: [
      "GHC caps infinite lists at 1000 elements",
      "Haskell is lazy: only the five demanded elements are ever computed",
      "[1..] is actually finite",
      "take evaluates the whole list then discards the rest",
    ],
    correctIndex: 1,
    explanation: "Haskell evaluates nothing without a reason, holding pending computation in thunks until a value is required. The infinite list is never fully constructed, so only what take demands is produced.",
  },
];
