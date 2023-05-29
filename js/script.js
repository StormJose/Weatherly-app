"use strict";

// Weather icons
const iconIDs = {
  "01d": "img/clear sky.png",
  "02d": "img/few clouds.png",
  "03d": "img/scattered clouds.png",
  "04d": "img/broken clouds.png",
  "04n": "img/broken clouds.png",
  "09d": "img/shower rain.png",
  "10d": "img/rain.png",
  "11d": "img/thunderstorm.png",
  "50d": "img/mist.png",
  "01n": "img/clear sky-night.png",
  "10n": "img/rain-night.png",
  "02n": "img/few clouds-night.png",
  "03n": "img/scattered clouds.png",
};

// CSS classes
const defaultWeatherBtn = document.querySelector(".default");

const rootEl = document.querySelector(":root");
const body = document.querySelector("body");
const cityName = document.querySelector(".city");
const tempHigh = document.querySelector(".temp_high");
const tempLow = document.querySelector(".temp_low");
const tempFeels = document.querySelector(".temp_feels");
const curTempDescription = document.querySelector(".temp-main");
// const tempDescription = document.querySelector(".weather-description");
const curTempInfo = document.querySelector(".current--panel__div");
const temp = document.querySelector(".temp");
const curWindSpeed = document.querySelector(".wind__speed");
let windArrowDirection = document.querySelector(".arrow-icon");
const curRain = document.querySelector(".rain");
const curHumidity = document.querySelector(".humidity");
const curVisibility = document.querySelector(".visibility");
const curPressure = document.querySelector(".pressure");
const weatherImg = document.querySelectorAll(".weather-img");
const sunrise = document.querySelector(".sun__sunrise");
const sunset = document.querySelector(".sun__sunset");

// Fetching data...
const url =
  "https://api.openweathermap.org/data/2.5/forecast?lat=-23.454163&lon=-46.534096&appid=afff3b324bdff5abda023581d7fb75fa&units=metric";

// const img = `https://openweathermap.org/img/wn/10d@2x.png`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetchWeatherData = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // storing temp
    localStorage.setItem("apiData", JSON.stringify(data.list[0].main.temp));

    renderWeather(data);

    console.log(data);
  } catch (err) {
    console.log("something went wrong", err);
  }
};

const yestTemp = JSON.parse(localStorage.getItem("apiData"));
console.log(yestTemp);

fetchWeatherData(url);

const temps = [];
const renderWeather = function (weather) {
  weather.list.slice(7, -1).forEach(function (call) {
    temps.push(call.main.temp);
  });

  const overallTemp = temps.reduce(function (avg, temp, i, { length }) {
    return avg + temp / length;
  }, 0);
  console.log(overallTemp);

  // inserting weather icons
  const displayIcon = function (call) {
    for (let [key, value] of Object.entries(iconIDs)) {
      if (call.weather[0].icon === key) {
        weatherImg.forEach(function (img) {
          img.src = iconIDs[key];
        });
      }
    }
  };
  displayIcon(weather.list[0]);

  const displayCurWeather = function (call) {
    const curTemp = String(call?.main.temp);

    cityName.textContent = weather.city.name;
    curTempDescription.textContent = call?.weather.main;
    temp.textContent = `${curTemp.substring(0, 2)}`;

    tempHigh.textContent = `${String(call.main.temp_max).substring(0, 2)}°`;
    tempLow.textContent = `${String(call.main.temp_min).substring(0, 2)}°`;
    tempFeels.textContent = `${String(call.main.feels_like).substring(0, 2)}°`;
  };

  displayCurWeather(weather.list[0]);

  // Getting weather info
  const getWeatherInfo = function (call) {
    // weather stats
    curRain.textContent = `${call.rain ? call.rain["3h"] : "0"} mm`;
    curHumidity.textContent = `${call.main.humidity} %`;
    curVisibility.textContent = `${call.visibility / 1000} km`;
    curPressure.textContent = `${call.main.pressure} Pah`;
    curWindSpeed.textContent = `${String(call.wind.speed * 3.6).substring(
      0,
      3
    )} km/h`;
    windArrowDirection.style.transform = `rotate(${call.wind.deg}deg)`;
  };
  getWeatherInfo(weather.list[0]);

  // displaying sun info
  const getSunInfo = function (sun) {
    // sunset | sunrise
    // to obtain the date in miliseconds, multiply times 1000
    const sunInfo = sun.city;

    sunset.insertAdjacentHTML(
      "beforeend",
      `<span class="dark-color sun__sunset ">${new Date(
        sunInfo.sunrise * 1000
      ).getHours()}:${new Date(sunInfo.sunrise * 1000).getMinutes()}</span`
    );
    sunrise.insertAdjacentHTML(
      "beforeend",
      `<span class="dark-color sun__sunrise">${new Date(
        sunInfo.sunset * 1000
      ).getHours()}:${new Date(sunInfo.sunset * 1000).getMinutes()}</span`
    );
  };
  getSunInfo(weather);

  const displayForecastDaily = function () {
    const hourlyForecastPanel = document.querySelector(".forecast--1");

    const hourlyForecast = weather.list.slice(1, 6).reverse();
    hourlyForecast.forEach(function (call, i) {
      const rainPop = `${call.pop * 100}%`.slice(0, 3);
      const temp = `${call.main.temp}`.slice(0, 2);

      const html = `
      <div class="panel day_forecast-panel day_forecast-panel--active " data-set="${i}">
      <span class="date">${new Date(call.dt_txt).getHours()}:00</span>
      <div>
      <img class="weather-img" src="${
        iconIDs[call.weather[0].icon]
      }" alt="weather icon" />
      <span class="temp">${temp}°C</span>
      <span class="water-dot"><img class="water-dot_dot" src="img/drop.png" alt="water dot"/>${rainPop}</span>
      </div>
      </div>
      `;
      // Generating slides
      hourlyForecastPanel.insertAdjacentHTML("afterbegin", html);
    });

    // display data functionality

    const allPanels = document.querySelectorAll(".day_forecast-panel");
    allPanels.forEach(function (panel) {
      panel.addEventListener("click", function () {
        getWeatherInfo(hourlyForecast[panel.dataset.set]);
        displayCurWeather(hourlyForecast[panel.dataset.set]);
        displayIcon(hourlyForecast[panel.dataset.set]);

        allPanels.forEach((panel) =>
          panel.classList.remove("day_forecast-panel--active")
        );
        panel.classList.add("day_forecast-panel--active");

        // displaying current weather info
        defaultWeatherBtn.style.opacity = 1;
        defaultWeatherBtn.style.cursor = "pointer";
      });
    });
  };

  displayForecastDaily();
  // To calculate max temperatures of a day, calculate the average using all max temperatures during the day given by the api. The same applies to min temperatures.

  //////////////////////////////////////////////////////////////////////////////////

  // go back to current weather
  const allPanels = document.querySelectorAll(".day_forecast-panel");
  defaultWeatherBtn.addEventListener("click", function () {
    displayIcon(weather.list[0]);
    displayCurWeather(weather.list[0]);
    getWeatherInfo(weather.list[0]);
    defaultWeatherBtn.style.opacity = 0.2;
    defaultWeatherBtn.style.cursor = "auto";

    allPanels.forEach((panel) =>
      panel.classList.add("day_forecast-panel--active")
    );
  });
};
// Dark | Light mode

const darkModeIcon = document.querySelector('.screen--mode[mode="dark"]');
const lightModeIcon = document.querySelector('.screen--mode[mode="light"]');

const switchMode = () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
};

darkModeIcon.addEventListener("click", function () {
  this.style.display = "none";
  lightModeIcon.style.display = "flex";

  switchMode();
});

lightModeIcon.addEventListener("click", function () {
  this.style.display = "none";
  darkModeIcon.style.display = "flex";

  switchMode();
});

// weather tabs
const tabs = document.querySelector(".weather--tabs");
const tabsContent = document.querySelectorAll(".forecast--panel");

tabs.addEventListener("click", function (e) {
  const clicked = e.target.closest(".weather--tab");
  console.log(clicked);

  if (!clicked) return;

  tabsContent.forEach((t) => t.classList.remove("forecast--active"));
  clicked.classList.remove("weather--tab-active");
  clicked.classList.add("weather--tab-active");

  // clicked.forEach((t) => t.classList.add("weather--tab-active"));

  document
    .querySelector(`.forecast--${clicked.dataset.tab}`)
    .classList.add("forecast--active");
});
