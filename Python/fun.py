#program to make a user defined function that converts the tempreture from celcius to fahrenheit-->

def tem(cl):
    feh = ((9/5*cl)+32)
    print(f"Tempreture in fahremheit is : {feh}")
cel = int(input("Enter Tempreture in degree celcious: "))
tem(cel)

print("Good Bye...!!!")

d_temp = [23,25,27,31,19]

def analysis_temp(readings):
    if not readings:
        return None, None, None
    max_val = max(readings)
    min_val = min(readings)
    avg_val = (sum(readings)/len(readings))
    return  max_val, min_val, avg_val

max_val, min_val, avg_val = analysis_temp(d_temp)

print(f"maximun tempreture at Pithoragarh {max_val}")
print(f"minimum tempreture at Pithoragarh {min_val}")
print(f"average tempreture at Pithoragarh {avg_val}")


def sum_all(*args):
    print(sum(args))
    print(f"sum  of all the values :{total}")
    return(sum(args))
print(sum_all(1,2,3,4,5))
sum_all(1,2,3,4,5)


tup = (1,2,3,4,5,6,7,8,9)
