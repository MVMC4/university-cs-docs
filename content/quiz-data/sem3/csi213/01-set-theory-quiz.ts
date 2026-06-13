export const quizData = [
  {
    question: "Which of the following represents the set of all elements in S that are not in A?",
    options: [
      "Intersection ($A \\cap B$)",
      "Union ($A \\cup B$)",
      "Complement ($\\overline{A}$)",
      "Difference ($A - B$)"
    ],
    correctIndex: 2,
    explanation: "The complement of A, denoted as $\\overline{A}$ or $A^c$, contains all elements in the universal set S that are not in A."
  },
  {
    question: "What does De Morgan's Law state for the complement of a union?",
    options: [
      "$\\overline{A \\cup B} = \\overline{A} \\cup \\overline{B}$",
      "$\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}$",
      "$\\overline{A \\cup B} = A \\cap B$",
      "$\\overline{A \\cup B} = \\overline{A} - \\overline{B}$"
    ],
    correctIndex: 1,
    explanation: "De Morgan's Law for union states that the complement of a union is the intersection of the individual complements: $\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}$."
  },
  {
    question: "If $A \\cap B = \\emptyset$, what is the relationship between sets A and B?",
    options: [
      "They are equal",
      "They are subsets",
      "They are disjoint",
      "They are complements"
    ],
    correctIndex: 2,
    explanation: "If the intersection of two sets is the empty set ($\\emptyset$), they share no elements and are therefore called disjoint sets."
  },
  {
    question: "Which expression is equivalent to the set difference $A - B$?",
    options: [
      "$A \\cup \\overline{B}$",
      "$A \\cap \\overline{B}$",
      "$\\overline{A} \\cap B$",
      "$A \\cup B$"
    ],
    correctIndex: 1,
    explanation: "Set difference $A - B$ includes elements in A but not in B, which is formally defined as the intersection of A and the complement of B: $A \\cap \\overline{B}$."
  }
];