export const flashcardData = [
  { front: "Big-O Notation", back: "Describes how the running time of an algorithm grows as the input size $N$ grows."},
  { front: "O(1)", back: "Constant time. The operation does not depend on the input size. Example: accessing an array element by index."},
  { front: "O(N)", back: "Linear time. The operation grows directly with the input size. Example: looping through an array once."},
  { front: "O(N^2)", back: "Quadratic time. Usually caused by nested loops over the same input. Example: comparing every pair of elements."},
  { front: "O(log N)", back: "Logarithmic time. The problem is reduced by half at each step. Example: binary search on a sorted array."},
  { front: "Worst Case", back: "The maximum amount of time an algorithm can take for any input of size $N$."},
  { front: "Single Loop", back: "A single loop over $N$ elements usually gives $O(N)$ time complexity."},
  { front: "Nested Loops", back: "Two nested loops over $N$ elements usually give $O(N^2)$ time complexity."},
  { front: "Array Access by Index", back: "Accessing an array element using its index takes $O(1)$ time."},
  { front: "Linear Search Time", back: "Linear search checks elements one by one, so its worst-case time is $O(N)$."},
];
