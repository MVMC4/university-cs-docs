export const quizData = [
  {
    question: "In Haskell, how are arguments typically passed to a function?",
    options: [
      "Comma-separated within parentheses, e.g., `f(x, y)`",
      "Space-separated, e.g., `f x y`",
      "Using the `->` operator, e.g., `f -> x -> y`",
      "Using the `$` operator, e.g., `f $ x $ y`"
    ],
    correctIndex: 1,
    explanation: "Haskell uses prefix notation by default, where function application is denoted by a simple space between the function and its arguments."
  },
  {
    question: "What is the precedence of function application (the space character) in Haskell?",
    options: [
      "It has the lowest precedence.",
      "It has the same precedence as `+` and `-`.",
      "It has the highest precedence of all operators.",
      "It is evaluated right-to-left with medium precedence."
    ],
    correctIndex: 2,
    explanation: "Function application (space) binds tighter than any other operator in Haskell, meaning `f x + y` is parsed as `(f x) + y`."
  },
  {
    question: "How is the expression `f x + y` parsed by the Haskell compiler?",
    options: [
      "`f (x + y)`",
      "`(f x) + y`",
      "`f (x) + (y)`",
      "It causes a parse error."
    ],
    correctIndex: 1,
    explanation: "Because space has the highest precedence, `f` is applied to `x` first, and then `y` is added to the result."
  },
  {
    question: "What is the primary purpose of the `$` operator in Haskell?",
    options: [
      "To perform monetary calculations.",
      "To enforce strict evaluation.",
      "To eliminate nested parentheses by acting as a right-associative application with the lowest precedence.",
      "To concatenate two strings."
    ],
    correctIndex: 2,
    explanation: "The `$` operator is defined as `f $ x = f x`. Its lowest precedence ensures that the entire expression to its right is evaluated before being passed to `f`."
  },
  {
    question: "Which of the following is equivalent to `f (g (x + y))`?",
    options: [
      "`f $ g $ x + y`",
      "`f g $ x + y`",
      "`f $ g x + y`",
      "`f (g $ x + y)`"
    ],
    correctIndex: 0,
    explanation: "Because `$` is right-associative and has the lowest precedence, `f $ g $ x + y` correctly groups as `f (g (x + y))`."
  },
  {
    question: "Why is the `else` branch mandatory in an `if-then-else` expression in Haskell?",
    options: [
      "Because Haskell does not support `if` statements without `else`.",
      "Because `if` is an expression that must evaluate to a value in all possible execution paths.",
      "Because the compiler requires a fallback for type inference.",
      "Because `else` is used to handle exceptions."
    ],
    correctIndex: 1,
    explanation: "In Haskell, `if-then-else` is an expression, not a control-flow statement. It must return a value, so both the `then` and `else` branches are required to guarantee a result."
  },
  {
    question: "What is the type of the `if-then-else` construct in Haskell?",
    options: [
      "It is a statement that returns `()`.",
      "It is an expression that returns the type of its branches.",
      "It is a monadic action.",
      "It is a type constructor."
    ],
    correctIndex: 1,
    explanation: "`if-then-else` is an expression, meaning it evaluates to a value of the same type as its `then` and `else` branches."
  },
  {
    question: "How can any standard function be used as an infix operator in Haskell?",
    options: [
      "By surrounding it with parentheses: `(f)`",
      "By surrounding it with backticks: ``x `f` y``",
      "By prefixing it with a `$`.",
      "It is impossible; only built-in operators can be infix."
    ],
    correctIndex: 1,
    explanation: "Wrapping a function name in backticks allows it to be used in infix position between its two arguments."
  },
  {
    question: "What is the associativity of the `$` operator?",
    options: [
      "Left-associative",
      "Right-associative",
      "Non-associative",
      "It depends on the function being applied."
    ],
    correctIndex: 1,
    explanation: "The `$` operator is explicitly defined as right-associative (`infixr 0 $`), allowing chains like `f $ g $ x` to group as `f (g x)`."
  },
  {
    question: "What is the precedence level of the `$` operator?",
    options: [
      "9 (Highest)",
      "5 (Medium)",
      "0 (Lowest)",
      "It has no precedence level."
    ],
    correctIndex: 2,
    explanation: "The `$` operator has a precedence level of 0, the lowest possible, ensuring everything to its right is evaluated first."
  },
  {
    question: "Which of the following will cause a compile-time error?",
    options: [
      "`if x > 0 then 1 else 0`",
      "`if x > 0 then 1`",
      "`let y = if x > 0 then 1 else 0 in y`",
      "`f (if x > 0 then 1 else 0)`"
    ],
    correctIndex: 1,
    explanation: "Omitting the `else` branch violates the rule that `if` expressions must evaluate to a value in all paths, resulting in a parse/compile error."
  },
  {
    question: "In the expression `f x y + z`, which operation is performed first?",
    options: [
      "`x y`",
      "`f x`",
      "`y + z`",
      "`x + z`"
    ],
    correctIndex: 1,
    explanation: "Function application (space) has the highest precedence, so `f` is applied to `x` first, yielding `(f x) y + z`."
  },
  {
    question: "What does the expression `5 `mod` 2` evaluate to?",
    options: [
      "`2`",
      "`1`",
      "`0`",
      "Type error"
    ],
    correctIndex: 1,
    explanation: "Using backticks makes `mod` an infix operator. `5 mod 2` evaluates to `1`, the remainder of 5 divided by 2."
  },
  {
    question: "If `f :: Int -> Int -> Int`, what is the type of `f 5`?",
    options: [
      "`Int`",
      "`Int -> Int`",
      "`Int -> Int -> Int`",
      "Type error"
    ],
    correctIndex: 1,
    explanation: "Due to currying, applying `f` to one argument (`5`) returns a new function that expects the second `Int` argument, hence the type `Int -> Int`."
  },
  {
    question: "Which operator is used to compose two functions `f` and `g` such that `x` is passed to `g`, and the result to `f`?",
    options: [
      "`$`",
      "`.`",
      "`->`",
      "`++`"
    ],
    correctIndex: 1,
    explanation: "The `.` operator is the function composition operator. `(f . g) x` is equivalent to `f (g x)`."
  }
];