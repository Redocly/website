import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import { Button } from '@redocly/theme/components/Button/Button';
import { CodeBlock } from '@redocly/theme/components/CodeBlock/CodeBlock';
import { CodeIcon } from '@redocly/theme/icons/CodeIcon/CodeIcon';

import {
  components as builtInComponents,
  tags as builtInTags,
} from '@redocly/theme/markdoc/default';

import { AttributeControl } from './AttributeControl';
import { MarkdownContent } from './MarkdownContent';
import {
  getActiveValues,
  getInsertIndex,
  getInitialGroupState,
  getInitialValues,
  parseProperties,
  toTagProps,
} from './properties';
import { buildTagSource } from './tag-source';

import type { AttributeDescriptor, AttributeValue } from './properties';

export type DemoProps = {
  tag: string;
  properties?: unknown;
  /** "horizontal" puts the form beside the preview, "vertical" under it. */
  layout?: 'horizontal' | 'vertical';
  initialChildren?: string;
  children?: React.ReactNode;
  className?: string;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type AnyComponent = React.ComponentType<any>;

export function Demo({
                       tag,
                       properties,
                       layout = 'horizontal',
                       initialChildren,
                       children,
                       className,
                     }: DemoProps) {
  const isStacked = layout === 'vertical';
  const { groups, descriptors, content, separators } = useMemo(
    () => parseProperties(properties),
    [properties],
  );
  const [values, setValues] = useState<Record<string, AttributeValue>>(() =>
    getInitialValues(descriptors),
  );
  const [groupState, setGroupState] = useState<Record<string, boolean>>(() =>
    getInitialGroupState(groups),
  );
  const [childrenText, setChildrenText] = useState(initialChildren ?? '');
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const schema = builtInTags[tag];
  const renderName = typeof schema?.render === 'string' ? schema.render : undefined;
  const Component = renderName
    ? (builtInComponents as unknown as Record<string, AnyComponent>)[renderName]
    : undefined;

  if (!Component) {
    return (
      <DemoWrapper data-component-name="Demo/Demo" className={className}>
        <Error>
          Unknown Markdoc tag <code>{tag}</code>. Use one of the built-in tags, such as{' '}
          <code>admonition</code> or <code>accordion</code>.
        </Error>
      </DemoWrapper>
    );
  }

  const tagProps = toTagProps(getActiveValues(values, descriptors, groupState));
  const controls = Object.entries(descriptors);
  const groupNames = new Set(groups.map((group) => group.name));
  // A hidden attribute keeps its value, so it leaves the form but not the tag.
  const shownControls = controls.filter(([, descriptor]) => !descriptor.hidden);
  // Loose attributes come first, then a section for each group, as in the design.
  const looseControls = shownControls.filter(
    ([, descriptor]) => !descriptor.group || !groupNames.has(descriptor.group),
  );
  const groupSections = groups
    .map((group) => ({
      group,
      fields: shownControls.filter(([, descriptor]) => descriptor.group === group.name),
    }))
    // Keep a group that only hosts the content field.
    .filter(({ group, fields }) => fields.length > 0 || content?.group === group.name);
  // The body only gets a form field when the properties describe "content".
  const editsChildren = content !== undefined;
  const source = buildTagSource({
    tag,
    attributes: tagProps,
    body: editsChildren ? childrenText : initialChildren,
    selfClosing: schema.selfClosing,
  });
  const contentField = content && (
    <AttributeControl
      key="content"
      name="content"
      label="Content"
      descriptor={{
        type: 'text',
        description: content.description,
        required: content.required,
      }}
      value={childrenText}
      onChange={(value) => setChildrenText(value === undefined ? '' : String(value))}
    />
  );

  /** Lays out the fields of one scope, with the content field and any lines in place. */
  function renderFields(entries: [string, AttributeDescriptor][], groupName?: string) {
    const names = entries.map(([name]) => name);
    const contentIndex =
      contentField && content?.group === groupName
        ? getInsertIndex(names, content.location)
        : -1;
    // A set, so two lines asking for the same place never stack.
    const lineIndexes = new Set(
      separators
        .filter((separator) => separator.group === groupName)
        .map((separator) => getInsertIndex(names, separator.location)),
    );

    const nodes: React.ReactNode[] = [];

    for (let index = 0; index <= entries.length; index++) {
      if (contentIndex === index) {
        nodes.push(contentField);
      }

      // Skipped while nothing precedes it, so no line starts the scope.
      if (lineIndexes.has(index) && nodes.length > 0) {
        nodes.push(<FieldSeparator key={`separator-${index}`} />);
      }

      if (index < entries.length) {
        const [name, descriptor] = entries[index];

        nodes.push(
          <AttributeControl
            key={name}
            name={name}
            descriptor={descriptor}
            value={values[name]}
            onChange={(value) => setValues((current) => ({ ...current, [name]: value }))}
          />,
        );
      }
    }

    return nodes;
  }

  return (
    <DemoWrapper data-component-name="Demo/Demo" className={className}>
      {isCodeVisible && (
        <CodeBlock lang="markdoc" source={source} header={{ controls: { copy: {} } }} />
      )}
      <Layout $stacked={isStacked}>
        <PreviewColumn>
          <Button
            variant="ghost"
            size="small"
            icon={<CodeIcon width="16" height="16" color="--icon-color-secondary" />}
            aria-expanded={isCodeVisible}
            onClick={() => setIsCodeVisible((visible) => !visible)}
          >
            {isCodeVisible ? 'Hide code' : 'Show code' }
          </Button>
          <Preview>
            {schema.selfClosing ? (
              <Component {...tagProps} />
            ) : (
              <Component {...tagProps}>
                {editsChildren ? <MarkdownContent source={childrenText} /> : children}
              </Component>
            )}
          </Preview>
        </PreviewColumn>
        {(shownControls.length > 0 || editsChildren) && (
          <Controls $stacked={isStacked}>
            {renderFields(looseControls)}
            {groupSections.map(({ group, fields }) => (
              <GroupSection key={group.name}>
                <AttributeControl
                  name={group.name}
                  label={group.label ?? `Show ${group.name}`}
                  descriptor={{ type: 'boolean' }}
                  value={groupState[group.name]}
                  onChange={(value) =>
                    setGroupState((current) => ({ ...current, [group.name]: Boolean(value) }))
                  }
                />
                {groupState[group.name] && (
                  <GroupPanel>{renderFields(fields, group.name)}</GroupPanel>
                )}
              </GroupSection>
            ))}
          </Controls>
        )}
      </Layout>
    </DemoWrapper>
  );
}

const DemoWrapper = styled.div`
    --demo-control-height: 32px;

    container: demo / inline-size;
    margin: var(--spacing-md) 0;
`;

const Layout = styled.div<{ $stacked: boolean }>`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);

    /* The docs content column has a capped width, so the panel rather than the
       viewport decides whether the form fits beside the preview. */
    ${({ $stacked }) =>
            !$stacked &&
            css`
                @container demo (min-width: 640px) {
                    flex-direction: row;
                    align-items: flex-start;
                }
            `}
`;

const PreviewColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
    flex: 1 1 auto;
    min-width: 0;

    > *:not(button) {
        width: 100%;
    }
`;

const Preview = styled.div`
    display: grid;
    > *:first-child {
        margin-top: 0;
    }

    > *:last-child {
        margin-bottom: 0;
    }
`;

const FieldSeparator = styled.div`
  border-top: 1px solid var(--border-color-secondary);
  margin: var(--spacing-sm) 0 var(--spacing-xs);
`;

const GroupSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    &:not(:last-child) {
        /* Separates the section from what comes before it, as the design's divider does. */
        padding-bottom: var(--spacing-sm);
        border-bottom: 1px solid var(--border-color-secondary);
    }
`;

const GroupPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing-unit) * 4);
    padding: calc(var(--spacing-unit) * 3.5);
    border-radius: var(--border-radius-lg);
    background-color: var(--layer-color);
`;

const Controls = styled.div<{ $stacked: boolean }>`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    width: 100%;
    padding: var(--spacing-lg);
    border: 1px solid var(--border-color-secondary);
    border-radius:  calc(var(--border-radius) * 6); // var(--card-border-radius);
    background-color: var(--bg-color);

    /* Stacked keeps the panel full width, so it never sits in a 360px column. */
    ${({ $stacked }) =>
            !$stacked &&
            css`
                @container demo (min-width: 640px) {
                    flex: 0 0 360px;
                    width: 360px;
                    margin-top: var(--spacing-xl);
                }
            `}
`;

const Error = styled.p`
    color: var(--color-red-6, #d64545);
    margin: 0;
`;
