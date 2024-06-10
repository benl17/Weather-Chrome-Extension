let city = document.getElementById("city");
let content = document.getElementById("content");
let temp = document.getElementById("temp");
let windGusts = document.getElementById("windGusts");
let windSpeed = document.getElementById("windSpeed");
let actualWeather = document.getElementById("actualWeather");
let feelsLikeWeather = document.getElementById("feelsLikeWeather")
let weatherDescription = document.getElementById("weatherDescription");
let clock = document.getElementById("clock");
let weatherImage = document.getElementById("weatherImage");
let windDirection = document.getElementById("windDirection");

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (_position) => {
                let userLatitude = _position.coords.latitude;
                let userLongitude = _position.coords.longitude;
                getWeatherData(userLatitude, userLongitude);
            },
            () => {
                alert("We couldn't find your location, please try again.");
            }
        );
    } else {
        alert("Couldn't find your location, please try again.");
    }
}

function getWeatherData(userLat, userLong) {
    const apiKey = '33b5ddfd34760c18772d6c49dc91ae8c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((currWeatherData) => {
            updateWeatherData(currWeatherData);
        })
        .catch(err => console.error('Fetch error:', err));
}

function updateWeatherData(data) {
    console.log(data);
    windSpeed.innerText = `Wind speed: ${data.wind.speed.toFixed(1)} mph`;
    windGusts.innerText = `Wind gusts: ${data.wind.gust.toFixed(1)} mph`;
    city.innerText = data.name;
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weatherImage = document.getElementById('weatherImage');
    weatherImage.src = iconUrl;
    actualWeather.innerText = `Temperature: ${data.main.temp.toFixed(0)}°F`;
    feelsLikeWeather.innerText = `Feels like: ${data.main.feels_like.toFixed(0)}°F`;
    weatherDescription.innerText = data.weather[0].description;
    const windDeg = data.wind.deg;
    const windDirection = document.getElementById('windDirection');
    windDirection.style.transform = `rotate(${windDeg}deg)`;

    // Update the time immediately when the script runs
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();
    let timeString = currentDate.toLocaleTimeString();
    let dateTime = document.getElementById("dateTime");
    dateTime.innerText = `${dateString} ${timeString}`;

    // Then set an interval to update the time every second
    setInterval(() => {
        let currentDate = new Date();
        let dateString = currentDate.toLocaleDateString();
        let timeString = currentDate.toLocaleTimeString();
        let dateTime = document.getElementById("dateTime");
        dateTime.innerText = `${dateString} ${timeString}`;
    }, 1000);
}
getUserLocation();