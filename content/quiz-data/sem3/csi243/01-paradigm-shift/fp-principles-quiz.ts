export const quizData = [
  {
    question: "A function is considered 'pure' if it satisfies which two conditions?",
    options: [
      "It is recursive and it uses higher-order functions.",
      "It is deterministic and it performs no side effects.",
      "It is polymorphic and it uses pattern matching.",
      "It is memoised and it uses lazy evaluation."
    ],
    correctIndex: 1,
    explanation: "A pure function is deterministic (same inputs yield same outputs) and performs no observable side effects."
  },
  {
    question: "What is Referential Transparency?",
    options: [
      "The ability to substitute expressions with their evaluated values without changing program behavior.",
      "The ability to execute functions in parallel without race conditions.",
      "The guarantee that a function will never throw a runtime error.",
      "The property that all variables in a program are immutable."
    ],
    correctIndex: 0,
    explanation: "Referential Transparency is the property that allows an expression to be replaced by its corresponding value without altering the program's behavior."
  },
  {
    question: "Which of the following is an example of a side effect?",
    options: [
      "Returning a new list with sorted elements.",
      "Modifying a global variable.",
      "Calculating the sum of a list.",
      "Applying a function to every element in a list."
    ],
    correctIndex: 1,
    explanation: "Modifying a global variable is an observable interaction with the outside state, which defines a side effect."
  },
  {
    question: "What does Immutability guarantee in Functional Programming?",
    options: [
      "Functions can be passed as arguments.",
      "Data structures cannot be modified post-creation.",
      "The program will never run out of memory.",
      "All computations are performed at compile time."
    ],
    correctIndex: 1,
    explanation: "Immutability guarantees that once a data structure is created, it cannot be changed; operations produce new data structures instead."
  },
  {
    question: "What is a Higher-Order Function?",
    options: [
      "A function that executes faster than a standard function.",
      "A function that takes other functions as arguments or returns functions as results.",
      "A function that is defined at the global scope.",
      "A function that has no side effects."
    ],
    correctIndex: 1,
    explanation: "Higher-order functions are functions that either take other functions as arguments or return functions as their results."
  },
  {
    question: "What does it mean for functions to be 'First-Class Citizens'?",
    options: [
      "They are executed before any other code.",
      "They can be assigned to variables, passed as arguments, and returned from other functions.",
      "They are guaranteed to be pure.",
      "They are compiled into native machine code."
    ],
    correctIndex: 1,
    explanation: "First-class citizens can be assigned to variables, passed as arguments, and returned from other functions, just like any other data type."
  },
  {
    question: "Function composition (`f . g`) means:",
    options: [
      "Executing `f` and `g` in parallel.",
      "The output of one function becomes the input of the next.",
      "Adding the outputs of `f` and `g` together.",
      "Applying `f` and `g` to the same input simultaneously."
    ],
    correctIndex: 1,
    explanation: "Function composition combines functions such that the output of one function becomes the input of the next."
  },
  {
    question: "What compiler optimisation is safely enabled by Referential Transparency when an expression appears multiple times?",
    options: [
      "Dead code elimination",
      "Common Subexpression Elimination (CSE)",
      "Loop unrolling",
      "Pointer aliasing"
    ],
    correctIndex: 1,
    explanation: "Because pure functions guarantee the same output for the same input, the compiler can evaluate the expression once and share the result (CSE)."
  },
  {
    question: "How does the Haskell runtime achieve automatic memoisation?",
    options: [
      "By storing all function calls in a global hash map.",
      "Through lazy evaluation and graph sharing of pure thunks.",
      "By requiring the programmer to explicitly cache values.",
      "By compiling all functions into static lookup tables."
    ],
    correctIndex: 1,
    explanation: "The runtime automatically memoises pure computations via graph sharing, evaluating lazy thunks at most once."
  },
  {
    question: "Why is it safe for GHC to aggressively inline pure functions?",
    options: [
      "Because pure functions are always smaller than their call sites.",
      "Because inlining a pure function cannot alter observable side effects.",
      "Because pure functions do not use recursion.",
      "Because the compiler verifies the inline assembly."
    ],
    correctIndex: 1,
    explanation: "Since pure functions have no side effects, replacing a function call with its body cannot change the program's observable behavior."
  },
  {
    question: "In the context of FP, how is I/O handled without breaking purity?",
    options: [
      "I/O operations are strictly forbidden in FP.",
      "Pure functions describe I/O as data structures (recipes), which the RTS executes.",
      "I/O operations are executed in a separate thread.",
      "The compiler converts I/O operations into pure mathematical proofs."
    ],
    correctIndex: 1,
    explanation: "Pure functions describe I/O as data structures (recipes). The Haskell Runtime System (RTS) is responsible for actually executing these descriptions."
  },
  {
    question: "What is the type of a pure description of an I/O effect in Haskell?",
    options: [
      "`Effect a`",
      "`IO a` (or `IO ()`)",
      "`PureIO a`",
      "`SideEffect a`"
    ],
    correctIndex: 1,
    explanation: "The `IO` monad represents a pure description of an effect. A value of type `IO ()` is a pure description, not the effect itself."
  },
  {
    question: "Modularity in FP refers to:",
    options: [
      "Compiling code into separate object files.",
      "Breaking down a program into smaller, independent, and interchangeable components.",
      "Using multiple programming languages in one project.",
      "Separating the user interface from the business logic."
    ],
    correctIndex: 1,
    explanation: "Modularity is the practice of breaking down a program into smaller, independent, and interchangeable components (functions) that can be reasoned about in isolation."
  },
  {
    question: "The Von Neumann bottleneck is avoided in FP because:",
    options: [
      "FP programs do not use memory.",
      "The algorithm is expressed as mathematical transformations, abstracting away hardware memory management.",
      "FP programs run exclusively on quantum computers.",
      "The CPU cache is disabled during FP execution."
    ],
    correctIndex: 1,
    explanation: "By expressing algorithms as mathematical transformations rather than explicit memory fetches and stores, FP abstracts away the hardware memory-management noise."
  },
  {
    question: "If a function reads a global variable, it violates which principle?",
    options: [
      "Immutability",
      "Purity (specifically, it is no longer deterministic or side-effect-free)",
      "First-class citizenship",
      "Function composition"
    ],
    correctIndex: 1,
    explanation: "Reading a global variable means the function's output depends on hidden external state, violating the deterministic requirement of purity."
  }
];