export const quizData = [
  {
    question: "Why does Haskell use recursion for repetition?",
    options: [
      "Recursion always runs faster than a loop",
      "Haskell has no for or while loops",
      "Loops are only allowed inside IO actions",
      "Recursive functions do not need type signatures",
    ],
    correctIndex: 1,
    explanation: "Haskell provides no for or while construct. Repetition is expressed by defining a function in terms of itself, with a base case to terminate it.",
  },
  {
    question: "What is the purpose of the base case?",
    options: [
      "To define the function for the first input values and terminate the recursion",
      "To declare the function's type",
      "To handle invalid input only",
      "To make the function run faster",
    ],
    correctIndex: 0,
    explanation: "The base case gives a direct answer for the smallest input without calling the function again, which is what stops the recursion. Without one, the function may loop indefinitely.",
  },
  {
    question: "The equations `fac n = n * fac (n - 1)` and `fac 0 = 1` are written in that order. What does `fac 0` do?",
    options: [
      "Returns 1, because the literal pattern is more specific",
      "Reports a non-exhaustive patterns error",
      "Never terminates, because the variable pattern matches 0 first",
      "Returns 0",
    ],
    correctIndex: 2,
    explanation: "Equations are matched top to bottom. The variable pattern n matches 0, so the recursive step runs, giving 0 * fac (-1), then fac (-2), and so on. The base case is unreachable.",
  },
  {
    question: "Why does `fib` need two base cases?",
    options: [
      "Because it returns two values",
      "Because its recursive step reaches back two positions",
      "Because Integer requires two patterns",
      "Because it is slower than fac",
    ],
    correctIndex: 1,
    explanation: "fib n calls both fib (n-1) and fib (n-2). With only fib 0 defined, evaluating fib 2 would require fib (-1), which nothing stops. A base case is needed for every position the step can reach.",
  },
  {
    question: "In a dry run, what happens during the unwinding phase?",
    options: [
      "The arithmetic is performed innermost first",
      "Each call expands into the recursive step, stacking up with nothing yet calculated",
      "The base case value is substituted back",
      "The type checker verifies each step",
    ],
    correctIndex: 1,
    explanation: "Unwinding builds a longer and longer expression as each call is replaced by the recursive step. No arithmetic happens until the base case is reached and rewinding begins.",
  },
  {
    question: "A definition uses `fac 0 = 0` rather than `fac 0 = 1`. What does `fac 3` return?",
    options: [
      "6",
      "0",
      "3",
      "It never terminates",
    ],
    correctIndex: 1,
    explanation: "The trace reaches 3 * (2 * (1 * fac 0)). The base case supplies 0, which is multiplied through the entire product, so every factorial returns 0. It terminates but is wrong.",
  },
  {
    question: "What is wrong with `sumNumbers n = n + sumNumbers n`?",
    options: [
      "The argument never changes, so the base case is never reached",
      "The types do not match",
      "It needs a case expression",
      "Nothing; it is correct",
    ],
    correctIndex: 0,
    explanation: "The recursive call passes the same argument, so nothing moves towards the base case. This is well typed and compiles, but hangs or overflows the stack at run time.",
  },
  {
    question: "Why does `fac (-1)` never terminate with the standard two-equation definition?",
    options: [
      "Negative numbers are not valid Haskell Integers",
      "The type is wrong and should be Int",
      "Each call moves the argument further from the base case at 0",
      "The base case is missing",
    ],
    correctIndex: 2,
    explanation: "The type Integer admits negatives but the specification does not. Subtracting one from a negative argument moves it away from 0, so the base case is never matched.",
  },
  {
    question: "What is the type of `error`, and why?",
    options: [
      "String -> String, because it returns a message",
      "String -> IO (), because it prints",
      "String -> a, because it never returns a value",
      "String -> Bool, because it reports failure",
    ],
    correctIndex: 2,
    explanation: "error :: String -> a. It stops evaluation rather than producing a result, so its result type is unconstrained and it can be used wherever a value of any type is expected.",
  },
  {
    question: "Which error message is the most useful?",
    options: [
      "error \"error\"",
      "error \"invalid input\"",
      "error \"fac: only defined for non-negative integers\"",
      "error \"\"",
    ],
    correctIndex: 2,
    explanation: "It names the function and states the rule that was broken. When a failure surfaces from deep inside a program, the function-name prefix is often the only clue to its origin.",
  },
  {
    question: "In `rangeSum m n`, which argument must change for the recursion to terminate?",
    options: [
      "Neither; both stay fixed",
      "m must move towards n, closing the gap",
      "n must double each call",
      "Both must decrease together",
    ],
    correctIndex: 1,
    explanation: "The gap between the two arguments must close. Incrementing m towards n reduces that gap on every call until m == n matches the base case.",
  },
  {
    question: "Does successful type checking guarantee a recursive function terminates?",
    options: [
      "Yes, GHC verifies termination",
      "Yes, provided a base case exists",
      "No; type checking only establishes consistent use of types",
      "Only when the argument is an Integer",
    ],
    correctIndex: 2,
    explanation: "Type checking says nothing about whether an argument decreases or whether a base case is reachable. fac (-1) is perfectly well typed and loops forever.",
  },
];
