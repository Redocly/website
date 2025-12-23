import type { ApiFunctionsContext } from '@redocly/config';
import { escapeXml, formatRssDate } from '../@theme/utils/rss';
import crypto from 'crypto';
// @ts-ignore
import pagesConfig from './page-rss-pages.yaml';

interface PageConfig {
  slug: string;
  title?: string;
}

interface PagesConfig {
  pages: PageConfig[];
}

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
    lastModified?: number | string;
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

  return crypto.createHash('sha1').update(dataString).digest('base64').substring(0, 16);
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

    if (!pageDataResponse.ok) {
      throw new Error(`Page not found: ${pageDataResponse.status} ${pageDataResponse.statusText} at ${pageDataUrl}`);
    }

    return await pageDataResponse.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('Page not found')) {
      throw error;
    }
    throw new Error(`Failed to fetch page data from ${pageDataUrl}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function updatePageChanges(
  kv: any,
  pageDataPath: string,
  currentHash: string,
  pageTitle: string,
  pageUrl: string,
  pageLastModified?: number | string
): Promise<void> {
  const lastHashKey = ['pageRss', 'pages', pageDataPath, 'lastHash'];
  const lastHashRecord = await kv.get(lastHashKey);
  const lastHash = lastHashRecord?.value;

  if (lastHash === currentHash) {
    return;
  }

  const changesPrefix = ['pageRss', 'changes', pageDataPath];
  const existingChanges = await kv.list(
    { prefix: changesPrefix },
    { limit: 100 }
  ) as { items: Array<{ value: PageChangeRecord }> };

  const hashAlreadyExists = existingChanges.items.some(
    (item) => item.value?.hash === currentHash
  );

  if (!hashAlreadyExists) {
    let timestamp: number;
    if (pageLastModified) {
      timestamp = typeof pageLastModified === 'string' 
        ? new Date(pageLastModified).getTime() 
        : pageLastModified;
    } else {
      timestamp = Date.now();
    }

    const changeRecord: PageChangeRecord = {
      hash: currentHash,
      timestamp,
      pageTitle,
      pageUrl,
    };

    const recordKey = [
      'pageRss',
      'changes',
      pageDataPath,
      timestamp.toString().padStart(20, '0'),
      currentHash,
    ];

    await kv.set(recordKey, changeRecord);
  }

  await kv.set(lastHashKey, currentHash);
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
  apiPath: string,
  pageSlug: string,
  records: PageChangeRecord[]
): string {
  const rssItems = records.map((record) => buildRssItem(record, baseUrl)).join('');

  const feedUrl = `${baseUrl}${apiPath}?page=${encodeURIComponent(pageSlug)}`;

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

function getPageSlug(context: ApiFunctionsContext, config: PagesConfig): string {
  const pageSlug = context.query.page as string | undefined;
  
  if (pageSlug) {
    const isValidPage = config.pages.some((p) => p.slug === pageSlug);
    if (!isValidPage) {
      throw new Error(`Page '${pageSlug}' is not in the allowed pages list`);
    }
    return pageSlug;
  }

  if (config.pages.length === 0) {
    throw new Error('No pages configured in page-rss-pages.yaml');
  }

  return config.pages[0].slug;
}

export default async function pageRssFeedHandler(
  request: Request,
  context: ApiFunctionsContext
) {
  try {
    const config = pagesConfig as PagesConfig;
    const pageSlug = getPageSlug(context, config);
    
    // @ts-ignore - getKv may not be in type definitions yet but exists at runtime
    const kv = await context.getKv();
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const apiPath = url.pathname;

    const pageData = await fetchPageData(baseUrl, pageSlug);
    const pageDataPath = pageSlug.replace(/^\//, '').replace(/\/$/, '');

    const currentHash = await calculateHash(pageData);
    const pageTitle = getPageTitle(pageData, pageSlug);
    const pageLastModified = pageData?.props?.lastModified;

    await updatePageChanges(kv, pageDataPath, currentHash, pageTitle, pageSlug, pageLastModified);
    const records = await getChangeRecords(kv, pageDataPath, currentHash, pageTitle, pageSlug);

    const rssXml = buildRssFeed(pageTitle, pageSlug, baseUrl, apiPath, pageSlug, records);

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
    if (error?.message?.includes('Page not found') || error?.message?.includes('404')) {
      return context.status(404).json({
        error: 'Page not found',
        message: error.message || 'Could not fetch page data',
      });
    }

    if (error?.message?.includes('not in the allowed pages list')) {
      return context.status(400).json({
        error: 'Invalid page',
        message: error.message,
        availablePages: (pagesConfig as PagesConfig).pages.map((p) => p.slug),
      });
    }

    return context.status(500).json({
      error: 'Internal server error',
      message: error?.message || 'Failed to generate RSS feed',
    });
  }
}
