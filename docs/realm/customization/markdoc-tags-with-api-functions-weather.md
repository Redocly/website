---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Render weather data in a Markdoc tag (using API functions)

Build a custom Markdoc tag that renders **live weather data** by calling an **API function**.

This tutorial explains how to create:

- an API function endpoint at `/api/weather`
- a React component that fetches from that endpoint
- a Markdoc tag that authors can use in Markdown files

In the following solution:

- The **API key stays server-side** in the API function (`process.env.WEATHER_API_KEY`).
- The Markdoc component renders live data by calling your own endpoint.
- You can apply role-based access control to the API function.
  See [API functions reference](./api-functions/api-functions-reference.md).


## Before you begin

- Learn how to [build Markdoc tags](./build-markdoc-tags.md).
- Understand the [basics of API functions](./api-functions/create-api-functions.md).
- Get a free API key from [weatherapi.com](https://www.weatherapi.com/) and expose it as `WEATHER_API_KEY`.

## Create the Weather API function

- Create the file `@api/weather.ts`.
  This file defines an endpoint at `/api/weather` that accepts a required query parameter `q` (the location).

```ts {% title="@api/weather.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type WeatherApiError = {
  error?: {
    message?: string;
    code?: number;
  };
};

type WeatherApiResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export default async function (request: Request, context: ApiFunctionsContext) {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return context.status(500).json({
        error: 'Server configuration error',
        message: 'Weather API key is not configured',
      });
    }
    
  const { q } = context.query;

  if (!q) {
    return context.status(400).json({
      error: 'Missing location parameter',
      message: 'Please provide a location using the q parameter',
    });
  }
  if (typeof q !== 'string') {
    return context.status(400).json({
      error: 'Invalid location parameter',
      message: 'Please provide a single location',
    });
  }

  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(q)}&aqi=no`,
    );

    if (!weatherResponse.ok) {
      const errorData: WeatherApiError = await weatherResponse.json();
      return context.status(weatherResponse.status).json({
        error: 'Weather API error',
        message: errorData.error?.message || 'Failed to fetch weather data',
        code: errorData.error?.code,
      });
    }

    const weatherData: WeatherApiResponse = await weatherResponse.json();

    return context.status(200).json({
      location: weatherData.location,
      current: weatherData.current,
    });
  } catch {
    return context.status(500).json({ error: 'Internal server error' });
  }
}
```

For authentication, error patterns, and context helpers, see [Create API functions](./api-functions/create-api-functions.md).

## Create the Markdoc component

1. Create the file `@theme/markdoc/components/CurrentWeather.tsx`.
    This file is a component that fetches from your API function and renders the result.

```tsx {% title="@theme/markdoc/components/CurrentWeather.tsx" %}
import * as React from 'react';

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
  q: string;
  units?: 'c' | 'f';
};

export function CurrentWeather({ q, units = 'c' }: CurrentWeatherProps): React.ReactElement {
  const [state, setState] = React.useState<WeatherState>({ status: 'loading' });

  React.useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentWeather(): Promise<void> {
      setState({ status: 'loading' });

      try {
        const response = await fetch(`/api/weather?q=${encodeURIComponent(q)}`, {
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
      <div>Humidity: {weather.current.humidity}% · Wind: {weather.current.wind_kph} kph</div>
    </div>
  );
}
```

2. Export the file from `@theme/markdoc/components.tsx`:

```tsx {% title="@theme/markdoc/components.tsx" %}
export { CurrentWeather } from './components/CurrentWeather';
```

## Register the Markdoc tag

- Update `@theme/markdoc/schema.ts` to register a new tag.
  This example uses the Markdoc tag name `weather`.

```ts {% title="@theme/markdoc/schema.ts" %}
import type { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
  weather: {
    render: 'CurrentWeather',
    selfClosing: true,
    attributes: {
      q: { type: String, required: true },
      units: { type: String, default: 'c' },
    },
  },
};
```

## Use the tag in Markdown

Authors can embed the `weather` tag in any `.md` file.

```markdoc {% process=false %}
{% weather q="London" units="c" /%}
```

## Resources

- **[Build a Markdoc tag](./build-markdoc-tags.md)** - Create custom Markdoc tags with React components
- **[Create API functions](./api-functions/create-api-functions.md)** - Build server-side API endpoints with authentication and error handling
- **[API functions reference](./api-functions/api-functions-reference.md)** - Complete reference for API function context helpers and access control