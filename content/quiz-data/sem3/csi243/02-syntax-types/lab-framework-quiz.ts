export const quizData = [
  {
    question: "What is the first mandatory step in the 5-Part Lab Framework?",
    options: [
      "Implementation",
      "Specification",
      "Signature",
      "Dry Run"
    ],
    correctIndex: 2,
    explanation: "The framework begins with the Signature, which explicitly defines the function name, argument types, and return type."
  },
  {
    question: "What is the purpose of the 'Specification' step in the 5-Part Lab Framework?",
    options: [
      "To write the actual Haskell code.",
      "To provide a piecewise mathematical definition of the function's behavior for all inputs.",
      "To copy-paste the GHCi terminal output.",
      "To trace the evaluation step-by-step."
    ],
    correctIndex: 1,
    explanation: "The Specification formally describes what the function should do, often using mathematical or piecewise notation, before any code is written."
  },
  {
    question: "What does the 'Dry Run' step entail?",
    options: [
      "Compiling the code to check for syntax errors.",
      "A step-by-step substitution trace using sample inputs to prove the logic on paper.",
      "Running the code in GHCi and saving the output.",
      "Writing unit tests using a testing framework."
    ],
    correctIndex: 1,
    explanation: "The Dry Run is a manual, step-by-step evaluation (beta-reduction) of the function with sample inputs to verify the logic before implementation."
  },
  {
    question: "Why is the 'Dry Run' step considered critical in the framework?",
    options: [
      "Because it is required for the Haskell compiler to optimize the code.",
      "Because it forces the programmer to trace the evaluation model and catch logical errors before coding.",
      "Because it automatically generates the test cases.",
      "Because it replaces the need for a Specification."
    ],
    correctIndex: 1,
    explanation: "The Dry Run ensures that the underlying logic is sound and correctly models the evaluation process, preventing logical bugs in the Implementation."
  },
  {
    question: "What is the 'Implementation' step?",
    options: [
      "The mathematical definition of the function.",
      "The actual, executable Haskell code.",
      "The GHCi terminal output.",
      "The type signature of the function."
    ],
    correctIndex: 1,
    explanation: "The Implementation is the actual Haskell source code that realizes the logic defined in the Specification and Dry Run."
  },
  {
    question: "What is required for the 'Test' step in the 5-Part Lab Framework?",
    options: [
      "A formal mathematical proof of correctness.",
      "GHCi execution proof (copy-pasting the terminal output) demonstrating the function works.",
      "A written paragraph explaining the code.",
      "A complexity analysis (Big-O notation)."
    ],
    correctIndex: 1,
    explanation: "The Test step requires empirical evidence: copy-pasting the actual GHCi session output to prove the function behaves as specified."
  },
  {
    question: "Which of the following represents a valid 'Signature' for a function that reverses a list of any type?",
    options: [
      "`revList :: [a] -> [a]`",
      "`revList :: [Int] -> [Int]`",
      "`revList :: a -> a`",
      "`revList :: [a] -> a`"
    ],
    correctIndex: 0,
    explanation: "`[a] -> [a]` correctly indicates that the function takes a list of any type `a` and returns a list of the same type `a`."
  },
  {
    question: "In the 5-Part Framework, if the Dry Run fails to produce the expected result, what should you do?",
    options: [
      "Proceed to Implementation and fix it later.",
      "Revise the Specification or logic before writing any code.",
      "Change the Test cases to match the failed Dry Run.",
      "Add type annotations to force it to work."
    ],
    correctIndex: 1,
    explanation: "The framework is sequential. If the Dry Run (logical trace) fails, the underlying logic is flawed and must be corrected before Implementation."
  },
  {
    question: "What is the primary benefit of enforcing the 5-Part Lab Framework?",
    options: [
      "It makes the code run faster.",
      "It ensures rigorous specification, verifiable logic, and reproducible results.",
      "It allows the use of imperative programming constructs.",
      "It automatically infers complex types."
    ],
    correctIndex: 1,
    explanation: "The framework is a pedagogical and engineering tool designed to enforce disciplined, verifiable, and well-documented functional programming practices."
  },
  {
    question: "Which part of the framework explicitly bridges the gap between abstract mathematical logic and concrete executable code?",
    options: [
      "Signature",
      "Specification",
      "Dry Run",
      "Implementation"
    ],
    correctIndex: 2,
    explanation: "The Dry Run takes the abstract Specification and applies concrete sample inputs step-by-step, bridging the gap to the concrete Implementation."
  },
  {
    question: "If a function is defined piecewise in the Specification, how should the Dry Run reflect this?",
    options: [
      "It should ignore the piecewise conditions and evaluate the first one.",
      "It should explicitly show which condition is met and trace the evaluation of that specific branch.",
      "It should combine all branches into a single equation.",
      "It should skip to the Implementation."
    ],
    correctIndex: 1,
    explanation: "The Dry Run must explicitly evaluate the guards or patterns to determine which piecewise branch is taken, and then trace that specific branch."
  },
  {
    question: "What is the role of the type signature in preventing errors during the Implementation phase?",
    options: [
      "It acts as a contract that the compiler checks, catching type mismatches before runtime.",
      "It automatically converts types to match the implementation.",
      "It disables the type checker for that function.",
      "It has no role; it is purely for documentation."
    ],
    correctIndex: 0,
    explanation: "The signature acts as a strict contract. The compiler verifies that the Implementation adheres to this contract, catching a vast class of errors at compile time."
  },
  {
    question: "In the 'Test' phase, why is copy-pasting GHCi output preferred over simply stating 'it works'?",
    options: [
      "Because GHCi output is cryptographically signed.",
      "Because it provides immutable, reproducible empirical evidence of the function's behavior.",
      "Because the professor requires a minimum word count.",
      "Because GHCi output includes the source code."
    ],
    correctIndex: 1,
    explanation: "Copy-pasting the exact terminal output provides verifiable, reproducible proof that the function was executed and produced the expected result."
  },
  {
    question: "Which of the following is NOT one of the 5 parts of the Lab Framework?",
    options: [
      "Signature",
      "Compilation",
      "Dry Run",
      "Test"
    ],
    correctIndex: 1,
    explanation: "The 5 parts are Signature, Specification, Dry Run, Implementation, and Test. 'Compilation' is not a distinct step in this framework."
  },
  {
    question: "When writing the 'Specification', which of the following is the most appropriate style?",
    options: [
      "A vague description like 'it does the thing to the stuff'.",
      "A piecewise mathematical definition or clear logical conditions.",
      "The raw Haskell code.",
      "A diagram of the computer's memory."
    ],
    correctIndex: 1,
    explanation: "The Specification should be a precise, language-agnostic (often mathematical) description of the function's behavior for all possible inputs."
  }
];