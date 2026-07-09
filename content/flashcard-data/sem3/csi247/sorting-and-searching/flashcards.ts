export const flashcardData = [
  { front: "Recursive Bubble Sort", back: "Base case: `x >= y`. Recursive step: Bubble the largest element to index `y`, then recurse on bounds `x` to `y-1`." },
  { front: "Selection Sort Advantage", back: "Performs at most $\\mathcal{O}(N)$ swaps. Ideal for memory where write operations are expensive (e.g., Flash/EEPROM)." },
  { front: "Greedy Coin Change (BWP)", back: "Sort denominations descending (P5, P2, P1...). Iteratively divide amount by coin, add to count, take remainder. $\\mathcal{O}(C)$ time." },
  { front: "Canonical Coin System", back: "A system where the Greedy algorithm guarantees the minimum coins. BWP and USD are canonical; arbitrary sets may require DP." },
  { front: "Bubble Sort Stability", back: "Stable. Equal elements maintain their relative order because swaps only occur for strictly greater/lesser values." },
  { front: "Selection Sort Stability", back: "Unstable. The long-distance swap can easily bypass and disrupt the original order of equal elements." },
  { front: "Insertion Sort Best Case", back: "$\\mathcal{O}(N)$ time when the array is already sorted. The inner loop condition fails immediately on every pass." },
  { front: "Merge Sort Space", back: "$\\mathcal{O}(N)$ auxiliary space required for the temporary arrays used during the merge phase." },
  { front: "Quick Sort Worst Case", back: "$\\mathcal{O}(N^2)$ time. Occurs when the pivot consistently picks the minimum/maximum element (e.g., sorted array with first-element pivot)." },
  { front: "Binary Search Prerequisite", back: "The data structure must be sorted and support $\\mathcal{O}(1)$ random access (e.g., Array, not Linked List)." },
  { front: "Interpolation Search", back: "Estimates target position based on value distribution. $\\mathcal{O}(\\log \\log N)$ on uniformly distributed data, $\\mathcal{O}(N)$ worst case." },
  { front: "Counting Sort", back: "Non-comparison sort. Counts occurrences in a frequency array. $\\mathcal{O}(N + K)$ time, where $K$ is the range of input." },
  { front: "Radix Sort", back: "Sorts digit by digit using a stable subroutine (Counting Sort). $\\mathcal{O}(D \\cdot (N + K))$ where $D$ is max digits." },
  { front: "Median-of-Three Pivot", back: "Chooses the median of first, middle, and last elements. Mitigates Quick Sort's worst-case on partially sorted data." },
  { front: "Inversions", back: "A pair $(i, j)$ where $i < j$ but $A[i] > A[j]$. Counting inversions measures how 'unsorted' an array is." }
];