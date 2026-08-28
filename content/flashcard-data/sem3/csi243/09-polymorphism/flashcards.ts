export const flashcardData = [
  {
    front: "Concrete type or type variable?",
    back: "Uppercase names such as Int, Bool, Shape are concrete types. Lowercase names such as a, b, k, v are type variables standing for any type.",
  },
  {
    front: "What can a function of type `[a] -> Int` do?",
    back: "It cannot inspect the elements at all, because an unconstrained a supports no operation. It can only count or structurally rearrange them. Fewer constraints means fewer possible behaviours.",
  },
  {
    front: "Does `a -> b` mean the two types must differ?",
    back: "No. Different letters mean the types MAY differ. In map applied to an Int -> Int function, a and b are both Int.",
  },
  {
    front: "The type inference rule for application",
    back: "If f :: A -> B and e :: A, then f e :: B. If the argument's type is not A, the application is rejected before evaluation.",
  },
  {
    front: "Why does `pairUp 1 'a'` fail for `a -> a -> (a, a)`?",
    back: "One type variable stands for one type throughout a given application, so both arguments must have the same type. Use a -> b -> (a, b) to allow them to differ.",
  },
  {
    front: "What is overloading?",
    back: "One name with several implementations, chosen by the type it is used at. == compares Integer, Char, Bool, and String using a different underlying implementation each time.",
  },
  {
    front: "What is a type class?",
    back: "A named collection of operations a type may provide. A type providing them is an instance. A class is not a type — you cannot have a value of type Eq.",
  },
  {
    front: "How do you read `Num a => [a] -> a`?",
    back: "For any type a that is a member of Num, the function takes a list of a and returns an a. Everything before => is the constraint; everything after is the type.",
  },
  {
    front: "The generality trade-off",
    back: "More constraints: fewer types, more capability. Fewer constraints: more types, less capability. Choose the most general signature that still permits what the function needs.",
  },
  {
    front: "What does \"No instance for (Num a)\" mean?",
    back: "An arithmetic operation was used on an unconstrained type variable. The fix is to add Num a => to the signature. The message names the class and the operation that required it.",
  },
  {
    front: "Which class does each need: ==, sort, print, div, /, maxBound?",
    back: "Eq, Ord, Show, Integral, Fractional, Bounded respectively.",
  },
  {
    front: "Why does `Ord a =>` alone give you `==` as well?",
    back: "Ord requires Eq, since ordering presupposes equality. Every Ord instance is also an Eq instance, so writing (Eq a, Ord a) => is redundant.",
  },
  {
    front: "Why does `average xs = sum xs / length xs` fail?",
    back: "length returns Int, but / requires both operands to share one Fractional type and Int is not Fractional. Use sum xs / fromIntegral (length xs).",
  },
  {
    front: "Why does `read` usually need a type annotation?",
    back: "The same text could produce several types — read \"42\" could be Integer or Double — so read cannot tell which was meant. Annotate: read s :: Integer.",
  },
  {
    front: "Why has `Integer` no Bounded instance?",
    back: "Bounded provides minBound and maxBound, which presuppose a largest and smallest value. Integer is arbitrary-precision and grows until memory runs out, so no maximum exists.",
  },
  {
    front: "The declaration of `Maybe`",
    back: "data Maybe a = Nothing | Just a. Nothing means no result; Just holds a value of type a. It makes failure part of the result type.",
  },
  {
    front: "Why prefer Maybe over error?",
    back: "error stops the whole program and cannot be recovered from. Nothing is an ordinary value the caller can handle, the possibility of failure is visible in the signature, and the compiler forces the caller to cover it.",
  },
  {
    front: "How do you write an instance by hand?",
    back: "instance ClassName TypeName where, then define the class's operations for your type. Remove the class from any deriving clause first — a type may have only one instance of a class.",
  },
];
