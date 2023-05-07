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

// START search engine
function displayWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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

//START the submit or click
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchEngine);
//END the submit or click
