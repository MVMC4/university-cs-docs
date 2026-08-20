module Main where

-- Return the cube of a whole number.
cube :: Integer -> Integer
cube x = x * x * x

-- Run a small visible demonstration of cube.
main :: IO ()
main = do
  putStrLn "The cube of 4 is:"
  print (cube 4)

