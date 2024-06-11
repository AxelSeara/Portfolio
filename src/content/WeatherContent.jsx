import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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
      setWeather(weatherResponse.data);
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
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
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
          setLoading(false);
        },
        { timeout: 10000 } // 10 seconds timeout
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-t from-yellow-500 to-yellow-300';
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return 'bg-gradient-to-t from-yellow-500 to-yellow-300';
      case 'clouds':
        return 'bg-gradient-to-t from-blue-600 to-white';
      case 'rain':
        return 'bg-gradient-to-t from-black to-blue-500';
      case 'thunderstorm':
        return 'bg-gradient-to-t from-gray-900 to-gray-700';
      default:
        return 'bg-gradient-to-t from-yellow-500 to-yellow-300';
    }
  };

  const getAnimation = () => {
    if (!weather) return null;
    const main = weather.weather[0].main.toLowerCase();

    switch (main) {
      case 'clear':
        return (
          <motion.div
            className="w-12 h-12 bg-yellow-500 rounded-full"
            animate={{ scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
      case 'clouds':
        return (
          <motion.div
            className="w-12 h-12 bg-blue-600"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        );
      case 'rain':
        return (
          <motion.div
            className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-transparent border-b-blue-900"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        );
      case 'thunderstorm':
        return (
          <motion.div
            className="w-12 h-12 bg-gray-900 bg-zigzag"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        );
      default:
        return null;
    }
  };

  const handleCityClick = (city) => {
    setLatitude(city.lat);
    setLongitude(city.lon);
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-4 ${getBackgroundClass()}`}>
      <div className="w-full flex justify-center bg-quaternary text-accent mb-4 p-2 rounded flex-wrap">
        {cities.map((city) => (
          <button
            key={city.name}
            className="bg-tertiary text-accent px-2 py-1 m-1 rounded text-xs"
            onClick={() => handleCityClick(city)}
          >
            {city.name}
          </button>
        ))}
        <button
          className="bg-tertiary text-accent px-2 py-1 m-1 rounded text-xs"
          onClick={handleLocationPermission}
        >
          Current Location
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md h-96">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full animate-sunrise mb-4"></div>
            <p className="text-xl">Loading weather data... 🌞</p>
          </div>
        ) : error ? (
          <div className="text-center mt-6">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <div className="text-center mt-6">
            <h1 className="text-2xl mb-2">{weather?.name}</h1>
            <p className="text-lg">Temperature: {weather?.main?.temp}°C</p>
            <p className="text-lg">Condition: {weather?.weather[0]?.description}</p>
            {getAnimation()}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherContent;