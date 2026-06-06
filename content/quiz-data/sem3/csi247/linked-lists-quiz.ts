export const quizData = [
  {
    question: "What does each node in a singly linked list contain?",
    options: ["Only data", "Data and pointer to next", "Only pointer", "Hash code"],
    correctIndex: 1,
    explanation: "Each node contains the data and a pointer (reference) to the next node in the list."
  },
  {
    question: "What is the time complexity of traversing a linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "You must visit each node once to traverse the entire list, so it's O(n)."
  },
  {
    question: "What pointers does a doubly linked list node have?",
    options: ["Only next", "prev and next", "Only prev", "Hash pointer"],
    correctIndex: 1,
    explanation: "Doubly linked list nodes have both prev (previous) and next pointers for bidirectional traversal."
  },
  {
    question: "What is the time complexity of inserting at the head of a linked list?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Inserting at head is O(1) - just create node, point to old head, update head pointer."
  },
  {
    question: "What is the time complexity of deleting the tail in a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "You must traverse to find the second-to-last node, which takes O(n) time."
  },
  {
    question: "Which algorithm is used to detect a cycle in a linked list?",
    options: ["Hash table", "Floyd's Tortoise and Hare", "Sorting", "Binary search"],
    correctIndex: 1,
    explanation: "Floyd's cycle detection uses two pointers moving at different speeds to detect cycles."
  },
  {
    question: "How many steps does the slow pointer move in Floyd's algorithm?",
    options: ["1 step", "2 steps", "3 steps", "0 steps"],
    correctIndex: 0,
    explanation: "The slow pointer moves 1 step at a time, while the fast pointer moves 2 steps."
  },
  {
    question: "How many steps does the fast pointer move in Floyd's algorithm?",
    options: ["1 step", "2 steps", "3 steps", "0 steps"],
    correctIndex: 1,
    explanation: "The fast pointer moves 2 steps at a time to catch up with the slow pointer if a cycle exists."
  },
  {
    question: "Compared to singly linked list, doubly linked list uses:",
    options: ["Less memory", "More memory", "Same memory", "No memory"],
    correctIndex: 1,
    explanation: "Doubly linked lists use more memory because each node stores an extra pointer (prev)."
  },
  {
    question: "Can you traverse a doubly linked list backwards?",
    options: ["No", "Yes", "Only from head", "Only from tail"],
    correctIndex: 1,
    explanation: "Yes! The prev pointer allows backward traversal from any node."
  },
  {
    question: "What is the main advantage of using a dummy head node?",
    options: ["Faster speed", "Simplifies edge cases", "Less memory", "Better sorting"],
    correctIndex: 1,
    explanation: "A dummy head simplifies edge cases like inserting/deleting at the beginning of the list."
  },
  {
    question: "What is the time complexity of reversing a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Reversing requires visiting each node once to flip its pointer, so it's O(n)."
  },
  {
    question: "What is the space complexity of iterative linked list reversal?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Iterative reversal uses only three pointers (prev, curr, next), so it's O(1) space."
  },
  {
    question: "Which technique is used to find the middle of a linked list?",
    options: ["Hash table", "Fast and slow pointers", "Sorting", "Queue"],
    correctIndex: 1,
    explanation: "Fast/slow pointer technique - when fast reaches end, slow is at middle."
  },
  {
    question: "Are linked list nodes stored in contiguous memory?",
    options: ["Yes", "No", "Sometimes", "Only in DLL"],
    correctIndex: 1,
    explanation: "No! Linked list nodes are scattered throughout memory and connected by pointers."
  },
  {
    question: "Which has better cache locality?",
    options: ["Linked List", "Array", "Same", "Neither"],
    correctIndex: 1,
    explanation: "Arrays have better cache locality because elements are stored contiguously in memory."
  },
  {
    question: "What is the time complexity of deleting a node by value?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "You must search for the node first (O(n)), then delete it (O(1)), so total is O(n)."
  },
  {
    question: "What operation does XOR linked list use to save memory?",
    options: ["Addition", "Subtraction", "XOR", "AND"],
    correctIndex: 2,
    explanation: "XOR linked list stores XOR of prev and next pointers instead of both, saving memory."
  },
  {
    question: "What is the time complexity of searching in a skip list?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Skip lists use multiple layers of linked lists to achieve O(log n) search time."
  },
  {
    question: "In a circular linked list, what does the last node point to?",
    options: ["null", "Head (first node)", "Tail", "Previous node"],
    correctIndex: 1,
    explanation: "In a circular linked list, the last node points back to the head, creating a cycle."
  }
];