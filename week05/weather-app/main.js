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
      getCurrentWeatherInfo(weatherInfo);
    })
    .catch(function (err) {
      console.error("Error fetching weather:", err);
    });
}

//--get data weather info--
function getCurrentWeatherInfo(weatherInfo) {
  const iconCode = weatherInfo.current.weather[0].icon,
    // icon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
    icon =
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamZyb3p1b2FsdmdieXVvNTFyenEwaTgxdzB0YXhibXM3cWJ4NTF2ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/14hw18xwlfhGX1gP3X/giphy.gif",
    temp = (weatherInfo.current.temp * 0.1).toFixed(),
    desc = weatherInfo.current.weather[0].description,
    humidity = weatherInfo.current.humidity,
    windSpeed = (weatherInfo.current.wind_speed * 3.6).toFixed(), // m/s to km/h
    uv = weatherInfo.current.uvi;

  displayCurrentWeatherInfo(
    icon,
    temp,
    desc[0].toUpperCase().concat(desc.slice(1)), //uppercase first letter
    humidity,
    windSpeed,
    uv
  );
}

//--display weahter info--
function displayCurrentWeatherInfo(icon, temp, desc, humidity, windSpeed, uv) {
  const weatherInfoContainer = document.querySelector(".detailsInfo"),
    loading = document.querySelector(".loading");

  const detailsInfoContent = `
    <div class="detailsInfo-top flex justify-center items-center gap-10 order-first">
      <div class="detailsInfo-top_left flex items-center gap-5">
          <img id="weatherIcon" alt="Weather Icon" width="300" height="300" src=${icon} style="align-self: flex-start;">
          <div class="flex flex-col justify-center w-56">
              <p class="temp text-9xl">${temp}&deg;<span style="vertical-align: top; font-size: 130px;">C</span></p>
              <p class="desc text-5xl w-52" style="margin-top: -20px;">${desc}</p>
          </div>
      </div>
      <div class="detailsInfo-top_right flex flex-col gap-5">
          <p class="humidity text-3xl">Độ ẩm: ${humidity}%</p>
          <p class="wind-speed text-3xl">Gió: ${windSpeed}km/h</p>
          <p class="uv text-3xl">Chỉ số tia UV: ${uv}</p>
      </div>
    </div>
    <div class="detailsInfo-bottom grid grid-cols-8 w-full h-24 bg-white gap-3 order-last">
      <div class="item-weather bg-red-100">0</div>
      <div class="item-weather bg-red-100">1</div>
      <div class="item-weather bg-red-100">2</div>
      <div class="item-weather bg-red-100">3</div>
      <div class="item-weather bg-red-100">4</div>
      <div class="item-weather bg-red-100">5</div>
      <div class="item-weather bg-red-100">6</div>
      <div class="item-weather bg-red-100">7</div>
    </div>
  `;
  weatherInfoContainer.innerHTML = detailsInfoContent;

  animationTypingTxt();

  setTimeout(() => {
    loading.classList.remove("flex");
    loading.classList.add("hidden");

    weatherInfoContainer.classList.remove("hidden");
    weatherInfoContainer.classList.add("flex");

    // const iconElement = document.querySelector("#weatherIcon");
    // iconElement.src = ``;

    // const temperatureElement = document.querySelector(".temp");
    // temperatureElement.textContent = `${temperature}°C`;

    // const descriptionElement = document.querySelector(".desc");
    // descriptionElement.textContent = `${description}`;

    // const humidityElement = document.querySelector(".humidity");
    // humidityElement.textContent = `Độ ẩm: ${humidity}`;

    // const windSpeedElement = document.querySelector(".wind-speed");
    // windSpeedElement.textContent = `Gió: ${windSpeed} km/h`;

    // const uvElement = document.querySelector(".uv");
    // uvElement.textContent = `Chỉ số tia UV: ${uv}`;

    // weatherInfoContainer.appendChild(iconElement);
    // weatherInfoContainer.appendChild(temperatureElement);
    // weatherInfoContainer.appendChild(descriptionElement);
    // weatherInfoContainer.appendChild(humidityElement);
    // weatherInfoContainer.appendChild(windSpeedElement);
    // weatherInfoContainer.appendChild(uvElement);
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
  gradientsBgBubble();
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
});
