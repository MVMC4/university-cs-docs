export const flashcardData = [
  { front: "Recursive Bubble Sort Space Complexity", back: "$\\mathcal{O}(N)$ auxiliary space due to the recursion call stack depth, unlike iterative Bubble Sort which is $\\mathcal{O}(1)$ space." },
  { front: "File I/O Line-by-Line Search", back: "Time complexity is $\\mathcal{O}(L \\cdot M)$ where $L$ is the number of lines and $M$ is the average characters per line. Space is $\\mathcal{O}(M)$ to hold the current line buffer." },
  { front: "Matrix Row-Column Dot Product", back: "Computing the dot product of row $x$ in $A$ and column $y$ in $B$ takes $\\mathcal{O}(K)$ time, where $K$ is the shared dimension (cols of $A$ = rows of $B$)." },
  { front: "Greedy Coin Change Complexity", back: "Time complexity is $\\mathcal{O}(C)$ where $C$ is the number of coin denominations, assuming the coin system is canonical and sorted descending." },
  { front: "Array Stack IsFull Condition", back: "Returns true when `top == capacity - 1`. Attempting to push beyond this causes a Stack Overflow exception." },
  { front: "Array Stack IsEmpty Condition", back: "Returns true when `top == -1` (or `size == 0`). Attempting to pop or peek causes a Stack Underflow exception." },
  { front: "Selection Sort vs Bubble Sort (Writes)", back: "Selection Sort performs at most $\\mathcal{O}(N)$ swaps, making it vastly superior to Bubble Sort for write-heavy memory (e.g., EEPROM or Flash)." },
  { front: "Infix to Postfix Conversion", back: "Uses a stack to hold operators. Operands are output immediately. Operators are pushed/popped based on precedence and associativity rules." },
  { front: "BST Left Subtree Maximum", back: "To find the largest value in the left subtree: move left exactly once, then move right as far as possible until the right child is null." },
  { front: "Post-Order Traversal Sequence", back: "Visits Left subtree, then Right subtree, then the Root node. Used for safely deleting trees or generating postfix expressions." },
  { front: "Adjacency List to Matrix Conversion", back: "Takes $\\mathcal{O}(V^2)$ time to initialize the matrix, plus $\\mathcal{O}(V + E)$ to iterate the list and populate the edges. Space becomes $\\mathcal{O}(V^2)$." },
  { front: "Linked List Data Filtering", back: "Traversal with conditional accumulation (e.g., filtering CSI courses for GPA). Requires $\\mathcal{O}(N)$ time and $\\mathcal{O}(1)$ auxiliary space if accumulating on the fly." },
  { front: "String Random Exchange", back: "Swapping $x$ random characters in a string takes $\\mathcal{O}(x)$ time. Since strings are immutable in Java, it requires converting to a `char[]` first, taking $\\mathcal{O}(N)$ space." },
  { front: "Amortized Stack Push", back: "$\\mathcal{O}(1)$ amortized. While resizing the underlying array takes $\\mathcal{O}(N)$, it happens rarely enough that the average cost per operation remains constant." },
  { front: "Canonical Coin System", back: "A coin system (like BWP: P5, P2, P1) where the Greedy approach is guaranteed to yield the minimum number of coins. Non-canonical systems require Dynamic Programming." }
];