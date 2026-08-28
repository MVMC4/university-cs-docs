export const flashcardData = [
  {
    front: "What is recursion, and why does Haskell need it?",
    back: "Recursion means repetition: a function defined in terms of itself. Haskell has no for or while loops, so recursion is how repetition is expressed.",
  },
  {
    front: "The two parts of every recursive definition",
    back: "A base case, which defines the function for the first input values and terminates the recursion; and a recursive step, which defines other inputs in terms of the function itself.",
  },
  {
    front: "Why must the base case be listed first?",
    back: "Equations are matched top to bottom and a variable pattern matches anything. If the recursive step is listed first it captures the base value too, and the recursion never stops.",
  },
  {
    front: "How many base cases does a specification need?",
    back: "One for every position the recursive step can reach back to. fac subtracts 1 so needs one; fib calls both n-1 and n-2 so needs two.",
  },
  {
    front: "Specification of `fac n`",
    back: "fac n = 1 if n = 0, and n * fac (n - 1) if n > 0. In Haskell: fac 0 = 1 then fac n = n * fac (n - 1).",
  },
  {
    front: "Specification of `fib n`",
    back: "fib n = 0 if n = 0, 1 if n = 1, and fib (n-1) + fib (n-2) otherwise.",
  },
  {
    front: "The three conditions for termination",
    back: "A base case exists and is positioned so it can match; every recursive call changes the argument; and the change moves the argument towards the base case.",
  },
  {
    front: "The two phases of a recursive evaluation",
    back: "Unwinding, where each call expands into the recursive step and calls stack up with nothing calculated; then rewinding, where the base value is substituted back and the arithmetic is performed innermost first.",
  },
  {
    front: "How do you lay out a dry run for marks?",
    back: "One reduction per line, parentheses kept so pending calls stay visible, the base-case line marked, and the final value on its own line. Jumping straight to the answer earns nothing.",
  },
  {
    front: "How do you diagnose a hanging recursive function?",
    back: "Write two or three unwinding steps and look at the argument. If it is not moving towards the base case, the fault is found — no full trace needed.",
  },
  {
    front: "Why does `fac (-1)` never terminate?",
    back: "The type Integer -> Integer admits negatives, but the specification does not. Each call moves the argument further from the base case at 0, so it is never matched.",
  },
  {
    front: "The type of `error`, and why",
    back: "error :: String -> a. Its result is an arbitrary type variable because it never returns a value — it stops evaluation — so it can be used wherever any type is expected.",
  },
  {
    front: "What makes a good error message?",
    back: "It names the function and states the rule broken, e.g. \"fac: only defined for non-negative integers\". The function-name prefix is often the only clue to where a deep failure came from.",
  },
  {
    front: "Two ways to close the gap between a type and a specification's domain",
    back: "Report the invalid case with error, or extend the base case to give those values a defined answer. Choose deliberately and document it; the specification decides.",
  },
  {
    front: "Does the type checker prove termination?",
    back: "No. It establishes only that types are used consistently. fac (-1) is well typed and never terminates.",
  },
  {
    front: "Why is naive `fib` slow?",
    back: "Each call branches into two, so sub-results are recomputed many times over — fib 5 evaluates fib 2 three separate times. The work roughly doubles per step.",
  },
];
