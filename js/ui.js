import { formatTemp, formatDate, formatDay, formatWind, formatVisibility, getIconUrl, getBackgroundClass } from './helpers.js';
const els = {
  searchInput:     document.getElementById('search-input'),
  searchBtn:       document.getElementById('search-btn'),
  locationBtn:     document.getElementById('location-btn'),
  historyList:     document.getElementById('history-list'),
  historySection:  document.getElementById('history-section'),
  loadingState:    document.getElementById('loading-state'),
  errorState:      document.getElementById('error-state'),
  emptyState:      document.getElementById('empty-state'),
  weatherSection:  document.getElementById('weather-section'),
  forecastSection: document.getElementById('forecast-section'),
  cityName:        document.getElementById('city-name'),
  weatherDate:     document.getElementById('weather-date'),
  weatherIcon:     document.getElementById('weather-icon'),
  weatherDesc:     document.getElementById('weather-description'),
  temperature:     document.getElementById('temperature'),
  unitToggle:      document.getElementById('unit-toggle'),
  feelsLike:       document.getElementById('feels-like'),
  humidity:        document.getElementById('humidity'),
  wind:            document.getElementById('wind'),
  visibility:      document.getElementById('visibility'),
  pressure:        document.getElementById('pressure'),
  forecastList:    document.getElementById('forecast-list'),
};

const showOnly = (stateEl) => {
  [els.loadingState, els.errorState, els.emptyState].forEach((el) => {
    el.classList.add('hidden');
  });
  stateEl.classList.remove('hidden');
};

const updateBackground = (conditionCode) => {
  document.body.className = document.body.className
    .split(' ')
    .filter((c) => !c.startsWith('bg-'))
    .join(' ');

  document.body.classList.add(getBackgroundClass(conditionCode));
};

export const renderLoading = () => {
  els.weatherSection.classList.add('hidden');
  els.forecastSection.classList.add('hidden');
  showOnly(els.loadingState);
};

export const renderError = (message) => {
  els.weatherSection.classList.add('hidden');
  els.forecastSection.classList.add('hidden');
  els.errorState.textContent = message;
  showOnly(els.errorState);
};

export const renderEmpty = () => {
  els.weatherSection.classList.add('hidden');
  els.forecastSection.classList.add('hidden');
  showOnly(els.emptyState);
};



export const renderWeather = (data, unit = 'C') => {
  const { main, weather, wind, visibility, sys, name, dt } = data;

  els.cityName.textContent       = `${name}, ${sys.country}`;
  els.weatherDate.textContent    = formatDate(dt);
  els.weatherDesc.textContent    = weather[0].description;
  els.weatherIcon.src            = getIconUrl(weather[0].icon);
  els.weatherIcon.alt            = weather[0].description;
  els.temperature.textContent    = formatTemp(main.temp, unit);
  els.unitToggle.textContent     = unit === 'C' ? 'Switch to °F' : 'Switch to °C';

  els.feelsLike.textContent  = `Feels like: ${formatTemp(main.feels_like, unit)}`;
  els.humidity.textContent   = `Humidity: ${main.humidity}%`;
  els.wind.textContent       = `Wind: ${formatWind(wind.speed)}`;
  els.visibility.textContent = `Visibility: ${formatVisibility(visibility)}`;
  els.pressure.textContent   = `Pressure: ${main.pressure} hPa`;

  updateBackground(weather[0].id);

  els.weatherSection.classList.remove('hidden');
  showOnly(els.emptyState); 
  els.emptyState.classList.add('hidden');
};


const filterDailyForecasts = (list) => {
  const seen = new Set();

  return list.filter((entry) => {
    const day = entry.dt_txt.split(' ')[0];
    if (seen.has(day)) return false;
    seen.add(day);
    return true;
  }).slice(0, 5);
};

export const renderForecast = (data, unit = 'C') => {
  const daily = filterDailyForecasts(data.list);

  els.forecastList.innerHTML = daily.map((entry) => `
    <div class="forecast-card">
      <p class="forecast-day">${formatDay(entry.dt)}</p>
      <img src="${getIconUrl(entry.weather[0].icon)}" alt="${entry.weather[0].description}" />
      <p class="forecast-desc">${entry.weather[0].description}</p>
      <p class="forecast-temp">${formatTemp(entry.main.temp, unit)}</p>
    </div>
  `).join('');

  els.forecastSection.classList.remove('hidden');
};

export const renderHistory = (cities) => {
  if (cities.length === 0) {
    els.historySection.classList.add('hidden');
    return;
  }

  els.historySection.classList.remove('hidden');
  els.historyList.innerHTML = cities.map((city) => `
    <li class="history-item" data-city="${city}">${city}</li>
  `).join('');
};