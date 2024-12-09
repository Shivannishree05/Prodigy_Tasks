// script.js
const apiKey = 'your_openweather_api_key'; // Replace with your OpenWeather API key

const getWeatherButton = document.getElementById('get-weather');
const useLocationButton = document.getElementById('use-location');
const weatherInfo = document.getElementById('weather-info');

async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
            return;
        }

        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
            return;
        }

        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
    }
}

function displayWeather(data) {
    const { name, weather, main } = data;
    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

getWeatherButton.addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherInfo.innerHTML = `<p>Please enter a location.</p>`;
    }
});

useLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            () => {
                weatherInfo.innerHTML = `<p>Unable to retrieve your location. Please try again.</p>`;
            }
        );
    } else {
        weatherInfo.innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
    }
});
