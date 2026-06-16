export const quizData = [
  {
    question: "What is 'type erasure' in Java?",
    options: ["The JVM removes generic types at runtime to save memory.", "The compiler removes all type parameters, replacing them with their bounds or Object.", "The process of converting generic collections to raw types.", "The removal of invalid generic type declarations during compilation."],
    correctIndex: 1,
    explanation: "Type erasure is a compile-time process where the compiler erases all type parameters to maintain backward compatibility with pre-Java 5 code."
  },
  {
    question: "What does an unbounded type parameter `<T>` erase to?",
    options: ["`Object`", "`Class`", "`T`", "`Void`"],
    correctIndex: 0,
    explanation: "An unbounded type parameter `<T>` has no explicit bound, so it defaults to erasing to `Object`."
  },
  {
    question: "Why is generic array creation (e.g., `new T[]`) illegal in Java?",
    options: ["Because arrays are slower than ArrayLists.", "Because arrays are reified (enforce type at runtime), but generics are erased (do not exist at runtime).", "Because the JVM does not support arrays of objects.", "Because it would cause a stack overflow."],
    correctIndex: 1,
    explanation: "Arrays know their component type at runtime and enforce it. Since generics are erased, the JVM wouldn't know the actual type to enforce, leading to heap pollution."
  },
  {
    question: "What is the standard workaround to implement a generic array inside a class like `ArrayList`?",
    options: ["`T[] arr = new T[10];`", "`Object[] arr = new Object[10];` and cast to `T[]` when necessary.", "`T[] arr = (T[]) Arrays.newInstance(10);`", "You cannot use arrays with generics at all."],
    correctIndex: 1,
    explanation: "You must allocate an `Object` array and cast it to `T[]`, typically suppressing the unchecked warning since the array is kept private."
  },
  {
    question: "What annotation is required to suppress the compiler warning when casting an `Object[]` to `T[]`?",
    options: ["`@Override`", "`@Deprecated`", "`@SuppressWarnings(\"unchecked\")`", "`@SafeVarargs`"],
    correctIndex: 2,
    explanation: "The cast from `Object[]` to `T[]` is an unchecked cast at compile time, so `@SuppressWarnings(\"unchecked\")` is required to silence the warning."
  },
  {
    question: "What does the PECS acronym stand for in Java Generics?",
    options: ["Producer Extends, Consumer Super", "Private Extends, Class Super", "Producer Exception, Consumer Super", "Parameter Extends, Class Super"],
    correctIndex: 0,
    explanation: "PECS stands for Producer Extends, Consumer Super, a mnemonic for using bounded wildcards correctly."
  },
  {
    question: "According to PECS, which wildcard should you use if a method only READS from a collection?",
    options: ["`<? super T>`", "`<? extends T>`", "`<?>`", "`<T>`"],
    correctIndex: 1,
    explanation: "If the collection is a 'producer' (you only read from it), use `<? extends T>` to guarantee the elements are at least of type `T`."
  },
  {
    question: "According to PECS, which wildcard should you use if a method only WRITES to a collection?",
    options: ["`<? super T>`", "`<? extends T>`", "`<?>`", "`<T>`"],
    correctIndex: 0,
    explanation: "If the collection is a 'consumer' (you only write to it), use `<? super T>` to guarantee the collection can accept objects of type `T`."
  },
  {
    question: "Why does `list.add(10)` cause a compilation error if `list` is declared as `List<? extends Number>`?",
    options: ["Because `10` is an `int`, not an `Integer`.", "Because the compiler only knows the list contains some unknown subtype of `Number`, so it cannot guarantee adding an `Integer` is safe.", "Because `? extends Number` makes the list immutable.", "Because `Number` is an abstract class."],
    correctIndex: 1,
    explanation: "The list could be a `List<Double>` or `List<Float>`. The compiler forbids the addition because it cannot guarantee type safety for the unknown subtype."
  },
  {
    question: "If you have a `List<? super Integer>`, which of the following additions is guaranteed to be type-safe?",
    options: ["Adding a `Double`.", "Adding an `Integer`.", "Adding a `Number`.", "Adding an `Object`."],
    correctIndex: 1,
    explanation: "`? super Integer` means the list is of type `Integer` or a supertype (like `Number` or `Object`). Therefore, adding an `Integer` is always safe."
  },
  {
    question: "At runtime, what is the relationship between `List<String>` and `List<Integer>`?",
    options: ["They are distinct classes with different memory layouts.", "They are the exact same class (`List`).", "They share a common superclass `GenericList`.", "They are incompatible types that cannot be compared."],
    correctIndex: 1,
    explanation: "Because of type erasure, all instantiations of a generic type point to the same runtime class."
  },
  {
    question: "Can you use the `instanceof` operator with generic types, e.g., `obj instanceof List<String>`?",
    options: ["Yes, it works exactly like with raw types.", "No, because generic type information is erased at runtime.", "Only if the type is bounded.", "Only if the object is not null."],
    correctIndex: 1,
    explanation: "Due to type erasure, the JVM does not know the difference between `List<String>` and `List<Integer>` at runtime, so `instanceof` with generics is illegal."
  },
  {
    question: "What exception prevents storing the wrong type in a reified array (e.g., `String[] arr = new String[10]; arr[0] = new Integer(5);`)?",
    options: ["`ClassCastException`", "`ArrayStoreException`", "`IllegalArgumentException`", "`UnsupportedOperationException`"],
    correctIndex: 1,
    explanation: "Because arrays are reified, the JVM checks the type at runtime and throws an `ArrayStoreException` if you try to store an incompatible type."
  },
  {
    question: "Why is the generic array workaround (`(T[]) new Object[10]`) considered safe if the array is kept `private`?",
    options: ["Because the JVM automatically converts the types.", "Because the client code cannot access the array directly to insert incompatible types, preserving the type invariant.", "Because `Object` is a superclass of all generic types.", "It is not safe; it always causes runtime errors."],
    correctIndex: 1,
    explanation: "If the array is `private`, the class controls all access. As long as the class only inserts objects of type `T`, the type safety is maintained despite the internal `Object[]` cast."
  },
  {
    question: "Which of the following method signatures correctly applies PECS for a method that copies elements from a source list to a destination list?",
    options: ["`void copy(List<T> src, List<T> dest)`", "`void copy(List<? extends T> src, List<? super T> dest)`", "`void copy(List<? super T> src, List<? extends T> dest)`", "`void copy(List<T> src, List<? extends T> dest)`"],
    correctIndex: 1,
    explanation: "The source list is a producer (we read from it), so it uses `? extends T`. The destination list is a consumer (we write to it), so it uses `? super T`."
  }
];