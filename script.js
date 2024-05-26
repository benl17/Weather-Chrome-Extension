let city = document.getElementById("city");
let content = document.getElementById("content");
let temp = document.getElementById("temp");
let weather = document.getElementById("weather");
let clock = document.getElementById("clock");

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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(currWeatherData => {
            console.log(currWeatherData);
            displayWeatherData(currWeatherData);
        })
        .catch(err => console.error('Fetch error:', err));
}

function displayWeatherData(data) {
    city.textContent = `City: ${data.name}`;
    temp.textContent = `Temperature: ${data.main.temp} °C`;
    weather.textContent = `Weather: ${data.weather[0].description}`;
    clock.textContent = `Time: ${new Date(data.dt * 1000).toLocaleTimeString()}`;
}

getUserLocation();