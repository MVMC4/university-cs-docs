export const quizData = [
  {
    question: "What is the average time complexity for hash table lookup?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Hash tables provide O(1) average case lookup time."
  },
  {
    question: "What property must a hash function have?",
    options: ["Random output", "Deterministic", "Slow calculation", "Linear distribution"],
    correctIndex: 1,
    explanation: "Hash functions must be deterministic - same input always produces same output."
  },
  {
    question: "What is a collision in hash tables?",
    options: ["Different keys, different indices", "Different keys, same index", "Null key", "Empty bucket"],
    correctIndex: 1,
    explanation: "A collision occurs when two different keys hash to the same index."
  },
  {
    question: "What data structure does separate chaining use?",
    options: ["Array", "Linked list", "Tree", "Graph"],
    correctIndex: 1,
    explanation: "Separate chaining uses linked lists at each bucket to handle collisions."
  },
  {
    question: "Linear probing is a form of:",
    options: ["Separate chaining", "Open addressing", "Tree-based storage", "Queue-based storage"],
    correctIndex: 1,
    explanation: "Linear probing is an open addressing technique that searches for the next available slot."
  },
  {
    question: "What is primary clustering?",
    options: ["Separate chaining", "Linear probing problem", "Quadratic probing", "Double hashing"],
    correctIndex: 1,
    explanation: "Primary clustering is a problem in linear probing where long chains of occupied slots form."
  },
  {
    question: "What is the load factor formula?",
    options: ["size / capacity", "capacity / size", "size + capacity", "size * capacity"],
    correctIndex: 0,
    explanation: "Load factor = number of items (size) / number of buckets (capacity)."
  },
  {
    question: "What is Java's default load factor?",
    options: ["0.5", "0.75", "1.0", "0.25"],
    correctIndex: 1,
    explanation: "Java's HashMap uses a default load factor of 0.75."
  },
  {
    question: "When does rehashing occur?",
    options: ["When table is empty", "When load factor exceeds threshold", "When table is full", "When null key inserted"],
    correctIndex: 1,
    explanation: "Rehashing occurs when the load factor exceeds the threshold (usually 0.75)."
  },
  {
    question: "What is the time complexity of rehashing?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Rehashing requires re-inserting all n elements, so it's O(n)."
  },
  {
    question: "What makes a good hash function?",
    options: ["Random distribution", "Uniform distribution", "Linear distribution", "Slow calculation"],
    correctIndex: 1,
    explanation: "A good hash function distributes keys uniformly across buckets."
  },
  {
    question: "What does JDK 8 do when a bucket has 8+ collisions?",
    options: ["Uses linked list", "Converts to Red-Black Tree", "Uses array", "Uses queue"],
    correctIndex: 1,
    explanation: "JDK 8 converts the linked list to a Red-Black Tree when a bucket has 8+ elements."
  },
  {
    question: "Should hash table keys be mutable or immutable?",
    options: ["Mutable (bad)", "Immutable (good)", "Slow", "Null"],
    correctIndex: 1,
    explanation: "Keys should be immutable so their hash code doesn't change after insertion."
  },
  {
    question: "What is the relationship between hashCode() and equals()?",
    options: ["Different", "Must be consistent", "Random", "Null"],
    correctIndex: 1,
    explanation: "If two objects are equal according to equals(), they must have the same hashCode()."
  },
  {
    question: "How many hash functions does double hashing use?",
    options: ["1", "2", "3", "0"],
    correctIndex: 1,
    explanation: "Double hashing uses two hash functions - one for initial position, one for step size."
  },
  {
    question: "Quadratic probing uses what interval?",
    options: ["Linear", "Squared", "Cubic", "Random"],
    correctIndex: 1,
    explanation: "Quadratic probing uses squared intervals (1, 4, 9, 16...) instead of linear."
  },
  {
    question: "What is the worst-case lookup time for hash tables?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Worst case is O(n) when all keys collide and end up in the same bucket."
  },
  {
    question: "What is the space complexity of hash tables?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Hash tables use O(n) space to store n elements."
  },
  {
    question: "Are cryptographic hash functions fast or slow?",
    options: ["Fast", "Slow", "O(1)", "O(n)"],
    correctIndex: 1,
    explanation: "Cryptographic hash functions are intentionally slow to prevent brute force attacks."
  },
  {
    question: "What is the modulo operator used for in hash tables?",
    options: ["Calculate hash", "Calculate index", "Store key", "Store value"],
    correctIndex: 1,
    explanation: "Modulo (%) is used to convert hash code to array index: index = hash % capacity."
  }
];