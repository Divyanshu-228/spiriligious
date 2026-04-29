#program to calculate the factorial of a given number 
'''Method -> 1 '''
# def facto():
#     num=int(input("Enter an number: "))
#     fact = 1
#     for i in range (1,num+1):
#         fact = fact*i
#     print(f"Factorial of {num} is {fact}")
#     ask= input((f"Do you want to enter another number(Y/N): "))
#     if ask in "Yy":
#         facto()
#     else:
#         exit()
# facto()

'''Method -> 2 '''
num = 0
fact = 0 

def facto():
    num = int(input("enter a number: "))
    fact = 1

    while num>1:
        fact *= num
        num -=1

print(f"factorial of {num} is {fact}")
facto()
