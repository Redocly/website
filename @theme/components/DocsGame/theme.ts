/**
 * Design tokens for the mini-game. They are CSS custom properties so a site can
 * re-skin the game from `@theme/styles.css` without touching components:
 *
 *   :root { --docs-game-accent: #0044d4; --docs-game-radius: 16px; }
 *
 * Defaults fall back to Redocly theme variables (`--color-primary-main`, `--layer-color`, …).
 */
export const t = {
  accent: 'var(--docs-game-accent, var(--color-primary-base, var(--color-primary-main, #0044d4)))',
  accentHover: 'var(--docs-game-accent-hover, var(--button-bg-color-primary-hover, var(--color-primary-hover, #0037ad)))',
  accentSoft: 'var(--docs-game-accent-soft, color-mix(in srgb, var(--docs-game-accent, var(--color-primary-base, var(--color-primary-main, #0044d4))) 10%, transparent))',
  accent2: 'var(--docs-game-accent-2, var(--color-accent-main, #fe6d41))',
  success: 'var(--docs-game-success, var(--color-success-base, #16a34a))',
  error: 'var(--docs-game-error, var(--color-error-base, #dc2626))',
  surface: 'var(--docs-game-surface, var(--layer-color, var(--bg-color, #fff)))',
  surfaceRaised: 'var(--docs-game-surface-raised, var(--bg-color, #fff))',
  border: 'var(--docs-game-border, var(--border-color-secondary, #e5e7eb))',
  text: 'var(--docs-game-text, var(--text-color-primary, #1c1c1c))',
  textMuted: 'var(--docs-game-text-muted, var(--text-color-secondary, #686773))',
  onAccent: 'var(--docs-game-on-accent, #fff)',
  radius: 'var(--docs-game-radius, var(--border-radius-lg, 12px))',
  radiusSm: 'var(--docs-game-radius-sm, var(--border-radius-md, 8px))',
  /* Buttons follow Realm's button variables so they look like every other button in the docs */
  buttonRadius: 'var(--button-border-radius, var(--border-radius-md, 8px))',
  buttonPadding: 'var(--spacing-xs, 8px) var(--spacing-md, 16px)',
  buttonFontSize: 'var(--font-size-base, 14px)',
  buttonFontWeight: 'var(--font-weight-medium, 500)',
  buttonSecondaryBg: 'var(--button-bg-color-secondary, var(--color-warm-grey-2, #f3f3f6))',
  buttonSecondaryBgHover: 'var(--button-bg-color-secondary-hover, var(--color-warm-grey-3, #ededf2))',
  buttonSecondaryText: 'var(--button-color-secondary, var(--text-color-primary, #1c1c1c))',
  shadow: 'var(--docs-game-shadow, 0 8px 24px rgba(0, 0, 0, 0.08))',
  fontHeading: "var(--docs-game-font-heading, 'Red Hat Display', var(--font-family-base, inherit))",
  fontBase: 'var(--docs-game-font, var(--font-family-base, inherit))',
  green: 'var(--docs-game-golf-green, #4caf50)',
  greenDark: 'var(--docs-game-golf-green-dark, #388e3c)',
  water: 'var(--docs-game-golf-water, #64b5f6)',
  sand: 'var(--docs-game-golf-sand, #f5deb3)',
} as const;

export const focusRing = `
  &:focus-visible {
    outline: 2px solid ${t.accent};
    outline-offset: 2px;
  }
`;
