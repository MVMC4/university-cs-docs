export const quizData = [
  {
    question: "Why does Haskell reject `if 3 > 5 then \"yes\"`?",
    options: [
      "The condition must be parenthesised",
      "An if is an expression and must produce a value on every path",
      "Strings cannot appear in a then branch",
      "The comparison operator is the wrong way round",
    ],
    correctIndex: 1,
    explanation: "A Haskell if is an expression, so it must evaluate to a value and therefore have a type. With no else branch there is no value when the condition is False, so the expression is rejected before evaluation.",
  },
  {
    question: "What is wrong with `if n > 0 then \"positive\" else 0`?",
    options: [
      "The branches have different types",
      "The condition is not a Bool",
      "Nothing; it compiles correctly",
      "An if cannot return a String",
    ],
    correctIndex: 0,
    explanation: "A conditional expression has one type, so both branches must agree. Here the then branch is a String and the else branch is numeric, so they cannot be reconciled.",
  },
  {
    question: "Given `square y = y * y` written above `square 0 = 1`, what does `square 0` return?",
    options: [
      "1, because the literal pattern is more specific",
      "0, because the variable pattern matches first",
      "A compile error, because the patterns overlap",
      "A non-exhaustive patterns exception",
    ],
    correctIndex: 1,
    explanation: "Equations are tried top to bottom and the first match wins. A variable pattern matches anything, so it captures 0 and returns 0 * 0. The second equation is unreachable and GHC reports it as redundant.",
  },
  {
    question: "Which pattern matches a non-empty list, splitting head from tail?",
    options: [
      "[x, xs]",
      "(x, xs)",
      "(x:xs)",
      "[x:xs]",
    ],
    correctIndex: 2,
    explanation: "(x:xs) is the cons pattern. It binds x to the head and xs to the tail. [x, xs] matches a list of exactly two elements, and (x, xs) matches a pair.",
  },
  {
    question: "Why is `tail _:xs = xs` invalid?",
    options: [
      "The wildcard cannot appear in a cons pattern",
      "It is parsed as (tail _):xs because application binds tighter than operators",
      "tail is already defined in the Prelude",
      "A definition cannot use the cons operator",
    ],
    correctIndex: 1,
    explanation: "Function application has higher priority than every operator, so Haskell reads the left side as (tail _):xs, which is not the intended meaning and is not a valid definition. Cons patterns must be parenthesised.",
  },
  {
    question: "What happens when `dayName 3` is called and no pattern matches 3?",
    options: [
      "It returns the empty string",
      "The program fails at run time with a non-exhaustive patterns exception",
      "GHC refuses to compile the module",
      "It returns the result of the last equation",
    ],
    correctIndex: 1,
    explanation: "Non-exhaustive patterns are a run-time failure by default, not a compile-time error. Enabling -Wincomplete-patterns makes GHC warn about the gap at compile time instead.",
  },
  {
    question: "Which line correctly begins a guarded equation?",
    options: [
      "grade score = | score >= 90 = \"A\"",
      "grade score | score >= 90 -> \"A\"",
      "grade score followed by an indented | score >= 90 = \"A\"",
      "grade score : | score >= 90 = \"A\"",
    ],
    correctIndex: 2,
    explanation: "A guarded equation names the function and its parameters with no = sign, then places each guard on its own indented line beginning with |. Guards use = for their results; -> belongs to case alternatives.",
  },
  {
    question: "The guards in `grade` are ordered `>= 70`, then `>= 80`, then `>= 90`. What does `grade 95` return?",
    options: [
      "\"A\", because 95 satisfies the most specific condition",
      "\"F\", because no guard matches cleanly",
      "\"C\", because the first True guard wins",
      "A compile error about overlapping guards",
    ],
    correctIndex: 2,
    explanation: "Guards are checked in the listed order and the first True one supplies the result. 95 >= 70 succeeds immediately, so the later guards are never examined. The code compiles; the fault is logical, which is why ordering must run from most restrictive to least.",
  },
  {
    question: "What is `otherwise`?",
    options: [
      "A reserved keyword recognised only in guards",
      "An ordinary Prelude name defined as True",
      "A function that tests whether all previous guards failed",
      "A synonym for the wildcard pattern _",
    ],
    correctIndex: 1,
    explanation: "otherwise is defined in the Prelude as `otherwise = True`. It is not special syntax; it simply always succeeds, which makes it a readable catch-all and means it must be listed last.",
  },
  {
    question: "Why is `where` preferred over `let` when guards share a calculation?",
    options: [
      "where is evaluated faster than let",
      "let cannot define more than one name",
      "A where clause scopes over every guard in the equation; a let binding in the result does not",
      "Guards are not allowed to call functions",
    ],
    correctIndex: 2,
    explanation: "A where clause attaches to the whole equation, so every guard and every result can see its definitions. A let ... in binds only within the single expression it introduces, which the guards sit outside of.",
  },
  {
    question: "Which of these can a `case` expression scrutinise but equation-level patterns cannot?",
    options: [
      "A literal value",
      "A calculated value such as `n mod 2`",
      "A wildcard",
      "A tuple argument",
    ],
    correctIndex: 1,
    explanation: "Equation patterns can only inspect arguments as they arrive. A case can scrutinise any expression, including a calculation, a tuple built on the spot, or a function application.",
  },
  {
    question: "A specification has base case `n <= 1`. Which construct expresses it most directly?",
    options: [
      "Pattern matching, using the literal 1",
      "Guards, because the case is a range",
      "A case expression on n",
      "Nested conditionals",
    ],
    correctIndex: 1,
    explanation: "A literal pattern matches one fixed value, so it cannot express `n <= 1`. Guards test arbitrary Boolean conditions, which is exactly what a range requires.",
  },
];
