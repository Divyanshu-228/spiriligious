#include <iostream>

int main(){
    //calculation of values relates to some constant value...>

    const double PI = 3.14159;
    const int LIGHT_SPEED = 299792485;
    //using upper-case identifiers is a good practice !!
    int radius = 54;
    double circumference = 2*PI*radius;

    std::cout << circumference <<" cm";
    

    return 0;
}