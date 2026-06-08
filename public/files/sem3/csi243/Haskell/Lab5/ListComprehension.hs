--Kondwani Kadzongwe <Id:202108203>
-- Question 1

squareOdd :: [Int]
squareOdd= [x^2| x<-[1..79],(mod x 2)/=0]

--Question 2
isVowel :: Char->Bool
isVowel a |a=='a'    =True
          |a=='e'    =True
		  |a=='i'    =True
		  |a=='o'    =True
		  |a=='u'    =True
		  |otherwise =False

toUpperCase :: Char->Char
toUpperCase a |a=='a' ='A'
              |a=='b' ='B'
			  |a=='c' ='C'
			  |a=='d' ='D'
			  |a=='e' ='E'
			  |a=='f' ='F'
			  |a=='g' ='G'
			  |a=='h' ='H'
			  |a=='i' ='I'
			  |a=='j' ='J'
			  |a=='k' ='K'
			  |a=='l' ='L'
			  |a=='m' ='M'
			  |a=='n' ='N'
			  |a=='o' ='O'
			  |a=='p' ='P'
			  |a=='q' ='Q'
			  |a=='r' ='R'
			  |a=='s' ='S'
			  |a=='t' ='T'
			  |a=='u' ='U'
			  |a=='v' ='V'
			  |a=='w' ='W'
			  |a=='x' ='X'
			  |a=='y' ='Y'
			  |a=='z' ='Z'
			  
alphabet :: [Char]

alphabet= [toUpperCase x|x<-['a'..'z'], (isVowel x)/=True]

--Question 3
pythagorean :: [(Int,Int,Int)]
pythagorean= [(x,y,z)| x<-[1..100],y<-[1..100],z<-[1..100],z^2==(x^2+y^2),x<y&&y<z]

--Question 4
marks :: [Float] -> (Float, Float)
marks xs = ((head xs + head (tail xs)) / 2, (head(tail(tail xs)) + head(tail(tail(tail xs))) + (last xs)) / 3)

averageMark :: [[Float]] -> [(Float, Float)]
averageMark xs = [marks x | x <- xs]




