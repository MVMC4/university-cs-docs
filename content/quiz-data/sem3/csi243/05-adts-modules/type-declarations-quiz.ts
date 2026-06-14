export const quizData = [
  {
    question: "What is the fundamental difference between a `type` synonym and a `newtype` declaration in Haskell?",
    options: [
      "`type` creates a new runtime type, while `newtype` is erased at compile time.",
      "`type` is just a compile-time alias with no new type created, while `newtype` creates a distinct type that is erased at runtime.",
      "`type` can have multiple constructors, while `newtype` can only have one.",
      "There is no difference; they are interchangeable."
    ],
    correctIndex: 1,
    explanation: "A `type` synonym is purely a compile-time alias. A `newtype` creates a distinct type checked by the compiler, but its constructor is erased at runtime, incurring zero overhead."
  },
  {
    question: "Which of the following best describes a 'Sum Type' in Haskell?",
    options: [
      "A type that bundles multiple values together simultaneously (AND logic).",
      "A type that can be exactly one of several distinct variants (OR logic).",
      "A type that represents a mathematical sum of two integers.",
      "A type alias for a list of numbers."
    ],
    correctIndex: 1,
    explanation: "A Sum Type (e.g., `data Color = Red | Blue`) represents a choice: the value is Red OR Blue, but not both."
  },
  {
    question: "Which of the following best describes a 'Product Type' in Haskell?",
    options: [
      "A type that can be one of several variants.",
      "A type that bundles multiple values together simultaneously (AND logic).",
      "A type that multiplies two numbers.",
      "A recursive data structure."
    ],
    correctIndex: 1,
    explanation: "A Product Type (e.g., `data Point = Point Int Int`) contains multiple fields simultaneously: an Int AND an Int."
  },
  {
    question: "What is the cardinality (number of possible values) of the type `data Bool = False | True`?",
    options: [
      "1",
      "2",
      "Infinite",
      "0"
    ],
    correctIndex: 1,
    explanation: "The `Bool` type has exactly two constructors (`False` and `True`), each taking no arguments, so its cardinality is 1 + 1 = 2."
  },
  {
    question: "If `data Pair = P Bool Bool`, what is its cardinality?",
    options: [
      "2",
      "4",
      "8",
      "16"
    ],
    correctIndex: 1,
    explanation: "This is a Product Type. The cardinality is the product of the cardinalities of its fields: 2 (for the first Bool) * 2 (for the second Bool) = 4."
  },
  {
    question: "What is the cardinality of the function type `Bool -> Bool`?",
    options: [
      "2",
      "4",
      "8",
      "16"
    ],
    correctIndex: 1,
    explanation: "The cardinality of a function type `a -> b` is |b|^|a|. For `Bool -> Bool`, this is 2^2 = 4 possible mappings."
  },
  {
    question: "What is the purpose of the `deriving` clause in a `data` declaration?",
    options: [
      "It automatically generates implementations for specified typeclasses (e.g., `Show`, `Eq`) based on the type's structure.",
      "It forces the programmer to manually write all typeclass instances.",
      "It converts the data type into a type synonym.",
      "It hides the constructors from other modules."
    ],
    correctIndex: 0,
    explanation: "The `deriving` clause instructs the compiler to automatically generate boilerplate code for standard typeclasses like `Show` or `Eq`."
  },
  {
    question: "Why must `Eq` be derived before `Ord` when deriving typeclasses for a custom ADT?",
    options: [
      "Because `Ord` is a subclass of `Eq`, and ordering requires the ability to test for equality first.",
      "Because the Haskell parser reads top-to-bottom.",
      "Because `Eq` is faster to compute than `Ord`.",
      "It is not required; they can be derived in any order."
    ],
    correctIndex: 0,
    explanation: "In Haskell's typeclass hierarchy, `Ord` has `Eq` as a superclass constraint. You cannot define an ordering without first defining equality."
  },
  {
    question: "What happens if you export a type name without its constructors (e.g., `module MyMod (MyType) where`)?",
    options: [
      "External modules can freely construct values of `MyType`.",
      "External modules can pattern match on `MyType`.",
      "External modules can use the type in signatures but cannot construct or pattern match on its values directly.",
      "The type becomes completely unusable outside the module."
    ],
    correctIndex: 2,
    explanation: "Exporting only the type name hides the constructors. This is the foundation of the Smart Constructor pattern, forcing external code to use provided functions to create values."
  },
  {
    question: "Which of the following correctly defines a Sum Type representing a traffic light?",
    options: [
      "`type TrafficLight = Red | Yellow | Green`",
      "`data TrafficLight = Red | Yellow | Green`",
      "`data TrafficLight = TrafficLight Red Yellow Green`",
      "`newtype TrafficLight = Red | Yellow | Green`"
    ],
    correctIndex: 1,
    explanation: "The `data` keyword is used to define new algebraic data types, and the `|` symbol separates the sum (OR) variants."
  },
  {
    question: "What is the runtime overhead of a `newtype` wrapper compared to the underlying type?",
    options: [
      "It adds a pointer indirection.",
      "It adds a constructor tag byte.",
      "Zero overhead; the wrapper is completely erased at compile time.",
      "It doubles the memory usage."
    ],
    correctIndex: 2,
    explanation: "A `newtype` with a single constructor and a single field is representationally identical to the underlying type at runtime. The constructor is erased during compilation."
  },
  {
    question: "If `data Choice = A Bool | B Int`, what is its cardinality?",
    options: [
      "2",
      "3",
      "4",
      "Infinite"
    ],
    correctIndex: 3,
    explanation: "The `B Int` variant can hold any integer. Since the set of integers is infinite, the total number of possible values for `Choice` is infinite."
  },
  {
    question: "Which keyword is used to create a strict type alias that the compiler treats as a completely distinct type?",
    options: [
      "`type`",
      "`data`",
      "`newtype`",
      "`class`"
    ],
    correctIndex: 2,
    explanation: "`newtype` creates a distinct type (unlike `type`), but is restricted to a single constructor with a single field, allowing it to be erased at runtime (unlike `data`)."
  },
  {
    question: "When pattern matching on a Product Type like `data Point = Point Int Int`, how many variables must you bind in the pattern?",
    options: [
      "Exactly one.",
      "Exactly two.",
      "As many as you want, using wildcards for the rest.",
      "Zero, you can just match `Point`."
    ],
    correctIndex: 1,
    explanation: "The `Point` constructor takes exactly two arguments, so a complete pattern match must bind two variables (e.g., `Point x y`) or use wildcards (e.g., `Point _ _`)."
  },
  {
    question: "What is the primary benefit of using Sum Types over Enumerations in languages like C or Java?",
    options: [
      "Sum Types can carry different types of data in each variant.",
      "Sum Types are faster to execute.",
      "Sum Types do not require pattern matching.",
      "Sum Types can be mutated after creation."
    ],
    correctIndex: 0,
    explanation: "Unlike simple enums, Haskell's Sum Type variants can carry payload data of different types (e.g., `data Result = Success String | Error Int`)."
  }
];