export const quizData = [
  {
    question: "What is the time complexity of the naive `revList` function?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctIndex: 3,
    explanation: "Because `revList` uses the `++` operator at each of the `n` recursive steps, and `++` takes time proportional to the length of the left list, the total time is O(n²)."
  },
  {
    question: "Why does the `++` operator have a time complexity of O(k), where k is the length of the left list?",
    options: [
      "Because it sorts the left list before concatenation.",
      "Because it must traverse the entire left list to reach the final `[]` constructor to attach the right list.",
      "Because it creates a copy of the right list.",
      "Because it checks for duplicate elements."
    ],
    correctIndex: 1,
    explanation: "Linked lists in Haskell are singly linked. To append to the end, the runtime must walk through every node of the left list to find the terminating `[]`."
  },
  {
    question: "How does the accumulator pattern achieve O(n) time complexity for list reversal?",
    options: [
      "By using the `++` operator more efficiently.",
      "By replacing `++` with the O(1) cons (`:`) operator to build the result.",
      "By reducing the size of the input list by half at each step.",
      "By caching the results of previous recursive calls."
    ],
    correctIndex: 1,
    explanation: "The accumulator pattern prepends elements to the accumulator using `:`, which is an O(1) operation, avoiding the O(k) traversal cost of `++`."
  },
  {
    question: "What is the time complexity of the naive recursive Fibonacci function `fib n = fib (n-1) + fib (n-2)`?",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(2ⁿ)"
    ],
    correctIndex: 3,
    explanation: "The call tree branches into two at almost every step, leading to an exponential number of redundant function calls, bounded by O(2ⁿ)."
  },
  {
    question: "In the call tree for `fib 4`, how many times is `fib 2` evaluated?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctIndex: 1,
    explanation: "`fib 4` calls `fib 3` and `fib 2`. `fib 3` then calls `fib 2` and `fib 1`. Thus, `fib 2` is evaluated twice."
  },
  {
    question: "What is the primary cause of the exponential time complexity in naive Fibonacci?",
    options: [
      "The use of addition.",
      "Overlapping subproblems leading to redundant computation.",
      "The lack of a base case.",
      "The use of large integers."
    ],
    correctIndex: 1,
    explanation: "The same subproblems (e.g., `fib 2`, `fib 1`) are computed multiple times in different branches of the call tree, causing exponential blowup."
  },
  {
    question: "What technique can be used to optimize the naive Fibonacci function to O(n) time complexity?",
    options: [
      "Tail recursion",
      "Memoization or passing multiple accumulators",
      "Using the `++` operator",
      "Increasing the base case value"
    ],
    correctIndex: 1,
    explanation: "Memoization (caching results) or an accumulator pattern that passes the last two computed values forward eliminates redundant calculations, reducing complexity to O(n)."
  },
  {
    question: "In Haskell, what is the space complexity of a non-tail-recursive function like `fac n = n * fac (n-1)`?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctIndex: 2,
    explanation: "Because the multiplication `n * ...` must wait for the recursive call to return, the runtime builds a chain of unevaluated thunks (suspended computations) of size O(n) on the heap."
  },
  {
    question: "What is a 'thunk' in the context of Haskell's space complexity?",
    options: [
      "A compiled machine-code instruction.",
      "A suspended, unevaluated computation waiting for its value to be needed.",
      "A type of compiler error.",
      "A garbage-collected memory block."
    ],
    correctIndex: 1,
    explanation: "Due to lazy evaluation, expressions are not evaluated immediately. Instead, a 'thunk' (a pointer to code and environment) is created, which can consume O(n) space if chained."
  },
  {
    question: "How does tail recursion help improve space complexity?",
    options: [
      "It eliminates the need for base cases.",
      "It allows the compiler to reuse the current stack frame, preventing the buildup of thunks (O(1) auxiliary space).",
      "It automatically converts the function to use the `++` operator.",
      "It forces strict evaluation of all arguments."
    ],
    correctIndex: 1,
    explanation: "In a tail-recursive function, the recursive call is the very last operation. The compiler can optimize this by reusing the current stack frame (tail call optimization), resulting in O(1) space."
  },
  {
    question: "Which of the following functions is tail-recursive?",
    options: [
      "`fac n = if n == 0 then 1 else n * fac (n-1)`",
      "`revAcc [] acc = acc; revAcc (x:xs) acc = revAcc xs (x:acc)`",
      "`fib n = fib (n-1) + fib (n-2)`",
      "`sum (x:xs) = x + sum xs`"
    ],
    correctIndex: 1,
    explanation: "In `revAcc`, the recursive call to `revAcc` is the absolute last operation performed; no further computation is needed after it returns."
  },
  {
    question: "What is the space complexity of the accumulator-based `revList` function (assuming strict evaluation of the accumulator)?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctIndex: 0,
    explanation: "Because it is tail-recursive and the accumulator is built strictly, it requires only O(1) auxiliary stack space (though the resulting list itself naturally takes O(n) heap space)."
  },
  {
    question: "In the dry run of `fib 3`, what is the first expansion?",
    options: [
      "`fib 2 + fib 1`",
      "`fib 1 + fib 0`",
      "`3`",
      "`fib 3 + fib 2`"
    ],
    correctIndex: 0,
    explanation: "Applying the recursive rule `fib n = fib (n-1) + fib (n-2)` to `fib 3` yields `fib 2 + fib 1`."
  },
  {
    question: "Why is analyzing the complexity of recursive functions in Haskell more nuanced than in imperative languages?",
    options: [
      "Because Haskell does not have loops.",
      "Because lazy evaluation and thunk buildup can cause space leaks that are not obvious from the algorithm's logical structure.",
      "Because Haskell functions are always O(1).",
      "Because Haskell compiles to JavaScript."
    ],
    correctIndex: 1,
    explanation: "Lazy evaluation means that time and space complexity are decoupled in non-obvious ways. A logically O(n) algorithm can exhibit O(n) space complexity due to unevaluated thunks if not written strictly or tail-recursively."
  },
  {
    question: "What mathematical series represents the total cost of the naive `revList` function?",
    options: [
      "A constant series: $1 + 1 + ... + 1$",
      "A geometric series: $1 + 2 + 4 + ... + 2^n$",
      "An arithmetic series: $1 + 2 + 3 + ... + n$",
      "A harmonic series: $1 + 1/2 + 1/3 + ... + 1/n$"
    ],
    correctIndex: 2,
    explanation: "At each step $i$, the `++` operator traverses a list of length $i$. Summing these costs from $1$ to $n$ yields the arithmetic series $n(n+1)/2$, which is $O(n^2)$."
  }
];