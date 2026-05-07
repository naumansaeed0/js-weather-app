// ─── Temperature ──────────────────────────────────────────────────────────

export const celsiusToFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

export const formatTemp = (temp, unit) => {
  const rounded = Math.round(temp);
  return unit === 'F' ? `${celsiusToFahrenheit(rounded)}°F` : `${rounded}°C`;
};

// ─── Wind ─────────────────────────────────────────────────────────────────

export const formatWind = (speedMetersPerSec) => {
  return `${Math.round(speedMetersPerSec * 3.6)} km/h`;
};

// ─── Visibility ───────────────────────────────────────────────────────────

export const formatVisibility = (meters) => {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
};

// ─── Date & Time ──────────────────────────────────────────────────────────

export const formatDate = (timestamp) => {
  // OpenWeatherMap returns Unix timestamps (seconds), JS Date expects milliseconds
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ─── Weather Condition → Background ───────────────────────────────────────
// Maps OpenWeatherMap condition codes to a CSS class on <body>
// Full code list: https://openweathermap.org/weather-conditions

export const getBackgroundClass = (conditionCode) => {
  if (conditionCode >= 200 && conditionCode <= 232) return 'bg-thunderstorm';
  if (conditionCode >= 300 && conditionCode <= 321) return 'bg-drizzle';
  if (conditionCode >= 500 && conditionCode <= 531) return 'bg-rain';
  if (conditionCode >= 600 && conditionCode <= 622) return 'bg-snow';
  if (conditionCode >= 700 && conditionCode <= 781) return 'bg-mist';
  if (conditionCode === 800)                        return 'bg-clear';
  if (conditionCode >= 801 && conditionCode <= 804) return 'bg-clouds';
  return 'bg-clear';
};

// ─── Icon URL ─────────────────────────────────────────────────────────────

export const getIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};