import { fetchCurrentWeather, fetchForecast, fetchWeatherByCoords } from './api.js';
import { saveCity, getHistory } from './storage.js';
import { renderWeather, renderForecast, renderHistory, renderError, renderLoading, renderEmpty } from './ui.js';


let currentUnit = 'C';
let lastWeatherData = null;
let lastForecastData = null;



const searchCity = async (city) => {
  if (!city.trim()) return;
  if (city.trim().length < 3) return;

  renderLoading();

  try {
    const [current, forecast] = await Promise.all([
      fetchCurrentWeather(city),
      fetchForecast(city),
    ]);

    lastWeatherData = current;
    lastForecastData = forecast;

    renderWeather(current, currentUnit);
    renderForecast(forecast, currentUnit);

    saveCity(current.name);
    renderHistory(getHistory());
  } catch (error) {
    console.error(error);
    renderError(`Could not find "${city}". Please check the spelling.`);
  }
};


const searchByLocation = () => {
  if (!navigator.geolocation) {
    renderError('Geolocation is not supported by your browser.');
    return;
  }

  renderLoading();

  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        const current = await fetchWeatherByCoords(coords.latitude, coords.longitude);
        const forecast = await fetchForecast(current.name);

        lastWeatherData = current;
        lastForecastData = forecast;

        renderWeather(current, currentUnit);
        renderForecast(forecast, currentUnit);

        saveCity(current.name);
        renderHistory(getHistory());
      } catch (error) {
        renderError('Could not load weather for your location.');
      }
    },
    () => searchCity('London')
  );
};


const toggleUnit = () => {
  if (!lastWeatherData) return;
  currentUnit = currentUnit === 'C' ? 'F' : 'C';
  renderWeather(lastWeatherData, currentUnit);
  renderForecast(lastForecastData, currentUnit);
};


const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const debouncedSearch = debounce((value) => searchCity(value), 500);


document.getElementById('search-btn').addEventListener('click', () => {
  searchCity(document.getElementById('search-input').value);
});

document.getElementById('location-btn').addEventListener('click', searchByLocation);

document.getElementById('unit-toggle').addEventListener('click', toggleUnit);

document.getElementById('search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchCity(e.target.value);
});

document.getElementById('search-input').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

document.getElementById('history-list').addEventListener('click', (e) => {
  const item = e.target.closest('.history-item');
  if (item) searchCity(item.dataset.city);
});

const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
  // Show/hide clear button based on input value
  e.target.value.length > 0
    ? clearBtn.classList.remove('hidden')
    : clearBtn.classList.add('hidden');
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.add('hidden');
  searchInput.focus();
  renderEmpty();
});


const init = () => {
  renderHistory(getHistory());
  searchByLocation();
};

init();
