export const quizData = [
  {
    question: "Why is `[1, 'a', \"string\"]` rejected?",
    options: [
      "Lists may hold at most two types",
      "Lists are homogeneous, so every element must share one type",
      "Strings cannot appear inside lists",
      "The list is missing a type signature",
    ],
    correctIndex: 1,
    explanation: "A list is a homogeneous structure. No single element type makes a number, a character, and a string the same kind of value, so GHC reports a type mismatch at compile time.",
  },
  {
    question: "Which expression is equivalent to `[1,2,3]`?",
    options: [
      "1:2:3",
      "[1]:[2]:[3]:[]",
      "1:(2:(3:[]))",
      "(1,2,3)",
    ],
    correctIndex: 2,
    explanation: "Every list is built from [] using cons. Because : associates to the right, 1:(2:(3:[])) may also be written 1:2:3:[]. Note the final [] is essential — 1:2:3 is a type error.",
  },
  {
    question: "What does `[1,2] : 3` produce?",
    options: [
      "[1,2,3]",
      "[[1,2],3]",
      "A type error, because : needs an element then a list",
      "[3,1,2]",
    ],
    correctIndex: 2,
    explanation: "The cons operator takes an element on the left and a list on the right. To append here you need [1,2] ++ [3].",
  },
  {
    question: "Why does recursion using `(x:xs)` terminate?",
    options: [
      "Because GHC limits recursion depth",
      "Because xs is always shorter, so calls must reach []",
      "Because the head is removed from memory",
      "It does not always terminate",
    ],
    correctIndex: 1,
    explanation: "The tail bound by xs has one fewer element than the argument. Repeated calls therefore shrink the list until the [] base case matches.",
  },
  {
    question: "What should the base case of a recursive `product` be?",
    options: [
      "0, matching sum",
      "1, the identity for multiplication",
      "The first element of the list",
      "An error, since an empty product is undefined",
    ],
    correctIndex: 1,
    explanation: "The base value must leave the result unchanged when combined. For multiplication that is 1, so product [5] correctly gives 5 * 1. Using 0 would make every product zero.",
  },
  {
    question: "Which Prelude list function is partial?",
    options: [
      "take",
      "length",
      "head",
      "reverse",
    ],
    correctIndex: 2,
    explanation: "head :: [a] -> a promises a result for every list, but an empty list has no first element, so head [] raises an exception. take, length, and reverse are all defined for every list.",
  },
  {
    question: "A filter recurses with `| otherwise = f (x:xs)`. What happens?",
    options: [
      "The element is correctly skipped",
      "The list never shrinks, so it does not terminate",
      "A non-exhaustive pattern error",
      "The element is duplicated",
    ],
    correctIndex: 1,
    explanation: "Recursing on (x:xs) passes the same list again, so the base case is never reached. Both guard branches must recurse on xs; only whether x is consed on should differ.",
  },
  {
    question: "Why are tuples of arity 1 not allowed?",
    options: [
      "They would be ambiguous with lists",
      "(5) is simply 5 in brackets, so there is nothing to distinguish",
      "The Prelude does not define fst for them",
      "They are allowed",
    ],
    correctIndex: 1,
    explanation: "Brackets around a single expression are grouping, not tuple construction, so no distinct one-component tuple value exists. The unit () of arity 0 does exist.",
  },
  {
    question: "Why are `(String, Integer)` and `(Integer, String)` different types?",
    options: [
      "They are the same type in a different order",
      "A tuple type records the type of each position in order",
      "Only the first component is typed",
      "Because String is not a primitive type",
    ],
    correctIndex: 1,
    explanation: "Position carries meaning in a tuple type. Swapping the positions gives a genuinely different type that cannot be used where the other is expected.",
  },
  {
    question: "Which problem needs a tuple rather than a list?",
    options: [
      "The marks of every student in a class",
      "The words in a sentence",
      "A point in three-dimensional space",
      "The elements larger than a threshold",
    ],
    correctIndex: 2,
    explanation: "A 3-D point always has exactly three components, fixed by its type. The others all vary in length at run time and hold values of one kind, which is what a list is for.",
  },
  {
    question: "In a comprehension, what appears before the pipe?",
    options: [
      "The generator",
      "The tests",
      "The output function applied to each surviving element",
      "The type signature",
    ],
    correctIndex: 2,
    explanation: "The first part is the output function. Generators and comma-separated tests appear after the pipe and determine which values reach it.",
  },
  {
    question: "What does `[x + y | x <- [1,2,3], y <- [-3,0,3]]` evaluate to?",
    options: [
      "[-2,2,6]",
      "[-2,1,4,-1,2,5,0,3,6]",
      "[1,2,3,-3,0,3]",
      "[0,0,0]",
    ],
    correctIndex: 1,
    explanation: "Multiple generators produce every combination — three values of x times three of y gives nine results. The rightmost generator varies fastest, so x stays at 1 while y runs through all its values first.",
  },
];
