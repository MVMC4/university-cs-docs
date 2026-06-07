export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is a Sum type in Haskell?",
    options: [
      "A type that adds numerical values together",
      "A type that represents alternatives (OR logic) between different constructors",
      "A type that combines multiple fields simultaneously (AND logic)",
      "A synonym for a standard List"
    ],
    correctIndex: 1,
    explanation: "Sum types represent choices. For example, `data Shape = Circle Float | Rectangle Float Float` means a Shape is a Circle OR a Rectangle."
  },
  {
    question: "What is a Product type in Haskell?",
    options: [
      "A type that multiplies numerical values",
      "A type that combines multiple values simultaneously (AND logic)",
      "A type with no constructors",
      "A type that only contains functions"
    ],
    correctIndex: 1,
    explanation: "Product types combine values. For example, `data Person = Person String Int` means a Person has a String AND an Int."
  },
  {
    question: "How do you hide implementation details of an ADT in Haskell?",
    options: [
      "Using the `private` keyword",
      "Using Modules and selective export lists",
      "By declaring global variables",
      "It is impossible in Haskell"
    ],
    correctIndex: 1,
    explanation: "By exporting the type name but not its constructors (e.g., `module Stack (Stack, push) where`), you prevent external code from pattern matching on the internal structure."
  },
  {
    question: "What is the primary benefit of using Record Syntax in a data declaration?",
    options: [
      "It makes the code execute faster",
      "It automatically generates named getter functions for the fields",
      "It allows for dynamic typing",
      "It enables infinite loops"
    ],
    correctIndex: 1,
    explanation: "Defining `data User = User { name :: String }` automatically creates a function `name :: User -> String` to extract the field."
  },
  {
    question: "What defines a recursive Algebraic Data Type?",
    options: [
      "It contains a function that calls itself",
      "The type definition refers to itself, enabling hierarchical structures like Trees",
      "It cannot be used in pattern matching",
      "It only works with Integer types"
    ],
    correctIndex: 1,
    explanation: "Recursive ADTs, like `data Tree a = Node a (Tree a) (Tree a)`, allow the construction of arbitrarily deep, nested data structures."
  }
];