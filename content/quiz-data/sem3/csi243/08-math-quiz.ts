export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What are the three steps of structural induction on lists?",
    options: [
      "Head, Tail, and Empty",
      "Base case (`[]`), Inductive Hypothesis (assume for `xs`), Inductive Step (prove for `x:xs`)",
      "Map, Filter, and Fold",
      "Input, Output, and State"
    ],
    correctIndex: 1,
    explanation: "Structural induction mirrors the recursive definition of lists: proving the base case, assuming the hypothesis for a smaller structure, and proving the step for the larger structure."
  },
  {
    question: "To prove `map id xs = xs` by structural induction, what is the correct Base Case?",
    options: [
      "map id [1] = [1]",
      "map id [] = []",
      "map id (x:xs) = x:xs",
      "id x = x"
    ],
    correctIndex: 1,
    explanation: "Structural induction on lists always begins with the simplest possible structure: the empty list `[]`."
  },
  {
    question: "What is the Inductive Hypothesis (IH)?",
    options: [
      "The final conclusion of the proof",
      "The assumption that the property holds for an arbitrary structure `xs`",
      "The base case of the recursion",
      "A compiler error message"
    ],
    correctIndex: 1,
    explanation: "The IH is the assumption that the property is true for a smaller instance (`xs`), which you then use to prove it holds for the larger instance (`x:xs`)."
  },
  {
    question: "The Functor Identity Law states that:",
    options: [
      "fmap (f . g) = fmap f . fmap g",
      "fmap id = id",
      "fmap return = return",
      "fmap join = join"
    ],
    correctIndex: 1,
    explanation: "The Identity Law guarantees that mapping the identity function over a structure changes nothing, preserving the structure's integrity."
  },
  {
    question: "In the inductive step of a list proof, you typically expand `x:xs` using:",
    options: [
      "The definition of the function being proved",
      "A random guess",
      "The length of the list",
      "Global variables"
    ],
    correctIndex: 0,
    explanation: "You apply the recursive definition of the function (e.g., `length` or `map`) to the `x:xs` pattern to break it down into `x` and `xs`."
  }
];