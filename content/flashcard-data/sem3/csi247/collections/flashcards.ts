export const flashcardData = [
  { front: "ArrayList vs LinkedList", back: "ArrayList: O(1) random access, O(N) middle insert. LinkedList: O(N) access, O(1) insert (if node reference is known). ArrayList has better cache locality." },
  { front: "HashSet vs TreeSet", back: "HashSet: O(1) ops, unordered, backed by HashMap. TreeSet: O(log N) ops, sorted (Red-Black Tree), requires Comparable." },
  { front: "HashMap Collision Resolution", back: "Java 8+ uses Separate Chaining with Linked Lists. If a bucket exceeds 8 nodes (and capacity >= 64), it treeifies into a Red-Black Tree (O(log N) worst case)." },
  { front: "Fail-Fast Iterator", back: "Throws ConcurrentModificationException if the collection is structurally modified outside the iterator's own remove() method. Uses a modCount check." },
  { front: "HashMap Load Factor", back: "Default is 0.75. When size exceeds capacity * load_factor, the map resizes (doubles) and rehashes all entries." },
  { front: "Comparable vs Comparator", back: "Comparable: Natural ordering, defined inside the class (compareTo). Comparator: Custom ordering, defined outside the class (compare)." },
  { front: "ConcurrentHashMap", back: "Thread-safe Map. Java 8+ uses CAS and synchronized blocks on specific buckets (nodes) rather than locking the entire map, allowing high concurrency." },
  { front: "LinkedHashMap", back: "Maintains insertion order by default. If accessOrder=true is passed to constructor, it maintains LRU (Least Recently Used) order." }
];