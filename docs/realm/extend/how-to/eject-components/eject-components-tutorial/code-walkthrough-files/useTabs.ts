// @chunk {"steps": ["implement-useTabs-hook"]}
import { useEffect } from 'react';
// https://www.npmjs.com/package/@redocly/theme?activeTab=code
import { useTabs as useOriginalTabs } from '@redocly/theme/core/hooks';

type UseTabsProps = {
  initialTab: string;
  totalTabs: number;
  syncId?: string;
};

export function useTabs({ initialTab, totalTabs, syncId }: UseTabsProps) {
  const localStorageKey = `tabState-${syncId}`;

  // Use the original useTabs hook to handle the basic tab functionality
  const { activeTab, setActiveTab, ...rest } = useOriginalTabs({
    // Sync the tab state on initial mount
    initialTab: window.localStorage.getItem(localStorageKey) || initialTab,
    totalTabs,
  });

  // Sync the tab state to localStorage whenever activeTab changes
  useEffect(() => {
    if (syncId && activeTab) {
      window.localStorage.setItem(localStorageKey, activeTab);

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: localStorageKey,
          newValue: activeTab,
        }),
      );
    }
  }, [syncId, activeTab]);

  // Listen to storage events and update the active tab
  useEffect(() => {
    if (syncId) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === localStorageKey && event.newValue) {
          setActiveTab(event.newValue);
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [syncId, setActiveTab]);

  return { activeTab, setActiveTab, ...rest };
}
// @chunk-end
