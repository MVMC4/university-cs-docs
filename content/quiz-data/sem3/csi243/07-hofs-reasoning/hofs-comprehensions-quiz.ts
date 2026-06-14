export const quizData = [
  {
    question: "What is the type signature of the `map` function?",
    options: [
      "`(a -> b) -> [a] -> [b]`",
      "`(a -> Bool) -> [a] -> [a]`",
      "`(a -> b -> b) -> b -> [a] -> b`",
      "`[a] -> [b] -> [(a, b)]`"
    ],
    correctIndex: 0,
    explanation: "`map` takes a function from `a` to `b` and a list of `a`s, returning a list of `b`s."
  },
  {
    question: "What is the type signature of the `filter` function?",
    options: [
      "`(a -> b) -> [a] -> [b]`",
      "`(a -> Bool) -> [a] -> [a]`",
      "`(a -> a -> Bool) -> [a] -> [a]`",
      "`[a] -> [a]`"
    ],
    correctIndex: 1,
    explanation: "`filter` takes a predicate (a function returning `Bool`) and a list, returning a new list containing only the elements that satisfy the predicate."
  },
  {
    question: "What is the associativity of `foldr`?",
    options: [
      "Left-associative",
      "Right-associative",
      "Non-associative",
      "It depends on the combining function."
    ],
    correctIndex: 1,
    explanation: "`foldr` builds the expression tree from the right: `f x1 (f x2 (f x3 z))`."
  },
  {
    question: "Why is `foldl'` preferred over `foldl` or `foldr` for strict scalar accumulation (like summing a large list)?",
    options: [
      "Because `foldl'` is right-associative.",
      "Because `foldl'` is strict, forcing the accumulator at each step and preventing space leaks (O(1) space).",
      "Because `foldl'` can process infinite lists.",
      "Because `foldl'` is the only one that type checks."
    ],
    correctIndex: 1,
    explanation: "`foldl'` evaluates the accumulator strictly at each step, preventing the buildup of unevaluated thunks that cause stack/space leaks in lazy `foldl`."
  },
  {
    question: "Which list comprehension is equivalent to `map (*2) (filter even [1..10])`?",
    options: [
      "`[x * 2 | x <- [1..10], even x]`",
      "`[even x | x <- [1..10], x * 2]`",
      "`[x | x <- [1..10], even (x * 2)]`",
      "`[x * 2, even x | x <- [1..10]]`"
    ],
    correctIndex: 0,
    explanation: "The generator `x <- [1..10]` provides the elements, the predicate `even x` filters them, and the expression `x * 2` maps the transformation."
  },
  {
    question: "What is a 'dependent generator' in a list comprehension?",
    options: [
      "A generator that relies on an external IO action.",
      "A generator that uses variables bound by earlier generators in the same comprehension.",
      "A generator that produces an infinite list.",
      "A generator that is optional."
    ],
    correctIndex: 1,
    explanation: "Dependent generators allow later generators to reference variables introduced by earlier ones, e.g., `y <- [x..10]`."
  },
  {
    question: "What does the list comprehension `[(x,y) | x <- [1,2], y <- [x..3]]` evaluate to?",
    options: [
      "`[(1,1),(1,2),(1,3),(2,2),(2,3)]`",
      "`[(1,1),(1,2),(1,3),(2,1),(2,2),(2,3)]`",
      "`[(1,2),(2,3)]`",
      "Type error"
    ],
    correctIndex: 0,
    explanation: "For `x=1`, `y` ranges from `1` to `3`. For `x=2`, `y` ranges from `2` to `3`. This yields the pairs `(1,1), (1,2), (1,3), (2,2), (2,3)`."
  },
  {
    question: "Why can `foldr` process infinite lists, while `foldl'` cannot?",
    options: [
      "Because `foldr` is strict and `foldl'` is lazy.",
      "Because `foldr` is lazy in its second argument, allowing it to short-circuit if the combining function doesn't evaluate it.",
      "Because `foldr` has a built-in base case for infinity.",
      "Because `foldl'` requires the list to be sorted."
    ],
    correctIndex: 1,
    explanation: "`foldr`'s laziness allows functions like `||` or `:` to return a result without evaluating the rest of the infinite list. `foldl'` must traverse the entire list to force the accumulator."
  },
  {
    question: "What is the result of `foldr (:) [] [1,2,3]`?",
    options: [
      "`6`",
      "`[1,2,3]`",
      "`[3,2,1]`",
      "`[]`"
    ],
    correctIndex: 1,
    explanation: "`foldr (:) []` replaces every `:` with `:` and `[]` with `[]`, effectively acting as the identity function for lists."
  },
  {
    question: "What is the type signature of the `zip` function?",
    options: [
      "`[a] -> [b] -> [(a, b)]`",
      "`[(a, b)] -> ([a], [b])`",
      "`[a] -> [a] -> [a]`",
      "`(a -> b -> c) -> [a] -> [b] -> [c]`"
    ],
    correctIndex: 0,
    explanation: "`zip` takes two lists and pairs their corresponding elements into a list of tuples, stopping at the length of the shorter list."
  },
  {
    question: "What does the `span` function do?",
    options: [
      "It splits a list into two at the first element that fails a predicate.",
      "It measures the length of a list.",
      "It sorts a list.",
      "It removes duplicate elements."
    ],
    correctIndex: 0,
    explanation: "`span p xs` returns a tuple `(takeWhile p xs, dropWhile p xs)`, splitting the list at the first element where `p` is False."
  },
  {
    question: "What is 'stream fusion' in the context of GHC optimizations?",
    options: [
      "A technique to merge multiple list operations into a single pass, eliminating intermediate list allocations.",
      "A method for streaming data over a network.",
      "A way to convert lists into arrays.",
      "A debugging tool for memory leaks."
    ],
    correctIndex: 0,
    explanation: "Stream fusion uses rewrite rules to combine operations like `map` and `filter` into a single loop, avoiding the creation of temporary lists in memory."
  },
  {
    question: "In the list comprehension `[x^2 | x <- [1..5], odd x]`, what is the predicate?",
    options: [
      "`x^2`",
      "`x <- [1..5]`",
      "`odd x`",
      "`[1..5]`"
    ],
    correctIndex: 2,
    explanation: "The predicate is the boolean condition `odd x` that filters the generated values."
  },
  {
    question: "What is the result of `take 3 (iterate (*2) 1)`?",
    options: [
      "`[1, 2, 4]`",
      "`[2, 4, 8]`",
      "`[1, 2, 4, 8]`",
      "`[8, 4, 2]`"
    ],
    correctIndex: 0,
    explanation: "`iterate (*2) 1` generates `[1, 2, 4, 8, 16, ...]`. `take 3` extracts the first three elements: `[1, 2, 4]`."
  },
  {
    question: "Why is `foldr` described as a 'catamorphism'?",
    options: [
      "Because it is the fastest folding function.",
      "Because it structurally replaces every cons cell `(:)` with a function `f` and every `[]` with a base value `z`.",
      "Because it only works on categorical data.",
      "Because it reverses the list."
    ],
    correctIndex: 1,
    explanation: "A catamorphism is a generalization of folding. `foldr` deconstructs a recursive data structure by replacing its constructors with provided functions/values."
  }
];