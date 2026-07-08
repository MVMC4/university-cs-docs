export const quizData = [
  {
    question: "What is a Deque (Double-Ended Queue)?",
    options: [
      "A queue that only allows insertion at the front.",
      "A linear structure that allows insertion and deletion at BOTH the front and the rear.",
      "A queue that sorts its elements automatically.",
      "A stack that can be accessed from the middle."
    ],
    correctIndex: 1,
    explanation: "A deque generalizes both stacks and queues by allowing $O(1)$ add/remove operations at both ends."
  },
  {
    question: "What is the time complexity of `addFirst` and `removeLast` in a standard Deque implementation?",
    options: [
      "$O(n)$",
      "$O(\\log n)$",
      "$O(1)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Using a doubly linked list with sentinels or a circular array, all four end-operations take constant time."
  },
  {
    question: "What is a 'Monotonic Deque'?",
    options: [
      "A deque that only stores integers.",
      "A deque that maintains its elements in strictly increasing or decreasing order of their values.",
      "A deque that cannot be modified after creation.",
      "A deque that uses a single pointer."
    ],
    correctIndex: 1,
    explanation: "A monotonic deque enforces an invariant where elements are ordered, allowing efficient tracking of extremums (min/max) in a sliding window."
  },
  {
    question: "What classic algorithmic problem is solved optimally using a Monotonic Deque?",
    options: [
      "Binary Search",
      "Sliding Window Maximum",
      "Dijkstra's Shortest Path",
      "Merge Sort"
    ],
    correctIndex: 1,
    explanation: "A monotonic decreasing deque can find the maximum element in every sliding window of size $k$ in $O(n)$ total time."
  },
  {
    question: "In the Sliding Window Maximum algorithm, what does the deque store?",
    options: [
      "The actual values of the elements.",
      "The indices of the elements.",
      "The pointers to the nodes.",
      "The sum of the window."
    ],
    correctIndex: 1,
    explanation: "Storing indices allows the algorithm to easily check if an element has fallen out of the sliding window bounds (e.g., `index <= i - k`)."
  },
  {
    question: "Why does the Sliding Window Maximum algorithm achieve $O(n)$ time complexity despite having a nested `while` loop?",
    options: [
      "Because the array is sorted.",
      "Because each element is added to the deque exactly once and removed at most once, making the total operations bounded by $2n$.",
      "Because the window size is constant.",
      "Because it uses recursion."
    ],
    correctIndex: 1,
    explanation: "Amortized analysis shows that the inner loop's total executions across the entire algorithm cannot exceed $n$, resulting in $O(n)$ time."
  },
  {
    question: "What is a Priority Queue?",
    options: [
      "A standard FIFO queue.",
      "A queue where elements are dequeued based on their priority rather than their arrival order.",
      "A stack that sorts elements.",
      "A deque that only allows insertion at the rear."
    ],
    correctIndex: 1,
    explanation: "A priority queue abstracts the concept of 'most important first', commonly implemented using heaps."
  },
  {
    question: "What is the most efficient underlying data structure for implementing a Priority Queue?",
    options: [
      "Sorted Array",
      "Linked List",
      "Binary Heap",
      "Binary Search Tree"
    ],
    correctIndex: 2,
    explanation: "A Binary Heap provides $O(\\log n)$ insertion and extraction, and $O(1)$ peek, which is optimal for priority queue operations."
  },
  {
    question: "What is the time complexity of inserting an element into a Binary Heap?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 1,
    explanation: "Insertion involves adding to the bottom and 'sifting up' to maintain the heap property, which takes time proportional to the height of the tree, $O(\\log n)$."
  },
  {
    question: "What is the time complexity of extracting the minimum (or maximum) element from a Binary Heap?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 1,
    explanation: "Extracting the root requires moving the last element to the root and 'sifting down', taking $O(\\log n)$ time."
  },
  {
    question: "What is the time complexity of peeking at the minimum element in a Min-Heap?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 0,
    explanation: "The minimum element is always at the root (index 0) of the heap, allowing $O(1)$ access."
  },
  {
    question: "In a Monotonic Deque used for Sliding Window Maximum, what condition triggers the removal of elements from the REAR of the deque?",
    options: [
      "When the element at the rear is greater than the incoming element.",
      "When the element at the rear is less than or equal to the incoming element.",
      "When the window size is exceeded.",
      "When the deque is full."
    ],
    correctIndex: 1,
    explanation: "If an existing element is smaller than the new incoming element, it can never be the maximum as long as the new element is in the window, so it is safely discarded."
  },
  {
    question: "How is a Binary Heap typically stored in memory to avoid pointer overhead?",
    options: [
      "As a linked list.",
      "As a flat array, where children of node `i` are at `2i + 1` and `2i + 2`.",
      "As a tree of objects.",
      "As a hash table."
    ],
    correctIndex: 1,
    explanation: "The complete binary tree structure of a heap allows it to be mapped perfectly to an array using simple index arithmetic, eliminating the need for pointers."
  },
  {
    question: "What is the primary difference between a Min-Heap and a Max-Heap?",
    options: [
      "Min-Heaps are stored in arrays, Max-Heaps in linked lists.",
      "In a Min-Heap, every parent is less than or equal to its children; in a Max-Heap, every parent is greater than or equal to its children.",
      "Min-Heaps are for integers, Max-Heaps are for strings.",
      "There is no difference."
    ],
    correctIndex: 1,
    explanation: "The heap property dictates the ordering. Min-Heaps prioritize the smallest element at the root, while Max-Heaps prioritize the largest."
  },
  {
    question: "Which of the following problems is best solved using a standard Deque (not necessarily monotonic)?",
    options: [
      "Finding the shortest path in a weighted graph.",
      "Checking if a string is a palindrome by comparing characters from both ends.",
      "Sorting an array of integers.",
      "Evaluating a postfix expression."
    ],
    correctIndex: 1,
    explanation: "A deque allows adding characters to the back and removing from both front and back, making it easy to compare the first and last characters iteratively."
  }
];