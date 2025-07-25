import { useCallback, useRef, useState } from 'react';

type UseTabsProps = {
  initialTab: string;
  totalTabs: number;
};

export function useTabs({ initialTab, totalTabs }: UseTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setTabRef = useCallback((element: HTMLButtonElement | null, index: number) => {
    tabRefs.current[index] = element;
  }, []);

  const focusTab = (index: number) => {
    const currentElement = tabRefs.current[index];
    if (currentElement) {
      currentElement.focus();
    }
  };

  const onTabSelect = useCallback((index: number) => {
    focusTab(index);
    const label = tabRefs.current[index]?.getAttribute('data-label');
    if (label) setActiveTab(label);
  }, []);

  const onTabClick = useCallback((label: string) => {
    setActiveTab(label);
    const tabIndex = tabRefs.current.findIndex((ref) => ref?.getAttribute('data-label') === label);
    focusTab(tabIndex);
  }, []);

  const handleKeyboard = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      let newIndex = index;
      if (event.key === 'ArrowRight') {
        newIndex = (index + 1) % totalTabs;
      } else if (event.key === 'ArrowLeft') {
        newIndex = (index - 1 + totalTabs) % totalTabs;
      } else if (event.key === 'Home') {
        event.preventDefault();
        newIndex = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        newIndex = totalTabs - 1;
      } else {
        return;
      }
      onTabSelect(newIndex);
    },
    [totalTabs, onTabSelect],
  );

  return { activeTab, setActiveTab, setTabRef, onTabClick, handleKeyboard };
}