import React from "react";

/* format WeatherAPI localtime (string "YYYY-MM-DD HH:MM") to h:mm AM/PM */
function formatLocalTime(localtimeStr) {
  // localtimeStr like "2025-08-11 11:00"
  const d = new Date(localtimeStr.replace(" ", "T"));
  let hrs = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, "0");
  const ampm = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12 || 12;
  return `${hrs}:${mins} ${ampm}`;
}

export default function CurrentWeather({ data, unit = "C" }) {
  const { location, current, forecast } = data;
  const today = forecast?.forecastday?.[0]?.day || {};
  const astro = forecast?.forecastday?.[0]?.astro || {};

  const temp = unit === "C" ? current.temp_c : current.temp_f;
  const feels = unit === "C" ? current.feelslike_c : current.feelslike_f;

  // try AQI display if present (WeatherAPI returns air_quality object)
  const aqiObj = current?.air_quality;
  const aqiDisplay = aqiObj ? Math.round(aqiObj["us-epa-index"] ?? aqiObj["pm2_5_eight_hour"] ?? 0) : null;

  return (
    <div className="text-white">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{location.name}, {location.country}</h2>
          <p className="text-sm text-white/70">{new Date(location.localtime.split(" ")[0]).toDateString()}</p>
          <p className="text-sm text-white/70">{formatLocalTime(location.localtime)}</p>
        </div>

        <div className="ml-auto text-right">
          <img className="w-24 h-24 icon-shadow inline-block" src={`https:${current.condition.icon}`} alt={current.condition.text} />
          <div className="text-4xl font-extrabold">{Math.round(temp)}°{unit}</div>
          <div className="text-sm text-white/80">{current.condition.text}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-white/6 rounded-lg">
          <div className="text-white/80">Feels like</div>
          <div className="font-semibold">{Math.round(feels)}°{unit}</div>
        </div>

        <div className="p-3 bg-white/6 rounded-lg">
          <div className="text-white/80">Chance of Rain</div>
          <div className="font-semibold">{today.daily_chance_of_rain ?? 0}%</div>
        </div>

        <div className="p-3 bg-white/6 rounded-lg">
          <div className="text-white/80">Humidity</div>
          <div className="font-semibold">{current.humidity}%</div>
        </div>

        <div className="p-3 bg-white/6 rounded-lg">
          <div className="text-white/80">Wind</div>
          <div className="font-semibold">{current.wind_kph} km/h</div>
        </div>

        <div className="p-3 bg-white/6 rounded-lg">
          <div className="text-white/80">UV Index</div>
          <div className="font-semibold">{current.uv}</div>
        </div>

        <div className="p-3 bg-white/6 rounded-lg">
          <div className="text-white/80">AQI (EPA)</div>
          <div className="font-semibold">{aqiDisplay ?? "N/A"}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-white/80 flex gap-4">
        <div>Sunrise: {astro.sunrise ?? "—"}</div>
        <div>Sunset: {astro.sunset ?? "—"}</div>
        <div>Moon: {astro.moon_phase ?? "—"}</div>
      </div>
    </div>
  );
}
