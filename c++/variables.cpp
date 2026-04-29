#include <iostream>
#include <string>
int main(){
    //drecleration and assignment-->
    int x; // decleration step
    x = 5; //asssignment

    std::cout << x <<"\n" ;
    using namespace std;
    using std::cout;
    using std::string;

    // combinaton of both steps
    int a=5;
    int b=7;
    std::cout << a+b <<std::endl;

    int sum = a+b+x;
    std::cout << sum;

    return 0;
}