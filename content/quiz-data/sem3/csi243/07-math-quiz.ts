export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is equational reasoning?",
    options: [
      "Solving for x in algebraic equations",
      "Substituting function calls with their results (or vice versa) due to purity",
      "Using a calculator to verify program output",
      "Writing unit tests to check equality"
    ],
    correctIndex: 1,
    explanation: "Referential transparency guarantees that an expression can be replaced by its value without altering the program's behavior, enabling algebraic substitution."
  },
  {
    question: "What is a 'Free Theorem' in the context of parametric polymorphism?",
    options: [
      "A theorem that is automatically proven by the compiler",
      "A property deduced about a function's behavior solely from its type signature",
      "A theorem that applies only to free variables",
      "A mathematical proof that requires no base case"
    ],
    correctIndex: 1,
    explanation: "Because a polymorphic function knows nothing about the specific type `a`, we can deduce strict limitations on what it can possibly do (e.g., it cannot create new values of type `a`)."
  },
  {
    question: "If a function has the type `a -> a`, what is the only possible total implementation?",
    options: [
      "It returns a constant value",
      "It returns the input unchanged (the identity function)",
      "It throws an error",
      "It increments the value"
    ],
    correctIndex: 1,
    explanation: "Since the function knows nothing about type `a`, it cannot modify it, create a new one, or inspect it. It can only return the input exactly as it was."
  },
  {
    question: "Why is equational reasoning difficult in imperative languages?",
    options: [
      "Imperative languages lack variables",
      "Mutable state and side effects mean substituting an expression can change program behavior",
      "Imperative languages are too fast",
      "They do not support functions"
    ],
    correctIndex: 1,
    explanation: "In imperative languages, evaluating an expression might mutate global state or depend on the current time, breaking referential transparency."
  }
];