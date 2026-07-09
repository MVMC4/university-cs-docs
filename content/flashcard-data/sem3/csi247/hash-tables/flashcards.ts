export const flashcardData = [
  { front: "Hash Function", back: "A function that maps data of arbitrary size to fixed-size values (hash codes) used as array indices." },
  { front: "Collision", back: "When two distinct keys produce the exact same hash code and map to the same bucket." },
  { front: "Separate Chaining", back: "A collision resolution strategy where each bucket holds a linked list (or tree) of colliding entries." },
  { front: "Open Addressing", back: "A collision resolution strategy where all entries are stored directly within the hash table array." },
  { front: "Linear Probing", back: "Resolves collisions by sequentially searching for the next empty slot in the array." },
  { front: "Quadratic Probing", back: "Resolves collisions by probing at quadratic intervals (1^2, 2^2, 3^2) to reduce clustering." },
  { front: "Double Hashing", back: "Uses a second hash function to determine the step size when probing, virtually eliminating clustering." },
  { front: "Primary Clustering", back: "A problem in linear probing where contiguous blocks of occupied slots form, degrading performance." },
  { front: "Secondary Clustering", back: "A problem in quadratic probing where elements hashing to the same initial index follow the exact same probe sequence." },
  { front: "Load Factor", back: "The ratio of occupied entries to total buckets. Triggers a rehash when it exceeds a threshold (e.g., 0.75)." },
  { front: "Rehashing", back: "The process of doubling the table capacity and re-inserting all existing elements using the new modulo base." },
  { front: "Tombstone", back: "A special marker used in open addressing to indicate a deleted slot without breaking the probe sequence for search." },
  { front: "Bloom Filter", back: "A space-efficient probabilistic data structure that tests if an element 'might' exist or 'definitely doesn't'." },
  { front: "Consistent Hashing", back: "A technique that minimizes the remapping of keys when hash table nodes are added or removed (used in distributed systems)." },
  { front: "Zobrist Hashing", back: "A hash function used in board games (like Chess) that allows incremental updates via XOR operations." }
];