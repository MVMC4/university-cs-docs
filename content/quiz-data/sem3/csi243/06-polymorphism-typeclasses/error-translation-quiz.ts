export const quizData = [
  {
    question: "What is the most common cause of the error `Couldn't match expected type 'Int' with actual type '[Int]'`?",
    options: [
      "Trying to add two strings together.",
      "Passing a list where a single element was expected, or vice versa (e.g., using `++` instead of `:`).",
      "Misspelling a variable name.",
      "Forgetting to import a module."
    ],
    correctIndex: 1,
    explanation: "This error indicates a structural mismatch between a list and a single element, often caused by misusing the `++` (list concatenation) and `:` (cons) operators."
  },
  {
    question: "How do you fix the error `No instance for (Num [Char])`?",
    options: [
      "Add a `deriving (Num)` clause to the String type.",
      "Use the `read` function with a type annotation to convert the String to a numeric type before performing arithmetic.",
      "Change the `+` operator to `++`.",
      "Wrap the String in a list."
    ],
    correctIndex: 1,
    explanation: "This error occurs when you try to perform numeric operations on a String (`[Char]`). You must explicitly parse the String into a number using `read '5' :: Int`."
  },
  {
    question: "What does the error `Parse error on input '|'` typically indicate?",
    options: [
      "A missing `in` keyword after a `let` binding, or misaligned guards violating the layout rule.",
      "A missing type signature.",
      "An infinite loop.",
      "A division by zero."
    ],
    correctIndex: 0,
    explanation: "A parse error on `|` usually means the compiler encountered a guard in an invalid syntactic position, such as directly after a `let` binding (which requires `in`) or with incorrect indentation."
  },
  {
    question: "What are the three primary causes of a `Not in scope: variable 'x'` error?",
    options: [
      "Typo in the variable name, scope boundaries (e.g., using a `where` variable outside its function), or indentation errors.",
      "The variable is too large.",
      "The variable is a reserved keyword.",
      "The file is not saved."
    ],
    correctIndex: 0,
    explanation: "Scope errors arise from spelling mistakes, attempting to use a variable outside the block (like `let` or `where`) where it was defined, or indentation that misleads the parser about the block's extent."
  },
  {
    question: "Why does `xs ++ 5` cause a type error, and what is the correct alternative?",
    options: [
      "Because `++` requires two lists. The correct alternative is `xs ++ [5]` or `5 : xs`.",
      "Because `5` is not a valid Haskell character. The correct alternative is `'5'`.",
      "Because `xs` must be a tuple. The correct alternative is `(xs, 5)`.",
      "It does not cause a type error."
    ],
    correctIndex: 0,
    explanation: "The `++` operator has the type `[a] -> [a] -> [a]`. It expects a list on both sides. To append a single element, you must wrap it in a list `[5]` or use the cons operator `:`."
  },
  {
    question: "If you write `f x = let y = x * 2 | y > 10 = 'Big'`, what error will GHC produce?",
    options: [
      "`Not in scope: y`",
      "`Parse error on input '|'`",
      "`No instance for (Num String)`",
      "`Couldn't match expected type 'Int'`"
    ],
    correctIndex: 1,
    explanation: "A `let` binding must be followed by an `in` expression. Guards (`|`) cannot directly follow a `let` binding. A `where` clause should be used instead."
  },
  {
    question: "What is the correct way to fix an indentation-related scope error where a `where` clause is not recognized?",
    options: [
      "Use tabs instead of spaces.",
      "Ensure the bindings in the `where` clause are indented further than the `where` keyword itself.",
      "Move the `where` clause to the top of the file.",
      "Remove the `where` keyword entirely."
    ],
    correctIndex: 1,
    explanation: "Haskell's layout rule requires that definitions within a `where` (or `let`, `do`, `of`) block be indented strictly further than the keyword that introduced the block."
  },
  {
    question: "What does the error `No instance for (Eq MyType)` mean when you try to derive `Ord`?",
    options: [
      "You must manually implement `Ord`.",
      "`Ord` has `Eq` as a superclass constraint, so you must derive or implement `Eq` before you can derive `Ord`.",
      "`MyType` cannot be ordered.",
      "You need to import `Data.Eq`."
    ],
    correctIndex: 1,
    explanation: "In Haskell's typeclass hierarchy, ordering (`Ord`) requires equality (`Eq`). The compiler demands that `Eq` be satisfied first."
  },
  {
    question: "If GHC says `Couldn't match expected type 'a -> b' with actual type 'Int'`, what is the likely structural error?",
    options: [
      "You passed an `Int` where a function was expected (e.g., missing an argument to a function, or misusing function composition).",
      "You tried to add a function to an Int.",
      "You forgot to derive `Show`.",
      "You used a type variable incorrectly."
    ],
    correctIndex: 0,
    explanation: "This mismatch indicates the compiler expected a function (perhaps due to partial application or composition `.`) but received a concrete `Int` value instead."
  },
  {
    question: "Why is it a bad practice to ignore GHC warnings about 'Non-exhaustive patterns'?",
    options: [
      "It makes the code run slower.",
      "It will cause a runtime crash (exception) if the function is called with an input that matches the missing pattern.",
      "It prevents the code from compiling.",
      "It automatically changes the type of the function."
    ],
    correctIndex: 1,
    explanation: "Non-exhaustive patterns mean there is at least one valid input for which the function has no defined behavior, leading to a runtime `Non-exhaustive patterns` exception."
  },
  {
    question: "When diagnosing a `Not in scope` error, what is the first thing you should check?",
    options: [
      "The time complexity of the function.",
      "The spelling of the variable and whether it is defined within the same lexical scope (e.g., inside the correct `let` or `where` block).",
      "The typeclass constraints.",
      "The module export list."
    ],
    correctIndex: 1,
    explanation: "Scope errors are most frequently caused by simple typos or attempting to use a variable outside the block where it was bound."
  },
  {
    question: "What is the correct fix for `Parse error on input '='` when defining a function with guards?",
    options: [
      "Remove the `=` signs.",
      "Ensure the guards (`|`) and their corresponding `=` are properly aligned and indented relative to the function name.",
      "Use `let` instead of guards.",
      "Add a semicolon at the end of the line."
    ],
    correctIndex: 1,
    explanation: "Parse errors on `=` in guarded functions are almost always layout/indentation issues. The guards must be indented further than the function name."
  },
  {
    question: "If you get `No instance for (Num [Char])` on the line `x + 'hello'`, what is the fundamental type mismatch?",
    options: [
      "You are trying to add a number to a String (`[Char]`), but `(+)` requires both operands to be of the same `Num` type.",
      "You are trying to concatenate two numbers.",
      "The variable `x` is not defined.",
      "Strings cannot be used in Haskell."
    ],
    correctIndex: 0,
    explanation: "The `(+)` operator is for numeric types. `'hello'` is a list of characters (`[Char]`), which is not a `Num` instance."
  },
  {
    question: "What does the GHC error `Ambiguous type variable 'a0' arising from a use of 'read'` indicate?",
    options: [
      "The `read` function is broken.",
      "The compiler cannot infer the target type for the `read` conversion, requiring an explicit type annotation (e.g., `:: Int`).",
      "The string being read is empty.",
      "The `read` function is not imported."
    ],
    correctIndex: 1,
    explanation: "Because `read` is polymorphic (`Read a => String -> a`), the compiler needs context to know whether to produce an `Int`, `Double`, etc. Without it, the type variable remains ambiguous."
  },
  {
    question: "How does the 'Error Translator' approach improve the debugging process?",
    options: [
      "It automatically fixes the code for you.",
      "It teaches you to recognize the underlying structural or syntactic cause of common error messages, rather than just guessing.",
      "It disables strict type checking.",
      "It translates errors into different programming languages."
    ],
    correctIndex: 1,
    explanation: "Understanding the *why* behind common GHC errors (e.g., knowing that `++` expects lists, or that `let` requires `in`) allows for rapid, systematic diagnosis and correction."
  }
];