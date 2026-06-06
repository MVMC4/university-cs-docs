export const quizData = [
  {
    question: "At what threshold does JDK 8 HashMap convert a bucket to a Red-Black Tree?",
    options: ["4 nodes", "6 nodes", "8 nodes", "16 nodes"],
    correctIndex: 2,
    explanation: "HashMap converts a bucket's linked list to a Red-Black Tree when it reaches 8 nodes to prevent HashDoS attacks."
  },
  {
    question: "At what size does HashMap convert the tree back to a linked list?",
    options: ["4 nodes", "6 nodes", "8 nodes", "10 nodes"],
    correctIndex: 1,
    explanation: "When the tree shrinks to 6 or fewer nodes, it converts back to a linked list to prevent thrashing."
  },
  {
    question: "How does ConcurrentHashMap in JDK 8+ achieve thread safety?",
    options: ["16 Segments", "Global lock", "CAS + synchronized on bucket", "Read-Write lock"],
    correctIndex: 2,
    explanation: "JDK 8+ uses CAS (Compare-And-Swap) and synchronizes only the specific bucket being modified."
  },
  {
    question: "In a Red-Black Tree, the longest path is at most how many times the shortest?",
    options: ["Equal length", "2 times", "3 times", "Unbounded"],
    correctIndex: 1,
    explanation: "Red-Black Trees guarantee that the longest path is at most 2x the shortest, ensuring O(log n) operations."
  },
  {
    question: "What does a Fail-Fast iterator check to detect concurrent modification?",
    options: ["Hash code", "modCount", "Thread ID", "Memory address"],
    correctIndex: 1,
    explanation: "Fail-fast iterators compare modCount with expectedModCount to detect if the collection was modified."
  },
  {
    question: "Which collection is Fail-Safe (doesn't throw ConcurrentModificationException)?",
    options: ["ArrayList", "HashMap", "CopyOnWriteArrayList", "LinkedList"],
    correctIndex: 2,
    explanation: "CopyOnWriteArrayList works on a snapshot copy, so it's safe to modify while iterating."
  },
  {
    question: "What does Spliterator.trySplit() do in parallel streams?",
    options: ["Sorts the data", "Splits work for parallel processing", "Triggers GC", "Calculates hash"],
    correctIndex: 1,
    explanation: "trySplit() divides the data for parallel stream processing using Fork/Join framework."
  },
  {
    question: "What does HashDoS attack exploit?",
    options: ["Memory leaks", "O(n) collision chains", "Stack overflow", "Null pointers"],
    correctIndex: 1,
    explanation: "HashDoS creates many keys with the same hash code, creating O(n) collision chains instead of O(1) lookup."
  },
  {
    question: "What data structure backs TreeMap?",
    options: ["Hash table", "Red-Black Tree", "AVL Tree", "Skip List"],
    correctIndex: 1,
    explanation: "TreeMap uses a Red-Black Tree to maintain sorted order with O(log n) operations."
  },
  {
    question: "How does ConcurrentHashMap calculate size in JDK 8+?",
    options: ["AtomicLong", "CounterCell array", "Global lock", "modCount"],
    correctIndex: 1,
    explanation: "ConcurrentHashMap uses a CounterCell array to avoid contention when calculating size."
  },
  {
    question: "How many null keys does HashMap allow?",
    options: ["None", "Exactly one", "Multiple", "Only in JDK 8"],
    correctIndex: 1,
    explanation: "HashMap allows exactly one null key (stored in bucket 0)."
  },
  {
    question: "What is a collision in HashMap?",
    options: ["Two threads access simultaneously", "Two keys hash to same index", "Null key inserted", "Empty bucket"],
    correctIndex: 1,
    explanation: "A collision occurs when two different keys produce the same hash code and map to the same bucket."
  },
  {
    question: "What color is the root node in a Red-Black Tree?",
    options: ["Red", "Black", "Null", "White"],
    correctIndex: 1,
    explanation: "The root node in a Red-Black Tree is always black (one of the Red-Black Tree properties)."
  },
  {
    question: "When is CopyOnWriteArrayList best used?",
    options: ["Frequent writes", "Frequent reads, rare writes", "Sorting", "Hashing"],
    correctIndex: 1,
    explanation: "CopyOnWriteArrayList is optimized for frequent reads and rare writes (like listener lists)."
  },
  {
    question: "How does LinkedHashMap maintain order?",
    options: ["Tree structure", "Doubly-linked list", "Hash table", "Queue"],
    correctIndex: 1,
    explanation: "LinkedHashMap maintains a doubly-linked list running through all entries to preserve order."
  },
  {
    question: "Why does HashMap use Poisson distribution?",
    options: ["To resize", "To calculate bucket probabilities", "To hash keys", "To manage threads"],
    correctIndex: 1,
    explanation: "Poisson distribution helps calculate the probability of bucket sizes for optimal performance."
  },
  {
    question: "What does CAS stand for?",
    options: ["Compare And Swap", "Create And Store", "Cache Sync", "Concurrent Array Structure"],
    correctIndex: 0,
    explanation: "CAS (Compare And Swap) is an atomic operation used for thread-safe updates without locks."
  },
  {
    question: "Can a Red-Black Tree have two adjacent red nodes?",
    options: ["Yes", "No", "Only at root", "Only at leaves"],
    correctIndex: 1,
    explanation: "Red-Black Trees guarantee no two consecutive red nodes (parent and child cannot both be red)."
  },
  {
    question: "How did JDK 7 ConcurrentHashMap achieve thread safety?",
    options: ["CAS operations", "16 Segments with locks", "Synchronized methods", "Volatile variables"],
    correctIndex: 1,
    explanation: "JDK 7 used 16 segments, each with its own lock, allowing concurrent access to different segments."
  },
  {
    question: "How do Java Streams traverse collections?",
    options: ["Iterator", "Spliterator", "Enumeration", "Cursor"],
    correctIndex: 1,
    explanation: "Streams use Spliterator which supports parallel traversal and can be split for parallel processing."
  }
];