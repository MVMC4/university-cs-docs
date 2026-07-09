export const flashcardData = [
  { front: "Binary Search Tree (BST)", back: "A tree where the left child is smaller than the parent, and the right child is larger." },
  { front: "AVL Tree", back: "A self-balancing BST where the heights of the two child subtrees of any node differ by at most one." },
  { front: "Red-Black Tree", back: "A self-balancing BST that uses node coloring to ensure the tree remains roughly balanced, minimizing rotations." },
  { front: "Tree Rotation", back: "An operation that alters the structure of a BST without changing its in-order traversal, used to fix balance." },
  { front: "Balance Factor", back: "The height of the left subtree minus the height of the right subtree. In AVL trees, it must be -1, 0, or 1." },
  { front: "Trie (Prefix Tree)", back: "A tree data structure used for efficient retrieval of strings and prefix-based searching (autocompletion)." },
  { front: "Huffman Coding", back: "A lossless data compression algorithm that builds a binary tree based on character frequencies." },
  { front: "Heap (Min/Max)", back: "A complete binary tree where the parent is always smaller (Min-Heap) or larger (Max-Heap) than its children." },
  { front: "Heapify", back: "The process of converting an arbitrary array into a valid heap in O(N) time by sifting down nodes." },
  { front: "In-order Traversal", back: "Visits Left, Root, Right. On a BST, this naturally yields the elements in sorted ascending order." },
  { front: "Pre-order Traversal", back: "Visits Root, Left, Right. Useful for creating a copy of a tree or generating prefix expressions." },
  { front: "Post-order Traversal", back: "Visits Left, Right, Root. Useful for safely deleting trees or generating postfix expressions." },
  { front: "Level-order Traversal", back: "Visits nodes level by level from top to bottom. Fundamentally relies on a Queue (BFS)." },
  { front: "Lowest Common Ancestor (LCA)", back: "The lowest node in a tree that has both given nodes as descendants." },
  { front: "Morris Traversal", back: "An algorithm to traverse a binary tree in O(1) auxiliary space by temporarily modifying pointers (threading)." }
];