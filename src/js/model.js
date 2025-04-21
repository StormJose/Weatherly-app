const API_KEY = "afff3b324bdff5abda023581d7fb75fa";
import { getPosition } from "./helpers/getPosition";

export let state = {
  currentWeather: {},
  coords: {},
};

export const loadLocation = async function (query) {
    
    if (!query) return

  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  const data = await res.json();

  return data;
};

export const loadWeather = async function (position) {
  try {
    state.coords = position

    if (!position) {
        const { coords } = await getPosition();
        state.coords = coords;
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${state.coords.latitude}&lon=${state.coords.longitude}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    state.currentWeather = data;
  } catch (err) {
    console.error("something went wrong.", err);
  }
};
