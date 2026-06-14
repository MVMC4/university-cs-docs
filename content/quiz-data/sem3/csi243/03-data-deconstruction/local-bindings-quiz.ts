export const quizData = [
  {
    question: "What is the scope of a `where` clause in Haskell?",
    options: [
      "It is scoped only to the line it is defined on.",
      "It is scoped to the entire function definition, including all its guards.",
      "It is scoped globally to the entire module.",
      "It is scoped only to the `case` expression it is inside."
    ],
    correctIndex: 1,
    explanation: "A `where` clause is attached to a function equation and its bindings are visible to all guards and the right-hand side of that specific function definition."
  },
  {
    question: "What is the fundamental syntactic difference between `let ... in` and `where`?",
    options: [
      "`let ... in` is a statement, while `where` is an expression.",
      "`let ... in` is an expression that produces a value, while `where` is a declaration attached to a function.",
      "`where` can be used inside list comprehensions, but `let ... in` cannot.",
      "There is no difference; they are interchangeable."
    ],
    correctIndex: 1,
    explanation: "`let ... in` is an expression (it evaluates to a value and can be placed anywhere an expression is valid). `where` is a syntactic declaration attached to the bottom of a function equation."
  },
  {
    question: "Where can a `let ... in` binding be used that a `where` clause cannot?",
    options: [
      "At the top level of a module.",
      "Inside a list comprehension or a `case` expression.",
      "To define top-level functions.",
      "To define type signatures."
    ],
    correctIndex: 1,
    explanation: "Because `let ... in` is an expression, it can be embedded inline within list comprehensions, `case` branches, or `do` blocks, where `where` is syntactically invalid."
  },
  {
    question: "What error occurs if you attempt to place a guard `|` immediately after a `let` binding without an `in`?",
    options: [
      "A type error.",
      "A parse error on input `|`.",
      "A runtime exception.",
      "The guard is silently ignored."
    ],
    correctIndex: 1,
    explanation: "The `let` keyword expects an `in` keyword to follow its bindings. Placing a guard directly after it violates Haskell's syntax rules, resulting in a parse error."
  },
  {
    question: "In Haskell, what does it mean that every function is 'curried'?",
    options: [
      "Functions can only take one argument at a time, and multi-argument functions are chains of single-argument functions returning new functions.",
      "Functions are automatically optimized for speed.",
      "Functions can only operate on food-related data types.",
      "Functions are evaluated strictly from left to right."
    ],
    correctIndex: 0,
    explanation: "Currying means a function like `a -> b -> c` is actually `a -> (b -> c)`. It takes one argument and returns a new function that takes the next argument."
  },
  {
    question: "What is a 'closure' in the context of Haskell's evaluation model?",
    options: [
      "A block of code that cannot be modified.",
      "A runtime heap object containing a function's code and the immutable environment (captured variables) it was defined in.",
      "A type of error that occurs when a variable goes out of scope.",
      "A compiler optimization that removes unused variables."
    ],
    correctIndex: 1,
    explanation: "When a function is partially applied (e.g., `add 3`), the runtime creates a closure: a data structure holding the function's code and the specific captured values (like `3`)."
  },
  {
    question: "Why do closures in Haskell not suffer from the 'aliasing hazard' seen in languages like Python or JavaScript?",
    options: [
      "Because Haskell has a garbage collector.",
      "Because Haskell values are strictly immutable, so a closure captures a fixed value, not a reference to mutable state.",
      "Because Haskell does not support higher-order functions.",
      "Because closures are evaluated at compile time."
    ],
    correctIndex: 1,
    explanation: "Since Haskell data is immutable, a closure captures the actual value, not a memory reference. Subsequent 'changes' create new values, leaving the captured value in the closure unchanged."
  },
  {
    question: "What is 'eta-reduction'?",
    options: [
      "The process of adding more arguments to a function.",
      "The rule that if `f x = g x` for all `x`, then `f = g`, allowing the removal of redundant arguments.",
      "The reduction of a list to a single value.",
      "The optimization of recursive calls into loops."
    ],
    correctIndex: 1,
    explanation: "Eta-reduction is the formal rule that allows dropping the final argument from both sides of an equation if it is simply passed through, enabling point-free style."
  },
  {
    question: "What is 'point-free' style in Haskell?",
    options: [
      "Writing functions without using any punctuation.",
      "Writing functions without explicitly mentioning their arguments, achieved via function composition and eta-reduction.",
      "Writing functions that only operate on floating-point numbers.",
      "Writing functions that never terminate."
    ],
    correctIndex: 1,
    explanation: "Point-free style defines functions by composing other functions, omitting the explicit argument variables (the 'points')."
  },
  {
    question: "In equational reasoning, what is the 'Base Case'?",
    options: [
      "The most complex input to the function.",
      "The simplest possible input (e.g., an empty list or zero) used to anchor an inductive proof.",
      "The compiler's internal representation of the function.",
      "The error message returned by the function."
    ],
    correctIndex: 1,
    explanation: "In structural induction, the base case proves the property holds for the simplest data structure (like `[]`), providing the foundation for the inductive step."
  },
  {
    question: "What law is applied when rewriting `length (map f [])` to `length []`?",
    options: [
      "The definition of function composition.",
      "The definition of `map`: `map f [] = []`.",
      "The induction hypothesis.",
      "The definition of `length`."
    ],
    correctIndex: 1,
    explanation: "This step directly applies the base case definition of the `map` function, which states that mapping any function over an empty list yields an empty list."
  },
  {
    question: "Which of the following correctly demonstrates a valid `let ... in` expression?",
    options: [
      "`let x = 5 in x + 3`",
      "`let x = 5 where x + 3`",
      "`x = 5 let in x + 3`",
      "`let x = 5; in x + 3`"
    ],
    correctIndex: 0,
    explanation: "The correct syntax is `let [bindings] in [expression]`, where the bindings are evaluated and made available to the expression following `in`."
  },
  {
    question: "If `make_adder n = \\x -> n + x`, what is the type of `make_adder 5`?",
    options: [
      "`Int`",
      "`Int -> Int`",
      "`Int -> Int -> Int`",
      "`a -> a`"
    ],
    correctIndex: 1,
    explanation: "`make_adder` has type `Int -> (Int -> Int)`. Applying it to `5` yields a closure of type `Int -> Int` that adds 5 to its argument."
  },
  {
    question: "Why is indentation critical when using `where` clauses?",
    options: [
      "Because Haskell uses indentation (the layout rule) to determine the scope and grouping of bindings under the `where` keyword.",
      "Because incorrect indentation changes the types of the variables.",
      "Because the compiler ignores `where` clauses that are not indented exactly 8 spaces.",
      "Indentation is not important in `where` clauses."
    ],
    correctIndex: 0,
    explanation: "Haskell's layout rule uses indentation to group bindings. Bindings under a `where` clause must be indented further than the `where` keyword itself to be recognized as part of that block."
  },
  {
    question: "In the inductive step of proving `length . map f = length`, what is the 'Induction Hypothesis'?",
    options: [
      "Assuming the theorem holds for the empty list.",
      "Assuming the theorem holds for the tail `xs`, i.e., `(length . map f) xs = length xs`.",
      "Assuming `f` is an identity function.",
      "Assuming the list is infinite."
    ],
    correctIndex: 1,
    explanation: "The induction hypothesis assumes the property holds for a smaller structure (the tail `xs`), which is then used to prove it holds for the larger structure (`x:xs`)."
  }
];