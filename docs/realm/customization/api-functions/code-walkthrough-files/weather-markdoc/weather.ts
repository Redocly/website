// @chunk {"steps": ["api-imports"]}
import type { ApiFunctionsContext } from '@redocly/config';
// @chunk-end

// @chunk {"steps": ["api-types"]}
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
// @chunk-end

// @chunk {"steps": ["api-function"]}
export default async function (request: Request, context: ApiFunctionsContext): Promise<Response> {
  // @chunk-end

  // @chunk {"steps": ["api-env"]}
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return context.status(500).json({
      error: 'Server configuration error',
      message: 'Weather API key is not configured',
    });
  }
  // @chunk-end

  // @chunk {"steps": ["api-params"]}
  const queryLocation = context.query.location;
  if (queryLocation && typeof queryLocation !== 'string') {
    return context.status(400).json({
      error: 'Invalid location parameter',
      message: 'Please provide a single location',
    });
  }

  const location =
    queryLocation || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'auto:ip';
  // @chunk-end

  // @chunk {"steps": ["api-fetch"]}
  try {
    const url = new URL('https://api.weatherapi.com/v1/current.json');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('q', location);
    url.searchParams.set('aqi', 'no');

    const weatherResponse = await fetch(url.toString());

    if (!weatherResponse.ok) {
      const errorData: WeatherApiError = await weatherResponse.json();
      return context.status(weatherResponse.status).json({
        error: 'Weather API error',
        message: errorData.error?.message || 'Failed to fetch weather data',
        code: errorData.error?.code,
      });
    }

    const weatherData: WeatherApiResponse = await weatherResponse.json();
    // @chunk-end

    // @chunk {"steps": ["api-response"]}
    return context.status(200).json({
      location: weatherData.location,
      current: weatherData.current,
    });
    // @chunk-end
    // @chunk {"steps": ["api-fetch"]}
  } catch (error: unknown) {
    console.error('Weather API error:', error);
    return context.status(500).json({ error: 'Internal server error' });
  }
  // @chunk-end
}
