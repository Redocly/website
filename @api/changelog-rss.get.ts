import type { ApiFunctionsContext } from '@redocly/config';
// @ts-ignore
import changelogData from '../docs/realm/changelogs.yaml';
import { hasChanges, type ChangelogEntry, processChanges } from '../docs/realm/@theme/_utils/changelog';

type ChangelogData = Record<string, Record<string, ChangelogEntry>>;

const SHORT_NAMES = {
  '@redocly/realm': 'Realm',
  '@redocly/reef': 'Reef',
  '@redocly/revel': 'Revel',
  '@redocly/redoc': 'Redoc',
  reunite: 'Reunite',
};

interface ChangelogWithDeps {
  record: ChangelogEntry;
  packageName: string;
  version: string;
}

function isNextVersion(version: string): boolean {
  return version.includes('-next');
}

function resolveDepsDeep(
  entry: ChangelogEntry,
  changelogs: ChangelogData,
  seen: string[] = []
): ChangelogEntry {
  const resolved = { ...entry };
  resolved.changes = { ...entry.changes };

  if (Object.keys(entry?.dependencies || []).length > 0) {
    for (const [depPackage, depVersion] of Object.entries(entry.dependencies)) {
      if (seen.includes(depPackage)) {
        continue;
      }

      const normPackage = depPackage === '@redocly/portal' ? '@redocly/realm' : depPackage;
      const depEntry = changelogs[normPackage]?.[depVersion];

      // If timestamp is different, it means the dependency was updated in a previous release, so no need to include it again
      if (!depEntry || depEntry.timestamp !== entry.timestamp) continue;

      const resolvedDep = resolveDepsDeep(depEntry, changelogs, [...seen, depPackage]);

      resolved.changes.minor = resolved.changes.minor.concat(resolvedDep.changes.minor);
      resolved.changes.patch = resolved.changes.patch.concat(resolvedDep.changes.patch);
    }
  }
  resolved.changes.minor = Array.from(new Set(resolved.changes.minor));
  resolved.changes.patch = Array.from(new Set(resolved.changes.patch));
  return resolved;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(timestamp: number): string {
  return new Date(timestamp).toUTCString();
}

function buildRssItem(item: ChangelogWithDeps, baseUrl: string): string {
  const { features, fixes } = processChanges(item.record);
  const packageName = SHORT_NAMES[item.packageName] || item.packageName;
  const title = `${packageName} ${item.version}`;
  const link = `${baseUrl}#${packageName}@${item.version}`;
  const pubDate = formatRssDate(item.record.timestamp);
  
  let description = `<h3>${escapeXml(packageName)} ${escapeXml(item.version)}</h3>`;
  description += `<p><strong>Release Date:</strong> ${new Date(item.record.timestamp).toISOString().split('T')[0]}</p>`;
  
  if (features.length > 0) {
    description += '<h4>Features:</h4><ul>';
    features.forEach(feature => {
      description += `<li>${escapeXml(feature)}</li>`;
    });
    description += '</ul>';
  }
  
  if (fixes.length > 0) {
    description += '<h4>Fixes:</h4><ul>';
    fixes.forEach(fix => {
      description += `<li>${escapeXml(fix)}</li>`;
    });
    description += '</ul>';
  }
  
  // Use CDATA for description to allow HTML content
  return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>
  `;
}

export default async function changelogRssHandler(
  request: Request,
  context: ApiFunctionsContext
) {  
  try {
    const changelogs = changelogData as ChangelogData;
    
    const url = new URL(request.url);
    
    const changelogPath = url.pathname.replace(/\/api\/changelog-rss$/, '/docs/realm/changelog');
    const baseUrl = `${url.protocol}//${url.host}${changelogPath}`;
    
    const resolved: ChangelogWithDeps[] = [];
    
    for (const packageName of Object.keys(changelogs)) {
      const records = Object.entries(changelogs[packageName]);
      const sortedRecords = records.sort((a, b) => b[1].timestamp - a[1].timestamp);
      
      for (const [version, record] of sortedRecords) {
        const isNextVersionChangelog = isNextVersion(version);
        const resolvedRecord = resolveDepsDeep(record, changelogs);
        
        if (!hasChanges(resolvedRecord)) continue;
        
        if (!isNextVersionChangelog) {
          resolved.push({
            record: resolvedRecord,
            packageName,
            version,
          });
        }
      }
    }
    
    const sortedItems = resolved
      .sort((a, b) => b.record.timestamp - a.record.timestamp)
      .slice(0, 50);
    
    const rssItems = sortedItems.map(item => buildRssItem(item, baseUrl)).join('');
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Redocly Changelog</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>Latest changes and updates to Redocly products (Realm, Reef, Revel, Redoc, Reunite)</description>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(Date.now())}</lastBuildDate>
    <atom:link href="${escapeXml(request.url)}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
    
    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('[RSS Feed] Error generating RSS feed:', error);
    console.error('[RSS Feed] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return context.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate RSS feed',
    });
  }
}

