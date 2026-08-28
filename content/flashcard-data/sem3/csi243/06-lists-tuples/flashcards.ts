export const flashcardData = [
  {
    front: "What does it mean that lists are homogeneous?",
    back: "Every element of a list must have the same type. [1, 'a', True] is rejected at compile time because no single element type fits all three.",
  },
  {
    front: "Expand `[1,2,3]` into cons form",
    back: "1:(2:(3:[])). Every list is built one element at a time from the empty list using :, which associates to the right, so it may be written 1:2:3:[].",
  },
  {
    front: "What does `:` require on each side?",
    back: "An element on the left and a list on the right. [1,2] : 3 is a type error. To join two lists use ++, not :.",
  },
  {
    front: "The standard exhaustive split for any list",
    back: "[] matches the empty list and is the base case; (x:xs) matches a non-empty list, binding x to the head and xs to the tail, and is the recursive step.",
  },
  {
    front: "Why does recursion on `(x:xs)` terminate?",
    back: "xs is always one element shorter than the argument, so repeated calls must eventually reach [].",
  },
  {
    front: "Base cases for recursive `sum` and `product`",
    back: "sum [] = 0 and product [] = 1. Each is the identity value for its operation, so it leaves the result unchanged when combined.",
  },
  {
    front: "What is a partial function? Name four on lists.",
    back: "One that is undefined for some inputs its type allows. head, tail, last, init, maximum, minimum, and !! all fail on an empty list or an out-of-range index.",
  },
  {
    front: "`take 6 [1,2,3,4,5]` versus `[1,2] !! 5`",
    back: "take returns the whole list when fewer elements exist — it is total. !! raises an index-too-large exception — it is partial.",
  },
  {
    front: "How do you build a list in a recursive step?",
    back: "Cons the transformed head onto the recursive call: doubleAll (x:xs) = (x * 2) : doubleAll xs. The base case returns [].",
  },
  {
    front: "Shape of a recursive filter",
    back: "Guards decide whether to keep the head: | test = x : f xs, and | otherwise = f xs. Both branches recurse on xs so the list still shrinks.",
  },
  {
    front: "What is arity, and why is arity 1 not allowed?",
    back: "Arity is the number of components in a tuple and is part of its type. (5) is just 5 in brackets — brackets around one expression are grouping, not construction.",
  },
  {
    front: "Why are `(String, Integer)` and `(Integer, String)` different types?",
    back: "A tuple type records the type of each position in order, so swapping positions gives a different type that cannot be used where the other is expected.",
  },
  {
    front: "List or tuple?",
    back: "Ask whether the number of components can change. If yes, a list — same type, varying length. If no and the parts mean different things, a tuple — fixed arity, mixed types.",
  },
  {
    front: "The two parts of a list comprehension",
    back: "Before the pipe is the output function, applied to each surviving element. After it are generators (x <- list) and comma-separated tests that filter. Read | as 'such that'.",
  },
  {
    front: "In `[x + y | x <- [1,2,3], y <- [-3,0,3]]`, which generator varies fastest?",
    back: "The rightmost. x is held while y runs through every value, like a nested loop with the later generator innermost. The result has nine elements.",
  },
  {
    front: "When should you prefer recursion over a comprehension?",
    back: "When the result depends on more than one element at a time (isSorted), when elements combine into a single value (sum), or when the recursion is not over a list at all.",
  },
];
