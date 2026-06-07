export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the result of evaluating `addSub (10, 4)` where `addSub (x, y) = (x + y, x - y)`?",
    options: [
      "(6, 14)",
      "(14, 6)",
      "14",
      "A type error, because tuples cannot be returned from functions."
    ],
    correctIndex: 1,
    explanation: "The function adds the two elements (10 + 4 = 14) for the first tuple element, and subtracts them (10 - 4 = 6) for the second, returning the tuple (14, 6)."
  },
  {
    question: "In pattern matching, what does the as-pattern `all@(x:y:_)` bind when applied to the list `[1, 2, 3, 4]`?",
    options: [
      "all=[1,2,3,4], x=1, y=2",
      "all=[2,3,4], x=1, y=2",
      "all=[1,2], x=1, y=2",
      "It causes a pattern match failure."
    ],
    correctIndex: 0,
    explanation: "The `@` symbol binds the variable `all` to the entire matched value (`[1,2,3,4]`), while simultaneously deconstructing it so `x` binds to the head (1) and `y` binds to the second element (2)."
  },
  {
    question: "Which of the following is the correct syntax for a Guard in Haskell?",
    options: [
      "if score >= 80 then \"A\" else \"F\"",
      "| score >= 80 = \"A\"",
      "case score of >= 80 -> \"A\"",
      "guard score >= 80 : \"A\""
    ],
    correctIndex: 1,
    explanation: "Guards are introduced by the pipe character `|`, followed by a boolean expression, an equals sign `=`, and the resulting expression. `otherwise` is typically used as the final catch-all guard."
  },
  {
    question: "Why does `let x = 1 in | x > 0 = \"Yes\"` fail to compile?",
    options: [
      "The binding is missing a `where` clause.",
      "`let...in` is an expression and cannot directly precede guards; guards require a function definition context.",
      "Guards require an `otherwise` branch to be syntactically valid.",
      "`let` cannot bind integer literals."
    ],
    correctIndex: 1,
    explanation: "`let x = 1 in BODY` expects BODY to be a complete expression. Guards (`| condition = expr`) are syntax for choosing between branches of a *function definition*, not a standalone expression."
  },
  {
    question: "How does GHC parse the type signature `a -> b -> c`?",
    options: [
      "As a function taking a tuple (a, b) and returning c.",
      "As a -> (b -> c): a function taking 'a' and returning a function 'b -> c'.",
      "As b -> (a -> c): arguments are reordered by the compiler.",
      "As a syntax error — multi-argument types require parentheses."
    ],
    correctIndex: 1,
    explanation: "The function arrow (->) is right-associative, so `a -> b -> c` parses as `a -> (b -> c)`. This is the foundational rule of currying. It does NOT take a tuple; that would require the type `(a, b) -> c`."
  },
  {
    question: "Derive the point-free form of `\\x -> filter (> 5) (map (* 2) x)`. Which derivation is correct?",
    options: [
      "`filter (> 5) . map (* 2)` — map is applied first, then filter.",
      "`map (* 2) . filter (> 5)` — filter is applied first, then map.",
      "`filter . map` — both arguments are dropped via eta-reduction.",
      "`filter (> 5) $ map (* 2)` — this is point-free because `$` replaces the explicit application."
    ],
    correctIndex: 0,
    explanation: "Reading from inside out: first `map (* 2)` is applied to `x`, then `filter (> 5)` is applied to the result. Composition `(f . g) x = f (g x)` matches this. Eta-reducing `\\x -> (f . g) x` gives `f . g`."
  },
  {
    question: "In the equational reasoning proof of `length . map f = length`, what law justifies `length (f x : map f xs) = 1 + length (map f xs)`?",
    options: [
      "The Induction Hypothesis applied to xs.",
      "The definition of `map` for non-empty lists.",
      "The definition of `length` for a cons cell (y:ys).",
      "The definition of function composition (.)."
    ],
    correctIndex: 2,
    explanation: "The definition of `length` states: `length (y:ys) = 1 + length ys`. Applying this to `(f x : map f xs)` — a cons cell whose tail is `map f xs` — directly yields `1 + length (map f xs)`."
  },
  {
    question: "What is the primary difference between `where` and `let...in`?",
    options: [
      "`where` can be used inside list comprehensions, but `let...in` cannot.",
      "`let...in` is an expression that can be used anywhere a value is expected, while `where` attaches to a function definition.",
      "`where` evaluates strictly, while `let...in` evaluates lazily.",
      "There is no difference; they are completely interchangeable syntactic sugar."
    ],
    correctIndex: 1,
    explanation: "`let...in` is an expression (e.g., valid inside `case` or list comprehensions). `where` is a declaration-level construct that scopes over the entire function definition and its guards, but cannot be embedded arbitrarily inside expressions."
  }
];