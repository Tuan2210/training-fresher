const apiKey = "60836d7502891317b3d0942b4f1d416b";

function refreshRealTime() {
  var d = new Date();

  var day = d.getDay();
  var date = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();
  var days = new Array(
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy"
  );
  var months = new Array(
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
  );

  const dayTime = document.querySelector("#day-time");
  if (dayTime)
    dayTime.textContent =
      days[day] + " | " + date + "/" + months[month] + "/" + year;

  setTimeout("refreshRealTime()", 1000);
}

function animationTypingTxt() {
  var words = ["Vui lòng chờ trong giây lát"],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 20;

  const loading = document.querySelector(".loading");
  loading.classList.remove("hidden");
  loading.classList.add("flex");

  const weatherInfoContainer = document.querySelector(".detailsInfo");
  weatherInfoContainer.classList.remove("flex");
  weatherInfoContainer.classList.add("hidden");

  function animate() {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substring(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    document.querySelector(".lblLoading").textContent = part;

    if (offset <= words[i].length) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

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
        `https://api.openweathermap.org/geo/1.0/direct?q=${place},VN&appid=${apiKey}`
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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&lang=vi&appid=${apiKey}`
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
  const weatherInfoContainer = document.querySelector(".detailsInfo"),
    loading = document.querySelector(".loading");

  animationTypingTxt();

  setTimeout(() => {
    loading.classList.remove("flex");
    loading.classList.add("hidden");

    weatherInfoContainer.innerHTML = "";
    weatherInfoContainer.classList.remove("hidden");
    weatherInfoContainer.classList.add("flex");

    const temperature = (weatherInfo.current.temp * 0.1).toFixed();
    const description = weatherInfo.current.weather[0].description;
    const humidity = weatherInfo.current.humidity;
    const windSpeed = weatherInfo.current.wind_speed.toFixed();
    const uv = weatherInfo.current.uvi;

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `${temperature}°C`;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `${description}`;

    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Độ ẩm: ${humidity}`;

    const windSpeedElement = document.createElement("p");
    windSpeedElement.textContent = `Gió: ${windSpeed} km/h`;

    const uvElement = document.createElement("p");
    uvElement.textContent = `Chỉ số tia UV: ${uv}`;

    weatherInfoContainer.appendChild(temperatureElement);
    weatherInfoContainer.appendChild(descriptionElement);
    weatherInfoContainer.appendChild(humidityElement);
    weatherInfoContainer.appendChild(windSpeedElement);
    weatherInfoContainer.appendChild(uvElement);
  }, 2000);
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
    tgX = e.clientX - 280;
    tgY = e.clientY - 100;
  });

  move();
}

//--DOM content laod---
document.addEventListener("DOMContentLoaded", function () {
  refreshRealTime();

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
        animationTypingTxt();
      });
    }, 0);
  });

  gradientsBgBubble();
});
