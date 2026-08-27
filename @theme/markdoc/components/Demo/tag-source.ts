import type { AttributeValue } from './properties';

/** Wrap the attributes onto their own lines past this width. */
const MAX_OPEN_TAG_LENGTH = 72;

export type TagSourceInput = {
  tag: string;
  attributes: Record<string, AttributeValue>;
  body?: string;
  selfClosing?: boolean;
};

/** Builds the Markdoc source that reproduces the current preview. */
export function buildTagSource({ tag, attributes, body, selfClosing }: TagSourceInput): string {
  const pairs = Object.entries(attributes).map(([name, value]) => `${name}=${formatValue(value)}`);
  const closing = selfClosing ? '/%}' : '%}';
  const singleLine = [`{%`, tag, ...pairs, closing].join(' ');

  const wrapped = pairs.map(
    (pair, index) => `   ${pair}${index === pairs.length - 1 ? ` ${closing}` : ''}`,
  );
  const openTag =
    singleLine.length <= MAX_OPEN_TAG_LENGTH
      ? singleLine
      : [`{% ${tag}`, ...wrapped].join('\n');

  if (selfClosing) {
    return openTag;
  }

  return [openTag, body?.length ? body : '...', `{% /${tag} %}`].join('\n');
}

function formatValue(value: AttributeValue): string {
  if (typeof value !== 'string') {
    return String(value);
  }

  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}
