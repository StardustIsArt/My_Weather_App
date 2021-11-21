let now = new Date();
let currentTime = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let year = now.getFullYear();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day}, <br /> ${month} ${date}, ${year} <br />${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector(
    "#cityWeatherNow"
  ).innerHTML = `What's your weather like in ${response.data.name} now...`;
  document.querySelector("#tempNow").innerHTML = `${Math.round(
    response.data.main.temp
  )}ºC`;
  document.querySelector("#temp-forcast").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temp-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitde = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?long=${longitde}&lat=${latitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCity(city) {
  let apiKey = "e1f92b0f0a53fe657eb50521404f459d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//	let searchInput = document.querySelector("#searchInput");
//	let cityWeatherNow = document.querySelector("#cityWeatherNow");
//	let city = document.querySelector("#searchInput").value;
//	if (searchInput.value) {
//		cityWeatherNow.innerHTML = `What's your weather like in ${city} now...`;
//	} else {
//		alert(`Please enter a city`);
//	}
//}
let form = document.querySelector("#citySearch");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
