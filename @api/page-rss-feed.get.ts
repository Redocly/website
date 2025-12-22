import type { ApiFunctionsContext } from '@redocly/config';
import { escapeXml, formatRssDate } from '../@theme/utils/rss';

const TARGET_PAGE_SLUG = '/docs/end-user/interact-with-pages';

interface PageData {
  props?: {
    frontmatter?: {
      title?: string;
      description?: string;
      [key: string]: unknown;
    };
    seo?: {
      title?: string;
      description?: string;
      [key: string]: unknown;
    };
    ast?: unknown;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface PageChangeRecord {
  hash: string;
  timestamp: number;
  pageTitle: string;
  pageUrl: string;
}

async function calculateHash(pageData: PageData): Promise<string> {
  const dataToHash = pageData?.props?.ast || pageData?.props || pageData;
  const dataString = JSON.stringify(dataToHash);

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(dataString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
    } catch (error) {
      // Continue to fallback hash
    }
  }

  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash.toString(36);
}

function getPageTitle(pageData: PageData, slug: string): string {
  return (
    pageData?.props?.seo?.title ||
    pageData?.props?.frontmatter?.title ||
    slug.split('/').filter(Boolean).pop() ||
    'Untitled Page'
  );
}

function buildRssItem(record: PageChangeRecord, baseUrl: string): string {
  const title = `${escapeXml(record.pageTitle)} was updated`;
  const link = `${baseUrl}${record.pageUrl}`;
  const guid = `${link}#${record.hash}`;
  const pubDate = formatRssDate(record.timestamp);
  const description = `${escapeXml(record.pageTitle)} was updated at ${new Date(record.timestamp).toLocaleString()}`;

  return `
    <item>
      <title>${title}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>
  `;
}

async function fetchPageData(baseUrl: string, pageSlug: string): Promise<PageData> {
  const pageDataPath = pageSlug.replace(/^\//, '').replace(/\/$/, '');
  const pageDataUrl = `${baseUrl}/page-data/${pageDataPath}/data.json`;

  try {
    const pageDataResponse = await fetch(pageDataUrl);

    if (pageDataResponse.ok) {
      return await pageDataResponse.json();
    }

    throw new Error(`Failed to fetch page data: ${pageDataResponse.status} ${pageDataResponse.statusText}`);
  } catch (error) {
    throw new Error(`Failed to fetch page data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function updatePageChanges(
  kv: any,
  pageDataPath: string,
  currentHash: string,
  pageTitle: string,
  pageUrl: string
): Promise<void> {
  const lastHashKey = ['pageRss', 'pages', pageDataPath, 'lastHash'];
  const lastHashRecord = await kv.get(lastHashKey);
  const lastHash = lastHashRecord?.value;

  if (lastHash !== currentHash) {
    const now = Date.now();

    await kv.set(lastHashKey, currentHash);

    const changeRecord: PageChangeRecord = {
      hash: currentHash,
      timestamp: now,
      pageTitle,
      pageUrl,
    };

    const recordKey = [
      'pageRss',
      'changes',
      pageDataPath,
      now.toString().padStart(20, '0'),
      currentHash,
    ];

    await kv.set(recordKey, changeRecord);
  }
}

async function getChangeRecords(
  kv: any,
  pageDataPath: string,
  currentHash: string,
  pageTitle: string,
  pageUrl: string
): Promise<PageChangeRecord[]> {
  const changesPrefix = ['pageRss', 'changes', pageDataPath];
  const changesResult = await kv.list(
    { prefix: changesPrefix },
    { limit: 50, reverse: true }
  );

  if (changesResult.items.length > 0) {
    return changesResult.items.map((item) => item.value);
  }

  return [
    {
      hash: currentHash,
      timestamp: Date.now(),
      pageTitle,
      pageUrl,
    },
  ];
}

function buildRssFeed(
  pageTitle: string,
  pageUrl: string,
  baseUrl: string,
  feedUrl: string,
  records: PageChangeRecord[]
): string {
  const rssItems = records.map((record) => buildRssItem(record, baseUrl)).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(pageTitle)} - Update Feed</title>
    <link>${escapeXml(`${baseUrl}${pageUrl}`)}</link>
    <description>RSS feed for changes to ${escapeXml(pageTitle)}</description>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(Date.now())}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
}

export default async function pageRssFeedHandler(
  request: Request,
  context: ApiFunctionsContext
) {
  try {
    // @ts-ignore - getKv may not be in type definitions yet but exists at runtime
    const kv = await context.getKv();
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const pageData = await fetchPageData(baseUrl, TARGET_PAGE_SLUG);
    const pageDataPath = TARGET_PAGE_SLUG.replace(/^\//, '').replace(/\/$/, '');

    const currentHash = await calculateHash(pageData);
    const pageTitle = getPageTitle(pageData, TARGET_PAGE_SLUG);

    await updatePageChanges(kv, pageDataPath, currentHash, pageTitle, TARGET_PAGE_SLUG);
    const records = await getChangeRecords(kv, pageDataPath, currentHash, pageTitle, TARGET_PAGE_SLUG);

    const rssXml = buildRssFeed(pageTitle, TARGET_PAGE_SLUG, baseUrl, request.url, records);

    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error: any) {
    if (error?.message.includes('Failed to fetch page data')) {
      return context.status(404).json({
        error: 'Page not found',
        message: error.message,
      });
    }

    return context.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate RSS feed',
    });
  }
}
