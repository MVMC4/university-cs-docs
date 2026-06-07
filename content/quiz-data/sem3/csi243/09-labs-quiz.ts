export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "In the AST Lab, what ADT concept is used to model expressions?",
    options: [
      "Sum types for operators, Product types for nodes",
      "Only primitive Int types",
      "String representations",
      "Infinite loops"
    ],
    correctIndex: 0,
    explanation: "ADTs perfectly model tree-like Abstract Syntax Trees (ASTs), where Sum types represent different node kinds (Add, Mul) and Product types hold their children."
  },
  {
    question: "Why must the Parser Lab use an accumulator?",
    options: [
      "To make the code syntactically shorter",
      "To ensure O(1) space complexity via tail-recursion",
      "To use global mutable state",
      "To avoid pattern matching"
    ],
    correctIndex: 1,
    explanation: "Tracking nesting depth iteratively requires passing the current depth as an accumulator, enabling Tail Call Optimization (TCO) and preventing stack overflows."
  },
  {
    question: "What does simplify :: Expr -> Expr do in Lab 1?",
    options: [
      "Deletes the AST entirely",
      "Applies algebraic identities to reduce the tree (e.g., x + 0 = x)",
      "Converts the expression to a String",
      "Evaluates the expression to an Int"
    ],
    correctIndex: 1,
    explanation: "Simplification optimizes the AST by removing redundant operations before the final evaluation step, improving efficiency."
  },
  {
    question: "If the Parser Lab accumulator drops below 0, what does it mean?",
    options: [
      "The string is perfectly balanced",
      "A closing parenthesis appeared without a matching opening parenthesis",
      "The recursion has terminated",
      "The space complexity is O(n)"
    ],
    correctIndex: 1,
    explanation: "A negative depth indicates an invalid state (e.g., ')('), meaning the string is unbalanced and the function should immediately return false."
  }
];