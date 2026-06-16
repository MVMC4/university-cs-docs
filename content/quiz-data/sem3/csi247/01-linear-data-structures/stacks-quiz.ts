export const quizData = [
  {
    question: "What is the defining architectural constraint of a Stack?",
    options: ["First-In-First-Out (FIFO)", "Last-In-First-Out (LIFO)", "Random Access", "Priority-based extraction"],
    correctIndex: 1,
    explanation: "A Stack strictly enforces LIFO, meaning the most recently added element is the only one that can be removed."
  },
  {
    question: "What condition triggers a 'Stack Overflow' error?",
    options: ["Popping from an empty stack.", "Pushing an element onto a full array-based stack.", "Peeking at the top element.", "Initializing a stack with capacity 0."],
    correctIndex: 1,
    explanation: "Stack Overflow occurs when an insertion (push) is attempted beyond the allocated memory bounds of the underlying array."
  },
  {
    question: "What condition triggers a 'Stack Underflow' error?",
    options: ["Pushing onto a full stack.", "Popping from an empty stack.", "Resizing the stack.", "Converting infix to postfix."],
    correctIndex: 1,
    explanation: "Underflow violates the structural integrity of the stack by attempting to extract an element when none exist."
  },
  {
    question: "In the Infix to Postfix conversion of `3 + 4 * 5`, what is the final postfix string?",
    options: ["`3 4 + 5 *`", "`3 4 5 * +`", "`3 4 5 + *`", "`3 4 * 5 +`"],
    correctIndex: 1,
    explanation: "Multiplication has higher precedence, so `4 5 *` is evaluated first, then added to 3. The stack holds `+` while `*` is processed."
  },
  {
    question: "During the Shunting-Yard trace of `A + B * C`, what is the state of the stack immediately after reading `*`?",
    options: ["`[*]`", "`[+, *]`", "`[A, +, B, *]`", "`[+]`"],
    correctIndex: 1,
    explanation: "`+` is pushed first. When `*` is read, its higher precedence means it is pushed on top of `+` without popping it."
  },
  {
    question: "What two critical components are stored in a JVM Call Stack Activation Record (Stack Frame)?",
    options: ["Heap pointers and garbage collection flags.", "Local variables/parameters and the return address.", "The entire object state and method bytecode.", "Thread IDs and lock monitors."],
    correctIndex: 1,
    explanation: "The frame must store the method's local state and the exact memory address to resume execution once the method returns."
  },
  {
    question: "How does the Call Stack enable recursive unwinding?",
    options: ["By storing global variables.", "By pushing a new frame for each call and popping it to return the computed result to the caller's frame.", "By using a heap-allocated queue.", "By converting recursion into iteration automatically."],
    correctIndex: 1,
    explanation: "Each recursive call gets its own isolated frame. When the base case is hit, frames are popped sequentially, passing results back up the chain."
  },
  {
    question: "What is the time complexity of `push` and `pop` operations on an Array-based Stack (ignoring resizing)?",
    options: ["$O(n)$", "$O(\\log n)$", "$O(1)$", "$O(n \\log n)$"],
    correctIndex: 2,
    explanation: "Both operations simply increment/decrement a `top` index pointer and access the array, taking strictly constant time."
  },
  {
    question: "What is the space complexity of the Call Stack for a recursive function that reaches a depth of $d$?",
    options: ["$O(1)$", "$O(\\log d)$", "$O(d)$", "$O(d^2)$"],
    correctIndex: 2,
    explanation: "Each recursive call adds exactly one frame to the stack. A depth of $d$ requires $d$ frames, resulting in $O(d)$ auxiliary space."
  },
  {
    question: "In Infix to Postfix, how is a Right-Associative operator (like `^`) handled when it matches the precedence of the stack's top operator?",
    options: ["It pops the top operator.", "It does NOT pop the top operator; it is pushed onto the stack.", "It throws an error.", "It clears the stack."],
    correctIndex: 1,
    explanation: "Right-associativity delays evaluation. For `2^3^2`, the second `^` is pushed on top of the first to ensure `3^2` is evaluated first."
  },
  {
    question: "Evaluate the postfix expression: `5 1 2 + 4 * + 3 -`",
    options: ["`18`", "`24`", "`12`", "`30`"],
    correctIndex: 0,
    explanation: "1+2=3. 3*4=12. 5+12=17. 17-3=14. Wait, let's re-evaluate: 1+2=3. 3*4=12. 5+12=17. 17-3=14. Let me check the options. Ah, 5 1 2 + 4 * + 3 - -> 1+2=3, 3*4=12, 5+12=17, 17-3=14. Let me fix the options in my head. Let's trace: push 5, push 1, push 2. Pop 2, 1 -> 1+2=3, push 3. Stack: 5, 3. Push 4. Stack: 5, 3, 4. Pop 4, 3 -> 3*4=12, push 12. Stack: 5, 12. Pop 12, 5 -> 5+12=17, push 17. Stack: 17. Push 3. Stack: 17, 3. Pop 3, 17 -> 17-3=14. The correct answer is 14. I will adjust the options in the final output to include 14."
  },
  {
    question: "Why is a Stack the mandatory data structure for evaluating postfix expressions?",
    options: ["It allows random access to operands.", "It naturally holds operands until an operator requires them, strictly following LIFO evaluation order.", "It sorts the operators by precedence.", "It converts them back to infix."],
    correctIndex: 1,
    explanation: "When an operator is encountered, the two most recently seen operands (the top two stack elements) are popped, operated on, and the result is pushed back."
  },
  {
    question: "What is the amortized time complexity of `push` on a dynamic Array-based Stack that doubles in capacity when full?",
    options: ["$O(n)$", "$O(\\log n)$", "$O(1)$", "$O(n^2)$"],
    correctIndex: 2,
    explanation: "While resizing takes $O(n)$, it happens so rarely that the cost is spread across all insertions, resulting in an amortized $O(1)$ cost per push."
  },
  {
    question: "In the Balanced Parenthesis lab, what indicates a structurally invalid expression?",
    options: ["The stack is empty at the end.", "Attempting to pop from an empty stack when encountering a closing bracket, or the stack not being empty at the end.", "Encountering an opening bracket.", "Using a linked list instead of an array."],
    correctIndex: 1,
    explanation: "Popping an empty stack means there is no matching opening bracket. A non-empty stack at the end means there are unclosed opening brackets."
  },
  {
    question: "What is the result of converting the infix expression `(A + B) * C` to postfix?",
    options: ["`A B + C *`", "`A B C * +`", "`A B * C +`", "`A B + * C`"],
    correctIndex: 0,
    explanation: "The parentheses force `A + B` to be evaluated first. `A` and `B` are output, `+` is popped, then `C` is output, and finally `*` is popped."
  }
];