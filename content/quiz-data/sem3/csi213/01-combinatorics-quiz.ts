export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "A hash table has 100 buckets. According to the Generalized Pigeonhole Principle, what is the minimum number of keys that must be inserted to guarantee that at least one bucket contains 5 keys?",
    options: ["400", "401", "500", "101"],
    correctIndex: 1,
    explanation: "The Generalized Pigeonhole Principle states that if N objects are placed in k boxes, at least one box contains ceil(N/k) objects. We need ceil(N/100) = 5. The smallest integer N for which this is true is 401 (since ceil(400/100) = 4, but ceil(401/100) = 5)."
  },
  {
    question: "How many unique IPv6 addresses are possible, given that an IPv6 address is 128 bits long?",
    options: ["2^64", "16^16", "2^128", "10^128"],
    correctIndex: 2,
    explanation: "An IPv6 address consists of 128 bits. Since each bit can be in one of 2 states (0 or 1), the total number of unique addresses is 2^128. (Note: This can also be written as 16^32 in hexadecimal)."
  },
  {
    question: "In a room of 30 students, 20 study Python, 15 study Java, and 5 study neither. How many students study BOTH Python and Java?",
    options: ["5", "10", "15", "20"],
    correctIndex: 1,
    explanation: "Let P be Python and J be Java. The total number of students studying at least one language is 30 - 5 = 25. Using the Inclusion-Exclusion Principle: |P U J| = |P| + |J| - |P ∩ J|. Therefore, 25 = 20 + 15 - |P ∩ J|. Solving for the intersection gives |P ∩ J| = 35 - 25 = 10."
  },
  {
    question: "Why is an algorithm with a time complexity of O(n!) considered intractable for large inputs?",
    options: [
      "It requires too much memory to store the factorial values.",
      "It exhibits combinatorial explosion, meaning execution time grows super-exponentially, making it physically impossible to complete for n > 20.",
      "Factorial operations are not supported by standard CPU instruction sets.",
      "It can only be executed on quantum computers."
    ],
    correctIndex: 1,
    explanation: "O(n!) algorithms suffer from combinatorial explosion. For example, 20! is approximately 2.4 x 10^18 operations. Even on a modern supercomputer, this would take years to compute, rendering brute-force approaches useless for large n."
  },
  {
    question: "How many distinct 8-character passwords can be created if the password must consist of exactly 2 uppercase letters (A-Z) and 6 digits (0-9), and the characters can be in any order?",
    options: [
      "26^2 * 10^6",
      "(26 * 25) * (10^6)",
      "C(8,2) * 26^2 * 10^6",
      "P(8,2) * 26^2 * 10^6"
    ],
    correctIndex: 2,
    explanation: "First, choose the 2 positions out of 8 for the uppercase letters: C(8,2). Then, fill those 2 positions with letters (26 choices each, repetitions allowed): 26^2. Finally, fill the remaining 6 positions with digits (10 choices each): 10^6. By the Rule of Product, the total is C(8,2) * 26^2 * 10^6."
  }
];
