export const quizData = [
  {
    question: "What is the defining characteristic of a Tuple in Haskell?",
    options: [
      "Variable size, strictly homogeneous types.",
      "Fixed size, heterogeneous types.",
      "Variable size, heterogeneous types.",
      "Fixed size, strictly homogeneous types."
    ],
    correctIndex: 1,
    explanation: "Tuples have a fixed arity (size) at compile time, and their elements can be of different (heterogeneous) types."
  },
  {
    question: "What is the defining characteristic of a List in Haskell?",
    options: [
      "Fixed size, strictly homogeneous types.",
      "Fixed size, heterogeneous types.",
      "Variable size, strictly homogeneous types.",
      "Variable size, heterogeneous types."
    ],
    correctIndex: 2,
    explanation: "Lists can grow or shrink at runtime (variable size), but all elements within a single list must be of the exact same type (strictly homogeneous)."
  },
  {
    question: "Which of the following is a valid Haskell list?",
    options: [
      "`[1, \"two\", 3]`",
      "`[1, 2, 3]`",
      "`(1, 2, 3)`",
      "`[1, [2, 3], 4]`"
    ],
    correctIndex: 1,
    explanation: "`[1, 2, 3]` is valid because all elements are of the same type (`Int`). The others mix types or nest lists incorrectly without uniform typing."
  },
  {
    question: "What is the type of the tuple `(1, \"Hello\", True)`?",
    options: [
      "`[Int, String, Bool]`",
      "`(Int, String, Bool)`",
      "`(Num a, [Char], Bool) => (a, [Char], Bool)`",
      "`Tuple3 Int String Bool`"
    ],
    correctIndex: 1,
    explanation: "The type of a tuple explicitly lists the types of its elements in order, enclosed in parentheses: `(Int, String, Bool)`."
  },
  {
    question: "Which built-in functions can be used to extract elements from a 2-tuple (pair)?",
    options: [
      "`head` and `tail`",
      "`first` and `second`",
      "`fst` and `snd`",
      "`get1` and `get2`"
    ],
    correctIndex: 2,
    explanation: "Haskell provides `fst` and `snd` specifically for extracting the first and second elements of a pair. There are no built-in accessors for larger tuples."
  },
  {
    question: "What is the type signature of the Cons operator (`:`)?",
    options: [
      "`[a] -> [a] -> [a]`",
      "`a -> [a] -> [a]`",
      "`a -> a -> [a]`",
      "`[a] -> a -> [a]`"
    ],
    correctIndex: 1,
    explanation: "The Cons operator takes a single element of type `a` and a list of type `[a]`, and returns a new list of type `[a]`."
  },
  {
    question: "What is the type signature of the Concatenation operator (`++`)?",
    options: [
      "`a -> [a] -> [a]`",
      "`[a] -> [a] -> [a]`",
      "`[[a]] -> [a]`",
      "`[a] -> a -> [a]`"
    ],
    correctIndex: 1,
    explanation: "The `++` operator takes two lists of the same type `[a]` and joins them into a single list `[a]`."
  },
  {
    question: "Why does the expression `1 ++ [2, 3]` result in a type error?",
    options: [
      "Because `++` can only be used with strings.",
      "Because `1` is a number, not a list, and `++` requires two lists.",
      "Because `[2, 3]` is not a valid list.",
      "Because `1` is an `Int` and `[2, 3]` is a `[Float]`."
    ],
    correctIndex: 1,
    explanation: "The `++` operator expects a list as its left operand. To prepend a single element, the Cons operator (`:`) must be used: `1 : [2, 3]`."
  },
  {
    question: "What is the result of evaluating `'H' : \"askell\"`?",
    options: [
      "`[\"H\", \"askell\"]`",
      "`\"Haskell\"`",
      "Type error",
      "`'H' ++ \"askell\"`"
    ],
    correctIndex: 1,
    explanation: "`'H'` is a `Char`. Consing a `Char` onto a `String` (`[Char]`) yields a new `String`: `\"Haskell\"`."
  },
  {
    question: "Are the types `(Int, Int)` and `(Int, Int, Int)` compatible or interchangeable?",
    options: [
      "Yes, they are both tuples of integers.",
      "No, tuples of different arities (sizes) are fundamentally distinct types.",
      "Yes, but only with explicit type casting.",
      "No, because one is a list and the other is a tuple."
    ],
    correctIndex: 1,
    explanation: "In Haskell, a 2-tuple and a 3-tuple are completely different, unrelated types. There is no automatic conversion between them."
  },
  {
    question: "What does the `head` function do when applied to a list?",
    options: [
      "Returns the last element of the list.",
      "Returns the first element of the list.",
      "Returns the list without its first element.",
      "Returns the length of the list."
    ],
    correctIndex: 1,
    explanation: "`head` extracts the first element of a non-empty list. (e.g., `head [1, 2, 3]` yields `1`)."
  },
  {
    question: "What does the `tail` function do when applied to a list?",
    options: [
      "Returns the last element of the list.",
      "Returns the first element of the list.",
      "Returns the list without its first element.",
      "Reverses the list."
    ],
    correctIndex: 2,
    explanation: "`tail` returns a new list containing all elements of the original list except the first one. (e.g., `tail [1, 2, 3]` yields `[2, 3]`)."
  },
  {
    question: "Which of the following expressions correctly creates a list containing the numbers 1, 2, and 3 using the Cons operator?",
    options: [
      "`1 : 2 : 3 : []`",
      "`[1] : [2] : [3]`",
      "`1 ++ 2 ++ 3`",
      "`cons 1 (cons 2 (cons 3))`"
    ],
    correctIndex: 0,
    explanation: "The Cons operator `:` builds a list by prepending elements one by one to the empty list `[]`. `1 : 2 : 3 : []` is syntactically identical to `[1, 2, 3]`."
  },
  {
    question: "What is the result of `fst (10, \"Hello\")`?",
    options: [
      "`10`",
      "`\"Hello\"`",
      "`(10, \"Hello\")`",
      "Type error"
    ],
    correctIndex: 0,
    explanation: "`fst` extracts the first element of a pair. The first element of `(10, \"Hello\")` is `10`."
  }
];