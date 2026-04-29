// program to swap two variables

#include <iostream>
#include <utility>
using namespace std;

int swap_temp(int a, int b ){
    int c;
    cout << a << endl;
    cout << b << endl;
    c=a;
    a=b;
    b=c;
    cout << a << endl;
    cout << b << endl;
}

int swap(int a,int b){
    cout << a << endl;
    cout << b << endl;
    a=a+b;
    b=a-b;
    a=a-b;
    cout << a << endl;
    cout << b << endl;
}

int swap_div(int a,int b){
    cout << a << endl;
    cout << b << endl;
    a=a*b;
    b=a/b;
    a=a/b;
    cout << a << endl;
    cout << b << endl;
}

int swap_xor(int a,int b){
    cout << a << endl;
    cout << b << endl;
    a=a^b;
    b=a^b;
    a=a^b;
    cout << a << endl;
    cout << b << endl;
}

void fun(int a, int b){
    swap(a,b); // also prints before and after values 
}

int main(){
    fun(10,12);
}