import * as React from 'react';
import MarkdownTemplate from '@redocly/theme/core/templates/Markdown';
import { GameBanner, GameOverlay, GameConfigContext, mergeGameConfig, gameActions } from '../components/DocsGame';
import type { GameConfig } from '../components/DocsGame';

/**
 * Default docs template + the optional mini-game layer.
 *
 * Applied to `docs/realm/**` via `markdown.template` in redocly.yaml.
 * Pages that don't use any `gameStep` tag render exactly like the default template.
 *
 * Per-page customization goes in front matter:
 *   game: false                 -> opt out
 *   game: { title, cta, ... }   -> override any field of `GameConfig`
 */
export default function DocsWithGame(props: {
  pageProps: any;
  children: React.ReactNode;
  /** Optional site-wide overrides (when composing this template from another one) */
  config?: Partial<GameConfig>;
}) {
  const { pageProps, children } = props;
  const tagList: string[] = pageProps?.metadata?.markdoc?.tagList ?? [];
  const fmGame = pageProps?.frontmatter?.game;
  const enabled = tagList.includes('gameStep') && fmGame !== false;

  const config = React.useMemo(
    () => mergeGameConfig({ ...(props.config ?? {}), ...(typeof fmGame === 'object' ? fmGame : {}) }),
    [props.config, fmGame],
  );

  React.useEffect(() => {
    gameActions.setPersistence(config.persistProgress);
  }, [config.persistProgress]);

  if (!enabled) {
    return <MarkdownTemplate pageProps={pageProps}>{children}</MarkdownTemplate>;
  }

  return (
    <GameConfigContext.Provider value={config}>
      <MarkdownTemplate pageProps={pageProps}>
        <GameBanner />
        {children}
      </MarkdownTemplate>
      <GameOverlay />
    </GameConfigContext.Provider>
  );
}
