export const flashcardData = [
  {
    front: "What is a higher-order function?",
    back: "A function that takes another function as an argument, or returns one as its result. map, filter, foldr, and zipWith are all higher-order.",
  },
  {
    front: "What does it mean that functions are first-class values?",
    back: "They can be passed to functions, returned from functions, and stored in data structures, with no restriction on their use.",
  },
  {
    front: "Write the lambda for λx ● x + x, and apply it to 3",
    back: "\\x -> x + x, applied as (\\x -> x + x) 3, giving 6. The parentheses are required because the lambda body extends as far right as it can.",
  },
  {
    front: "What is currying?",
    back: "Every Haskell function takes exactly one argument. add x y = x + y really means add = \\x -> (\\y -> x + y): it takes x and returns a function awaiting y.",
  },
  {
    front: "How do -> and application associate?",
    back: "-> associates to the right, so Integer -> Integer -> Integer is Integer -> (Integer -> Integer). Application associates to the left, so add 3 4 is (add 3) 4.",
  },
  {
    front: "What is partial application?",
    back: "Supplying fewer arguments than the full count. add 3 is a complete value of type Integer -> Integer. It follows directly from currying, and is impossible with a tupled function.",
  },
  {
    front: "Converting between operators and functions",
    back: "Backticks make a function infix: 7 `div` 2. Parentheses make an operator an ordinary curried function: (+) 3 2. The latter is needed because a bare operator is not a valid expression.",
  },
  {
    front: "What is a section? Give the lambda meaning of (x⊕) and (⊕y)",
    back: "An operator with one side already supplied. (x⊕) is \\y -> x ⊕ y, fixing the left argument. (⊕y) is \\x -> x ⊕ y, fixing the right.",
  },
  {
    front: "Why can't (-5) subtract five?",
    back: "The minus sign also marks negative literals, so (-5) parses as the number negative five, not a section. Use subtract 5. Left sections like (5-) are unaffected.",
  },
  {
    front: "Signature and definition of `map`",
    back: "map :: (a -> b) -> [a] -> [b]; map _ [] = [] and map f (x:xs) = f x : map f xs. Length is always preserved; the element type may change.",
  },
  {
    front: "Signature and definition of `filter`",
    back: "filter :: (a -> Bool) -> [a] -> [a]; filter _ [] = [], then guards | p x = x : filter p xs | otherwise = filter p xs. Element type is unchanged; the result may be shorter.",
  },
  {
    front: "How does `takeWhile` differ from `filter`?",
    back: "takeWhile returns the longest prefix satisfying the predicate and stops permanently at the first failure. filter tests every element. takeWhile (<4) [1,2,3,9,1] is [1,2,3]; filter gives [1,2,3,1].",
  },
  {
    front: "Signature of `foldr` and its three arguments",
    back: "foldr :: (a -> b -> b) -> b -> [a] -> b. A function combining an element with the accumulated result, a starting value returned for [], and the list.",
  },
  {
    front: "How do you predict a `foldr` by substitution?",
    back: "Replace every : with the operator and the final [] with the starting value. foldr (+) 0 [1,2,3] becomes 1 + (2 + (3 + 0)) = 6.",
  },
  {
    front: "Why do foldr and foldl differ for (-) but not (+)?",
    back: "Addition is associative so nesting direction does not matter. Subtraction is not: foldr gives 1-(2-(3-0)) = 2, foldl gives ((0-1)-2)-3 = -6.",
  },
  {
    front: "`sum`, `product`, `and`, `or` as folds",
    back: "sum = foldr (+) 0; product = foldr (*) 1; and = foldr (&&) True; or = foldr (||) False. Each base value is the identity for its operator.",
  },
  {
    front: "Function composition: type and reading direction",
    back: "(.) :: (b -> c) -> (a -> b) -> a -> c, with (f . g) x = f (g x). Read right to left: apply g first, then f.",
  },
  {
    front: "When should you avoid point-free style?",
    back: "Whenever omitting the argument makes the code harder to follow. A readable named function beats a dense chain of operators; clarity comes before cleverness.",
  },
];
