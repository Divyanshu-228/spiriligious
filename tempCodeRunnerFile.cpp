#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main(){
    string student_name;
    cout << "Enter student name: ";
    getline(cin, student_name);

    string subject_1;
    int marks_1;
    cout << "Enter subject 1 name: ";
    getline(cin, subject_1);
    cout << "Enter marks of " << subject_1 << ": ";
    cin >> marks_1;
    cin.ignore();

    string subject_2;
    int marks_2;
    cout << "Enter subject 2 name: ";
    getline(cin, subject_2);
    cout << "Enter marks of " << subject_2 << ": ";
    cin >> marks_2;
    cin.ignore();

    string subject_3;
    int marks_3;
    cout << "Enter subject 3 name: ";
    getline(cin, subject_3);
    cout << "Enter marks of " << subject_3 << ": ";
    cin >> marks_3;
    cin.ignore();

    int total_marks = marks_1 + marks_2 + marks_3;
    float percentage = (total_marks/3.0);

    // printing result

    cout << endl << "Student Name: "<< student_name << endl;
    cout << subject_1 << ": " << marks_1 << endl;
    cout << subject_2 << "; " << marks_2 << endl;
    cout << subject_3 << ": " << marks_3 << endl;
    cout << "Total marks: " << total_marks << endl;
    cout << fixed << setprecision(2);
    cout << "Percentage scored : " << percentage <<"%" << endl;

}