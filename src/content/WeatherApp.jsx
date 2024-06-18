import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './WeatherStyles.css';

const cities = [
  { name: 'Reykjavik', lat: 64.1355, lon: -21.8954 },
  { name: 'Dubai', lat: 25.276987, lon: 55.296249 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6176 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241 }
];

const WeatherContent = () => {
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d6c6b757538770137128e0520bd7f64&units=metric`
      );
      const uvResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=9d6c6b757538770137128e0520bd7f64`
      );
      setWeather({ ...weatherResponse.data, uvIndex: uvResponse.data.value });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleLocationPermission = () => {
    console.log("Requesting location permission...");

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location access granted.");
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('The request to get user location timed out.');
            break;
          default:
            setError('An unknown error occurred.');
            break;
        }
      },
      { 
        timeout: 10000,
        maximumAge: 60000,
        enableHighAccuracy: true
      }
    );
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-t from-pink-500 to-orange-300';
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return 'bg-gradient-to-t from-pink-500 to-orange-300';
      case 'clouds':
        return 'bg-gradient-to-t from-purple-600 to-white';
      case 'rain':
        return 'bg-gradient-to-t from-blue-900 to-blue-500';
      case 'thunderstorm':
        return 'bg-gradient-to-t from-gray-900 to-gray-700';
      case 'snow':
        return 'bg-gradient-to-t from-blue-500 to-white';
      case 'drizzle':
        return 'bg-gradient-to-t from-blue-300 to-blue-100';
      case 'mist':
      case 'fog':
        return 'bg-gradient-to-t from-gray-400 to-gray-200';
      default:
        return 'bg-gradient-to-t from-pink-500 to-orange-300';
    }
  };

  const getEmoji = () => {
    if (!weather) return '🌞';
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return '🌞';
      case 'clouds':
        return '🌥️';
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'drizzle':
        return '🌦️';
      case 'mist':
      case 'fog':
        return '🌫️';
      default:
        return '🌞';
    }
  };

  const handleCityClick = (city) => {
    setLatitude(city.lat);
    setLongitude(city.lon);
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-4 ${getBackgroundClass()} font-mono`}>
      <div className="w-full flex justify-center text-accent mb-4 p-2 rounded flex-wrap">
        {cities.map((city) => (
          <button
            key={city.name}
            className="bg-tertiary text-accent px-2 py-1 m-1 rounded text-xs hover:bg-accent hover:text-tertiary shadow-sm"
            onClick={() => handleCityClick(city)}
          >
            {city.name}
          </button>
        ))}
        <button
          className="bg-tertiary text-accent px-2 py-1 m-1 rounded text-xs hover:bg-accent hover:text-tertiary"
          onClick={handleLocationPermission}
        >
          Current Location
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md h-96">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="w-12 h-12"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🌞
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
              {getEmoji()}
            </motion.div>
            <h1 className="text-2xl mb-2 mt-2">{weather?.name}</h1>
            <p className="text-lg">Temperature: {weather?.main?.temp.toFixed(1)}°C</p>
            <p className="text-lg">Condition: {weather?.weather[0]?.description}</p>
            <p className="text-lg">Min Temp: {weather?.main?.temp_min.toFixed(1)}°C</p>
            <p className="text-lg">Max Temp: {weather?.main?.temp_max.toFixed(1)}°C</p>
            <p className="text-lg">UV Index: {weather?.uvIndex}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherContent;