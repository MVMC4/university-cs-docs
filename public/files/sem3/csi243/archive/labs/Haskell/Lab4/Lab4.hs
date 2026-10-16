-- Kondwani Kadzongwe <Id: 202108203>
--Task 1
{-addSub :: (Int,Int)->(Int,Int)
  addSub (a,b)= case (a,b) of
         a>b -> (a+b,a-b)
		 _ -> (a+b,b-a)

-}
addSub :: (Int,Int)->(Int,Int)
addSub (a,b)| a>b       =(a+b,a-b)
            | otherwise =(a+b,b-a) 
--Task2
{-swapIntegers :: (Int,Int)-> (Int,Int)
 swapIntegers (a,b)= case (a,b) of
         a/=b -> (b,a)
		 _ -> (a,a)
  				
-}
swapIntegers :: (Int,Int)->(Int,Int)
swapIntegers (a,b) | a/=b      =(b,a)
                   | otherwise =(a,a)
--Task3
{-Methods gps, lgs,lgg, recc-}
{-gps :: Int->Float
  gps a = case a of
   a<40 && a>0     ->0
   a>=40 && a<45   ->1
   a>=45 && a<50   ->1.5
   a>=50 && a<55   ->2
   a>=55 && a<60   ->2.5
   a>=60 && a<65   ->3
   a>65 && a<70    ->3.5
   a>=70 && a<75   ->4
   a>=75 && a<80   ->4.5
   a>=80 && a<=100 ->5
	_ -> error "Wrong input,please enter a valid input"

  
-}
gps :: Int->Float
gps a | a<40 && a>0        =0
      | a>=40 && a<45      =1
	  | a>=45 && a<50      =1.5
	  | a>=50 && a<55      =2
	  | a>=55 && a<60      =2.5
	  | a>=60 && a<65      =3
	  | a>65 && a<70       =3.5
	  | a>=70 && a<75      =4
	  | a>=75 && a<80      =4.5
	  | a>=80 && a<=100	   =5
	  | otherwise          = error "Wrong input,please enter a valid input"
{-lgs :: Int->String
   lgs a = case a of
   a<40 && a>0     ->"F"
   a>=40 && a<45   ->"E"
   a>=45 && a<50   ->"E+"
   a>=50 && a<55   ->"D"
   a>=55 && a<60   ->"D+"
   a>=60 && a<65   ->"C"
   a>65 && a<70    ->"C+"
   a>=70 && a<75   ->"B"
   a>=75 && a<80   ->"B+"
   a>=80 && a<=100 ->"A"
	_ -> error "Wrong input,please enter a valid input"
 
 
-}
lgs :: Int->String
lgs a | a<40 && a>0        ="F"
      | a>=40 && a<45      ="E"
	  | a>=45 && a<50      ="E+"
	  | a>=50 && a<55      ="D"
	  | a>=55 && a<60      ="D+"
	  | a>=60 && a<65      ="C"
	  | a>65 && a<70       ="C+"
	  | a>=70 && a<75      ="B"
	  | a>=75 && a<80      ="B+"
	  | a>=80 && a<=100	   ="A"
	  | otherwise          = error "Wrong input,please enter a valid input"

{-lgg :: Float->String
lgg a = case a of
   a==0     ->"F"
   a==1     ->"E"
   a==1.5   ->"E+"
   a==2     ->"D"
   a==2.5   ->"D+"
   a==3     ->"C"
   a==3.5   ->"C+"
   a==4     ->"B"
   a==4.5   ->"B+"
   a==5     ->"A"
	_  -> error "Wrong input,please enter a valid input"
-}
lgg :: Float->String
lgg a | a==0        ="F"
      | a==1        ="E"
	  | a==1.5      ="E+"
	  | a==2        ="D"
	  | a==2.5      ="D+"
	  | a==3        ="C"
	  | a==3.5      ="C+"
	  | a==4        ="B"
	  | a==4.5      ="B+"
	  | a==5	    ="A"
	  | otherwise   = error "Wrong input,please enter a valid input"
{-recc :: Int->String
 recc a = case a of
   a<40 && a>0     ->"Fail"
   a>=40 && a<45   ->"Supplement"
   a>=45 && a<50   ->"Supplement"
   a>=50 && a<55   ->"Pass"
   a>=55 && a<60   ->"Pass"
   a>=60 && a<65   ->"Lower Second Class"
   a>65 && a<70    ->"Lower Second Class"
   a>=70 && a<75   ->"Upper Second Class"
   a>=75 && a<80   ->"Upper Second Class"
   a>=80 && a<=100 ->"First Class"
	_ -> error "Wrong input,please enter a valid input"
-}
recc :: Int->String
recc a | a<40 && a>0        ="Fail"
       | a>=40 && a<45      ="Supplement"
	   | a>=45 && a<50      ="Supplement"
	   | a>=50 && a<55      ="Pass"
	   | a>=55 && a<60      ="Pass"
	   | a>=60 && a<65      ="Lower Second Class"
	   | a>65 && a<70       ="Lower Second Class" 
	   | a>=70 && a<75      ="Upper Second Class"
	   | a>=75 && a<80      ="Upper Second Class"
	   | a>=80 && a<=100	="First Class"
	   | otherwise          = error "Wrong input,please enter a valid input"
