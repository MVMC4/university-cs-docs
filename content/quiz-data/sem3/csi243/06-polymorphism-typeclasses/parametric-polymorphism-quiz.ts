export const quizData = [
  {
    question: "What is the defining characteristic of parametric polymorphism in Haskell?",
    options: [
      "The function can do different things for different types.",
      "The function operates uniformly on values of any type, manipulating only the structure of the data.",
      "The function requires a typeclass constraint to operate.",
      "The function can create new values of the polymorphic type."
    ],
    correctIndex: 1,
    explanation: "Parametric polymorphism means the function does the exact same structural thing regardless of the type. It cannot inspect or create values of the type variable."
  },
  {
    question: "Which of the following type signatures represents a monomorphic function?",
    options: [
      "`id :: a -> a`",
      "`swapElements :: (a, b) -> (b, a)`",
      "`swapIntegers :: (Int, Int) -> (Int, Int)`",
      "`length :: [a] -> Int`"
    ],
    correctIndex: 2,
    explanation: "A monomorphic function is restricted to specific, concrete types (like `Int`), whereas polymorphic functions use type variables (like `a` or `b`)."
  },
  {
    question: "Why can a function with the type signature `f :: a -> a` not inspect the value of its argument?",
    options: [
      "Because Haskell does not support pattern matching.",
      "Because the type variable `a` could be instantiated as any type, and the function has no knowledge of its structure or constructors.",
      "Because `a` is always a numeric type.",
      "Because the compiler optimizes the inspection away."
    ],
    correctIndex: 1,
    explanation: "Parametricity dictates that since `a` is completely unknown, the function cannot pattern match on it or assume any specific operations. The only total function of this type is the identity function."
  },
  {
    question: "What is the time complexity of the naive `revList` function defined as `revList (x:xs) = revList xs ++ [x]`?",
    options: [
      "O(1)",
      "O(n)",
      "O(n^2)",
      "O(2^n)"
    ],
    correctIndex: 2,
    explanation: "The `++` operator must traverse its entire left operand. Doing this at every recursive step for a list of length n results in O(n^2) time complexity."
  },
  {
    question: "In the signature `twoLists :: [a] -> [b] -> [(a, b)]`, what does the use of distinct type variables `a` and `b` signify?",
    options: [
      "The two input lists must be of the same type.",
      "The two input lists can be of entirely different types.",
      "The function will convert type `a` to type `b`.",
      "The function only works on numeric types."
    ],
    correctIndex: 1,
    explanation: "Distinct type variables `a` and `b` indicate that the function is polymorphic over two independent types, allowing it to zip, for example, an `[Int]` and a `[Char]`."
  },
  {
    question: "What is a 'Free Theorem' in the context of parametric polymorphism?",
    options: [
      "A theorem that can be proven without using a computer.",
      "A property that is guaranteed to hold for any function with a given polymorphic type signature, purely due to parametricity.",
      "A theorem about the time complexity of polymorphic functions.",
      "A rule that allows free type conversion between polymorphic types."
    ],
    correctIndex: 1,
    explanation: "Philip Wadler's 'Theorems for Free' states that the type signature alone restricts what the function can do, guaranteeing certain behavioral properties (e.g., `map f (map g xs) = map (f . g) xs`)."
  },
  {
    question: "Which of the following is a valid implementation of `f :: a -> a`?",
    options: [
      "`f x = x + 1`",
      "`f x = show x`",
      "`f x = x`",
      "`f x = [x]`"
    ],
    correctIndex: 2,
    explanation: "Because `a` is completely unconstrained, the function cannot apply `+`, `show`, or list construction. The only valid total implementation is the identity function `f x = x`."
  },
  {
    question: "What is the primary difference between `type` synonyms and parametric polymorphism?",
    options: [
      "`type` creates a new runtime type, while polymorphism does not.",
      "`type` is a compile-time alias for readability, while parametric polymorphism allows functions to operate uniformly over multiple distinct types.",
      "They are exactly the same thing.",
      "Parametric polymorphism is only used for numeric types."
    ],
    correctIndex: 1,
    explanation: "A `type` synonym is just a name alias. Parametric polymorphism is a feature of functions that allows them to be generic over type variables."
  },
  {
    question: "In the 5-Part Framework, what is the purpose of the 'Polymorphism Check'?",
    options: [
      "To ensure the function compiles without errors.",
      "To verify that the function only manipulates the structure of the data and does not depend on the specific type of the elements.",
      "To check if the function is tail-recursive.",
      "To ensure the function has a typeclass constraint."
    ],
    correctIndex: 1,
    explanation: "The Polymorphism Check ensures the implementation respects parametricity by only using structural operations (like `:` or `[]`) and not type-specific operations."
  },
  {
    question: "What does the type variable `a` in `lastElement :: [a] -> a` guarantee about the function's behavior?",
    options: [
      "It will return the first element of the list.",
      "It will work for a list of any type, but will crash on an empty list if not handled.",
      "It will sort the list before returning the last element.",
      "It will convert the last element to a String."
    ],
    correctIndex: 1,
    explanation: "The type variable `a` guarantees it works for any list type. However, the mathematical specification must still handle the base case (e.g., returning an error for `[]`) to be total."
  },
  {
    question: "Why is `swapElements :: (a, b) -> (b, a)` considered parametrically polymorphic?",
    options: [
      "Because it uses the `swap` keyword.",
      "Because it can swap elements of any two types without knowing what those types are, relying only on tuple deconstruction.",
      "Because it requires the `Eq` typeclass.",
      "Because it modifies the tuple in place."
    ],
    correctIndex: 1,
    explanation: "The function operates purely on the structure of the 2-tuple, reordering its components without needing to know or inspect the types `a` and `b`."
  },
  {
    question: "If a function has the type signature `g :: [a] -> Int`, what can we definitively say about `g`?",
    options: [
      "It returns the length of the list.",
      "It returns the first element of the list.",
      "It can inspect the elements of the list to compute the Int.",
      "It cannot inspect the elements of the list; it can only rely on the list's structure (e.g., its length)."
    ],
    correctIndex: 3,
    explanation: "Due to parametricity, `g` knows nothing about `a`. It cannot inspect the values. It can only compute an `Int` based on the structure of the list, such as its length."
  },
  {
    question: "What is the result of evaluating `twoLists [1] ['a', 'b']`?",
    options: [
      "`[(1, 'a'), (1, 'b')]`",
      "`[(1, 'a')]`",
      "Type error",
      "`[1, 'a']`"
    ],
    correctIndex: 1,
    explanation: "`twoLists` stops when either list is exhausted. Since the first list has only one element, it pairs `1` with `'a'` and then hits the base case `[]`, returning `[(1, 'a')]`."
  },
  {
    question: "Which of the following best describes 'uniform behavior' in parametric polymorphism?",
    options: [
      "The function executes in the same amount of time for all types.",
      "The function applies the exact same sequence of structural operations regardless of the type instantiated for the type variables.",
      "The function returns the same value for all inputs.",
      "The function can be used in any module without importing."
    ],
    correctIndex: 1,
    explanation: "Uniform behavior means the code path and structural manipulation are identical whether the type variable is instantiated as `Int`, `Char`, or a custom ADT."
  },
  {
    question: "What is the base case for the `revList` function in the naive implementation?",
    options: [
      "`revList [x] = [x]`",
      "`revList [] = []`",
      "`revList xs = xs`",
      "`revList (x:xs) = []`"
    ],
    correctIndex: 1,
    explanation: "The base case for reversing a list is the empty list, which reverses to an empty list: `revList [] = []`."
  }
];