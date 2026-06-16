export const quizData = [
  {
    question: "What is the maximum number of nodes at depth $d$ in a binary tree?",
    options: [
      "$d$",
      "$2d$",
      "$2^d$",
      "$d^2$"
    ],
    correctIndex: 2,
    explanation: "At depth 0, there is $2^0=1$ node. At depth 1, $2^1=2$ nodes. By induction, at depth $d$, there are $2^d$ nodes."
  },
  {
    question: "How many nodes does a perfect binary tree of height $h$ contain?",
    options: [
      "$2^h$",
      "$2^{h+1} - 1$",
      "$2^h - 1$",
      "$h^2$"
    ],
    correctIndex: 1,
    explanation: "The sum of a geometric series $\sum_{i=0}^h 2^i = 2^{h+1} - 1$."
  },
  {
    question: "What is the minimum possible height of a binary tree with $N$ nodes?",
    options: [
      "$N-1$",
      "$\\log_2 N$",
      "$\\sqrt{N}$",
      "$N$"
    ],
    correctIndex: 1,
    explanation: "A perfect tree minimizes height. $N = 2^{h+1}-1 \\implies h \\approx \\log_2 N$."
  },
  {
    question: "What is the maximum possible height of a binary tree with $N$ nodes?",
    options: [
      "$\\log_2 N$",
      "$N$",
      "$N-1$",
      "$N/2$"
    ],
    correctIndex: 2,
    explanation: "A degenerate tree (skewed like a linked list) has height $N-1$."
  },
  {
    question: "In an iterative In-Order traversal using a stack, when do you pop a node?",
    options: [
      "Immediately after pushing it.",
      "After traversing its entire left subtree (when current becomes null).",
      "Before traversing the left subtree.",
      "Only if it has no children."
    ],
    correctIndex: 1,
    explanation: "You push nodes while going left. When you hit null, you pop the most recent node (the parent), visit it, and then go right."
  },
  {
    question: "Which traversal order is best for deleting a tree?",
    options: [
      "Pre-Order",
      "In-Order",
      "Post-Order",
      "Level-Order"
    ],
    correctIndex: 2,
    explanation: "Post-Order visits children before the parent, ensuring you delete children before deleting the parent node."
  },
  {
    question: "What is the time complexity of traversing a tree with $N$ nodes?",
    options: [
      "$O(\\log N)$",
      "$O(N)$",
      "$O(N \\log N)$",
      "$O(1)$"
    ],
    correctIndex: 1,
    explanation: "Every node must be visited exactly once, so the complexity is linear, $O(N)$."
  },
  {
    question: "In a Level-Order traversal, which data structure is used?",
    options: [
      "Stack",
      "Queue",
      "Priority Queue",
      "Hash Map"
    ],
    correctIndex: 1,
    explanation: "Level-Order (BFS) requires a Queue to process nodes in FIFO order, level by level."
  },
  {
    question: "If a binary tree has 15 nodes, what is its minimum possible height?",
    options: [
      "3",
      "4",
      "5",
      "15"
    ],
    correctIndex: 0,
    explanation: "A perfect tree of height 3 has $2^{3+1}-1 = 15$ nodes. Thus, min height is 3."
  },
  {
    question: "What is the relationship between the number of leaf nodes ($L$) and nodes with 2 children ($D$) in a non-empty binary tree?",
    options: [
      "$L = D + 1$",
      "$L = 2D$",
      "$L = D - 1$",
      "$L = D$"
    ],
    correctIndex: 0,
    explanation: "This is a standard property of binary trees: the number of leaves is always one more than the number of nodes with two children."
  },
  {
    question: "Which traversal visits the root node first?",
    options: [
      "In-Order",
      "Post-Order",
      "Pre-Order",
      "Level-Order"
    ],
    correctIndex: 2,
    explanation: "Pre-Order is defined as Root $\\to$ Left $\\to$ Right."
  },
  {
    question: "In the iterative In-Order traversal algorithm, what happens after visiting a node?",
    options: [
      "The algorithm terminates.",
      "The algorithm moves to the right child of the visited node.",
      "The algorithm moves to the left child.",
      "The algorithm pushes the node back onto the stack."
    ],
    correctIndex: 1,
    explanation: "After visiting (printing) the node popped from the stack, the algorithm sets `current = node.right` to process the right subtree."
  },
  {
    question: "What is the space complexity of a recursive tree traversal?",
    options: [
      "$O(1)$",
      "$O(N)$",
      "$O(h)$ where $h$ is the height of the tree",
      "$O(\\log N)$"
    ],
    correctIndex: 2,
    explanation: "The space is used by the call stack, which grows to the depth of the recursion, i.e., the height of the tree $h$."
  },
  {
    question: "For a tree with $N$ nodes, what is the worst-case space complexity of an iterative Level-Order traversal?",
    options: [
      "$O(1)$",
      "$O(N)$",
      "$O(\\log N)$",
      "$O(h)$"
    ],
    correctIndex: 1,
    explanation: "In the worst case (a perfect tree), the queue will hold all nodes at the last level, which is roughly $N/2$, so $O(N)$."
  },
  {
    question: "Which traversal yields the nodes in sorted order for a Binary Search Tree?",
    options: [
      "Pre-Order",
      "In-Order",
      "Post-Order",
      "Level-Order"
    ],
    correctIndex: 1,
    explanation: "In-Order traversal (Left $\\to$ Root $\\to$ Right) visits BST nodes in ascending order."
  }
];