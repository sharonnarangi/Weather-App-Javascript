const apiKey = ""; // Sign up at https://openweathermap.org to get your free API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if(response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon based on weather condition
            const weatherIcon = document.querySelector(".weather-icon");
            if(weatherIcon) {
                switch(data.weather[0].main) {
                    case "Clouds":
                        weatherIcon.src = "assets/clouds.svg";
                        break;
                    case "Clear":
                        weatherIcon.src = "assets/clear.svg";
                        break;
                    case "Rain":
                        weatherIcon.src = "assets/rain.svg";
                        break;
                    case "Drizzle":
                        weatherIcon.src = "assets/drizzle.svg";
                        break;
                    case "Mist":
                        weatherIcon.src = "assets/mist.svg";
                        break;
                }
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }

    } catch(error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});