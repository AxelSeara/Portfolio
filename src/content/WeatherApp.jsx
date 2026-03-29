import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getCopy } from './copy';

const cities = [
  { name: 'Berlin', lat: 52.52, lon: 13.405 },
  { name: 'Ourense', lat: 42.3367, lon: -7.8641 },
  { name: 'Sarajevo', lat: 43.8563, lon: 18.4131 },
  { name: 'Helsinki', lat: 60.1695, lon: 24.9354 },
  { name: 'Nauru', lat: -0.5228, lon: 166.9315 },
];

const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const weatherIconByMain = {
  clear: '☀',
  clouds: '☁',
  rain: '☂',
  thunderstorm: '⚡',
  snow: '❄',
  drizzle: '☔',
  mist: '〰',
  fog: '〰',
};

const WeatherApp = () => {
  const t = getCopy();
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [latitude, setLatitude] = useState(cities[0].lat);
  const [longitude, setLongitude] = useState(cities[0].lon);
  const [selectedCity, setSelectedCity] = useState(cities[0].name);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  const fetchWeather = useCallback(
    async (lat, lon) => {
      if (!WEATHER_API_KEY) {
        setError(t.content.weather.errors.serviceNotConfigured);
        setLoading(false);
        return;
      }

      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const airQRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
        );

        setWeather(weatherRes.data);
        setAirQuality(airQRes.data.list[0].main.aqi);
        setError('');
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(t.content.weather.errors.fetchFailed);
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    fetchWeather(latitude, longitude);
  }, [fetchWeather, latitude, longitude]);

  const handleCityClick = (city) => {
    setSelectedCity(city.name);
    setLoading(true);
    setError('');
    setLatitude(city.lat);
    setLongitude(city.lon);
  };

  const handleLocationPermission = () => {
    if (!navigator.geolocation) {
      setError(t.content.weather.errors.noGeolocation);
      return;
    }

    setSelectedCity(t.content.weather.actions.currentLocation);
    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      () => {
        setLoading(false);
        setError(t.content.weather.errors.locationDenied);
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
    );
  };

  const main = weather?.weather?.[0]?.main?.toLowerCase() || 'clear';
  const symbol = weatherIconByMain[main] || '☀';

  const airQualityInfo = (() => {
    switch (airQuality) {
      case 1:
        return {
          label: t.content.weather.airQuality.labels.good,
          note: t.content.weather.airQuality.notes.good,
          tone: 'bg-tertiary text-accent',
        };
      case 2:
        return {
          label: t.content.weather.airQuality.labels.fair,
          note: t.content.weather.airQuality.notes.fair,
          tone: 'bg-secondary text-accent',
        };
      case 3:
        return {
          label: t.content.weather.airQuality.labels.moderate,
          note: t.content.weather.airQuality.notes.moderate,
          tone: 'bg-primary text-accent',
        };
      case 4:
        return {
          label: t.content.weather.airQuality.labels.poor,
          note: t.content.weather.airQuality.notes.poor,
          tone: 'bg-accent text-white',
        };
      case 5:
        return {
          label: t.content.weather.airQuality.labels.veryPoor,
          note: t.content.weather.airQuality.notes.veryPoor,
          tone: 'bg-black text-white',
        };
      default:
        return {
          label: t.content.weather.airQuality.labels.na,
          note: t.content.weather.airQuality.notes.na,
          tone: 'bg-quaternary text-accent',
        };
    }
  })();

  return (
    <div className="retro-app-shell mx-auto">
      <div className="retro-app-header">
        <h2 className="retro-app-title">{t.content.weather.title}</h2>
        <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
          {t.content.weather.badge}
        </span>
      </div>

      <div className="retro-app-toolbar">
        <div className="flex flex-wrap items-center gap-2">
          {cities.map((city) => (
            <button
              key={city.name}
              type="button"
              className={`retro-btn ${selectedCity === city.name ? 'active' : ''}`}
              onClick={() => handleCityClick(city)}
            >
              {city.name}
            </button>
          ))}
          <button type="button" className="retro-btn" onClick={handleLocationPermission}>
            {t.content.weather.actions.currentLocation}
          </button>
        </div>
      </div>

      <div className="retro-app-body md:p-4">
        {showInfoPanel && (
          <div className="retro-app-panel mb-3 font-mono text-xs leading-relaxed text-accent">
            <div className="flex items-start justify-between gap-3">
              <p>{t.content.weather.info}</p>
              <button
                type="button"
                className="retro-btn shrink-0"
                onClick={() => setShowInfoPanel(false)}
              >
                {t.content.weather.actions.close}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="retro-app-panel flex min-h-64 flex-col items-center justify-center">
            <motion.div
              className="text-4xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              {symbol}
            </motion.div>
            <p className="mt-2 font-mono text-sm text-accent">{t.content.weather.loading}</p>
          </div>
        )}

        {!loading && error && (
          <div className="retro-app-panel min-h-64 bg-primary p-4 font-mono text-sm font-bold text-accent">
            {error}
          </div>
        )}

        {!loading && !error && weather && (
          <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
            <div className="retro-app-panel p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                {selectedCity}
              </div>
              <div className="mt-2 flex items-end gap-3">
                <motion.div
                  className="font-mono text-5xl leading-none text-accent"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {symbol}
                </motion.div>
                <div className="font-mono text-5xl font-bold leading-none text-accent">
                  {weather.main.temp.toFixed(0)}°
                </div>
              </div>
              <div className="mt-3 inline-block border-2 border-accent bg-tertiary px-2 py-1 font-mono text-xs uppercase text-accent">
                {weather.weather[0].description}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="retro-app-panel p-3 font-mono text-sm text-accent">
                <div className="mb-2 text-xs uppercase tracking-wide">
                  {t.content.weather.ranges.title}
                </div>
                <div className="flex justify-between">
                  <span>{t.content.weather.ranges.min}</span>
                  <strong>{weather.main.temp_min.toFixed(1)}°C</strong>
                </div>
                <div className="mt-1 flex justify-between">
                  <span>{t.content.weather.ranges.max}</span>
                  <strong>{weather.main.temp_max.toFixed(1)}°C</strong>
                </div>
              </div>

              <div className="retro-app-panel p-3 font-mono text-sm">
                <div className="mb-2 text-xs uppercase tracking-wide text-accent">
                  {t.content.weather.airQuality.title}
                </div>
                <div
                  className={`inline-flex border-2 border-accent px-2 py-1 text-xs font-bold uppercase ${airQualityInfo.tone}`}
                >
                  {airQualityInfo.label}
                </div>
                <p className="mt-2 text-xs text-accent">{airQualityInfo.note}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
