export const quizData = [
  {
    question: "Which of the following is a primitive data type in Java?",
    options: ["String", "Integer", "int", "ArrayList"],
    correctIndex: 2,
    explanation: "`int` is a primitive type. `String`, `Integer`, and `ArrayList` are reference types (objects)."
  },
  {
    question: "What happens when you cast double 9.78 to int?",
    options: ["It rounds to 10", "It truncates to 9", "It causes an error", "It becomes 9.78"],
    correctIndex: 1,
    explanation: "Narrowing cast truncates (cuts off) the decimal part without rounding."
  },
  {
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "for-each"],
    correctIndex: 2,
    explanation: "A do-while loop checks the condition AFTER executing, guaranteeing at least one iteration."
  },
  {
    question: "What is the default value of int array elements?",
    options: ["null", "undefined", "0", "-1"],
    correctIndex: 2,
    explanation: "Numeric primitives default to 0. Reference types default to null."
  },
  {
    question: "Where are Java objects stored in memory?",
    options: ["Stack", "Heap", "Both Stack and Heap", "Register"],
    correctIndex: 1,
    explanation: "Objects live in the Heap. The Stack only holds references (memory addresses) to them."
  },
  {
    question: "Which access modifier allows same-package AND subclass access?",
    options: ["public", "private", "protected", "default"],
    correctIndex: 2,
    explanation: "Protected allows access within the same package AND subclasses in other packages."
  },
  {
    question: "What does method overloading demonstrate?",
    options: ["Encapsulation", "Inheritance", "Compile-time polymorphism", "Abstraction"],
    correctIndex: 2,
    explanation: "Overloading (same name, different params) is compile-time/static polymorphism."
  },
  {
    question: "What is the purpose of the 'this' keyword?",
    options: ["Access parent class", "Reference current object", "Create static methods", "Import packages"],
    correctIndex: 1,
    explanation: "'this' refers to the current instance of the class."
  },
  {
    question: "Can an abstract class be instantiated?",
    options: ["Yes, always", "No, never", "Only with new keyword", "Only if it has a constructor"],
    correctIndex: 1,
    explanation: "Abstract classes cannot be instantiated directly. You must create a concrete subclass."
  },
  {
    question: "What does <? extends Number> mean?",
    options: ["Any type", "Number or its subclasses", "Number or its superclasses", "Only Number type"],
    correctIndex: 1,
    explanation: "Upper bounded wildcard: accepts Number, Integer, Double, Float, etc."
  }
];