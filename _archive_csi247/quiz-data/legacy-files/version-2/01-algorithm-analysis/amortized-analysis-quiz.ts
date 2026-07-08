export const quizData = [
  {
    question: "What is the primary purpose of Amortized Analysis?",
    options: [
      "To find the best-case scenario of an algorithm.",
      "To guarantee the average performance of each operation in the worst case, over a sequence of operations.",
      "To calculate the exact runtime in seconds.",
      "To prove that an algorithm is $O(1)$ in all cases."
    ],
    correctIndex: 1,
    explanation: "Amortized analysis looks at the total cost of a sequence of operations, showing that expensive operations are rare enough that the average cost per operation is low."
  },
  {
    question: "In the Aggregate Method, if $n$ operations take $T(n)$ total time, what is the amortized cost per operation?",
    options: [
      "$T(n)$",
      "$T(n) \\cdot n$",
      "$T(n) / n$",
      "$n / T(n)$"
    ],
    correctIndex: 2,
    explanation: "The Aggregate Method divides the total worst-case time $T(n)$ by the number of operations $n$ to find the average (amortized) cost per operation."
  },
  {
    question: "When does an `ArrayList` typically trigger a dynamic resize?",
    options: [
      "Every time an element is added.",
      "When the number of elements exceeds the current capacity.",
      "When the array is completely empty.",
      "When the garbage collector runs."
    ],
    correctIndex: 1,
    explanation: "An `ArrayList` resizes only when it runs out of space (size == capacity) during an insertion."
  },
  {
    question: "By what factor does Java's `ArrayList` typically increase its capacity when resizing?",
    options: [
      "1.5x",
      "2x",
      "3x",
      "10x"
    ],
    correctIndex: 1,
    explanation: "Standard `ArrayList` implementations double their capacity (oldCapacity * 2) to ensure the amortized cost of insertion remains $O(1)$."
  },
  {
    question: "In the Aggregate Method proof for `ArrayList` resizing, what mathematical series bounds the total copying cost?",
    options: [
      "Arithmetic series",
      "Harmonic series",
      "Geometric series",
      "Taylor series"
    ],
    correctIndex: 2,
    explanation: "The copying costs are $1 + 2 + 4 + 8 + \\dots + N$, which is a geometric series that sums to $< 2N$."
  },
  {
    question: "What is the amortized time complexity of adding an element to an `ArrayList`?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 0,
    explanation: "Although resizing takes $O(n)$, it happens so rarely that the amortized cost per insertion is strictly $O(1)$."
  },
  {
    question: "What is the WORST-CASE time complexity of a single `ArrayList.add()` operation?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 2,
    explanation: "If the array is full, the single insertion triggers a resize, requiring an $O(n)$ loop to copy all existing elements to the new array."
  },
  {
    question: "Why is `ArrayList.remove(int index)` considered $O(n)$ worst-case?",
    options: [
      "Because it has to resize the array.",
      "Because it must shift all subsequent elements to the left to fill the gap.",
      "Because it uses a recursive algorithm.",
      "Because it has to search for the element first."
    ],
    correctIndex: 1,
    explanation: "Removing an element from the middle requires an $O(n)$ loop (`System.arraycopy`) to shift elements left and maintain contiguous memory."
  },
  {
    question: "If you remove the element at `index = 0` from an `ArrayList` of size $n$, how many elements are shifted?",
    options: [
      "$0$",
      "$1$",
      "$n/2$",
      "$n-1$"
    ],
    correctIndex: 3,
    explanation: "Removing the first element requires shifting every other element in the list one position to the left, which is $n-1$ elements."
  },
  {
    question: "How does `LinkedList.remove(Node)` compare to `ArrayList.remove(int index)`?",
    options: [
      "`LinkedList` is $O(n)$, `ArrayList` is $O(1)$.",
      "`LinkedList` is $O(1)$ if you have the node reference, `ArrayList` is $O(n)$.",
      "Both are $O(1)$.",
      "Both are $O(n)$."
    ],
    correctIndex: 1,
    explanation: "If you already have the pointer to the node, `LinkedList` can unlink it in $O(1)$. `ArrayList` must always shift elements, taking $O(n)$."
  },
  {
    question: "What is the time complexity of `Stack.push()` and `Stack.pop()` using an underlying array?",
    options: [
      "$O(n)$",
      "$O(\\log n)$",
      "$O(1)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Stack operations only involve updating the `top` pointer and accessing an array index, which requires no loops and is strictly $O(1)$."
  },
  {
    question: "What is the main difference between Worst-Case Analysis and Amortized Analysis?",
    options: [
      "Worst-case looks at a single operation; amortized looks at a sequence of operations.",
      "Worst-case is for loops; amortized is for recursion.",
      "Worst-case is an upper bound; amortized is a lower bound.",
      "There is no difference."
    ],
    correctIndex: 0,
    explanation: "Worst-case guarantees the maximum cost of *one* operation. Amortized guarantees the average cost over *many* operations, allowing some to be expensive."
  },
  {
    question: "In the Aggregate Method proof, what is the total time $T(N)$ for $N$ insertions into a doubling `ArrayList`?",
    options: [
      "$N$",
      "$N \\log N$",
      "$3N$ (or $O(N)$)",
      "$N^2$"
    ],
    correctIndex: 2,
    explanation: "The $N$ basic insertions take $N$ time. The resizing copies take $< 2N$ time. Total time is $\\le 3N = O(N)$."
  },
  {
    question: "Which data structure suffers from $O(n)$ worst-case insertion due to shifting elements?",
    options: [
      "LinkedList",
      "Stack (using linked list)",
      "ArrayList (inserting at index 0)",
      "Queue (using linked list)"
    ],
    correctIndex: 2,
    explanation: "Inserting at the beginning of an `ArrayList` requires shifting all $n$ existing elements one position to the right."
  },
  {
    question: "Why do we use the Aggregate Method instead of just saying 'resizing is $O(n)$'?",
    options: [
      "Because $O(n)$ is mathematically incorrect.",
      "Because it proves that the expensive $O(n)$ resize is paid for by the many cheap $O(1)$ inserts, yielding an average of $O(1)$.",
      "Because the Aggregate Method is required by Java.",
      "Because it makes the algorithm run faster."
    ],
    correctIndex: 1,
    explanation: "Amortized analysis shows that the 'debt' of the $O(n)$ copy is spread out over the previous $n$ insertions, making the data structure highly efficient in practice."
  }
];