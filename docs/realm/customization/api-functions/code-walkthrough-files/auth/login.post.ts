// @chunk {"steps": ["auth-imports"]}
import type { ApiFunctionsContext } from '@redocly/config';
// @chunk-end

// @chunk {"steps": ["auth-function"]}
export default async function loginHandler(
  request: Request, 
  context: ApiFunctionsContext
) {
// @chunk-end
  try {
    // @chunk {"steps": ["auth-credentials"]}
    // Get credentials from request body
    const body = await request.json();
    const { username, password } = body || {};

    if (!username || !password) {
      return context.status(400).json({ error: 'Username and password are required' });
    }

    // This demo uses hardcoded values
    // Real-life applications validate credentials against a database
    if (username !== 'redocly' || password !== 'test') {
      return context.status(401).json({ error: 'Invalid credentials' });
    }
    // @chunk-end

      // @chunk {"steps": ["auth-session"]}
      // Generate a session token 
      // Real-life applications use JWT libraries
      const sessionToken = Buffer.from(
        JSON.stringify({
          username,
          exp: Date.now() + 3600000, // 1 hour expiration
        })
      ).toString('base64');
      // @chunk-end

      // @chunk {"steps": ["auth-cookie"]}
      // Set a cookie with the session token
      context.setCookie('session', sessionToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
        path: '/',
        sameSite: 'Strict',
      });
      // @chunk-end

      // @chunk {"steps": ["auth-response"]}
      return context.status(200).json({
        message: 'Authentication successful',
        user: { username }
      });
      // @chunk-end
    
  } catch (error) {
    // @chunk {"steps": ["auth-error-handling"]}
    return context.status(500).json({ 
      error: 'Internal server error',
      message: 'An error occurred while processing your request'
    });
    // @chunk-end
  }
} 