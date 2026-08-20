{-# OPTIONS_GHC -Wno-unrecognised-pragmas #-}
{-# HLINT ignore "Redundant bracket" #-}

sumNumbers :: Int->Int
sumNumbers n |n==0    =0
             |n>0     =(n-1)+sumNumbers(n-1)

powerNum :: Int->Int->Int
powerNum x y |y==0        =1
             |y==1        =x
             |y>0         =x * powerNum x (y-1)
             |otherwise  = error "Enter a number bigger than 0"

concatLists :: [a]->[a]->[a]
concatLists xs []=xs
concatLists [] ys=ys
concatLists xs ys = (head xs): concatLists (tail xs) ys

atPosition :: Eq a=>[a]->Int->(Int,a)
atPosition xs y |head xs ==xs!!y  =(y,head xs)
                |head xs /=xs!!y  = atPosition (tail xs) (y-1)

lastElement :: [a]->a
lastElement xs |length xs==1 =head xs
               |length xs>1 =lastElement (tail xs)
               |otherwise   =error "wrong"

revList :: [a]->[a]
revList xs |length xs==1       =[head xs]
           |length xs>1        =lastElement xs : revList (init xs)

repeatList :: Int->[a]->[a]
repeatList 0 _=[]
repeatList x xs= xs++repeatList (x-1) xs
            

            
--largerY :: Ord a=>[a]->Int->[a]
--largerY [] y= []
--largerY xs y | head xs>y = head xs: largerY
  --           | head xs<y = largerY (tail xs) y

