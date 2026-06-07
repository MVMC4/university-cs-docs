import type { Question } from '@/components/quiz';

const learningObjectives = [
  "Define basic Algebraic Data Types (ADTs) and write functions that pattern match on their constructors.",
  "Structure Haskell programs using the Module System, including selective exports and qualified imports.",
  "Implement recursive ADTs following a standard framework, such as a Binary Search Tree.",
  "Calculate the cardinality of Sum, Product, and Exponential types to reason about program correctness.",
  "Utilise `newtype` for zero-overhead domain modelling and enforce invariants via Smart Constructors.",
];

export const quizData: Question[] = [
  {
    question: "What does `Shape(..)` export in a module declaration?",
    options: [
      "Only the type name `Shape`",
      "The type name and all its constructors",
      "Only the constructors, not the type",
      "Nothing, it's a syntax error"
    ],
    correctIndex: 1,
    explanation: "The `(..)` syntax exports the type along with all its value constructors, allowing external modules to pattern match and construct values."
  },
  {
    question: "Which statement about `newtype` vs `data` is TRUE?",
    options: [
      "`newtype` can have multiple constructors",
      "`data` has zero runtime overhead compared to `newtype`",
      "`newtype` constructors are erased at compile time, giving zero runtime overhead",
      "`newtype` can derive `Ord` without `Eq`"
    ],
    correctIndex: 2,
    explanation: "`newtype` with exactly one constructor and one field has its constructor erased at compile time, resulting in zero runtime overhead."
  },
  {
    question: "What is the cardinality of the type `data Choice = A Bool | B Bool`?",
    options: [
      "2",
      "4",
      "8",
      "16"
    ],
    correctIndex: 1,
    explanation: "This is a Sum type: |A Bool| + |B Bool| = 2 + 2 = 4 possible values."
  },
  {
    question: "To enforce that `Age` values cannot be negative, which approach is correct?",
    options: [
      "Export the `Age` constructor and validate in every function that uses it",
      "Hide the `Age` constructor and export only a smart constructor `mkAge :: Int -> Either String Age`",
      "Use `type Age = Int` and rely on comments",
      "Derive `Ord` and compare against zero at runtime"
    ],
    correctIndex: 1,
    explanation: "By hiding the constructor and only exporting a smart constructor, you enforce the invariant at the module boundary. External code cannot bypass the validation."
  },
  {
    question: "Which deriving clause is valid for `data Priority = Low | Medium | High`?",
    options: [
      "deriving (Ord)",
      "deriving (Eq, Ord, Show)",
      "deriving (Show, Ord)",
      "deriving (Num)"
    ],
    correctIndex: 1,
    explanation: "`Ord` has `Eq` as a superclass, so you must derive `Eq` first. `Num` is for numeric types and cannot be derived for sum types like this."
  }
];