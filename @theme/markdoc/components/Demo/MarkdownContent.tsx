import React, { useMemo } from 'react';
import markdoc from '@markdoc/markdoc';

import { Markdown } from '@redocly/theme/components/Markdown/Markdown';
import {
  components as builtInComponents,
  tags as builtInTags,
} from '@redocly/theme/markdoc/default';

import type { Config, Node, RenderableTreeNode } from '@markdoc/markdoc';

export type MarkdownContentProps = {
  source: string;
  className?: string;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type AnyComponent = React.ComponentType<any>;

const componentMap = builtInComponents as unknown as Record<string, AnyComponent>;

function PassThrough({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

/**
 * Markdoc passes the resolved value straight to createElement, so a tag with no
 * component must fall back to one instead of to undefined.
 */
function resolveComponent(name: string): AnyComponent {
  return componentMap[name] ?? PassThrough;
}

/** Markdoc renders a capitalized name as a component, and a lowercase one as an HTML element. */
function isComponentTag(node: RenderableTreeNode): boolean {
  return (
    markdoc.Tag.isTag(node) && typeof node.name === 'string' && node.name[0] === node.name[0].toUpperCase()
  );
}

const nodes = {
  // The default document node wraps the output in an <article> element.
  document: {},
  paragraph: {
    // A component inside a <p> renders a block element, which the browser moves out
    // of the paragraph. React then rewrites the tree on every keystroke and throws
    // "Maximum update depth exceeded", so drop the <p> around such content.
    transform(node: Node, config: Config) {
      const children = node.transformChildren(config);

      return children.some(isComponentTag) ? children : new markdoc.Tag('p', {}, children);
    },
  },
};

export function MarkdownContent({ source, className }: MarkdownContentProps) {
  const rendered = useMemo(() => {
    try {
      const content = markdoc.transform(markdoc.parse(source), {
        tags: builtInTags,
        nodes,
      }) as RenderableTreeNode;

      return markdoc.renderers.react(content, React, { components: resolveComponent });
    } catch {
      // Keep the text readable while it is half-typed.
      return source;
    }
  }, [source]);

  return (
    <Markdown as="div" compact className={className}>
      {rendered}
    </Markdown>
  );
}
