export const quizData = [
  {
    question: "What is the mandatory type signature for the `main` function in a compiled Haskell program?",
    options: [
      "`main :: String -> IO ()`",
      "`main :: IO ()`",
      "`main :: ()`",
      "`main :: IO Int`"
    ],
    correctIndex: 1,
    explanation: "Every compiled Haskell program must define a `main` function with the exact type signature `IO ()`."
  },
  {
    question: "What does the type `IO ()` represent?",
    options: [
      "An I/O action that returns an integer.",
      "An I/O action that performs side effects and returns the unit type `()`.",
      "A pure function that takes no arguments.",
      "A list of I/O actions."
    ],
    correctIndex: 1,
    explanation: "`IO ()` represents an I/O action that performs side effects and returns the unit type `()`, which carries no information."
  },
  {
    question: "What is the purpose of the `do` notation in Haskell?",
    options: [
      "It defines a new data type.",
      "It provides syntactic sugar for sequencing I/O actions.",
      "It creates a loop that repeats an action.",
      "It imports external libraries."
    ],
    correctIndex: 1,
    explanation: "The `do` notation provides syntactic sugar for sequencing I/O actions, allowing imperative-style code while maintaining monadic purity."
  },
  {
    question: "Which function outputs a single character to the standard output?",
    options: [
      "`printChar`",
      "`putChar`",
      "`outChar`",
      "`showChar`"
    ],
    correctIndex: 1,
    explanation: "`putChar :: Char -> IO ()` outputs a single character to the standard output."
  },
  {
    question: "Which function outputs a string without appending a trailing newline?",
    options: [
      "`putStrLn`",
      "`print`",
      "`putStr`",
      "`echo`"
    ],
    correctIndex: 2,
    explanation: "`putStr` outputs a string without a trailing newline, whereas `putStrLn` appends one."
  },
  {
    question: "Which function outputs a string followed by a newline?",
    options: [
      "`putStr`",
      "`putStrLn`",
      "`printLine`",
      "`newline`"
    ],
    correctIndex: 1,
    explanation: "`putStrLn` outputs a string followed by a newline character."
  },
  {
    question: "How does the `print` function differ from `putStrLn` when handling Strings?",
    options: [
      "`print` does not add a newline.",
      "`print` adds quotes around Strings, whereas `putStrLn` does not.",
      "`print` only works with integers.",
      "`print` converts the string to uppercase."
    ],
    correctIndex: 1,
    explanation: "`print` uses the `Show` typeclass, which adds quotes around Strings. `putStrLn` outputs the raw string content."
  },
  {
    question: "What is the type signature of the `getLine` function?",
    options: [
      "`String -> IO ()`",
      "`IO String`",
      "`IO ()`",
      "`String -> String`"
    ],
    correctIndex: 1,
    explanation: "`getLine` has the type `IO String`, representing an I/O action that yields a String."
  },
  {
    question: "What is the purpose of the `<-` operator inside a `do` block?",
    options: [
      "It assigns a constant value to a variable.",
      "It extracts the underlying pure value from an I/O action.",
      "It compares two I/O actions for equality.",
      "It sequences two actions without binding a value."
    ],
    correctIndex: 1,
    explanation: "The `<-` operator extracts the underlying pure value from an I/O action, binding it to a variable."
  },
  {
    question: "What does the `show` function do?",
    options: [
      "It prints a value to the console.",
      "It converts a value into a `String`.",
      "It parses a `String` into a value.",
      "It formats a string with quotes."
    ],
    correctIndex: 1,
    explanation: "`show` converts a value that is an instance of the `Show` typeclass into a `String`."
  },
  {
    question: "What does the `read` function do?",
    options: [
      "It reads a file from the disk.",
      "It parses a `String` into a specific polymorphic type.",
      "It outputs a string to the console.",
      "It converts a number to a string."
    ],
    correctIndex: 1,
    explanation: "`read` parses a `String` into a specific type, provided the type is an instance of the `Read` typeclass."
  },
  {
    question: "Why is a mandatory type annotation required when using `read`?",
    options: [
      "Because `read` is a monadic function.",
      "Because `read` is polymorphic, and the compiler must know the target type to parse the string correctly.",
      "Because `read` can only parse integers.",
      "Because the Haskell compiler cannot infer types automatically."
    ],
    correctIndex: 1,
    explanation: "Because `read` is polymorphic (it can return any `Read` instance), the compiler requires a type annotation (e.g., `:: Int`) to know exactly what type to parse the string into."
  },
  {
    question: "What is the unit type `()` in Haskell?",
    options: [
      "An empty list.",
      "A type that carries no information, often used as a return type for actions.",
      "A tuple containing one element.",
      "A null pointer."
    ],
    correctIndex: 1,
    explanation: "The unit type `()` is a type that carries no information, analogous to `void` in other languages."
  },
  {
    question: "In the expression `name <- getLine`, what is the type of the variable `name`?",
    options: [
      "`IO String`",
      "`String`",
      "`IO ()`",
      "`Char`"
    ],
    correctIndex: 1,
    explanation: "The `<-` operator extracts the pure `String` from the `IO String` action, so the variable `name` has the type `String`."
  },
  {
    question: "Where is the boundary between pure description and impure execution in Haskell?",
    options: [
      "Inside the `do` block.",
      "The `main` function, which the Runtime System (RTS) executes.",
      "When using the `print` function.",
      "There is no boundary; all Haskell code is pure."
    ],
    correctIndex: 1,
    explanation: "The boundary is the `main` function. Haskell code builds pure descriptions of effects, and the RTS executes them starting at `main`."
  }
];