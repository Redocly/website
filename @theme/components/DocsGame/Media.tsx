import * as React from 'react';
import styled from 'styled-components';
import type { GameMedia } from './store';
import { t } from './theme';

const Figure = styled.figure`
  margin: 12px 0 0;

  & img,
  & video {
    display: block;
    max-width: 100%;
    border-radius: ${t.radiusSm};
    border: 1px solid ${t.border};
  }
  & figcaption {
    margin-top: 6px;
    font-size: 12px;
    color: ${t.textMuted};
  }
`;

export function MediaList({ items }: { items: GameMedia[] }) {
  if (items.length === 0) return null;
  return (
    <>
      {items.map((m) => (
        <Figure key={m.id}>
          {m.kind === 'video' ? (
            <video
              src={m.src}
              poster={m.poster}
              autoPlay={m.autoplay}
              loop={m.loop}
              muted={m.autoplay}
              playsInline
              controls={!m.autoplay}
              preload="metadata"
            />
          ) : (
            <img src={m.src} alt={m.alt ?? ''} loading="lazy" />
          )}
          {m.caption && <figcaption>{m.caption}</figcaption>}
        </Figure>
      ))}
    </>
  );
}
