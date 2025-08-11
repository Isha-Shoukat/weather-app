import React from "react";

export default function DailyForecast({ data = [], unit = "C" }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((day) => (
        <div key={day.date} className="bg-white/6 rounded-xl p-3 text-center card-hover transition">
          <div className="text-sm text-white/70">
            {new Date(day.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
          </div>
          <img className="mx-auto my-2 w-16 h-16" src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
          <div className="font-semibold">
            {unit === "C" ? `${Math.round(day.day.avgtemp_c)}°C` : `${Math.round(day.day.avgtemp_f)}°F`}
          </div>
          <div className="text-xs text-white/70 mt-1">{day.day.condition.text}</div>
          <div className="mt-2 text-sm">Rain: {day.day.daily_chance_of_rain ?? 0}%</div>
        </div>
      ))}
    </div>
  );
}
