export const quizData = [
  {
    question: "What optimization did Java 8 introduce for HashMap buckets with many collisions?",
    options: [
      "It uses arrays instead of lists.",
      "It converts linked lists to Red-Black Trees when length > 8.",
      "It deletes the extra elements.",
      "It increases the hash code."
    ],
    correctIndex: 1,
    explanation: "To prevent HashDoS attacks, long chains are converted to trees, improving worst-case lookup from $O(n)$ to $O(\\log n)$."
  },
  {
    question: "What is a Bloom Filter?",
    options: [
      "A sorting algorithm.",
      "A probabilistic data structure for set membership testing.",
      "A type of hash table.",
      "A compression algorithm."
    ],
    correctIndex: 1,
    explanation: "Bloom filters use multiple hash functions and a bit array to test membership with possible false positives but no false negatives."
  },
  {
    question: "What is a 'False Positive' in a Bloom Filter?",
    options: [
      "Saying an element is NOT in the set when it IS.",
      "Saying an element MIGHT be in the set when it is NOT.",
      "Saying an element is in the set when it IS.",
      "A hash collision."
    ],
    correctIndex: 1,
    explanation: "Bloom filters can erroneously report that an element exists (false positive) due to bit collisions, but never report it doesn't exist if it does (no false negatives)."
  },
  {
    question: "What is Consistent Hashing used for?",
    options: [
      "Sorting strings.",
      "Distributed systems to minimize data movement when servers are added/removed.",
      "Encrypting passwords.",
      "Compressing files."
    ],
    correctIndex: 1,
    explanation: "Consistent hashing maps keys and servers to a ring, ensuring that adding/removing a server only affects a small fraction of keys."
  },
  {
    question: "In Consistent Hashing, how are keys assigned to servers?",
    options: [
      "Randomly.",
      "To the nearest server clockwise on the ring.",
      "To the server with the lowest ID.",
      "To the server with the most memory."
    ],
    correctIndex: 1,
    explanation: "Keys are placed on the ring and assigned to the first server encountered moving clockwise."
  },
  {
    question: "What is the main advantage of Consistent Hashing over standard modulo hashing ($key \\% N$)?",
    options: [
      "It is faster.",
      "It minimizes key remapping when $N$ (number of servers) changes.",
      "It uses less memory.",
      "It prevents collisions."
    ],
    correctIndex: 1,
    explanation: "With modulo hashing, changing $N$ remaps almost all keys. With consistent hashing, only keys mapped to the added/removed server move."
  },
  {
    question: "Why does Java 8 convert lists to trees at length 8?",
    options: [
      "Because 8 is a power of 2.",
      "Because the probability of a list reaching length 8 with a good hash function is negligible, so it indicates a bad hash or attack.",
      "Because trees are smaller than lists.",
      "Because 8 is the default capacity."
    ],
    correctIndex: 1,
    explanation: "Under ideal hashing, chain length follows a Poisson distribution. Length 8 is extremely rare ($10^{-6}$), so hitting it suggests a problem."
  },
  {
    question: "What is a HashDoS attack?",
    options: [
      "Deleting a hash table.",
      "Sending many keys that collide to degrade performance to $O(n)$.",
      "Encrypting the hash table.",
      "Resizing the table infinitely."
    ],
    correctIndex: 1,
    explanation: "Attackers exploit weak hash functions to force all keys into one bucket, causing Denial of Service via slow lookups."
  },
  {
    question: "Can a Bloom Filter delete elements?",
    options: [
      "Yes, easily.",
      "No, not without risking false negatives (unless using a Counting Bloom Filter).",
      "Only if the element is a string.",
      "Only if the table is full."
    ],
    correctIndex: 1,
    explanation: "Clearing bits to delete an element might clear bits shared by other elements, causing false negatives."
  },
  {
    question: "What data structure is used to implement the tree bins in Java 8 HashMap?",
    options: [
      "AVL Tree",
      "Red-Black Tree",
      "B-Tree",
      "Binary Search Tree"
    ],
    correctIndex: 1,
    explanation: "Java uses `TreeNode` which implements a Red-Black Tree to guarantee $O(\\log n)$ height."
  },
  {
    question: "In Consistent Hashing, what are 'Virtual Nodes'?",
    options: [
      "Servers that don't exist.",
      "Multiple points on the ring for a single physical server to improve load balancing.",
      "Deleted servers.",
      "Backup servers."
    ],
    correctIndex: 1,
    explanation: "Virtual nodes (replicas) ensure that physical servers are evenly distributed around the ring, preventing hotspots."
  },
  {
    question: "What is the space complexity of a Bloom Filter?",
    options: [
      "$O(n)$ where $n$ is number of elements.",
      "$O(m)$ where $m$ is the number of bits, independent of element size.",
      "$O(1)$",
      "$O(n^2)$"
    ],
    correctIndex: 1,
    explanation: "Bloom filters are very space-efficient because they only store bits, not the actual elements."
  },
  {
    question: "Which of the following is NOT a property of a Bloom Filter?",
    options: [
      "False Positives possible",
      "False Negatives impossible",
      "Elements can be deleted easily",
      "Space efficient"
    ],
    correctIndex: 2,
    explanation: "Standard Bloom Filters do not support deletion."
  },
  {
    question: "In Java 8 HashMap, when does a tree bin revert to a linked list?",
    options: [
      "When the size drops below 8.",
      "When the size drops below 6 during resizing.",
      "Never.",
      "When the load factor is low."
    ],
    correctIndex: 1,
    explanation: "To avoid thrashing between list and tree, the threshold to untreeify is lower (6) than the threshold to treeify (8)."
  },
  {
    question: "What is the primary use case for Consistent Hashing?",
    options: [
      "Local caching.",
      "Distributed databases (e.g., Cassandra, DynamoDB) and CDNs.",
      "Sorting large files.",
      "Compiling code."
    ],
    correctIndex: 1,
    explanation: "It is essential for distributed systems where nodes frequently join and leave, and data needs to be redistributed efficiently."
  }
];