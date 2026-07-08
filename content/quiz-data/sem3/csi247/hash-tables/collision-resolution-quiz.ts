export const quizData = [
  {
    question: "In Separate Chaining, what data structure is typically used at each bucket?",
    options: [
      "Array",
      "Linked List",
      "Stack",
      "Queue"
    ],
    correctIndex: 1,
    explanation: "Linked lists are standard because they handle dynamic growth easily. Java 8+ uses Red-Black Trees for long chains."
  },
  {
    question: "What is the time complexity of search in Separate Chaining with load factor $\\alpha$?",
    options: [
      "$O(1)$",
      "$O(\\alpha)$",
      "$O(\\log \\alpha)$",
      "$O(\\alpha^2)$"
    ],
    correctIndex: 1,
    explanation: "On average, each bucket has $\\alpha$ elements. We traverse the list at the bucket, taking $O(\\alpha)$ time."
  },
  {
    question: "What is Primary Clustering in Linear Probing?",
    options: [
      "When all keys hash to the same index.",
      "When long runs of occupied slots build up, increasing the probe sequence length.",
      "When the table is full.",
      "When keys are distributed uniformly."
    ],
    correctIndex: 1,
    explanation: "As clusters form, new keys are more likely to fall into the cluster, making it longer, which degrades performance to $O(n)$."
  },
  {
    question: "How does Quadratic Probing differ from Linear Probing?",
    options: [
      "It uses a linked list.",
      "It probes at intervals of $1^2, 2^2, 3^2, \\dots$ instead of $1, 2, 3, \\dots$.",
      "It uses a second hash function.",
      "It rehashes immediately."
    ],
    correctIndex: 1,
    explanation: "Quadratic probing spreads out the probes to reduce primary clustering, though it can suffer from secondary clustering."
  },
  {
    question: "What is the probe sequence for Double Hashing?",
    options: [
      "$(h_1(k) + i) \\% m$",
      "$(h_1(k) + i \\cdot h_2(k)) \\% m$",
      "$(h_1(k) + i^2) \\% m$",
      "$(h_1(k) \\cdot i) \\% m$"
    ],
    correctIndex: 1,
    explanation: "Double hashing uses a second hash function $h_2(k)$ to determine the step size, providing better distribution."
  },
  {
    question: "Which collision resolution method suffers the most from clustering?",
    options: [
      "Separate Chaining",
      "Linear Probing",
      "Quadratic Probing",
      "Double Hashing"
    ],
    correctIndex: 1,
    explanation: "Linear Probing is notorious for primary clustering, where long contiguous blocks of occupied slots form."
  },
  {
    question: "In Open Addressing, where are all elements stored?",
    options: [
      "In external linked lists.",
      "In the array itself.",
      "In a separate overflow area.",
      "In a tree structure."
    ],
    correctIndex: 1,
    explanation: "Open Addressing stores all elements directly in the hash table array, probing for empty slots upon collision."
  },
  {
    question: "What is the load factor limit for Open Addressing?",
    options: [
      "It can exceed 1.0.",
      "It must be strictly less than 1.0.",
      "It must be exactly 0.75.",
      "It must be 0."
    ],
    correctIndex: 1,
    explanation: "Since all elements are in the array, if $n \\ge m$ (load factor $\\ge 1$), there are no empty slots, and insertion fails."
  },
  {
    question: "What is Secondary Clustering?",
    options: [
      "When two keys with the same initial hash follow the same probe sequence.",
      "When the table is full.",
      "When keys are deleted.",
      "When the hash function is bad."
    ],
    correctIndex: 0,
    explanation: "In Quadratic Probing, keys that hash to the same index will follow the exact same probe sequence, causing secondary clustering."
  },
  {
    question: "Which method is best for handling high load factors?",
    options: [
      "Linear Probing",
      "Separate Chaining",
      "Quadratic Probing",
      "Double Hashing"
    ],
    correctIndex: 1,
    explanation: "Separate Chaining can handle load factors $> 1$ gracefully by growing the linked lists, whereas Open Addressing degrades rapidly as $\\alpha \\to 1$."
  },
  {
    question: "In Linear Probing, if index $i$ is occupied, where do we look next?",
    options: [
      "$i-1$",
      "$i+1$",
      "$2i$",
      "$i^2$"
    ],
    correctIndex: 1,
    explanation: "Linear probing checks the next slot sequentially: $(i+1) \\% m$."
  },
  {
    question: "What is the advantage of Double Hashing over Linear Probing?",
    options: [
      "It is simpler to implement.",
      "It produces a permutation of all table indices (if $m$ is prime), avoiding clustering.",
      "It uses less memory.",
      "It is faster to compute."
    ],
    correctIndex: 1,
    explanation: "Double hashing generates probe sequences that depend on the key, spreading keys out more evenly and avoiding clustering."
  },
  {
    question: "When deleting an element in Open Addressing, why can't we just set the slot to null?",
    options: [
      "We can.",
      "It would break the probe sequence for other keys that collided.",
      "It causes memory leaks.",
      "It resets the load factor."
    ],
    correctIndex: 1,
    explanation: "Setting to null would stop a search for a key that collided and was placed further down the probe sequence. We must use a 'tombstone' marker."
  },
  {
    question: "What is a 'tombstone' in Open Addressing?",
    options: [
      "A deleted marker that allows search to continue but allows insertion.",
      "A special key.",
      "A null value.",
      "A duplicate key."
    ],
    correctIndex: 0,
    explanation: "A tombstone indicates a deleted slot. Search treats it as occupied (continues probing), but Insert treats it as empty (can overwrite)."
  },
  {
    question: "Which collision resolution strategy is used by Java's `HashMap` (prior to JDK 8 optimization)?",
    options: [
      "Linear Probing",
      "Separate Chaining",
      "Quadratic Probing",
      "Double Hashing"
    ],
    correctIndex: 1,
    explanation: "Java's `HashMap` uses Separate Chaining with linked lists (and trees for long chains in JDK 8+)."
  }
];
