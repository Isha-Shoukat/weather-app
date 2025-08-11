import React from "react";

/* hour.time is like "2025-08-11 11:00" */
function formatTime(timeStr) {
  const d = new Date(timeStr.replace(" ", "T"));
  let hrs = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, "0");
  const ampm = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12 || 12;
  return `${hrs}:${mins} ${ampm}`;
}

export default function HourlyWeather({ data = [], unit = "C" }) {
  return (
    <div className="mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {data.map((hour) => (
          <div
            key={hour.time_epoch}
            className="min-w-[110px] bg-white/6 rounded-xl p-3 text-center card-hover transition"
          >
            <div className="text-xs text-white/70 mb-2">{formatTime(hour.time)}</div>
            <img className="mx-auto w-14 h-14" src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
            <div className="mt-2 font-semibold">
              {unit === "C" ? `${Math.round(hour.temp_c)}°C` : `${Math.round(hour.temp_f)}°F`}
            </div>
            <div className="text-xs text-white/60 mt-1">Rain: {hour.chance_of_rain ?? 0}%</div>
          </div>
        ))}
      </div>

      {/* small story style cards 
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.slice(0, 8).map((h) => (
          <div key={h.time_epoch} className="bg-white/5 rounded-xl p-3 flex flex-col items-center">
            <div className="text-xs text-white/70">{formatTime(h.time)}</div>
            <img className="w-12 h-12 my-2" src={`https:${h.condition.icon}`} alt={h.condition.text} />
            <div className="font-semibold">{unit === "C" ? `${Math.round(h.temp_c)}°C` : `${Math.round(h.temp_f)}°F`}</div>
          </div>
        ))}
     </div>*/}
    </div>
  );
}
