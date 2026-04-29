#include <stdio.h>
#include <string.h>

int main(){
    char student_name[100];
    char subject_1[50], subject_2[50], subject_3[50];
    int marks_1, marks_2, marks_3; 
    int total_marks;
    float percentage;

    // student name i/p
    printf("Enter student name: ");
    fgets(student_name, sizeof(student_name),stdin);
    student_name[strcspn(student_name, "\n")] = '\0';

    // Marks i/p
    printf("Enter subject 1 name: ");
    fgets(subject_1, sizeof(subject_1),stdin);
    subject_1[strcspn(subject_1, "\n")] ='\0';
    printf("Enter marks of %s: ",subject_1);
    scanf("%d", &marks_1);
    getchar();

    printf("Enter subject 2 name: ");
    fgets(subject_2, sizeof(subject_2),stdin);
    subject_2[strcspn(subject_2, "\n")] = '\0';
    printf("Enter marks of %s: ",subject_2);
    scanf("%d", &marks_2);
    getchar();

    printf("Enter subject_3 name: ");
    fgets(subject_3, sizeof(subject_3),stdin);
    subject_3[strcspn(subject_3, "\n")] = '\0';
    printf("Enter marks of %s: ", subject_3);
    scanf("%d", &marks_3);
    getchar();

    // calcluting total and percentage
    total_marks = marks_1 + marks_2 + marks_3;
    percentage = total_marks/3.0;

    printf("\nStudent name %s: \n", student_name);
    printf("%s: %d \n", subject_1, marks_1);
    printf("%s: %d \n", subject_2, marks_2);
    printf("%s: %d \n", subject_3, marks_3);
    printf("\nTotal marks: %d", total_marks);
    printf("\nPercentage calculated: %.2f%%\n", percentage);

    if (percentage >= 90){
        printf("Grade A");
    }else if (percentage >= 80){
        printf("Grade B");
    }else if (percentage >= 70){
        printf("Grade C");
    }else if (percentage >= 60){
        printf("Grade D");
    }else if (percentage >= 50){
        printf("Grade E");
    }else{
        printf("Grade F");
    }

    return 0;
}