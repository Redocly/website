import React from 'react';
import styled from 'styled-components';

import { Tab } from '@redocly/theme/markdoc/components/Tabs/Tab';
// @chunk {"steps": ["replace-useTabs-hook-import"]}
import { useTabs } from './useTabs';
// @chunk-end

type Child = { props: { label: string } & TabsProps };
// @chunk {"steps": ["extend-TabsProps-interface"]}
type TabsProps = React.PropsWithChildren<{
  children: Child[];
  className?: string;
  syncId?: string;
}>;
// @chunk-end

// @chunk {"steps": ["add-syncId-prop"]}
export function Tabs({ children, className, syncId }: TabsProps): JSX.Element {
// @chunk-end
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];

  const initialTab = childrenArray[0]?.props.label ?? '';
  // @chunk {"steps": ["pass-syncId-to-useTabs-hook"]}
  const { activeTab, setTabRef, onTabClick, handleKeyboard, getTabId } = useTabs({
    initialTab,
    totalTabs: childrenArray.length,
    syncId
  });
  // @chunk-end

  return (
    <TabsContainer data-component-name="Markdoc/Tabs/Tabs" className={className}>
      <TabList role="tablist">
        {childrenArray.map((child, index) => {
          const { label, onClick } = child.props;
          const tabId = getTabId(label, index);
          return (
            <Tab
              key={`key-${tabId}`}
              tabId={tabId}
              label={label}
              isActive={activeTab === label}
              setRef={(el: HTMLButtonElement | null) => setTabRef(el, index)}
              onKeyDown={(event) => handleKeyboard(event, index)}
              onClick={() => {
                onTabClick(label);
                onClick?.();
              }}
            />
          );
        })}
      </TabList>
      {childrenArray.map((child, index) => {
        const { label } = child.props;
        const tabId = getTabId(label, index);
        return label === activeTab ? (
          <TabContent
            key={`content-${tabId}`}
            id={`panel-${tabId}`}
            aria-labelledby={`tab-${tabId}`}
            tabIndex={0}
            role="tabpanel"
          >
            {child.props.children}
          </TabContent>
        ) : null;
      })}
    </TabsContainer>
  );
}

const TabsContainer = styled.div`
  color: var(--md-tabs-container-text-color);
  font-size: var(--md-tabs-container-font-size);
  font-family: var(--md-tabs-container-font-family);
  font-style: var(--md-tabs-container-font-style);
  font-weight: var(--md-tabs-container-font-weight);
  background-color: var(--md-tabs-container-bg-color);
  margin: var(--md-tabs-container-margin);
  padding: var(--md-tabs-container-padding);
  border: var(--md-tabs-container-border);

  ol[class^='Tabs__TabList'] {
    margin: 0;
    padding: 0;
  }
`;

export const TabList = styled.ul`
  && {
    padding: var(--md-tabs-padding);
    margin-block-end: 0;
    border: var(--md-tabs-border);
    border-width: var(--md-tabs-border-width);
    margin: 0;

    & > li:first-child {
      margin-bottom: 0px;
    }

    li[class^='Tab__TabItem'] {
      margin: var(--md-tabs-tab-margin);
    }
  }
`;

export const TabContent = styled.div`
  color: var(--md-tabs-content-text-color);
  font-size: var(--md-tabs-content-font-size);
  font-family: var(--md-tabs-content-font-family);
  font-style: var(--md-tabs-content-font-style);
  font-weight: var(--md-tabs-content-font-weight);
  background-color: var(--md-tabs-content-bg-color);
  margin: var(--md-tabs-content-margin);
  padding: var(--md-tabs-content-padding);
  border: var(--md-tabs-content-border);
`;
