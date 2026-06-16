export const quizData = [
  {
    question: "What are the two main phases of the Heap Sort algorithm?",
    options: ["Divide and Conquer.", "Build Max-Heap, then repeatedly extract the maximum.", "Partition around a pivot, then recursively sort.", "Merge sorted halves, then copy back."],
    correctIndex: 1,
    explanation: "Heap Sort first builds a Max-Heap from the unsorted array, then repeatedly swaps the root with the last element and sifts down."
  },
  {
    question: "What is the time complexity of Phase 1 (Building the Max-Heap) in Heap Sort?",
    options: ["$O(n \\log n)$", "$O(n)$", "$O(n^2)$", "$O(1)$"],
    correctIndex: 1,
    explanation: "Using Floyd's Bottom-Up Heapify, building the heap takes linear time $O(n)$."
  },
  {
    question: "What is the time complexity of Phase 2 (Extracting all elements) in Heap Sort?",
    options: ["$O(n)$", "$O(n \\log n)$", "$O(n^2)$", "$O(\\log n)$"],
    correctIndex: 1,
    explanation: "We perform $n-1$ extractions. Each extraction takes $O(\\log n)$ time for the `siftDown` operation, totaling $O(n \\log n)$."
  },
  {
    question: "What is the worst-case time complexity of Heap Sort?",
    options: ["$O(n)$", "$O(n \\log n)$", "$O(n^2)$", "$O(n^2 \\log n)$"],
    correctIndex: 1,
    explanation: "Unlike Quick Sort, Heap Sort guarantees $O(n \\log n)$ time complexity even in the worst case."
  },
  {
    question: "What is the auxiliary space complexity of Heap Sort?",
    options: ["$O(n)$", "$O(\\log n)$", "$O(1)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "Heap Sort operates directly on the input array, requiring no auxiliary arrays. It is an in-place sorting algorithm with $O(1)$ auxiliary space."
  },
  {
    question: "During Phase 2 of Heap Sort, where is the maximum element always located?",
    options: ["At the last index of the array.", "At the root of the heap (index 0).", "In the left child of the root.", "Randomly distributed."],
    correctIndex: 1,
    explanation: "By the Max-Heap property, the largest element is always at the root ($A[0]$)."
  },
  {
    question: "What operation is performed immediately after swapping the root with the last element of the heap?",
    options: ["`siftUp` on the last element.", "`siftDown` on the new root.", "Reduce the heap size and do nothing else.", "Rebuild the entire heap from scratch."],
    correctIndex: 1,
    explanation: "After the swap, the new root likely violates the Max-Heap property. We must call `siftDown` on the root to restore it."
  },
  {
    question: "How does Heap Sort achieve $O(1)$ auxiliary space when extracting elements?",
    options: ["It uses a linked list instead of an array.", "It reuses the vacated space at the end of the array to store the extracted maximums.", "It compresses the array using a hash function.", "It relies on the JVM garbage collector."],
    correctIndex: 1,
    explanation: "As the heap size shrinks from the right, the extracted maximums are placed in that exact vacated space, sorting the array in place."
  },
  {
    question: "Heap Sort is mathematically equivalent to which of the following processes?",
    options: ["Inserting all elements into a Binary Search Tree and doing an in-order traversal.", "Inserting all elements into a Priority Queue (Max-Heap) and extracting them one by one.", "Partitioning the array around a median and recursively sorting.", "Merging adjacent pairs of elements until one list remains."],
    correctIndex: 1,
    explanation: "Heap Sort is literally the application of a Priority Queue: build the PQ, then extract the max $n$ times."
  },
  {
    question: "How does Heap Sort optimize the standard Priority Queue insertion phase?",
    options: ["It uses Insertion Sort for small subarrays.", "It uses Floyd's $O(n)$ bottom-up heapify instead of $n$ individual $O(\\log n)$ insertions.", "It skips the insertion phase entirely.", "It uses a Min-Heap instead of a Max-Heap."],
    correctIndex: 1,
    explanation: "Standard PQ insertion takes $O(n \\log n)$. Heap Sort uses Floyd's algorithm to build the heap in $O(n)$ time, saving a logarithmic factor."
  },
  {
    question: "Is Heap Sort a stable sorting algorithm?",
    options: ["Yes, it preserves the relative order of equal elements.", "No, the long-distance swaps during `siftDown` can disrupt the order of equal elements.", "Yes, but only if implemented recursively.", "No, because it uses a Priority Queue."],
    correctIndex: 1,
    explanation: "Heap Sort is unstable. Swapping the root with the last element can move an element across the entire array, breaking the relative order of equal keys."
  },
  {
    question: "Which of the following sorting algorithms has the best cache locality?",
    options: ["Heap Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
    correctIndex: 2,
    explanation: "Quick Sort accesses memory sequentially during partitioning. Heap Sort's `siftDown` jumps around the tree (indices $i, 2i, 4i$), causing frequent cache misses."
  },
  {
    question: "Which sorting algorithm guarantees $O(n \\log n)$ worst-case time AND $O(1)$ auxiliary space?",
    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Tim Sort"],
    correctIndex: 2,
    explanation: "Heap Sort is the only standard comparison sort that guarantees $O(n \\log n)$ time and $O(1)$ space. Merge Sort requires $O(n)$ space; Quick Sort has $O(n^2)$ worst-case time."
  },
  {
    question: "What happens to the heap size during each iteration of Phase 2 in Heap Sort?",
    options: ["It doubles.", "It remains constant.", "It decreases by 1.", "It decreases by $\\log n$."],
    correctIndex: 2,
    explanation: "In each iteration, the maximum element is moved to the sorted portion, and the logical heap size is reduced by 1."
  },
  {
    question: "Why is Heap Sort often preferred over Quick Sort in embedded systems or real-time systems?",
    options: ["Because it is faster on average.", "Because it has better cache locality.", "Because it guarantees $O(n \\log n)$ worst-case execution time, preventing timing failures.", "Because it uses less code."],
    correctIndex: 2,
    explanation: "Real-time systems require strict worst-case guarantees. Quick Sort's $O(n^2)$ worst case is unacceptable, whereas Heap Sort guarantees $O(n \\log n)$."
  }
];