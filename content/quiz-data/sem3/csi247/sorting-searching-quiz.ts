export const quizData = [
  {
    question: "What is the time complexity of Linear Search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 2,
    explanation: "Linear Search checks each element one by one, so in the worst case it checks all n elements."
  },
  {
    question: "Binary Search requires the array to be:",
    options: ["Unsorted", "Sorted", "Rotated", "Reversed"],
    correctIndex: 1,
    explanation: "Binary Search works by dividing the search space in half, which only works on sorted data."
  },
  {
    question: "Which sorting algorithm is simplest to understand?",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Heap Sort"],
    correctIndex: 2,
    explanation: "Bubble Sort is the simplest - just repeatedly swap adjacent elements if they're in the wrong order."
  },
  {
    question: "What is the best-case time complexity of Bubble Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctIndex: 0,
    explanation: "With optimization (checking if any swaps occurred), Bubble Sort achieves O(n) when the array is already sorted."
  },
  {
    question: "Which sorting algorithm is best for nearly sorted data?",
    options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
    correctIndex: 2,
    explanation: "Insertion Sort achieves O(n) time complexity when the array is nearly sorted."
  },
  {
    question: "What is the time complexity of Merge Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctIndex: 1,
    explanation: "Merge Sort always has O(n log n) time complexity - it divides the array in half and merges sorted halves."
  },
  {
    question: "Which algorithm is fastest on average for large datasets?",
    options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
    correctIndex: 1,
    explanation: "Quick Sort has O(n log n) average case and is fastest in practice for general-purpose sorting."
  },
  {
    question: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctIndex: 2,
    explanation: "Quick Sort degrades to O(n²) when the pivot is always the smallest or largest element."
  },
  {
    question: "Which sorting algorithm uses the least extra memory?",
    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"],
    correctIndex: 2,
    explanation: "Heap Sort uses O(1) extra space (in-place), while Merge Sort needs O(n) extra space."
  },
  {
    question: "How many comparisons does Binary Search need for 1 million items?",
    options: ["10", "20", "100", "1000"],
    correctIndex: 1,
    explanation: "Binary Search needs log₂(1,000,000) ≈ 20 comparisons - incredibly fast!"
  },
  {
    question: "Which algorithm works like sorting cards in your hand?",
    options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"],
    correctIndex: 2,
    explanation: "Insertion Sort works like sorting playing cards - you pick up one card at a time and insert it in the correct position."
  },
  {
    question: "What does 'stable sort' mean?",
    options: ["Fast sorting", "Preserves order of equal elements", "Uses less memory", "Works on any data"],
    correctIndex: 1,
    explanation: "A stable sort preserves the relative order of elements with equal keys."
  },
  {
    question: "Which sorting algorithm is NOT stable?",
    options: ["Merge Sort", "Insertion Sort", "Quick Sort", "Bubble Sort"],
    correctIndex: 2,
    explanation: "Quick Sort is not stable because swapping can change the relative order of equal elements."
  },
  {
    question: "When should you use Linear Search instead of Binary Search?",
    options: ["Always", "When data is small or unsorted", "When data is sorted", "Never"],
    correctIndex: 1,
    explanation: "Linear Search is better for small datasets or when the data is not sorted."
  },
  {
    question: "What is the main advantage of Binary Search over Linear Search?",
    options: ["Simpler code", "Much faster for large data", "Works on unsorted data", "Uses less memory"],
    correctIndex: 1,
    explanation: "Binary Search is O(log n) vs Linear Search's O(n) - for 1 billion items, Binary Search needs only 30 checks vs 1 billion!"
  },
  {
    question: "Which algorithm divides the array in half recursively?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correctIndex: 2,
    explanation: "Merge Sort divides the array in half, sorts each half, then merges them back together."
  },
  {
    question: "What is a 'pivot' in Quick Sort?",
    options: ["The first element", "An element used to partition the array", "The middle element", "The last element"],
    correctIndex: 1,
    explanation: "The pivot is an element used to partition the array - elements smaller go left, larger go right."
  },
  {
    question: "Which sorting algorithm would you use for 10 items?",
    options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
    correctIndex: 2,
    explanation: "For small datasets (n < 50), Insertion Sort is simple and fast enough."
  },
  {
    question: "What is the space complexity of Merge Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Merge Sort requires O(n) extra space for the temporary arrays used during merging."
  },
  {
    question: "Which real-world example matches Binary Search?",
    options: ["Looking for keys room by room", "Looking up a word in a dictionary", "Sorting books on a shelf", "Organizing a deck of cards"],
    correctIndex: 1,
    explanation: "Looking up a word in a dictionary - you open to the middle and go forward or backward based on alphabetical order."
  }
];