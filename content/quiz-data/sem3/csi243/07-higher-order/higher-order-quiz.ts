export const quizData = [
  {
    question: "What makes a function higher-order?",
    options: [
      "It is defined with more than two equations",
      "It takes a function as an argument or returns one as its result",
      "It is recursive",
      "It has a polymorphic type",
    ],
    correctIndex: 1,
    explanation: "map, filter, foldr, and zipWith all take a function as an argument. This is possible because functions are first-class values in Haskell.",
  },
  {
    question: "Why does `\\x -> x + 1 5` fail?",
    options: [
      "Lambdas cannot use numbers",
      "The body extends rightwards, so it is read as x + (x applied to 5)",
      "A lambda needs a type signature",
      "The backslash must be escaped",
    ],
    correctIndex: 1,
    explanation: "A lambda body extends as far right as possible, so 1 5 is parsed as an application. Parenthesise the lambda when applying it: (\\x -> x + 1) 5.",
  },
  {
    question: "`add x y = x + y` is really which of these?",
    options: [
      "add = \\x y -> x + y, which takes both arguments at once",
      "add = \\x -> (\\y -> x + y)",
      "add = (x, y) -> x + y",
      "A function of a tuple",
    ],
    correctIndex: 1,
    explanation: "This is currying. add takes x and returns a function that awaits y. Every multi-argument Haskell function works this way, which is what makes partial application possible.",
  },
  {
    question: "Given `f :: Int -> Int -> Int -> Int`, what is the type of `f 1 2`?",
    options: [
      "Int",
      "Int -> Int",
      "Int -> Int -> Int",
      "A type error, since f needs three arguments",
    ],
    correctIndex: 1,
    explanation: "Each supplied argument consumes one arrow. Two arguments leave one arrow, so f 1 2 is a function of type Int -> Int. Supplying fewer arguments is legal, not an error.",
  },
  {
    question: "Which expression correctly uses `div` as an infix operator?",
    options: [
      "7 div 2",
      "7 `div` 2",
      "7 'div' 2",
      "(div) 7 2 written infix",
    ],
    correctIndex: 1,
    explanation: "Back quotes convert a two-argument function into an operator. Single quotes denote a Char, and a bare name written between arguments is a parse error.",
  },
  {
    question: "What does the section `(*2)` denote?",
    options: [
      "The number 2 multiplied by itself",
      "The doubling function, \\x -> x * 2",
      "A tuple containing 2",
      "An incomplete expression",
    ],
    correctIndex: 1,
    explanation: "A section supplies one side of an operator, producing a function awaiting the other. (*2) fixes the right operand, giving \\x -> x * 2.",
  },
  {
    question: "Why does `(-5)` not work as a section?",
    options: [
      "Sections cannot use arithmetic operators",
      "It parses as the negative literal five",
      "Subtraction is not associative",
      "It requires backticks instead",
    ],
    correctIndex: 1,
    explanation: "The minus sign also marks negative numbers, so (-5) is the value negative five. Use subtract 5 to build the function. Left sections such as (5-) are unaffected.",
  },
  {
    question: "What do the signatures of map and filter guarantee about result length?",
    options: [
      "Both preserve length",
      "map preserves length; filter may shorten",
      "map may shorten; filter preserves length",
      "Neither says anything about length",
    ],
    correctIndex: 1,
    explanation: "map produces one result per element so the length is unchanged, though [a] -> [b] allows the element type to change. filter returns [a] and may drop elements, so it is the same length or shorter.",
  },
  {
    question: "What is `takeWhile (<4) [1,2,3,9,1]`?",
    options: [
      "[1,2,3,1]",
      "[1,2,3]",
      "[9]",
      "[1,2,3,9,1]",
    ],
    correctIndex: 1,
    explanation: "takeWhile returns the longest prefix satisfying the predicate and stops permanently at the first failure, so it never reaches the trailing 1. filter would give [1,2,3,1].",
  },
  {
    question: "What is `foldr (-) 0 [1,2,3]`?",
    options: [
      "-6",
      "2",
      "6",
      "0",
    ],
    correctIndex: 1,
    explanation: "Replace every cons with the operator and [] with the base value: 1 - (2 - (3 - 0)) = 1 - (2 - 3) = 1 - (-1) = 2. foldl nests to the left instead and gives -6.",
  },
  {
    question: "Which correctly defines `and` as a fold?",
    options: [
      "foldr && True",
      "foldr (&&) True",
      "foldr (&&) False",
      "foldl (&&) []",
    ],
    correctIndex: 1,
    explanation: "The operator must be parenthesised because a bare operator is not a valid expression. True is the correct base value: it is the identity for &&, so it leaves the result unchanged for a non-empty list.",
  },
  {
    question: "What does `((*2) . (+1)) 5` evaluate to?",
    options: [
      "11",
      "12",
      "10",
      "7",
    ],
    correctIndex: 1,
    explanation: "Composition reads right to left: (+1) is applied first giving 6, then (*2) gives 12. Reversing the order to ((+1) . (*2)) 5 would give 11 instead.",
  },
];
