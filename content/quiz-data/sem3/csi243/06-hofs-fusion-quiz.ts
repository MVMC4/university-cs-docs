export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the output of the list comprehension `[x * 2 | x <- [1..5], even x]`?",
    options: [
      "[2, 4, 6, 8, 10]",
      "[4, 8]",
      "[4, 8, 12]",
      "An empty list []"
    ],
    correctIndex: 1,
    explanation: "The generator `x <- [1..5]` produces `[1,2,3,4,5]`. The guard `even x` filters this to `[2,4]`. Finally, the expression `x * 2` maps over the filtered list, yielding `[4, 8]`."
  },
  {
    question: "What does `zip [1, 2, 3] ['a', 'b', 'c', 'd']` return?",
    options: [
      "`[(1,'a'),(2,'b'),(3,'c'),(4,'d')]` — pads the shorter list with the last element.",
      "`[(1,'a'),(2,'b'),(3,'c')]` — stops at the shortest list.",
      "A type error — lists must have equal length to be zipped.",
      "`[1,2,3,'a','b','c','d']` — concatenates them instead."
    ],
    correctIndex: 1,
    explanation: "`zip` pairs corresponding elements from two lists. If one list is shorter, `zip` truncates to the length of the shorter list. No padding occurs, and no type error is thrown."
  },
  {
    question: "Trace `foldl' (-) 0 [1,2,3]`. What does it produce and why?",
    options: [
      "`0 - (1 - (2 - 3)) = 2` — right-associative subtraction.",
      "`((0 - 1) - 2) - 3 = -6` — left-associative, strict subtraction.",
      "`-6` but with a space leak because `foldl'` is lazy.",
      "`0` — it ignores the list elements due to strictness."
    ],
    correctIndex: 1,
    explanation: "`foldl'` is left-associative and strict. It forces the accumulator at each step: `z' = 0 - 1 = -1` (forced); `z' = -1 - 2 = -3` (forced); `z' = -3 - 3 = -6` (forced). Result: -6. This contrasts with `foldr`, which would evaluate as `1 - (2 - (3 - 0)) = 2`."
  },
  {
    question: "What does `span (< 5) [1, 2, 6, 3, 4]` return?",
    options: [
      "`([1,2,3,4], [6])` — collects all elements satisfying the predicate.",
      "`([1,2], [6,3,4])` — splits at the first predicate failure and keeps the rest.",
      "`([1,2,6], [3,4])` — stops after exactly three elements.",
      "`[1,2]` — drops everything after the failure."
    ],
    correctIndex: 1,
    explanation: "`span p xs` returns a tuple `(takeWhile p xs, dropWhile p xs)`. It walks left-to-right, collecting elements while the predicate holds (`1, 2`), stops at the first failure (`6`), and places that element and *everything after it* into the second part of the tuple. It does not filter the second part."
  },
  {
    question: "In the context of `foldr`, what is a 'catamorphism'?",
    options: [
      "A function that generates an infinite list from a seed value.",
      "A structural recursion that replaces the data constructors of a type with provided functions — `foldr` replaces `(:)` with `f` and `[]` with `z`.",
      "A monadic bind operation that sequences IO effects.",
      "A compiler optimisation that eliminates dead code branches."
    ],
    correctIndex: 1,
    explanation: "A catamorphism is a fold over an inductive data type that replaces each constructor with a provided function. For lists, `foldr f z` structurally replaces every cons cell with `f` and the empty list with `z`. This explains why `foldr (:) [] xs` is the identity function."
  },
  {
    question: "What does `take 4 (iterate (+3) 1)` evaluate to?",
    options: [
      "`[1, 4, 7, 10]`",
      "`[1, 3, 6, 9]`",
      "`[4, 7, 10, 13]`",
      "`[1, 1+3, 1+3+3, 1+3+3+3]` — unevaluated thunks."
    ],
    correctIndex: 0,
    explanation: "`iterate f x` produces an infinite list `[x, f x, f (f x), ...]`. `iterate (+3) 1` yields `[1, 4, 7, 10, 13, ...]`. `take 4` forces evaluation of the first four elements, returning `[1, 4, 7, 10]`."
  },
  {
    question: "Why does `foldl'` prevent space leaks while the standard `foldl` does not?",
    options: [
      "`foldl` processes lists right-to-left while `foldl'` processes left-to-right.",
      "`foldl'` uses `seq` internally to force the accumulator to WHNF at each step, preventing thunk accumulation.",
      "`foldl` is implemented in C while `foldl'` is pure Haskell.",
      "`foldl'` automatically parallelises the reduction across CPU cores."
    ],
    correctIndex: 1,
    explanation: "Both traverse left-to-right. The critical difference is strictness: `foldl'` forces the accumulator expression before recursing. Standard `foldl` builds a chain of unevaluated thunks `(((0+1)+2)+3)`, consuming O(n) heap space. `foldl'` keeps space complexity at O(1) by evaluating immediately."
  },
  {
    question: "What is the practical benefit of GHC's Map Fusion rewrite rule (`map f (map g xs) = map (f . g) xs`)?",
    options: [
      "It reduces time complexity from O(n) to O(1) by caching the result.",
      "It eliminates the intermediate list allocation — two separate O(n) traversals are fused into a single O(n) pass, reducing memory and GC pressure.",
      "It converts the list into a balanced binary tree for faster lookup.",
      "It forces strict evaluation of all elements, preventing lazy infinite lists."
    ],
    correctIndex: 1,
    explanation: "Without fusion, `map f (map g xs)` creates an intermediate list of size n, then traverses it again. The fusion rule rewrites this to `map (f . g) xs` — a single traversal with no intermediate allocation. Time complexity remains O(n) but with a better constant, and memory drops to O(1) for the list spine, mimicking a tight C loop."
  }
];