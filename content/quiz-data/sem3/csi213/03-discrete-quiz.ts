export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "A quality control inspector randomly selects 5 items from a batch of 100 items known to contain exactly 8 defective items. Which probability distribution should be used to calculate the probability of finding exactly 2 defective items in the sample?",
    options: ["Binomial Distribution", "Poisson Distribution", "Hypergeometric Distribution", "Geometric Distribution"],
    correctIndex: 2,
    explanation: "Because the sampling is done WITHOUT replacement from a finite population (N=100), the Hypergeometric distribution is the exact and rigorous model to use. The Binomial distribution would only be an approximation here."
  },
  {
    question: "A call center receives an average of 12 calls per hour. Which distribution is most appropriate to model the probability of receiving exactly 15 calls in a randomly selected hour?",
    options: ["Binomial Distribution", "Poisson Distribution", "Negative Binomial Distribution", "Hypergeometric Distribution"],
    correctIndex: 1,
    explanation: "The Poisson distribution models the number of rare, independent events occurring over a fixed, continuous interval of time or space, given a known average rate (mu = 12)."
  },
  {
    question: "A software engineer is testing a new random number generator that outputs a '1' with a probability of 0.05. Which distribution models the number of trials required until the FIRST '1' is generated?",
    options: ["Binomial Distribution", "Negative Binomial Distribution", "Geometric Distribution", "Poisson Distribution"],
    correctIndex: 2,
    explanation: "The Geometric distribution specifically models the number of independent Bernoulli trials required to achieve the FIRST success."
  },
  {
    question: "Under what limiting conditions does the Binomial distribution converge mathematically to the Poisson distribution?",
    options: [
      "As n approaches 0 and p approaches 1.",
      "As n approaches infinity and p approaches 0, such that np = mu remains constant.",
      "As the population size N approaches infinity.",
      "As the number of required successes r approaches infinity."
    ],
    correctIndex: 1,
    explanation: "The Poisson Limit Theorem states that the Binomial distribution converges to the Poisson distribution when the number of trials n is very large, the probability of success p is very small, and the product mu = np remains constant."
  },
  {
    question: "A medical researcher is testing a new drug that has a 20% success rate. Which distribution should be used to calculate the probability that the 3rd successful patient outcome occurs on exactly the 10th trial?",
    options: ["Geometric Distribution", "Binomial Distribution", "Negative Binomial Distribution", "Hypergeometric Distribution"],
    correctIndex: 2,
    explanation: "The Negative Binomial distribution generalizes the Geometric distribution by modeling the number of trials required to achieve the r-th success (in this case, r=3)."
  }
];
