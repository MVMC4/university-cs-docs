export const quizData = [
  {
    question: "What are the two essential components of a recursive Algebraic Data Type?",
    options: [
      "A type synonym and a data declaration.",
      "A base case (non-recursive constructor) and a recursive case.",
      "A `deriving` clause and a `where` block.",
      "A smart constructor and a module export list."
    ],
    correctIndex: 1,
    explanation: "A recursive ADT must have at least one base case to terminate the recursion and one recursive case that refers to the type itself."
  },
  {
    question: "In the definition `data Tree a = Leaf | Node (Tree a) a (Tree a)`, which constructor is the base case?",
    options: [
      "`Node`",
      "`Leaf`",
      "Both are base cases.",
      "Neither; it is not a recursive type."
    ],
    correctIndex: 1,
    explanation: "`Leaf` does not contain any references to `Tree a`, making it the terminating base case for recursion."
  },
  {
    question: "What is the type signature of a function that inserts an element into a Binary Search Tree of type `Tree a`?",
    options: [
      "`insert :: a -> Tree a -> Tree a`",
      "`insert :: Ord a => a -> Tree a -> Tree a`",
      "`insert :: Tree a -> a -> Tree a`",
      "`insert :: a -> Tree a -> Bool`"
    ],
    correctIndex: 1,
    explanation: "Insertion into a BST requires the ability to compare elements, hence the `Ord a` typeclass constraint."
  },
  {
    question: "In the recursive step of BST insertion, if the new value `x` is less than the current node's value `val`, what is the recursive call?",
    options: [
      "`Node (insert x left) val right`",
      "`Node left val (insert x right)`",
      "`Node (insert x left) val (insert x right)`",
      "`insert x left`"
    ],
    correctIndex: 0,
    explanation: "If `x < val`, the new value belongs in the left subtree, so we recursively insert `x` into `left` and reconstruct the `Node`."
  },
  {
    question: "What is the time complexity of searching for an element in a balanced Binary Search Tree?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    correctIndex: 1,
    explanation: "In a balanced BST, each comparison eliminates half of the remaining tree, resulting in O(log n) time complexity."
  },
  {
    question: "What is the time complexity of searching for an element in a severely unbalanced (degenerate) Binary Search Tree?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    correctIndex: 2,
    explanation: "If the tree degenerates into a linked list (e.g., inserting sorted data), searching requires traversing all `n` nodes, resulting in O(n) worst-case time complexity."
  },
  {
    question: "Haskell's built-in list type `[a]` is conceptually equivalent to which recursive ADT?",
    options: [
      "`data List a = Empty | Cons a (List a)`",
      "`data List a = Node a (List a) (List a)`",
      "`data List a = Single a | Multiple [a]`",
      "`data List a = Nil | Snoc (List a) a`"
    ],
    correctIndex: 0,
    explanation: "The built-in list is a recursive Sum Type where `[]` is the base case (`Empty`) and `(:)` is the recursive case (`Cons`)."
  },
  {
    question: "When writing a recursive function to traverse a custom ADT, what is the role of the base case pattern?",
    options: [
      "To trigger an infinite loop.",
      "To provide the terminating condition that stops the recursion and returns a concrete value.",
      "To modify the data structure in place.",
      "To enforce typeclass constraints."
    ],
    correctIndex: 1,
    explanation: "The base case pattern matches the simplest form of the data structure (e.g., `Leaf` or `[]`) and returns a value without making further recursive calls."
  },
  {
    question: "What does the `toList` function typically do when applied to a Binary Search Tree?",
    options: [
      "It deletes the tree.",
      "It performs an in-order traversal, yielding a sorted list of elements.",
      "It performs a pre-order traversal, yielding a reversed list.",
      "It converts the tree into a single string."
    ],
    correctIndex: 1,
    explanation: "An in-order traversal (`toList left ++ [val] ++ toList right`) of a BST visits nodes in ascending order, producing a sorted list."
  },
  {
    question: "Why is structural induction used to prove properties of recursive ADTs?",
    options: [
      "Because it is the only way to compile Haskell code.",
      "Because the structure of the proof directly mirrors the recursive structure (base case and inductive step) of the data type.",
      "Because it proves the code runs in O(1) time.",
      "Because it automatically generates the Haskell implementation."
    ],
    correctIndex: 1,
    explanation: "Structural induction proves a property holds for the base case, and then proves that if it holds for the sub-structures, it holds for the constructed structure, perfectly matching recursive ADT definitions."
  },
  {
    question: "In the pattern `Node left val right`, what is the type of `val`?",
    options: [
      "`Tree a`",
      "`a`",
      "`[a]`",
      "`Int`"
    ],
    correctIndex: 1,
    explanation: "In `data Tree a = Leaf | Node (Tree a) a (Tree a)`, the middle field `val` holds the value of type `a` stored at that node."
  },
  {
    question: "What is the result of evaluating `toList Leaf` for a BST?",
    options: [
      "`[Leaf]`",
      "`[]`",
      "`Nothing`",
      "A runtime error"
    ],
    correctIndex: 1,
    explanation: "The base case for `toList` on a `Leaf` is defined to return the empty list `[]`."
  },
  {
    question: "Which of the following is a valid reason to use a custom recursive ADT instead of a built-in list?",
    options: [
      "Custom ADTs are always faster.",
      "Custom ADTs can enforce specific structural invariants (e.g., BST ordering) at the type or function level.",
      "Custom ADTs require less memory.",
      "Custom ADTs do not require pattern matching."
    ],
    correctIndex: 1,
    explanation: "Custom ADTs allow you to model domain-specific structures (like trees or expressions) and write functions that leverage and maintain their specific invariants."
  },
  {
    question: "If you define `data Expr = Val Int | Add Expr Expr`, what is the cardinality of `Expr`?",
    options: [
      "Finite",
      "Infinite",
      "Zero",
      "Exactly 2"
    ],
    correctIndex: 1,
    explanation: "Because `Add` is recursive and `Int` is infinite, you can construct infinitely many distinct `Expr` values (e.g., `Add (Val 1) (Val 1)`, `Add (Add (Val 1) (Val 1)) (Val 1)`, etc.)."
  },
  {
    question: "What is the primary purpose of the `deriving (Show)` clause on a recursive ADT?",
    options: [
      "It allows the ADT to be printed or converted to a string representation automatically.",
      "It allows the ADT to be compared for equality.",
      "It makes the ADT mutable.",
      "It optimizes the ADT for tail recursion."
    ],
    correctIndex: 0,
    explanation: "Deriving `Show` automatically generates a `show` function that can convert any value of the recursive ADT into a readable `String`."
  }
];