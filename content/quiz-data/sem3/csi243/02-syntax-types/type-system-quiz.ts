export const quizData = [
  {
    question: "What is the fundamental difference between `Int` and `Integer` in Haskell?",
    options: [
      "`Int` is arbitrary precision, while `Integer` is bounded.",
      "`Int` is bounded by machine architecture, while `Integer` has arbitrary precision.",
      "`Int` is for floating-point numbers, while `Integer` is for whole numbers.",
      "There is no difference; they are type synonyms."
    ],
    correctIndex: 1,
    explanation: "`Int` is a fixed-precision integer (subject to overflow), whereas `Integer` can grow arbitrarily large at the cost of performance."
  },
  {
    question: "What is the typeclass constraint of the numeric literal `5`?",
    options: [
      "`Int`",
      "`Fractional a => a`",
      "`Num a => a`",
      "`Integer`"
    ],
    correctIndex: 2,
    explanation: "Integer literals are polymorphic and belong to the `Num` typeclass, allowing them to be instantiated as `Int`, `Integer`, `Float`, etc., based on context."
  },
  {
    question: "Why does the literal `5.0` require the `Fractional` typeclass?",
    options: [
      "Because it contains a decimal point, which is not supported by `Num`.",
      "Because `Fractional` is the most specific typeclass that supports fractional literals.",
      "Because `5.0` is automatically parsed as a `Double`.",
      "Because `Num` only supports integers."
    ],
    correctIndex: 1,
    explanation: "Fractional literals like `5.0` are strictly typed to `Fractional a => a`, as they represent non-integer values that `Int` or `Integer` cannot hold."
  },
  {
    question: "What is the formal relationship between `String` and `Char` in Haskell?",
    options: [
      "`String` is a distinct primitive type unrelated to `Char`.",
      "`String` is a type synonym for `[Char]` (a list of characters).",
      "`Char` is a type synonym for `String`.",
      "`String` is a tuple of `Char` values."
    ],
    correctIndex: 1,
    explanation: "`String` is not a primitive type; it is literally defined as `type String = [Char]`."
  },
  {
    question: "Which of the following is the correct syntax for a single character in Haskell?",
    options: [
      "`\"a\"`",
      "`'a'`",
      "`[a]`",
      "`a`"
    ],
    correctIndex: 1,
    explanation: "Single characters (`Char`) are denoted by single quotes, while strings (`[Char]`) are denoted by double quotes."
  },
  {
    question: "What is the result of evaluating `not (True && False)`?",
    options: [
      "`True`",
      "`False`",
      "Type error",
      "`not True && False`"
    ],
    correctIndex: 0,
    explanation: "`True && False` evaluates to `False`. Applying `not` to `False` yields `True`."
  },
  {
    question: "Why does the expression `f -5` cause a parse error if `f` is a function?",
    options: [
      "Because `-` is not a valid operator in Haskell.",
      "Because the parser interprets it as applying `f` to nothing, then subtracting 5.",
      "Because functions cannot take negative numbers as arguments.",
      "Because `-5` is a `Fractional` type and `f` expects an `Int`."
    ],
    correctIndex: 1,
    explanation: "The parser sees `f` followed by the infix operator `-` and the number `5`, interpreting it as `(f) - 5`, which is syntactically invalid for function application."
  },
  {
    question: "What is the correct syntax to apply a function `f` to the negative number `-5`?",
    options: [
      "`f -5`",
      "`f (-5)`",
      "`f [-5]`",
      "`f $ -5`"
    ],
    correctIndex: 1,
    explanation: "Parentheses are required to group the negative sign with the number, ensuring it is parsed as a single negative literal argument: `f (-5)`."
  },
  {
    question: "Which function is used to convert a value into its `String` representation?",
    options: [
      "`read`",
      "`show`",
      "`print`",
      "`toString`"
    ],
    correctIndex: 1,
    explanation: "`show` is the standard function for converting a value of any `Show` instance into a `String`."
  },
  {
    question: "Why does `read \"5\"` often result in an 'Ambiguous type variable' error in GHCi?",
    options: [
      "Because `read` can only parse floating-point numbers.",
      "Because `read` is polymorphic, and the compiler cannot infer the target type without an annotation.",
      "Because `\"5\"` is not a valid string representation of a number.",
      "Because `read` requires the `OverloadedStrings` extension."
    ],
    correctIndex: 1,
    explanation: "`read` has the type `Read a => String -> a`. Without context, the compiler does not know if you want an `Int`, `Double`, or `Integer`, requiring an explicit type annotation like `:: Int`."
  },
  {
    question: "What is the type signature of the `read` function?",
    options: [
      "`String -> String`",
      "`Read a => String -> a`",
      "`Show a => a -> String`",
      "`String -> IO a`"
    ],
    correctIndex: 1,
    explanation: "`read` takes a `String` and returns a polymorphic type `a`, constrained by the `Read` typeclass."
  },
  {
    question: "Which of the following numeric types is considered single-precision?",
    options: [
      "`Int`",
      "`Integer`",
      "`Float`",
      "`Double`"
    ],
    correctIndex: 2,
    explanation: "`Float` is single-precision, while `Double` is double-precision. `Int` and `Integer` are not floating-point types."
  },
  {
    question: "What is the type of the literal `True`?",
    options: [
      "`Bool`",
      "`boolean`",
      "`Bit`",
      "`Truth`"
    ],
    correctIndex: 0,
    explanation: "The boolean type in Haskell is strictly named `Bool`, with constructors `True` and `False`."
  },
  {
    question: "If a function expects an `Int`, why can you not directly pass it the result of `5.0 / 2.0`?",
    options: [
      "Because `/` is not defined for `5.0`.",
      "Because `5.0 / 2.0` evaluates to a `Fractional` type, which cannot be implicitly coerced to `Int`.",
      "Because `Int` only accepts whole number literals.",
      "Because `5.0` is parsed as a `String`."
    ],
    correctIndex: 1,
    explanation: "Haskell has no implicit type coercion. A `Fractional` result must be explicitly converted to an `Int` using functions like `round`, `floor`, or `truncate`."
  },
  {
    question: "What is the result of `show True`?",
    options: [
      "`True`",
      "`\"True\"`",
      "`\"true\"`",
      "Type error"
    ],
    correctIndex: 1,
    explanation: "`show` converts the boolean value `True` into its string representation, which includes the double quotes: `\"True\"`."
  }
];