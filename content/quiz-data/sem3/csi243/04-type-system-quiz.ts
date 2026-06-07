export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the most general type signature for a function `twoLists` that pairs elements from two lists of potentially different types (like `zip`)?",
    options: [
      "`[a] -> [a] -> [(a, a)]`",
      "`[a] -> [b] -> [(a, b)]`",
      "`Eq a => [a] -> [a] -> [(a, a)]`",
      "`[a] -> [b] -> [a, b]`"
    ],
    correctIndex: 1,
    explanation: "Parametric polymorphism allows the two input lists to have entirely different element types (`a` and `b`). The output is a list of tuples containing one element of each type: `[(a, b)]`. No typeclass constraints are needed because we are not inspecting or comparing the elements."
  },
  {
    question: "Which of the following best describes **Ad-Hoc Polymorphism** in Haskell?",
    options: [
      "A function that operates uniformly on any type using type variables like `a`.",
      "A function that has different implementations depending on the specific type of its arguments, governed by typeclasses.",
      "A function that can change its return type dynamically at runtime.",
      "A function that automatically derives its implementation from the structure of a data type."
    ],
    correctIndex: 1,
    explanation: "Ad-hoc polymorphism (overloading) means the same function name (like `+` or `show`) behaves differently based on the type. This is implemented in Haskell via typeclasses. Parametric polymorphism (option A) is the opposite: the same uniform behaviour for all types."
  },
  {
    question: "What is the correct syntax for defining a custom typeclass named `MyEq` with a method `(===)`?",
    options: [
      "`data MyEq a where (===) :: a -> a -> Bool`",
      "`class MyEq a where (===) :: a -> a -> Bool`",
      "`instance MyEq a where (===) :: a -> a -> Bool`",
      "`type MyEq a = a -> a -> Bool`"
    ],
    correctIndex: 1,
    explanation: "The `class` keyword is used to define a new typeclass. `data` defines a new data type, `instance` implements a typeclass for a specific type, and `type` creates a type synonym."
  },
  {
    question: "Which standard typeclass provides the `/` (true division) and `recip` methods, and is a subclass of `Num`?",
    options: [
      "`Integral`",
      "`Fractional`",
      "`Ord`",
      "`Read`"
    ],
    correctIndex: 1,
    explanation: "`Fractional` is the typeclass for types that support true division (`/`) and reciprocals (`recip`). `Integral` is for whole numbers (providing `div` and `mod`). Both are subclasses of `Num`."
  },
  {
    question: "Trace unification for `f x = x && 5`. What error does GHC produce and why?",
    options: [
      "Succeeds with type `Num a => a -> a` — `&&` is overloaded.",
      "Fails: cannot unify `Bool` with `Num a` — `(&&)` requires `Bool` but `5` is a numeric literal.",
      "Succeeds with type `Int -> Int` — `&&` is coerced.",
      "Fails due to an occurs check: cannot construct infinite type `a ~ [a]`."
    ],
    correctIndex: 1,
    explanation: "`(&&) :: Bool -> Bool -> Bool` requires both arguments to be `Bool`. The literal `5` has type `Num a => a`. GHC attempts to unify `a` with `Bool`, but `Bool` is not an instance of `Num`, resulting in a 'No instance for (Num Bool)' error."
  },
  {
    question: "What is the Free Theorem for a function with the type signature `f :: [a] -> [a]`?",
    options: [
      "It always sorts the list.",
      "It can only rearrange, duplicate, or drop elements from its input; it can never introduce a new value of type `a`.",
      "It must apply a mapping function over the list.",
      "It must reverse the list."
    ],
    correctIndex: 1,
    explanation: "By parametricity, `f` has no knowledge of the type `a`. It receives no operations on `a` and no constructors for `a`. Therefore, it cannot *create* elements; it can only select, reorder, or duplicate what it was given in the input list."
  },
  {
    question: "How does GHC implement typeclasses under the hood to achieve zero abstraction overhead?",
    options: [
      "Via global mutable dictionaries looked up at runtime by type name.",
      "Via Dictionary Passing: each constraint becomes an implicit record argument containing the method implementations.",
      "Via dynamic linking of method implementations at load time.",
      "Via hardware interrupts that select the correct method implementation."
    ],
    correctIndex: 1,
    explanation: "A constraint like `Eq a =>` is compiled into a hidden extra argument of type `EqDict a` — a record containing the concrete `(==)` and `(/=)` implementations for the specific type. The caller passes this dictionary, making it just a standard function call through a record, with no runtime type checking overhead."
  },
  {
    question: "If you define `data Color = Red | Green`, what is the minimal set of typeclasses you must derive or implement to use `Red < Green`?",
    options: [
      "`Eq` only",
      "`Ord` only",
      "`Eq` and `Ord`",
      "`Show` and `Read`"
    ],
    correctIndex: 2,
    explanation: "The `<` operator belongs to the `Ord` typeclass. However, `Ord` has `Eq` as a superclass constraint in Haskell. Therefore, to derive or implement `Ord`, you must also derive or implement `Eq`."
  }
];