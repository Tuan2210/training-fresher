const apiKey = "60836d7502891317b3d0942b4f1d416b";

//--select place--
function getPlaces() {
  axios
    .get("https://provinces.open-api.vn/api/")
    .then(function (res) {
      const places = res.data,
        selectItem = document.querySelector("#place");

      places.forEach((place) => {
        const option = document.createElement("option");
        option.className = "option-place";
        option.textContent = place.name;
        option.value = place.codename;

        selectItem.appendChild(option);
      });

      selectItem.addEventListener("change", getCoordinates);
    })
    .catch((err) => console.error("Error fetching cities:", err));
}

//--create and get lat-lon--
function getCoordinates() {
  const selectedPlace = document.querySelector("#place").value;
  if (selectedPlace.length == 0) return;

  const tinh = "tinh_";
  if (selectedPlace.includes(tinh))
    apiCoordinates(selectedPlace.substring(tinh.length));
  else apiCoordinates(selectedPlace);

  function apiCoordinates(place) {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${place},VN&appid=${apiKey}`
      )
      .then(function (res) {
        res.data.map((placeInfo) => {
          getWeather(placeInfo.lat, placeInfo.lon);
        });
      })
      .catch((err) => console.error("Error fetching coordinates:", err));
  }
}

//--get api weather--
function getWeather(lat, lon) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`
    )
    .then(function (res) {
      const weatherInfo = res.data;
      console.log(weatherInfo);
      displayWeatherInfo(weatherInfo);
    })
    .catch(function (err) {
      console.error("Error fetching weather:", err);
    });
}

//--display weahter info--
function displayWeatherInfo(weatherInfo) {
  const weatherInfoContainer = document.querySelector(".wrapper__weather-info");

  weatherInfoContainer.innerHTML = "";

  const temperature = (weatherInfo.current.temp * 0.1).toFixed();
  const description = weatherInfo.current.weather[0].description;
  const humidity = weatherInfo.current.humidity;
  const windSpeed = weatherInfo.current.wind_speed.toFixed();

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = `Temperature: ${temperature}°C`;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = `Description: ${description}`;

  const humidityElement = document.createElement("p");
  humidityElement.textContent = `Humidity: ${humidity}`;

  const windSpeedElement = document.createElement("p");
  windSpeedElement.textContent = `Wind speed: ${windSpeed} km/h`;

  weatherInfoContainer.appendChild(temperatureElement);
  weatherInfoContainer.appendChild(descriptionElement);
  weatherInfoContainer.appendChild(humidityElement);
  weatherInfoContainer.appendChild(windSpeedElement);
}

//--animation bubble bg--
function gradientsBgBubble() {
  const interBubble = document.querySelector(".interactive");
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 5;
    curY += (tgY - curY) / 5;
    interBubble.style.transform = `translate(${Math.round(
      curX
    )}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  }

  window.addEventListener("mousemove", (e) => {
    tgX = e.clientX - 450;
    tgY = e.clientY - 250;
  });

  move();
}

//--DOM content laod---
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    getPlaces();
  }, 0);

  const selectPlace = document.querySelector("#place"),
    locationIcon = document.querySelector(".fa-location-dot");

  selectPlace.addEventListener("mousedown", () => {
    locationIcon.classList.add("animateLocation");

    setTimeout(() => {
      selectPlace.addEventListener("change", () => {
        locationIcon.classList.remove("animateLocation");
      });
    }, 0);
  });

  gradientsBgBubble();
});
