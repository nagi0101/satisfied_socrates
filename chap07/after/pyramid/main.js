/** 
 * console.log()를 활용하여 피라미드 모양으로 *을 출력하는 함수를 작성하시오.
 * row: 총 출력할 피라미드 층 수
 * 예시:
 *  pyramid(3);
 *   *  
 *  ***
 * *****
 * 
 *  pyramid(5);
 *     *    
 *    ***   
 *   *****  
 *  ******* 
 * *********
*/
function pyramid(row) {
    for (let i = 0; i < row; ++i) {
        let str = "";
        for (let j = 0; j < row - i - 1; ++j) {
            str += " ";
        }
        for (let j = 0; j < i * 2 + 1; ++j) {
            str += "*";
        }
        console.log(str);
    }
}

pyramid(3);
pyramid(5);
pyramid(10);