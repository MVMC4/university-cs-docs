export const quizData = [
  {
    question: "What access pattern does a Stack enforce?",
    options: [
      "First-In, First-Out (FIFO)",
      "Last-In, First-Out (LIFO)",
      "Priority-based access",
      "Random access"
    ],
    correctIndex: 1,
    explanation: "A stack enforces LIFO, meaning the most recently added element is the first to be removed."
  },
  {
    question: "What is the time complexity of the `push` and `pop` operations in an array-based stack?",
    options: [
      "$O(n)$",
      "$O(\\log n)$",
      "$O(1)$",
      "$O(n \\log n)$"
    ],
    correctIndex: 2,
    explanation: "Because operations occur exclusively at the end of the array (the 'top'), no elements need to be shifted, resulting in $O(1)$ time."
  },
  {
    question: "What is 'amortized $O(1)$' time complexity in the context of a dynamic array stack?",
    options: [
      "Every push takes exactly 1 nanosecond.",
      "Most pushes are $O(1)$, but occasional pushes require $O(n)$ reallocation, averaging out to $O(1)$ over many operations.",
      "The stack can only hold 1 element at a time.",
      "The stack automatically deletes old elements."
    ],
    correctIndex: 1,
    explanation: "When the underlying array is full, it must be resized (copied to a new array), taking $O(n)$ time. However, this happens rarely enough that the average cost per push remains $O(1)$."
  },
  {
    question: "In the Balanced Parentheses algorithm, what indicates a failure condition?",
    options: [
      "The stack is empty at the end of the expression.",
      "A closing bracket is encountered when the stack is empty, or the popped opening bracket does not match.",
      "The stack contains only opening brackets.",
      "The expression contains no brackets."
    ],
    correctIndex: 1,
    explanation: "If the stack is empty when a closing bracket appears, there is no matching opening bracket. If the types don't match (e.g., `[` and `}`), the nesting is invalid."
  },
  {
    question: "What is the primary purpose of the Shunting-yard algorithm?",
    options: [
      "To sort an array of numbers.",
      "To convert Infix expressions to Postfix (Reverse Polish Notation) respecting precedence.",
      "To balance parentheses in a string.",
      "To evaluate a Postfix expression."
    ],
    correctIndex: 1,
    explanation: "Dijkstra's Shunting-yard algorithm parses infix expressions and outputs them in postfix notation, which is easier for machines to evaluate without parentheses."
  },
  {
    question: "In the Shunting-yard algorithm, when should an operator be popped from the stack to the output queue?",
    options: [
      "When a left parenthesis is encountered.",
      "When an operator with lower or equal precedence (and left-associative) is read.",
      "When the output queue is full.",
      "When a number is read."
    ],
    correctIndex: 1,
    explanation: "Operators with higher precedence must be applied first. If the incoming operator has lower or equal precedence, the operators already on the stack must be popped and outputted first."
  },
  {
    question: "How does the Shunting-yard algorithm handle a Right Parenthesis `)`?",
    options: [
      "It pushes it onto the stack.",
      "It appends it to the output queue.",
      "It pops operators from the stack to the output until a Left Parenthesis `(` is encountered, then discards the `(`.",
      "It clears the entire stack."
    ],
    correctIndex: 2,
    explanation: "The right parenthesis signifies the end of a sub-expression. All operators within that sub-expression (on the stack) must be popped to the output, and the matching left parenthesis is discarded."
  },
  {
    question: "What is the postfix equivalent of the infix expression `3 + 4 * 5`?",
    options: [
      "`3 4 5 + *`",
      "`3 4 5 * +`",
      "`+ 3 * 4 5`",
      "`3 4 + 5 *`"
    ],
    correctIndex: 1,
    explanation: "Multiplication has higher precedence than addition. The `4` and `5` are multiplied first (`4 5 *`), and then the result is added to `3` (`3 4 5 * +`)."
  },
  {
    question: "What error occurs if you attempt to `pop` from an empty stack?",
    options: [
      "Overflow",
      "Underflow",
      "Segmentation Fault",
      "Index Out of Bounds"
    ],
    correctIndex: 1,
    explanation: "Attempting to remove an element from an empty structure is universally called an Underflow error."
  },
  {
    question: "Why is a node-based stack implementation often preferred over an array-based one in systems with strict memory limits?",
    options: [
      "It has better cache locality.",
      "It does not require contiguous memory allocation and can grow dynamically without expensive reallocation copies.",
      "It is faster to access the middle elements.",
      "It uses less memory per element."
    ],
    correctIndex: 1,
    explanation: "Array-based stacks may require doubling in size, temporarily needing 3x the memory during the copy phase. Node-based stacks allocate memory piecemeal, avoiding large contiguous allocations."
  },
  {
    question: "In the evaluation of a Postfix expression, what data structure is used?",
    options: [
      "Queue",
      "Stack",
      "Deque",
      "Priority Queue"
    ],
    correctIndex: 1,
    explanation: "Postfix evaluation uses a stack. Operands are pushed; when an operator is encountered, two operands are popped, the operation is performed, and the result is pushed back."
  },
  {
    question: "What happens to the Left Parenthesis `(` when it is popped from the stack during the processing of a Right Parenthesis `)`?",
    options: [
      "It is appended to the output queue.",
      "It is pushed back onto the stack.",
      "It is discarded (not added to the output).",
      "It causes a syntax error."
    ],
    correctIndex: 2,
    explanation: "Parentheses are control characters for precedence; they do not appear in the final postfix expression and are simply discarded when matched."
  },
  {
    question: "If the stack is not empty after processing the entire infix expression in the Shunting-yard algorithm, what must be done?",
    options: [
      "Nothing, the algorithm is finished.",
      "All remaining operators on the stack must be popped and appended to the output queue.",
      "The expression is invalid.",
      "The operators are deleted."
    ],
    correctIndex: 1,
    explanation: "Any operators remaining on the stack have no more incoming operands to wait for, so they must be popped to the output to complete the postfix expression."
  },
  {
    question: "What is the time complexity of the Balanced Parentheses algorithm for an expression of length $n$?",
    options: [
      "$O(1)$",
      "$O(\\log n)$",
      "$O(n)$",
      "$O(n^2)$"
    ],
    correctIndex: 2,
    explanation: "The algorithm iterates through the string exactly once, performing $O(1)$ stack operations per character, resulting in $O(n)$ time."
  },
  {
    question: "Which of the following infix expressions would result in the postfix expression `A B + C *`?",
    options: [
      "`A + B * C`",
      "`(A + B) * C`",
      "`A * B + C`",
      "`A + B + C`"
    ],
    correctIndex: 1,
    explanation: "The addition `A + B` must happen before the multiplication by `C`. In infix, this requires parentheses: `(A + B) * C`, which converts to `A B + C *`."
  }
];
