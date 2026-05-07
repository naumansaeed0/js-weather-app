const HISTORY_KEY = 'weather_search_history';
const MAX_HISTORY = 5;

export const saveCity = (city) => {
  const history = getHistory();

  // Remove if already exists (avoid duplicates), then add to front
  const updated = [city, ...history.filter((c) => c.toLowerCase() !== city.toLowerCase())];

  // Keep only the last MAX_HISTORY cities
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, MAX_HISTORY)));
};

export const getHistory = () => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};