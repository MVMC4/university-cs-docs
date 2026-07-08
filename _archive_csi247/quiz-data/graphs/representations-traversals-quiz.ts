export const quizData = [
  {
    question: "What is the space complexity of an Adjacency List representation of a graph?",
    options: ["$O(V^2)$", "$O(V + E)$", "$O(E)$", "$O(V)$"],
    correctIndex: 1,
    explanation: "An adjacency list stores an array of size $V$, and the total number of elements across all lists is $2E$ (for undirected) or $E$ (for directed), resulting in $O(V + E)$ space."
  },
  {
    question: "In the Java Adjacency List implementation, what data structure is typically used for the outer collection?",
    options: ["`Map<Integer, List<Integer>>`", "`List<List<Integer>>`", "`int[][]`", "`Set<Set<Integer>>`"],
    correctIndex: 1,
    explanation: "`List<List<Integer>>` is the standard, most memory-efficient way to represent an adjacency list when vertices are numbered $0$ to $V-1$."
  },
  {
    question: "What is the primary purpose of the `boolean[] visited` array in BFS and DFS?",
    options: ["To store the shortest path distances.", "To prevent infinite loops and redundant processing of the same node.", "To count the total number of edges.", "To sort the vertices."],
    correctIndex: 1,
    explanation: "The visited array ensures that once a node is processed, it is never added to the queue/stack again, preventing infinite loops in cyclic graphs."
  },
  {
    question: "In the BFS implementation, when should a node be marked as `visited = true`?",
    options: ["When it is polled from the queue.", "Immediately before it is added to the queue.", "After all its neighbors have been processed.", "At the very end of the algorithm."],
    correctIndex: 1,
    explanation: "Marking a node as visited *before* enqueuing it prevents multiple neighbors from adding the same node to the queue, which would cause redundant processing."
  },
  {
    question: "What data structure is inherently used by recursive DFS?",
    options: ["Queue", "Stack (Call Stack)", "Priority Queue", "Hash Map"],
    correctIndex: 1,
    explanation: "Recursive function calls naturally use the system's Call Stack, making DFS a stack-based traversal."
  },
  {
    question: "In a directed graph, what type of edge indicates the presence of a cycle during DFS?",
    options: ["Tree Edge", "Back Edge", "Forward Edge", "Cross Edge"],
    correctIndex: 1,
    explanation: "A Back Edge points from a node to one of its ancestors in the DFS tree, which by definition forms a cycle."
  },
  {
    question: "What is the time complexity of BFS on a graph represented as an Adjacency List?",
    options: ["$O(V)$", "$O(E)$", "$O(V + E)$", "$O(V^2)$"],
    correctIndex: 2,
    explanation: "BFS visits every vertex once ($O(V)$) and examines every edge in the adjacency lists exactly once ($O(E)$), totaling $O(V + E)$."
  },
  {
    question: "If a graph is represented as an Adjacency Matrix, what is the time complexity of finding all neighbors of a vertex?",
    options: ["$O(1)$", "$O(\\text{degree})$", "$O(V)$", "$O(E)$"],
    correctIndex: 2,
    explanation: "To find all neighbors in an adjacency matrix, you must scan the entire row of length $V$, taking $O(V)$ time regardless of the actual degree."
  },
  {
    question: "Which traversal algorithm is guaranteed to find the shortest path (in terms of number of edges) in an unweighted graph?",
    options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"],
    correctIndex: 1,
    explanation: "BFS explores nodes level by level, guaranteeing that the first time a node is reached, it is via the shortest path in an unweighted graph."
  },
  {
    question: "In the DFS edge classification, what is a 'Cross Edge'?",
    options: ["An edge to an ancestor.", "An edge to a descendant.", "An edge between two nodes where neither is an ancestor of the other in the DFS tree.", "An edge that forms a cycle."],
    correctIndex: 2,
    explanation: "A Cross Edge connects two nodes in different branches of the DFS tree, or nodes that have already been fully explored."
  },
  {
    question: "Why is `List<List<Integer>>` preferred over `int[][]` for sparse graphs?",
    options: ["It is faster to initialize.", "It uses $O(V + E)$ space instead of $O(V^2)$ space, saving massive amounts of memory.", "It allows $O(1)$ edge lookups.", "It is required by Java's PriorityQueue."],
    correctIndex: 1,
    explanation: "For sparse graphs where $E \\ll V^2$, an adjacency matrix wastes enormous amounts of memory on empty (zero) entries, whereas an adjacency list only stores existing edges."
  },
  {
    question: "What happens if you forget to check `!visited[v]` in the BFS loop?",
    options: ["The algorithm runs faster.", "The algorithm will throw a StackOverflowError.", "The algorithm will enter an infinite loop if the graph contains cycles.", "The algorithm will skip some nodes."],
    correctIndex: 2,
    explanation: "Without the visited check, nodes will continuously re-add each other to the queue in cyclic graphs, causing an infinite loop and eventually an OutOfMemoryError."
  },
  {
    question: "In the recursive `dfsUtil` method, what is the base case that stops the recursion?",
    options: ["When the queue is empty.", "When all neighbors of the current node have been visited.", "When the node is null.", "When the distance is maximized."],
    correctIndex: 1,
    explanation: "The `for` loop naturally terminates when all neighbors have been checked. If all neighbors are already visited, the method simply returns, backtracking to the previous call."
  },
  {
    question: "Which graph representation allows you to iterate over all edges of the graph in $O(E)$ time?",
    options: ["Adjacency Matrix", "Adjacency List", "Incidence Matrix", "Edge List"],
    correctIndex: 1,
    explanation: "In an Adjacency List, you can iterate through each vertex's adjacency list. The total number of items across all lists is proportional to $E$."
  },
  {
    question: "If you need to frequently check if an edge exists between vertex $u$ and vertex $v$, which representation is best?",
    options: ["Adjacency List", "Adjacency Matrix", "Edge List", "Incidence List"],
    correctIndex: 1,
    explanation: "An Adjacency Matrix allows $O(1)$ edge existence checks by simply looking up `matrix[u][v]`."
  }
];
