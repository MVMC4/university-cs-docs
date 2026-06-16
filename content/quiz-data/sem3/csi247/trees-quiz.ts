export const quizData = [
  {
    question: "Worst-case height of an unbalanced Binary Search Tree?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "It degrades into a linked list if inserted in sorted order."
  },
  {
    question: "The balance factor of a node in an AVL tree must be?",
    options: ["0 or 1", "-1, 0, or 1", "Any integer", "Strictly positive"],
    correctIndex: 1,
    explanation: "Height(left) - Height(right) must be within [-1, 1]."
  },
  {
    question: "Which rotation fixes a Left-Right imbalance in an AVL tree?",
    options: ["Right rotation on root", "Left rotation on root", "Left rotation on left child, then Right on root", "Right rotation on right child, then Left on root"],
    correctIndex: 2,
    explanation: "A double rotation is required for zig-zag imbalances."
  },
  {
    question: "Time complexity of searching in a Trie?",
    options: ["$O(n)$", "$O(\\log n)$", "$O(L)$ where L is key length", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "It traverses one node per character in the search string."
  },
  {
    question: "Space complexity of Morris Traversal?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(h)$"],
    correctIndex: 0,
    explanation: "It uses temporary 'threads' (pointers) instead of a stack or recursion."
  },
  {
    question: "In-order traversal of a valid BST yields?",
    options: ["Reverse sorted order", "Sorted ascending order", "Level-order", "Random order"],
    correctIndex: 1,
    explanation: "Visiting Left -> Root -> Right naturally processes smaller values first."
  },
  {
    question: "Optimal time complexity to find LCA in a BST?",
    options: ["$O(n)$", "$O(\\log n)$ average / $O(h)$", "$O(n \\log n)$", "$O(1)$"],
    correctIndex: 1,
    explanation: "You traverse down the tree, taking $O(h)$ time based on height."
  },
  {
    question: "Huffman coding builds its tree based on?",
    options: ["Alphabetical order", "Character frequency", "Random assignment", "String length"],
    correctIndex: 1,
    explanation: "Frequent characters are placed closer to the root for shorter codes."
  },
  {
    question: "A 'Full' Binary Tree is defined as?",
    options: ["Every level is completely filled", "Every node has exactly 0 or 2 children", "All leaves are at the same depth", "It contains no null nodes"],
    correctIndex: 1,
    explanation: "No node can have exactly 1 child."
  },
  {
    question: "A 'Complete' Binary Tree is defined as?",
    options: ["Every node has 0 or 2 children", "All levels are full except possibly the last, which is filled left-to-right", "It is perfectly balanced", "It contains no null nodes"],
    correctIndex: 1,
    explanation: "This structure is ideal for array-based heap implementations."
  },
  {
    question: "Pre-order traversal visits nodes in which order?",
    options: ["Left, Root, Right", "Root, Left, Right", "Left, Right, Root", "Level by level"],
    correctIndex: 1,
    explanation: "It processes the current node before its subtrees."
  },
  {
    question: "Post-order traversal visits nodes in which order?",
    options: ["Root, Left, Right", "Left, Root, Right", "Left, Right, Root", "Right, Left, Root"],
    correctIndex: 2,
    explanation: "It processes subtrees before the current node (useful for deletion)."
  },
  {
    question: "Level-order traversal fundamentally requires?",
    options: ["A Stack", "A Queue", "Recursion only", "A Hash Map"],
    correctIndex: 1,
    explanation: "A queue ensures nodes are processed level by level (BFS)."
  },
  {
    question: "Red-Black Trees differ from AVL trees by?",
    options: ["Allowing taller trees to minimize rotations", "Strictly enforcing height balance", "Using ternary nodes", "Being unbalanced"],
    correctIndex: 0,
    explanation: "Red-Black trees use color properties, allowing $O(\\log n)$ height with fewer rebalancing operations."
  },
  {
    question: "Post-order traversal of an Expression Tree yields?",
    options: ["Infix notation", "Prefix notation", "Postfix notation (Reverse Polish)", "Polish notation"],
    correctIndex: 2,
    explanation: "It naturally outputs operands followed by their operator."
  },
];
