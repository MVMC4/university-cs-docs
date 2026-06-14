export const quizData = [
  {
    question: "Who is the creator of the λ-calculus?",
    options: [
      "Alan Turing",
      "John Backus",
      "Alonzo Church",
      "Haskell Curry"
    ],
    correctIndex: 2,
    explanation: "Lambda calculus was introduced by Alonzo Church as a formal system for expressing computation."
  },
  {
    question: "What are the three fundamental components of Lambda Calculus?",
    options: [
      "Variables, Loops, and Conditionals",
      "Variables, Abstraction, and Application",
      "Functions, Arguments, and Return values",
      "State, Memory, and Registers"
    ],
    correctIndex: 1,
    explanation: "Lambda calculus is based entirely on Variables, Abstraction (defining functions), and Application (applying functions)."
  },
  {
    question: "In Lambda Calculus, how is a boolean value encoded?",
    options: [
      "As a primitive integer 0 or 1.",
      "As a function that selects between two alternatives.",
      "As a special data constructor.",
      "As a pointer to a memory address."
    ],
    correctIndex: 1,
    explanation: "In Church encoding, booleans are defined purely as functions that select between two alternatives."
  },
  {
    question: "What is the lambda expression for Church TRUE?",
    options: [
      "$\\lambda x. \\lambda y. y$",
      "$\\lambda x. \\lambda y. x$",
      "$\\lambda x. x + 1$",
      "$\\lambda p. \\lambda q. p \\, q \\, p$"
    ],
    correctIndex: 1,
    explanation: "Church TRUE is defined as $\\lambda x. \\lambda y. x$, meaning it picks the first of two alternatives."
  },
  {
    question: "What is the lambda expression for Church FALSE?",
    options: [
      "$\\lambda x. \\lambda y. x$",
      "$\\lambda x. \\lambda y. y$",
      "$\\lambda p. \\lambda q. q \\, p \\, q$",
      "$\\lambda x. x$"
    ],
    correctIndex: 1,
    explanation: "Church FALSE is defined as $\\lambda x. \\lambda y. y$, meaning it picks the second of two alternatives."
  },
  {
    question: "What is the mechanical rule of β-reduction?",
    options: [
      "Adding two lambda expressions together.",
      "Applying a function to an argument replaces the parameter with the argument in the function body.",
      "Renaming variables to avoid naming collisions.",
      "Converting a lambda expression into a Turing machine."
    ],
    correctIndex: 1,
    explanation: "β-reduction is the mechanical substitution rule: $(\\lambda x. M) N \\rightarrow M[x := N]$."
  },
  {
    question: "In the expression $(\\lambda x. M) N$, what does $M[x := N]$ denote?",
    options: [
      "The multiplication of $M$ and $N$.",
      "The substitution of all free occurrences of $x$ in $M$ with $N$.",
      "The type signature of $M$ applied to $N$.",
      "The negation of $M$."
    ],
    correctIndex: 1,
    explanation: "$M[x := N]$ denotes the substitution of all free occurrences of the parameter $x$ in the body $M$ with the argument $N$."
  },
  {
    question: "What is the result of applying Church TRUE to the arguments `A` and `B`?",
    options: [
      "`B`",
      "`A`",
      "`A AND B`",
      "`A OR B`"
    ],
    correctIndex: 1,
    explanation: "Since TRUE picks the first alternative, applying it to `A` and `B` yields `A`."
  },
  {
    question: "What is the result of applying Church FALSE to the arguments `A` and `B`?",
    options: [
      "`A`",
      "`B`",
      "`NOT A`",
      "`NOT B`"
    ],
    correctIndex: 1,
    explanation: "Since FALSE picks the second alternative, applying it to `A` and `B` yields `B`."
  },
  {
    question: "What is the result of the first β-reduction step: $(\\lambda f. \\lambda x. f (f x)) (\\lambda y. y + 1)$?",
    options: [
      "$\\lambda x. (\\lambda y. y + 1) x$",
      "$\\lambda x. (\\lambda y. y + 1) ((\\lambda y. y + 1) x)$",
      "$\\lambda x. x + 2$",
      "$(\\lambda y. y + 1) ((\\lambda y. y + 1) 0)$"
    ],
    correctIndex: 1,
    explanation: "Substituting $f := (\\lambda y. y + 1)$ into the body $\\lambda x. f (f x)$ yields $\\lambda x. (\\lambda y. y + 1) ((\\lambda y. y + 1) x)$."
  },
  {
    question: "What is the underlying model of computation for the GHC runtime?",
    options: [
      "A fetch-execute cycle",
      "An optimised β-reduction machine",
      "A relational database engine",
      "A stack-based virtual machine"
    ],
    correctIndex: 1,
    explanation: "The GHC runtime is fundamentally an optimised β-reduction machine that evaluates lambda terms."
  },
  {
    question: "What does it mean that Lambda Calculus is 'Turing-complete'?",
    options: [
      "It can only compute mathematical functions.",
      "It requires hardware primitives to perform computation.",
      "It can express any computation without any notion of mutation, state, or hardware.",
      "It is faster than a physical Turing machine."
    ],
    correctIndex: 2,
    explanation: "Turing-completeness means it can express any computation purely through function abstraction and application, without needing state or hardware."
  },
  {
    question: "In the Church encoding of booleans, what does the `and'` operator do?",
    options: [
      "It adds two boolean values together.",
      "If $p$ is true, it evaluates $q$; otherwise, it returns $p$.",
      "It always returns TRUE.",
      "It negates the value of $p$."
    ],
    correctIndex: 1,
    explanation: "The `and'` operator is defined as $\\lambda p. \\lambda q. p \\, q \\, p$. If $p$ is true, it selects $q$; if $p$ is false, it selects $p$ (which is false)."
  },
  {
    question: "What is the final evaluated result of the expression $(\\lambda f. \\lambda x. f (f x)) (\\lambda y. y + 1) 0$?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctIndex: 2,
    explanation: "The expression applies the successor function twice to 0. $0 + 1 = 1$, and $1 + 1 = 2$."
  },
  {
    question: "In Haskell, what are anonymous functions syntactically representing?",
    options: [
      "Macro expansions",
      "Lambda terms",
      "Pointers to C functions",
      "Object methods"
    ],
    correctIndex: 1,
    explanation: "Anonymous functions in Haskell (written with `\\`) are the surface syntax for lambda terms."
  }
];