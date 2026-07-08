export const quizData = [
  {
    question: "What is the fundamental rule of the hashCode/equals contract?",
    options: [
      "If a.equals(b) is true, a.hashCode() must equal b.hashCode().",
      "If a.hashCode() equals b.hashCode(), a.equals(b) must be true.",
      "hashCode() must always return a positive integer.",
      "equals() must be faster than hashCode()."
    ],
    correctIndex: 0,
    explanation: "If two objects are logically equal, they MUST produce the same hash code. The reverse is not required (collisions are allowed)."
  },
  {
    question: "What happens if you override equals() but forget to override hashCode() in a custom Key class?",
    options: [
      "The HashMap will throw a compilation error.",
      "The HashMap will work perfectly.",
      "The HashMap will fail to find the key using get() because it inherits Object.hashCode() which returns unique memory addresses.",
      "The HashMap will automatically generate a correct hashCode() based on equals()."
    ],
    correctIndex: 2,
    explanation: "Without overriding hashCode(), the default Object.hashCode() is used, which is based on memory address. Two logically equal objects will have different hash codes and be placed in different buckets."
  },
  {
    question: "Why is returning a constant hashCode() (e.g., return 1;) technically valid but practically disastrous?",
    options: [
      "It violates the hashCode/equals contract.",
      "It forces every single object into the same bucket, degrading the HashMap into a single linked list with O(n) operations.",
      "It causes an infinite loop during rehashing.",
      "It prevents the HashMap from storing null values."
    ],
    correctIndex: 1,
    explanation: "It satisfies the contract (equal objects have the same hash), but causes maximum collisions, destroying the O(1) average time complexity."
  },
  {
    question: "What is the primary danger of using a mutable object as a HashMap key?",
    options: [
      "It consumes more memory.",
      "If the key's state changes after insertion, its hashCode() changes, and the map will look in the wrong bucket, losing the entry.",
      "It prevents the HashMap from resizing.",
      "It causes ConcurrentModificationException."
    ],
    correctIndex: 1,
    explanation: "HashMaps calculate the bucket index upon insertion. If the key mutates and its hash changes, the entry is stranded in the old bucket."
  },
  {
    question: "In the SeparateChainingHashMap implementation, where is the best place to insert a new node in the bucket's linked list?",
    options: [
      "At the tail (requires traversing the list).",
      "In the middle (requires sorting).",
      "At the head (O(1) time complexity).",
      "At a random position."
    ],
    correctIndex: 2,
    explanation: "Inserting at the head of the chain takes O(1) time and maintains the expected O(1) average time complexity for put()."
  },
  {
    question: "What triggers the resize() (rehashing) method in the SeparateChainingHashMap implementation?",
    options: [
      "When the map is empty.",
      "When the load factor (size / capacity) exceeds the threshold (e.g., 0.75).",
      "When a collision occurs.",
      "When a null key is inserted."
    ],
    correctIndex: 1,
    explanation: "Rehashing is triggered when the ratio of elements to buckets exceeds the load factor threshold to maintain O(1) performance."
  },
  {
    question: "During resize(), what happens to the existing elements?",
    options: [
      "They are deleted.",
      "They are kept in the same buckets.",
      "They are re-inserted into the new, larger table using their hashCode() and the new capacity.",
      "They are sorted before insertion."
    ],
    correctIndex: 2,
    explanation: "Because the bucket index depends on the table length (capacity), all elements must be rehashed and re-inserted into the new table."
  },
  {
    question: "Why is the `key` field in the `Node` class declared as `final`?",
    options: [
      "To make the code run faster.",
      "To prevent the key from being mutated after insertion, which would break the hashCode/equals contract.",
      "To allow the node to be serialized.",
      "It is a Java syntax requirement for generic classes."
    ],
    correctIndex: 1,
    explanation: "Making the key `final` enforces immutability at the compiler level, preventing the developer from accidentally mutating the key and losing the entry."
  },
  {
    question: "What method from `java.util` is highly recommended for implementing `hashCode()`?",
    options: [
      "`System.identityHashCode()`",
      "`Objects.hash()`",
      "`Arrays.hashCode()`",
      "`Collections.hash()`"
    ],
    correctIndex: 1,
    explanation: "`Objects.hash(Object... values)` provides a standard, well-distributed hash code based on the provided fields."
  },
  {
    question: "What method from `java.util` is highly recommended for implementing `equals()`?",
    options: [
      "`Objects.equals()`",
      "`Objects.same()`",
      "`Arrays.equals()`",
      "`Collections.equals()`"
    ],
    correctIndex: 0,
    explanation: "`Objects.equals(Object a, Object b)` safely handles null checks and delegates to the object's own equals() method."
  },
  {
    question: "If two objects have the same hashCode(), must they be equal according to equals()?",
    options: [
      "Yes, always.",
      "No, this is called a collision, and it is perfectly valid.",
      "Only if they are Strings.",
      "Only if they are in the same HashMap."
    ],
    correctIndex: 1,
    explanation: "A hash collision is when two unequal objects produce the same hash code. The HashMap handles this via chaining or probing."
  },
  {
    question: "What is the worst-case time complexity of get() if all keys hash to the same bucket?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 2,
    explanation: "If all keys collide, the bucket's linked list contains all $n$ elements, and get() must traverse the entire list, taking $O(n)$ time."
  },
  {
    question: "How does the academic SeparateChainingHashMap implementation handle a null key?",
    options: [
      "It throws a NullPointerException.",
      "It assigns it to bucket 0.",
      "It ignores the insertion.",
      "It throws an IllegalArgumentException."
    ],
    correctIndex: 1,
    explanation: "The bucketIndex() method explicitly checks `if (key == null) return 0;`, placing null keys in the first bucket."
  },
  {
    question: "In the `remove(K key)` method, why do we need to track the `prev` node?",
    options: [
      "To calculate the hash code.",
      "To update the `next` pointer of the preceding node to bypass the removed node.",
      "To check for concurrent modifications.",
      "To resize the table."
    ],
    correctIndex: 1,
    explanation: "In a singly linked list, you cannot delete a node without a reference to the node immediately before it, so you can update `prev.next = current.next`."
  },
  {
    question: "What is the time complexity of the resize() operation?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "Resize() must iterate through all $n$ existing elements and re-insert them into the new table, taking linear time. However, it happens rarely enough that the amortized cost of put() remains $O(1)$."
  }
];