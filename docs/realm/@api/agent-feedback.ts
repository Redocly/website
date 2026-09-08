import type { ApiFunctionsContext } from '@redocly/config';

const MAX_PATH = 1000;
const MAX_COMMENT_LENGTH = 5000;
const MAX_QUERY_SUMMARY = 500;
const MAX_QUERY_DETAILS = 1500;
const MAX_AGENT_NAME = 200;
const MAX_TARGET_FEATURE = 500;
const MAX_REQUEST_BODY_BYTES = 64 * 1024;

const MESSAGE_INVALID_FEEDBACK = 'Invalid feedback - review the errors and try again';
const MESSAGE_METHOD_NOT_ALLOWED = 'Method not allowed';

function parseContentLength(contentLength: string | null): number | undefined {
  if (!contentLength) {
    return undefined;
  }
  const parsed = Number.parseInt(contentLength, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }
  return parsed;
}

function extractErrorMessage(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object' && value !== null) {
    const message = (value as { message?: unknown }).message;
    if (typeof message === 'string') {
      return message;
    }
  }
  return undefined;
}

function sanitizeResponseErrors(response: Record<string, unknown>): string[] {
  const upstreamErrors = Array.isArray(response.errors)
    ? response.errors
        .map((error) => extractErrorMessage(error))
        .filter((error): error is string => !!error)
    : [];
  const upstreamMessage = extractErrorMessage(response.message);

  return [...upstreamErrors, upstreamMessage].filter((e): e is string => !!e);
}

// Strip null bytes and control characters (except newline/tab).
function sanitizeString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  return (
    value
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      .trim()
      .slice(0, maxLength) || undefined
  );
}

function getTrustedSiteOrigin(siteUrl: string | undefined): string | undefined {
  const trimmed = siteUrl?.trim();
  if (!trimmed) {
    return undefined;
  }
  try {
    return new URL(trimmed).origin;
  } catch {
    return undefined;
  }
}

type AgentFeedbackFields = {
  agent: string | undefined;
  pageUrlString: string | undefined;
  targetFeature: string | undefined;
  summary: string | undefined;
  details: string | undefined;
};

// Both readers accept `target_feature`, the legacy name from the first version of the
// llms.txt instruction. Agents that read a page before the rename still send it.
function readQueryFields(url: URL): AgentFeedbackFields {
  const params = url.searchParams;

  return {
    agent: sanitizeString(params.get('agent'), MAX_AGENT_NAME),
    pageUrlString: sanitizeString(params.get('url'), MAX_PATH),
    targetFeature:
      sanitizeString(params.get('targetFeature'), MAX_TARGET_FEATURE) ??
      sanitizeString(params.get('target_feature'), MAX_TARGET_FEATURE),
    summary: sanitizeString(params.get('summary'), MAX_QUERY_SUMMARY),
    details: sanitizeString(params.get('details'), MAX_QUERY_DETAILS),
  };
}

// Returns a Response instead of fields when the body is too large or not a JSON object.
async function readJsonBodyFields(
  request: Request,
  context: ApiFunctionsContext,
): Promise<AgentFeedbackFields | Response> {
  const contentLength = parseContentLength(request.headers.get('content-length'));
  if (contentLength !== undefined && contentLength > MAX_REQUEST_BODY_BYTES) {
    return context.status(413).json({
      errors: [`Request body must not exceed ${MAX_REQUEST_BODY_BYTES} bytes`],
      message: MESSAGE_INVALID_FEEDBACK,
    });
  }

  let raw: unknown;
  const bodyText = await request.text();
  if (new TextEncoder().encode(bodyText).length > MAX_REQUEST_BODY_BYTES) {
    return context.status(413).json({
      errors: [`Request body must not exceed ${MAX_REQUEST_BODY_BYTES} bytes`],
      message: MESSAGE_INVALID_FEEDBACK,
    });
  }

  try {
    raw = JSON.parse(bodyText) as unknown;
  } catch {
    return context
      .status(400)
      .json({ errors: ['Request body must be JSON'], message: MESSAGE_INVALID_FEEDBACK });
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return context
      .status(400)
      .json({ errors: ['Request body must be a JSON object'], message: MESSAGE_INVALID_FEEDBACK });
  }

  const body = raw as Record<string, unknown>;

  return {
    agent: sanitizeString(body.agent, MAX_AGENT_NAME),
    pageUrlString: sanitizeString(body.url, MAX_PATH),
    targetFeature:
      sanitizeString(body.targetFeature, MAX_TARGET_FEATURE) ??
      sanitizeString(body.target_feature, MAX_TARGET_FEATURE),
    summary: sanitizeString(body.summary, MAX_COMMENT_LENGTH),
    details: sanitizeString(body.details, MAX_COMMENT_LENGTH),
  };
}

export default async function (request: Request, context: ApiFunctionsContext): Promise<Response> {
  const baseOrigin = getTrustedSiteOrigin(context.baseUrl);
  const trustedSiteOrigin = getTrustedSiteOrigin(context.config.seo?.siteUrl) ?? baseOrigin;

  // return 202 as in `Feedback received` - not something the agent can fix
  if (!trustedSiteOrigin) {
    return context.status(202).json({ message: 'Feedback received, but not forwarded' });
  }

  let fields: AgentFeedbackFields;

  if (request.method === 'GET') {
    fields = readQueryFields(new URL(request.url));
  } else if (request.method === 'POST') {
    const parsed = await readJsonBodyFields(request, context);
    if (parsed instanceof Response) {
      return parsed;
    }
    fields = parsed;
  } else {
    return context.status(405).json({
      errors: ['Send feedback with GET query parameters or a POST JSON body'],
      message: MESSAGE_METHOD_NOT_ALLOWED,
    });
  }

  const { agent, pageUrlString, targetFeature, summary, details } = fields;

  const errors: string[] = [];
  if (!agent) {
    errors.push('`agent` is required');
  }
  if (!pageUrlString) {
    errors.push('`url` is required');
  }
  if (!targetFeature) {
    errors.push('`targetFeature` is required');
  }
  if (!summary) {
    errors.push('`summary` is required');
  }
  if (!details) {
    errors.push('`details` is required');
  }

  let parsedUrl: URL | undefined;
  if (pageUrlString) {
    try {
      parsedUrl = new URL(pageUrlString);
    } catch {
      errors.push('`url` must be a valid absolute URL');
    }
    if (parsedUrl && !/^https?:$/i.test(parsedUrl.protocol)) {
      errors.push('`url` must use http or https');
    }
    if (parsedUrl && parsedUrl.origin !== trustedSiteOrigin) {
      errors.push(
        `url must belong to this documentation site, expected ${trustedSiteOrigin}, got ${parsedUrl.origin}`,
      );
    }
  }

  // we want the agent to retry the request if it is invalid - so we return 400 with the errors
  if (errors.length) {
    return context.status(400).json({ errors, message: MESSAGE_INVALID_FEEDBACK });
  }

  const comment = sanitizeString(`${summary}\n\n${details}`, MAX_COMMENT_LENGTH);

  const feedbackUrl = new URL('/feedback', `${trustedSiteOrigin}/`).toString();

  const feedbackBody = {
    component: 'comment' as const,
    path: pageUrlString,
    comment,
    agent,
    targetFeature,
  };

  // we don't need to validate the response from the feedback API
  // if it fails server side (not because of a bad request) - it is of no concern to the agent
  try {
    const response = await fetch(feedbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackBody),
    });

    const status = response.status;
    // Bad request here - resend
    if (status === 400 || status === 422) {
      const body = await response.json().catch(() => ({}));
      return context.status(400).json({
        message: MESSAGE_INVALID_FEEDBACK,
        errors: sanitizeResponseErrors(body),
      });
    }

    // Other errors don't need to be handled here - it is of no concern to the agent
    if (response.ok) {
      console.log(`agent-feedback: forwarded ${request.method} submission from agent ${agent}`);
    } else {
      console.error(
        `agent-feedback: failed to forward ${request.method} submission from agent ${agent}, feedback API returned ${status}`,
      );
    }
  } catch (error) {
    console.error(
      `agent-feedback: failed to forward ${request.method} submission from agent ${agent}:`,
      error,
    );
  }

  return context.status(202).json({ message: 'Thanks for your feedback' });
}
