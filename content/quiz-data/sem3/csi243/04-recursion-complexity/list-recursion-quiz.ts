export const quizData = [
  {
    question: "In the 5-Part Framework implementation of `lastElement`, what is the base case pattern?",
    options: [
      "`lastElement [] = []`",
      "`lastElement [x] = x`",
      "`lastElement (x:xs) = x`",
      "`lastElement xs = lastElement (tail xs)`"
    ],
    correctIndex: 1,
    explanation: "The base case for `lastElement` is a singleton list `[x]`, because the last element of a single-element list is that element itself."
  },
  {
    question: "What is the recursive step for the naive `revList` function?",
    options: [
      "`revList (x:xs) = x : revList xs`",
      "`revList (x:xs) = revList xs ++ [x]`",
      "`revList (x:xs) = revList (x:xs)`",
      "`revList xs = xs`"
    ],
    correctIndex: 1,
    explanation: "The naive reversal recursively reverses the tail `xs` and then appends the head `x` to the end of the resulting list using `++`."
  },
  {
    question: "What is the time complexity of the `++` (concatenation) operator in Haskell?",
    options: [
      "O(1)",
      "O(log n)",
      "O(k), where k is the length of the left operand",
      "O(n²), where n is the length of the right operand"
    ],
    correctIndex: 2,
    explanation: "The `++` operator must traverse the entire left list to reach its final `[]` constructor before it can attach the right list, making it O(k) where k is the left list's length."
  },
  {
    question: "Why is the naive `revList` implementation considered O(n²) in time complexity?",
    options: [
      "Because it uses recursion.",
      "Because the `++` operator is called `n` times, and each call takes O(n) time on average.",
      "Because it creates a new list in memory.",
      "Because it uses the `length` function."
    ],
    correctIndex: 1,
    explanation: "At each of the `n` recursive steps, `++` is used to append a single element to a list of length up to `n-1`. Summing 1 + 2 + ... + n yields O(n²)."
  },
  {
    question: "How does the Accumulator Pattern improve the time complexity of list reversal?",
    options: [
      "It eliminates the need for a base case.",
      "It replaces the O(k) `++` operator with the O(1) cons (`:`) operator.",
      "It allows the function to be compiled into C code.",
      "It reduces the number of elements in the list."
    ],
    correctIndex: 1,
    explanation: "By passing an accumulator and prepending elements using `:` (which is O(1)), the accumulator pattern avoids the costly traversal of `++`, reducing the overall complexity to O(n)."
  },
  {
    question: "What is the type signature of the helper function `revAcc` in the accumulator pattern?",
    options: [
      "`[a] -> [a]`",
      "`[a] -> [a] -> [a]`",
      "`a -> [a] -> [a]`",
      "`[[a]] -> [a]`"
    ],
    correctIndex: 1,
    explanation: "`revAcc` takes the remaining list to process `[a]` and the accumulated reversed list `[a]`, returning the final reversed list `[a]`."
  },
  {
    question: "In the accumulator pattern `revAcc (x:xs) acc = revAcc xs (x:acc)`, what is the role of `acc`?",
    options: [
      "It stores the original list for later comparison.",
      "It accumulates the reversed elements as the recursion progresses.",
      "It counts the number of recursive calls.",
      "It acts as the base case condition."
    ],
    correctIndex: 1,
    explanation: "The `acc` parameter accumulates the result. At each step, the current head `x` is prepended to `acc`, building the reversed list."
  },
  {
    question: "What is the base case for the accumulator-based `revAcc` function?",
    options: [
      "`revAcc [] acc = []`",
      "`revAcc [x] acc = x:acc`",
      "`revAcc [] acc = acc`",
      "`revAcc xs acc = xs`"
    ],
    correctIndex: 2,
    explanation: "When the input list is empty `[]`, all elements have been processed, and the function simply returns the fully accumulated result `acc`."
  },
  {
    question: "Which of the following list recursion patterns describes the `map` function?",
    options: [
      "Aggregation",
      "Transformation",
      "Filtering",
      "Accumulation"
    ],
    correctIndex: 1,
    explanation: "`map` transforms each element of a list using a function, producing a new list of the same length with transformed elements."
  },
  {
    question: "In the recursive step of `listLength (x:xs) = 1 + listLength xs`, what does the `1` represent?",
    options: [
      "The value of the head element `x`.",
      "The count of the current head element being processed.",
      "The base case value.",
      "The maximum length of the list."
    ],
    correctIndex: 1,
    explanation: "The `1` accounts for the current head element `x` that has been matched, adding it to the length of the remaining tail `xs`."
  },
  {
    question: "What is the result of the dry run step: `lastElement [1, 2]`?",
    options: [
      "`1`",
      "`2`",
      "`[1, 2]`",
      "Runtime error"
    ],
    correctIndex: 1,
    explanation: "`lastElement (1:[2])` reduces to `lastElement [2]`, which matches the base case `[x]` and returns `2`."
  },
  {
    question: "Why is `lastElement :: [a] -> a` considered a partial function?",
    options: [
      "Because it only works on lists of integers.",
      "Because it lacks a pattern to handle the empty list `[]`, leading to a runtime crash if called on `[]`.",
      "Because it uses the `++` operator.",
      "Because it is not tail-recursive."
    ],
    correctIndex: 1,
    explanation: "The function only defines patterns for `[x]` and `(_:xs)`. If passed `[]`, no pattern matches, resulting in a non-exhaustive pattern match exception."
  },
  {
    question: "How would you make `lastElement` a total function?",
    options: [
      "Change the return type to `Maybe a` and return `Nothing` for `[]`.",
      "Add a base case `lastElement [] = []`.",
      "Use the `++` operator instead of pattern matching.",
      "It is impossible to make it total."
    ],
    correctIndex: 0,
    explanation: "By returning `Maybe a`, the function can return `Just x` for a valid last element and `Nothing` for an empty list, safely handling all possible inputs."
  },
  {
    question: "In the 5-Part Framework, what is the purpose of the 'Signature' step?",
    options: [
      "To write the GHCi test output.",
      "To formally declare the function's name, argument types, and return type.",
      "To trace the execution step-by-step.",
      "To write the actual Haskell code."
    ],
    correctIndex: 1,
    explanation: "The Signature step establishes the type contract of the function, which guides the implementation and allows the compiler to catch type errors early."
  },
  {
    question: "Which operator is used to prepend an element to a list in O(1) time?",
    options: [
      "`++`",
      "`:`",
      "`++=`",
      "`::`"
    ],
    correctIndex: 1,
    explanation: "The cons operator `:` prepends a single element to the front of a list in constant O(1) time, making it ideal for accumulator patterns."
  }
];