export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "Which of the following is NOT a core principle of Functional Programming?",
    options: [
      "Immutability",
      "First-Class and Higher-Order Functions",
      "Explicit state mutation via loops",
      "Function Composition"
    ],
    correctIndex: 2,
    explanation: "Functional programming avoids explicit state mutation and loops, favouring immutability, recursion, and declarative transformations."
  },
  {
    question: "In Object-Oriented Programming, what principle involves bundling data and methods that operate on that data, while restricting direct access to some of the object's components?",
    options: [
      "Polymorphism",
      "Encapsulation",
      "Inheritance",
      "Abstraction"
    ],
    correctIndex: 1,
    explanation: "Encapsulation is the bundling of data and methods, restricting direct access to protect the object's internal state."
  },
  {
    question: "Why does the `notPure` global variable example break Referential Transparency?",
    options: [
      "Because it uses a loop.",
      "Because it reads and mutates hidden external state, so replacing the function call with its value changes the program's behaviour.",
      "Because it is written in C instead of Haskell.",
      "Because it does not use higher-order functions."
    ],
    correctIndex: 1,
    explanation: "Referential Transparency requires that an expression can be replaced by its value without changing the program's behaviour. Mutating a global variable means the function's output depends on hidden state, breaking this guarantee."
  },
  {
    question: "Annotate the C statement `sum += arr[i] * arr[i]`. Which Von Neumann operations does it perform?",
    options: [
      "Only ALU (arithmetic only, no memory access).",
      "FETCH arr[i], ALU multiply, ALU add, STORE sum.",
      "Only STORE (writing a result).",
      "Beta-reduction (it is a functional expression)."
    ],
    correctIndex: 1,
    explanation: "The CPU must FETCH arr[i] from memory (at least once), perform two ALU operations (multiply and add), then STORE the updated sum back to memory. All three Von Neumann operation types are present."
  },
  {
    question: "In Church Encoding, how is FALSE defined, and what does it do when applied to two arguments?",
    options: [
      "λx. x — it returns its only argument.",
      "λx. λy. x — it returns the first argument (picks the truthy branch).",
      "λx. λy. y — it returns the second argument (picks the falsy branch).",
      "λf. λx. f x — it applies a function once."
    ],
    correctIndex: 2,
    explanation: "Church FALSE is encoded as the function that takes two arguments and returns the second. This models the semantic of FALSE: when you make a boolean choice (if-then-else), FALSE picks the 'else' branch."
  },
  {
    question: "Trace every β-reduction step of `(λx. x + 2) ((λy. y * 3) 4)`. What is the fully reduced result and what is the intermediate lambda term after the first reduction?",
    options: [
      "Intermediate: (λx. x + 2) 12 — then x := 12, giving 14.",
      "Intermediate: (λx. x + 2) (4 * 3) — then arithmetic, then x := 12, giving 14.",
      "Intermediate: (λy. y * 3) (x + 2) — then y := x + 2, giving 10.",
      "No intermediate step — both reductions happen simultaneously, giving 18."
    ],
    correctIndex: 0,
    explanation: "By the standard left-to-right evaluation order, the inner redex (λy. y * 3) 4 is reduced first: substitute y := 4, yielding 4 * 3 = 12. The expression becomes (λx. x + 2) 12. Then substitute x := 12, yielding 12 + 2 = 14."
  },
  {
    question: "Why does Referential Transparency make Common Subexpression Elimination (CSE) safe?",
    options: [
      "Because CPUs have hardware caches that automatically deduplicate function calls.",
      "Because a pure function always returns the same value for the same input, so evaluating it once and sharing the result cannot change program behaviour.",
      "Because the hardware bus can bypass duplicate FETCH operations.",
      "Because Haskell uses a JIT compiler that detects duplicate calls at runtime."
    ],
    correctIndex: 1,
    explanation: "CSE replaces `f x + f x` with `let v = f x in v + v`, evaluating `f x` once. This transformation is semantics-preserving only if `f` has no side effects — i.e., only if it is pure."
  },
  {
    question: "How does Haskell perform I/O if all its functions are pure?",
    options: [
      "Via an `impure` keyword that temporarily suspends purity.",
      "By constructing pure AST-like descriptions of effects that the Runtime System (RTS) interprets and executes.",
      "By making direct C library calls that bypass the Haskell evaluator.",
      "By using global mutable variables managed by the garbage collector."
    ],
    correctIndex: 1,
    explanation: "An `IO a` value is a pure data structure — a recipe for effects. Building the recipe is pure; executing it is the RTS's job. No purity is violated because description is not execution."
  }
];