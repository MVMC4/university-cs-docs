export const quizData = [
  {
    question: "What data structure is used to implement Dijkstra's algorithm efficiently?",
    options: ["Stack", "Queue", "Priority Queue (Min-Heap)", "Hash Map"],
    correctIndex: 2,
    explanation: "A Min-Heap Priority Queue allows efficient extraction of the node with the smallest known distance in $O(\\log V)$ time."
  },
  {
    question: "In the Java Dijkstra implementation, why do we use `if (d > dist[u]) continue;`?",
    options: ["To prevent negative weight cycles.", "To skip stale/outdated entries in the Priority Queue.", "To mark the node as visited.", "To reset the distance to infinity."],
    correctIndex: 1,
    explanation: "Since Java's PriorityQueue doesn't support efficient decrease-key, we add duplicate entries. This check ensures we ignore outdated entries with larger distances."
  },
  {
    question: "What is the time complexity of Dijkstra's algorithm using a Binary Heap Priority Queue?",
    options: ["$O(V + E)$", "$O(V^2)$", "$O((V + E) \\log V)$", "$O(VE)$"],
    correctIndex: 2,
    explanation: "Extract-Min takes $O(\\log V)$ and is done $V$ times. Relaxation (adding to PQ) takes $O(\\log V)$ and is done at most $E$ times, totaling $O((V + E) \\log V)$."
  },
  {
    question: "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
    options: ["It causes an infinite loop.", "The Greedy Choice Property no longer holds; a longer path might become shorter via a negative edge.", "Priority Queues cannot store negative numbers.", "It requires a DAG."],
    correctIndex: 1,
    explanation: "Dijkstra assumes that once a node is extracted from the PQ, its shortest path is final. Negative edges can violate this by providing a shorter path later."
  },
  {
    question: "What is the primary mechanism of the Bellman-Ford algorithm?",
    options: ["Greedy extraction of minimum distance.", "Relaxing all $E$ edges exactly $V-1$ times.", "Topological sorting followed by a single pass.", "Divide and conquer."],
    correctIndex: 1,
    explanation: "Bellman-Ford systematically relaxes every edge in the graph $V-1$ times to guarantee the shortest paths are found, even with negative weights."
  },
  {
    question: "How does Bellman-Ford detect a negative-weight cycle?",
    options: ["By checking if the Priority Queue is empty.", "By running a $V$-th iteration and checking if any distance can still be relaxed.", "By counting the number of back edges.", "By checking if all distances are negative."],
    correctIndex: 1,
    explanation: "After $V-1$ iterations, all shortest paths should be finalized. If a distance can still be improved on the $V$-th iteration, a negative cycle must exist."
  },
  {
    question: "What is the time complexity of the Bellman-Ford algorithm?",
    options: ["$O(V + E)$", "$O(V \\log V)$", "$O(VE)$", "$O(E \\log E)$"],
    correctIndex: 2,
    explanation: "The algorithm performs $V-1$ iterations, and in each iteration, it relaxes all $E$ edges, resulting in $O(VE)$ time complexity."
  },
  {
    question: "In Kahn's Algorithm for Topological Sorting, what is the first step?",
    options: ["Run DFS and record post-order.", "Calculate the in-degree of all vertices and enqueue those with in-degree 0.", "Sort the vertices by weight.", "Initialize the distance array to infinity."],
    correctIndex: 1,
    explanation: "Kahn's algorithm starts by finding all vertices with no incoming edges (in-degree 0), as they have no dependencies and can be processed first."
  },
  {
    question: "What is the time complexity of Topological Sorting using either Kahn's Algorithm or DFS?",
    options: ["$O(V)$", "$O(E)$", "$O(V + E)$", "$O(V^2)$"],
    correctIndex: 2,
    explanation: "Both methods visit every vertex once and examine every edge once, resulting in linear time complexity $O(V + E)$."
  },
  {
    question: "If a directed graph has a cycle, can it be topologically sorted?",
    options: ["Yes, but the cycle will be at the end.", "No, topological sorting is only defined for Directed Acyclic Graphs (DAGs).", "Yes, using Bellman-Ford.", "Only if the cycle has positive weights."],
    correctIndex: 1,
    explanation: "A cycle implies a circular dependency (e.g., A depends on B, B depends on A), making a linear ordering that respects all edge directions impossible."
  },
  {
    question: "In the Java Dijkstra implementation, what is the initial distance set for all vertices except the start vertex?",
    options: ["0", "1", "-1", "Integer.MAX_VALUE"],
    correctIndex: 3,
    explanation: "All vertices are initialized to infinity (`Integer.MAX_VALUE`) to represent that they are initially unreachable, except the start vertex which is 0."
  },
  {
    question: "What does the 'relaxation' step in shortest path algorithms do?",
    options: ["It removes an edge from the graph.", "It checks if the path to a vertex can be shortened by going through another vertex, and updates the distance if so.", "It sorts the edges by weight.", "It marks a vertex as visited."],
    correctIndex: 1,
    explanation: "Relaxation is the core operation: `if (dist[u] + weight < dist[v]) dist[v] = dist[u] + weight;`"
  },
  {
    question: "Why is Dijkstra's algorithm considered a 'Greedy' algorithm?",
    options: ["Because it explores all possible paths.", "Because it always makes the locally optimal choice of extracting the node with the smallest known distance.", "Because it uses a Priority Queue.", "Because it works on DAGs."],
    correctIndex: 1,
    explanation: "Dijkstra greedily selects the closest unvisited node, assuming this local optimum will lead to the global optimum, which holds true only for non-negative weights."
  },
  {
    question: "In the DFS-based Topological Sort, when is a vertex added to the result stack?",
    options: ["When it is first discovered (pre-order).", "After all its descendants have been fully explored (post-order).", "When its in-degree becomes 0.", "When it is added to the queue."],
    correctIndex: 1,
    explanation: "In DFS topological sort, a vertex is pushed to the stack only after its recursive `dfsUtil` call finishes, ensuring all its dependencies are processed first."
  },
  {
    question: "Which algorithm is better suited for finding the shortest path in a graph with negative edge weights but no negative cycles?",
    options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Kahn's Algorithm", "BFS"],
    correctIndex: 1,
    explanation: "Bellman-Ford is specifically designed to handle negative edge weights and will correctly compute shortest paths as long as no negative-weight cycles are reachable."
  }
];