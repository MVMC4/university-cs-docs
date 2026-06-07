export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the primary function of the Cons operator `:` in Haskell?",
    options: [
      "Concatenates two separate lists together",
      "Checks two lists for structural equality",
      "Prepends a single element to the front of an existing list",
      "Reverses the order of elements in a list"
    ],
    correctIndex: 2,
    explanation: "The Cons operator (`:`) takes an element and a list, returning a new list with the element at the head. For example, `1 : [2, 3]` evaluates to `[1, 2, 3]`."
  },
  {
    question: "In pattern matching, what does the underscore `_` represent?",
    options: [
      "A wildcard that matches any value without binding it to a variable name",
      "A representation of the empty list `[]`",
      "A command to throw a runtime error",
      "A syntax for initiating an infinite loop"
    ],
    correctIndex: 0,
    explanation: "The underscore `_` is a wildcard pattern. It tells the compiler that a value is expected in that position, but we do not care about its specific value and do not need to reference it."
  },
  {
    question: "In the list comprehension `[x^2 | x <- [1..5], even x]`, what is the role of `even x`?",
    options: [
      "It sorts the resulting list in ascending order",
      "It generates the initial sequence of numbers from 1 to 5",
      "It squares the elements that pass the test",
      "It acts as a filter predicate to include only elements where the condition is True"
    ],
    correctIndex: 3,
    explanation: "In a list comprehension, conditions placed after the generator (separated by commas) act as predicates. Only elements that satisfy the predicate are passed to the output expression."
  },
  {
    question: "What does the As-pattern syntax `all@(x:xs)` achieve?",
    options: [
      "Multiplies all elements in the list together",
      "Binds the entire structure to the name 'all' while simultaneously deconstructing it into head 'x' and tail 'xs'",
      "Reverses the order of the list elements",
      "Filters out all elements except the first one"
    ],
    correctIndex: 1,
    explanation: "As-patterns (`@`) allow you to match a pattern and bind the entire matched value to a variable name at the same time, avoiding the need to reconstruct the list."
  },
  {
    question: "Which of the following denotes the empty list in Haskell?",
    options: [
      "[]",
      "()",
      "null",
      "{}"
    ],
    correctIndex: 0,
    explanation: "`[]` is the syntax for the empty list in Haskell. `()` represents the Unit type, and `null` is not a built-in keyword for empty collections in Haskell."
  }
];