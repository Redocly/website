import type { ApiFunctionsContext } from '@redocly/config';
// @ts-ignore
import changelogData from '../../../docs/realm/changelogs.yaml';
import { hasChanges, type ChangelogEntry, processChanges } from '../../../docs/realm/@theme/_utils/changelog';

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
  const releaseId = `${packageName}@${item.version}`;
  const guidUrl = `${baseUrl}#${releaseId}`;
  const pubDate = formatRssDate(item.record.timestamp);
  const isoReleaseDate = new Date(item.record.timestamp).toISOString().split('T')[0];
  const featureCount = features.length;
  const fixCount = fixes.length;
  const summary = `New release: ${item.packageName}@${item.version} · Date: ${isoReleaseDate} · ${featureCount} ${featureCount === 1 ? 'feature' : 'features'} · ${fixCount} ${fixCount === 1 ? 'fix' : 'fixes'}`;

  let description = '';
  description += `<p style="margin:0 0 12px;"><strong>${escapeXml(summary)}</strong></p>`;

  if (features.length > 0) {
    description += `<p style="margin:0 0 6px;"><strong>Features:</strong></p>`;
    description += '<ul style="margin:0 0 12px 18px; padding:0; list-style:disc;">';
    features.forEach((feature) => {
      description += `<li style="margin:0 0 4px; list-style-position:inside;">${escapeXml(feature)}</li>`;
    });
    description += '</ul>';
  }

  if (fixes.length > 0) {
    description += `<p style="margin:0 0 6px;"><strong>Fixes:</strong></p>`;
    description += '<ul style="margin:0 0 12px 18px; padding:0; list-style:disc;">';
    fixes.forEach((fix) => {
      description += `<li style="margin:0 0 4px; list-style-position:inside;">${escapeXml(fix)}</li>`;
    });
    description += '</ul>';
  }

  // Use CDATA for description to allow HTML content
  return `
    <item>
      <title>${escapeXml(title)}</title>
      <guid isPermaLink="false">${escapeXml(guidUrl)}</guid>
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
    
    // Parse query parameters
    const productsParam = url.searchParams.get('products');
    const includeRc = url.searchParams.get('include-rc') === 'true';
    
    // Map short names to package names
    const shortNameToPackage: Record<string, string> = {
      'Realm': '@redocly/realm',
      'Reef': '@redocly/reef',
      'Revel': '@redocly/revel',
      'Redoc': '@redocly/redoc',
      'Reunite': 'reunite',
    };
    
    // Convert product short names to package names
    // products is a comma-separated string like "Realm,Reunite"
    const selectedPackages = productsParam
      ? productsParam.split(',').map(p => shortNameToPackage[p.trim()] || p.trim()).filter(Boolean)
      : Object.keys(changelogs); // Default to all packages if none specified
    
    const changelogPath = url.pathname.replace(/\/api\/changelog-rss$/, '/docs/realm/changelog');
    const baseUrl = `${url.protocol}//${url.host}${changelogPath}`;
    
    const resolved: ChangelogWithDeps[] = [];
    
    // Filter by selected packages
    const packagesToProcess = Object.keys(changelogs).filter(pkg => 
      selectedPackages.includes(pkg)
    );
    
    for (const packageName of packagesToProcess) {
      const records = Object.entries(changelogs[packageName]);
      const sortedRecords = records.sort((a, b) => b[1].timestamp - a[1].timestamp);
      
      for (const [version, record] of sortedRecords) {
        const isNextVersionChangelog = isNextVersion(version);
        const resolvedRecord = resolveDepsDeep(record, changelogs);
        
        if (!hasChanges(resolvedRecord)) continue;
        
        // Include next versions if include-rc flag is set
        if (isNextVersionChangelog && !includeRc) {
          continue;
        }
        
        if (!isNextVersionChangelog || includeRc) {
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

