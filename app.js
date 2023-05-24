const apiKey = "YOUR_API_KEY";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city) {
  // Connect to OpenWeatherMap
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    // Enter wrong city name => Show Error + Hide Card
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    // Get current date and time
    document.querySelector(".date-time").innerHTML = new Date().toLocaleString();
    // Read data from OpenWeatherMap
    document.querySelector(".condition").innerHTML =
      data.list[0].weather[0].description;
    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = data.list[0].main.temp + "°C";
    document.querySelector(".temp-feelslike").innerHTML =
      "feels like " + data.list[0].main.feels_like + "°C";
    document.querySelector(".humidity").innerHTML =
      data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      data.list[0].wind.speed + " km/h";

    // Change the weather Icon related to the current weather

    // Thunder
    if (data.list[0].weather[0].main == "Thunderstorm") {
      weatherIcon.className = "fa-solid fa-cloud-bolt";
    }
    // Drizzle
    else if (data.list[0].weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-showers-heavy";
    }
    // Rain
    else if (data.list[0].weather[0].main == "Rain") {
      if (
        data.list[0].weather[0].description == "light rain" ||
        data.list[0].weather[0].description == "light intensity shower rain"
      ) {
        weatherIcon.className = "fa-solid fa-cloud-sun-rain";
      } else {
        weatherIcon.className = "fa-solid fa-cloud-rain";
      }
    }
    // Snow
    else if (data.list[0].weather[0].main == "Snow") {
      weatherIcon.className = "fa-solid fa-snowflake";
    }
    // CLouds
    else if (data.list[0].weather[0].main == "Clouds") {
      if (data.list[0].weather[0].description == "few clouds: 11-25%") {
        weatherIcon.className = "fa-solid fa-cloud-sun";
      } else {
        weatherIcon.className = "fa-solid fa-cloud";
      }
    }
    //Clear Sky
    else if (data.list[0].weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    }

    // Change the Card Color related to the current temperature

    // extrem cold
    if (data.list[0].main.temp <= (-10)) {
      document.querySelector(".card").style.background =
        "var(--color-extrem-cold)";
    }
    // cold
    else if (data.list[0].main.temp >= (-10) && data.list[0].main.temp <= 4) {
      document.querySelector(".card").style.background = "var(--color-cold)";
    }
    // normal
    else if (data.list[0].main.temp >= 4 && data.list[0].main.temp <= 18) {
      document.querySelector(".card").style.background = "var(--color-normal)";
    }
    // hot
    else if (data.list[0].main.temp >= 18 && data.list[0].main.temp <= 30) {
      document.querySelector(".card").style.background = "var(--color-hot)";
    }
    // extrem hot
    else if (data.list[0].main.temp >= 30) {
      document.querySelector(".card").style.background =
        "var(--color-extrem-hot)";
    }
    // displays Card + does not display Error Message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    console.log(data);
  }
}

// Search Button Click
searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

document.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    checkWeather(searchBox.value);
  }
});
