export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "In a series system comprising 4 independent components, each with a reliability of 0.95, what is the aggregate system reliability?",
    options: ["0.9500", "0.8145", "0.3800", "0.9999"],
    correctIndex: 1,
    explanation: "For a series configuration, R_system = R1 * R2 * R3 * R4 = (0.95)^4 = 0.81450625."
  },
  {
    question: "A system requires at least 2 out of 3 identical components to function. If each component has a reliability of 0.90, what is the system reliability?",
    options: ["0.729", "0.972", "0.999", "0.810"],
    correctIndex: 1,
    explanation: "This is a 2-out-of-3 system. R = P(X=2) + P(X=3). P(X=2) = C(3,2)*(0.9)^2*(0.1)^1 = 3 * 0.81 * 0.1 = 0.243. P(X=3) = (0.9)^3 = 0.729. Total R = 0.243 + 0.729 = 0.972."
  },
  {
    question: "What does a constant Hazard Rate (Failure Rate) function imply about a component's lifecycle?",
    options: [
      "The component is experiencing rapid wear-and-tear and aging.",
      "The component is in its 'burn-in' phase with decreasing failure rates.",
      "The component's risk of failing in the next instant is independent of its current age (memoryless property).",
      "The component follows a Normal distribution for its lifespan."
    ],
    correctIndex: 2,
    explanation: "A constant hazard rate is the defining characteristic of the Exponential distribution. It implies the component does not degrade over time (no wear-and-tear), meaning its probability of failing in the next second is the same whether it is 1 day old or 10 years old."
  },
  {
    question: "In a parallel system comprising 2 independent components with reliabilities R1 = 0.80 and R2 = 0.70, what is the aggregate system reliability?",
    options: ["0.56", "0.94", "0.75", "0.30"],
    correctIndex: 1,
    explanation: "For a parallel configuration, R_system = 1 - [(1-R1)(1-R2)] = 1 - [(0.20)(0.30)] = 1 - 0.06 = 0.94."
  },
  {
    question: "Which of the following architectures represents a 'single point of failure'?",
    options: [
      "A 3-out-of-5 redundant voting system.",
      "A pure parallel network of routers.",
      "A pure series chain of mechanical gears.",
      "A distributed database with active replication."
    ],
    correctIndex: 2,
    explanation: "In a pure series system, the failure of ANY single component causes the entire system to fail. Therefore, every component in a series chain is a single point of failure."
  }
];