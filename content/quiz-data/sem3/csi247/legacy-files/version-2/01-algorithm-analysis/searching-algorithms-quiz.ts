export const quizData = [
  {
    question: "What is the worst-case time complexity of Linear Search?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "In the worst case (the element is not in the array or is at the very end), Linear Search must check every single element, resulting in $O(n)$ time."
  },
  {
    question: "What is the primary prerequisite for using Binary Search?",
    options: ["The array must be of even length.", "The array must be sorted.", "The array must contain only integers.", "The array must be stored in a linked list."],
    correctIndex: 1,
    explanation: "Binary Search relies on the ability to eliminate half of the remaining elements at each step, which is only possible if the array is sorted."
  },
  {
    question: "In the Binary Search code, why do we use `mid = low + (high - low) / 2` instead of `mid = (low + high) / 2`?",
    options: ["It is computationally faster.", "It prevents integer overflow if `low + high` exceeds the maximum representable value for an `int`.", "It handles negative numbers correctly.", "It ensures `mid` is always an odd number."],
    correctIndex: 1,
    explanation: "If `low` and `high` are both large, their sum can overflow the 32-bit signed integer limit, resulting in a negative `mid`. The alternative formula prevents this."
  },
  {
    question: "What is the best-case time complexity of Binary Search?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 0,
    explanation: "If the target element happens to be exactly at the `mid` index on the very first check, the algorithm terminates immediately in $O(1)$ time."
  },
  {
    question: "In the Linear Search loop invariant, what does the invariant state before the first iteration?",
    options: ["The entire array does not contain the key.", "The subarray `A[0..-1]` is empty and trivially does not contain the key.", "The key is at index 0.", "The array is sorted."],
    correctIndex: 1,
    explanation: "Before the loop starts, `i = 0`. The subarray `A[0..-1]` is empty, so the statement 'it does not contain the key' is vacuously true."
  },
  {
    question: "In the Binary Search loop invariant, what happens when `low > high`?",
    options: ["The search space is empty, meaning the key is definitively not in the array.", "The algorithm has found the key.", "The array is unsorted.", "An infinite loop occurs."],
    correctIndex: 0,
    explanation: "The invariant states that if the key exists, it is in `A[low..high]`. If `low > high`, this subarray is empty, proving the key cannot exist in the array."
  },
  {
    question: "If a Linear Search algorithm checks 100 elements and doesn't find the key, how many comparisons were made?",
    options: ["50", "99", "100", "101"],
    correctIndex: 2,
    explanation: "Linear Search checks each element exactly once. If it checks 100 elements and finds nothing, it made exactly 100 comparisons."
  },
  {
    question: "What is the maximum number of iterations the `while` loop in Binary Search will execute for an array of size 1024?",
    options: ["10", "11", "512", "1024"],
    correctIndex: 1,
    explanation: "The maximum number of iterations is $\\lfloor \\log_2 n \\rfloor + 1$. For $n = 1024$, $\\log_2(1024) = 10$, so the maximum iterations are $10 + 1 = 11$."
  },
  {
    question: "Which search algorithm is more efficient for a single search in a small, unsorted array of 10 elements?",
    options: ["Binary Search", "Linear Search", "Both are equally efficient", "Neither will work"],
    correctIndex: 1,
    explanation: "Binary Search requires the array to be sorted. Sorting a 10-element array takes $O(n \\log n)$ time, which is slower than just doing a single $O(n)$ Linear Search."
  },
  {
    question: "What is the space complexity of the iterative Binary Search implementation provided?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 0,
    explanation: "The iterative version only uses a few primitive variables (`low`, `high`, `mid`), requiring constant $O(1)$ auxiliary space."
  },
  {
    question: "In the Binary Search maintenance step, if `A[mid] < key`, why do we set `low = mid + 1`?",
    options: ["Because `A[mid]` might be the key.", "Because the array is sorted, so all elements in `A[low..mid]` are strictly less than `key`.", "To prevent an infinite loop.", "Because `high` must be greater than `low`."],
    correctIndex: 1,
    explanation: "Since the array is sorted and `A[mid]` is less than the key, the key cannot possibly be in the left half (including `mid`). We safely discard `A[low..mid]`."
  },
  {
    question: "What does the 'Termination' step of a loop invariant proof demonstrate?",
    options: ["That the loop will eventually stop running.", "That when the loop ends, the invariant combined with the termination condition proves the algorithm's correctness.", "That the array is fully sorted.", "That no infinite loops exist in the codebase."],
    correctIndex: 1,
    explanation: "Termination shows that upon exiting the loop, the invariant and the reason the loop stopped together guarantee the algorithm achieved its goal."
  },
  {
    question: "If an array is sorted, which search algorithm guarantees $O(\\log n)$ time complexity in the worst case?",
    options: ["Linear Search", "Binary Search", "Jump Search", "Fibonacci Search"],
    correctIndex: 1,
    explanation: "Binary Search systematically halves the search space at each step, guaranteeing a worst-case time complexity of $O(\\log n)$."
  },
  {
    question: "In the context of Computational Complexity, what does the 'P vs. NP' problem primarily question?",
    options: ["Whether all algorithms can be written in Java.", "Whether every problem whose solution can be quickly verified can also be quickly solved.", "Whether $O(n \\log n)$ is the fastest possible sorting time.", "Whether P=NP is an NP-Complete problem."],
    correctIndex: 1,
    explanation: "P vs. NP asks if the class of problems solvable in polynomial time (P) is equal to the class of problems verifiable in polynomial time (NP)."
  },
  {
    question: "Why is Linear Search generally preferred over Binary Search for a Linked List?",
    options: ["Linked lists are always sorted.", "Binary Search requires $O(1)$ random access to calculate `mid`, which Linked Lists do not support.", "Linear Search is faster in the worst case.", "Linked lists cannot store integers."],
    correctIndex: 1,
    explanation: "Binary Search relies on jumping to the middle of the data structure in $O(1)$ time. In a Linked List, finding the middle takes $O(n)$ time, making Binary Search $O(n \\log n)$, which is worse than Linear Search's $O(n)$."
  }
];