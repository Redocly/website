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