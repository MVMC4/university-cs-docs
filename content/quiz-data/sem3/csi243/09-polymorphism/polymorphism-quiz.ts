export const quizData = [
  {
    question: "Which of these is a type variable?",
    options: [
      "Int",
      "Bool",
      "a",
      "Shape",
    ],
    correctIndex: 2,
    explanation: "Type variables are lowercase and stand for any type at all. Concrete type names are capitalised.",
  },
  {
    question: "What can a function of type `[a] -> Int` do to the elements?",
    options: [
      "Compare them for equality",
      "Add them together",
      "Nothing; it can only count or rearrange them",
      "Display them with show",
    ],
    correctIndex: 2,
    explanation: "An unconstrained type variable supports no operations, so the elements cannot be compared, added, or shown. The fewer constraints a variable carries, the fewer things the function can possibly do.",
  },
  {
    question: "Given `neg :: Bool -> Bool` and `pasd :: Bool`, which is well typed?",
    options: [
      "Both neg pasd and neg 3",
      "neg pasd only",
      "neg 3 only",
      "Neither",
    ],
    correctIndex: 1,
    explanation: "By the inference rule, if f :: A -> B and e :: A then f e :: B. pasd has type Bool matching the input, so neg pasd :: Bool. 3 is numeric rather than Bool, so neg 3 is rejected.",
  },
  {
    question: "Why does `pairUp 1 'a'` fail when `pairUp :: a -> a -> (a, a)`?",
    options: [
      "Characters cannot appear in tuples",
      "One type variable means one type throughout an application",
      "The function needs a Num constraint",
      "Tuples must hold identical values",
    ],
    correctIndex: 1,
    explanation: "Both arguments are typed a, so they must have the same type in any one call. Allowing them to differ requires two variables, as in a -> b -> (a, b).",
  },
  {
    question: "In `Num a => [a] -> a`, what does the part before `=>` do?",
    options: [
      "It declares the return type",
      "It states a class constraint the type must satisfy",
      "It is a comment",
      "It names the module the type comes from",
    ],
    correctIndex: 1,
    explanation: "Everything before the fat arrow is a class constraint. It says a must be a member of Num, which is what makes arithmetic on the elements legal.",
  },
  {
    question: "What does \"No instance for (Num a) arising from a use of '+'\" tell you?",
    options: [
      "The function is missing a type signature",
      "Arithmetic was used on an unconstrained type variable",
      "The list is empty",
      "Num is not imported",
    ],
    correctIndex: 1,
    explanation: "The message names the class and the operation that required it. The repair is to add Num a => to the signature so the variable carries the capability the operation needs.",
  },
  {
    question: "Why is `(Eq a, Ord a) => ...` redundant?",
    options: [
      "Eq and Ord are the same class",
      "Ord requires Eq, so every Ord instance is also an Eq instance",
      "Constraints may only name one class",
      "Eq is derived automatically for every type",
    ],
    correctIndex: 1,
    explanation: "Ordering presupposes being able to test equality, so Ord requires Eq. Writing Ord a => alone already gives you == and /=.",
  },
  {
    question: "Which class does `div` require?",
    options: [
      "Num",
      "Fractional",
      "Integral",
      "Floating",
    ],
    correctIndex: 2,
    explanation: "div :: Integral a => a -> a -> a, so it works on whole-number types. Division on fractional types uses / with a Fractional constraint. This is why 7.5 `div` 2 is rejected.",
  },
  {
    question: "Why does `sum xs / length xs` fail?",
    options: [
      "sum returns a list",
      "length returns Int, which is not Fractional",
      "/ cannot be used on lists",
      "The list may be empty",
    ],
    correctIndex: 1,
    explanation: "/ requires both operands to share one Fractional type. length always returns Int, which is not Fractional, so the count must be converted with fromIntegral.",
  },
  {
    question: "Why has `Integer` no `Bounded` instance?",
    options: [
      "Bounded applies only to characters",
      "Integer is arbitrary-precision, so no maximum value exists",
      "Integer is not a numeric type",
      "It does have one",
    ],
    correctIndex: 1,
    explanation: "Bounded provides minBound and maxBound, which presuppose largest and smallest values. Integer grows as needed until memory is exhausted. Int is fixed-width and does have bounds.",
  },
  {
    question: "What is the declaration of `Maybe`?",
    options: [
      "type Maybe a = [a]",
      "data Maybe a = Nothing | Just a",
      "data Maybe = Nothing | Just",
      "class Maybe a where ...",
    ],
    correctIndex: 1,
    explanation: "Maybe is an ordinary polymorphic data type with two constructors. Nothing means no result and Just carries a value, which makes failure part of the result type.",
  },
  {
    question: "Why is `[a] -> Maybe a` more honest than `[a] -> a` for a head function?",
    options: [
      "It is faster",
      "It makes the possibility of failure visible in the type and forces the caller to handle it",
      "It avoids needing a type variable",
      "It removes the need for pattern matching",
    ],
    correctIndex: 1,
    explanation: "[a] -> a promises a result for every list, including the empty one, which it cannot deliver. Maybe states the possibility of no result in the signature, and the compiler will not let the caller ignore the Nothing case.",
  },
];
