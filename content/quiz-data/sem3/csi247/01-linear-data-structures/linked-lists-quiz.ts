export const quizData = [
  {
    question: "What is the fundamental theorem regarding random access in linked lists?",
    options: ["Random access is $O(1)$ if you have the head pointer.", "Random access is mathematically impossible in $O(1)$ time due to scattered heap allocation and lack of indexing formulas.", "Random access is $O(\\log n)$ using binary search.", "Random access is $O(1)$ for doubly linked lists."],
    correctIndex: 1,
    explanation: "Because nodes are scattered in memory and lack mathematical offsets, the CPU must sequentially traverse pointers, making access strictly $O(k)$."
  },
  {
    question: "When inserting a `newNode` after `currentNode`, what is the fatal error if you execute `currentNode.next = newNode;` FIRST?",
    options: ["Stack Overflow.", "You will permanently orphan the rest of the list, causing a massive memory leak.", "The new node will point to itself.", "The list will become circular."],
    correctIndex: 1,
    explanation: "You must bridge `newNode.next` to `currentNode.next` first. Overwriting `currentNode.next` first destroys the only reference to the remainder of the chain."
  },
  {
    question: "In the 'Count Internal Nodes' exam problem, what is the correct loop condition to exclude the tail boundary?",
    options: ["`while (current != null)`", "`while (current.next != null)`", "`while (current.prev != null)`", "`for(int i=0; i<size; i++)`"],
    correctIndex: 1,
    explanation: "Starting at `head.next`, the condition `current.next != null` ensures the loop terminates exactly when `current` is the tail node, excluding it from the count."
  },
  {
    question: "What is the time complexity of finding the $k$-th element in a Singly Linked List?",
    options: ["$O(1)$", "$O(\\log k)$", "$O(k)$", "$O(n)$"],
    correctIndex: 2,
    explanation: "You must traverse exactly $k$ pointers from the head to reach the $k$-th element."
  },
  {
    question: "To prevent memory leaks when deleting `targetNode` (given `prevNode`), what crucial step must be taken after bypassing it?",
    options: ["Set `prevNode.next = null`.", "Set `targetNode.next = null` to assist the Garbage Collector.", "Call `System.gc()`.", "Set `targetNode.data = null`."],
    correctIndex: 1,
    explanation: "Severing `targetNode.next` ensures the deleted node cannot hold references to the rest of the list, allowing the GC to reclaim the entire orphaned chain if applicable."
  },
  {
    question: "In the Student/GPA Lab, what is the correct numerator for the GPA calculation?",
    options: ["Sum of all grades.", "Sum of all credits.", "Sum of (Credits $\\times$ Grade) for filtered courses.", "Average of grades."],
    correctIndex: 2,
    explanation: "Quality points are calculated by multiplying the credit weight of a course by the grade achieved, then summing those products."
  },
  {
    question: "What does 'Null Termination' signify in a linked list?",
    options: ["The list is empty.", "The head pointer is null.", "The final node's forward pointer is explicitly set to null, signaling the absolute boundary.", "The list has a memory leak."],
    correctIndex: 2,
    explanation: "Null termination is the structural marker that tells traversal algorithms to stop, preventing infinite loops or segmentation faults."
  },
  {
    question: "What is the space overhead difference between a Singly Linked List and a Doubly Linked List per node?",
    options: ["4 bytes", "8 bytes (one additional pointer reference)", "16 bytes", "0 bytes"],
    correctIndex: 1,
    explanation: "A Doubly Linked List requires an additional `prev` pointer, adding 8 bytes of overhead per node on a 64-bit JVM."
  },
  {
    question: "If a linked list has fewer than 3 nodes, what should the 'Count Internal Nodes' method return?",
    options: ["1", "2", "0", "null"],
    correctIndex: 2,
    explanation: "Internal nodes exist strictly between the head and tail. If the list has 0, 1, or 2 nodes, there are no nodes strictly between the boundaries."
  },
  {
    question: "What is the worst-case time complexity of inserting an element at the tail of a Singly Linked List that does NOT maintain a tail pointer?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Without a tail pointer, the algorithm must traverse the entire list from the head to find the last node, taking $O(n)$ time."
  },
  {
    question: "In the Student Lab, if a student has no 'CSI' courses, what should the denominator be to prevent an ArithmeticException?",
    options: ["1", "Total courses", "0", "The logic must check if totalCredits > 0 before dividing."],
    correctIndex: 3,
    explanation: "Dividing by zero throws an exception. The code must explicitly check if the filtered credit sum is greater than 0 before performing the division."
  },
  {
    question: "What is the primary benefit of using a Sentinel Node (dummy head/tail) in a linked list?",
    options: ["It reduces memory usage.", "It eliminates edge-case null checks for empty lists or boundary insertions.", "It makes the list circular.", "It allows $O(1)$ random access."],
    correctIndex: 1,
    explanation: "Sentinel nodes guarantee that `head.next` and `tail.prev` are never null, allowing uniform pointer manipulation logic without conditional branching."
  },
  {
    question: "How do you detect a cycle in a Singly Linked List without modifying it?",
    options: ["Traverse and count nodes.", "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare).", "Check if the tail is null.", "Reverse the list and check if the head changes."],
    correctIndex: 1,
    explanation: "Floyd's algorithm uses two pointers moving at different speeds. If they meet, a cycle exists. It requires $O(1)$ space and $O(n)$ time."
  },
  {
    question: "When reversing a Singly Linked List, what three pointers must be maintained during the traversal?",
    options: ["`head`, `tail`, `current`", "`prev`, `current`, `next`", "`first`, `last`, `mid`", "`left`, `right`, `mid`"],
    correctIndex: 1,
    explanation: "You need `prev` to point backwards, `current` to track your position, and `next` to temporarily save the forward link before it is overwritten."
  },
  {
    question: "In a Circular Linked List, what is the termination condition for a traversal loop starting at `head`?",
    options: ["`current == null`", "`current.next == null`", "`current.next == head`", "`current == tail`"],
    correctIndex: 2,
    explanation: "In a circular list, the last node points back to the head. The loop must terminate when the next pointer references the starting head node."
  }
];