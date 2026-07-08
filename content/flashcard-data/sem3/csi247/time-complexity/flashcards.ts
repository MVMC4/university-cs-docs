export const flashcardData = [
  { front: "Big-O Notation", back: "Describes an asymptotic upper bound on the growth rate of an algorithm's time or space complexity." },
  { front: "Big-Theta Notation", back: "Describes an asymptotic tight bound. The algorithm grows exactly at this rate." },
  { front: "Big-Omega Notation", back: "Describes an asymptotic lower bound. The algorithm grows at least this fast." },
  { front: "Amortized Analysis", back: "Averages the time required per operation over a worst-case sequence of operations." },
  { front: "Aggregate Method", back: "Proves amortized cost by showing the total cost of n operations is bounded, then dividing by n." },
  { front: "Accounting Method", back: "Assigns 'credits' to cheap operations to pay for expensive operations later." },
  { front: "Potential Method", back: "Stores prepaid work as 'potential energy' in the data structure's state to pay for future operations." },
  { front: "Master Theorem", back: "A cookbook formula for solving recurrence relations of the form T(n) = aT(n/b) + f(n)." },
  { front: "Recurrence Relation", back: "An equation that recursively defines a sequence, often used to express the time complexity of recursive algorithms." },
  { front: "Space Complexity", back: "The total amount of memory an algorithm needs relative to the size of the input." },
  { front: "Auxiliary Space", back: "The extra or temporary space used by an algorithm, excluding the space taken by the input itself." },
  { front: "P vs NP", back: "The unsolved problem asking whether every problem whose solution can be quickly verified can also be quickly solved." },
  { front: "Halting Problem", back: "Alan Turing's proof that no general algorithm can determine whether an arbitrary program will eventually stop or run forever." },
  { front: "Little-o Notation", back: "Describes a strict upper bound. f(n) grows strictly slower than g(n)." },
  { front: "Asymptotic Tight Bound", back: "When an algorithm's growth rate is sandwiched between the same Big-O and Big-Omega function." }
];