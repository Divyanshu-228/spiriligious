#include <iostream>
#include <string>
using namespace std;

class student
{
    public:
    string name;
    int age, roll_no;
    string grade;
};

int main(){
    student s1;
    s1.name = "Rohit";
    s1.age = 19;
    s1.roll_no = 24793;
    s1.grade = "A+";
}