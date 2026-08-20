--Kondwani Kadzongwe <ID:202108203>
--Question 1
{- lastElement :: [a]->a-}
lastElement::[a]->a

lastElement xs |(length xs)==1 =head xs
         |(length xs)>1 = lastElement (tail xs)
		 
--Question 2
{- revList :: [a]->[a]-}
revList :: [a]->[a]
revList xs |(length xs)==1    =[head xs]
		   |(length xs)>1     = (lastElement xs) : revList(init xs)
		   
--Question 3
{-swapElements :: (a,b)->(b,a)-}
swapElements :: (a,b)->(b,a)
swapElements (x,y)=(y,x)

--Question 4
{-twoLists :: [a]->[b]->[(a,b)]-}
twoLists:: [a]->[b]->[(a,b)]
twoLists xs ys | (length xs)==1&&(length ys)==1  =[(head xs, head ys)]
               | (length xs)>1&&(length ys)>1    = (head xs,head ys): twoLists(tail xs) (tail ys)
