/** 연산자의 종류에 따라 연산을 진행한 값을 반환하는 함수를 작성하시오
 * op1: 피연산자1
 * op2: 피연산자2
 * opCode: 연산자 종류. 모두 문자열이며, 아래의 네 종류 중 하나임.
 *  +: op1 + op2의 값을 반환
 *  -: op1 - op2의 값을 반환
 *  *: op1 * op2의 값을 반환
 *  /: op1 / op2의 값을 반환
 */
function calculator(op1, op2, opCode) {
    let result;
    switch (opCode) {
        case "+":
            result = op1 + op2;
            break;
        case "-":
            result = op1 - op2;
            break;
        case "*":
            result = op1 * op2;
            break;
        case "/":
            result = op1 / op2;
            break;
        default:
            break;
    }
    return result;
}


/* 이 아래는 건드리지 말것 */
const operatorElement = document.querySelector("#operator");
const operandElements = document.querySelectorAll(".operand");
const calculateBtn = document.querySelector(".calculate");
const resultElement = document.querySelector("#result");

calculateBtn.addEventListener("click", () => {
    const op0 = Number(operandElements[0].value);
    const op1 = Number(operandElements[1].value);
    const opCode = operatorElement.value;
    const result = calculator(op0, op1, opCode);
    resultElement.innerText = result;
});
