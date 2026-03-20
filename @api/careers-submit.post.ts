import type { ApiFunctionsContext } from '@redocly/config';

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

export default async function (request: Request, context: ApiFunctionsContext) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return context.status(503).json({ error: 'GOOGLE_APPS_SCRIPT_URL is not configured' });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return context.status(400).json({ error: 'Invalid JSON body' });
  }

  try {
    const res = await postWithRetry(GOOGLE_APPS_SCRIPT_URL, body);
    const data = await res.json().catch(() => ({}));
    return context.status(res.status).json(data);
  } catch {
    return context.status(502).json({ error: 'Upstream request failed' });
  }
}

async function postWithRetry(
  url: string,
  body: unknown,
  retries = MAX_RETRIES,
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok || attempt === retries) return res;
    } catch {
      if (attempt === retries) throw new Error('Upstream request failed');
    }
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  }
  throw new Error('Upstream request failed');
}