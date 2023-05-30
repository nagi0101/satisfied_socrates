const weatherDescription = document.querySelector(".weather_description");
const API_KEY = "";

async function updateWeatherDescription(requestURL) {
    const response = await fetch(requestURL);
    const data = await response.json();
    const description = data.weather[0].description;
    weatherDescription.innerText = description;
}

navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    updateWeatherDescription(requestURL);
})
