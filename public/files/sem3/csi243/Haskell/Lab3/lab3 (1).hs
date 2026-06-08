--Kondwani Kadzongwe Id<202108203>

{- atPosition :: [c]->Int->(c,Int)
   atPosition [c] y
   Base: If head[c]==[c]!!y return (head[c],y)
   Recursive Step: If head[c]/=[c]!!y return atPosition(tail x) (y-1)
   Error: if y<0 || y> [c].length
-}
atPosition :: Eq c =>[c]->Int->(c,Int)

atPosition x y= if (head x) == x!!y then (head x,y) else atPosition (tail x) (y-1)

{-  largerY :: [Int]->Int->[Int]
    largerY [Int] y
    Base:if head ac>y ,[Int]+head ac
    Recursive step: if head ac<y, return largerY tail ac y
    Error:

-}
largerY :: [Int]->Int->[Int]
largerY [] y=[]
largerY ac y= if head ac>y then head ac: largerY(tail ac) y else largerY (tail ac) y

{- positiveNumbers :: [Int]->[Int]
   positiveNumbers as
   Base: if head as>0 , [Int]+head as
   Recursive step: if head as>0, positiveNumbers(tail as)

-}

positiveNumbers :: [Int]->[Int]
positiveNumbers [] =[]
positiveNumbers as = if head as>0 then head as : positiveNumbers (tail as)  else positiveNumbers (tail as) 

{- isSorted ac :: [Int]->Bool
   Base: if ac=[], True
   Recursive Step: if !(as=[] && as.length==1), return (x>=y) && isSorted(y:ac)
-}

isSorted :: [Int]->Bool
isSorted[]= True
isSorted [x]=True
isSorted (x:y:ac)= (x>=y)&& isSorted (y:ac)