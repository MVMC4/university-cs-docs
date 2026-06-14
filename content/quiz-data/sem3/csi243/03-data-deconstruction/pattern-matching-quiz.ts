export const quizData = [
  {
    question: "What is the primary purpose of pattern matching in Haskell?",
    options: [
      "To mutate the state of data structures.",
      "To deconstruct data and make choices based on its shape or value.",
      "To enforce strict evaluation of lazy expressions.",
      "To convert between different numeric types."
    ],
    correctIndex: 1,
    explanation: "Pattern matching is Haskell's primary mechanism for deconstructing data and routing control flow based on the structure of the input."
  },
  {
    question: "What does the wildcard `_` signify in a pattern match?",
    options: [
      "It matches only the empty list.",
      "It matches any value, but does not bind it to a variable name.",
      "It causes a compile-time error if reached.",
      "It matches only numeric literals."
    ],
    correctIndex: 1,
    explanation: "The wildcard `_` is an anonymous pattern that matches anything without binding the matched value to an identifier, preventing unused variable warnings."
  },
  {
    question: "Which of the following correctly deconstructs a 2-tuple to extract its second element?",
    options: [
      "`snd (x, y) = y`",
      "`snd (_, y) = y`",
      "`snd (x:xs) = xs`",
      "`snd [_, y] = y`"
    ],
    correctIndex: 1,
    explanation: "`(_, y)` matches a 2-tuple, ignoring the first element with `_` and binding the second element to `y`."
  },
  {
    question: "What is the type signature of the `head'` function defined as `head' (x:_) = x`?",
    options: [
      "`[a] -> a`",
      "`[a] -> [a]`",
      "`a -> [a]`",
      "`(a, b) -> a`"
    ],
    correctIndex: 0,
    explanation: "The pattern `(x:_)` matches a non-empty list of any type `a`, and returns the first element of type `a`, yielding `[a] -> a`."
  },
  {
    question: "Why is the function `head' (x:_) = x` considered a partial function?",
    options: [
      "Because it uses a wildcard.",
      "Because it does not handle the empty list `[]` case, leading to a runtime crash if matched against `[]`.",
      "Because it returns a list instead of a single element.",
      "Because it requires a type annotation."
    ],
    correctIndex: 1,
    explanation: "It is partial because it lacks a pattern for the empty list `[]`. If evaluated on `[]`, it will throw a non-exhaustive pattern match exception at runtime."
  },
  {
    question: "What is an 'as-pattern' in Haskell?",
    options: [
      "A pattern that matches only strings.",
      "A pattern that binds a name to the entire matched value while simultaneously deconstructing it (e.g., `all@(x:xs)`).",
      "A pattern that asserts a type constraint.",
      "A pattern used exclusively in `case` expressions."
    ],
    correctIndex: 1,
    explanation: "An as-pattern (using `@`) allows you to reference the whole structure by a name while also binding its sub-components to other names."
  },
  {
    question: "If `firstTwo all@(x:y:_) = (x, y)` is called with `[1, 2, 3]`, what is the value of `all`?",
    options: [
      "`1`",
      "`[1, 2]`",
      "`[1, 2, 3]`",
      "`(1, 2)`"
    ],
    correctIndex: 2,
    explanation: "The `@` symbol binds `all` to the entire input list `[1, 2, 3]`, while `x` binds to `1` and `y` binds to `2`."
  },
  {
    question: "What compiler warning is emitted if a function's pattern matches do not cover all possible inputs?",
    options: [
      "`-Wtype-defaults`",
      "`-Wincomplete-patterns`",
      "`-Wmissing-signatures`",
      "`-Woverlapping-patterns`"
    ],
    correctIndex: 1,
    explanation: "GHC emits `-Wincomplete-patterns` to warn the programmer that a runtime exception could occur if an uncovered pattern is encountered."
  },
  {
    question: "Which of the following patterns matches a list with exactly one element?",
    options: [
      "`x:xs`",
      "`[x]`",
      "`x:_`",
      "`[]`"
    ],
    correctIndex: 1,
    explanation: "`[x]` is syntactic sugar for `x:[]`, which matches a list with exactly one element bound to `x` and an empty tail."
  },
  {
    question: "In the 5-Part Lab Framework, what is the purpose of the 'Dry Run'?",
    options: [
      "To compile the code and check for syntax errors.",
      "To perform a step-by-step substitution trace using sample inputs to verify logic before coding.",
      "To write the type signature.",
      "To copy-paste the GHCi output."
    ],
    correctIndex: 1,
    explanation: "The Dry Run is a manual, step-by-step evaluation of the function with sample inputs to prove the logic is sound before writing the implementation."
  },
  {
    question: "What is the result of evaluating `addSub (5, 7)` where `addSub (x, y) = (x + y, abs (x - y))`?",
    options: [
      "`(12, 2)`",
      "`(12, -2)`",
      "`(2, 12)`",
      "Type error"
    ],
    correctIndex: 0,
    explanation: "`x + y` is `5 + 7 = 12`. `abs (x - y)` is `abs (5 - 7) = abs (-2) = 2`. The result is `(12, 2)`."
  },
  {
    question: "Can pattern matching be used on custom data types?",
    options: [
      "No, only on built-in types like lists and tuples.",
      "Yes, by matching on the data constructors of the type.",
      "Yes, but only if the type derives `Eq`.",
      "No, custom types require `if/else` statements."
    ],
    correctIndex: 1,
    explanation: "Pattern matching is fundamentally based on matching the data constructors of any algebraic data type, custom or built-in."
  },
  {
    question: "What happens if two patterns in a function definition overlap, such as `f 0 = 0` followed by `f x = 1`?",
    options: [
      "A compile-time error is thrown.",
      "The first matching pattern (top-to-bottom) is executed, and subsequent overlapping patterns are ignored (or warned about).",
      "The function randomly chooses one.",
      "It creates an infinite loop."
    ],
    correctIndex: 1,
    explanation: "Patterns are evaluated top-to-bottom. The first one that matches is executed. GHC may warn about redundant or overlapping patterns."
  },
  {
    question: "Which of the following is a valid pattern for matching a tuple of three integers?",
    options: [
      "`(x, y, z)`",
      "`[x, y, z]`",
      "`x:y:z:[]`",
      "`{x, y, z}`"
    ],
    correctIndex: 0,
    explanation: "Tuples are enclosed in parentheses and separated by commas. `(x, y, z)` matches a 3-tuple."
  },
  {
    question: "Why is `safeHead :: [a] -> Maybe a` preferred over `head :: [a] -> a`?",
    options: [
      "Because `safeHead` is faster.",
      "Because `safeHead` is a total function that handles the empty list case gracefully by returning `Nothing`, avoiding runtime crashes.",
      "Because `safeHead` can modify the list.",
      "Because `head` is deprecated in modern Haskell."
    ],
    correctIndex: 1,
    explanation: "`safeHead` is a total function. By returning `Maybe a`, it forces the caller to handle the `Nothing` case, eliminating the runtime crash inherent in the partial `head` function."
  }
];