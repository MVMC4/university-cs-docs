export const quizData = [
  {
    question: "Which definition is pure?",
    options: [
      "double n = n * 2",
      "greet = putStrLn \"Hello\"",
      "answer = getLine",
      "main = print 8",
    ],
    correctIndex: 0,
    explanation: "double calculates a result solely from its input. The other definitions describe IO actions that read from or write to the outside world.",
  },
  {
    question: "What does `rectangleArea :: Double -> Double -> Double` promise?",
    options: [
      "One pair of Doubles is always required",
      "Two Double inputs lead to a Double result",
      "A Double is printed twice",
      "A Double is read from the keyboard",
    ],
    correctIndex: 1,
    explanation: "Reading the arrows from left to right identifies two Double inputs followed by a Double result. The signature does not describe printing or keyboard input.",
  },
  {
    question: "What is the exact visible difference between `putStrLn \"Hi\"` and `print \"Hi\"`?",
    options: [
      "putStrLn shows Hi; print shows \"Hi\"",
      "putStrLn shows \"Hi\"; print shows Hi",
      "Only putStrLn adds a newline, but the text is otherwise identical",
      "print cannot display a String",
    ],
    correctIndex: 0,
    explanation: "putStrLn writes the characters of the String directly, while print first uses show. show represents a String with quotation marks. Both actions end the line.",
  },
  {
    question: "What happens when `show 27` is evaluated?",
    options: [
      "27 is printed immediately",
      "The String \"27\" is produced without performing output",
      "An IO Integer action is produced",
      "The number is read from standard input",
    ],
    correctIndex: 1,
    explanation: "show is a pure conversion to String. Producing text as a value is different from displaying it with print or putStrLn.",
  },
  {
    question: "Why is `main` commonly given the type `IO ()`?",
    options: [
      "It must return an empty String",
      "It is the entry action and finishes with no useful calculated result",
      "It can contain only one output statement",
      "It disables type checking for the program",
    ],
    correctIndex: 1,
    explanation: "IO marks an action that can interact with the outside world. The unit type () indicates that the completed action does not return useful data to a caller.",
  },
  {
    question: "Inside a `do` block, which line correctly reads a line and names the resulting String?",
    options: [
      "let raw = getLine",
      "raw <- getLine",
      "getLine = raw",
      "raw -> getLine",
    ],
    correctIndex: 1,
    explanation: "<- performs the getLine action and binds its produced String to raw. `let raw = getLine` would name the IO String action itself rather than its result.",
  },
  {
    question: "Given `raw <- getLine`, which line creates a pure Integer binding named `age`?",
    options: [
      "age <- read raw :: Integer",
      "let age = read raw :: Integer",
      "age = getLine raw",
      "let age <- read raw",
    ],
    correctIndex: 1,
    explanation: "read raw is a pure parsing expression, so let binds its result. <- is reserved here for extracting the result of an action.",
  },
  {
    question: "What is the main danger of `read raw :: Integer` when raw came from a user?",
    options: [
      "It always rounds the number down",
      "It prints the parsed value automatically",
      "It can raise a runtime exception when the text is not a valid Integer",
      "It changes raw into an IO action",
    ],
    correctIndex: 2,
    explanation: "read expects text that matches the requested type. Input such as `four` cannot be parsed as an Integer and causes failure, so robust programs use validated parsing.",
  },
  {
    question: "Which sequence best separates effects from pure processing?",
    options: [
      "getLine, bind its result, transform the value with a pure function, then print the result",
      "print the prompt, call print again instead of processing, then use getLine last",
      "place getLine inside every arithmetic function",
      "convert the pure function itself into a String before reading input",
    ],
    correctIndex: 0,
    explanation: "A clear Haskell pipeline performs input at the boundary, passes the acquired value through pure transformations, and performs output at the boundary.",
  },
  {
    question: "Why does `print Hello World` not print the message Hello World?",
    options: [
      "print accepts only numbers",
      "Capital letters are forbidden in output",
      "Without quotes, Hello and World are parsed as identifiers in nested function application, not as one String literal",
      "Haskell strings must use single quotes",
    ],
    correctIndex: 2,
    explanation: "Spaces mean function application, so the expression is grouped like `(print Hello) World`. A text literal must be enclosed in double quotation marks: `print \"Hello World\"`.",
  },
];
