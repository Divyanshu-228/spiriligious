#functions in Python 
'''
functions can be defined as a pedefined block of code which can be called whenever needed
Two Types :-
    1- built-in --> predefied in a language to perforn soom certain operation
    2- user-defined --> are defined/created by user as per his requiremets for certain task 
advantage :-
    avoid repeatation of logic and to make code short and reuseable.
-----------------------------------------------------------------------------------
'''
def greet():
    print("Hello World !!!")
#greet() #calling an function so can be execueted
'''--------------------------------------------------------------------------------'''
#positonal arguements 
def add_num(a,b):
    sum = a+b 
    print(f"Sum of {a,b} is {sum}")
#add_num(4,5) #assigning depends on the position of variables enterd
'''--------------------------------------------------------------------------------'''
#keyword arguement
def my_pet(name,type):
    print(f"i have an {type} and name is {name}")
# my_pet(type="cat",name="apex") #position dosen't matter...
'''--------------------------------------------------------------------------------'''
#default arguement (don't need to specify the value each time)
def say_hi(name="Guest"):
    print(f"HI {name}!")
'''say_hi(name="alex")
say_hi()'''
'''--------------------------------------------------------------------------------'''
#Using return 
def product(a,b):
    return a*b
'''pro = product(5,6)
print(f"product of 5 and 6 is {pro}")'''
'''--------------------------------------------------------------------------------
Scope of Variable is if decleared inside a function ramains inside it only 
and cant be accessed outside it such variable called an local vairable 
and to use we write global before that called an global varivble '''
'''--------------------------------------------------------------------------------'''
#Aretory positional Arguements 
'''concept of *args... function can accept any number of non-keyword arguement
geatthered into an tuple 
--------------------------------------------------------------------------------'''
def add_num(*args): #We can name variable anything but "*" is mandatory also args is conventional
    print(f"The arguements are: {args}")
    print(f"The type of aargs is {type(args)}")
    total =0
    for num in args:
        total +=num
    return total
    # print(f"Total is args is {total}")
# print(f"Total is {add_num(1,2,3,4,5,6,7,8,9)}")
'''--------------------------------------------------------------------------------'''
#Arbetory keyword Arguements
'''concept of **kwargs... function can accept any number of keyword arguements
stored in a key value pair (in a disctionary)...
--------------------------------------------------------------------------------'''
def user_info(**kwargs): #we can name anything but "**" is mandatory 
    print(f"arguemnts are :{kwargs}")
    print(f"The type of {type(kwargs)}")
    for key, value in kwargs.items():
        print(f"{key}: {value}")
# user_info(name="alex", age=30, country="UK",city="London")
'''--------------------------------------------------------------------------------'''
# Mixed Arguemants 
'''Using all three type of arguements in a function
-Standard, *args and **kwargs... we must initiate standard first followed by args then finally kwargs
--------------------------------------------------------------------------------'''
def user_Profile(first_name, last_name, age , *hobbies, **contact_details):
    print(f"Name: {first_name}, {last_name}")
    print(f"Age: {age}")
    print(f"Hobbies: {hobbies}")
    print(f"Contact info: {contact_details}")
#user_Profile("Mayank","Pandey",56,"Reading","Cooking","Methamatics",Email="MayankP143@yahoo.com",Phone=9876543210)
'''lambda function ... its is a anonymus function defined using "lambda" keyword 
and has no name and can contain only single expression
--------------------------------------------------------------------------------
    Basic Synntax ----
lambda arguments: expression
    lambda --> keyword to define
    arguements --> can be of any amount like a regular function
    expression --> single expression that has to be evaluates and returned 
--------------------------------------------------------------------------------'''
add_ten = lambda x : x+10
# print(add_ten(5))
'''--------------------------------------------------------------------------------'''
# lambda function are short and simple can be used as arguements in higher order functions 
'''There are three functions can be used in a lambda function 
map(), filter(), short()'''
'''--------------------------------------------------------------------------------'''
# 1- Map() applies to itrables like list/strings returns new itrable
num = [1,2,3,4,5]
sq_num = list(map(lambda x : x**2, num))
# print(sq_num)
'''--------------------------------------------------------------------------------'''
# filter() applies to itrables returns itrables
num = [2,4,6,8,3,5,7,9]
evn_num = list(filter(lambda x: x%2==0, num))
odd_num = list(filter(lambda x: x%2!=0, num))
# print(evn_num)
# print(odd_num)
'''--------------------------------------------------------------------------------'''
stng = 'll'
check_L= lambda x : x in "Hello world"
# print(check_L(stng))
'''--------------------------------------------------------------------------------'''


