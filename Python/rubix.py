import random 
import time 

def entry():
    loop = -1
    while loop not in range(0, 100):
        try:
            loop = int(input("Enter How Many Moves You Want For The Scramble"))
        except ValueError:
            print ("Don't be dumb, enter a number")
    return loop
                    
notation = ["L", "L", "R", "R'", "U", "U'", "D", "D'", "B", "B'"]
loop = entry()

scramble = []
move = ("")

for i in range (0, loop):
    move = random.choice(notation)
    scramble.append(move)

print (*scramble)