import { API_KEY, BASE_URL } from './config.js';

const request = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}&appid=${API_KEY}&units=metric`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error: ${response.status}`);
  }

  return response.json();
};

export const fetchCurrentWeather = (city) => {
  return request(`/weather?q=${encodeURIComponent(city)}`);
};

export const fetchForecast = (city) => {
  return request(`/forecast?q=${encodeURIComponent(city)}`);
};

export const fetchWeatherByCoords = (lat, lon) => {
  return request(`/weather?lat=${lat}&lon=${lon}`);
};