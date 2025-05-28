// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import { findAll } from 'highlight-words-core';

export const HighlightContext = React.createContext<string[]>([]);

export function Highlight(props: React.PropsWithChildren): JSX.Element | null {
  const { children } = props;
  const searchWords = React.useContext(HighlightContext);

  if (!searchWords.length) {
    return children ? <>{children}</> : null;
  }

  function highlight(str: string, childIdx: number = 0) {
    const chunks = findAll({
      searchWords,
      textToHighlight: str,
    });

    return (
      <React.Fragment key={childIdx}>
        {chunks.map((chunk, idx) => {
          const { end, highlight, start } = chunk;
          const text = str.substr(start, end - start);
          if (highlight) {
            return <mark key={idx}>{text}</mark>;
          } else {
            return text;
          }
        })}
      </React.Fragment>
    );
  }

  if (typeof children === 'string') {
    return highlight(children);
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, idx) =>
          typeof children === 'string'
            ? highlight(child, idx)
            : <Highlight key={idx}>{child}</Highlight> || null,
        )}
      </>
    );
  } else {
    return children.props?.children
      ? React.cloneElement(children, {
          children: <Highlight>{children.props.children}</Highlight>,
        })
      : children;
  }
}
