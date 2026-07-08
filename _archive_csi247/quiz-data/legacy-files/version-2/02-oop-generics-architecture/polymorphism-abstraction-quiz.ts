export const quizData = [
  {
    question: "What is the Liskov Substitution Principle (LSP)?",
    options: [
      "Subclasses must override all methods of the superclass.",
      "Objects of a superclass shall be replaceable with objects of its subclasses without breaking the application.",
      "A class can only extend one abstract class.",
      "Interfaces cannot have method implementations."
    ],
    correctIndex: 1,
    explanation: "LSP states that subtypes must be substitutable for their base types without altering the correctness of the program."
  },
  {
    question: "What is the primary difference between an abstract class and an interface regarding state?",
    options: [
      "Interfaces can maintain instance state, while abstract classes cannot.",
      "Abstract classes can maintain instance state (fields), while interfaces traditionally cannot.",
      "Both can maintain instance state.",
      "Neither can maintain instance state."
    ],
    correctIndex: 1,
    explanation: "Abstract classes can have instance fields to maintain state. Interfaces can only have static final constants."
  },
  {
    question: "How does Java support multiple inheritance?",
    options: [
      "A class can extend multiple abstract classes.",
      "A class can implement multiple interfaces.",
      "A class can extend one class and implement multiple interfaces.",
      "Java does not support any form of multiple inheritance."
    ],
    correctIndex: 2,
    explanation: "Java allows a class to extend exactly one superclass (abstract or concrete) but implement any number of interfaces."
  },
  {
    question: "Why does the Square/Rectangle example violate LSP?",
    options: [
      "Because Square has fewer methods than Rectangle.",
      "Because Square strengthens the precondition by forcing width to equal height, breaking client expectations.",
      "Because Rectangle cannot be instantiated.",
      "Because Square does not inherit from Object."
    ],
    correctIndex: 1,
    explanation: "A Square enforces width = height, which violates the postcondition of Rectangle's setWidth/setHeight methods, causing incorrect behavior for clients expecting a Rectangle."
  },
  {
    question: "Can an abstract class have constructors?",
    options: [
      "No, abstract classes cannot be instantiated.",
      "Yes, but they can only be called by subclasses via super().",
      "Yes, and they can be called directly using the 'new' keyword.",
      "Only if the abstract class has no abstract methods."
    ],
    correctIndex: 1,
    explanation: "Abstract classes can have constructors to initialize their fields, but they are invoked by the constructors of their concrete subclasses."
  },
  {
    question: "Prior to Java 8, what kind of methods could an interface declare?",
    options: [
      "Default methods with implementations.",
      "Static methods.",
      "Only abstract methods (no implementation).",
      "Private methods."
    ],
    correctIndex: 2,
    explanation: "Before Java 8, interfaces could only declare abstract methods. Default and static methods were introduced in Java 8."
  },
  {
    question: "What does the 'L' in the SOLID principles stand for?",
    options: [
      "Loose Coupling Principle",
      "Liskov Substitution Principle",
      "Law of Demeter",
      "Lazy Initialization Principle"
    ],
    correctIndex: 1,
    explanation: "The 'L' stands for the Liskov Substitution Principle, formulated by Barbara Liskov."
  },
  {
    question: "Can an abstract class be instantiated directly using the 'new' keyword?",
    options: [
      "Yes, if all its abstract methods are implemented in an anonymous class.",
      "No, it must be subclassed and the subclass must be instantiated.",
      "Yes, using reflection.",
      "Only if it has no abstract methods."
    ],
    correctIndex: 1,
    explanation: "Abstract classes are incomplete by definition and cannot be instantiated directly. You must create a concrete subclass."
  },
  {
    question: "Can an interface have instance (non-static) fields?",
    options: [
      "Yes, they are implicitly public.",
      "No, all fields in an interface are implicitly public, static, and final.",
      "Yes, if they are marked as private.",
      "Only if the interface is marked as abstract."
    ],
    correctIndex: 1,
    explanation: "Interfaces cannot maintain instance state. Any field declared in an interface is automatically public, static, and final (a constant)."
  },
  {
    question: "If a subclass overrides a method and strengthens its precondition (requires more restrictive inputs), what principle is violated?",
    options: [
      "Open/Closed Principle",
      "Single Responsibility Principle",
      "Liskov Substitution Principle",
      "Dependency Inversion Principle"
    ],
    correctIndex: 2,
    explanation: "Strengthening preconditions violates LSP because the subclass becomes less permissive than the superclass, breaking client code that relies on the superclass's contract."
  },
  {
    question: "What is 'behavioral subtyping'?",
    options: [
      "Subtyping based solely on the method signatures.",
      "Subtyping where the subclass adheres to the behavioral contract (pre/postconditions) of the superclass.",
      "Subtyping that allows the subclass to change the return type of methods.",
      "Subtyping that requires the subclass to implement all interfaces of the superclass."
    ],
    correctIndex: 1,
    explanation: "Behavioral subtyping means the subclass must not only match the structure (signatures) but also the behavior (contract) of the superclass, which is the essence of LSP."
  },
  {
    question: "Can a class extend multiple abstract classes in Java?",
    options: [
      "Yes, using the 'implements' keyword.",
      "No, Java only supports single inheritance for classes.",
      "Yes, if they are in the same package.",
      "Yes, if they are interfaces."
    ],
    correctIndex: 1,
    explanation: "Java enforces single inheritance for classes. A class can only extend one abstract (or concrete) class."
  },
  {
    question: "What is the purpose of the 'abstract' keyword on a method?",
    options: [
      "It makes the method run faster.",
      "It forces any concrete subclass to provide an implementation for the method.",
      "It prevents the method from being overridden.",
      "It makes the method static."
    ],
    correctIndex: 1,
    explanation: "An abstract method has no implementation in the superclass and mandates that all concrete subclasses must override and implement it."
  },
  {
    question: "If a concrete class implements an interface but fails to implement all of its abstract methods, what must happen?",
    options: [
      "The code will compile, but throw a runtime error.",
      "The class must be declared as abstract.",
      "The compiler automatically provides empty implementations.",
      "The interface methods are ignored."
    ],
    correctIndex: 1,
    explanation: "If a class does not implement all interface methods, it remains incomplete and must be declared abstract."
  },
  {
    question: "Which of the following best describes the 'Rule of Thumb' for choosing between an interface and an abstract class?",
    options: [
      "Use interfaces for core identity, abstract classes for capabilities.",
      "Use interfaces to define a role or capability, abstract classes to share core identity and implementation.",
      "Always use interfaces to avoid the limits of single inheritance.",
      "Always use abstract classes because they are more flexible."
    ],
    correctIndex: 1,
    explanation: "Interfaces are best for defining unrelated capabilities (e.g., Comparable, Iterable), while abstract classes are for sharing core implementation among closely related classes."
  }
];