export const quizData = [
  {
    question: "What are the two essential components of every well-formed recursive function?",
    options: [
      "A loop and a counter.",
      "A base case and a recursive step.",
      "An accumulator and a tail call.",
      "A type signature and a module declaration."
    ],
    correctIndex: 1,
    explanation: "A base case terminates the recursion, and a recursive step reduces the problem size toward the base case."
  },
  {
    question: "What is the purpose of a piecewise mathematical specification in the 5-Part Framework?",
    options: [
      "To define the compiler optimization rules.",
      "To formally describe the function's behavior for all inputs before coding.",
      "To calculate the time complexity of the function.",
      "To generate automatic test cases."
    ],
    correctIndex: 1,
    explanation: "The specification provides a rigorous, language-agnostic definition of the base and recursive cases, serving as a blueprint for implementation."
  },
  {
    question: "In a dry run, what does the 'substitution' step involve?",
    options: [
      "Replacing the function name with its definition and evaluating the arguments.",
      "Compiling the code to machine language.",
      "Replacing variables with random values to test edge cases.",
      "Converting recursive calls into iterative loops."
    ],
    correctIndex: 0,
    explanation: "Substitution (β-reduction) involves replacing the function application with its right-hand side, substituting the actual arguments for the formal parameters."
  },
  {
    question: "If a recursive function lacks a base case, what will happen at runtime?",
    options: [
      "The compiler will automatically insert a base case.",
      "It will result in a compile-time type error.",
      "It will cause an infinite loop or stack overflow.",
      "It will return a default value like 0 or Nothing."
    ],
    correctIndex: 2,
    explanation: "Without a base case, the function will continue to call itself indefinitely, eventually exhausting the call stack (stack overflow) or memory."
  },
  {
    question: "In the recursive step of `fac n = n * fac (n-1)`, how is the problem size reduced?",
    options: [
      "By multiplying `n` by the result.",
      "By passing `n-1` as the argument to the recursive call.",
      "By adding 1 to `n`.",
      "By dividing `n` by 2."
    ],
    correctIndex: 1,
    explanation: "The argument `n-1` is strictly smaller than `n`, ensuring that the sequence of calls will eventually reach the base case of `0`."
  },
  {
    question: "What is the result of the base case in the mathematical specification of the factorial function?",
    options: [
      "`fac 0 = 0`",
      "`fac 0 = 1`",
      "`fac 1 = 0`",
      "`fac n = n`"
    ],
    correctIndex: 1,
    explanation: "By mathematical definition, the factorial of 0 is 1 (`fac 0 = 1`), which serves as the multiplicative identity and the base case."
  },
  {
    question: "During a dry run of `fac 3`, how many total calls to `fac` are made (including the initial call)?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctIndex: 2,
    explanation: "The calls are: `fac 3`, `fac 2`, `fac 1`, and `fac 0`. This totals 4 calls."
  },
  {
    question: "What distinguishes a 'total' recursive function from a 'partial' recursive function?",
    options: [
      "Total functions use tail recursion; partial functions do not.",
      "Total functions are defined for all possible inputs in their domain; partial functions are not.",
      "Total functions have a base case; partial functions do not.",
      "Total functions return a list; partial functions return a single value."
    ],
    correctIndex: 1,
    explanation: "A total function guarantees a valid output for every possible input of its declared type, whereas a partial function may crash or loop infinitely for some inputs (e.g., `head []`)."
  },
  {
    question: "In the 5-Part Framework, which step immediately follows the 'Specification'?",
    options: [
      "Implementation",
      "Test",
      "Dry Run",
      "Signature"
    ],
    correctIndex: 2,
    explanation: "The order is: 1. Signature, 2. Specification, 3. Dry Run, 4. Implementation, 5. Test."
  },
  {
    question: "Why is the Dry Run step considered critical before writing the Implementation?",
    options: [
      "It proves the code compiles without syntax errors.",
      "It verifies the logical soundness of the recursive reduction and base case resolution on paper.",
      "It automatically generates the GHCi test output.",
      "It calculates the Big-O time complexity."
    ],
    correctIndex: 1,
    explanation: "The Dry Run forces the programmer to manually trace the evaluation, catching logical flaws in the recursive step or base case before any code is written."
  },
  {
    question: "What is the role of the 'Test' step in the 5-Part Framework?",
    options: [
      "To write formal mathematical proofs of correctness.",
      "To provide empirical evidence via copy-pasted GHCi execution output.",
      "To profile the memory usage of the function.",
      "To document the type signature."
    ],
    correctIndex: 1,
    explanation: "The Test step requires reproducible, empirical proof that the implemented function behaves as specified, demonstrated by actual GHCi session output."
  },
  {
    question: "If a recursive function's argument does not get smaller (or closer to the base case) in the recursive step, what is the likely outcome?",
    options: [
      "The compiler will optimize it into a constant.",
      "It will result in a type error.",
      "It will cause infinite recursion.",
      "It will return the base case value immediately."
    ],
    correctIndex: 2,
    explanation: "If the problem size does not decrease, the base case will never be reached, leading to infinite recursion and a stack overflow."
  },
  {
    question: "In Haskell, how is the 'recursive step' typically identified in the code?",
    options: [
      "By the presence of the `rec` keyword.",
      "By the function calling itself within its own definition.",
      "By the use of a `for` loop.",
      "By the `derive` keyword."
    ],
    correctIndex: 1,
    explanation: "Recursion in Haskell is defined by a function referencing its own name within its right-hand side expression."
  },
  {
    question: "Which of the following is a valid base case for a function processing a list `[a]`?",
    options: [
      "`f (x:xs) = ...`",
      "`f [] = ...`",
      "`f xs = f (tail xs)`",
      "`f x = x`"
    ],
    correctIndex: 1,
    explanation: "The empty list `[]` is the canonical base case for list recursion, representing the smallest possible list."
  },
  {
    question: "What mathematical concept is the 'Dry Run' step formally emulating?",
    options: [
      "Mathematical induction",
      "β-reduction (substitution)",
      "Lambda abstraction",
      "Type inference"
    ],
    correctIndex: 1,
    explanation: "The Dry Run manually performs β-reduction, substituting arguments into the function body and evaluating the resulting expression step-by-step."
  }
];