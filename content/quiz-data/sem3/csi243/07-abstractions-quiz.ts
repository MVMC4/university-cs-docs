import type { Question } from '@/components/quiz';

const learningObjectives = [
  "Prove Functor laws (Identity and Composition) for the List type using structural induction.",
  "Design validated data constructors using Applicative error accumulation.",
  "Verify the three Monad laws for `Maybe` and translate them to Kleisli category laws.",
  "Mechanically desugar complex `do`-notation blocks into nested `>>=` binds."
];

export const quizData: Question[] = [
  {
    question: "Which law must a lawful Functor satisfy?",
    options: [
      "`fmap f (fmap g x) = fmap (f . g) x`",
      "`fmap id = id` and `fmap (f . g) = fmap f . fmap g`",
      "`fmap f (pure x) = pure (f x)`",
      "`fmap id x = pure x`"
    ],
    correctIndex: 1,
    explanation: "Functors must satisfy both the Identity law (`fmap id = id`) and the Composition law (`fmap (f . g) = fmap f . fmap g`)."
  },
  {
    question: "What is the key difference between Applicative and Monad?",
    options: [
      "Applicative handles dependent effects; Monad handles independent effects",
      "Applicative handles independent effects; Monad handles dependent effects where later computations can depend on earlier results",
      "They are identical; `Applicative` is just an alias for `Monad`",
      "Monad cannot sequence actions; only Applicative can"
    ],
    correctIndex: 1,
    explanation: "Applicative is for independent effects that can be combined in any order. Monad allows dependent sequencing where the result of one action determines the next action."
  },
  {
    question: "Which of the following is one of the three Monad laws?",
    options: [
      "`fmap id = id`",
      "`m >>= return ≡ m`",
      "`return a >>= f ≡ f a`",
      "`(m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)`",
      "`fmap id = id`"
    ],
    correctIndex: 1,
    explanation: "The Right Identity law states `m >>= return ≡ m`. Note: the associativity law uses escaped backslashes in the lambda: `\\x -> f x >>= g`."
  },
  {
    question: "What does Kleisli composition `(>=>)` do?",
    options: [
      "Composes two pure functions `a -> b` and `b -> c`",
      "Composes two monadic functions `a -> m b` and `b -> m c` into `a -> m c`",
      "Lifts a pure value into a monad",
      "Extracts a value from a monad"
    ],
    correctIndex: 1,
    explanation: "Kleisli composition `(>=>)` composes functions that return monadic values: `(f >=> g) x = f x >>= g`."
  },
  {
    question: "How does `do`-notation desugar?",
    options: [
      "`do { x <- m; f x }` becomes `m >>= f`",
      "`do { x <- m; f x }` becomes `f (m x)`",
      "`do { x <- m; f x }` becomes `m >> f x`",
      "`do { x <- m; f x }` becomes `fmap f m`"
    ],
    correctIndex: 0,
    explanation: "The `<-` binding in `do`-notation desugars to `>>=`: `do { x <- m; f x }` becomes `m >>= \\x -> f x`."
  }
];