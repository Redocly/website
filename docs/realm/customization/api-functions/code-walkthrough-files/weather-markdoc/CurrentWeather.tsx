// @chunk {"steps": ["component-import"]}
import * as React from 'react';
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

type WeatherState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; weather: WeatherResponse };

type CurrentWeatherProps = {
  q?: string;
  units?: 'c' | 'f';
};
// @chunk-end

// @chunk {"steps": ["component-function"]}
export function CurrentWeather({ q, units = 'c' }: CurrentWeatherProps): React.ReactElement {
  const [state, setState] = React.useState<WeatherState>({ status: 'loading' });
  // @chunk-end

  // @chunk {"steps": ["component-fetch"]}
  React.useEffect(() => {
    const abortController = new AbortController();
    const params = q ? `?q=${encodeURIComponent(q)}` : '';

    async function getCurrentWeather(): Promise<void> {
      setState({ status: 'loading' });

      try {
        const response = await fetch(`/api/weather${params}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          setState({ status: 'error', error: `Request failed (${response.status})` });
          return;
        }

        const weatherResponse: WeatherResponse = await response.json();
        setState({ status: 'success', weather: weatherResponse });
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          setState({ status: 'error', error: 'Request failed' });
        }
      }
    }

    getCurrentWeather();
    return () => abortController.abort();
  }, [q]);
  // @chunk-end

  // @chunk {"steps": ["component-render"]}
  if (state.status === 'loading') return <div>Loading weather…</div>;
  if (state.status === 'error') return <div>Weather unavailable: {state.error}</div>;

  const { weather } = state;
  const temperature =
    units === 'f'
      ? { temp: `${weather.current.temp_f}°F`, feelsLike: `${weather.current.feelslike_f}°F` }
      : { temp: `${weather.current.temp_c}°C`, feelsLike: `${weather.current.feelslike_c}°C` };
  const { temp, feelsLike } = temperature;

  return (
    <div>
      <strong>
        {weather.location.name}, {weather.location.country}
      </strong>
      <div>
        {weather.current.condition.text} · {temp} (feels like {feelsLike})
      </div>
      <div>
        Humidity: {weather.current.humidity}% · Wind: {weather.current.wind_kph} kph
      </div>
    </div>
  );
  // @chunk-end
}
