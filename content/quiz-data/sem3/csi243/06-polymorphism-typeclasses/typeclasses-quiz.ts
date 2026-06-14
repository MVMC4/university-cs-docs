export const quizData = [
  {
    question: "What is the fundamental difference between parametric polymorphism and ad-hoc polymorphism?",
    options: [
      "Parametric polymorphism uses typeclasses, while ad-hoc polymorphism uses type variables.",
      "Parametric polymorphism provides uniform behavior across all types, while ad-hoc polymorphism provides different implementations for different types.",
      "Parametric polymorphism is slower than ad-hoc polymorphism.",
      "There is no difference; they are synonyms."
    ],
    correctIndex: 1,
    explanation: "Parametric polymorphism does the same structural thing for all types. Ad-hoc polymorphism (overloading) allows the same function name to have different implementations based on the type."
  },
  {
    question: "In Haskell, what mechanism strictly governs ad-hoc polymorphism?",
    options: [
      "Type synonyms",
      "Pattern matching",
      "Typeclasses",
      "Monads"
    ],
    correctIndex: 2,
    explanation: "Typeclasses define a set of methods that a type must implement, allowing functions to be overloaded based on the type's membership in the class."
  },
  {
    question: "What is the superclass constraint of the `Ord` typeclass?",
    options: [
      "`Show`",
      "`Eq`",
      "`Num`",
      "None"
    ],
    correctIndex: 1,
    explanation: "To be ordered (`Ord`), a type must first be comparable for equality (`Eq`). Therefore, `Ord` has `Eq` as a superclass constraint."
  },
  {
    question: "Which of the following typeclasses is a subclass of `Num` and specifically represents whole numbers?",
    options: [
      "`Fractional`",
      "`Integral`",
      "`Floating`",
      "`Real`"
    ],
    correctIndex: 1,
    explanation: "`Integral` is the typeclass for whole numbers (providing `div`, `mod`, etc.), and it is a subclass of `Num`."
  },
  {
    question: "What is the purpose of the `Fractional` typeclass?",
    options: [
      "To represent integer division.",
      "To represent types that support true division (`/`) and reciprocals.",
      "To represent types that can be converted to strings.",
      "To represent types that can be ordered."
    ],
    correctIndex: 1,
    explanation: "`Fractional` provides the `/` operator and `recip`, distinguishing it from `Integral` which uses `div` and `mod`."
  },
  {
    question: "In the Hindley-Milner unification trace for `f x = x + True`, why does a type error occur?",
    options: [
      "Because `x` is not defined.",
      "Because `True` is a boolean, and the unification constraint `n ~ Bool` fails the `Num n` requirement of the `(+)` operator.",
      "Because `(+)` only works on lists.",
      "Because `f` is not a valid function name."
    ],
    correctIndex: 1,
    explanation: "The `(+)` operator requires a `Num` type. Unification forces the type of `True` (`Bool`) to match the `Num` type variable, but `Bool` is not an instance of `Num`, causing a failure."
  },
  {
    question: "What is 'dictionary passing' in the context of Haskell's compilation of typeclasses?",
    options: [
      "Passing a `Map` data structure to every function.",
      "The compiler translating typeclass constraints into explicit function arguments (dictionaries) containing the specific method implementations.",
      "A runtime check to ensure the type is correct.",
      "A method for importing modules."
    ],
    correctIndex: 1,
    explanation: "GHC compiles typeclass constraints by creating a record (dictionary) of the required functions for that specific type and passing it as an implicit argument, ensuring zero runtime overhead."
  },
  {
    question: "When you define `class MyEq a where (===) :: a -> a -> Bool`, what does the `a` represent?",
    options: [
      "A specific concrete type like `Int`.",
      "A type variable representing any type that will become an instance of `MyEq`.",
      "A value of type `a`.",
      "A typeclass constraint."
    ],
    correctIndex: 1,
    explanation: "In a class declaration, the variable after the class name (e.g., `a`) is a type variable that will be instantiated with a concrete type when an `instance` is declared."
  },
  {
    question: "What is the role of a 'default implementation' in a typeclass definition?",
    options: [
      "It forces all instances to use that exact implementation.",
      "It provides a fallback implementation that instances can override, but do not have to.",
      "It is required for the typeclass to compile.",
      "It automatically derives the typeclass for all data types."
    ],
    correctIndex: 1,
    explanation: "Default implementations allow instance declarations to omit certain methods if the default behavior is sufficient, reducing boilerplate."
  },
  {
    question: "If `data TrafficLight = Red | Yellow | Green`, what must you do to make it an instance of `MyEq`?",
    options: [
      "Nothing, it is automatic.",
      "Write an `instance MyEq TrafficLight where` block and implement the `(===)` method.",
      "Add `deriving (MyEq)` to the data declaration.",
      "Import `MyEq` from `Data.Eq`."
    ],
    correctIndex: 1,
    explanation: "For custom typeclasses, you must manually write the `instance` declaration and provide implementations for the required methods (unless defaults exist and are suitable)."
  },
  {
    question: "What does the constraint `Eq a =>` in a type signature mean?",
    options: [
      "The function returns a boolean.",
      "The function can only be called with types `a` that are instances of the `Eq` typeclass.",
      "The function will automatically derive `Eq` for the return type.",
      "The function is polymorphic over all types."
    ],
    correctIndex: 1,
    explanation: "The `=>` symbol introduces a typeclass constraint, restricting the polymorphic type variable `a` to only those types that have an `Eq` instance."
  },
  {
    question: "Which standard typeclass provides the `show` method?",
    options: [
      "`Read`",
      "`Print`",
      "`Show`",
      "`String`"
    ],
    correctIndex: 2,
    explanation: "The `Show` typeclass defines the `show` method, which converts a value into its `String` representation."
  },
  {
    question: "Why is using `read` without a type annotation often dangerous or ambiguous?",
    options: [
      "Because `read` is not a standard function.",
      "Because `read` is polymorphic (`Read a => String -> a`), and the compiler may not have enough context to infer which specific type to parse the string into.",
      "Because `read` can only parse integers.",
      "Because `read` modifies the original string."
    ],
    correctIndex: 1,
    explanation: "Without a type annotation or surrounding context, the compiler cannot determine if `read '5'` should be an `Int`, `Double`, or `Integer`, leading to an 'Ambiguous type variable' error."
  },
  {
    question: "In the conceptual compilation of `sortBy :: Ord a => [a] -> [a]`, what does the `OrdDict a` contain?",
    options: [
      "A list of all values of type `a`.",
      "The specific implementations of the `Ord` methods (like `compare`) for the type `a`.",
      "The source code of the `sortBy` function.",
      "A boolean indicating if the list is sorted."
    ],
    correctIndex: 1,
    explanation: "The dictionary is a record containing the function pointers to the specific type's implementations of the typeclass methods (e.g., `dictCompare`)."
  },
  {
    question: "What is the result of unifying the types `Int` and `Bool`?",
    options: [
      "`Int`",
      "`Bool`",
      "A type error, as they are distinct, incompatible types.",
      "A new type `IntBool`."
    ],
    correctIndex: 2,
    explanation: "Unification seeks a substitution that makes two types identical. `Int` and `Bool` are distinct, concrete types with no variables to substitute, so unification fails, resulting in a type error."
  }
];