export const quizData = [
  {
    question: "What must be the very first line of a Haskell source file that defines a module?",
    options: [
      "`import Data.List`",
      "`module ModuleName where`",
      "`data MyType`",
      "`main :: IO ()`"
    ],
    correctIndex: 1,
    explanation: "The `module` declaration must appear at the very top of the file, before any imports or type definitions."
  },
  {
    question: "What does the export list `module Geometry (Shape(..), area) where` explicitly export?",
    options: [
      "Only the `area` function.",
      "The `Shape` type, all of its constructors, and the `area` function.",
      "The `Shape` type, but hides its constructors.",
      "Everything in the file, regardless of the list."
    ],
    correctIndex: 1,
    explanation: "The `..` syntax after a type name in an export list explicitly exports the type and all of its data constructors."
  },
  {
    question: "What is the effect of exporting a type name without its constructors, e.g., `module Age (Age, mkAge) where`?",
    options: [
      "External modules can freely construct `Age` values using the hidden constructor.",
      "External modules can use `Age` in type signatures but must use `mkAge` to construct values, enforcing invariants.",
      "The `Age` type becomes completely unusable outside the module.",
      "It causes a compile-time error."
    ],
    correctIndex: 1,
    explanation: "Hiding the constructor prevents external code from bypassing validation logic. They must use the provided 'Smart Constructor' (`mkAge`) to create valid values."
  },
  {
    question: "What is a 'Smart Constructor' in Haskell?",
    options: [
      "A constructor that automatically derives typeclasses.",
      "A regular function that validates input and constructs a value of an abstract type, ensuring domain invariants are maintained.",
      "A constructor that uses the `newtype` keyword.",
      "A compiler optimization for recursive functions."
    ],
    correctIndex: 1,
    explanation: "A Smart Constructor is a function (not a data constructor) that checks preconditions before creating a value, preventing the creation of invalid states."
  },
  {
    question: "What is the primary purpose of a `qualified` import, e.g., `import qualified Data.Map as Map`?",
    options: [
      "To import only specific functions from a module.",
      "To prevent namespace collisions by requiring a prefix (e.g., `Map.lookup`) for all imported names.",
      "To import a module without compiling it.",
      "To rename the module file on disk."
    ],
    correctIndex: 1,
    explanation: "Qualified imports keep the local namespace clean and prevent name clashes by forcing the use of a module prefix for all imported identifiers."
  },
  {
    question: "What does the selective import `import Data.List (nub, sort)` do?",
    options: [
      "It imports the entire `Data.List` module.",
      "It imports only the `nub` and `sort` functions into the current namespace.",
      "It renames `nub` to `sort`.",
      "It prevents `nub` and `sort` from being used."
    ],
    correctIndex: 1,
    explanation: "Selective imports explicitly list the exact names to be brought into scope, keeping the namespace minimal and explicit."
  },
  {
    question: "If a module exports `Shape(Circle)`, what can external code do?",
    options: [
      "Construct both `Circle` and `Rect` values.",
      "Construct `Circle` values, but not `Rect` values.",
      "Pattern match on `Rect` but not `Circle`.",
      "Neither construct nor pattern match on any `Shape` constructor."
    ],
    correctIndex: 1,
    explanation: "The export list `Shape(Circle)` explicitly exposes only the `Circle` constructor, keeping `Rect` (and any others) hidden from external modules."
  },
  {
    question: "Why is `newtype` preferred over `data` when implementing Smart Constructors for single-field wrappers?",
    options: [
      "Because `newtype` allows multiple constructors.",
      "Because `newtype` provides the same type safety as `data` but with zero runtime overhead due to constructor erasure.",
      "Because `newtype` does not require a module export list.",
      "Because `newtype` automatically derives `Show` and `Eq`."
    ],
    correctIndex: 1,
    explanation: "`newtype` guarantees that the wrapper is erased at compile time, meaning the safety of the Smart Constructor comes with absolutely no performance penalty."
  },
  {
    question: "What happens if you try to use a data constructor that is not listed in the module's export list?",
    options: [
      "The compiler issues a warning but allows it.",
      "The compiler throws a 'Not in scope: data constructor' error.",
      "The constructor is automatically imported.",
      "The program compiles but crashes at runtime."
    ],
    correctIndex: 1,
    explanation: "Haskell strictly enforces module boundaries. If a constructor is not exported, it is completely invisible to importing modules, resulting in a compile-time scope error."
  },
  {
    question: "Which of the following is a valid module declaration?",
    options: [
      "`module MyModule where`",
      "`MyModule module where`",
      "`where module MyModule`",
      "`import MyModule`"
    ],
    correctIndex: 0,
    explanation: "The correct syntax for declaring a module is `module ModuleName where`, placed at the very top of the file."
  },
  {
    question: "If `module Age (Age, mkAge)` is defined, and `Age` is a `newtype` with a hidden constructor, how does external code get the `Int` value out of an `Age`?",
    options: [
      "By pattern matching on the hidden constructor.",
      "By using a provided accessor function (e.g., `getAge`) that is explicitly exported.",
      "By casting it to `Int`.",
      "It is impossible to extract the value."
    ],
    correctIndex: 1,
    explanation: "Since the constructor is hidden, external code must rely on explicitly exported accessor functions (like `getAge`) to safely extract the underlying value."
  },
  {
    question: "What is the default export behavior if a module declaration has no explicit export list (e.g., `module MyModule where`)?",
    options: [
      "Nothing is exported.",
      "Everything defined in the module is exported.",
      "Only functions are exported, not types.",
      "Only types are exported, not functions."
    ],
    correctIndex: 1,
    explanation: "Omitting the export list is equivalent to exporting everything defined in the module, including all types and their constructors."
  },
  {
    question: "When using `import qualified Data.Map as Map`, how do you call the `lookup` function?",
    options: [
      "`lookup`",
      "`Data.Map.lookup`",
      "`Map.lookup`",
      "`qualified lookup`"
    ],
    correctIndex: 2,
    explanation: "The `as Map` clause assigns the prefix `Map.` to all imported entities, so the function is accessed as `Map.lookup`."
  },
  {
    question: "Can a Haskell module import itself?",
    options: [
      "Yes, freely.",
      "No, it results in a cyclic dependency error.",
      "Yes, but only for type synonyms.",
      "Yes, but only in GHCi."
    ],
    correctIndex: 1,
    explanation: "Haskell does not allow cyclic module dependencies. A module cannot import itself, directly or indirectly."
  },
  {
    question: "What is the primary benefit of the Module System's encapsulation features?",
    options: [
      "It makes the code run faster.",
      "It allows developers to hide implementation details and enforce invariants, reducing the surface area for bugs.",
      "It automatically generates documentation.",
      "It eliminates the need for type signatures."
    ],
    correctIndex: 1,
    explanation: "By selectively exporting only what is necessary (like Smart Constructors), the module system enforces correct usage and protects internal invariants from being violated by external code."
  }
];