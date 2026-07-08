export const flashcardData = [
  { front: "Stable Sort", back: "A sorting algorithm that preserves the relative order of equal elements in the output." },
  { front: "In-place Sort", back: "An algorithm that requires only O(1) auxiliary space to sort the elements." },
  { front: "Comparison Sort Lower Bound", back: "Any comparison-based sorting algorithm must make at least Omega(N log N) comparisons in the worst case." },
  { front: "Quick Sort Partitioning", back: "Rearranges an array so elements smaller than the pivot are on the left, and larger are on the right." },
  { front: "Median-of-Three", back: "A pivot selection strategy that chooses the median of the first, middle, and last elements to avoid worst-case O(N^2)." },
  { front: "Merge Sort", back: "A stable, divide-and-conquer sort that guarantees O(N log N) time but requires O(N) auxiliary space." },
  { front: "Heap Sort", back: "An in-place, unstable sort that uses a binary heap to achieve O(N log N) time complexity." },
  { front: "Counting Sort", back: "A non-comparison sort that counts occurrences of elements. Works in O(N + K) where K is the range of input." },
  { front: "Radix Sort", back: "Sorts numbers digit by digit using a stable subroutine like Counting Sort. Time: O(D * (N + K))." },
  { front: "Binary Search", back: "Searches a sorted array by repeatedly dividing the search interval in half. Time: O(log N)." },
  { front: "Rotated Array Search", back: "A modified binary search that first finds the pivot point in a rotated sorted array." },
  { front: "Interpolation Search", back: "Estimates the target's position based on its value, outperforming binary search on uniformly distributed data." },
  { front: "External Sorting", back: "Sorting algorithms (like Merge Sort) designed to handle massive datasets that do not fit in main memory (RAM)." },
  { front: "Comparator Chaining", back: "Using methods like thenComparing() to sort objects by multiple criteria sequentially." },
  { front: "Inversions", back: "A pair of elements in an array that are out of order. Counting inversions measures how 'unsorted' an array is." }
];
