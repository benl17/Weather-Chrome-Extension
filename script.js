let city = document.getElementById("city");
let content = document.getElementById("content");
let temp = document.getElementById("temp");
let weather = document.getElementById("weather");
let clock = document.getElementById("clock");
let weatherImage = document.getElementById("weatherImage");

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
            console.log(currWeatherData);
            updateWeatherData(currWeatherData);
        })
        .catch(err => console.error('Fetch error:', err));
}

function updateWeatherData(data) {
    city.innerText = data.name;
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weatherImage = document.getElementById('weatherImage');
    weatherImage.src = iconUrl;
    // temp.innerText = `Temperature: ${data.main.temp}°F`;
    // weather.innerText = `Weather: ${data.weather[0].main} - ${data.weather[0].description}`;
    // content.innerText = `Pressure: ${data.main.pressure} hPa, Humidity: ${data.main.humidity}%`;
    // You can also update other elements as needed, such as clock, wind speed, etc.
}
getUserLocation();