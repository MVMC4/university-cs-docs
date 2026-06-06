export const quizData = [
  {
    question: "What does Big-O notation formally require to prove f(n) = O(g(n))?",
    options: ["Computing limits", "Finding constants c and n₀", "Taking derivatives", "Computing integrals"],
    correctIndex: 1,
    explanation: "Big-O requires finding positive constants c and n₀ such that 0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀."
  },
  {
    question: "What does Big-Omega (Ω) notation represent?",
    options: ["Upper bound", "Lower bound", "Tight bound", "Average case"],
    correctIndex: 1,
    explanation: "Big-Omega provides a lower bound: f(n) grows at least as fast as g(n)."
  },
  {
    question: "What does little-o notation mean?",
    options: ["Strictly faster growth", "Strictly slower growth", "Equal growth", "Negative growth"],
    correctIndex: 1,
    explanation: "f(n) = o(g(n)) means f(n) grows strictly slower than g(n): lim(n→∞) f(n)/g(n) = 0."
  },
  {
    question: "Amortized analysis guarantees average cost over:",
    options: ["Random inputs (probability)", "Worst-case sequence of operations", "Best-case scenario", "Average input distribution"],
    correctIndex: 1,
    explanation: "Amortized analysis provides worst-case guarantees averaged over a sequence of operations, with no probability involved."
  },
  {
    question: "The Potential Method in amortized analysis uses:",
    options: ["Bank credits", "Physics-style energy function Φ", "Aggregate sum", "Master Theorem"],
    correctIndex: 1,
    explanation: "The Potential Method defines a potential function Φ that maps data structure state to a non-negative real number."
  },
  {
    question: "What is the amortized time complexity of ArrayList append?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Although occasional resizes cost O(n), the amortized cost per append is O(1) when spread over all insertions."
  },
  {
    question: "When we say an algorithm uses O(1) space, we typically mean:",
    options: ["Total space including input", "Auxiliary (extra) space only", "Input space only", "Heap space only"],
    correctIndex: 1,
    explanation: "Space complexity typically refers to auxiliary space - extra memory excluding the input itself."
  },
  {
    question: "The complexity class P contains problems that are:",
    options: ["Exponential time", "Solvable in polynomial time", "Unsolvable", "NP-Complete"],
    correctIndex: 1,
    explanation: "P contains decision problems solvable in polynomial time by a deterministic Turing machine."
  },
  {
    question: "The complexity class NP contains problems that are:",
    options: ["Solvable in polynomial time", "Verifiable in polynomial time", "Never solvable", "Solvable in O(1)"],
    correctIndex: 1,
    explanation: "NP contains decision problems whose solutions can be verified in polynomial time."
  },
  {
    question: "If P = NP, what would be a major consequence?",
    options: ["Nothing changes", "Cryptography breaks", "Computers stop working", "Java becomes faster"],
    correctIndex: 1,
    explanation: "If P = NP, many cryptographic systems (RSA, etc.) would break because hard problems would become easy to solve."
  },
  {
    question: "Merge Sort requires what type of space?",
    options: ["Input space only", "Auxiliary array for merging", "Stack space only", "Metaspace"],
    correctIndex: 1,
    explanation: "Merge Sort requires O(n) auxiliary space for the temporary array used during merging."
  },
  {
    question: "Which is an example of an NP-Complete problem?",
    options: ["Binary Search", "Merge Sort", "Traveling Salesperson Problem (TSP)", "Dijkstra's Algorithm"],
    correctIndex: 2,
    explanation: "TSP is NP-Complete - it's in NP and as hard as the hardest problems in NP."
  },
  {
    question: "The Accounting Method in amortized analysis is also known as:",
    options: ["Banker's Paradigm", "Potential Method", "Aggregate Method", "Master Theorem"],
    correctIndex: 0,
    explanation: "The Accounting (Banker's) Method assigns credits to cheap operations to pay for expensive ones later."
  },
  {
    question: "O(n!) time complexity typically arises from:",
    options: ["Sorting algorithms", "Generating all permutations", "Hashing", "BFS traversal"],
    correctIndex: 1,
    explanation: "Generating all permutations of n elements requires O(n!) time since there are n! permutations."
  },
  {
    question: "If an algorithm is both O(n) and Ω(n), it is:",
    options: ["Θ(n)", "Impossible", "Only recursive", "Only in Java"],
    correctIndex: 0,
    explanation: "If f(n) = O(n) and f(n) = Ω(n), then f(n) = Θ(n) - a tight bound."
  },
  {
    question: "What does 'asymptotic' mean in algorithm analysis?",
    options: ["Behavior for small n", "Behavior as n approaches infinity", "Average case behavior", "Memory usage"],
    correctIndex: 1,
    explanation: "Asymptotic analysis studies algorithm behavior as input size n approaches infinity."
  },
  {
    question: "The Halting Problem is:",
    options: ["In P", "In NP", "NP-Complete", "Undecidable"],
    correctIndex: 3,
    explanation: "The Halting Problem is undecidable - no algorithm can determine whether an arbitrary program halts."
  },
  {
    question: "Why do we drop constants in Big-O notation?",
    options: ["They don't matter at all", "Hardware differences make them irrelevant asymptotically", "Mathematical limits require it", "Constants are always 1"],
    correctIndex: 1,
    explanation: "Constants are dropped because hardware differences make them irrelevant for asymptotic analysis - we focus on growth rates."
  },
  {
    question: "Fibonacci Heap operations are analyzed using:",
    options: ["Aggregate analysis", "Amortized analysis", "Worst-case analysis", "Best-case analysis"],
    correctIndex: 1,
    explanation: "Fibonacci Heap achieves O(1) amortized time for insert and decrease-key operations."
  },
  {
    question: "Big-Theta (Θ) notation represents:",
    options: ["Upper bound only", "Lower bound only", "Tight bound", "Loose bound"],
    correctIndex: 2,
    explanation: "Big-Theta provides a tight bound - the function grows at exactly the same rate (within constant factors)."
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
    explanation: "Binary search halves the search space each iteration, giving O(log n) time complexity."
  },
  {
    question: "Which sorting algorithm has O(n²) worst-case time?",
    options: ["Merge Sort", "Quick Sort (worst case)", "Heap Sort", "All of the above"],
    correctIndex: 1,
    explanation: "Quick Sort has O(n²) worst-case (when pivot is always smallest/largest), though average case is O(n log n)."
  },
  {
    question: "The recurrence T(n) = 2T(n/2) + O(n) solves to:",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctIndex: 1,
    explanation: "By Master Theorem: a=2, b=2, d=1. Since log₂(2) = 1 = d, Case 2 applies: O(n^d log n) = O(n log n)."
  },
  {
    question: "What is the space complexity of recursive merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 2,
    explanation: "Merge sort requires O(n) auxiliary space for the merge operation, plus O(log n) stack space = O(n) total."
  },
  {
    question: "Which data structure provides O(1) average-case lookup?",
    options: ["Array", "Binary Search Tree", "Hash Table", "Linked List"],
    correctIndex: 2,
    explanation: "Hash tables provide O(1) average-case lookup, insertion, and deletion."
  },
  {
    question: "In the Master Theorem, if d < log_b(a), the complexity is:",
    options: ["O(n^d)", "O(n^d log n)", "O(n^log_b(a))", "O(a^n)"],
    correctIndex: 2,
    explanation: "Case 1 of Master Theorem: if d < log_b(a), then T(n) = Θ(n^log_b(a))."
  },
  {
    question: "What is the time complexity of accessing an array element by index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 0,
    explanation: "Array access by index is O(1) - constant time regardless of array size."
  },
  {
    question: "Which algorithm has the best worst-case time complexity for comparison-based sorting?",
    options: ["Bubble Sort O(n²)", "Quick Sort O(n²)", "Merge Sort O(n log n)", "Insertion Sort O(n²)"],
    correctIndex: 2,
    explanation: "Merge Sort has O(n log n) worst-case, which is optimal for comparison-based sorting (proven lower bound)."
  },
  {
    question: "What does 'amortized O(1)' mean for a hash table insert?",
    options: ["Always takes constant time", "Average over sequence is constant", "Best case is constant", "Worst case is constant"],
    correctIndex: 1,
    explanation: "Amortized O(1) means that over a sequence of operations, the average cost per operation is O(1), even if some individual operations are expensive."
  },
  {
    question: "The time complexity of Dijkstra's algorithm with a binary heap is:",
    options: ["O(V²)", "O(E log V)", "O((V+E) log V)", "O(V log V)"],
    correctIndex: 2,
    explanation: "Dijkstra's with binary heap: O((V+E) log V) - each vertex extracted once (V log V) and each edge relaxed (E log V)."
  },
  {
    question: "Which is NOT a valid reason to prefer O(n²) over O(n log n)?",
    options: ["Simpler implementation", "Better for small n", "Better constants", "Always faster for any n"],
    correctIndex: 3,
    explanation: "O(n²) is NOT always faster - for large n, O(n log n) will always dominate regardless of constants."
  },
  {
    question: "What is the space complexity of iterative binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 0,
    explanation: "Iterative binary search uses O(1) space - only a few variables (left, right, mid)."
  },
  {
    question: "In Big-O notation, which grows faster?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
    correctIndex: 3,
    explanation: "Exponential O(2^n) grows much faster than polynomial complexities like O(n), O(n log n), or O(n²)."
  },
  {
    question: "What is the time complexity of BFS on a graph?",
    options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
    correctIndex: 2,
    explanation: "BFS visits each vertex once and traverses each edge once, giving O(V + E) time complexity."
  },
  {
    question: "Which statement about P and NP is true?",
    options: ["P ⊆ NP", "NP ⊆ P", "P = NP (proven)", "P ∩ NP = ∅"],
    correctIndex: 0,
    explanation: "P ⊆ NP is true - any problem solvable in polynomial time can also be verified in polynomial time."
  },
  {
    question: "The recurrence for naive Fibonacci is:",
    options: ["T(n) = T(n-1) + O(1)", "T(n) = 2T(n-1) + O(1)", "T(n) = T(n-1) + T(n-2) + O(1)", "T(n) = T(n/2) + O(1)"],
    correctIndex: 2,
    explanation: "Naive Fibonacci: T(n) = T(n-1) + T(n-2) + O(1), which solves to O(2^n)."
  },
  {
    question: "What is the best-case time complexity of bubble sort?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
    correctIndex: 2,
    explanation: "Bubble sort has O(n) best-case when the array is already sorted (with optimization to detect no swaps)."
  },
  {
    question: "Which complexity class contains the hardest problems in NP?",
    options: ["P", "NP", "NP-Hard", "NP-Complete"],
    correctIndex: 3,
    explanation: "NP-Complete problems are the hardest problems in NP - if any NP-Complete problem has a polynomial solution, then P = NP."
  },
  {
    question: "What is the time complexity of building a heap from an array?",
    options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Building a heap can be done in O(n) time using bottom-up heapify, not O(n log n) as commonly mistaken."
  },
  {
    question: "In the Potential Method, if potential increases, we:",
    options: ["Spend saved energy", "Save energy for future operations", "Pay extra immediately", "Ignore it"],
    correctIndex: 1,
    explanation: "When potential increases (Φ(D_i) > Φ(D_{i-1})), we 'save' energy (pay extra) for future expensive operations."
  }
];