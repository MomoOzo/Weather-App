const apiKey = "c318b56fbbdf87389c9304a2a52e1a67";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherEl = document.querySelector(".weather");
const errorEl = document.querySelector(".error-message");
const card = document.querySelector(".card");
const body = document.body;

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorEl.textContent = "City not found. Please try again.";
    errorEl.classList.add("show");
    weatherEl.classList.remove("show");
    card.classList.remove("animate");
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const condition = data.weather[0].main;

  switch (condition) {
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      body.style.background =
        "linear-gradient(to right,rgb(177, 175, 173),rgb(167, 167, 167))";
      break;
    case "Clear":
      weatherIcon.src = "images/clear.png";
      body.style.background =
        "linear-gradient(to right,rgb(253, 212, 107), #f8b500)";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      body.style.background =
        "linear-gradient(to right, #a1c4fd, #acb6e5, #667eea)";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      body.style.background = "linear-gradient(to right, #d3cce3, #e9e4f0)";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      body.style.background = "linear-gradient(to right, #d7d2cc, #f0f0f0)";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
      break;
    default:
      body.style.background = "#ecf0f3";
      break;
  }

  weatherEl.classList.add("show");
  errorEl.classList.remove("show");

  card.classList.remove("animate");
  void card.offsetWidth; // trigger reflow
  card.classList.add("animate");
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
