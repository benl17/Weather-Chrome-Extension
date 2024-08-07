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
let windArrow = document.getElementById("windArrow");
let container = document.getElementById("container");

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

function getBackgroundClass(description) {
    if (description.includes('clear')) {
        return 'sunny';
    } else if (description.includes('cloud')) {
        return 'cloudy';
    } else if (description.includes('rain') || description.includes('drizzle')) {
        return 'rainy';
    } else if (description.includes('snow')) {
        return 'snowy';
    } else if (description.includes('thunderstorm')) {
        return 'thunderstorm';
    } else {
        return 'default';
    }
}

function updateWeatherData(data) {
    city.innerText = data.name; //city name
    
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`; //icon
    const weatherImage = document.getElementById('weatherImage');
    weatherImage.src = iconUrl;

    actualWeather.innerText = `Temperature: ${data.main.temp.toFixed(0)}°F`; //temp
    feelsLikeWeather.innerText = `Feels like: ${data.main.feels_like.toFixed(0)}°F`; //feels like
    weatherDescription.innerText = data.weather[0].description; //weather description 

    //change background of extension based on the current weather
    const bgClass = getBackgroundClass(data.weather[0].description);
    container.className = ''; // Reset all classes
    container.classList.add(bgClass);
    
    const windDeg = data.wind.deg; //wind degree
    windArrow.style.transform = `rotate(${windDeg}deg)`; //wind arrow

    // update the time every second
    let currentDate = new Date();
    let dateString = currentDate.toLocaleDateString();
    let timeString = currentDate.toLocaleTimeString();
    let dateTime = document.getElementById("dateTime");
    dateTime.innerText = `${dateString} ${timeString}`;

    // start the interval for every second 
    setInterval(() => {
        let currentDate = new Date();
        let dateString = currentDate.toLocaleDateString();
        let timeString = currentDate.toLocaleTimeString();
        let dateTime = document.getElementById("dateTime");
        dateTime.innerText = `${dateString} ${timeString}`;
    }, 1000);

    windSpeed.innerText = `Wind speed: ${data.wind.speed.toFixed(1)} mph`; //wind speed
    windGusts.innerText = `Wind gusts: ${data.wind?.gust?.toFixed(1) ?? 'N/A'} mph`; //wind gusts
}
getUserLocation();