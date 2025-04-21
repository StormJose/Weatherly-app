export const loadLocation = async function (query) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  const data = await res.json();

  return data;
};
