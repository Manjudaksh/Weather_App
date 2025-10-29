import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="mt-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-2">
        {weather.name}, {weather.country}
      </h2>
      <div className="flex flex-col gap-1 text-lg font-medium">
        <p>🌡 Temperature: {weather.temperature}°C</p>
        <p>💨 Wind Speed: {weather.windspeed} km/h</p>
        <p>🧭 Wind Direction: {weather.winddirection}°</p>
        <p>⏱ Time: {weather.time.replace("T", " ")}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
