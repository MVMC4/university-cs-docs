export const quizData = [
  {
    question: "In Java 8+, a HashMap bucket converts to a Red-Black Tree when it exceeds?",
    options: ["4 nodes", "8 nodes", "16 nodes", "32 nodes"],
    correctIndex: 1,
    explanation: "Treeification happens at 8 to prevent $O(n)$ worst-case lookups."
  },
  {
    question: "The formula for Load Factor is?",
    options: ["capacity / size", "size / capacity", "size / buckets", "collisions / size"],
    correctIndex: 1,
    explanation: "It measures how full the table is (number of entries divided by number of buckets)."
  },
  {
    question: "Worst-case time complexity of Separate Chaining?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "If all keys hash to the same bucket, it degrades into a linked list."
  },
  {
    question: "Linear probing suffers primarily from?",
    options: ["Secondary clustering", "Primary clustering", "Infinite loops", "Memory fragmentation"],
    correctIndex: 1,
    explanation: "Contiguous blocks of occupied slots form, slowing down insertions."
  },
  {
    question: "Double hashing is designed to avoid?",
    options: ["Collisions entirely", "Primary and secondary clustering", "Rehashing", "Memory leaks"],
    correctIndex: 1,
    explanation: "Using a second hash function for the step size eliminates clustering."
  },
  {
    question: "A Bloom Filter can produce which type of error?",
    options: ["False negatives", "False positives", "Both false positives and negatives", "No errors possible"],
    correctIndex: 1,
    explanation: "It can say an item 'might' exist (false positive), but never 'definitely doesn't' if it does."
  },
  {
    question: "Consistent Hashing is primarily used to minimize?",
    options: ["Collision resolution time", "Data movement when servers change", "Memory usage", "Hash calculation time"],
    correctIndex: 1,
    explanation: "It ensures only a fraction of keys remap when a node is added/removed."
  },
  {
    question: "An optimal LRU Cache is implemented using?",
    options: ["Array + Binary Search", "HashMap + Doubly Linked List", "TreeMap + Stack", "ArrayList + Queue"],
    correctIndex: 1,
    explanation: "HashMap gives $O(1)$ lookup, DLL gives $O(1)$ reordering."
  },
  {
    question: "Java's String hashCode() uses Horner's method with a multiplier of?",
    options: ["10", "31", "37", "256"],
    correctIndex: 1,
    explanation: "31 is used because $31 * i$ can be optimized to a bit shift $(i << 5) - i$."
  },
  {
    question: "Time complexity of Rehashing all elements?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Every existing element must be re-inserted into the new larger table."
  },
  {
    question: "Optimal time complexity for the 'Two Sum' problem?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Using a HashMap to store complements yields a single-pass $O(n)$ solution."
  },
  {
    question: "When grouping Anagrams, the best HashMap key is?",
    options: ["The word itself", "The sorted characters of the word", "The length of the word", "The first letter of the word"],
    correctIndex: 1,
    explanation: "Sorting the characters creates a unique key for all anagrams."
  },
  {
    question: "Using a mutable object as a HashMap key causes?",
    options: ["Faster lookups", "The entry to be lost", "Automatic rehashing", "ConcurrentModificationException"],
    correctIndex: 1,
    explanation: "If the key's hash changes after insertion, you can never find the bucket again."
  },
  {
    question: "Quadratic probing uses which sequence for collision resolution?",
    options: ["$i$", "$i^2$", "$2^i$", "$\\log i$"],
    correctIndex: 1,
    explanation: "It probes at $1^2, 2^2, 3^2$ intervals to spread items out."
  },
  {
    question: "What happens if you override equals() but NOT hashCode()?",
    options: ["Compilation error", "Runtime error", "HashMaps will fail to find objects correctly", "Nothing, they are independent"],
    correctIndex: 2,
    explanation: "Equal objects will have different hash codes, breaking HashMap/HashSet contracts."
  },
];
