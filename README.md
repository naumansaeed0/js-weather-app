# 🌤️ Weather App

A clean, modular weather application built with vanilla JavaScript and the OpenWeatherMap API. Designed with production-grade architecture — no frameworks, no bundlers, just well-structured ES6 modules.

**[Live Demo →](https://naumansaeed0.github.io/js-weather-app/)**

---

## Features

- **Current weather** — temperature, feels like, humidity, wind, visibility, pressure
- **5-day forecast** — daily summary with icons and descriptions
- **Geolocation** — auto-detects your location on load
- **Celsius / Fahrenheit toggle** — converts locally, no extra API call
- **Debounced search** — waits for user to stop typing before firing requests
- **Search history** — persists last 5 cities via localStorage
- **Dynamic backgrounds** — gradient changes per weather condition
- **Loading / error / empty states** — full UI state management
- **Clear input button** — custom × button consistent across all browsers

---

## Architecture

```
weather-app/
├── index.html
├── style.css
└── js/
    ├── app.js        # Entry point — event wiring, geolocation, state
    ├── api.js        # Fetch abstraction layer — all HTTP calls live here
    ├── storage.js    # localStorage abstraction — search history
    ├── ui.js         # DOM rendering — all read/write to the DOM
    └── helpers.js    # Pure utilities — formatting, conversion, mapping
```

Each file has a single responsibility. Nothing bleeds across boundaries:
- `ui.js` never calls `fetch`
- `api.js` never touches the DOM
- `app.js` owns no rendering logic — it only coordinates

---

## Technical Highlights

**Fetch abstraction** — raw `fetch` is never called directly. All requests go through a single `request()` wrapper in `api.js` that handles status checks and error parsing uniformly.

**Parallel requests** — current weather and forecast are fetched simultaneously using `Promise.all()`, cutting load time roughly in half compared to sequential awaits.

**Debounced input** — a custom `debounce()` implementation delays search until 500ms after the user stops typing, with a minimum 3-character guard to prevent noise requests.

**Local unit conversion** — temperature is always fetched in metric. Fahrenheit conversion happens in `helpers.js` at render time, so toggling units requires zero additional API calls.

**Event delegation** — history item clicks use a single listener on the parent `<ul>` rather than individual listeners per item, keeping memory usage flat regardless of history size.

---

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/naumansaeed0/js-weather-app.git
cd js-weather-app
```

2. Get a free API key from [openweathermap.org](https://openweathermap.org)

3. Open `js/api.js` and replace the key:
```javascript
const API_KEY = 'your_api_key_here';
```

4. Open `index.html` in your browser — no build step needed

---

## API Reference

Uses two endpoints from [OpenWeatherMap](https://openweathermap.org/api):

| Endpoint | Used for |
|---|---|
| `/data/2.5/weather` | Current weather by city or coordinates |
| `/data/2.5/forecast` | 5-day / 3-hour forecast by city |

---

## What I Learned

Built as part of a self-directed JavaScript learning sprint.
- `async/await` and `try/catch` patterns
- ES6 modules (`import`/`export`)
- DOM manipulation and event handling
- `Array.map()`, `Array.filter()`, `Set` for data transformation
- `localStorage` for client-side persistence
- `Promise.all()` for parallel async operations
- CSS animations, `backdrop-filter`, and CSS variables

---

## License

MIT