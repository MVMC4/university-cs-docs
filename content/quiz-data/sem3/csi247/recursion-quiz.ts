export const quizData = [
  {
    question: "What prevents infinite recursion?",
    options: ["Heap memory", "Base case", "JIT compiler", "Garbage Collector"],
    correctIndex: 1,
    explanation: "The base case is the terminating condition that stops recursive calls. Without it, the stack grows until StackOverflowError."
  },
  {
    question: "Which memory area stores method calls in Java?",
    options: ["Heap", "Stack", "Metaspace", "PC Register"],
    correctIndex: 1,
    explanation: "The JVM Stack stores Stack Frames for method invocations, including local variables and return addresses."
  },
  {
    question: "The Master Theorem is used to solve:",
    options: ["Loop iterations", "Divide & Conquer recurrences", "Graph traversals", "Hash collisions"],
    correctIndex: 1,
    explanation: "Master Theorem solves recurrences of the form T(n) = aT(n/b) + f(n) for divide-and-conquer algorithms."
  },
  {
    question: "A StackOverflowError indicates:",
    options: ["Heap is full", "Recursion depth exceeded stack limit", "Syntax error", "Null pointer dereference"],
    correctIndex: 1,
    explanation: "StackOverflowError occurs when the call stack exceeds its allocated memory (default ~1MB per thread)."
  },
  {
    question: "Does Java perform Tail Call Optimization (TCO)?",
    options: ["Yes, always", "No", "Sometimes, for simple cases", "Only in Java 17+"],
    correctIndex: 1,
    explanation: "Java does NOT perform TCO because the JVM needs intact stack frames for security checks, exceptions, and debugging."
  },
  {
    question: "What is the time complexity of naive recursive Fibonacci?",
    options: ["O(n)", "O(n²)", "O(2ⁿ)", "O(log n)"],
    correctIndex: 2,
    explanation: "Naive Fibonacci is O(2ⁿ) due to massive overlapping subproblems - fib(n) calls fib(n-1) and fib(n-2), creating an exponential tree."
  },
  {
    question: "Memoization is which type of approach?",
    options: ["Bottom-Up", "Top-Down", "Iterative", "Greedy"],
    correctIndex: 1,
    explanation: "Memoization is Top-Down Dynamic Programming - recursion with caching of results."
  },
  {
    question: "Tabulation (Bottom-Up DP) helps avoid:",
    options: ["NullPointerException", "StackOverflowError", "ClassCastException", "OutOfMemoryError"],
    correctIndex: 1,
    explanation: "Bottom-Up DP uses iteration instead of recursion, eliminating the call stack and preventing StackOverflowError."
  },
  {
    question: "What is the time complexity of Tower of Hanoi?",
    options: ["O(n)", "O(n²)", "O(2ⁿ)", "O(n log n)"],
    correctIndex: 2,
    explanation: "Tower of Hanoi requires 2ⁿ - 1 moves. Recurrence: T(n) = 2T(n-1) + 1, which solves to O(2ⁿ)."
  },
  {
    question: "The Euclidean algorithm for GCD has time complexity:",
    options: ["O(n)", "O(log n)", "O(n²)", "O(√n)"],
    correctIndex: 1,
    explanation: "Euclidean GCD is O(log min(a,b)). By Lame's Theorem, it takes at most 5k steps where k is the number of digits."
  },
  {
    question: "Backtracking is essentially:",
    options: ["BFS traversal", "DFS on a state tree", "Binary Search", "Hashing"],
    correctIndex: 1,
    explanation: "Backtracking performs DFS on the state space tree, trying options and reverting (backtracking) when constraints are violated."
  },
  {
    question: "Which JVM flag sets the thread stack size?",
    options: ["-Xmx", "-Xms", "-Xss", "-Xmn"],
    correctIndex: 2,
    explanation: "-Xss sets the thread stack size (e.g., -Xss2m for 2MB). -Xmx is max heap, -Xms is initial heap."
  },
  {
    question: "Dynamic Programming requires which property?",
    options: ["Greedy choice property", "Overlapping subproblems", "Sorted input", "Hash table"],
    correctIndex: 1,
    explanation: "DP requires: 1) Overlapping subproblems (same subproblems solved repeatedly) and 2) Optimal substructure."
  },
  {
    question: "What is the space complexity of Bottom-Up Fibonacci?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Space-optimized Bottom-Up Fibonacci only stores the last two values, achieving O(1) space."
  },
  {
    question: "The Ackermann function is notable for:",
    options: ["O(1) time", "Extremely deep recursion growth", "Being a sorting algorithm", "Using hashing"],
    correctIndex: 1,
    explanation: "Ackermann function grows faster than any primitive recursive function and causes extremely deep recursion."
  },
  {
    question: "N-Queens problem uses which technique?",
    options: ["Greedy algorithm", "Backtracking", "Dijkstra's algorithm", "Kruskal's algorithm"],
    correctIndex: 1,
    explanation: "N-Queens uses backtracking - place queens row by row, backtrack when conflicts occur."
  },
  {
    question: "Key difference between Divide & Conquer and DP?",
    options: ["DC has overlapping subproblems", "DP has overlapping subproblems", "DC is always iterative", "DP is always recursive"],
    correctIndex: 1,
    explanation: "DP subproblems overlap (e.g., Fibonacci), while DC subproblems are independent (e.g., Merge Sort halves)."
  },
  {
    question: "Catalan numbers count:",
    options: ["Prime numbers", "Valid parenthesis expressions and BSTs", "Even numbers", "Hash collisions"],
    correctIndex: 1,
    explanation: "Catalan numbers count recursive structures: valid parentheses, binary search trees, triangulations, etc."
  },
  {
    question: "The Operand Stack in a JVM frame is used for:",
    options: ["Heap management", "Bytecode arithmetic operations", "Thread synchronization", "Garbage collection"],
    correctIndex: 1,
    explanation: "The Operand Stack is a workspace for bytecode instructions - e.g., iadd pops two ints, adds them, pushes result."
  },
  {
    question: "Lame's Theorem provides bounds for:",
    options: ["Sorting algorithms", "GCD algorithm steps", "Hash table collisions", "Tree height"],
    correctIndex: 1,
    explanation: "Lame's Theorem states that Euclidean GCD takes at most 5k divisions where k is the number of decimal digits."
  },
  {
    question: "In Merge Sort recurrence T(n) = 2T(n/2) + O(n), what is 'a'?",
    options: ["1", "2", "n", "log n"],
    correctIndex: 1,
    explanation: "In T(n) = aT(n/b) + f(n), 'a' is the number of subproblems. Merge Sort creates 2 subproblems, so a=2."
  },
  {
    question: "Which is NOT a base case for factorial?",
    options: ["n == 0", "n == 1", "n < 0", "n > 1"],
    correctIndex: 3,
    explanation: "n > 1 is the recursive case, not a base case. Base cases are n == 0 or n == 1 (both return 1)."
  },
  {
    question: "Binary Search recursion depth is:",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
    explanation: "Binary Search divides the problem in half each time, giving O(log n) recursion depth."
  },
  {
    question: "What does 'unwinding' mean in recursion?",
    options: ["Stack overflow", "Frames popping and returning values", "Infinite loop", "Heap allocation"],
    correctIndex: 1,
    explanation: "Unwinding is when base case is reached and stack frames pop off, returning values back up the call chain."
  },
  {
    question: "Which problem has optimal substructure?",
    options: ["Finding max in array", "Shortest path in graph", "Linear search", "All of the above"],
    correctIndex: 3,
    explanation: "All have optimal substructure - optimal solution can be built from optimal solutions to subproblems."
  },
  {
    question: "Space complexity of recursive Binary Search:",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Recursive Binary Search uses O(log n) stack space due to recursion depth. Iterative version is O(1)."
  },
  {
    question: "In N-Queens, how do you check diagonal conflicts?",
    options: ["row == col", "row + col or row - col constant", "abs(row - col) == 1", "row * col"],
    correctIndex: 1,
    explanation: "Major diagonal: row - col is constant. Minor diagonal: row + col is constant. Use boolean arrays to track."
  },
  {
    question: "Which is an example of mutual recursion?",
    options: ["Fibonacci", "isEven() calls isOdd()", "Merge Sort", "Binary Search"],
    correctIndex: 1,
    explanation: "Mutual recursion: function A calls function B, which calls function A. Example: isEven() calls isOdd(n-1)."
  },
  {
    question: "What is the recurrence for Strassen's Matrix Multiplication?",
    options: ["T(n) = 8T(n/2) + O(n²)", "T(n) = 7T(n/2) + O(n²)", "T(n) = 2T(n/2) + O(n)", "T(n) = T(n-1) + O(1)"],
    correctIndex: 1,
    explanation: "Strassen's algorithm uses 7 recursive multiplications instead of 8, giving T(n) = 7T(n/2) + O(n²) ≈ O(n^2.81)."
  },
  {
    question: "Which sorting algorithm is naturally recursive?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correctIndex: 2,
    explanation: "Merge Sort is naturally recursive with divide-and-conquer: split array, recursively sort halves, merge."
  },
  {
    question: "What is the time complexity of Merge Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctIndex: 1,
    explanation: "Merge Sort is O(n log n) in all cases. Recurrence T(n) = 2T(n/2) + O(n) solves to O(n log n) by Master Theorem."
  },
  {
    question: "Which DP problem is similar to Fibonacci?",
    options: ["Knapsack", "Climbing Stairs", "Edit Distance", "LCS"],
    correctIndex: 1,
    explanation: "Climbing Stairs has the same recurrence as Fibonacci: ways(n) = ways(n-1) + ways(n-2)."
  },
  {
    question: "What is the space complexity of Merge Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Merge Sort requires O(n) extra space for temporary arrays during merging."
  },
  {
    question: "In backtracking, what does 'UN-CHOOSE' mean?",
    options: ["Skip current choice", "Undo the choice and try next option", "Return from recursion", "Mark choice as used"],
    correctIndex: 1,
    explanation: "UN-CHOOSE (backtrack) means undoing the current choice to explore other possibilities."
  },
  {
    question: "Which is a characteristic of tail recursion?",
    options: ["Multiple recursive calls", "Recursive call is last operation", "Uses memoization", "Always O(1) space"],
    correctIndex: 1,
    explanation: "Tail recursion: the recursive call is the very last operation in the function."
  },
  {
    question: "What is the base case for binary search?",
    options: ["left == right", "left > right or arr[mid] == target", "mid == 0", "arr.length == 0"],
    correctIndex: 1,
    explanation: "Binary search base cases: 1) Found target (arr[mid] == target), 2) Not found (left > right)."
  },
  {
    question: "Which problem can be solved with greedy algorithm instead of DP?",
    options: ["0/1 Knapsack", "Fractional Knapsack", "LCS", "Edit Distance"],
    correctIndex: 1,
    explanation: "Fractional Knapsack has greedy choice property - always take item with highest value/weight ratio."
  },
  {
    question: "What is the time complexity of generating all permutations of n elements?",
    options: ["O(n)", "O(n²)", "O(n!)", "O(2ⁿ)"],
    correctIndex: 2,
    explanation: "There are n! permutations, and each takes O(n) to build, giving O(n! * n) total time."
  },
  {
    question: "In the Master Theorem, what does 'b' represent?",
    options: ["Number of subproblems", "Factor by which input is divided", "Exponent of combining work", "Base case size"],
    correctIndex: 1,
    explanation: "In T(n) = aT(n/b) + f(n), 'b' is the factor by which the problem size is divided in each recursive call."
  },
  {
    question: "Which is NOT a real-world application of recursion?",
    options: ["File system traversal", "JSON parsing", "Bubble sort", "Web crawling"],
    correctIndex: 2,
    explanation: "Bubble sort is naturally iterative. File traversal, JSON parsing, and web crawling all have recursive structure."
  },
  {
    question: "What is the main advantage of memoization over naive recursion?",
    options: ["Less code", "Avoids redundant calculations", "Uses less memory", "Faster I/O"],
    correctIndex: 1,
    explanation: "Memoization caches results to avoid recalculating the same subproblems, turning exponential time into linear."
  },
  {
    question: "Which data structure is commonly used in backtracking?",
    options: ["Queue", "Stack (implicit via recursion)", "Heap", "Hash table"],
    correctIndex: 1,
    explanation: "Backtracking uses the call stack (via recursion) to implicitly track the current state and choices made."
  },
  {
    question: "What is the space complexity of the call stack for factorial(n)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "factorial(n) makes n recursive calls, creating n stack frames, so space is O(n)."
  },
  {
    question: "Which Master Theorem case applies to T(n) = 4T(n/2) + O(n)?",
    options: ["Case 1", "Case 2", "Case 3", "Does not apply"],
    correctIndex: 0,
    explanation: "a=4, b=2, d=1. log_2(4) = 2 > 1, so d < log_b(a) → Case 1: T(n) = O(n^log_2(4)) = O(n²)."
  },
  {
    question: "What is the key insight behind the Euclidean GCD algorithm?",
    options: ["GCD(a,b) = GCD(a-b, b)", "GCD(a,b) = GCD(b, a mod b)", "GCD(a,b) = GCD(a/2, b/2)", "GCD(a,b) = a + b"],
    correctIndex: 1,
    explanation: "The key insight: GCD(a,b) = GCD(b, a mod b). This reduces the problem size logarithmically."
  },
  {
    question: "In DP, what is a 'state'?",
    options: ["Current array element", "Subproblem definition and parameters", "Return value", "Loop counter"],
    correctIndex: 1,
    explanation: "A state defines a subproblem - the parameters that uniquely identify what needs to be computed."
  }
];