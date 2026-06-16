export const quizData = [
  {
    question: "What is the defining architectural constraint of a Queue?",
    options: ["Last-In-First-Out (LIFO)", "First-In-First-Out (FIFO)", "Random Access", "Priority-based extraction"],
    correctIndex: 1,
    explanation: "A Queue strictly enforces FIFO, meaning the element that has been in the structure the longest is the first to be removed."
  },
  {
    question: "In a Linked-List backed Queue, what is the time complexity of the `enqueue` operation?",
    options: ["$O(n)$", "$O(\\log n)$", "$O(1)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "By maintaining a `tail` pointer, new nodes can be appended to the end of the list in strictly constant time without traversal."
  },
  {
    question: "In the Linked-List Queue `dequeue` lab, what crucial edge case must be handled if `head` becomes `null` after advancing?",
    options: ["Throw an exception.", "Explicitly set `tail = null` to prevent a dangling reference and memory leaks.", "Reset `head` to the original start.", "Call the garbage collector."],
    correctIndex: 1,
    explanation: "If the last element is removed, the queue is empty. Failing to nullify the `tail` pointer leaves it referencing a deleted node, breaking the empty state invariant."
  },
  {
    question: "In a Circular Array Queue that sacrifices one slot to distinguish full from empty, what is the mathematical condition for the queue being FULL?",
    options: ["`front == rear`", "`(rear + 1) % capacity == front`", "`rear == capacity - 1`", "`size == capacity`"],
    correctIndex: 1,
    explanation: "If advancing the rear pointer by one lands exactly on the front pointer, the queue is full. This prevents the `front == rear` ambiguity."
  },
  {
    question: "What modulo arithmetic formula is used to advance the `rear` pointer in a Circular Queue?",
    options: ["`rear = rear + 1`", "`rear = (rear + 1) % capacity`", "`rear = (rear - 1) % capacity`", "`rear = rear % capacity`"],
    correctIndex: 1,
    explanation: "The modulo operator ensures that when the pointer reaches the end of the array, it wraps around to index 0 seamlessly."
  },
  {
    question: "When implementing `dequeue` on an array-based queue, why must you extract the value BEFORE advancing the `front` pointer?",
    options: ["To save memory.", "Advancing first overwrites the reference and permanently drops the active element.", "To prevent integer overflow.", "To maintain the FIFO order."],
    correctIndex: 1,
    explanation: "If you advance `front` first, you lose the index of the element you intended to return, effectively deleting it without retrieving it."
  },
  {
    question: "What is the primary application of a Queue in graph theory?",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Topological Sorting", "Dijkstra's Algorithm"],
    correctIndex: 1,
    explanation: "BFS explores a graph level-by-level, which perfectly aligns with the FIFO property of a Queue."
  },
  {
    question: "What is the 'unusable space' problem in a standard (non-circular) array-based queue?",
    options: ["The array cannot store null values.", "Dequeuing advances the front pointer, leaving empty slots at the beginning that cannot be reused.", "The array shrinks dynamically.", "The queue requires $O(n)$ space per element."],
    correctIndex: 1,
    explanation: "As elements are removed from the front, the valid data shifts right, leaving wasted space at the start of the array that the rear pointer cannot wrap around to fill."
  },
  {
    question: "If `front == rear` in a Circular Queue that uses the 1-slot sacrifice method, what is the state of the queue?",
    options: ["Full", "Empty", "Half-full", "Invalid state"],
    correctIndex: 1,
    explanation: "By sacrificing one slot for the 'full' condition, the `front == rear` condition is exclusively reserved to indicate an empty queue."
  },
  {
    question: "What is the time complexity of searching for a specific element in a standard Queue?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "Queues do not support random access or indexing. To find an element, you must dequeue and inspect every element sequentially, taking $O(n)$ time."
  },
  {
    question: "How does a Priority Queue differ from a standard FIFO Queue?",
    options: ["It uses a Stack internally.", "Elements are dequeued based on their assigned priority rather than their arrival order.", "It only accepts integer values.", "It has a fixed capacity of 1."],
    correctIndex: 1,
    explanation: "A Priority Queue breaks FIFO order to ensure the element with the highest (or lowest) priority is always extracted first, typically using a Heap."
  },
  {
    question: "What is a Deque (Double-Ended Queue)?",
    options: ["A queue that only allows insertion at the front.", "A linear structure that allows insertion and deletion at BOTH the front and the rear in $O(1)$ time.", "A queue that automatically sorts its elements.", "A circular queue with no capacity limit."],
    correctIndex: 1,
    explanation: "A Deque relaxes the strict FIFO constraint, allowing $O(1)$ `addFirst`, `addLast`, `removeFirst`, and `removeLast` operations."
  },
  {
    question: "In the Linked-List Queue lab, what pointers are strictly required to maintain $O(1)$ enqueue and dequeue?",
    options: ["Only `head`", "Only `tail`", "Both `head` (front) and `tail` (rear)", "`head`, `tail`, and `current`"],
    correctIndex: 2,
    explanation: "`head` is required to dequeue from the front in $O(1)$, and `tail` is required to enqueue at the back in $O(1)$ without traversing the list."
  },
  {
    question: "What is the space complexity of a Linked-List backed Queue containing $n$ elements?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Each of the $n$ elements requires a dedicated Node object allocated on the heap, resulting in linear space complexity."
  },
  {
    question: "If you attempt to `enqueue` into a Circular Queue that is already full, what should the implementation do?",
    options: ["Overwrite the front element.", "Throw an `IllegalStateException` or automatically resize (if dynamic).", "Block the thread indefinitely.", "Silently ignore the operation."],
    correctIndex: 1,
    explanation: "A strict fixed-capacity queue must throw an exception to signal overflow. A dynamic implementation would trigger a resize, but the standard academic implementation throws an exception."
  }
];