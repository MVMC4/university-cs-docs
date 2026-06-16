export const quizData = [
  {
    question: "What access pattern does a Queue enforce?",
    options: [
      "Last-In, First-Out (LIFO)",
      "First-In, First-Out (FIFO)",
      "Priority-based access",
      "Random access"
    ],
    correctIndex: 1,
    explanation: "A queue enforces FIFO, meaning the earliest added element is the first to be removed."
  },
  {
    question: "What is the primary problem with a simple linear array-based queue?",
    options: [
      "It cannot store integers.",
      "As elements are dequeued, the front pointer advances, leaving unusable empty space at the beginning of the array.",
      "It requires $O(n)$ time to enqueue.",
      "It cannot be implemented in Java."
    ],
    correctIndex: 1,
    explanation: "In a linear array queue, `front` only moves forward. Once it reaches the end, the queue appears full even if there are empty slots at the beginning."
  },
  {
    question: "How does a Circular Queue solve the 'unusable space' problem?",
    options: [
      "By using a linked list instead of an array.",
      "By using modulo arithmetic to wrap the `rear` and `front` pointers back to index 0 when they reach the end of the array.",
      "By automatically resizing the array.",
      "By deleting the oldest elements."
    ],
    correctIndex: 1,
    explanation: "Modulo arithmetic (`(index + 1) % capacity`) allows the pointers to wrap around, reusing the empty slots at the beginning of the array."
  },
  {
    question: "In a circular queue that sacrifices one slot to distinguish between full and empty states, what is the condition for the queue being FULL?",
    options: [
      "`front == rear`",
      "`(rear + 1) % capacity == front`",
      "`rear == capacity - 1`",
      "`front == 0`"
    ],
    correctIndex: 1,
    explanation: "By keeping one slot empty, we ensure that `front == rear` strictly means 'empty'. If the next position after `rear` is `front`, the queue is full."
  },
  {
    question: "In the same circular queue, what is the condition for the queue being EMPTY?",
    options: [
      "`front == rear`",
      "`(rear + 1) % capacity == front`",
      "`rear == -1`",
      "`front > rear`"
    ],
    correctIndex: 0,
    explanation: "When the queue is empty, the `front` and `rear` pointers are at the same position (or initialized to the same value)."
  },
  {
    question: "What is the time complexity of `enqueue` and `dequeue` in a circular array queue?",
    options: [
      "$O(n)$",
      "$O(\\log n)$",
      "$O(1)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Both operations involve simple pointer arithmetic and array assignment, taking constant time."
  },
  {
    question: "Which data structure is fundamentally used to implement Breadth-First Search (BFS) in graphs?",
    options: [
      "Stack",
      "Queue",
      "Priority Queue",
      "Deque"
    ],
    correctIndex: 1,
    explanation: "BFS explores neighbors level-by-level. A queue ensures that vertices discovered earlier are processed before vertices discovered later."
  },
  {
    question: "What is the time complexity of BFS on a graph with $V$ vertices and $E$ edges?",
    options: [
      "$O(V)$",
      "$O(E)$",
      "$O(V + E)$",
      "$O(V \\log V)$"
    ],
    correctIndex: 2,
    explanation: "Each vertex is enqueued/dequeued once ($O(V)$), and each edge is examined at most twice (in an undirected graph) ($O(E)$), resulting in $O(V + E)$."
  },
  {
    question: "In BFS, when is a vertex marked as 'visited'?",
    options: [
      "When it is dequeued.",
      "When it is first discovered (enqueued) to prevent duplicate entries in the queue.",
      "After all its neighbors have been processed.",
      "It is never marked as visited."
    ],
    correctIndex: 1,
    explanation: "Marking a vertex as visited immediately upon enqueueing prevents the same vertex from being added to the queue multiple times by different neighbors."
  },
  {
    question: "What is the space complexity of BFS?",
    options: [
      "$O(1)$",
      "$O(\\log V)$",
      "$O(V)$",
      "$O(E)$"
    ],
    correctIndex: 2,
    explanation: "BFS requires $O(V)$ space for the queue and the visited set/array, as in the worst case, all vertices might be in the queue simultaneously."
  },
  {
    question: "How does the `rear` pointer update during an `enqueue` operation in a circular queue of capacity $C$?",
    options: [
      "`rear = rear + 1;`",
      "`rear = (rear + 1) % C;`",
      "`rear = rear % C;`",
      "`rear = (rear - 1) % C;`"
    ],
    correctIndex: 1,
    explanation: "The modulo operator ensures that when `rear` reaches $C-1$, adding 1 wraps it back to 0."
  },
  {
    question: "What traversal order does BFS produce on a tree?",
    options: [
      "Pre-order",
      "In-order",
      "Post-order",
      "Level-order"
    ],
    correctIndex: 3,
    explanation: "BFS visits all nodes at the current depth level before moving to nodes at the next depth level, which is the definition of level-order traversal."
  },
  {
    question: "If a circular queue uses a `size` variable instead of sacrificing a slot, what is the condition for the queue being FULL?",
    options: [
      "`front == rear`",
      "`size == capacity`",
      "`(rear + 1) % capacity == front`",
      "`rear == capacity`"
    ],
    correctIndex: 1,
    explanation: "By explicitly tracking the number of elements, the queue can use all $capacity$ slots. It is full when `size` equals `capacity`."
  },
  {
    question: "What error occurs if you attempt to `dequeue` from an empty queue?",
    options: [
      "Overflow",
      "Underflow",
      "Segmentation Fault",
      "Index Out of Bounds"
    ],
    correctIndex: 1,
    explanation: "Removing an element from an empty structure is an Underflow error."
  },
  {
    question: "In a node-based queue implementation, what pointers must be maintained to ensure $O(1)$ enqueue and dequeue?",
    options: [
      "Only a `head` pointer.",
      "Only a `tail` pointer.",
      "Both `head` (front) and `tail` (rear) pointers.",
      "A `size` pointer."
    ],
    correctIndex: 2,
    explanation: "The `head` pointer allows $O(1)$ dequeue from the front, and the `tail` pointer allows $O(1)$ enqueue at the back without traversing the list."
  }
];