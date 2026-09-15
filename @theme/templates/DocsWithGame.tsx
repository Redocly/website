import * as React from 'react';
import MarkdownTemplate from '@redocly/theme/core/templates/Markdown';
import { GameConfigContext, mergeGameConfig, type GameConfig } from '../components/DocsGame/config';
import { gameActions } from '../components/DocsGame/store';

/**
 * Default docs template + the optional mini-game layer.
 *
 * Applied to `docs/realm/**` via `markdown.template` in redocly.yaml.
 * Pages that don't use any `gameStep` tag render exactly like the default template.
 *
 * The template for every page under `docs/realm/**`, so keep its static imports to the
 * config and the store; the launcher (and behind it the artwork) loads lazily.
 *
 * Per-page customization goes in front matter:
 *   game: false                 -> opt out
 *   game: { title, cta, ... }   -> override any field of `GameConfig`
 */
const GameBanner = React.lazy(() =>
  import('../components/DocsGame/GameLauncher').then((m) => ({ default: m.GameBanner })),
);
const GameOverlay = React.lazy(() =>
  import('../components/DocsGame/GameLauncher').then((m) => ({ default: m.GameOverlay })),
);

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
    if (!enabled) return;
    gameActions.setPersistence(config.persistProgress);
  }, [enabled, config.persistProgress]);

  if (!enabled) {
    return <MarkdownTemplate pageProps={pageProps}>{children}</MarkdownTemplate>;
  }

  return (
    <GameConfigContext.Provider value={config}>
      <MarkdownTemplate pageProps={pageProps}>
        <React.Suspense fallback={null}>
          <GameBanner />
        </React.Suspense>
        {children}
      </MarkdownTemplate>
      <React.Suspense fallback={null}>
        <GameOverlay />
      </React.Suspense>
    </GameConfigContext.Provider>
  );
}
