export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "What is the exact probability that a continuous random variable X assumes a specific discrete value, e.g., P(X = 5)?",
    options: ["0.5", "1", "0", "Depends on the mean"],
    correctIndex: 2,
    explanation: "For any continuous distribution, the probability of assuming an exact, singular value is mathematically zero. Probabilities are defined over intervals via integration of the PDF."
  },
  {
    question: "Which mathematical property uniquely identifies the Exponential distribution among all continuous distributions?",
    options: ["Symmetry around the mean", "Memoryless Property", "Heavy Tails", "Bimodality"],
    correctIndex: 1,
    explanation: "The memoryless property dictates that the conditional probability of an event occurring in the future is independent of the time already elapsed: P(X > s+t | X > s) = P(X > t)."
  },
  {
    question: "If a continuous random variable X is equally likely to fall anywhere within the interval [2, 10], what is the probability that X falls between 4 and 7?",
    options: ["3/8", "1/2", "5/8", "1/4"],
    correctIndex: 0,
    explanation: "This is a Continuous Uniform distribution. The total width is 10 - 2 = 8. The target sub-interval width is 7 - 4 = 3. The probability is simply the ratio of the widths: 3/8."
  },
  {
    question: "Using the Standard Normal (Z) Table, if P(Z < 1.96) = 0.9750, what is the probability P(Z < -1.96) without looking up the negative value?",
    options: ["0.9750", "0.0500", "0.0250", "-0.9750"],
    correctIndex: 2,
    explanation: "By the Symmetry Axiom, P(Z < -z) = 1 - P(Z < z). Therefore, P(Z < -1.96) = 1 - 0.9750 = 0.0250."
  },
  {
    question: "A manufacturing process produces steel rods with lengths normally distributed (mu = 100 cm, sigma = 2 cm). To find the length that separates the top 10% of rods from the rest, which Z-score should be used in the inverse standardization formula X = mu + Z*sigma?",
    options: ["Z ≈ -1.28", "Z ≈ 1.28", "Z ≈ 1.645", "Z ≈ -1.645"],
    correctIndex: 1,
    explanation: "The 'top 10%' corresponds to the 90th percentile (a left-tail area of 0.90). Looking up 0.9000 in the Z-table yields a positive Z-score of approximately 1.28. (1.645 corresponds to the top 5% / 95th percentile)."
  }
];
