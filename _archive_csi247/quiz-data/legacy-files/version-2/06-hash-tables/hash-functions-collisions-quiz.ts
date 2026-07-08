export const quizData = [
  {
    question: "What is the primary purpose of a hash function in a hash table?",
    options: [
      "To encrypt the data.",
      "To map a key to an index in the array.",
      "To sort the keys.",
      "To compress the data."
    ],
    correctIndex: 1,
    explanation: "A hash function converts a potentially large or complex key into a fixed-size integer index for array access."
  },
  {
    question: "What property ensures that the same key always produces the same hash code?",
    options: [
      "Uniformity",
      "Determinism",
      "Efficiency",
      "Randomness"
    ],
    correctIndex: 1,
    explanation: "Determinism is required so that we can retrieve the value later using the same key."
  },
  {
    question: "Why is the number 31 used in Java's String hashCode()?",
    options: [
      "It is the largest prime less than 32.",
      "It allows the JVM to optimize multiplication as `(i << 5) - i`.",
      "It is the ASCII value of a space.",
      "It is a magic number with no specific reason."
    ],
    correctIndex: 1,
    explanation: "31 is an odd prime that allows the JIT compiler to replace multiplication with a bit shift and subtraction, which is faster."
  },
  {
    question: "What is a collision in the context of hash tables?",
    options: [
      "When two keys have the same value.",
      "When two different keys map to the same array index.",
      "When the hash table is full.",
      "When the hash function returns a negative number."
    ],
    correctIndex: 1,
    explanation: "Collisions are inevitable when the number of possible keys exceeds the number of buckets (Pigeonhole Principle)."
  },
  {
    question: "Which of the following is NOT a desirable property of a hash function?",
    options: [
      "Uniform distribution",
      "Deterministic",
      "High collision rate",
      "Fast computation"
    ],
    correctIndex: 2,
    explanation: "A good hash function should minimize collisions, not maximize them."
  },
  {
    question: "What is the result of `hash(key) % capacity`?",
    options: [
      "The key itself.",
      "The hash code.",
      "The bucket index.",
      "The load factor."
    ],
    correctIndex: 2,
    explanation: "The modulo operator ensures the hash code fits within the bounds of the array (0 to capacity-1)."
  },
  {
    question: "If a hash function distributes keys perfectly uniformly, what is the expected number of keys per bucket?",
    options: [
      "0",
      "1",
      "$n/m$ (Load Factor)",
      "$m/n$"
    ],
    correctIndex: 2,
    explanation: "Uniform distribution means keys are spread evenly, so each bucket holds approximately $n/m$ keys."
  },
  {
    question: "Why is it important for a hash function to be fast?",
    options: [
      "To save memory.",
      "Because it is called for every insert, search, and delete operation.",
      "To prevent collisions.",
      "To ensure determinism."
    ],
    correctIndex: 1,
    explanation: "Hash tables aim for $O(1)$ operations. If the hash function is slow (e.g., $O(n)$), the overall performance degrades."
  },
  {
    question: "What happens if a hash function returns the same value for all keys?",
    options: [
      "The hash table becomes an array.",
      "The hash table degenerates into a linked list (or single bucket).",
      "The hash table crashes.",
      "The keys are sorted automatically."
    ],
    correctIndex: 1,
    explanation: "If all keys map to index 0, all elements are stored in bucket 0, and operations degrade to $O(n)$ linear search."
  },
  {
    question: "In Java, what is the return type of `hashCode()`?",
    options: [
      "String",
      "Object",
      "int",
      "long"
    ],
    correctIndex: 2,
    explanation: "The `hashCode()` method returns a 32-bit signed integer."
  },
  {
    question: "Can two different objects have the same hash code?",
    options: [
      "No, never.",
      "Yes, this is a collision.",
      "Only if they are equal.",
      "Only if they are Strings."
    ],
    correctIndex: 1,
    explanation: "Yes, collisions are possible and expected. The hash table must handle them via chaining or probing."
  },
  {
    question: "If `key1.equals(key2)` is true, what must be true about their hash codes?",
    options: [
      "They must be different.",
      "They must be the same.",
      "They can be anything.",
      "One must be negative."
    ],
    correctIndex: 1,
    explanation: "The contract for `hashCode()` states that if two objects are equal, they must have the same hash code."
  },
  {
    question: "What is the Pigeonhole Principle in the context of hashing?",
    options: [
      "It states that hash tables must be prime-sized.",
      "It states that if there are more keys than buckets, at least two keys must map to the same bucket.",
      "It states that collisions are impossible.",
      "It states that hash functions must be deterministic."
    ],
    correctIndex: 1,
    explanation: "Since the set of possible keys is usually infinite (or very large) and buckets are finite, collisions are mathematically guaranteed."
  },
  {
    question: "Which of the following is a bad hash function for integers?",
    options: [
      "$h(k) = k \\% m$",
      "$h(k) = 0$",
      "$h(k) = (a \\cdot k + b) \\% m$",
      "$h(k) = k^2 \\% m$"
    ],
    correctIndex: 1,
    explanation: "$h(k) = 0$ maps everything to bucket 0, causing maximum collisions and $O(n)$ performance."
  },
  {
    question: "Why is it important to override `equals()` when overriding `hashCode()`?",
    options: [
      "It is not important.",
      "To ensure that objects that are equal have the same hash code, satisfying the contract.",
      "To make the object immutable.",
      "To improve performance."
    ],
    correctIndex: 1,
    explanation: "The general contract requires that if `a.equals(b)`, then `a.hashCode() == b.hashCode()`. Failing to do so breaks hash-based collections."
  }
];