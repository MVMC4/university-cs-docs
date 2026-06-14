export const quizData = [
  {
    question: "What is the foundational principle that allows equational reasoning in Haskell?",
    options: [
      "Lazy evaluation",
      "Referential Transparency",
      "Static typing",
      "Garbage collection"
    ],
    correctIndex: 1,
    explanation: "Referential Transparency guarantees that an expression can be replaced by its value without changing the program's behavior, enabling algebraic substitution."
  },
  {
    question: "In structural induction on lists, what is the 'Basis Step'?",
    options: [
      "Proving the property holds for the empty list `[]`.",
      "Proving the property holds for a list with one element.",
      "Assuming the property holds for `xs`.",
      "Proving the property holds for `x:xs`."
    ],
    correctIndex: 0,
    explanation: "The basis step anchors the induction by proving the property for the simplest possible structure, which is the empty list `[]`."
  },
  {
    question: "What does the 'Inductive Hypothesis' assume in structural induction on lists?",
    options: [
      "That the property holds for all lists.",
      "That the property holds for the empty list.",
      "That the property holds for an arbitrary list `xs`.",
      "That the property holds for `x:xs`."
    ],
    correctIndex: 2,
    explanation: "The inductive hypothesis assumes the property is true for some arbitrary list `xs`, which is then used to prove it for `x:xs`."
  },
  {
    question: "In the proof of `length (xs ++ ys) = length xs + length ys`, what is the first step of the Inductive Step (for `x:xs`)?",
    options: [
      "`length ((x:xs) ++ ys)`",
      "`length (xs ++ ys) + 1`",
      "`length (x:xs) + length ys`",
      "`1 + length ys`"
    ],
    correctIndex: 0,
    explanation: "The inductive step begins by writing the property for the larger structure `x:xs`, which is `length ((x:xs) ++ ys)`."
  },
  {
    question: "In the proof of `length (xs ++ ys) = length xs + length ys`, which definition is applied to expand `length ((x:xs) ++ ys)`?",
    options: [
      "Definition of `length`",
      "Definition of `++`: `(x:xs) ++ ys = x : (xs ++ ys)`",
      "Inductive Hypothesis",
      "Associativity of `+`"
    ],
    correctIndex: 1,
    explanation: "The first step is to apply the definition of list concatenation `++` to move the `++` inside the pattern match."
  },
  {
    question: "In the proof of `map (f . g) = map f . map g`, what is the Basis Step?",
    options: [
      "Proving it for `[x]`",
      "Proving it for `x:xs`",
      "Proving it for `[]`",
      "Proving it for `Nothing`"
    ],
    correctIndex: 2,
    explanation: "The basis step for list induction is always the empty list `[]`."
  },
  {
    question: "In the proof of `map (f . g) = map f . map g`, after applying the Inductive Hypothesis, what is the next step to reach the goal?",
    options: [
      "Apply the definition of `map` in reverse to fold `g x : map g xs` back into `map g (x:xs)`.",
      "Apply the definition of `length`.",
      "Use the commutativity of `+`.",
      "Terminate the proof."
    ],
    correctIndex: 0,
    explanation: "After substituting the IH, you apply the definition of `map` backwards to reconstruct `map g (x:xs)`, and then again to reconstruct `map f (map g (x:xs))`."
  },
  {
    question: "What does 'Q.E.D.' or the `\blacksquare` symbol signify at the end of a proof?",
    options: [
      "The proof has failed.",
      "The proof is incomplete.",
      "The proof is complete and the statement is proven.",
      "A new proof is beginning."
    ],
    correctIndex: 2,
    explanation: "Q.E.D. (quod erat demonstrandum) or the black square indicates that the proof has been successfully concluded."
  },
  {
    question: "Why is structural induction the appropriate proof technique for recursive Algebraic Data Types?",
    options: [
      "Because it is the only technique taught in computer science.",
      "Because the structure of the proof (base case + inductive step) perfectly mirrors the recursive definition of the data type (base constructor + recursive constructor).",
      "Because it proves the code runs in O(1) time.",
      "Because it automatically generates the Haskell implementation."
    ],
    correctIndex: 1,
    explanation: "Structural induction aligns perfectly with ADTs: you prove the property for the base constructor, then show that if it holds for the sub-structures, it holds for the recursive constructor."
  },
  {
    question: "What is the primary difference between testing a function and proving it via equational reasoning?",
    options: [
      "Testing is faster, but proving is more fun.",
      "Testing only verifies specific inputs, while proving guarantees correctness for all possible inputs.",
      "Testing requires a compiler, while proving requires a runtime.",
      "There is no difference."
    ],
    correctIndex: 1,
    explanation: "Testing is empirical and finite; equational reasoning is mathematical and universal, providing absolute guarantees for all inputs."
  },
  {
    question: "In equational reasoning, what justifies the step `f x = g x`?",
    options: [
      "Because they look similar.",
      "Because the compiler says so.",
      "Because it is an axiom, a definition, or a previously proven theorem/inductive hypothesis.",
      "Because it works for the number 5."
    ],
    correctIndex: 2,
    explanation: "Every step in an equational proof must be justified by a formal rule: a function definition, a language axiom, or an established theorem/IH."
  },
  {
    question: "When proving a property for a custom `Tree` ADT (`Leaf | Node Tree a Tree`), what are the cases in the structural induction?",
    options: [
      "Only the `Leaf` case.",
      "Only the `Node` case.",
      "The `Leaf` case (basis) and the `Node` case (inductive step, assuming the property holds for the left and right subtrees).",
      "The empty list case and the cons case."
    ],
    correctIndex: 2,
    explanation: "You must prove the basis case (`Leaf`) and the inductive case (`Node`), where the inductive hypothesis is assumed for the recursive sub-structures (the left and right `Tree` arguments)."
  },
  {
    question: "What is the result of applying the definition of `++` to `[] ++ ys`?",
    options: [
      "`ys`",
      "`[]`",
      "`[ys]`",
      "`ys ++ []`"
    ],
    correctIndex: 0,
    explanation: "The definition of list concatenation states that appending any list `ys` to the empty list `[]` yields `ys`."
  },
  {
    question: "In the proof of `length (xs ++ ys) = length xs + length ys`, where is the Inductive Hypothesis applied?",
    options: [
      "In the Basis Step.",
      "In the Inductive Step, to replace `length (xs ++ ys)` with `length xs + length ys`.",
      "It is not used.",
      "At the very end of the proof."
    ],
    correctIndex: 1,
    explanation: "During the Inductive Step, after expanding the definitions, the expression `length (xs ++ ys)` appears, which is exactly the form of the Inductive Hypothesis, allowing substitution."
  },
  {
    question: "What does it mean for a function to be 'congruent' in equational reasoning?",
    options: [
      "It always returns the same type.",
      "If `a = b`, then `f a = f b`. You can substitute equals for equals inside any function context.",
      "It is symmetric.",
      "It is reflexive."
    ],
    correctIndex: 1,
    explanation: "Congruence is the property that allows substitution: if two expressions are equal, applying the same function to both yields equal results."
  }
];