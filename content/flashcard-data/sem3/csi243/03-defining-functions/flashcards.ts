export const flashcardData = [
  {
    front: "Pure function",
    back: "A function whose result depends only on its inputs and which performs no observable input/output effect. The same inputs produce the same result.",
  },
  {
    front: "Read `cube :: Integer -> Integer` aloud",
    back: "cube takes one Integer and returns one Integer. The type signature states the function's input and result types.",
  },
  {
    front: "`putStrLn` versus `print`",
    back: "putStrLn outputs a String without surrounding quotes and adds a newline. print displays any Show value using show, so printing a String includes quotation marks.",
  },
  {
    front: "`show`",
    back: "A pure conversion from a displayable value to a String. For example, show 42 evaluates to \"42\" but performs no output.",
  },
  {
    front: "`main :: IO ()`",
    back: "main is the program's entry action. IO marks interaction with the outside world, and () means the action's useful result is the unit value rather than calculated data.",
  },
  {
    front: "Purpose of `do` in an IO action",
    back: "A do block sequences actions from top to bottom and allows later steps to use results produced by earlier actions.",
  },
  {
    front: "`getLine :: IO String`",
    back: "An input action that reads one line from standard input. When performed, it produces the entered text as a String.",
  },
  {
    front: "`<-` versus `let` in a do block",
    back: "Use <- to perform an action and name its result, as in raw <- getLine. Use let to name the result of a pure expression, as in let number = read raw :: Integer.",
  },
  {
    front: "Risk of `read`",
    back: "read parses text as a type inferred from context, but malformed input causes a runtime exception. Its target type should be clear and user input should eventually be validated safely.",
  },
  {
    front: "Input-process-output pipeline",
    back: "Acquire data with an IO action, transform the resulting value with pure functions, then perform another IO action to present the result.",
  },
];
