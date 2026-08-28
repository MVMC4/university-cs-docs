export const flashcardData = [
  {
    front: "The three parts of a specification",
    back: "Purpose: what the function represents, in one sentence. Precondition: what must be true of the arguments before application. Postcondition: what is true of the result afterwards.",
  },
  {
    front: "How is the input set partitioned?",
    back: "I = Iv ∪ Ie, where Iv is the valid subset satisfying the precondition and Ie is the invalid remainder. A function acts from Iv (precondition state) to Ov (postcondition state).",
  },
  {
    front: "Why is a type usually wider than Iv?",
    back: "fac :: Integer -> Integer accepts every integer, but the specification's Iv is only the non-negative ones. That gap is where fac (-1) fails to terminate.",
  },
  {
    front: "Three ways to handle an argument outside the precondition",
    back: "Reject it with error (not recoverable); define it by extending the base case; or report it by returning Maybe (visible in the type, and the caller must handle it).",
  },
  {
    front: "What does correctness actually claim?",
    back: "That for every argument satisfying the precondition, the function terminates and produces a result satisfying the postcondition. Correctness is always relative to a stated specification.",
  },
  {
    front: "Why is type checking not correctness?",
    back: "A compiler proves types are used consistently, not that a formula matches the problem. fac 0 = 0 type checks perfectly and is wrong.",
  },
  {
    front: "What is referential transparency?",
    back: "An expression can be replaced by its value without changing observable behaviour. It holds because functions are pure. x = x + 1 is not referentially transparent, since the same text denotes different values over time.",
  },
  {
    front: "How do you prove a property of a list function?",
    back: "Structural induction: prove the base case for [], assume it for xs, then show it holds for (x:xs). The proof follows the same two cases as the function definition.",
  },
  {
    front: "The three levels of evidence",
    back: "It compiles (types consistent); tests pass (worked for those inputs); a completed induction (holds for every finite input, assuming termination).",
  },
  {
    front: "The two stages of analysis before evaluation",
    back: "Syntax analysis checks conformance to the language's syntax; type analysis then checks the expression has a sensible type. Evaluation begins only if both pass.",
  },
  {
    front: "Syntax error or semantic error?",
    back: "Syntax errors concern the structure of the language — unbalanced parentheses, a missing else, type mismatch — and are caught before running. Semantic errors concern meaning — division by zero, index out of range — and surface during execution.",
  },
  {
    front: "The three test categories",
    back: "Normal (an ordinary representative input), boundary (zero, an empty structure, a decision edge), and invalid (outside the domain, where the signature permits it).",
  },
  {
    front: "Why test just outside a range boundary?",
    back: "A mistaken strict comparison passes ordinary examples while rejecting the boundary value. For isDigitChar, test '/' and ':' — the characters immediately either side of '0' and '9'.",
  },
  {
    front: "What is the cost of `length` on n elements?",
    back: "n + 1 calls: one per element plus the base case. Linear growth, O(n) — doubling the list roughly doubles the work.",
  },
  {
    front: "Why is naive `fib` exponential?",
    back: "Each call makes two more, so work roughly doubles per increase of one in n — O(2ⁿ). The cause is recomputation of overlapping subproblems, not recursion itself. An accumulator version is linear.",
  },
  {
    front: "Why is naive `myReverse` quadratic?",
    back: "++ [x] walks the whole reversed tail at each of n steps, giving n + (n-1) + ... + 1 work, so O(n²). Consing onto an accumulator is constant-cost and gives O(n).",
  },
  {
    front: "Cost of head, length, xs !! k, xs ++ ys, sort",
    back: "head is O(1); length is O(n); xs !! k is O(k); xs ++ ys is O(n) in the length of xs; sort is O(n log n).",
  },
  {
    front: "What is laziness, and what is a thunk?",
    back: "Haskell evaluates nothing without a reason. A thunk wraps a function or expression to delay computation until the result is needed. This is why take 5 [1..] terminates and unused arguments cost nothing.",
  },
];
