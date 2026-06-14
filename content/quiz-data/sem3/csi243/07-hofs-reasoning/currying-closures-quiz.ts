export const quizData = [
  {
    question: "How does Haskell interpret the type signature `Int -> Int -> Int`?",
    options: [
      "A function that takes two Int arguments simultaneously.",
      "A function that takes an Int and returns a function of type `Int -> Int`.",
      "A function that returns an Int and takes an `Int -> Int` function.",
      "A syntax error; it should be `(Int, Int) -> Int`."
    ],
    correctIndex: 1,
    explanation: "The `->` operator is right-associative, so `Int -> Int -> Int` is parsed as `Int -> (Int -> Int)`, which is the essence of currying."
  },
  {
    question: "What is 'partial application' in Haskell?",
    options: [
      "Applying a function to more arguments than it expects.",
      "Applying a function to fewer arguments than it expects, yielding a new function.",
      "Applying a function to arguments of the wrong type.",
      "Evaluating a function lazily."
    ],
    correctIndex: 1,
    explanation: "Partial application occurs when a curried function is given some, but not all, of its arguments, returning a closure that awaits the rest."
  },
  {
    question: "What is a 'lexical closure'?",
    options: [
      "A block of code that cannot be modified.",
      "A function paired with the lexical environment (captured variables) in which it was defined.",
      "A type of error that occurs when a variable goes out of scope.",
      "A compiler optimization that removes unused variables."
    ],
    correctIndex: 1,
    explanation: "When a function is partially applied, the runtime creates a closure: a data structure holding the function's code and the specific captured values from its defining environment."
  },
  {
    question: "What is the type signature of the function composition operator `(.)`?",
    options: [
      "`(a -> b) -> (b -> c) -> (a -> c)`",
      "`(b -> c) -> (a -> b) -> (a -> c)`",
      "`(a -> b) -> (a -> b) -> (a -> b)`",
      "`(a -> a) -> (a -> a) -> (a -> a)`"
    ],
    correctIndex: 1,
    explanation: "The `(.)` operator takes a function `b -> c` and a function `a -> b`, and returns a new function `a -> c`."
  },
  {
    question: "What is 'point-free' style?",
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
    question: "Which of the following is the point-free equivalent of `\\x -> f (g x)`?",
    options: [
      "`f g`",
      "`f . g`",
      "`g . f`",
      "`f $ g`"
    ],
    correctIndex: 1,
    explanation: "By the definition of function composition, `(f . g) x = f (g x)`. Eta-reducing `\\x -> (f . g) x` yields `f . g`."
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
    question: "If `add :: Int -> Int -> Int`, what is the type of `add 5`?",
    options: [
      "`Int`",
      "`Int -> Int`",
      "`Int -> Int -> Int`",
      "`a -> a`"
    ],
    correctIndex: 1,
    explanation: "Applying `add` to its first argument (`5`) yields a closure that expects the second `Int` argument, hence the type `Int -> Int`."
  },
  {
    question: "What is the primary benefit of currying in functional programming?",
    options: [
      "It makes functions execute faster.",
      "It enables partial application, allowing the creation of specialized functions from general ones.",
      "It allows functions to take an infinite number of arguments.",
      "It eliminates the need for type signatures."
    ],
    correctIndex: 1,
    explanation: "Currying allows a multi-argument function to be partially applied, creating new, reusable functions with some arguments pre-filled."
  },
  {
    question: "In the expression `f . g . h`, in what order are the functions applied to an argument `x`?",
    options: [
      "`f`, then `g`, then `h`",
      "`h`, then `g`, then `f`",
      "`g`, then `f`, then `h`",
      "They are applied simultaneously."
    ],
    correctIndex: 1,
    explanation: "Function composition is evaluated right-to-left. `(f . g . h) x` is equivalent to `f (g (h x))`, so `h` is applied first."
  },
  {
    question: "Which of the following correctly demonstrates eta-reduction?",
    options: [
      "`\\x -> x + 1` reduces to `+ 1`",
      "`\\x -> f x` reduces to `f`",
      "`\\x y -> x + y` reduces to `+`",
      "`\\x -> f (g x)` reduces to `f g`"
    ],
    correctIndex: 1,
    explanation: "Eta-reduction states that `\\x -> f x` is equivalent to `f`, provided `x` does not appear free in `f`."
  },
  {
    question: "What does the `curry` function do in Haskell?",
    options: [
      "It converts a function taking a tuple into a curried function: `((a, b) -> c) -> (a -> b -> c)`.",
      "It converts a curried function into one that takes a tuple.",
      "It applies a function to a list of arguments.",
      "It memoizes a function."
    ],
    correctIndex: 0,
    explanation: "`curry` transforms a function that expects a single tuple argument into a curried function that expects two separate arguments."
  },
  {
    question: "What does the `uncurry` function do in Haskell?",
    options: [
      "It converts a curried function into one that takes a tuple: `(a -> b -> c) -> ((a, b) -> c)`.",
      "It converts a function taking a tuple into a curried function.",
      "It removes all type constraints from a function.",
      "It flattens a list of lists."
    ],
    correctIndex: 0,
    explanation: "`uncurry` is the inverse of `curry`; it transforms a curried function into one that expects a single tuple argument."
  },
  {
    question: "Why is point-free style sometimes discouraged for complex functions?",
    options: [
      "It is slower at runtime.",
      "It can become difficult to read and understand, as the data flow is implicit.",
      "It prevents the compiler from type checking.",
      "It requires enabling language extensions."
    ],
    correctIndex: 1,
    explanation: "While elegant for simple pipelines, excessive point-free style can obscure the data flow and make the code harder to reason about for humans."
  }
];