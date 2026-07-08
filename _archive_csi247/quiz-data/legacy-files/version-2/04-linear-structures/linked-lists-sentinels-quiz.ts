export const quizData = [
  {
    question: "What is the primary advantage of an array-based linear structure over a linked structure?",
    options: [
      "Dynamic sizing without reallocation",
      "$O(1)$ random access and excellent CPU cache locality",
      "$O(1)$ insertion in the middle of the structure",
      "Lower memory overhead per element"
    ],
    correctIndex: 1,
    explanation: "Arrays provide contiguous memory allocation, enabling $O(1)$ index arithmetic and predictable memory prefetching by the CPU cache."
  },
  {
    question: "What is the time complexity of inserting an element into the middle of an array-based list of size $n$?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Inserting into the middle requires shifting all subsequent elements to the right by one position, which takes $O(n)$ time."
  },
  {
    question: "Why do linked lists suffer from poor CPU cache performance compared to arrays?",
    options: [
      "Because they use too much memory.",
      "Because their nodes are scattered across the heap, breaking spatial locality and causing cache misses.",
      "Because they require complex calculations to access elements.",
      "Because they are stored in contiguous memory."
    ],
    correctIndex: 1,
    explanation: "Linked list nodes are allocated dynamically on the heap, meaning their memory addresses are unpredictable and scattered, preventing the CPU cache from efficiently prefetching data."
  },
  {
    question: "What is the space overhead per node in a Doubly Linked List compared to a Singly Linked List?",
    options: [
      "It requires one additional pointer (to the previous node).",
      "It requires two additional pointers.",
      "It requires no additional pointers.",
      "It requires an additional integer to track the node index."
    ],
    correctIndex: 0,
    explanation: "A Singly Linked List has 1 pointer (`next`), while a Doubly Linked List has 2 pointers (`next` and `prev`), adding one pointer's worth of overhead per node."
  },
  {
    question: "What is the primary use case for a Circular Linked List?",
    options: [
      "Binary search",
      "Round-robin scheduling and continuous traversal without null checks",
      "Fast random access",
      "Sorting algorithms"
    ],
    correctIndex: 1,
    explanation: "Because the last node points back to the first, a circular list allows continuous traversal, making it ideal for round-robin algorithms where the end of the list seamlessly connects to the beginning."
  },
  {
    question: "What is a 'Sentinel Node' in the context of linked lists?",
    options: [
      "A node that stores the maximum value in the list.",
      "A dummy node that does not hold actual data, used to establish strict pointer invariants.",
      "A node that prevents the list from being modified.",
      "The first node containing actual data."
    ],
    correctIndex: 1,
    explanation: "Sentinel nodes (like dummy head/tail) act as placeholders that eliminate edge cases, ensuring pointers never become null during standard operations."
  },
  {
    question: "In a doubly linked list with dummy head and tail sentinels, what is the invariant for `head.next`?",
    options: [
      "It is always `null`.",
      "It is either the `tail` sentinel or the first data node.",
      "It is always the last data node.",
      "It points to the previous node."
    ],
    correctIndex: 1,
    explanation: "Because the `tail` sentinel is always present, `head.next` will never be `null`; it will point to `tail` if the list is empty, or the first data node otherwise."
  },
  {
    question: "What is the primary algorithmic benefit of using sentinel nodes?",
    options: [
      "It reduces the time complexity of search from $O(n)$ to $O(\\log n)$.",
      "It eliminates the need for conditional branches (null checks) during insertion and deletion, making the code uniform.",
      "It automatically sorts the list.",
      "It reduces the memory footprint of the list."
    ],
    correctIndex: 1,
    explanation: "Sentinels guarantee that every data node is sandwiched between two valid nodes, allowing insertion/deletion code to execute without checking for empty lists or boundary nodes."
  },
  {
    question: "What is the time complexity of deleting a node from a Doubly Linked List, given a direct pointer to that node?",
    options: [
      "$O(n)$",
      "$O(\\log n)$",
      "$O(1)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Given a pointer to the node, you can directly update its `prev` and `next` neighbors' pointers in constant time, bypassing the need to traverse the list."
  },
  {
    question: "Which of the following correctly describes the memory layout of an array?",
    options: [
      "Scattered heap allocations connected via pointers.",
      "Contiguous block of memory.",
      "A tree structure stored in random memory locations.",
      "A linked list with a fixed capacity."
    ],
    correctIndex: 1,
    explanation: "Arrays are allocated as a single, contiguous block of memory, which is why index arithmetic works and cache locality is high."
  },
  {
    question: "If a Singly Linked List does not use a tail pointer, what is the time complexity of appending an element to the end?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Without a tail pointer, the list must be traversed from the head to the last node to append the new element, taking $O(n)$ time."
  },
  {
    question: "What is the 'unusable space' problem in a simple array-based queue?",
    options: [
      "The array cannot store null values.",
      "As elements are dequeued, the front pointer advances, leaving empty slots at the beginning that cannot be reused by enqueue.",
      "The array automatically shrinks when empty.",
      "The queue requires double the memory of the data it stores."
    ],
    correctIndex: 1,
    explanation: "In a linear array queue, `dequeue` increments `front`. The slots before `front` are abandoned, eventually causing the queue to appear full even if it contains few elements."
  },
  {
    question: "How does a Circular Linked List determine the end of the list during traversal?",
    options: [
      "It checks for a `null` pointer.",
      "It checks if the current node's `next` pointer equals the `head` node.",
      "It uses a counter to track the number of nodes visited.",
      "It cannot be traversed; it is infinite."
    ],
    correctIndex: 1,
    explanation: "Because the last node points back to the head, traversal loops must check if `current.next == head` to know when a full cycle is complete."
  },
  {
    question: "What is the minimum number of pointer updates required to insert a node into a Doubly Linked List between two existing nodes `a` and `b`?",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    correctIndex: 2,
    explanation: "You must update the new node's `prev` and `next` (2 updates), and the neighbors' `next` and `prev` pointers (2 updates), totaling 4 pointer assignments."
  },
  {
    question: "Why might a developer choose a Linked List over an Array for a specific application?",
    options: [
      "When frequent random access by index is required.",
      "When the application requires frequent insertions and deletions in the middle of the structure, and the final size is unknown.",
      "When CPU cache locality is the highest priority.",
      "When memory overhead must be minimized."
    ],
    correctIndex: 1,
    explanation: "Linked lists excel when the size is dynamic and frequent structural modifications (insertions/deletions) occur, avoiding the $O(n)$ shifts required by arrays."
  }
];