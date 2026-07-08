export const flashcardData = [
  { front: "Directed Acyclic Graph (DAG)", back: "A directed graph with no cycles. Used for scheduling and topological sorting." },
  { front: "Adjacency Matrix", back: "A 2D array representation of a graph. Excellent for dense graphs, takes O(V^2) space." },
  { front: "Adjacency List", back: "An array of lists representation. Excellent for sparse graphs, takes O(V + E) space." },
  { front: "Breadth-First Search (BFS)", back: "Explores a graph level by level using a Queue. Finds the shortest path on unweighted graphs." },
  { front: "Depth-First Search (DFS)", back: "Explores a graph as deep as possible along each branch using a Stack or recursion." },
  { front: "Topological Sort", back: "A linear ordering of vertices in a DAG such that for every directed edge uv, u comes before v." },
  { front: "Kahn's Algorithm", back: "A BFS-based algorithm for topological sorting that repeatedly removes nodes with an in-degree of 0." },
  { front: "Dijkstra's Algorithm", back: "Finds the shortest path from a single source to all other nodes in a graph with non-negative weights." },
  { front: "Bellman-Ford Algorithm", back: "Finds shortest paths and can detect negative weight cycles. Slower than Dijkstra but handles negative edges." },
  { front: "Floyd-Warshall Algorithm", back: "An all-pairs shortest path algorithm using dynamic programming. Runs in O(V^3) time." },
  { front: "Minimum Spanning Tree (MST)", back: "A subset of edges that connects all vertices together without cycles and with the minimum possible total edge weight." },
  { front: "Kruskal's Algorithm", back: "Builds an MST by sorting all edges by weight and greedily adding them if they don't form a cycle." },
  { front: "Prim's Algorithm", back: "Builds an MST by growing a single tree from a starting node, always picking the cheapest connecting edge." },
  { front: "Disjoint Set Union (DSU)", back: "A data structure that tracks a set of elements partitioned into disjoint subsets. Used in Kruskal's to detect cycles." },
  { front: "Strongly Connected Components", back: "A maximal subgraph of a directed graph where every vertex is reachable from every other vertex." }
];
