// WeatherApp.js
import React, { useState } from 'react';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const response = await fetch(`http://localhost:3001?city=${location}`)
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        
        <input type="text" id="location" value={location} placeholder='Enter a location' onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
          <p>{weatherData.main.temp}°F</p>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed}mph</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
