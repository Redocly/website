import { CHANGE_TYPE } from '../../changelog.page';

export interface ChangelogEntry {
  timestamp: number;
  changes: Record<CHANGE_TYPE, string[]>;
  dependencies: Record<string, string>;
}

interface ProcessedChanges {
  features: string[];
  fixes: string[];
}

const START_OF_NEXT_RELEASES = 1738913622000;

export function processChanges(record: ChangelogEntry): ProcessedChanges {
  const features = [...record.changes.minor];
  const fixes = [];

  for (const change of record.changes.patch) {
    if (
      change.startsWith('Enter prerelease mode') ||
      change.startsWith('Updated version of the') ||
      change.startsWith('Bump')
    ) {
      continue;
    }

    // After we started next releases, categorization of changes is better, so each patch is a fix
    if (record.timestamp > START_OF_NEXT_RELEASES) {
      fixes.push(change);
      continue;
    }

    // before next releases, the changes were not always correctly categorized, some fixes were marked as minor changes
    if (change.startsWith('Resolved') || change.startsWith('Fixed')) {
      fixes.push(change);
    } else {
      features.push(change);
    }
  }

  return {
    features,
    fixes,
  };
}

export function hasChanges(record: ChangelogEntry): boolean {
  const { features, fixes } = processChanges(record);
  return features.length > 0 || fixes.length > 0;
}
