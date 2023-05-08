// START the data and hour
function formatdate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `O${minutes}`;
  }

  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];
  return `${day} ${hours}:${minutes}`;
}

let dates = document.querySelector("#date");
let currentTime = new Date();
dates.innerHTML = formatdate(currentTime);
// END data and hour
//////////////////////////////////////////////////////////////////////////////////////////////////////
// START data forcast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[day];
}
// END data forcast
//////////////////////////////////////////////////////////////////////////////////////////////////////
// START forcast
function displayForecast(response) {
  let forcast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forcast.forEach(function (forcastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forcastday.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forcastday.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forcastday.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forcastday.temp.min
          )}°</span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// END forcast
//////////////////////////////////////////////////////////////////////////////////////////////////////
// START search engine
function displayWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
// END search engine
//////////////////////////////////////////////////////////////////////////////////////////////////////
// START get geolocation
function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `616903f8fae840aac9dcad7ca42409ed`;
  let url = `https://api.openweathermap.org/data/2.5/weather`;
  let units = `metric`;
  let apiUrl = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
let locationPin = document.querySelector(`#current-button`);
locationPin.addEventListener("click", getLocation);
// END get geolocation

// START function show F°
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
// END function show F°
//////////////////////////////////////////////////////////////////////////////////////////////////////
// START function show F°
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
// END function show F°
//////////////////////////////////////////////////////////////////////////////////////////////////////
//START the submit or click
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchEngine);
//END the submit or click

// START F°
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
// END F°

// START C°
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
// END C°

search("Berlin");
//////////////////////////////////////////////////////////////////////////////////////////////////////
