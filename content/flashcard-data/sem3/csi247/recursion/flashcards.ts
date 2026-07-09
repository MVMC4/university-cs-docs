export const flashcardData = [
  { front: "Base Case", back: "The condition in a recursive function that stops further recursive calls, preventing infinite loops." },
  { front: "Call Stack", back: "The memory structure that keeps track of active function calls and their local variables." },
  { front: "StackOverflowError", back: "Thrown when the call stack exceeds its memory limit, usually due to missing base cases or excessively deep recursion." },
  { front: "Tail Recursion", back: "A recursion where the recursive call is the very last operation. Compilers can optimize this to use O(1) stack space." },
  { front: "Memoization", back: "A top-down DP technique that caches the results of expensive function calls to avoid redundant calculations." },
  { front: "Tabulation", back: "A bottom-up DP technique that iteratively fills a table with solutions to subproblems." },
  { front: "Backtracking", back: "An algorithmic paradigm that explores all possible paths, abandoning ('pruning') paths that fail constraints." },
  { front: "Divide and Conquer", back: "Breaks a problem into independent subproblems, solves them recursively, and combines their results." },
  { front: "Overlapping Subproblems", back: "When a recursive algorithm revisits the same subproblems multiple times. This is the prerequisite for Dynamic Programming." },
  { front: "Optimal Substructure", back: "When the optimal solution to a problem can be constructed from optimal solutions of its subproblems." },
  { front: "Catalan Number", back: "A sequence of natural numbers that occur in various counting problems, like valid parentheses combinations and BST structures." },
  { front: "State Space Tree", back: "A tree representing all possible states or choices in a backtracking algorithm." },
  { front: "Pruning", back: "The act of stopping the exploration of a branch in backtracking because it cannot possibly lead to a valid solution." },
  { front: "Master Theorem (D&C)", back: "Used to find the Big-O of divide-and-conquer recurrences like Merge Sort: T(n) = 2T(n/2) + O(n)." },
  { front: "Recursion Tree Method", back: "A technique to solve recurrences by drawing the tree of recursive calls and summing the work done at each level." }
];