export const quizData = [
  {
    question: "What is the definition of a 'stable' sorting algorithm?",
    options: ["It always runs in $O(n \\log n)$ time.", "It preserves the relative order of elements with equal keys.", "It does not require any auxiliary memory.", "It guarantees no worst-case $O(n^2)$ behavior."],
    correctIndex: 1,
    explanation: "A stable sort ensures that if two elements are equal, their original relative order is maintained in the sorted output."
  },
  {
    question: "Which of the following sorting algorithms is STABLE?",
    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
    correctIndex: 2,
    explanation: "Merge Sort (when implemented with `<=` in the merge step) and Insertion Sort are stable. Quick Sort and Heap Sort are inherently unstable."
  },
  {
    question: "What is the best-case time complexity of Insertion Sort?",
    options: ["$O(1)$", "$O(n)$", "$O(n \\log n)$", "$O(n^2)$"],
    correctIndex: 1,
    explanation: "If the array is already sorted, the inner `while` loop condition is immediately false, resulting in exactly $n-1$ comparisons and 0 shifts, yielding $O(n)$ time."
  },
  {
    question: "Why is Insertion Sort particularly well-suited for 'nearly sorted' arrays?",
    options: ["It uses a priority queue.", "It partitions the array recursively.", "The inner loop executes very few times per element, approaching $O(n)$ total time.", "It merges small sorted subarrays efficiently."],
    correctIndex: 2,
    explanation: "In a nearly sorted array, each element only needs to be shifted a few positions to the right, making the number of inner loop iterations very small."
  },
  {
    question: "In the Merge Sort `merge` method, what specific comparison ensures the algorithm remains stable?",
    options: ["`L[i] < R[j]`", "`L[i] <= R[j]`", "`L[i] > R[j]`", "`L[i] == R[j]`"],
    correctIndex: 1,
    explanation: "Using `<=` ensures that if `L[i]` and `R[j]` are equal, the element from the left half (`L[i]`) is placed in the merged array first, preserving their original relative order."
  },
  {
    question: "What is the auxiliary space complexity of the standard Merge Sort algorithm?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Merge Sort requires $O(n)$ auxiliary space to hold the temporary left and right subarrays during the merge step."
  },
  {
    question: "In the Lomuto partition scheme for Quick Sort, which element is typically chosen as the pivot?",
    options: ["The first element", "The middle element", "The last element", "A random element"],
    correctIndex: 2,
    explanation: "The standard Lomuto partition scheme chooses the last element (`A[high]`) as the pivot for simplicity, though this makes it vulnerable to $O(n^2)$ on already sorted arrays."
  },
  {
    question: "During the Lomuto partition trace, what does the pointer `i` represent?",
    options: ["The index of the pivot element.", "The boundary between elements less than/equal to the pivot and elements greater than the pivot.", "The current element being compared to the pivot.", "The middle index of the array."],
    correctIndex: 1,
    explanation: "Pointer `i` tracks the end of the 'less than or equal to pivot' region. Elements from `low` to `i` are $\\le$ pivot, and elements from `i+1` to `j-1` are $>$ pivot."
  },
  {
    question: "What causes Quick Sort to degrade to its worst-case $O(n^2)$ time complexity?",
    options: ["The array contains duplicate elements.", "The array is already sorted or reverse sorted, and the last element is chosen as the pivot.", "The array size is a prime number.", "The merge step takes too long."],
    correctIndex: 1,
    explanation: "If the array is already sorted and the last element is the pivot, the partition will always produce one subarray of size $n-1$ and one of size 0, leading to the recurrence $T(n) = T(n-1) + O(n) = O(n^2)$."
  },
  {
    question: "What is the worst-case space complexity of Quick Sort (excluding the array itself)?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "In the worst case (highly unbalanced partitions), the recursion tree has depth $n$, requiring $O(n)$ stack space. In the average case, it is $O(\\log n)$."
  },
  {
    question: "Which sorting algorithm is guaranteed to run in $O(n \\log n)$ worst-case time, is in-place ($O(1)$ space), but is UNSTABLE?",
    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Insertion Sort"],
    correctIndex: 2,
    explanation: "Heap Sort guarantees $O(n \\log n)$ worst-case time and $O(1)$ auxiliary space, but the long-distance swaps during `siftDown` destroy the relative order of equal elements."
  },
  {
    question: "If you need to sort a massive dataset that does not fit entirely in RAM (External Sorting), which algorithm's variant is typically used?",
    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Insertion Sort"],
    correctIndex: 2,
    explanation: "External Merge Sort is the standard for external sorting because it processes data in sequential chunks, minimizing expensive disk I/O seeks."
  },
  {
    question: "In the Insertion Sort trace, if the array is `[3, 1, 2]`, what happens when `i=1` and `key=1`?",
    options: ["`1` is swapped with `3`.", "`3` is shifted to index 1, and `1` is inserted at index 0.", "`1` is placed at index 1, and `3` is shifted to index 2.", "The array remains unchanged."],
    correctIndex: 1,
    explanation: "`key=1`. `A[0]=3 > 1`, so `3` is shifted to `A[1]`. The loop terminates, and `1` is inserted at `A[0]`. The array becomes `[1, 3, 2]`."
  },
  {
    question: "Why is Quick Sort generally faster in practice than Merge Sort or Heap Sort, despite its $O(n^2)$ worst case?",
    options: ["It uses less memory.", "It has excellent cache locality due to sequential array accesses during partitioning.", "It guarantees $O(n \\log n)$ in all cases.", "It does not require recursion."],
    correctIndex: 1,
    explanation: "Quick Sort's inner loop accesses memory sequentially, which aligns perfectly with CPU cache lines. Merge Sort and Heap Sort involve scattered memory accesses, causing frequent cache misses."
  },
  {
    question: "In the Lomuto partition trace, what is the final step after the `for` loop completes?",
    options: ["The array is fully sorted.", "The pivot is swapped with the element at `i + 1`, placing the pivot in its correct final sorted position.", "The pivot is swapped with the first element.", "The left and right subarrays are recursively sorted."],
    correctIndex: 1,
    explanation: "After the loop, all elements up to `i` are $\\le$ pivot. Swapping the pivot (`A[high]`) with `A[i+1]` places the pivot exactly between the smaller and larger elements."
  }
];