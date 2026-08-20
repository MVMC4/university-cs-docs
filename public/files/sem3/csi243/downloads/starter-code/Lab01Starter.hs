-- PURPOSE: Build a personal greeting from a name.
-- INPUT: A String containing the name.
-- OUTPUT: A new String containing the complete greeting.
makeGreeting :: String -> String
-- STARTER PLACEHOLDER: Replace this temporary text with the real greeting.
makeGreeting name = "TODO"

-- PURPOSE: Double a whole number without performing input or output.
-- INPUT: One Integer.
-- OUTPUT: The input multiplied by two.
double :: Integer -> Integer
-- STARTER PLACEHOLDER: This currently returns the input unchanged. Fix it.
double number = number

-- ENTRY POINT: Sequence the program's input and output actions.
main :: IO ()
main = do
  -- OUTPUT: Ask the user for text.
  putStrLn "What is your name?"

  -- INPUT: Perform getLine and bind its resulting String to name.
  name <- getLine

  -- PROCESS + OUTPUT: Build the greeting purely, then display it.
  putStrLn (makeGreeting name)

  -- OUTPUT: Ask for a whole number. Keyboard input still arrives as text.
  putStrLn "Enter a whole number:"

  -- INPUT: Bind the entered text to numberText.
  numberText <- getLine

  -- CONVERSION: Parse the String as an Integer.
  let number = read numberText :: Integer

  -- PROCESS: Calculate a new immutable value with a pure function.
  let answer = double number

  -- OUTPUT: Convert the answer to text, join the Strings, and display them.
  putStrLn ("Twice that number is " ++ show answer)
