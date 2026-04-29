
import random 
# print(random.random()) --> random float
# print(random.randint(1,7)) --> random integer in range 
# x=print(random.uniform(1.1,2.6))
# print(random.choice([1,2,3,4,5,6,7,8,9,0]))
# print(random.choice("Hello World"))
# print(random.choices(['red', 'blue', 'green','yellow','pink'], weights=[1, 1, 1,1,1], k=5))
# print(random.shuffle(['apple','banana','cherry']))
# lst = ['apple','banana','cherry']
# random.shuffle(lst)
# l2 = lst
# print(l2)
# lst = ['apple', 52, 12.34, ('hi', 'hello')]
# result=random.choices(lst[3], weights=None, k=2)
# print(result)
lst = [12, 34.56, "hello", (12, "world"),[1,2,3]]
rt = random.sample(lst,k=5)
print(rt)