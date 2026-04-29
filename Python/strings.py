# Strings in Python --->
# Strings are the sequence of characters like characters, numbers, symbols 
# enclosed in quotes like single ', double ", or triple single ''', or triple double """
# example:-
a='hello' 
b="World"
'''this is a 
    multiline string'''
"""Can also be used as comment"""
'''====================================================================================='''

# Indexing and Slicing in string-->
''' Used to access and individual character/portion of string
indexing strarts from 0 from the 1st cheracter from left
and starts from -1 from last character or 1st from Right 
SYNTAX-->
            string_name[start:stop:step]
Step value is not mandait its set to 1 by default ...
stop value is evaluated to stop value -1 ...
by default start value is taken 0 if not given ...'''

test = "Python Programming"
# print(test[0]) # first char --> p
# print(test[-1]) # last char --> g
# print(test[0:18]) #start to end 

# print(test[0:]) # only start value is given and stop and step are taken default
# print(test[:18]) # indexing will br taken from 0 to 18-1 which is 17
# print(test[])

age = 18
name = "Rakesh"

print("His name is",name,"and age is",age)
print("His name is "+name+" and age is "+str(age))
print("His name is %s and age is %d"%(name,age))
print("His name is {} and age is {}".format(name,age))
print(f"His name is {name} and age is {age}")
