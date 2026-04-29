#include <iostream>

namespace first{
    int x=1;
}
namespace second{
    int x= 2;
}
int main(){
    //namespace--> used to prevent name conflicts in a large program...
    
    std::cout <<first::x <<std::endl;

    using namespace second;
    std::cout <<x;
    return 0;
}
