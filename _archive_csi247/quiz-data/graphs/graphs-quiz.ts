export const quizData = [
  {
    question: "Dijkstra's algorithm fails when the graph contains?",
    options: ["Directed edges", "Negative weight edges", "Cycles", "Multiple components"],
    correctIndex: 1,
    explanation: "Negative weights break the greedy assumption of Dijkstra's."
  },
  {
    question: "Time complexity of the Bellman-Ford algorithm?",
    options: ["$O(V \\log V)$", "$O(E \\log V)$", "$O(V \\cdot E)$", "$O(V^3)$"],
    correctIndex: 2,
    explanation: "It relaxes all $E$ edges $V-1$ times."
  },
  {
    question: "Time complexity of the Floyd-Warshall algorithm?",
    options: ["$O(V^2)$", "$O(V^3)$", "$O(V \\cdot E)$", "$O(E \\log V)$"],
    correctIndex: 1,
    explanation: "It uses three nested loops over all vertices."
  },
  {
    question: "Topological sort is only possible on which type of graph?",
    options: ["Undirected Graph", "DAG (Directed Acyclic Graph)", "Complete Graph", "Bipartite Graph"],
    correctIndex: 1,
    explanation: "Cycles make a topological ordering impossible."
  },
  {
    question: "Time complexity of Union-Find with path compression?",
    options: ["$O(1)$", "$O(\\log n)$", "$O(\\alpha(n))$", "$O(n)$"],
    correctIndex: 2,
    explanation: "$\\alpha(n)$ is the inverse Ackermann function, effectively constant."
  },
  {
    question: "Kruskal's MST algorithm uses which data structure to detect cycles?",
    options: ["Priority Queue", "Stack", "Union-Find", "Hash Map"],
    correctIndex: 2,
    explanation: "Union-Find efficiently checks if two vertices are in the same component."
  },
  {
    question: "BFS guarantees the shortest path only on?",
    options: ["Weighted graphs", "Unweighted graphs", "Directed graphs", "Dense graphs"],
    correctIndex: 1,
    explanation: "BFS minimizes the number of edges, ignoring edge weights."
  },
  {
    question: "Space complexity of an Adjacency Matrix?",
    options: ["$O(V)$", "$O(E)$", "$O(V^2)$", "$O(V+E)$"],
    correctIndex: 2,
    explanation: "It requires a $V \\times V$ 2D array regardless of edge count."
  },
  {
    question: "DFS cycle detection in a directed graph requires?",
    options: ["Only a visited array", "A visited array and a recursion stack array", "A queue", "A priority queue"],
    correctIndex: 1,
    explanation: "The recursion stack distinguishes between 'visited' and 'currently in recursion path'."
  },
  {
    question: "Checking if a graph is Bipartite uses which technique?",
    options: ["Topological Sort", "BFS/DFS with 2-coloring", "Dijkstra's", "Floyd-Warshall"],
    correctIndex: 1,
    explanation: "If you can color it with 2 colors without adjacent matches, it's bipartite."
  },
  {
    question: "Primary difference between Prim's and Kruskal's?",
    options: ["Prim sorts edges, Kruskal grows from a node", "Prim grows a single tree from a node, Kruskal sorts all edges", "Prim is for DAGs, Kruskal is for undirected", "There is no difference"],
    correctIndex: 1,
    explanation: "Prim is vertex-centric, Kruskal is edge-centric."
  },
  {
    question: "Optimal algorithm for shortest path in a DAG?",
    options: ["Dijkstra's", "Bellman-Ford", "Topological Sort + DP", "Floyd-Warshall"],
    correctIndex: 2,
    explanation: "Processing vertices in topological order yields an $O(V+E)$ solution."
  },
  {
    question: "Which algorithm finds Strongly Connected Components?",
    options: ["Dijkstra's", "Tarjan's or Kosaraju's", "Prim's", "Floyd-Warshall"],
    correctIndex: 1,
    explanation: "Both Tarjan's and Kosaraju's are standard for SCCs."
  },
  {
    question: "Adjacency List is most space-efficient for?",
    options: ["Dense graphs", "Sparse graphs", "Complete graphs", "Undirected graphs only"],
    correctIndex: 1,
    explanation: "It only stores existing edges, taking $O(V+E)$ space."
  },
  {
    question: "Dijkstra's time complexity using a Min-Priority Queue?",
    options: ["$O(V^2)$", "$O(V \\cdot E)$", "$O((V+E) \\log V)$", "$O(E \\log E)$"],
    correctIndex: 2,
    explanation: "Extracting min and updating keys in a binary heap takes $\\log V$."
  },
];
