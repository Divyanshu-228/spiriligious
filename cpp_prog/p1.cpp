#include <iostream>
using namespace std;

// calculating factoral

int main(){
    int num;
    int fact=1; 

    cout << "Enter a number: ";
    cin >> num;
    
    while (num>1){
        fact *=num;
        num-=1;
    }
    cout << "value of fact : " << fact ;
    return 0;

}