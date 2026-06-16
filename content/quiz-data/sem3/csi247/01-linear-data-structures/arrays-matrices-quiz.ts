export const quizData = [
  {
    question: "In a Row-Major ordered 2D array with $C$ columns, what is the 1D memory offset for the element at row $i$ and column $j$?",
    options: ["$(j \\times C) + i$", "$(i \\times C) + j$", "$(i \\times R) + j$", "$(j \\times R) + i$"],
    correctIndex: 1,
    explanation: "In Row-Major order, entire rows are stored contiguously. To reach row $i$, you must skip $i$ full rows (each of size $C$), then move $j$ positions into the current row."
  },
  {
    question: "To multiply Matrix $A$ ($R_A \\times C_A$) by Matrix $B$ ($R_B \\times C_B$), what mathematical constraint must be satisfied?",
    options: ["$R_A = R_B$", "$C_A = C_B$", "$C_A = R_B$", "$R_A = C_B$"],
    correctIndex: 2,
    explanation: "The dot product requires the number of columns in the first matrix to strictly equal the number of rows in the second matrix."
  },
  {
    question: "What is the time complexity of multiplying two square matrices of size $N \\times N$ using the standard iterative algorithm?",
    options: ["$O(N^2)$", "$O(N^3)$", "$O(N \\log N)$", "$O(N^4)$"],
    correctIndex: 1,
    explanation: "The standard algorithm requires three nested loops (rows of A, columns of B, and the dot product summation), resulting in $O(N^3)$ time."
  },
  {
    question: "When traversing a 2D array in Java (Row-Major), which traversal pattern provides the best CPU cache locality?",
    options: ["Iterating columns in the outer loop, rows in the inner loop.", "Iterating rows in the outer loop, columns in the inner loop.", "Traversing diagonally.", "Cache locality is identical for both."],
    correctIndex: 1,
    explanation: "Iterating rows outer and columns inner accesses memory sequentially, perfectly aligning with the CPU cache line prefetching mechanism for Row-Major arrays."
  },
  {
    question: "What is the primary difference between static and dynamic array memory allocation?",
    options: ["Static arrays are stored on the heap, dynamic on the stack.", "Static arrays have immutable bounds fixed at compile time; dynamic arrays can grow but require $O(n)$ copy operations.", "Dynamic arrays provide $O(1)$ random access, static do not.", "There is no difference."],
    correctIndex: 1,
    explanation: "Static arrays cannot change size. Dynamic arrays (like ArrayList) must allocate a new, larger contiguous block and copy elements when capacity is exceeded."
  },
  {
    question: "Given Matrix A (2x3) and Matrix B (3x4), what are the dimensions of the resulting Matrix C?",
    options: ["2x4", "3x3", "2x3", "4x2"],
    correctIndex: 0,
    explanation: "The resulting matrix takes the outer dimensions: the number of rows from A (2) and the number of columns from B (4)."
  },
  {
    question: "What is the space complexity of storing a 2D array of size $R \\times C$?",
    options: ["$O(R + C)$", "$O(R \\times C)$", "$O(R^2)$", "$O(1)$"],
    correctIndex: 1,
    explanation: "A 2D array stores exactly $R \\times C$ elements, requiring $O(R \\times C)$ contiguous memory space."
  },
  {
    question: "If the base address of an integer array is 1000, and each integer is 4 bytes, what is the physical address of the element at index 5?",
    options: ["1005", "1020", "1040", "1010"],
    correctIndex: 1,
    explanation: "Address = Base + (Index * Size) = 1000 + (5 * 4) = 1020."
  },
  {
    question: "In Column-Major order (used in Fortran), what is the offset formula for element $(i, j)$ in a matrix with $R$ rows?",
    options: ["$(i \\times R) + j$", "$(j \\times R) + i$", "$(i \\times C) + j$", "$(j \\times C) + i$"],
    correctIndex: 1,
    explanation: "In Column-Major order, columns are contiguous. To reach column $j$, you skip $j$ full columns (each of size $R$), then move $i$ positions down."
  },
  {
    question: "In the Student/GPA Lab, what is the correct denominator for calculating the major-specific GPA?",
    options: ["Total number of courses taken.", "Total number of CSI courses taken.", "Sum of credits for all CSI courses taken.", "Sum of grades for all CSI courses."],
    correctIndex: 2,
    explanation: "GPA is calculated as Total Quality Points divided by Total Credits Attempted. For a major-specific GPA, it must be the sum of credits for the filtered CSI courses."
  },
  {
    question: "When filtering an array of course codes for 'CSI' prefix in Java, which String method is most appropriate?",
    options: ["`contains('CSI')`", "`startsWith('CSI')`", "`equals('CSI')`", "`indexOf('CSI')`"],
    correctIndex: 1,
    explanation: "`startsWith` strictly checks the prefix, ensuring courses like 'MATH101' or 'ENGLCSI' are not incorrectly matched."
  },
  {
    question: "What exception is thrown if you attempt to access `matrix[5][5]` in a 3x3 array?",
    options: ["`NullPointerException`", "`ArrayIndexOutOfBoundsException`", "`IllegalArgumentException`", "`ArithmeticException`"],
    correctIndex: 1,
    explanation: "Accessing an index outside the allocated bounds of an array throws an `ArrayIndexOutOfBoundsException`."
  },
  {
    question: "Why is contiguous memory allocation critical for array performance?",
    options: ["It allows for $O(1)$ insertion in the middle.", "It enables hardware-level CPU cache prefetching and spatial locality.", "It prevents garbage collection pauses.", "It allows the array to grow dynamically without copying."],
    correctIndex: 1,
    explanation: "Contiguous memory allows the CPU to predict and load adjacent memory addresses into the ultra-fast L1/L2 cache before they are explicitly requested."
  },
  {
    question: "In the matrix multiplication dot product formula $C[i][j] = \\sum A[i][k] \\times B[k][j]$, what does the index $k$ represent?",
    options: ["The row of Matrix A.", "The column of Matrix B.", "The shared inner dimension (columns of A / rows of B).", "The row of Matrix C."],
    correctIndex: 2,
    explanation: "$k$ iterates across the columns of A and down the rows of B simultaneously to compute the dot product."
  },
  {
    question: "What is the best-case time complexity for standard matrix multiplication?",
    options: ["$O(N^2)$", "$O(N^3)$", "$O(N \\log N)$", "$O(1)$"],
    correctIndex: 1,
    explanation: "The standard algorithm always performs the exact same number of operations regardless of the data values. The best, worst, and average cases are all strictly $O(N^3)$."
  }
];