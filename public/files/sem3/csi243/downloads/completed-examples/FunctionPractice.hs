module FunctionPractice where

-- Return the cube of a whole number.
cube :: Integer -> Integer
cube number = number * number * number

-- Return True exactly when number is below zero.
isNegative :: Integer -> Bool
isNegative number = number < 0

-- Return the reciprocal of a non-zero fractional value.
-- Calling this with zero produces Infinity for floating-point types.
reciprocalValue :: Double -> Double
reciprocalValue number = 1 / number

-- Convert a percentage to a pass/fail label.
resultLabel :: Double -> String
resultLabel mark =
  if mark >= 50
    then "Pass"
    else "Fail"

