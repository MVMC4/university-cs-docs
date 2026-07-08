export const quizData = [
  {
    question: "What is the recurrence relation for Merge Sort?",
    options: ["$T(n) = T(n-1) + O(1)$", "$T(n) = 2T(n/2) + \\Theta(n)$", "$T(n) = 2T(n-1) + O(n)$", "$T(n) = T(n/2) + O(n)$"],
    correctIndex: 1,
    explanation: "Merge Sort divides the array into two halves ($2T(n/2)$) and merges them in linear time ($\\Theta(n)$)."
  },
  {
    question: "What is the time complexity of the 'Combine' step in Merge Sort?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "Merging two sorted halves of total size $n$ requires a single linear pass, taking $O(n)$ time."
  },
  {
    question: "According to the Master Theorem, which case applies to the Merge Sort recurrence $T(n) = 2T(n/2) + n$?",
    options: ["Case 1", "Case 2", "Case 3", "The Master Theorem does not apply."],
    correctIndex: 1,
    explanation: "Here $a=2, b=2, c_{crit}=1$. Since $f(n) = n = \\Theta(n^{c_{crit}})$, Case 2 applies, yielding $\\Theta(n \\log n)$."
  },
  {
    question: "What is the average-case recurrence relation for Quick Sort?",
    options: ["$T(n) = T(n-1) + O(n)$", "$T(n) = 2T(n/2) + O(n)$", "$T(n) = 2T(n-1) + O(1)$", "$T(n) = T(n/2) + O(n \\log n)$"],
    correctIndex: 1,
    explanation: "Assuming the pivot divides the array roughly in half, the average recurrence is $T(n) = 2T(n/2) + O(n)$, yielding $O(n \\log n)$."
  },
  {
    question: "What specific input causes Quick Sort to degrade to its worst-case $O(n^2)$ time complexity?",
    options: ["A randomly shuffled array.", "An array where the pivot is consistently the minimum or maximum element.", "An array with all identical elements.", "An array sorted in ascending order if a random pivot is chosen."],
    correctIndex: 1,
    explanation: "If the pivot is the min or max, the partition sizes are $0$ and $n-1$, leading to the recurrence $T(n) = T(n-1) + O(n)$, which sums to $O(n^2)$."
  },
  {
    question: "In the Decision Tree model of sorting, what does each internal node represent?",
    options: ["A permutation of the input.", "A comparison between two elements (e.g., $A[i] \\le A[j]$).", "A swap operation.", "A recursive call."],
    correctIndex: 1,
    explanation: "The decision tree models the flow of comparisons. Each internal node is a binary decision based on comparing two elements."
  },
  {
    question: "In the Decision Tree model, what does each leaf node represent?",
    options: ["A comparison.", "A sorted permutation of the input array.", "The maximum element.", "A base case."],
    correctIndex: 1,
    explanation: "Each leaf represents a unique outcome of the comparisons, which must correspond to one of the $n!$ possible sorted permutations."
  },
  {
    question: "Why must a Decision Tree for sorting $n$ elements have at least $n!$ leaves?",
    options: ["Because the tree has height $n$.", "Because there are $n!$ possible initial permutations that must each map to a unique sorted outcome.", "Because each node has 2 children.", "Because of the Master Theorem."],
    correctIndex: 1,
    explanation: "To correctly sort all possible inputs, the tree must have at least one leaf for every possible permutation of the $n$ distinct elements."
  },
  {
    question: "What is the mathematical relationship between the height $h$ of a binary tree and its maximum number of leaves $L$?",
    options: ["$L = 2h$", "$L = h^2$", "$L \\le 2^h$", "$L \\ge 2^h$"],
    correctIndex: 2,
    explanation: "A binary tree of height $h$ can have at most $2^h$ leaves. Therefore, $L \\le 2^h$, or equivalently $2^h \\ge L$."
  },
  {
    question: "Combining the leaf count requirement with the tree height property, what inequality do we get for the height $h$?",
    options: ["$h \\ge \\log_2(n!)$", "$h \\le \\log_2(n!)$", "$h = n!$", "$h \\ge n \\log n$"],
    correctIndex: 0,
    explanation: "Since $2^h \\ge L \\ge n!$, taking the base-2 logarithm yields $h \\ge \\log_2(n!)$."
  },
  {
    question: "What mathematical tool is used to approximate $\\log_2(n!)$ as $\\Theta(n \\log n)$?",
    options: ["Taylor Series", "Stirling's Approximation", "L'Hopital's Rule", "The Master Theorem"],
    correctIndex: 1,
    explanation: "Stirling's Approximation states that $n! \\approx \\sqrt{2\\pi n} (n/e)^n$, which simplifies $\\log_2(n!)$ to $\\Theta(n \\log n)$."
  },
  {
    question: "What does the $\\Omega(n \\log n)$ lower bound apply to?",
    options: ["All sorting algorithms.", "All comparison-based sorting algorithms.", "Only Quick Sort and Merge Sort.", "Only non-comparison sorts like Radix Sort."],
    correctIndex: 1,
    explanation: "The Decision Tree proof relies on binary comparisons. Non-comparison sorts (like Counting Sort) bypass this model and can achieve $O(n)$."
  },
  {
    question: "If an algorithm has a recurrence of $T(n) = T(n-1) + n$, what is its asymptotic complexity?",
    options: ["$O(n)$", "$O(n \\log n)$", "$O(n^2)$", "$O(2^n)$"],
    correctIndex: 2,
    explanation: "This expands to the arithmetic series $n + (n-1) + \\dots + 1 = \\frac{n(n+1)}{2} = \\Theta(n^2)$."
  },
  {
    question: "Why is Merge Sort's worst-case complexity the same as its average-case complexity?",
    options: ["Because it uses a random pivot.", "Because it always divides the array exactly in half, regardless of the input data.", "Because it is an in-place algorithm.", "Because it uses insertion sort for small arrays."],
    correctIndex: 1,
    explanation: "Merge Sort's divide step is strictly $n/2$, so the recurrence $T(n) = 2T(n/2) + O(n)$ always holds, guaranteeing $O(n \\log n)$ in all cases."
  },
  {
    question: "Which of the following recurrences represents the worst-case scenario for Quick Sort?",
    options: ["$T(n) = 2T(n/2) + O(n)$", "$T(n) = T(n-1) + O(n)$", "$T(n) = 2T(n-1) + O(1)$", "$T(n) = T(n/2) + O(n^2)$"],
    correctIndex: 1,
    explanation: "The worst case occurs when the partition is maximally unbalanced (sizes 0 and n-1), yielding $T(n) = T(n-1) + O(n)$."
  }
];