const apiKey = '7e8b3cdb3ef5ca4ca56e202b78b98748';
const apiAddress = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
var searchVal = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
var weatherIcons = {
    Clear: 'images/clear.png',
    Clouds: 'images/clouds.png',
    Drizzle: 'images/drizzle.png',
    Mist: 'images/mist.png',
    Rain: 'images/rain.png',
    Snow: 'images/snow.png'
}
async function Dataextracting(city) {
    const response = await fetch(apiAddress + city + `&appid=${apiKey}`)
    var Dataextracted = await response.json();
    if (response.status === 404) {
        console.log('errrr');
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.main').style.display = 'none';
    } else {
        document.querySelector('.main').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.temp').innerHTML = Math.round(Dataextracted.main.temp) + `°C`;
        document.querySelector('.city').innerHTML = Dataextracted.name;
        document.querySelector('.description').innerHTML = Dataextracted.weather[0].description;
        document.querySelector('.humidityValue').innerHTML = Dataextracted.main.humidity + `%`;
        document.querySelector('.windValue').innerHTML = Dataextracted.wind.speed + ` km/h`;
        searchVal.value = '';
        weatherIcon.src = weatherIcons[Dataextracted.weather[0].main];
    }
}

searchBtn.addEventListener('click', () => {
    Dataextracting(searchVal.value);
})

searchVal.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Trigger a click event when the Enter key is pressed
        searchBtn.click();
    }
})


