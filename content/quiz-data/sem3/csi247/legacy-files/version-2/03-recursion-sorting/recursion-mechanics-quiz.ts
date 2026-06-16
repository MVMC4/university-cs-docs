export const quizData = [
  {
    question: "What is the space complexity of a recursive algorithm with maximum recursion depth $h$?",
    options: [
      "$O(1)$",
      "$O(h)$",
      "$O(n)$",
      "$O(n \log n)$"
    ],
    correctIndex: 1,
    explanation: "Each recursive call adds an activation record to the call stack. The maximum space used is proportional to the maximum depth $h$ of the recursion tree."
  },
  {
    question: "What defines a 'tail-recursive' function?",
    options: [
      "It calls itself multiple times.",
      "The recursive call is the very last operation performed, with no pending operations upon return.",
      "It has a base case that returns a constant.",
      "It uses a helper function with an accumulator."
    ],
    correctIndex: 1,
    explanation: "Tail recursion means the recursive call is the final action, allowing compilers with TCO to reuse the current stack frame."
  },
  {
    question: "Does the Java Virtual Machine (JVM) guarantee Tail Call Optimization (TCO)?",
    options: [
      "Yes, for all recursive methods.",
      "Yes, but only for methods returning void.",
      "No, tail-recursive Java methods still consume $O(h)$ stack space.",
      "No, but it converts them to iterative loops automatically."
    ],
    correctIndex: 2,
    explanation: "The JVM does not guarantee TCO, so deep tail-recursive calls in Java will still result in a `StackOverflowError`."
  },
  {
    question: "In structural induction, what is the 'Inductive Hypothesis'?",
    options: [
      "Proving the property holds for the base case.",
      "Assuming the property holds for all proper sub-structures.",
      "Proving the property holds for the constructed structure.",
      "Assuming the property holds for all structures of size $n+1$."
    ],
    correctIndex: 1,
    explanation: "The inductive hypothesis assumes the property is true for the smaller, recursive sub-structures, which is then used to prove it for the larger structure."
  },
  {
    question: "What does an activation record (stack frame) typically contain?",
    options: [
      "Only the return address.",
      "Return address, parameters, local variables, and control link.",
      "The entire source code of the function.",
      "Global variables and heap-allocated objects."
    ],
    correctIndex: 1,
    explanation: "An activation record contains all the execution context needed for a specific function call, including parameters, locals, and the return address."
  },
  {
    question: "In the structural induction proof of $\text{length}(xs \text{ ++ } ys) = \text{length}(xs) + \text{length}(ys)$, what is the base case?",
    options: [
      "$xs = [x]$",
      "$xs = []$",
      "$ys = []$",
      "$xs = ys$"
    ],
    correctIndex: 1,
    explanation: "The base case for list induction is typically the empty list $[]$, as it is the simplest structure."
  },
  {
    question: "Why is the recurrence $T(n) = 2T(n/2) + n$ associated with $O(n \log n)$ space in some naive implementations?",
    options: [
      "Because the call stack depth is $O(n)$.",
      "Because it creates new arrays of size $n$ at each level (e.g., naive Merge Sort), totaling $O(n \log n)$ or $O(n)$ depending on implementation.",
      "Because it makes $2^n$ calls.",
      "Because the base case requires $O(n)$ space."
    ],
    correctIndex: 1,
    explanation: "While the call stack depth is $O(\log n)$, if each level allocates a new array of size proportional to $n$, the total space can be higher. (Optimal Merge Sort uses $O(n)$ auxiliary space)."
  },
  {
    question: "What is the primary risk of deep recursion in languages without TCO?",
    options: [
      "Heap pollution",
      "StackOverflowError",
      "Type erasure",
      "Deadlock"
    ],
    correctIndex: 1,
    explanation: "Without TCO, each recursive call consumes stack memory. Deep recursion exhausts the fixed-size call stack, throwing a `StackOverflowError`."
  },
  {
    question: "Which of the following is a valid application of structural induction?",
    options: [
      "Proving the correctness of a `for` loop.",
      "Proving properties of recursively defined data structures like Binary Trees or Linked Lists.",
      "Proving the time complexity of an iterative algorithm.",
      "Proving that a hash function is uniform."
    ],
    correctIndex: 1,
    explanation: "Structural induction is specifically designed for recursively defined structures, mirroring their base cases and recursive construction steps."
  },
  {
    question: "In the inductive step of proving a property for a Binary Search Tree, what do you assume?",
    options: [
      "The property holds for the root node only.",
      "The property holds for the left and right subtrees (Inductive Hypothesis).",
      "The tree is perfectly balanced.",
      "The property holds for all trees of height $h+1$."
    ],
    correctIndex: 1,
    explanation: "The inductive hypothesis assumes the property holds for the recursive sub-structures (the left and right subtrees), which is then used to prove it for the parent node."
  },
  {
    question: "What is the time complexity of resolving a single inversion in Insertion Sort?",
    options: [
      "$O(1)$",
      "$O(\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 0,
    explanation: "Resolving a single inversion requires a single adjacent swap or shift, which is an $O(1)$ operation. The total time is $O(n + I)$, where $I$ is the number of inversions."
  },
  {
    question: "If an array is already sorted, how many inversions does it have?",
    options: [
      "$0$",
      "$1$",
      "$n$",
      "$n(n-1)/2$"
    ],
    correctIndex: 0,
    explanation: "An inversion is a pair $(i, j)$ where $i < j$ but $A[i] > A[j]$. In a sorted array, no such pairs exist, so $I = 0$."
  },
  {
    question: "What is the maximum number of inversions in an array of size $n$?",
    options: [
      "$n$",
      "$n \log n$",
      "$n(n-1)/2$",
      "$n^2$"
    ],
    correctIndex: 2,
    explanation: "The maximum number of inversions occurs when the array is sorted in reverse order, yielding $n(n-1)/2$ inversions."
  },
  {
    question: "How does the number of inversions relate to the number of adjacent swaps needed to sort an array?",
    options: [
      "They are unrelated.",
      "The number of adjacent swaps is exactly equal to the number of inversions.",
      "The number of swaps is the square root of the inversions.",
      "The number of swaps is always less than the inversions."
    ],
    correctIndex: 1,
    explanation: "Each adjacent swap can resolve at most one inversion. Therefore, the minimum number of adjacent swaps required to sort the array is exactly $I$."
  },
  {
    question: "Why is proving $P(x:xs)$ using $P(xs)$ valid in structural induction?",
    options: [
      "Because $x:xs$ is smaller than $xs$.",
      "Because $xs$ is a proper sub-structure of $x:xs$, and the inductive hypothesis applies to all proper sub-structures.",
      "Because $x$ is the base case.",
      "Because lists are immutable."
    ],
    correctIndex: 1,
    explanation: "Structural induction relies on the fact that the recursive step builds the structure from strictly smaller, well-founded sub-structures."
  }
];