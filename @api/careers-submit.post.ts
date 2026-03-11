import type { ApiFunctionsContext } from '@redocly/config';

const GOOGLE_APPS_SCRIPT_URL = process.env.CAREERS_SUBMIT_SCRIPT_URL;

export default async function (request: Request, context: ApiFunctionsContext) {
  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === 'undefined') {
    return context.status(503).json({
      error: 'CAREERS_SUBMIT_SCRIPT_URL is not configured',
    });
  }
  try {
    const body = await request.json();
    const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      return context.status(res.status).text(text);
    }
    return context.status(200).text(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Request failed';
    return context.status(502).json({ error: message });
  }
}
