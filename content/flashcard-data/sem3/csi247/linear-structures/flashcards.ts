export const flashcardData = [
  { front: "Array Stack IsFull", back: "Condition: `top == capacity - 1`. Prevents ArrayIndexOutOfBoundsException on push." },
  { front: "Array Stack IsEmpty", back: "Condition: `top == -1`. Prevents EmptyStackException on pop/peek." },
  { front: "Infix to Postfix (Stack)", back: "Operands output immediately. Operators pushed to stack. Pop operators with higher or equal precedence before pushing a new one." },
  { front: "Linked List GPA Filter", back: "Traverse nodes, check if `course_code` starts with 'CSI'. Accumulate `credit * grade` and total credits. Divide at the end." },
  { front: "String Character Exchange", back: "Requires `char[]` due to String immutability. Swap indices, then `new String(charArray)`." },
  { front: "Stack Peek Operation", back: "Returns `stack[top]` without modifying the `top` pointer. Throws exception if `isEmpty()`." },
  { front: "Postfix Evaluation", back: "Scan left to right. Push operands. On operator, pop two, apply, push result. Final stack contains the answer." },
  { front: "Queue vs Stack", back: "Queue is FIFO (enqueue rear, dequeue front). Stack is LIFO (push top, pop top)." },
  { front: "Circular Queue Full Condition", back: "`(rear + 1) % capacity == front`. Sacrifices one slot to distinguish from empty state." },
  { front: "Doubly Linked List Delete", back: "Update `node.prev.next = node.next` and `node.next.prev = node.prev`. Handles boundaries with null checks." },
  { front: "Singly Linked List Reversal", back: "Iterate with `prev`, `curr`, `next`. Set `curr.next = prev`, advance all three. $\\mathcal{O}(N)$ time, $\\mathcal{O}(1)$ space." },
  { front: "Floyd's Cycle Detection", back: "Slow moves 1 step, Fast moves 2 steps. If they meet, a cycle exists. $\\mathcal{O}(N)$ time, $\\mathcal{O}(1)$ space." },
  { front: "Monotonic Stack", back: "Maintains elements in sorted order. Used for 'Next Greater Element' problems in $\\mathcal{O}(N)$ time." },
  { front: "Deque (Double-Ended Queue)", back: "Allows $\\mathcal{O}(1)$ insertion and deletion at both front and rear. Backs sliding window maximum algorithms." },
  { front: "Stack Overflow vs Underflow", back: "Overflow: Pushing to a full stack. Underflow: Popping from an empty stack." }
];