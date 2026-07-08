export const quizData = [
  {
    question: "Amortized time complexity of pushing to an array-based Stack?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 0,
    explanation: "Occasional resizing is averaged out over many $O(1)$ pushes."
  },
  {
    question: "Amortized time complexity of dequeueing from a 2-stack Queue?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 0,
    explanation: "Each element is moved from stack 1 to stack 2 exactly once."
  },
  {
    question: "Condition for a Circular Queue being full?",
    options: ["rear == capacity", "front == rear", "(rear + 1) % capacity == front", "size == 0"],
    correctIndex: 2,
    explanation: "We sacrifice one slot to distinguish between full and empty states."
  },
  {
    question: "Time complexity of finding the max in a sliding window using a Monotonic Deque?",
    options: ["$O(n \\log k)$", "$O(n \\cdot k)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Each element is added and removed from the deque at most once."
  },
  {
    question: "Time complexity of extracting the minimum from a Priority Queue?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n \\log n)$"],
    correctIndex: 1,
    explanation: "It requires removing the root and heapifying the remaining elements."
  },
  {
    question: "Infix to Postfix conversion relies on which data structure?",
    options: ["Queue", "Stack", "Tree", "HashMap"],
    correctIndex: 1,
    explanation: "Operators are pushed to a stack and popped based on precedence."
  },
  {
    question: "Checking for balanced parentheses uses?",
    options: ["Queue", "Stack", "Deque", "Priority Queue"],
    correctIndex: 1,
    explanation: "Opening brackets are pushed, and closing brackets pop and match."
  },
  {
    question: "Breadth-First Search (BFS) fundamentally uses?",
    options: ["Stack", "Queue", "Priority Queue", "Hash Set"],
    correctIndex: 1,
    explanation: "A queue ensures nodes are explored level by level."
  },
  {
    question: "Depth-First Search (DFS) fundamentally uses?",
    options: ["Queue", "Stack (or Recursion)", "Priority Queue", "Array"],
    correctIndex: 1,
    explanation: "A stack (LIFO) ensures we explore as deep as possible before backtracking."
  },
  {
    question: "A Deque (Double-Ended Queue) allows?",
    options: ["Insertion/deletion at both ends", "Only priority-based access", "O(1) random access", "Automatic sorting"],
    correctIndex: 0,
    explanation: "It combines the capabilities of both stacks and queues."
  },
  {
    question: "In an array-based Min-Heap, the left child of index $i$ is?",
    options: ["$2i$", "$2i + 1$", "$2i - 1$", "$i/2$"],
    correctIndex: 1,
    explanation: "This mathematical mapping allows tree traversal without pointers."
  },
  {
    question: "The defining property of a Max-Heap is?",
    options: ["Left child < Right child", "Parent >= Children", "Array is fully sorted", "All leaves are at the same depth"],
    correctIndex: 1,
    explanation: "Every parent node is greater than or equal to its children."
  },
  {
    question: "Stack underflow occurs when?",
    options: ["Pushing to a full stack", "Popping from an empty stack", "Peeking at a null value", "Resizing the array"],
    correctIndex: 1,
    explanation: "There are no elements to remove."
  },
  {
    question: "Overflow in a Circular Queue happens when?",
    options: ["rear reaches the end of the array", "size equals capacity", "front equals rear", "The array is full of nulls"],
    correctIndex: 1,
    explanation: "The logical size has reached the physical capacity."
  },
  {
    question: "LIFO stands for?",
    options: ["Last In First Out", "Last In Final Out", "Linear In Fast Out", "Least In First Out"],
    correctIndex: 0,
    explanation: "The fundamental principle of a Stack."
  },
];
