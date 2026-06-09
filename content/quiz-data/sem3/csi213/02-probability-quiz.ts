export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "Events A and B are mutually exclusive, and both have a probability greater than zero (P(A) > 0, P(B) > 0). Which of the following statements is mathematically true?",
    options: [
      "A and B are statistically independent.",
      "A and B are strictly dependent; the occurrence of one guarantees the non-occurrence of the other.",
      "P(A ∩ B) = P(A) * P(B).",
      "P(A | B) = P(A)."
    ],
    correctIndex: 1,
    explanation: "If A and B are mutually exclusive, P(A ∩ B) = 0. If they were independent, P(A ∩ B) would equal P(A)*P(B). Since P(A)>0 and P(B)>0, their product cannot be 0. Thus, they cannot be independent. Knowing A occurred means B cannot occur (P(B|A) = 0), making them highly dependent."
  },
  {
    question: "In a software testing scenario, a bug detection tool has a 99% true positive rate and a 5% false positive rate. If actual bugs are extremely rare (occurring in 0.1% of codebases), what phenomenon explains why a flagged codebase is still more likely to be clean than buggy?",
    options: [
      "The Law of Large Numbers",
      "The False Positive Paradox (Base Rate Fallacy)",
      "The Central Limit Theorem",
      "The Memoryless Property"
    ],
    correctIndex: 1,
    explanation: "This is the False Positive Paradox. Because the base rate of actual bugs is so low (0.1%), the absolute number of false positives from the 99.9% clean codebases will vastly outnumber the true positives from the 0.1% buggy codebases, making a positive flag more likely to be a false alarm."
  },
  {
    question: "Which of the following correctly defines the Cumulative Distribution Function (CDF), F(x), for a random variable X?",
    options: [
      "The probability that X takes on an exact value x.",
      "The probability that X takes on a value less than or equal to x.",
      "The long-run average value of X over infinite trials.",
      "The rate of change of the Probability Mass Function."
    ],
    correctIndex: 1,
    explanation: "The CDF, F(x), is formally defined as P(X <= x). It accumulates the probabilities from the lowest possible value of X up to x."
  },
  {
    question: "A network router processes packets with an Expected Value E[X] = 50ms and a Variance Var(X) = 0. A second router has E[X] = 50ms and Var(X) = 200. From a Quality of Service (QoS) perspective, which router is preferable for real-time video streaming?",
    options: [
      "The first router, because its variance is zero, meaning latency is perfectly predictable.",
      "The second router, because higher variance implies faster maximum speeds.",
      "Both are equally good because their expected values are identical.",
      "Neither, because variance cannot be zero in real-world networks."
    ],
    correctIndex: 0,
    explanation: "Expected value measures the average latency, but variance measures the jitter (unpredictability). For real-time streaming, predictable latency (low variance/jitter) is critical to prevent buffering. A variance of 0 means every packet takes exactly 50ms."
  },
  {
    question: "Given P(A) = 0.6, P(B) = 0.5, and P(A ∪ B) = 0.8. What is the conditional probability P(A | B)?",
    options: [
      "0.30",
      "0.50",
      "0.60",
      "0.80"
    ],
    correctIndex: 2,
    explanation: "First, find the intersection using the Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). 0.8 = 0.6 + 0.5 - P(A ∩ B) => P(A ∩ B) = 1.1 - 0.8 = 0.3. Then, apply the conditional probability formula: P(A | B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.60."
  }
];
