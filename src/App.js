import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyForecast from "./components/DailyForecast";

function App() {
  const API_KEY = "74ccc415590549b2a6072724250708";

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C"); // "C" or "F"
  const [theme, setTheme] = useState("auto");
  const [loading, setLoading] = useState(false);

  // quick theme effect (applies dark body bg when dark selected)
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      setError("");
      setLoading(true);
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        city
      )}&days=10&aqi=yes&alerts=no`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Fetch error");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const gradientFor = (text = "") => {
    const t = (text || "").toLowerCase();
    if (/sun|clear/i.test(t)) return "from-amber-300 via-orange-300 to-pink-300";
    if (/rain|drizzle|shower|thunder/i.test(t)) return "from-sky-600 via-blue-700 to-slate-800";
    if (/snow|sleet/i.test(t)) return "from-slate-200 via-slate-400 to-sky-500";
    if (/cloud/i.test(t)) return "from-slate-500 via-slate-600 to-slate-800";
    return "from-indigo-500 via-purple-600 to-pink-500";
  };

  const currentCondition = weatherData?.current?.condition?.text || "";

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      <div className={`min-h-screen bg-gradient-to-br ${gradientFor(currentCondition)} py-8 px-4`}>
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-white text-2xl font-extrabold">Weather Forecast</h1>

            <div className="flex items-center gap-3">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="rounded px-2 py-1 bg-white/20 text-black"
                title="Theme"
              >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>

              <button
                onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
                className="text-black bg-white/20 px-3 py-1 rounded-lg hover:scale-105 transition"
                title="Toggle °C / °F"
              >
                °{unit}
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Search + Current */}
            <div className="lg:col-span-1 space-y-4">
              <div className="glass rounded-2xl p-4">
                <SearchBar onSearch={fetchWeather} loading={loading} />
              </div>

              <div className="glass rounded-2xl p-4">
                {loading && <div className="skeleton h-40 rounded" />}
                {!loading && weatherData ? (
                  <CurrentWeather data={weatherData} unit={unit} />
                ) : (
                  !loading && <div className="text-white/70">Search a city or allow location to auto-load.</div>
                )}
              </div>
            </div>

            {/* Right: Hourly + Daily */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-4">
                <h2 className="text-white font-semibold mb-3">Hourly Forecast</h2>
                {!weatherData && <div className="text-white/60">Hourly forecast will appear here.</div>}
                {weatherData && (
                  <HourlyWeather data={weatherData.forecast.forecastday[0].hour} unit={unit} />
                )}
              </div>

              <div className="glass rounded-2xl p-4">
                <h2 className="text-white font-semibold mb-3">10-Day Forecast</h2>
                {!weatherData && <div className="text-white/60">Daily forecast will appear here.</div>}
                {weatherData && <DailyForecast data={weatherData.forecast.forecastday} unit={unit} />}
              </div>
            </div>
          </div>

          {/* overlays for visual effect */}
          <div className="relative pointer-events-none">
            {weatherData && /rain|drizzle|shower|thund/i.test(currentCondition) && (
              <div className="rain-overlay" />
            )}
            {weatherData && /snow|sleet/i.test(currentCondition) && (
              <div className="snow-overlay" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
