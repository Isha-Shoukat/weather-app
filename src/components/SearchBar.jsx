import React, { useState } from "react";

export default function SearchBar({ onSearch, loading=false }) {
  const [city, setCity] = useState("");

  return (
    <div>
      <div className="flex gap-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (onSearch(city), setCity(""))}
          placeholder="City name or lat,long (e.g., Lahore)"
          className="flex-1 p-3 rounded-lg outline-none text-slate-800"
        />
        <button
          onClick={() => { onSearch(city); setCity(""); }}
          className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
