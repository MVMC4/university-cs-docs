export const quizData = [
  {
    question: "What does a graph consist of?",
    options: ["Vertices and Edges", "Only Vertices", "Only Edges", "Only Nodes"],
    correctIndex: 0,
    explanation: "A graph G = (V, E) consists of vertices (V) and edges (E)."
  },
  {
    question: "What is a directed graph?",
    options: ["Two-way edges", "One-way edges", "No edges", "All edges"],
    correctIndex: 1,
    explanation: "In a directed graph, edges have direction (one-way)."
  },
  {
    question: "What is the space complexity of an adjacency matrix?",
    options: ["O(V)", "O(E)", "O(V²)", "O(V+E)"],
    correctIndex: 2,
    explanation: "Adjacency matrix uses O(V²) space for V vertices."
  },
  {
    question: "What is the space complexity of an adjacency list?",
    options: ["O(V)", "O(E)", "O(V²)", "O(V+E)"],
    correctIndex: 3,
    explanation: "Adjacency list uses O(V+E) space."
  },
  {
    question: "Which data structure does BFS use?",
    options: ["Stack", "Queue", "Hash table", "Tree"],
    correctIndex: 1,
    explanation: "BFS uses a queue to explore level by level."
  },
  {
    question: "Which data structure does DFS use?",
    options: ["Queue", "Stack", "Hash table", "Tree"],
    correctIndex: 1,
    explanation: "DFS uses a stack (or recursion) to explore depth-first."
  },
  {
    question: "BFS finds shortest path in what type of graph?",
    options: ["Weighted", "Unweighted", "Negative weights", "All graphs"],
    correctIndex: 1,
    explanation: "BFS finds shortest path in unweighted graphs."
  },
  {
    question: "DFS is commonly used for what?",
    options: ["BFS traversal", "Cycle detection", "Shortest path", "Hash table"],
    correctIndex: 1,
    explanation: "DFS is commonly used for cycle detection and path finding."
  },
  {
    question: "Which representation is better for dense graphs?",
    options: ["Adjacency List", "Adjacency Matrix", "Tree", "Hash table"],
    correctIndex: 1,
    explanation: "Adjacency matrix is better for dense graphs (many edges)."
  },
  {
    question: "Which representation is better for sparse graphs?",
    options: ["Adjacency List", "Adjacency Matrix", "Tree", "Hash table"],
    correctIndex: 0,
    explanation: "Adjacency list is better for sparse graphs (few edges)."
  },
  {
    question: "What does it mean for a graph to be connected?",
    options: ["Path between all pairs", "No path exists", "Only 1 node", "0 edges"],
    correctIndex: 0,
    explanation: "A connected graph has a path between every pair of vertices."
  },
  {
    question: "A tree is what type of graph?",
    options: ["Cyclic", "Acyclic", "Directed", "Weighted"],
    correctIndex: 1,
    explanation: "A tree is an acyclic (no cycles) connected graph."
  },
  {
    question: "What does DAG stand for?",
    options: ["Directed Acyclic Graph", "Directed All Graph", "Dual Acyclic Graph", "None"],
    correctIndex: 0,
    explanation: "DAG stands for Directed Acyclic Graph (no cycles, directed edges)."
  },
  {
    question: "Topological sort is possible for what type of graph?",
    options: ["Cyclic graphs", "DAG", "Tree only", "List only"],
    correctIndex: 1,
    explanation: "Topological sort is only possible for DAGs (Directed Acyclic Graphs)."
  },
  {
    question: "Dijkstra's algorithm is used for what?",
    options: ["Minimum Spanning Tree", "Shortest path", "Cycle detection", "Graph coloring"],
    correctIndex: 1,
    explanation: "Dijkstra's algorithm finds shortest paths in weighted graphs."
  },
  {
    question: "Dijkstra's algorithm fails with what?",
    options: ["Positive weights", "Negative weights", "Zero weights", "One weight"],
    correctIndex: 1,
    explanation: "Dijkstra's algorithm fails with negative weight edges."
  },
  {
    question: "Bellman-Ford algorithm can handle what?",
    options: ["Only positive weights", "Negative weights", "Only zero weights", "Only one weight"],
    correctIndex: 1,
    explanation: "Bellman-Ford can handle negative weights and detect negative cycles."
  },
  {
    question: "Graph coloring is what type of problem?",
    options: ["P", "NP-Complete", "O(1)", "O(n)"],
    correctIndex: 1,
    explanation: "Graph coloring is an NP-Complete problem."
  },
  {
    question: "A bipartite graph can be colored with how many colors?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    explanation: "A bipartite graph can be colored with 2 colors."
  },
  {
    question: "Floyd-Warshall algorithm finds what?",
    options: ["Single-pair shortest path", "All-pairs shortest path", "Minimum Spanning Tree", "Cycle detection"],
    correctIndex: 1,
    explanation: "Floyd-Warshall finds shortest paths between all pairs of vertices."
  }
];