export const quizData = [
  {
    question: "Which description best defines a pure function?",
    options: [
      "It always runs in constant time",
      "Its result depends only on its arguments and evaluating it causes no observable side effect",
      "It must accept exactly one argument",
      "It may read external state as long as it does not print anything",
    ],
    correctIndex: 1,
    explanation: "Purity concerns predictable results and the absence of observable side effects. It does not imply a particular speed or number of arguments. Reading external state can make a result depend on more than the declared arguments.",
  },
  {
    question: "Which operation is an effectful action rather than a pure calculation?",
    options: [
      "Calculating the length of a supplied list",
      "Converting a supplied temperature from Celsius to Fahrenheit",
      "Reading a line from the keyboard",
      "Checking whether a supplied number is even",
    ],
    correctIndex: 2,
    explanation: "Keyboard input interacts with the external world and can produce different data on different executions. The other operations can be calculated entirely from their supplied inputs.",
  },
  {
    question: "What does referential transparency allow a programmer to do?",
    options: [
      "Replace an expression with its value without changing observable behaviour",
      "Change a binding whenever a new value is required",
      "Run every function in parallel automatically",
      "Ignore the types of intermediate expressions",
    ],
    correctIndex: 0,
    explanation: "A referentially transparent expression can be substituted with its value because it has no hidden dependency or side effect that would be lost by the replacement.",
  },
  {
    question: "Why must a Haskell if expression contain an else branch?",
    options: [
      "The else branch is executed before the condition",
      "Every if expression must produce a value whether the condition is True or False",
      "Haskell permits only two statements in a function",
      "The else branch converts an IO action into a pure value",
    ],
    correctIndex: 1,
    explanation: "An if construct in Haskell is an expression. Both possible paths therefore need to provide the result of that expression.",
  },
  {
    question: "What does immutability mean for a binding such as taxRate = 0.14?",
    options: [
      "The value is stored permanently on disk",
      "The name taxRate cannot be used by another module",
      "Within its scope, taxRate is not later assigned a different value",
      "The compiler recalculates 0.14 every time taxRate is mentioned",
    ],
    correctIndex: 2,
    explanation: "A Haskell binding associates a name with a value; it is not a mutable box updated by later assignment. Immutability says nothing about disk storage or module visibility.",
  },
  {
    question: "Given the composition f . g, which function receives the original input first?",
    options: ["f", "g", "Both at the same time", "Whichever function is declared first in the file"],
    correctIndex: 1,
    explanation: "Composition is read from right to left: (f . g) x has the same result as f (g x), so g processes x first.",
  },
  {
    question: "Which design creates the clearest boundary between pure calculations and effects?",
    options: [
      "Make every helper function read its own input",
      "Combine file access, validation, and formatting in one function",
      "Read input in a small IO layer, pass the data to pure functions, then output the result",
      "Avoid all input and output in every real program",
    ],
    correctIndex: 2,
    explanation: "A small IO boundary isolates external interaction while keeping validation, transformation, and formatting predictable and independently testable.",
  },
  {
    question: "Which claim about pure functions is false?",
    options: [
      "They are easier to test with fixed inputs and expected outputs",
      "The same arguments produce the same result",
      "They cannot perform observable output while being evaluated",
      "They are guaranteed to use the fastest possible algorithm",
    ],
    correctIndex: 3,
    explanation: "Purity describes behaviour, not efficiency. A pure function can still use a slow algorithm or consume excessive memory.",
  },
  {
    question: "Which description is primarily imperative?",
    options: [
      "Transform every list element with the same function",
      "Define the result as the composition of two transformations",
      "Create a result, loop through the input, and repeatedly append to the result",
      "Describe a value using an expression",
    ],
    correctIndex: 2,
    explanation: "The description focuses on a sequence of commands and repeated changes to a result. The other choices emphasize values or transformations.",
  },
  {
    question: "Why is greeting name = \"Hello, \" ++ name easier to reuse than a function that immediately prints the greeting?",
    options: [
      "The pure version can be tested and combined without performing terminal output",
      "String concatenation automatically writes the result to a file",
      "A pure function never needs a type",
      "Printing prevents a function from accepting an argument",
    ],
    correctIndex: 0,
    explanation: "The pure function returns a String, so callers can test, transform, store, or print that value as needed. Immediate printing fixes the function to one effectful use.",
  },
];
