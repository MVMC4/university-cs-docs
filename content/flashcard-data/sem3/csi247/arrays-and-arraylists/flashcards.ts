export const flashcardData = [
  { front: "Static Array", back: "A contiguous block of memory with a fixed size. Provides $O(1)$ random access via pointer arithmetic but cannot grow dynamically." },
  { front: "Dynamic Array (ArrayList)", back: "A resizable array backed by a static array. When full, it allocates a larger array and copies elements. Amortized $O(1)$ insertion at the end." },
  { front: "Amortized $O(1)$", back: "The average time per operation over a worst-case sequence. For ArrayLists, the expensive $O(N)$ resize is offset by many cheap $O(1)$ inserts." },
  { front: "Cache Locality", back: "Arrays have excellent spatial locality. Iterating sequentially results in CPU cache hits, making arrays much faster than linked lists in practice." },
  { front: "Row-Major Order", back: "Memory layout where consecutive elements of a row are stored contiguously (Standard in C, C++, Java)." },
  { front: "Column-Major Order", back: "Memory layout where consecutive elements of a column are stored contiguously (Standard in Fortran, MATLAB, R)." },
  { front: "System.arraycopy()", back: "A native Java method that uses highly optimized C/C++ memory blocks (like memmove) to shift elements in an array much faster than a manual for-loop." },
  { front: "Middle Insertion (Array)", back: "$O(N)$ time complexity. Requires shifting all subsequent elements one position to the right to make room for the new element." }
];