--Kondwani Kadzongwe <ID:202108203>
--Lab2
module ListFunctions where
--Task1
    sumNumbers :: Int->Int
    sumNumbers n= if n==1 then 0 else if n>1 then (n-1)+sumNumbers(n-1) else -1     

--Task 2
    powerNum:: Int -> Int -> Int
    powerNum b c= if c==0 then 1 else if c==1 then b else b*powerNum b(c-1)

--Task 3
    listLength ::[c] -> Int
    listLength [] = 0
    listLength (_:ac) = 1 + listLength ac

    concatLists :: [c] -> [c] -> [c]
    concatLists [] ac = ac
    concatLists bc [] = bc

    concatLists ac bc = [head ac] ++ concatLists (tail ac) bc 


    elementOccurs :: Eq c => c -> [c] -> Int
    elementOccurs _ [] = 0
    elementOccurs a ac = if  a == head ac then 1 + elementOccurs a (tail ac) else elementOccurs a (tail ac)


    isElementIn :: Int -> [Int] -> Bool
    isElementIn _ [] = False
    isElementIn a ac = if a == head ac then True else isElementIn a (tail ac)

