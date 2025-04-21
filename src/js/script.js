"use strict";

import * as model from "./model"

import clearSky from "../img/clear sky.png";
import fewClouds from "../img/few clouds.png";
import scatteredClouds from "../img/scattered clouds.png";
import brokenClouds from "../img/broken clouds.png";
import rain from "../img/rain.png";
import thunderstorm from "../img/thunderstorm.png";
import mist from "../img/mist.png";
import clearSkyNight from "../img/clear sky-night.png";
import rainNight from "../img/rain-night.png";
import fewCloudsNight from "../img/few clouds-night.png";
import scatteredClouds from "../img/scattered clouds.png";
import rainProb from "../img/drop.png";
import { getPosition } from "./helpers/getPosition";
import { concatStateInitials } from "./utils/utils";

// Weather icons
const iconIDs = {
  "01d": clearSky,
  "02d": fewClouds,
  "03d": scatteredClouds,
  "04d": brokenClouds,
  "04n": brokenClouds,
  "09d": rain,
  "10d": rain,
  "11d": thunderstorm,
  "50d": mist,
  "01n": clearSkyNight,
  "10n": rainNight,
  "02n": fewCloudsNight,
  "03n": scatteredClouds,
};


// CSS classes
const defaultWeatherBtn = document.querySelector(".default");

const rootEl = document.querySelector(":root");
const body = document.querySelector("body");
const searchInputBox = document.querySelector(".input__box");
const searchInputList = document.querySelector(".input__search-list");
const searchInput = document.querySelector(".input__search");
const cityName = document.querySelector(".city");
const tempHigh = document.querySelector(".temp_high");
const tempLow = document.querySelector(".temp_low");
const tempFeels = document.querySelector(".temp_feels");
const curTempDescription = document.querySelector(".temp-main");
// const tempDescription = document.querySelector(".weather-description");
const curTempInfo = document.querySelector(".current--panel__div");
const temp = document.querySelector(".temp");
const curWindSpeed = document.querySelector(".wind__speed");
const curRain = document.querySelector(".rain");
const curHumidity = document.querySelector(".humidity");
const curVisibility = document.querySelector(".visibility");
const curPressure = document.querySelector(".pressure");
const weatherImg = document.querySelectorAll(".weather-img");
const labelSunrise = document.querySelector(".label--sun__sunrise");
const labelSunset = document.querySelector(".label--sun__sunset");
const hourlyForecastPanel = document.querySelector(".forecast--1");
const yearCopy = document.querySelector('.year');

let windArrowDirection = document.querySelector(".arrow-icon");





/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const addHandlerSearch = function(handler) {
//   searchInput.addEventListener('change', (e) => {
//     e.preventDefault()
//     handler()
//   })
// }


const searchLocation = async function () {
  const query = searchInput.value.toLowerCase();

  return query;
};

const controlWeather = async function () {

  // 1. Load weather
  await model.loadWeather()
  console.log(model.state.coords)

  await renderWeather(model.state.currentWeather)
  console.log(model.state.currentWeather)   
}

controlWeather()




searchInput.addEventListener("input", async function(e) {
  if (e.target.value.length >= 3) {
    const query = await searchLocation();
    
    
    if (!query) return
    
    searchInputList.classList.add("input_search-list--active");

    const location = await model.loadLocation(query);
    console.log(location)
    searchInputList.innerHTML = "";

    location.forEach((loc, i) => {
      
      const elListItem = document.createElement("li");
      const locationLink = document.createElement("a")
      elListItem.appendChild(locationLink)
      elListItem.setAttribute("id", i)
      
      const coords = { latitude: loc.lat, longitude: loc.lon }
      locationLink.setAttribute("href", `?latitude=${coords.latitude}&longitude=${coords.longitude}`)
    
      const stateInitials = concatStateInitials(loc)

      locationLink.textContent = `${loc.name}, ${(stateInitials ??= "")},  ${loc.country}`;
      searchInputList.appendChild(elListItem);
      
    });

    
    // Only displays results if has enough characters and input is not focused
    if (e.target.value.length <= 3) searchInputList.innerHTML = "";
     
    
  }
});


searchInputList.addEventListener('click', async function(e) {
  e.preventDefault()

  const selectedLocation = e.target.closest('a') 
  
  if (!selectedLocation) return

  const coords = selectedLocation.getAttribute('href')
  
  history.pushState(null, '', coords)

  const params = new URLSearchParams(coords)
  

  const latitude = params.get('latitude')
  const longitude = params.get('longitude')

  model.state.coords = {latitude, longitude}

  // Rendering weather based on coords
  await model.loadWeather(model.state.coords)

  await renderWeather(model.state.currentWeather)

  searchInputList.innerHTML  = ""
  searchInputList.classList.remove("input_search-list--active");

} )




const temps = [];
const renderWeather = function (weather) {
  weather.list.slice(7, -1).forEach(function (call) {
    temps.push(call.main.temp);
  });

  const overallTemp = temps.reduce(function (avg, temp, i, { length }) {
    return avg + temp / length;
  }, 0);

  // inserting weather icons
  const displayIcon = function (call) {
    for (let [key, value] of Object.entries(iconIDs)) {
      if (call.weather[0].icon === key)
        weatherImg.forEach((img) => (img.src = `${iconIDs[key]}`));
    }
  };
  displayIcon(weather.list[0]);

  const displayCurWeather = function (call) {
    const curTemp = String(call?.main.temp);

    cityName.textContent = weather.city.name;
    curTempDescription.textContent = call?.weather.main;
    temp.textContent = `${(curTemp + "").slice(0, 2)}°`;

    tempHigh.textContent = `${(call.main.temp_max + "").slice(0, 2)}°`;
    tempLow.textContent = `${(call.main.temp_min + "").slice(0, 2)}°`;
    tempFeels.textContent = `${(call.main.feels_like + "").slice(0, 2)}°`;
  };

  displayCurWeather(weather.list[0]);

  // Getting weather info
  const displayWeatherInfo = function (call) {
    // weather stats
    curRain.textContent = `${call.rain ? call.rain["3h"] : "0"} mm`;
    curHumidity.textContent = `${call.main.humidity} %`;
    curVisibility.textContent = `${call.visibility / 1000} km`;
    curPressure.textContent = `${call.main.pressure} Pah`;
    curWindSpeed.textContent = `${(call.wind.speed * 3.6 + "").slice(
      0,
      3
    )} km/h`;
    windArrowDirection.style.transform = `rotate(${call.wind.deg}deg)`;
  };
  displayWeatherInfo(weather.list[0]);

  // displaying sun info
  const getSunInfo = function (sun) {
    // to obtain the date in miliseconds, multiply times 1000
    const sunInfo = sun.city;

    labelSunrise.textContent = `${new Date(
      sunInfo.sunrise * 1000
    ).getHours()}:${new Date(sunInfo.sunrise * 1000).getMinutes()}`;
    labelSunset.textContent = `${new Date(
      sunInfo.sunset * 1000
    ).getHours()}:${new Date(sunInfo.sunset * 1000).getMinutes()}`;
  };

  getSunInfo(weather);

  const getWeather = function (data) {
    displayIcon(data);
    displayCurWeather(data);
    displayWeatherInfo(data);
  };

  const displayDailyForecast = function () {
    hourlyForecastPanel.innerHTML = "";
    const hourlyForecast = weather.list.slice(1, 6).reverse();
    hourlyForecast.forEach(function (call, i) {
      const rainPop = `${call.pop * 100}%`.slice(0, 3);
      const temp = `${call.main.temp}`.slice(0, 2);

      const markup = `
        <div class="panel day_forecast-panel day_forecast-panel--active " data-set="${i}">
        <span class="date">${new Date(call.dt_txt).getHours()}:00</span>
        <div>
        <img class="weather-img" src="${
          iconIDs[call.weather[0].icon]
        }" alt="weather icon" />
        <span class="temp">${temp}°C</span>
        <span class="water-dot"><img class="water-dot_dot" src=${rainProb} alt="water dot"/>${rainPop}</span>
        </div>
        </div>
      `;

      // Generating slides
      hourlyForecastPanel.insertAdjacentHTML("afterbegin", markup);
    });

    // display data functionality
    const allPanels = document.querySelectorAll(".day_forecast-panel");
    allPanels.forEach(function (panel) {
      panel.addEventListener("click", function () {
        getWeather(hourlyForecast[panel.dataset.set]);

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

  displayDailyForecast();

  // To calculate max temperatures of a day, calculate the average using all max temperatures during the day given by the api. The same applies to min temperatures.

  //////////////////////////////////////////////////////////////////////////////////

  // go back to current weather
  const allPanels = document.querySelectorAll(".day_forecast-panel");
  defaultWeatherBtn.addEventListener("click", function () {
    getWeather(weather.list[0]);

    defaultWeatherBtn.style.opacity = 0.2;
    defaultWeatherBtn.style.cursor = "auto";

    allPanels.forEach((panel) =>
      panel.classList.add("day_forecast-panel--active")
    );
  });
};



// Dark | Light mode
const darkModeIcon = document.querySelector('.screen--mode-btn[mode="dark"]');
const lightModeIcon = document.querySelector('.screen--mode-btn[mode="light"]');

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


yearCopy.textContent = new Date().getFullYear()