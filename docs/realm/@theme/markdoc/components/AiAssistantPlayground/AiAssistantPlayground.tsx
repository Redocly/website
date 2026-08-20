import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { CodeBlock } from '@redocly/theme/components/CodeBlock/CodeBlock';
import { NumberedItem } from '@redocly/theme/markdoc/components/NumberedList/NumberedItem';
import { NumberedList } from '@redocly/theme/markdoc/components/NumberedList/NumberedList';

const CDN_SCRIPT_URL = 'https://cdn.redocly.com/ai-assistant/releases/latest/main.js';

/**
 * The published documentation is served from `https://redocly.com`, whose root project answers
 * `_ask-ai`. The path-prefixed variants under `/docs` do not exist, so the preview asks the root
 * endpoint by absolute URL. Production allows its own origin only, so a preview deployment or a
 * local server gets a CORS failure here; pass `apiUrl` to aim the preview at that environment.
 */
const DEFAULT_API_URL = 'https://redocly.com/_ask-ai';

const VARIANTS = ['widget', 'modal', 'panel'] as const;
const THEMES = ['light', 'dark', 'system'] as const;
const SIDES = ['bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;

type Variant = (typeof VARIANTS)[number];
type Theme = (typeof THEMES)[number];
type Side = (typeof SIDES)[number];
type Align = (typeof ALIGNS)[number];

type PlaygroundConfig = {
  variant: Variant;
  theme: Theme;
  side: Side;
  align: Align;
  width: string;
  height: string;
  resizable: boolean;
  headerTitle: string;
  logo: string;
  triggerText: string;
  welcomeMessage: string;
  suggestions: string;
  suggestionsHeading: string;
  placeholder: string;
  disclaimer: string;
};

const DEFAULT_CONFIG: PlaygroundConfig = {
  variant: 'widget',
  theme: 'light',
  side: 'bottom',
  align: 'end',
  width: '',
  height: '',
  resizable: false,
  headerTitle: '',
  logo: '',
  triggerText: '',
  welcomeMessage: 'Welcome to AI Assistant! Feel free to ask me anything. How can I help you?',
  suggestions: 'How do I configure the sidebar?\nHow do I add an OpenAPI description?',
  suggestionsHeading: '',
  placeholder: '',
  disclaimer: '',
};

/** Every attribute the playground writes, so a cleared control removes it from the element. */
const MANAGED_ATTRIBUTES = [
  'variant',
  'theme',
  'side',
  'align',
  'width',
  'height',
  'resizable',
  'header-title',
  'logo',
  'trigger-text',
  'welcome-message',
  'suggestions',
  'suggestions-heading',
  'placeholder',
  'disclaimer',
] as const;

const TABS = ['Layout', 'Branding', 'Content'] as const;
type Tab = (typeof TABS)[number];

type RedoclyAssistantApi = {
  setConfig(config: Record<string, unknown> | null): void;
};

type PreviewWindow = Window & { RedoclyAssistant?: RedoclyAssistantApi };

/** `inline-start` reads as "Inline start" in the controls, while the attribute keeps its own value. */
function formatOption(value: string): string {
  const spaced = value.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function parseSuggestions(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** Attribute name/value pairs for the current config, skipping values equal to the widget's defaults. */
function toAttributes(config: PlaygroundConfig): Array<[string, string]> {
  const suggestions = parseSuggestions(config.suggestions);
  const pairs: Array<[string, string | null]> = [
    ['variant', config.variant === 'widget' ? null : config.variant],
    ['theme', config.theme === 'light' ? null : config.theme],
    ['side', config.side === 'bottom' ? null : config.side],
    ['align', config.align === 'end' ? null : config.align],
    ['width', config.width.trim() || null],
    ['height', config.height.trim() || null],
    ['resizable', config.resizable ? '' : null],
    ['header-title', config.headerTitle.trim() || null],
    ['logo', config.logo.trim() || null],
    ['trigger-text', config.triggerText.trim() || null],
    ['welcome-message', config.welcomeMessage.trim() || null],
    ['suggestions', suggestions.length > 0 ? JSON.stringify(suggestions) : null],
    ['suggestions-heading', config.suggestionsHeading.trim() || null],
    ['placeholder', config.placeholder.trim() || null],
    ['disclaimer', config.disclaimer.trim() || null],
  ];

  return pairs.filter((pair): pair is [string, string] => pair[1] !== null);
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function buildSnippet(config: PlaygroundConfig): string {
  const lines = [
    `<script src="${CDN_SCRIPT_URL}"></script>`,
    '',
    '<redocly-ai-assistant',
    '  api-url="https://your-project.com/_ask-ai"',
  ];

  for (const [name, value] of toAttributes(config)) {
    if (name === 'resizable') {
      lines.push('  resizable');
    } else if (name === 'suggestions') {
      lines.push(`  suggestions='${value.replace(/&/g, '&amp;').replace(/'/g, '&#39;')}'`);
    } else {
      lines.push(`  ${name}="${escapeAttribute(value)}"`);
    }
  }

  lines.push('></redocly-ai-assistant>');

  return lines.join('\n');
}

/**
 * The preview runs in an iframe so the widget's fixed-position launcher, backdrop, and drawer
 * anchor to the stage instead of the documentation page.
 *
 * Three consequences of that isolation are handled by a style injected into the widget's open
 * shadow root. The stage paints its own light and dark grounds, which keeps `theme="system"`
 * honest: it follows the reader's `prefers-color-scheme`. The widget's own `max-width: 768px`
 * rules measure the iframe, not the browser window, so a stage narrower than 768px would
 * otherwise get the full-width mobile panel; the injected rule points the mobile width variables
 * back at the desktop one, on the panel element itself, because a `width` attribute lands there
 * as an inline `--ai-assistant-widget-panel-width` that a host-level rule cannot see. And the
 * conversation input's anti-zoom rule (16px minimum under 672px, for iOS Safari) also measures
 * the iframe; the injected rule restores the desktop font size.
 */
function buildPreviewDocument(askAiUrl: string): string {
  return `<!DOCTYPE html>
<html data-stage-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; height: 100%; }
  body {
    --stage-bg: #f7f8fa;
    --stage-dot: rgba(15, 23, 42, 0.09);
    background-color: var(--stage-bg);
    background-image: radial-gradient(var(--stage-dot) 1px, transparent 1px);
    background-size: 16px 16px;
    transition: background-color 0.2s ease;
  }
  html[data-stage-theme='dark'] body {
    --stage-bg: #14161a;
    --stage-dot: rgba(255, 255, 255, 0.07);
  }
  @media (prefers-color-scheme: dark) {
    html[data-stage-theme='system'] body {
      --stage-bg: #14161a;
      --stage-dot: rgba(255, 255, 255, 0.07);
    }
  }
</style>
<script src="${CDN_SCRIPT_URL}"></script>
</head>
<body>
<redocly-ai-assistant api-url="${escapeAttribute(askAiUrl)}" open></redocly-ai-assistant>
<script>
  (() => {
    const assistant = document.querySelector('redocly-ai-assistant');
    const restoreDesktopLayout = () => {
      if (!assistant.shadowRoot) {
        return false;
      }
      const style = document.createElement('style');
      style.textContent = [
        '@media screen and (max-width: 672px) { input, textarea { font-size: var(--search-ai-conversation-input-font-size, 14px) !important; } }',
        "[data-testid='ai-assistant-panel'] {",
        '  --ai-assistant-widget-panel-width-mobile: var(--ai-assistant-widget-panel-width, 380px);',
        '  --ai-assistant-widget-panel-width-mobile-full: var(--ai-assistant-widget-panel-width, 380px);',
        '}',
      ].join('\\n');
      assistant.shadowRoot.append(style);
      return true;
    };
    if (!restoreDesktopLayout()) {
      const timer = setInterval(() => {
        if (restoreDesktopLayout()) {
          clearInterval(timer);
        }
      }, 50);
    }
  })();
</script>
</body>
</html>`;
}

function SlidersIcon(): React.ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 4.5h8M12.5 4.5H14M2 11.5h1.5M6 11.5h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="11" cy="4.5" r="1.9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="4.75" cy="11.5" r="1.9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SunIcon(): React.ReactElement {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 1.2v1.9M8 12.9v1.9M1.2 8h1.9M12.9 8h1.9M3.2 3.2l1.34 1.34M11.46 11.46l1.34 1.34M12.8 3.2l-1.34 1.34M4.54 11.46 3.2 12.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon(): React.ReactElement {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.4 9.7A5.6 5.6 0 0 1 6.3 2.6a5.6 5.6 0 1 0 7.1 7.1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SystemThemeIcon(): React.ReactElement {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1.7A6.3 6.3 0 0 1 8 14.3z" fill="currentColor" />
    </svg>
  );
}

const THEME_ICONS: Record<Theme, () => React.ReactElement> = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemThemeIcon,
};

type SelectRowProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

function SelectRow<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: SelectRowProps<T>): React.ReactElement {
  return (
    <Row>
      <RowLabel htmlFor={id}>{label}</RowLabel>
      <SelectField>
        <Select id={id} value={value} onChange={(event) => onChange(event.target.value as T)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {formatOption(option)}
            </option>
          ))}
        </Select>
        <Chevron viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M4 6.25 8 10l4-3.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Chevron>
      </SelectField>
    </Row>
  );
}

type TextRowProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  /** Label above a full-width input, for long labels or long values. */
  stacked?: boolean;
  onChange: (value: string) => void;
};

function TextRow({
  id,
  label,
  value,
  placeholder,
  stacked = false,
  onChange,
}: TextRowProps): React.ReactElement {
  const RowWrapper = stacked ? StackedRow : Row;
  return (
    <RowWrapper>
      <RowLabel htmlFor={id}>{label}</RowLabel>
      <TextInput
        id={id}
        value={value}
        placeholder={placeholder}
        $stacked={stacked}
        onChange={(event) => onChange(event.target.value)}
      />
    </RowWrapper>
  );
}

type TextAreaRowProps = {
  id: string;
  label: string;
  value: string;
  rows: number;
  placeholder?: string;
  onChange: (value: string) => void;
};

function TextAreaRow({
  id,
  label,
  value,
  rows,
  placeholder,
  onChange,
}: TextAreaRowProps): React.ReactElement {
  return (
    <StackedRow>
      <RowLabel htmlFor={id}>{label}</RowLabel>
      <TextArea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </StackedRow>
  );
}

export type AiAssistantPlaygroundProps = {
  /** `_ask-ai` endpoint the preview asks. Defaults to the published documentation's own endpoint. */
  apiUrl?: string;
};

export function AiAssistantPlayground({
  apiUrl = DEFAULT_API_URL,
}: AiAssistantPlaygroundProps): React.ReactElement {
  const [config, setConfig] = React.useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [customizeOpen, setCustomizeOpen] = React.useState(true);
  const [tab, setTab] = React.useState<Tab>('Layout');
  const [frameEpoch, setFrameEpoch] = React.useState(0);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const customizeButtonRef = React.useRef<HTMLButtonElement>(null);

  const previewDocument = React.useMemo(() => buildPreviewDocument(apiUrl), [apiUrl]);

  // Attribute changes go straight to the live element. `setConfig({})` makes every instance
  // re-read its attributes, so the preview updates without reloading the frame. The frame's CDN
  // script can still be loading when a change lands (or the frame just reloaded), so the effect
  // retries until the widget API answers instead of dropping the change.
  React.useEffect(() => {
    const apply = (): boolean => {
      const frame = iframeRef.current;
      const previewWindow = frame?.contentWindow as PreviewWindow | null;
      const previewDoc = frame?.contentDocument;
      const element = previewDoc?.querySelector('redocly-ai-assistant');
      if (!previewWindow?.RedoclyAssistant || !previewDoc || !element) {
        return false;
      }

      const attributes = new Map(toAttributes(config));
      for (const name of MANAGED_ATTRIBUTES) {
        const next = attributes.get(name);
        if (next === undefined) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, next);
        }
      }

      previewDoc.documentElement.dataset.stageTheme = config.theme;
      previewWindow.RedoclyAssistant.setConfig({});
      return true;
    };

    if (apply()) {
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (apply() || attempts >= 150) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [config, frameEpoch]);

  React.useEffect(() => {
    if (!customizeOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCustomizeOpen(false);
        customizeButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (popoverRef.current?.contains(target) || customizeButtonRef.current?.contains(target)) {
        return;
      }
      setCustomizeOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [customizeOpen]);

  const update = <K extends keyof PlaygroundConfig>(key: K, value: PlaygroundConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (step === 0) {
      return;
    }
    event.preventDefault();
    const next = TABS[(TABS.indexOf(tab) + step + TABS.length) % TABS.length];
    if (next) {
      setTab(next);
      event.currentTarget.querySelector<HTMLButtonElement>(`#playground-tab-${next}`)?.focus();
    }
  };

  const isDefault = React.useMemo(
    () =>
      (Object.keys(DEFAULT_CONFIG) as Array<keyof PlaygroundConfig>).every(
        (key) => config[key] === DEFAULT_CONFIG[key],
      ),
    [config],
  );

  return (
    <Wrapper data-component-name="AiAssistantPlayground/AiAssistantPlayground">
      <Stage>
        <StageOverlay>
          <OverlayButton
            ref={customizeButtonRef}
            type="button"
            aria-expanded={customizeOpen}
            onClick={() => setCustomizeOpen((open) => !open)}
          >
            <SlidersIcon />
            Customize
          </OverlayButton>
          <ThemeSwitch role="group" aria-label="Preview color scheme">
            {THEMES.map((theme) => {
              const Icon = THEME_ICONS[theme];
              return (
                <ThemeOption
                  key={theme}
                  type="button"
                  title={`${formatOption(theme)} color scheme`}
                  aria-label={`${formatOption(theme)} color scheme`}
                  aria-pressed={config.theme === theme}
                  $selected={config.theme === theme}
                  onClick={() => update('theme', theme)}
                >
                  <Icon />
                </ThemeOption>
              );
            })}
          </ThemeSwitch>
        </StageOverlay>

        {customizeOpen ? (
          <Popover ref={popoverRef} role="dialog" aria-label="Customize the assistant">
            <TabList role="tablist" aria-label="Setting groups" onKeyDown={onTabKeyDown}>
              {TABS.map((name) => (
                <TabButton
                  key={name}
                  type="button"
                  role="tab"
                  id={`playground-tab-${name}`}
                  aria-selected={tab === name}
                  aria-controls={`playground-panel-${name}`}
                  tabIndex={tab === name ? 0 : -1}
                  $selected={tab === name}
                  onClick={() => setTab(name)}
                >
                  {name}
                </TabButton>
              ))}
            </TabList>

            <TabPanel
              role="tabpanel"
              id={`playground-panel-${tab}`}
              aria-labelledby={`playground-tab-${tab}`}
            >
              {tab === 'Layout' ? (
                <>
                  <SelectRow
                    id="playground-variant"
                    label="Variant"
                    value={config.variant}
                    options={VARIANTS}
                    onChange={(value) => update('variant', value)}
                  />
                  <SelectRow
                    id="playground-side"
                    label="Placement"
                    value={config.side}
                    options={SIDES}
                    onChange={(value) => update('side', value)}
                  />
                  <SelectRow
                    id="playground-align"
                    label="Alignment"
                    value={config.align}
                    options={ALIGNS}
                    onChange={(value) => update('align', value)}
                  />
                  <TextRow
                    id="playground-width"
                    label="Width"
                    value={config.width}
                    placeholder="380px"
                    onChange={(value) => update('width', value)}
                  />
                  <TextRow
                    id="playground-height"
                    label="Height"
                    value={config.height}
                    placeholder="640px"
                    onChange={(value) => update('height', value)}
                  />
                  <SwitchRow>
                    <SwitchText>
                      <span>Resizable</span>
                      <SwitchDescription>
                        Readers can drag the panel edge to resize it.
                      </SwitchDescription>
                    </SwitchText>
                    <SwitchInput
                      type="checkbox"
                      checked={config.resizable}
                      onChange={(event) => update('resizable', event.target.checked)}
                    />
                    <SwitchTrack aria-hidden="true" />
                  </SwitchRow>
                </>
              ) : null}

              {tab === 'Branding' ? (
                <>
                  <TextRow
                    id="playground-header-title"
                    label="Header title"
                    value={config.headerTitle}
                    placeholder="AI Assistant"
                    onChange={(value) => update('headerTitle', value)}
                  />
                  <TextRow
                    id="playground-logo"
                    label="Header icon"
                    value={config.logo}
                    placeholder="Emoji or image URL"
                    onChange={(value) => update('logo', value)}
                  />
                  <TextRow
                    id="playground-trigger-text"
                    label="Launcher label"
                    value={config.triggerText}
                    placeholder="Ask AI"
                    onChange={(value) => update('triggerText', value)}
                  />
                </>
              ) : null}

              {tab === 'Content' ? (
                <>
                  <TextAreaRow
                    id="playground-welcome-message"
                    label="Greeting"
                    rows={2}
                    value={config.welcomeMessage}
                    placeholder="Add a greeting shown when the chat opens"
                    onChange={(value) => update('welcomeMessage', value)}
                  />
                  <TextAreaRow
                    id="playground-suggestions"
                    label="Starter questions"
                    rows={3}
                    value={config.suggestions}
                    placeholder={'One question per line, for example:\nHow do I get an API key?'}
                    onChange={(value) => update('suggestions', value)}
                  />
                  <TextRow
                    id="playground-suggestions-heading"
                    label="Starter heading"
                    value={config.suggestionsHeading}
                    placeholder="Suggestions"
                    stacked
                    onChange={(value) => update('suggestionsHeading', value)}
                  />
                  <TextRow
                    id="playground-placeholder"
                    label="Input placeholder"
                    value={config.placeholder}
                    placeholder="Ask a question..."
                    stacked
                    onChange={(value) => update('placeholder', value)}
                  />
                  <TextRow
                    id="playground-disclaimer"
                    label="Disclaimer"
                    value={config.disclaimer}
                    placeholder="AI responses may contain mistakes."
                    stacked
                    onChange={(value) => update('disclaimer', value)}
                  />
                </>
              ) : null}
            </TabPanel>

            <PopoverFooter>
              <ResetButton
                type="button"
                onClick={() => setConfig(DEFAULT_CONFIG)}
                disabled={isDefault}
              >
                Reset to defaults
              </ResetButton>
            </PopoverFooter>
          </Popover>
        ) : null}

        <StageCanvas>
          <PreviewFrame
            ref={iframeRef}
            srcDoc={previewDocument}
            title="AI assistant preview"
            onLoad={() => setFrameEpoch((epoch) => epoch + 1)}
          />
        </StageCanvas>
      </Stage>

      <InstallHeader>
        <InstallHeading>Install</InstallHeading>
      </InstallHeader>
      <NumberedList>
        <NumberedItem
          index={1}
          isLast={false}
          headlineLevel={4}
          headline="Copy the configured snippet into your page"
        >
          <CodeBlock
            lang="html"
            source={buildSnippet(config)}
            header={{ title: 'index.html', controls: { copy: {} } }}
          />
        </NumberedItem>
        <NumberedItem
          index={2}
          isLast={true}
          headlineLevel={4}
          headline={
            <>
              Point <code>api-url</code> at your project
            </>
          }
        >
          <p>
            Replace <code>https://your-project.com/_ask-ai</code> with your project&apos;s URL
            followed by <code>/_ask-ai</code>.
          </p>
        </NumberedItem>
      </NumberedList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: var(--spacing-lg, 24px) 0;
`;

const Stage = styled.div`
  position: relative;
  min-height: 640px;
  border: 1px solid var(--border-color-primary);
  border-radius: var(--border-radius-lg, 8px);
  overflow: hidden;
`;

const StageCanvas = styled.div`
  position: absolute;
  inset: 0;
`;

const PreviewFrame = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
`;

const StageOverlay = styled.div`
  position: absolute;
  top: var(--spacing-sm, 12px);
  right: var(--spacing-sm, 12px);
  left: var(--spacing-sm, 12px);
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const overlaySurface = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
`;

const OverlayButton = styled.button`
  ${overlaySurface}
  padding: 6px 12px;
  border-radius: var(--border-radius-md, 6px);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: var(--bg-color-hover, rgba(128, 128, 128, 0.12));
  }
`;

const ThemeSwitch = styled.div`
  ${overlaySurface}
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
`;

const ThemeOption = styled.button<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  ${({ $selected }) =>
    $selected
      ? css`
          background: var(--bg-color-tonal, rgba(128, 128, 128, 0.14));
          color: var(--text-color-primary);
        `
      : css`
          background: none;
          color: var(--text-color-secondary);

          &:hover {
            color: var(--text-color-primary);
          }
        `}
`;

const popoverIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Popover = styled.div`
  position: absolute;
  top: calc(var(--spacing-sm, 12px) + 42px);
  left: var(--spacing-sm, 12px);
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: calc(100% - var(--spacing-lg, 24px));
  max-height: calc(100% - 66px);
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  border-radius: 10px;
  box-shadow:
    0 1px 2px rgb(0 0 0 / 6%),
    0 12px 32px rgb(0 0 0 / 14%);
  overflow: hidden;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${popoverIn} 0.15s ease-out;
  }
`;

const TabList = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: var(--spacing-md, 16px);
  padding: 0 var(--spacing-md, 16px);
  border-bottom: 1px solid var(--border-color-primary);
`;

const TabButton = styled.button<{ $selected: boolean }>`
  margin-bottom: -1px;
  padding: 10px 2px 9px;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;

  ${({ $selected }) =>
    $selected
      ? css`
          color: var(--text-color-primary);
          border-bottom-color: var(--color-primary-base, currentColor);
        `
      : css`
          color: var(--text-color-secondary);

          &:hover {
            color: var(--text-color-primary);
          }
        `}
`;

const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: var(--spacing-xs, 8px);
  overflow-y: auto;
  padding: var(--spacing-sm, 12px) var(--spacing-md, 16px) var(--spacing-md, 16px);
`;

const PopoverFooter = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
  padding: var(--spacing-xxs, 4px) var(--spacing-xs, 8px);
  border-top: 1px solid var(--border-color-primary);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm, 12px);
  min-height: 32px;
`;

const StackedRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
`;

const RowLabel = styled.label`
  flex: 0 0 auto;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  color: var(--text-color-secondary);
  cursor: pointer;
`;

const controlSurface = css`
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  background: var(--bg-color);
  border: 1px solid var(--border-color-primary);
  border-radius: var(--border-radius-md, 6px);
  padding: 5px 10px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: var(--text-color-description);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary-base, currentColor);
    box-shadow: 0 0 0 3px var(--color-primary-bg, rgba(128, 128, 128, 0.2));
  }
`;

const TextInput = styled.input<{ $stacked: boolean }>`
  ${controlSurface}
  ${({ $stacked }) =>
    $stacked
      ? css`
          width: 100%;
        `
      : css`
          flex: 0 0 150px;
          min-width: 0;
        `}
`;

const TextArea = styled.textarea`
  ${controlSurface}
  width: 100%;
  resize: vertical;
  line-height: var(--line-height-sm);
`;

const SelectField = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 150px;
  min-width: 0;
`;

const Select = styled.select`
  ${controlSurface}
  width: 100%;
  appearance: none;
  padding-right: 30px;
`;

const Chevron = styled.svg`
  position: absolute;
  top: 50%;
  right: 9px;
  width: 14px;
  height: 14px;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-color-secondary);
`;

const SwitchTrack = styled.span`
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 32px;
  height: 18px;
  border-radius: 999px;
  background: var(--bg-color-active, rgba(128, 128, 128, 0.35));
  transition: background 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
    transition: transform 0.15s ease;
  }
`;

const SwitchRow = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm, 12px);
  min-height: 32px;
  font-size: var(--font-size-sm);
  color: var(--text-color-primary);
  cursor: pointer;
`;

const SwitchText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const SwitchDescription = styled.span`
  font-size: var(--font-size-xs, 12px);
  line-height: var(--line-height-xs, 1.4);
  color: var(--text-color-description);
`;

const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  margin: 0;

  &:checked + ${SwitchTrack} {
    background: var(--color-primary-base, var(--text-color-primary));
  }

  &:checked + ${SwitchTrack}::after {
    transform: translateX(14px);
  }

  &:focus-visible + ${SwitchTrack} {
    box-shadow: 0 0 0 3px var(--color-primary-bg, rgba(128, 128, 128, 0.2));
  }
`;

const ResetButton = styled.button`
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  background: none;
  border: 0;
  border-radius: var(--border-radius-md, 6px);
  padding: 6px 8px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--bg-color-hover, rgba(128, 128, 128, 0.12));
    color: var(--text-color-primary);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const InstallHeader = styled.div`
  margin: var(--spacing-lg, 24px) 0 var(--spacing-sm, 12px);
`;

const InstallHeading = styled.h3`
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--text-color-primary);
`;
