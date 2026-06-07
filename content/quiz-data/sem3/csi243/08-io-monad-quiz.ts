export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the fundamental nature of an `IO a` value in Haskell?",
    options: [
      "It is an executed side-effect that immediately alters global state.",
      "It is a pure data structure (AST/recipe) that describes an effect, executed only by the RTS.",
      "It is a mutable pointer to a foreign C function.",
      "It is a type alias for `State# RealWorld`."
    ],
    correctIndex: 1,
    explanation: "Haskell maintains purity by treating `IO` actions as first-class, immutable values that merely *describe* what to do. The Haskell Runtime System (RTS) interprets and executes the `main` recipe."
  },
  {
    question: "How does the `State# RealWorld` token enforce sequential execution?",
    options: [
      "It uses a global lock that prevents parallel evaluation.",
      "It creates a strict data dependency: each action consumes the token from the previous action, making reordering impossible.",
      "It tells the garbage collector to freeze memory.",
      "It is a runtime check that validates the type signature before execution."
    ],
    correctIndex: 1,
    explanation: "The token acts like a relay baton. `putStrLn` physically requires the `World_1` token produced by `getLine`. The compiler cannot reorder or cache actions because doing so would break the explicit token dependency chain."
  },
  {
    question: "What is the primary restriction on `IORef`?",
    options: [
      "It can only hold `String` values.",
      "It can only be accessed within the `IO` monad, preventing pure code from observing or causing mutation.",
      "It automatically triggers garbage collection when written to.",
      "It cannot be read twice."
    ],
    correctIndex: 1,
    explanation: "`IORef` operations (`newIORef`, `readIORef`, `modifyIORef`) return `IO a`. This confinement guarantees that mutation is strictly isolated from pure functional logic, preserving referential transparency."
  },
  {
    question: "Why is `unsafePerformIO :: IO a -> a` considered dangerous?",
    options: [
      "It requires C compiler flags.",
      "It breaks referential transparency; the compiler may duplicate, eliminate, or reorder the effect, causing undefined behavior.",
      "It only works on infinite lists.",
      "It converts `IO ()` to `IO Int` automatically."
    ],
    correctIndex: 1,
    explanation: "`unsafePerformIO` tells the compiler to pretend an IO action is a pure value. Because GHC optimizes pure code aggressively, it might call the action zero times, twice, or in a different order than intended. It should only be used for FFI or safe top-level constants."
  },
  {
    question: "Which function safely catches synchronous exceptions in the `IO` monad?",
    options: [
      "`catchError` from `Control.Monad.Error`",
      "`try` from `Control.Exception`",
      "`except` from `Control.Monad.Except`",
      "`handleIO`"
    ],
    correctIndex: 1,
    explanation: "`try :: Exception e => IO a -> IO (Either e a)` runs an `IO` action and returns `Left exception` if it fails, or `Right value` if it succeeds. It is the standard way to handle runtime errors in Haskell."
  },
  {
    question: "What does `action1 >> action2` do?",
    options: [
      "It runs `action1`, discards its result, then runs `action2` and returns its result.",
      "It runs both actions in parallel and returns a tuple.",
      "It binds the result of `action1` into `action2`.",
      "It repeats `action1` forever until `action2` succeeds."
    ],
    correctIndex: 0,
    explanation: "`>>` is sequencing. It executes the first action, throws away the output (`()` or otherwise), and immediately executes the second action, returning the second action's result. It's equivalent to `action1 >>= \_ -> action2`."
  },
  {
    question: "If you have `pureFunc :: String -> Int` and `ioAction :: IO String`, how do you apply `pureFunc` to the result of `ioAction`?",
    options: [
      "`pureFunc ioAction`",
      "`ioAction >>= pureFunc`",
      "`pureFunc <$> ioAction` or `do { s <- ioAction; return (pureFunc s) }`",
      "`unsafePerformIO (pureFunc ioAction)`"
    ],
    correctIndex: 2,
    explanation: "You must lift the pure function into the `IO` context. `fmap` (aliased as `<$>`) applies a pure function over an effectful context. Alternatively, bind the result with `<-` and `return` it."
  },
  {
    question: "What is the unboxed tuple `(# #)` in the `RealWorld` token type?",
    options: [
      "A syntax error in modern GHC.",
      "A compiler optimization that avoids heap allocation for the state token pair, passing values directly in registers.",
      "A type representing an empty list.",
      "A special monad transformer."
    ],
    correctIndex: 1,
    explanation: "`(# State# RealWorld, a #)` is an unboxed tuple. It tells GHC not to allocate a heap object for the tuple. Instead, it passes the `RealWorld` state and the result `a` directly in CPU registers, eliminating runtime overhead for the sequencing mechanism."
  }
];