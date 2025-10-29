import React, { useState } from "react";
import WeatherCard from "./components/WeatherCart.jsx";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    setError("");
    setWeather(null);

    try {
      const geocodeRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geocodeRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        ...weatherData.current_weather,
      });
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-400 via-indigo-400 to-blue-600 px-4">
      {/* Glass Card */}
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center transition transform hover:scale-[1.02]">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md mb-6">
          🌤 Weather App
        </h1>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white/40 transition"
        />

        {/* Button */}
        <button
          onClick={getWeather}
          className="mt-5 w-full bg-white/30 text-white font-semibold py-2 rounded-xl hover:bg-white/40 transition border border-white/40 backdrop-blur-sm"
        >
          Get Weather
        </button>

        {error && <p className="text-red-300 mt-4 font-medium">{error}</p>}

        {weather && <WeatherCard weather={weather} />}
      </div>

      {/* Footer */}
      <p className="text-white/80 mt-6 text-sm">
        Designed with ❤️ using React + Tailwind CSS
      </p>
    </div>
  );
};

export default App;
