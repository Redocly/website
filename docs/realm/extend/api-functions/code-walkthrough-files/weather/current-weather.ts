// @chunk {"steps": ["weather-imports"]}
import type { ApiFunctionsContext } from '@redocly/config';
// @chunk-end

// @chunk {"steps": ["weather-auth-check"], "when": {"weather-auth": true}}
// Helper function to validate the session
async function validateSession(context: ApiFunctionsContext) {
  const sessionToken = context.cookies?.session;
  
  if (!sessionToken) {
    return false;
  }
  
  try {
    const decodedToken = JSON.parse(
      Buffer.from(sessionToken, 'base64').toString()
    );
    
    if (decodedToken.exp < Date.now()) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}
// @chunk-end

// @chunk {"steps": ["weather-function"]}
export default async function (
  request: Request, 
  context: ApiFunctionsContext
) {
// @chunk-end

// @chunk {"steps": ["weather-auth-implementation"], "when": {"weather-auth": true}}
  // Optional: Check authentication status
  const isAuthenticated = await validateSession(context);
  if (!isAuthenticated) {
    return context.status(401).json({ error: 'Authentication required' });
  }
// @chunk-end

// @chunk {"steps": ["weather-params"]}
  // Get query parameters
  const q = context.query.q;
  
  if (!q) {
    return context.status(400).json({ 
      error: 'Missing location parameter', 
      message: 'Please provide a location using the q parameter' 
    });
  }
// @chunk-end

  try {
// @chunk {"steps": ["weather-env-vars"]}
    // Get the API key from environment variables
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return context.status(500).json({ 
        error: 'Server configuration error', 
        message: 'Weather API key is not configured' 
      });
    }
// @chunk-end

// @chunk {"steps": ["weather-api-call"]}
    // Call the external weather API
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(q)}&aqi=no`
    );
    
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      return context.status(weatherResponse.status).json({
        error: 'Weather API error',
        message: errorData.error?.message || 'Failed to fetch weather data',
        code: errorData.error?.code
      });
    }

    const weatherData = await weatherResponse.json();
// @chunk-end
    
// @chunk {"steps": ["weather-response"]}
    // Return formatted weather data
    return context.status(200).json({
      location: {
        name: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
        lat: weatherData.location.lat,
        lon: weatherData.location.lon,
        localtime: weatherData.location.localtime
      },
      current: {
        temp_c: weatherData.current.temp_c,
        temp_f: weatherData.current.temp_f,
        condition: weatherData.current.condition,
        wind_kph: weatherData.current.wind_kph,
        wind_mph: weatherData.current.wind_mph,
        humidity: weatherData.current.humidity,
        feelslike_c: weatherData.current.feelslike_c,
        feelslike_f: weatherData.current.feelslike_f
      }
    });
// @chunk-end
  } catch (error) {
// @chunk {"steps": ["weather-error-handling"]}
    return context.status(500).json({ error: 'Internal server error' });
// @chunk-end
  }
} 