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
export default async function (request: Request, context: ApiFunctionsContext) {
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
  const rawQ = context.query.q;
  if (rawQ && typeof rawQ !== 'string') {
    return context.status(400).json({
      error: 'Invalid location parameter',
      message: 'Please provide a single location',
    });
  }

  const location =
    rawQ || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'auto:ip';
  // @chunk-end

  // @chunk {"steps": ["api-fetch"]}
  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`,
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
    // @chunk-end

    // @chunk {"steps": ["api-response"]}
    return context.status(200).json({
      location: weatherData.location,
      current: weatherData.current,
    });
    // @chunk-end
    // @chunk {"steps": ["api-fetch"]}
  } catch {
    return context.status(500).json({ error: 'Internal server error' });
  }
  // @chunk-end
}
