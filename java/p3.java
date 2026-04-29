// import java.util.Arrays;

public class p3 {
    public static void main(String[] args) {
      
    int[] matrix = {11,22,33};

    // Row Matrix -->

    for (int i=0; i< matrix.length; i++){
        System.out.println("| " + matrix[i] + " |");
    }
    System.out.println();
    for (int i=0; i< matrix.length; i++){
        if (i==0) System.out.print("| ");
        System.out.print(matrix[i]+" ");
        if (i==matrix.length-1) System.out.println(" |");
    }
    }
}
 // Arrays -->
       // can include int sting bool etc...

    //    int[] marks = new int[4];
    //    marks[0] = 97;
    //    marks[1] = 98;
    //    marks[2] = 95;
    //    marks[3] = 99;

    //    System.out.println(marks); -- will not return array values
    // System.out.println(marks[0]);
    // System.out.println(marks[3]); -- initialised by null valur 0/false if value not assignaed
    // System.out.println(marks.length); -- properties are not called using ()

    // sorting Arrays-->
    // System.out.println(marks[0]);
    // Arrays.sort(marks);
    // System.out.println(marks[0]);

    // int[] marks = {97,95,99};
    // int [][] final_marks = {
    //     {99,98,97},
    //     {88,87,86},
    //     {77,78,79}
    // };
    // System.out.println(final_marks[0][0]);
    // System.out.println(final_marks[0][1]);

    // for(int i=0; i<3; i++){
    //     for (int j=0; j<3; j++){
    //         System.out.print(final_marks[i][i]+" ");
    //     }
    //     System.out.println();
    // }
