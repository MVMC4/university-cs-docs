export const quizData = [
  {
    question: "What does the root node have no?",
    options: ["Child", "Parent", "Data", "Edge"],
    correctIndex: 1,
    explanation: "The root node has no parent - it's the top of the tree."
  },
  {
    question: "What does a leaf node have no?",
    options: ["Parent", "Child", "Data", "Edge"],
    correctIndex: 1,
    explanation: "A leaf node has no children - it's at the bottom of the tree."
  },
  {
    question: "What is the maximum number of children in a binary tree node?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    explanation: "Binary tree nodes have at most 2 children (left and right)."
  },
  {
    question: "In-order traversal visits nodes in what order?",
    options: ["Left Root Right", "Root Left Right", "Right Root Left", "Left Right Root"],
    correctIndex: 0,
    explanation: "In-order traversal visits Left subtree, then Root, then Right subtree."
  },
  {
    question: "Pre-order traversal visits nodes in what order?",
    options: ["Left Root Right", "Root Left Right", "Right Root Left", "Left Right Root"],
    correctIndex: 1,
    explanation: "Pre-order traversal visits Root, then Left subtree, then Right subtree."
  },
  {
    question: "Post-order traversal visits nodes in what order?",
    options: ["Left Root Right", "Root Left Right", "Right Root Left", "Left Right Root"],
    correctIndex: 3,
    explanation: "Post-order traversal visits Left subtree, then Right subtree, then Root."
  },
  {
    question: "What is the BST property?",
    options: ["Left < Right < Root", "Left < Root < Right", "Root < Left < Right", "Right < Left < Root"],
    correctIndex: 1,
    explanation: "In a BST, all values in left subtree are less than root, and all values in right subtree are greater than root."
  },
  {
    question: "What is the average time complexity for BST search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 1,
    explanation: "Average case BST search is O(log n) when the tree is balanced."
  },
  {
    question: "What is the worst-case time complexity for BST search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation: "Worst case is O(n) when the tree is skewed (like a linked list)."
  },
  {
    question: "What does in-order traversal of a BST produce?",
    options: ["Random order", "Sorted order", "Reverse order", "Tree structure"],
    correctIndex: 1,
    explanation: "In-order traversal of a BST produces values in ascending sorted order."
  },
  {
    question: "What is the height of a tree?",
    options: ["Minimum path", "Maximum path to leaf", "Number of nodes", "Number of edges"],
    correctIndex: 1,
    explanation: "Height is the longest path from a node to a leaf."
  },
  {
    question: "What is an AVL tree?",
    options: ["Unbalanced tree", "Self-balancing BST", "Hash table", "Graph"],
    correctIndex: 1,
    explanation: "AVL trees automatically balance themselves after insertions and deletions."
  },
  {
    question: "What is a Red-Black tree?",
    options: ["Unbalanced tree", "Self-balancing BST", "Hash table", "Graph"],
    correctIndex: 1,
    explanation: "Red-Black trees are self-balancing binary search trees."
  },
  {
    question: "Which data structure is used for level-order traversal?",
    options: ["Stack", "Queue", "Hash table", "Tree"],
    correctIndex: 1,
    explanation: "Level-order traversal uses a queue to process nodes level by level."
  },
  {
    question: "When deleting a node with 2 children in BST, what do we use?",
    options: ["Root node", "In-order successor", "Leaf node", "Head node"],
    correctIndex: 1,
    explanation: "We replace the node with its in-order successor (smallest node in right subtree)."
  },
  {
    question: "What is a full binary tree?",
    options: ["0 or 2 children per node", "1 child per node", "All leaves at same level", "No children"],
    correctIndex: 0,
    explanation: "A full binary tree has nodes with either 0 or 2 children."
  },
  {
    question: "What is a complete binary tree?",
    options: ["Filled left-to-right", "Random order", "Left subtree only", "Right subtree only"],
    correctIndex: 0,
    explanation: "A complete binary tree is filled from left to right at each level."
  },
  {
    question: "What is the maximum number of nodes at depth d?",
    options: ["d", "2d", "2^d", "d²"],
    correctIndex: 2,
    explanation: "At depth d, there can be at most 2^d nodes."
  },
  {
    question: "Is a tree a type of graph?",
    options: ["No", "Yes", "Sometimes", "Only BST"],
    correctIndex: 1,
    explanation: "A tree is a special type of graph that is acyclic and connected."
  },
  {
    question: "What is a Trie primarily used for?",
    options: ["Numbers", "Strings", "Graphs", "Queues"],
    correctIndex: 1,
    explanation: "Tries (prefix trees) are primarily used for storing and searching strings efficiently."
  }
];