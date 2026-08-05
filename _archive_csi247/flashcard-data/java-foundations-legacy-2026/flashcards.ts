export const flashcardData = [
  { front: "Abstract Class", back: "A class that cannot be instantiated and may contain abstract methods without implementations." },
  { front: "Interface", back: "A contract that defines methods a class must implement. Supports multiple inheritance of type." },
  { front: "Polymorphism", back: "The ability of a variable, method, or object to take on multiple forms (Compile-time overloading vs Runtime overriding)." },
  { front: "Type Erasure", back: "The process where the Java compiler removes generic type information at compile-time to maintain backward compatibility." },
  { front: "PECS Principle", back: "Producer Extends, Consumer Super. A guideline for using wildcards in Java generics." },
  { front: "PriorityQueue", back: "An unbounded priority queue based on a priority heap. Elements are ordered by natural ordering or a custom Comparator." },
  { front: "Comparator vs Comparable", back: "Comparable defines natural ordering (compareTo), while Comparator defines custom ordering (compare) externally." },
  { front: "Volatile keyword", back: "Ensures a variable's value is always read from and written to main memory, guaranteeing visibility across threads." },
  { front: "Transient keyword", back: "Indicates that a field should not be serialized when the object is converted to a byte stream." },
  { front: "Marker Interface", back: "An empty interface (e.g., Serializable, Cloneable) used to signal the compiler/JVM to apply special behavior." },
  { front: "String Pool", back: "A special memory region in the Heap where Java stores literal string objects to save memory and allow reference equality." },
  { front: "Autoboxing", back: "The automatic conversion the compiler makes between primitive types and their corresponding object wrapper classes." },
  { front: "Generic Bounds", back: "Restrictions on the types that can be passed as generic parameters (e.g., <T extends Number>)." },
  { front: "Reflection API", back: "Allows code to inspect and modify its own structure and behavior at runtime, often bypassing access modifiers." },
  { front: "Deep vs Shallow Copy", back: "Shallow copy duplicates references (objects are shared). Deep copy recursively duplicates the actual objects in memory." }
];