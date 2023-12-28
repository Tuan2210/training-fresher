const apiKey = "60836d7502891317b3d0942b4f1d416b";
function getPlaces() {
  axios
    .get("https://provinces.open-api.vn/api/")
    .then(function (res) {
      const places = res.data,
        selectItem = document.querySelector("#place");

      places.forEach((place) => {
        const option = document.createElement("option");
        option.textContent = place.name;
        option.value = place.codename;

        selectItem.appendChild(option);
      });

      selectItem.addEventListener("change", getCoordinates);
    })
    .catch((err) => console.error("Error fetching cities:", err));
}

function getCoordinates() {
  const selectedPlace = document.querySelector("#place").value;
  const tinh = "tinh_";
  if (selectedPlace.includes(tinh)) {
    apiCoordinates(selectedPlace.substring(tinh.length));
  } else {
    apiCoordinates(selectedPlace);
  }

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

function getWeather(lat, lon) {
  axios
    .get(
      // `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`
      // `https://api.openweathermap.org/data/2.5/weather?q=${selectedPlace}&appid=${apiKey}&units=metric`
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

function displayWeatherInfo(weatherInfo) {
  const weatherInfoContainer = document.querySelector(".weather-info");

  // Xóa nội dung cũ trong container (nếu có)
  weatherInfoContainer.innerHTML = "";

  // Hiển thị thông tin thời tiết
  const temperature = (weatherInfo.current.temp * 0.1).toFixed();
  const description = weatherInfo.current.weather[0].description;
  const humidity = weatherInfo.current.humidity;
  const windSpeed = weatherInfo.current.wind_speed.toFixed();

  // Tạo các thẻ HTML để chứa thông tin
  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = `Temperature: ${temperature}°C`;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = `Description: ${description}`;

  const humidityElement = document.createElement("p");
  humidityElement.textContent = `Humidity: ${humidity}`;

  const windSpeedElement = document.createElement("p");
  windSpeedElement.textContent = `Wind speed: ${windSpeed} km/h`;

  // Thêm các thẻ vào container
  weatherInfoContainer.appendChild(temperatureElement);
  weatherInfoContainer.appendChild(descriptionElement);
  weatherInfoContainer.appendChild(humidityElement);
  weatherInfoContainer.appendChild(windSpeedElement);
}

//--DOM content laod---
document.addEventListener("DOMContentLoaded", function () {
  getPlaces();
});
