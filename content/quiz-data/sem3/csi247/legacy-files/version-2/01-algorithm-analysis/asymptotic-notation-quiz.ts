export const quizData = [
  {
    question: "What is the formal definition of Big-O notation?",
    options: [
      "$T(n) = c \\cdot g(n)$ for all $n$",
      "$0 \\le T(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$",
      "$T(n) \\ge c \\cdot g(n)$ for all $n \\ge n_0$",
      "$\\lim_{n \\to \\infty} T(n) = g(n)$"
    ],
    correctIndex: 1,
    explanation: "Big-O defines an asymptotic upper bound using positive constants $c$ and $n_0$."
  },
  {
    question: "In the proof that $3n^2 + 2n + 1 = O(n^2)$, what is a valid choice for the constant $c$?",
    options: [
      "$c = 1$",
      "$c = 3$",
      "$c = 6$",
      "$c = 0.5$"
    ],
    correctIndex: 2,
    explanation: "By bounding $2n \\le 2n^2$ and $1 \\le n^2$ for $n \\ge 1$, the sum is $\\le 6n^2$, so $c=6$ works."
  },
  {
    question: "What does $n_0$ represent in the formal definition of Big-O?",
    options: [
      "The maximum input size.",
      "The threshold input size beyond which the inequality $T(n) \\le c \\cdot g(n)$ holds.",
      "The number of operations in the algorithm.",
      "The base of the logarithm."
    ],
    correctIndex: 1,
    explanation: "$n_0$ is the constant threshold. Asymptotic notation only cares about behavior for sufficiently large $n \\ge n_0$."
  },
  {
    question: "What is the formal definition of Big-Omega ($\\Omega$)?",
    options: [
      "$0 \\le c \\cdot g(n) \\le T(n)$ for all $n \\ge n_0$",
      "$0 \\le T(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$",
      "$T(n) = c \\cdot g(n)$ for all $n$",
      "$T(n) < g(n)$ for all $n \\ge n_0$"
    ],
    correctIndex: 0,
    explanation: "Big-Omega defines an asymptotic lower bound, meaning $T(n)$ grows at least as fast as $c \\cdot g(n)$."
  },
  {
    question: "If an algorithm is both $O(g(n))$ and $\\Omega(g(n))$, what notation is used?",
    options: [
      "$o(g(n))$",
      "$\\omega(g(n))$",
      "$\\Theta(g(n))$",
      "$O(g^2(n))$"
    ],
    correctIndex: 2,
    explanation: "Big-Theta ($\\Theta$) represents an asymptotic tight bound, meaning it is both upper and lower bounded by $g(n)$."
  },
  {
    question: "Why do we drop lower-order terms and constants in asymptotic analysis?",
    options: [
      "Because they are mathematically incorrect.",
      "Because as $n \\to \\infty$, the highest-order term dominates the growth rate.",
      "Because computers cannot calculate constants.",
      "Because it makes the equations look simpler."
    ],
    correctIndex: 1,
    explanation: "For very large $n$, $n^2$ grows so much faster than $n$ or $1$ that the lower-order terms become negligible."
  },
  {
    question: "What is the tight asymptotic bound for $T(n) = 5n^3 + 2n^2 + 100$?",
    options: [
      "$O(n)$",
      "$O(n^2)$",
      "$\\Theta(n^3)$",
      "$\\Omega(n^4)$"
    ],
    correctIndex: 2,
    explanation: "The highest-order term is $5n^3$. Dropping the constant 5 yields $\\Theta(n^3)$."
  },
  {
    question: "In the proof $3n^2 + 2n + 1 \\le c \\cdot n^2$, how do we bound the term $2n$ for $n \\ge 1$?",
    options: [
      "$2n \\le 2$",
      "$2n \\le n$",
      "$2n \\le 2n^2$",
      "$2n \\le n^3$"
    ],
    correctIndex: 2,
    explanation: "Since $n \\ge 1$, multiplying both sides by $n$ gives $n^2 \\ge n$. Thus, $2n \\le 2n^2$."
  },
  {
    question: "Which of the following functions grows the fastest as $n \\to \\infty$?",
    options: [
      "$n \\log n$",
      "$n^2$",
      "$2^n$",
      "$n!$"
    ],
    correctIndex: 3,
    explanation: "The hierarchy of growth rates is: constant < log < linear < n log n < quadratic < exponential < factorial."
  },
  {
    question: "What is the asymptotic complexity of a loop that runs $n$ times, containing an inner loop that runs $n$ times?",
    options: [
      "$O(n)$",
      "$O(n \\log n)$",
      "$O(n^2)$",
      "$O(2^n)$"
    ],
    correctIndex: 2,
    explanation: "Nested loops of size $n$ multiply their complexities: $n \\times n = n^2$."
  },
  {
    question: "If $T(n) = O(n^2)$, which of the following statements is true?",
    options: [
      "$T(n)$ is exactly $n^2$.",
      "$T(n)$ grows no faster than $n^2$.",
      "$T(n)$ grows at least as fast as $n^2$.",
      "$T(n)$ is strictly less than $n^2$."
    ],
    correctIndex: 1,
    explanation: "Big-O is an upper bound. It guarantees the algorithm will not exceed the $n^2$ growth rate for large $n$."
  },
  {
    question: "What is the Big-O complexity of accessing an element in an array by its index?",
    options: [
      "$O(n)$",
      "$O(\\log n)$",
      "$O(1)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Array index access uses direct memory address calculation, which takes constant time regardless of array size."
  },
  {
    question: "Why is asymptotic analysis preferred over empirical benchmarking (measuring actual runtime in seconds)?",
    options: [
      "Because benchmarking is always inaccurate.",
      "Because asymptotic analysis is independent of hardware, language, and compiler optimizations.",
      "Because asymptotic analysis is faster to compute.",
      "Because benchmarking requires a computer."
    ],
    correctIndex: 1,
    explanation: "Empirical benchmarking is machine-dependent. Asymptotic analysis abstracts away hardware to focus on the algorithm's inherent efficiency."
  },
  {
    question: "What is the value of $n_0$ in the proof that $3n^2 + 2n + 1 = O(n^2)$?",
    options: [
      "$n_0 = 0$",
      "$n_0 = 1$",
      "$n_0 = 3$",
      "$n_0 = \\infty$"
    ],
    correctIndex: 1,
    explanation: "We assumed $n \\ge 1$ to bound the lower-order terms ($n \\le n^2$), so $n_0 = 1$."
  },
  {
    question: "Which notation describes a strict upper bound, where $T(n)$ grows strictly slower than $g(n)$?",
    options: [
      "$O(g(n))$",
      "$o(g(n))$ (little-o)",
      "$\\Theta(g(n))$",
      "$\\Omega(g(n))$"
    ],
    correctIndex: 1,
    explanation: "Little-o ($o$) denotes a strict upper bound, analogous to $<$. Big-O ($O$) is analogous to $\\le$."
  }
];