export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export const quizData: Question[] = [
  {
    question: "In the Method of Least Squares, what specific metric is minimized to find the line of best fit?",
    options: [
      "The sum of the absolute horizontal distances between the points and the line.",
      "The sum of the squared vertical residuals (errors) between the observed points and the predicted line.",
      "The Pearson correlation coefficient.",
      "The sum of the x and y intercepts."
    ],
    correctIndex: 1,
    explanation: "The Method of Least Squares explicitly minimizes the sum of the squared vertical differences (residuals) between the actual observed y-values and the y-values predicted by the linear model."
  },
  {
    question: "A regression model analyzing marketing spend (X) vs. revenue (Y) yields a slope of β1 = 4.5. How should this be interpreted in context?",
    options: [
      "For every $1 increase in revenue, marketing spend increases by $4.50.",
      "The baseline revenue is $4.50 even if marketing spend is zero.",
      "For every $1 increase in marketing spend, revenue increases by an average of $4.50.",
      "4.5% of the variance in revenue is explained by marketing spend."
    ],
    correctIndex: 2,
    explanation: "The slope (β1) represents the rate of change. It dictates how much the dependent variable (Y, revenue) changes for a single unit increase in the independent variable (X, marketing spend)."
  },
  {
    question: "What does a Coefficient of Determination (R^2) of 0.85 actually mean in plain English?",
    options: [
      "The correlation between X and Y is 85%.",
      "85% of the variance in the dependent variable is predictable/explained by the independent variable.",
      "The model will make correct predictions 85% of the time.",
      "The slope of the regression line is 0.85."
    ],
    correctIndex: 1,
    explanation: "R^2 represents the proportion of the variance in the dependent variable that is predictable from the independent variable. An R^2 of 0.85 means 85% of the fluctuations in Y are mathematically explained by changes in X."
  },
  {
    question: "Which of the following values is mathematically impossible for a Pearson Correlation Coefficient (r)?",
    options: ["-0.95", "0.00", "1.05", "0.82"],
    correctIndex: 2,
    explanation: "The Pearson Correlation Coefficient (r) is strictly bounded between -1 and 1 inclusive. A value of 1.05 is mathematically impossible."
  },
  {
    question: "When constructing a summation table for manual regression calculations, which of the following columns is NOT strictly required to calculate the slope (β1) and intercept (β0)?",
    options: ["x^2", "y^2", "xy", "All are strictly required."],
    correctIndex: 1,
    explanation: "To calculate the slope and intercept, you only need n, Σx, Σy, Σx^2, and Σxy. The Σy^2 column is only required if you are also calculating the Pearson correlation coefficient (r) or the Coefficient of Determination (R^2)."
  }
];