export const quizData = [
  {
    question: "What is the primary purpose of guards in Haskell?",
    options: [
      "To define local variables.",
      "To express conditional logic based on boolean expressions, evaluated top-to-bottom.",
      "To pattern match on the structure of a list.",
      "To enforce type constraints."
    ],
    correctIndex: 1,
    explanation: "Guards provide a clean way to express conditional logic based on boolean expressions, evaluated sequentially from top to bottom."
  },
  {
    question: "What is the value of the `otherwise` constant in Haskell?",
    options: [
      "A special keyword that terminates the function.",
      "`True`",
      "`False`",
      "`Nothing`"
    ],
    correctIndex: 1,
    explanation: "`otherwise` is not a keyword; it is a predefined constant in the Prelude that is simply an alias for `True`, used as a catch-all guard."
  },
  {
    question: "Where must the `otherwise` guard be placed in a guarded function?",
    options: [
      "At the very beginning.",
      "Anywhere, as order does not matter.",
      "At the very end, acting as a catch-all.",
      "It cannot be used with guards, only in `case` expressions."
    ],
    correctIndex: 2,
    explanation: "Because `otherwise` is `True`, it will match any input. It must be placed last to act as a fallback catch-all, ensuring exhaustiveness."
  },
  {
    question: "What is the fundamental difference between a guard and a `case ... of` expression?",
    options: [
      "Guards can only be used with integers.",
      "Guards are attached to function definitions, while `case ... of` is an expression that can be used inline anywhere a value is expected.",
      "`case ... of` cannot use wildcards.",
      "Guards are evaluated bottom-to-top."
    ],
    correctIndex: 1,
    explanation: "Guards are syntactic sugar attached to function equations. `case ... of` is a first-class expression that can be embedded within other expressions."
  },
  {
    question: "Which of the following is the correct syntax for a guard?",
    options: [
      "`f x if x > 0 = 1`",
      "`f x | x > 0 = 1`",
      "`f x : x > 0 -> 1`",
      "`f x when x > 0 = 1`"
    ],
    correctIndex: 1,
    explanation: "Guards are introduced by the pipe character `|` followed by a boolean expression and an equals sign `=`."
  },
  {
    question: "In the expression `case xs of [] -> 0; (x:xs) -> 1 + length xs`, what is being matched?",
    options: [
      "The boolean value of `xs`.",
      "The structure of the list `xs`.",
      "The type of `xs`.",
      "The first element of `xs` only."
    ],
    correctIndex: 1,
    explanation: "The `case` expression is matching on the structural shape of the list `xs`, checking if it is empty `[]` or a cons cell `(x:xs)`."
  },
  {
    question: "Why might a programmer choose `case div score 10 of` over a series of guards for a grading function?",
    options: [
      "Because `case` is always faster than guards.",
      "Because `case` is better suited for matching discrete, collapsed values (like tens) rather than continuous ranges.",
      "Because guards cannot use the `div` function.",
      "Because `case` does not require exhaustiveness checking."
    ],
    correctIndex: 1,
    explanation: "When logic depends on discrete buckets (e.g., score ranges collapsed by `div`), `case` provides cleaner, more readable pattern matching than repetitive range guards."
  },
  {
    question: "What happens if no guard in a function evaluates to `True` and there is no `otherwise`?",
    options: [
      "The function returns `()`.",
      "A runtime exception (Non-exhaustive guards) is thrown.",
      "The compiler automatically inserts `otherwise = False`.",
      "The function loops infinitely."
    ],
    correctIndex: 1,
    explanation: "If no guard matches and there is no catch-all, the function is partial and will throw a runtime exception when evaluated on an input that fails all guards."
  },
  {
    question: "Can `case ... of` expressions be nested?",
    options: [
      "No, Haskell only allows one `case` per function.",
      "Yes, `case` is an expression and can be nested arbitrarily deep.",
      "Only if the nested `case` is inside a `where` clause.",
      "No, nesting requires using guards instead."
    ],
    correctIndex: 1,
    explanation: "Because `case ... of` is an expression that evaluates to a value, it can be nested anywhere an expression is valid."
  },
  {
    question: "What is the underlying mechanism for *all* pattern matching in Haskell, including function definitions with multiple clauses?",
    options: [
      "The `if-then-else` statement.",
      "The `case ... of` expression.",
      "The `let ... in` expression.",
      "The `do` notation."
    ],
    correctIndex: 1,
    explanation: "Multiple-equation function definitions are syntactic sugar. The compiler desugars them into a single `case ... of` expression."
  },
  {
    question: "Which of the following correctly rewrites `f x = if x > 0 then 1 else 0` using guards?",
    options: [
      "`f x | x > 0 = 1 | otherwise = 0`",
      "`f x | x > 0 then 1 else 0`",
      "`f x = | x > 0 -> 1 | otherwise -> 0`",
      "`f x = case x > 0 of 1 else 0`"
    ],
    correctIndex: 0,
    explanation: "The correct guard syntax uses `|` for the condition and `=` for the result, with `otherwise` as the fallback."
  },
  {
    question: "In a `case` expression, what does the `->` symbol separate?",
    options: [
      "The function name from its arguments.",
      "The pattern from the resulting expression.",
      "The type signature from the implementation.",
      "The guard condition from the result."
    ],
    correctIndex: 1,
    explanation: "In `case expr of pattern -> result`, the `->` separates the pattern being matched from the expression to evaluate if the match succeeds."
  },
  {
    question: "Are guards evaluated lazily?",
    options: [
      "No, all guards are evaluated strictly before the function body.",
      "Yes, guards are evaluated top-to-bottom, and evaluation stops at the first `True` condition (short-circuiting).",
      "Guards are evaluated in parallel.",
      "Guards are evaluated bottom-to-top."
    ],
    correctIndex: 1,
    explanation: "Guards are evaluated sequentially from top to bottom. As soon as a guard evaluates to `True`, its corresponding right-hand side is evaluated, and subsequent guards are ignored."
  },
  {
    question: "What is the type of the expression `case Just 5 of Just x -> x; Nothing -> 0`?",
    options: [
      "`Maybe Int`",
      "`Int`",
      "`a`",
      "`[Int]`"
    ],
    correctIndex: 1,
    explanation: "Both branches of the `case` expression evaluate to an `Int` (`x` is an `Int`, and `0` is an `Int`), so the entire expression has type `Int`."
  },
  {
    question: "Why is `otherwise` preferred over `True` as the final guard?",
    options: [
      "Because `otherwise` is a keyword that the compiler optimizes.",
      "Because `otherwise` improves readability by explicitly signaling intent as a catch-all fallback.",
      "Because `True` causes a type error in guards.",
      "Because `otherwise` evaluates faster than `True`."
    ],
    correctIndex: 1,
    explanation: "While `True` works identically, `otherwise` is idiomatic Haskell that clearly communicates to the reader that this branch is intended as a default fallback."
  }
];