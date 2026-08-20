export const quizData = [
  {
    question: "In the GHCi interaction ghci> 6 * 7 followed by 42, which part is the value produced by evaluation?",
    options: ["ghci>", "6 * 7", "42", "The entire interaction"],
    correctIndex: 2,
    explanation: "6 * 7 is the expression entered after the prompt. GHCi evaluates that expression, and 42 is the resulting value it displays. The ghci> prompt only means that GHCi is ready for input.",
  },
  {
    question: "Which option is a String literal rather than an identifier?",
    options: ["courseName", "CSI243", "\"CSI243\"", "'CSI243'"],
    correctIndex: 2,
    explanation: "A String literal uses double quotes. courseName and CSI243 are unquoted names, while single quotes are used for exactly one Char and therefore cannot enclose CSI243.",
  },
  {
    question: "What are the type and value of the expression 8 > 3?",
    options: ["Integer and 5", "Bool and True", "String and \"True\"", "Bool and False"],
    correctIndex: 1,
    explanation: "The > operator compares its operands and produces a Bool. Because 8 is greater than 3, the resulting Bool value is True, not the string \"True\".",
  },
  {
    question: "Why is 'A' == \"A\" rejected?",
    options: ["Equality cannot compare text", "Single quotes make 'A' an identifier", "The operands have different types: Char and String", "Double quotes are only allowed in saved files"],
    correctIndex: 2,
    explanation: "'A' is one Char, while \"A\" is a String containing one character. Equality requires compatible operand types, and a one-character string does not become a Char automatically.",
  },
  {
    question: "Assume square x = x * x. How does Haskell group square 3 + 4?",
    options: ["square (3 + 4)", "(square 3) + 4", "square (3) (+4)", "square (3 +) 4"],
    correctIndex: 1,
    explanation: "Function application by spaces binds more tightly than the + operator. Haskell therefore applies square to 3 first, then adds 4.",
  },
  {
    question: "Which expression explicitly passes the value of 3 + 4 as the argument to square?",
    options: ["square 3 + 4", "square + 3 4", "square (3 + 4)", "(square 3) 4"],
    correctIndex: 2,
    explanation: "Parentheses make 3 + 4 a single argument expression. Without them, square 3 is evaluated as the function application before the addition occurs.",
  },
  {
    question: "Which statement accurately compares Int and Integer?",
    options: ["Int stores fractions, while Integer stores whole numbers", "Int is fixed-width, while Integer supports arbitrary-precision whole numbers", "Integer is always smaller than Int", "Only Int can be used with arithmetic operators"],
    correctIndex: 1,
    explanation: "Both types represent whole numbers and support arithmetic. Int has a bounded machine representation; Integer can expand to represent much larger whole values, subject to available memory.",
  },
  {
    question: "What does GHCi's :type command do?",
    options: ["Evaluates an expression twice", "Displays the inferred type without evaluating the expression for its value", "Converts every value to String", "Creates a new identifier"],
    correctIndex: 1,
    explanation: ":type asks GHCi to report the type it infers for an expression. It is a GHCi command because it begins with a colon; it is not a Haskell conversion function.",
  },
  {
    question: "Which expression has type Char?",
    options: ["\"Z\"", "'Z'", "Z", "\"\""],
    correctIndex: 1,
    explanation: "A Char literal contains exactly one character between single quotes. \"Z\" and \"\" are String literals, and unquoted Z is parsed as a name rather than text.",
  },
  {
    question: "Why does print Hello World fail to print the intended sentence?",
    options: ["print accepts only numbers", "Haskell ignores all spaces in expressions", "Hello and World are treated as identifiers, and spaces form function applications", "Every printed string must use single quotes"],
    correctIndex: 2,
    explanation: "The intended message must be a String literal: print \"Hello World\". Without quotes, the words are names, and the expression groups through function application rather than becoming one piece of text.",
  },
];
