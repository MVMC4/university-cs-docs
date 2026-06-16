export const quizData = [
  {
    question: "What is the formula for Load Factor ($\\alpha$)?",
    options: [
      "$m/n$",
      "$n/m$",
      "$n \\cdot m$",
      "$n + m$"
    ],
    correctIndex: 1,
    explanation: "Load factor is the ratio of elements ($n$) to buckets ($m$)."
  },
  {
    question: "What happens when the load factor exceeds the threshold (e.g., 0.75)?",
    options: [
      "The table crashes.",
      "Rehashing is triggered.",
      "Elements are deleted.",
      "The hash function changes."
    ],
    correctIndex: 1,
    explanation: "To maintain performance, the table resizes when it gets too full."
  },
  {
    question: "What is the typical new capacity after rehashing?",
    options: [
      "$m + 1$",
      "$2m$",
      "$m^2$",
      "$m/2$"
    ],
    correctIndex: 1,
    explanation: "Doubling the capacity is standard to amortize the cost of rehashing."
  },
  {
    question: "What is the time complexity of a single rehashing operation?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 2,
    explanation: "Rehashing requires iterating over all $n$ elements and re-inserting them, which takes linear time."
  },
  {
    question: "What is the amortized time complexity of insertion with rehashing?",
    options: [
      "$O(1)$",
      "$O(n)$",
      "$O(\\log n)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 0,
    explanation: "Although rehashing is $O(n)$, it happens rarely (every $n/2$ insertions), so the average cost per insertion remains $O(1)$."
  },
  {
    question: "Why do we recompute the hash index during rehashing?",
    options: [
      "We don't.",
      "Because the capacity $m$ has changed, so `hash % m` yields a different result.",
      "Because the keys have changed.",
      "Because the hash function has changed."
    ],
    correctIndex: 1,
    explanation: "The index depends on the array size. When size doubles, the modulo result changes, so elements must be moved."
  },
  {
    question: "What is the load factor of an empty hash table?",
    options: [
      "0",
      "1",
      "0.75",
      "Infinity"
    ],
    correctIndex: 0,
    explanation: "If $n=0$, then $\\alpha = 0/m = 0$."
  },
  {
    question: "If a hash table has capacity 10 and 8 elements, what is the load factor?",
    options: [
      "0.8",
      "1.25",
      "0.75",
      "80"
    ],
    correctIndex: 0,
    explanation: "$\\alpha = 8/10 = 0.8$."
  },
  {
    question: "Why is a load factor of 0.75 a common default?",
    options: [
      "It is a prime number.",
      "It offers a good trade-off between time (collisions) and space (memory waste).",
      "It is the maximum possible.",
      "It is the minimum possible."
    ],
    correctIndex: 1,
    explanation: "Lower $\\alpha$ wastes space; higher $\\alpha$ increases collisions. 0.75 is empirically a good balance."
  },
  {
    question: "In Separate Chaining, can the load factor exceed 1.0?",
    options: [
      "No, never.",
      "Yes, it just means lists are longer than 1 on average.",
      "Only if the table is full.",
      "Only for integers."
    ],
    correctIndex: 1,
    explanation: "Yes, $\\alpha > 1$ just implies that on average, each bucket has more than one element in its chain."
  },
  {
    question: "In Open Addressing, what happens if $\\alpha = 1$?",
    options: [
      "The table is perfectly full.",
      "Insertion becomes impossible (table is full).",
      "Performance improves.",
      "The table resizes automatically."
    ],
    correctIndex: 1,
    explanation: "If $n=m$, there are no empty slots. Linear probing will loop forever or fail."
  },
  {
    question: "During rehashing, what happens to the old array?",
    options: [
      "It is deleted immediately.",
      "It is kept until all elements are moved, then garbage collected.",
      "It is merged with the new array.",
      "It is resized in place."
    ],
    correctIndex: 1,
    explanation: "A new array is allocated. Elements are copied over. The old array becomes unreachable and is garbage collected."
  },
  {
    question: "What is the space complexity during rehashing?",
    options: [
      "$O(1)$",
      "$O(n)$",
      "$O(\\log n)$",
      "$O(n^2)$"
    ],
    correctIndex: 1,
    explanation: "We need to allocate a new array of size $2m \\approx 2n$, so temporary space usage doubles to $O(n)$."
  },
  {
    question: "If we use a load factor threshold of 0.5 instead of 0.75, what happens?",
    options: [
      "Less memory is used.",
      "More memory is used, but collisions are fewer.",
      "Performance degrades.",
      "Rehashing happens less often."
    ],
    correctIndex: 1,
    explanation: "A lower threshold triggers rehashing earlier, keeping the table emptier (fewer collisions) but using more memory."
  },
  {
    question: "Does rehashing change the relative order of elements in Separate Chaining?",
    options: [
      "Yes, always.",
      "No, usually elements are added to the head, reversing order, or tail, preserving it, depending on implementation.",
      "It sorts them.",
      "It randomizes them."
    ],
    correctIndex: 1,
    explanation: "Standard rehashing iterates the old array and inserts into the new. If insertion is at the head, the list order reverses. If at the tail, it is preserved."
  }
];