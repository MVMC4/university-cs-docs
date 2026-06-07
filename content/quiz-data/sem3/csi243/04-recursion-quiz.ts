export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "Why is an accumulator used in tail-recursive functions?",
    options: [
      "To make the code syntactically shorter",
      "To pass intermediate results, enabling O(1) space complexity via Tail Call Optimization",
      "To avoid the need for a base case in the recursion",
      "To allow the function to access and modify global variables"
    ],
    correctIndex: 1,
    explanation: "Accumulators carry the intermediate state, allowing the recursive call to be the final operation. This enables the compiler to optimize the call stack to O(1) space."
  },
  {
    question: "What is the primary purpose of the `map` function?",
    options: [
      "To filter out elements that do not match a specific predicate",
      "To reduce a list into a single accumulated summary value",
      "To apply a given function to every element in a list, returning a new list of the same length",
      "To sort a list of elements in ascending order"
    ],
    correctIndex: 2,
    explanation: "`map` transforms a list by applying a function to each element individually, preserving the original structure and length of the list."
  },
  {
    question: "Why is `foldl'` generally preferred over `foldl` in Haskell?",
    options: [
      "It evaluates strictly, preventing the buildup of unevaluated thunks and memory space leaks",
      "It is the only fold function that can operate on infinite lists",
      "It processes elements from right to left, which matches standard mathematical notation",
      "It automatically converts the list to an Array for faster random access"
    ],
    correctIndex: 0,
    explanation: "The prime (`'`) in `foldl'` denotes strict evaluation. It forces the accumulator to be evaluated at each step, preventing O(n) memory buildup from lazy thunk creation."
  },
  {
    question: "What does the `(.)` operator do in Haskell?",
    options: [
      "It accesses specific properties of a record or algebraic data type",
      "It concatenates two lists together end-to-end",
      "It checks two values for structural equality",
      "It composes two functions, such that `(f . g) x` evaluates to `f (g x)`"
    ],
    correctIndex: 3,
    explanation: "The `(.)` operator is the function composition operator. It takes two functions and returns a new function that applies the right function first, then the left function."
  },
  {
    question: "Which Higher-Order Function is used to reduce a list to a single summary value?",
    options: [
      "map",
      "fold",
      "filter",
      "zipWith"
    ],
    correctIndex: 1,
    explanation: "`fold` (or `reduce`) accumulates a list by repeatedly applying a binary function, collapsing the entire structure into a single final value."
  }
];