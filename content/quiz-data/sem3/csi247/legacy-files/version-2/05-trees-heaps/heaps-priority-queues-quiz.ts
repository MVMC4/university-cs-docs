export const quizData = [
  {
    question: "In an array-based heap, if a node is at index $i$, where is its left child?",
    options: [
      "$2i$",
      "$2i + 1$",
      "$2i + 2$",
      "$i / 2$"
    ],
    correctIndex: 1,
    explanation: "For 0-indexed arrays, the left child is at $2i + 1$ and the right child is at $2i + 2$."
  },
  {
    question: "What is the time complexity of inserting an element into a heap of size $n$?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 1,
    explanation: "Insertion involves adding to the end and sifting up, which takes time proportional to the height of the tree, $O(\\log n)$."
  },
  {
    question: "What is the time complexity of extracting the minimum element from a Min-Heap?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 1,
    explanation: "Extraction involves removing the root, moving the last element to the root, and sifting down, which takes $O(\\log n)$."
  },
  {
    question: "What is the time complexity of building a heap from an unsorted array using Floyd's algorithm?",
    options: [
      "$O(n \\log n)$",
      "$O(n)$",
      "$O(n^2)$",
      "$O(\\log n)$"
    ],
    correctIndex: 1,
    explanation: "Floyd's Bottom-Up Heapify runs in linear time $O(n)$ because most nodes are near the leaves and require little work to sift down."
  },
  {
    question: "In a Max-Heap, where is the largest element located?",
    options: [
      "At the last index of the array.",
      "At the root (index 0).",
      "In the left child of the root.",
      "Randomly distributed."
    ],
    correctIndex: 1,
    explanation: "The Max-Heap property ensures the parent is always greater than or equal to its children, so the maximum is always at the root."
  },
  {
    question: "What operation is used to restore the heap property after inserting a new element?",
    options: [
      "SiftDown",
      "SiftUp (or BubbleUp)",
      "Rotate",
      "Rehash"
    ],
    correctIndex: 1,
    explanation: "New elements are added at the bottom. SiftUp swaps the element with its parent until the heap property is restored."
  },
  {
    question: "What operation is used to restore the heap property after extracting the root?",
    options: [
      "SiftDown (or BubbleDown)",
      "SiftUp",
      "Rotate",
      "Rehash"
    ],
    correctIndex: 0,
    explanation: "The last element is moved to the root. SiftDown swaps it with the larger (in Max-Heap) or smaller (in Min-Heap) child until the property is restored."
  },
  {
    question: "Why is Floyd's Heapify $O(n)$ instead of $O(n \\log n)$?",
    options: [
      "Because it uses recursion.",
      "Because most nodes are near the leaves and have small height, so the sum of work is linear.",
      "Because it sorts the array first.",
      "Because it uses a hash table."
    ],
    correctIndex: 1,
    explanation: "The work done at each node is proportional to its height. There are many nodes with height 0 (leaves), fewer with height 1, etc. The summation converges to a linear function."
  },
  {
    question: "In a Min-Heap, what is the relationship between a parent $P$ and its child $C$?",
    options: [
      "$P \\ge C$",
      "$P \\le C$",
      "$P = C$",
      "$P < C$ (strictly)"
    ],
    correctIndex: 1,
    explanation: "In a Min-Heap, the parent is always less than or equal to its children."
  },
  {
    question: "What is the index of the parent of a node at index $i$ (0-indexed)?",
    options: [
      "$2i$",
      "$2i + 1$",
      "$\\lfloor (i-1) / 2 \\rfloor$",
      "$i - 1$"
    ],
    correctIndex: 2,
    explanation: "The parent index is calculated by reversing the child formula: $\\lfloor (i-1) / 2 \\rfloor$."
  },
  {
    question: "Which data structure is best suited for implementing a Priority Queue?",
    options: [
      "Array",
      "Linked List",
      "Binary Heap",
      "Hash Table"
    ],
    correctIndex: 2,
    explanation: "Binary Heaps provide $O(\\log n)$ insertion and extraction of the minimum/maximum, which are the core operations of a Priority Queue."
  },
  {
    question: "If you insert elements 1, 2, 3, 4, 5 into a Min-Heap in that order, what is the root?",
    options: [
      "1",
      "2",
      "3",
      "5"
    ],
    correctIndex: 0,
    explanation: "1 is the smallest element. In a Min-Heap, the smallest element is always at the root."
  },
  {
    question: "What is the space complexity of a heap with $n$ elements?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "A heap stores all $n$ elements in an array, requiring linear space."
  },
  {
    question: "In Floyd's algorithm, in what order are nodes processed for sifting down?",
    options: [
      "From root to leaves.",
      "From leaves to root.",
      "From the last non-leaf node up to the root.",
      "Randomly."
    ],
    correctIndex: 2,
    explanation: "We start at the last parent (index $\\lfloor n/2 \\rfloor - 1$) and move backwards to the root (index 0), sifting down each node."
  },
  {
    question: "Can a heap be used to sort an array?",
    options: [
      "No, heaps are only for priority queues.",
      "Yes, using Heap Sort, which takes $O(n \\log n)$ time.",
      "Yes, but it takes $O(n^2)$ time.",
      "Yes, but only for sorted arrays."
    ],
    correctIndex: 1,
    explanation: "Heap Sort builds a heap ($O(n)$) and then repeatedly extracts the root ($n \\times O(\\log n)$), resulting in $O(n \\log n)$ sorting."
  }
];