export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "In a recursive function, what is the primary role of the 'Base Case'?",
    options: [
      "It calls the function again with a smaller argument.",
      "It handles the initial setup of the accumulator.",
      "It provides a terminating condition that stops the recursion.",
      "It optimizes the function into a tail-recursive form."
    ],
    correctIndex: 2,
    explanation: "The base case is the condition under which the function stops calling itself and returns a concrete value. Without it, recursion would continue infinitely until a stack overflow occurs."
  },
  {
    question: "When dry-running `rangeSum 3 5` (defined as `lo > hi = 0`, `otherwise = lo + rangeSum (lo+1) hi`), what is the correct intermediate step after the second recursive call?",
    options: [
      "3 + (4 + 5)",
      "3 + (4 + rangeSum 5 5)",
      "rangeSum 4 5",
      "5 + 0"
    ],
    correctIndex: 1,
    explanation: "Step 1: 3 + rangeSum 4 5. Step 2 substitutes rangeSum 4 5 with (4 + rangeSum 5 5), resulting in 3 + (4 + rangeSum 5 5). The next step would expand rangeSum 5 5."
  },
  {
    question: "Which of the following is the mathematically correct piecewise specification for the factorial function?",
    options: [
      "f(n) = n * f(n+1)",
      "f(n) = 1 if n=0, else n * f(n-1)",
      "f(n) = f(n-1) + n!",
      "f(0) = 1, f(n) = n + f(n-1)"
    ],
    correctIndex: 1,
    explanation: "The factorial of 0 is defined as 1 (base case). For n > 0, it is defined recursively as n multiplied by the factorial of (n-1). Option D defines triangular numbers, not factorials."
  },
  {
    question: "In structural induction, what does the Inductive Hypothesis (IH) assume?",
    options: [
      "The property holds for all possible inputs in the universe.",
      "The base case is false.",
      "The property holds for a smaller structure (e.g., list `xs`), and we use it to prove the property for a larger structure (e.g., `x:xs`).",
      "The function will terminate without error."
    ],
    correctIndex: 2,
    explanation: "Structural induction relies on the IH: assuming P(xs) is true. You then show that P(x:xs) logically follows from P(xs). This chains the base case upward through all possible list structures."
  },
  {
    question: "Why does a naive lazy recursive sum `sum (x:xs) acc = sum xs (acc + x)` cause a space leak?",
    options: [
      "It allocates a new stack frame for each call.",
      "It evaluates `acc + x` immediately, overflowing the CPU cache.",
      "It builds an unevaluated chain of thunks `(((0+1)+2)+3)` on the heap, consuming O(n) space.",
      "It uses pattern matching on lists incorrectly."
    ],
    correctIndex: 2,
    explanation: "In lazy Haskell, the expression `acc + x` is not computed immediately. It is stored as a thunk. Each recursive step nests another thunk, creating an O(n) structure that is only forced at the base case. This causes excessive memory usage and potential stack overflow during evaluation."
  },
  {
    question: "Which implementation correctly defines `myAppend` (the `(++)` operator)?",
    options: [
      "`myAppend (x:xs) ys = x : myAppend xs ys`, `myAppend [] ys = ys`",
      "`myAppend (x:xs) ys = myAppend xs (ys ++ [x])`",
      "`myAppend [] ys = []`, `myAppend (x:xs) ys = [x, y] ++ ys`",
      "`myAppend xs ys = ys ++ xs`"
    ],
    correctIndex: 0,
    explanation: "The correct recursive definition preserves the head `x` of the first list and recursively appends the tail `xs` to the second list `ys`. The base case correctly returns the second list when the first is empty."
  },
  {
    question: "How should you handle an invalid input domain (e.g., factorial of a negative number) in Haskell?",
    options: [
      "Return `0` silently.",
      "Use an infinite loop to prevent further execution.",
      "Use a guard with `error \"descriptive message\"` to halt execution and print the reason.",
      "Change the type to `Maybe Int` but leave it as `Just undefined`."
    ],
    correctIndex: 2,
    explanation: "Using guards (`| n < 0 = error \"...\"`) is the standard way to explicitly handle domain violations. `error` provides a clear, immediate runtime failure, which is preferable to silent incorrect results or infinite loops."
  },
  {
    question: "In the proof of `length (xs ++ ys) = length xs + length ys`, what justifies the transition from `length (x : (xs ++ ys))` to `1 + length (xs ++ ys)`?",
    options: [
      "The Inductive Hypothesis.",
      "The Base Case definition of `length`.",
      "The definition of `length` for a cons cell: `length (h:t) = 1 + length t`.",
      "The definition of `(++)` operator."
    ],
    correctIndex: 2,
    explanation: "This step applies the structural definition of `length` to the outermost constructor `(:)`. It decomposes the head and tail, adding 1 for the head and recursing on the tail. The IH is applied in the *next* step."
  }
];