/** 섭씨 온도를 입력받아 화씨 온도를 반환하는 함수를 작성하시오 */
function celciusToFarenheit(celcius) {

}
/** 화씨 온도를 입력받아 섭씨 온도를 반환하는 함수를 작성하시오 */
function fahrenheitToCelcius(fahrenheit) {

}


/* 이 아래는 건드리지 말것 */
const celciusInput = document.querySelector("#celcius");
const fahrenheitInput = document.querySelector("#fahrenheit");

const c2f = document.querySelector(".cToF");
const f2c = document.querySelector(".fToC");

c2f.addEventListener("click", () => {
  const celcius = Number(celciusInput.value);
  if (celcius) {
    fahrenheitInput.value = celciusToFarenheit(celcius);
  }
});

f2c.addEventListener("click", () => {
  const fahrenheit = Number(fahrenheitInput.value);
  if (fahrenheit) {
    celciusInput.value = fahrenheitToCelcius(fahrenheit);
  }
});
