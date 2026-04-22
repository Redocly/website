// @chunk {"steps": ["component-import"]}
import React, { useEffect, useState, ReactElement } from 'react';
// @chunk-end

// @chunk {"steps": ["component-types"]}
type WeatherResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

type CurrentWeatherProps = {
  location?: string;
  units?: 'celsius' | 'fahrenheit';
};

type WeatherState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; weather: WeatherResponse };
// @chunk-end

// @chunk {"steps": ["component-function"]}
export function CurrentWeather({ location, units = 'celsius' }: CurrentWeatherProps): ReactElement {
  const [state, setState] = useState<WeatherState>({ status: 'loading' });
  // @chunk-end

  // @chunk {"steps": ["component-fetch"]}
  useEffect(() => {
    const abortController = new AbortController();
    const params = new URLSearchParams();
    if (location) {
      params.set('location', location);
    }
    const url = `/api/weather${params.toString() ? `?${params.toString()}` : ''}`;

    async function getCurrentWeather(): Promise<void> {
      setState({ status: 'loading' });

      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          setState({ status: 'error', error: `Request failed (${response.status})` });
          return;
        }

        const weatherResponse: WeatherResponse = await response.json();
        setState({ status: 'success', weather: weatherResponse });
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          return;
        }
        setState({ status: 'error', error: e instanceof Error ? e.message : 'Request failed' });
      }
    }

    getCurrentWeather();
    return () => abortController.abort();
  }, [location]);
  // @chunk-end

  // @chunk {"steps": ["component-render"]}
  if (state.status === 'loading') return <div>Loading weather…</div>;
  if (state.status === 'error') return <div>Weather unavailable: {state.error}</div>;

  const { weather } = state;
  const isFahrenheit = units === 'fahrenheit';
  const temperature = isFahrenheit ? `${weather.current.temp_f}°F` : `${weather.current.temp_c}°C`;
  const feelsLikeTemperature = isFahrenheit
    ? `${weather.current.feelslike_f}°F`
    : `${weather.current.feelslike_c}°C`;

  return (
    <div>
      <strong>
        {weather.location.name}, {weather.location.country}
      </strong>
      <div>
        {weather.current.condition.text} · {temperature} (feels like {feelsLikeTemperature})
      </div>
      <div>
        Humidity: {weather.current.humidity}% · Wind: {weather.current.wind_kph} kph
      </div>
    </div>
  );
  // @chunk-end
}
