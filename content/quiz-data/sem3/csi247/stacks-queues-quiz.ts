export const quizData = [
  {
    question: "What principle does a Stack follow?",
    options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "FILO (First In Last Out)", "Random access"],
    correctIndex: 1,
    explanation: "Stack follows LIFO - the last element pushed is the first one popped."
  },
  {
    question: "What principle does a Queue follow?",
    options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "FILO (First In Last Out)", "Random access"],
    correctIndex: 0,
    explanation: "Queue follows FIFO - the first element enqueued is the first one dequeued."
  },
  {
    question: "What is the time complexity of stack push operation?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Push is O(1) - just add to top of stack."
  },
  {
    question: "What is the time complexity of queue enqueue operation?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Enqueue is O(1) - just add to back of queue."
  },
  {
    question: "What causes a stack overflow?",
    options: ["Empty stack", "Full stack", "Null pointer", "Fast operations"],
    correctIndex: 1,
    explanation: "Stack overflow occurs when trying to push to a full stack."
  },
  {
    question: "What causes a stack underflow?",
    options: ["Empty stack", "Full stack", "Null pointer", "Fast operations"],
    correctIndex: 0,
    explanation: "Stack underflow occurs when trying to pop from an empty stack."
  },
  {
    question: "Which algorithm uses a Queue?",
    options: ["DFS (Depth-First Search)", "BFS (Breadth-First Search)", "Recursion", "Undo system"],
    correctIndex: 1,
    explanation: "BFS uses a queue to explore nodes level by level."
  },
  {
    question: "Which algorithm uses a Stack?",
    options: ["BFS (Breadth-First Search)", "DFS (Depth-First Search)", "Print queue", "Cache"],
    correctIndex: 1,
    explanation: "DFS uses a stack to explore as deep as possible before backtracking."
  },
  {
    question: "What arithmetic operation does a circular queue use to wrap around?",
    options: ["Addition", "Subtraction", "Modulo", "Division"],
    correctIndex: 2,
    explanation: "Circular queues use modulo (%) to wrap indices back to the beginning."
  },
  {
    question: "What does a Deque (Double-Ended Queue) allow?",
    options: ["Insert/delete at front only", "Insert/delete at rear only", "Insert/delete at both ends", "Neither end"],
    correctIndex: 2,
    explanation: "Deque allows insertion and deletion at both front and rear ends."
  },
  {
    question: "What class does Java's Stack extend?",
    options: ["List", "Vector", "Map", "Set"],
    correctIndex: 1,
    explanation: "Java's Stack extends Vector, which makes all its methods synchronized (slow)."
  },
  {
    question: "Which is the preferred modern stack implementation in Java?",
    options: ["Stack", "ArrayDeque", "Vector", "List"],
    correctIndex: 1,
    explanation: "ArrayDeque is preferred over Stack because it's faster (not synchronized)."
  },
  {
    question: "What does the peek() operation do?",
    options: ["Removes the top element", "Returns top element without removing", "Clears the stack", "Sorts elements"],
    correctIndex: 1,
    explanation: "Peek returns the top element without removing it from the stack/queue."
  },
  {
    question: "Does a Priority Queue follow FIFO order?",
    options: ["Yes", "No", "Sometimes", "Only with 1 element"],
    correctIndex: 1,
    explanation: "Priority Queue removes elements by priority, not by insertion order."
  },
  {
    question: "Which data structure is used to convert infix to postfix notation?",
    options: ["Queue", "Stack", "Tree", "Hash Table"],
    correctIndex: 1,
    explanation: "Stack is used to handle operator precedence during infix to postfix conversion."
  },
  {
    question: "Which data structure is used to check balanced parentheses?",
    options: ["Queue", "Stack", "Tree", "Hash Table"],
    correctIndex: 1,
    explanation: "Stack is perfect for matching opening and closing parentheses."
  },
  {
    question: "Can you implement a Queue using two Stacks?",
    options: ["No", "Yes, with amortized O(1)", "Only with arrays", "Only with linked lists"],
    correctIndex: 1,
    explanation: "Yes! Use one stack for enqueue and one for dequeue, achieving amortized O(1)."
  },
  {
    question: "What is BlockingQueue used for?",
    options: ["Sorting", "Producer-Consumer pattern", "Searching", "Graph algorithms"],
    correctIndex: 1,
    explanation: "BlockingQueue is used in Producer-Consumer problems for thread-safe communication."
  },
  {
    question: "What happens when you pop from an empty stack?",
    options: ["Returns 0", "Returns null or throws exception", "Returns -1", "Returns infinity"],
    correctIndex: 1,
    explanation: "Popping from empty stack returns null or throws EmptyStackException."
  },
  {
    question: "What is the time complexity to build a heap from an array?",
    options: ["O(n log n)", "O(n)", "O(1)", "O(n²)"],
    correctIndex: 1,
    explanation: "Building a heap bottom-up takes O(n) time, not O(n log n)."
  }
];