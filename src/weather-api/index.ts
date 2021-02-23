import axios from "axios";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";
const API_KEY: string = "5e8d92fe37edc94eceaeddbe37894c94";

export const getWetherData = async (lat: number, lon: number) => {
  const weatherData = await axios
    .get(`/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((response) => response.data);
  return weatherData;
};
