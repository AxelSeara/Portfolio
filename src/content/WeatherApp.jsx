import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './WeatherStyles.css';

const cities = [
  { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
  { name: 'Ourense', lat: 42.3367, lon: -7.8641 },
  { name: 'Sarajevo', lat: 43.8563, lon: 18.4131 },
  { name: 'Helsinki', lat: 60.1695, lon: 24.9354 },
  { name: 'Nauru', lat: -0.5228, lon: 166.9315 }
];

const WeatherContent = () => {
  const [weather, setWeather]   = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [latitude, setLatitude] = useState(cities[0].lat);
  const [longitude, setLongitude] = useState(cities[0].lon);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  /** 
   * Recuperar el clima y la calidad del aire
   */
  const fetchWeather = async (lat, lon) => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d6c6b757538770137128e0520bd7f64&units=metric`
      );
      const airQRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=9d6c6b757538770137128e0520bd7f64`
      );

      setWeather(weatherRes.data);
      setAirQuality(airQRes.data.list[0].main.aqi);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Unable to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Al montar o cambiar lat/lon
   */
  useEffect(() => {
    fetchWeather(latitude, longitude);
  }, [latitude, longitude]);

  /**
   * Pide geolocalización solo con Current Location
   */
  const handleLocationPermission = () => {
    console.log("Requesting location permission...");

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    // Solo para current location marcamos "loading = true"
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Location access granted.");
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      (err) => {
        console.error('Error getting location:', err);
        setError('Location permission denied. Using default cities.');
        // No cambiamos lat/lon => se queda en la ciudad default
        setLoading(false);
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
    );
  };

  /**
   * Determina el gradiente de fondo según el clima
   */
  const getBackgroundClass = () => {
    if (!weather) return 'from-blue-500 to-blue-300';
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return 'from-blue-500 to-blue-300';       // Soleado
      case 'clouds':
        return 'from-gray-600 to-gray-300';       // Nublado
      case 'rain':
        return 'from-blue-900 to-blue-500';       // Lluvia
      case 'thunderstorm':
        return 'from-gray-900 to-gray-700';       // Tormenta
      case 'snow':
        return 'from-blue-500 to-white';          // Nieve
      case 'drizzle':
        return 'from-blue-300 to-blue-100';       // Llovizna
      case 'mist':
      case 'fog':
        return 'from-gray-400 to-gray-200';       // Niebla
      default:
        return 'from-blue-500 to-blue-300';       // Por defecto
    }
  };

  /**
   * Determina el emoji según el clima
   */
  const getWeatherEmoji = () => {
    if (!weather) return '🌞';
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case 'clear':        return '☀️';
      case 'clouds':       return weather.weather[0].description.includes('broken') ? '⛅' : '☁️';
      case 'rain':         return '🌧️';
      case 'thunderstorm': return '⛈️';
      case 'snow':         return '❄️';
      case 'drizzle':      return '🌦️';
      case 'mist':
      case 'fog':          return '🌫️';
      default:             return '🌞';
    }
  };

  /**
   * Alerta de calidad del aire
   * Mismo color de texto que el resto, + un emoji
   */
  const getAirQualityAlert = () => {
    if (airQuality === null) return null;
    switch (airQuality) {
      case 1:
        return { message: 'Air quality is good.', emoji: '😃' };
      case 2:
        return { message: 'Air quality is fair.', emoji: '🙂' };
      case 3:
        return { message: 'Moderate pollution. Sensitive people take precautions.', emoji: '😐' };
      case 4:
        return { message: 'High pollution! Avoid outdoor activities.', emoji: '😷' };
      case 5:
        return { message: 'Very high pollution! Stay indoors if you have allergies.', emoji: '🤒' };
      default:
        return null;
    }
  };

  /** Cambiar ciudad sin activar loading */
  const handleCityClick = (city) => {
    setError(null);
    setLoading(false); 
    setLatitude(city.lat);
    setLongitude(city.lon);
  };

  return (
    <div 
      className={`
        flex flex-col items-center justify-center h-full p-4
        bg-gradient-to-t ${getBackgroundClass()} 
        font-mono transition ease-in-out
      `}
    >
      {/* Barra de ciudades */}
      <div className="w-full flex justify-center text-accent mb-6 p-2 rounded flex-wrap">
        {cities.map((city) => (
          <button
            key={city.name}
            className="bg-tertiary text-accent px-2 py-1 m-1 rounded text-xs hover:bg-accent hover:text-tertiary shadow-sm"
            onClick={() => handleCityClick(city)}
          >
            {city.name}
          </button>
        ))}

        {/* Botón Current Location => activa loading */}
        <button
          className="bg-tertiary text-accent px-2 py-1 m-1 rounded text-xs hover:bg-accent hover:text-tertiary"
          onClick={handleLocationPermission}
        >
          Current Location
        </button>
      </div>

      {/* Contenedor de contenido */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md h-96">
        {loading ? (
          /* Solo se muestra "loading..." cuando es por geolocalización */
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="w-12 h-12"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⏳
            </motion.div>
            <p className="text-xl mt-2">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="text-center mt-6">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <div className="text-center mt-6">
            <motion.div
              className="text-6xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {getWeatherEmoji()}
            </motion.div>

            <h1 className="text-2xl mb-2 mt-2">{weather?.name}</h1>
            <p className="text-lg">Temperature: {weather?.main?.temp.toFixed(1)}°C</p>
            <p className="text-lg">Condition: {weather?.weather[0]?.description}</p>
            <p className="text-lg">Min Temp: {weather?.main?.temp_min.toFixed(1)}°C</p>
            <p className="text-lg">Max Temp: {weather?.main?.temp_max.toFixed(1)}°C</p>

            {/* Alerta de calidad del aire (mismo color que resto, + emoji) */}
            {getAirQualityAlert() && (
              <p className="text-lg font-bold mt-4">
                {getAirQualityAlert().emoji} {getAirQualityAlert().message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherContent;