# Docs mini-game

An optional "guided walkthrough" layer for documentation pages: a character walks from
section to section, gives tips and asks quick questions.

## How it is wired

- `templates/DocsWithGame.tsx` — wraps the default Realm Markdown template. Applied to
  `docs/realm/**` through `markdown.template` in `redocly.yaml`. Pages without `gameStep`
  tags render exactly as before.
- `markdoc-schema.ts` + `tags.tsx` — Markdoc tags (`gameStep`, `gameSay`, `gameQuestion`,
  `gameOption`) registered in `@theme/markdoc/schema.ts` and `components.tsx`.
- `store.ts` — game state (mode, steps, answers, progress) shared between tags and template.
- `GameLauncher.tsx` — banner at the top of the article, bottom HUD and the character overlay.
- `StepBubble.tsx` — the card rendered in-flow under the active section; picks the step kind.
- `kinds/` — interaction kinds (`TipKind`, `QuizKind`, `GolfKind`) + `registry.ts`.
- `config.ts` — labels/options with per-page front matter overrides; `theme.ts` — CSS tokens.
- `Character.tsx` — placeholder character; swap in the SVG sprite via `CHARACTER_SPRITE`.

## Add the game to a page

Place a `gameStep` right after the section it belongs to (order in the document = order in the game):

```md
## Team mapping

{% gameStep id="team-mapping" title="Who gets which role?" mood="talk" %}
  {% gameSay %}
  Adding an IdP only proves *who* someone is. Team mapping decides *what they can do*.
  {% /gameSay %}
  {% gameQuestion %}
  A user is in IdP group `docs-admins`. Where do you decide their role?
  {% gameOption correct=true feedback="Map the group to a Redocly team." %}Team mapping{% /gameOption %}
  {% gameOption feedback="Domains only control sign-up." %}Verified domains{% /gameOption %}
  {% /gameQuestion %}
{% /gameStep %}
```

- `type` — interaction kind: `quiz` (default when options exist), `golf` (aim with ← →, swing with
  Enter), `match` (connect left/right pairs, default when `gamePair` tags exist), `tip` (no question). New kinds: add a component in `kinds/`, call `registerStepKind()` in `kinds/index.ts`, and add the id to `matches` in `markdoc-schema.ts`.
- `id` — stable id for progress persistence (optional, but recommended).
- `title` — shown in the bubble header and HUD tooltips.
- `mood` — character state on arrival: `talk` (default), `point`, `idle`, `happy`.
- `gameSay` — free Markdoc content; several are allowed.
- `gameQuestion` — optional; exactly one `gameOption` should be `correct=true`.
- `highlight=true` — the "don't skip this" treatment: a one-time dim flash of the page, pulsing
  border, a wiggling sticker (`badge="Most skipped step"`) and the character holds up a sign
  (`sign="Everyone skips this. Don't."`).
- `match` kind — `{% gamePair left="idp: api-writers" right="Writer (default team)" /%}` per pair;
  `leftLabel`/`rightLabel` name the columns, `allowedMistakes=1` still counts the step as correct
  with one miss. The right column is shuffled; ↑ ↓ + Enter pick a group, then its team.
- `gameMedia` — `{% gameMedia src="./images/x.gif" caption="…" /%}` shows a gif/image; `.mp4`/`.webm`
  under `static/` (absolute path) plays as a muted looping video (`autoplay=false` for controls).
- Steps without a question are "tip" stops and can be continued right away.

Keyboard: ← → move the highlight (or aim), Enter / Space answer (or swing), Enter again continues.

## Adding your own gif or video

1. **Gif / png / jpg next to the page** — put the file in an `images/` folder beside the `.md`
   and reference it relatively; Realm copies it to the build like a normal image:

   ```md
   {% gameMedia src="./images/team-mapping.gif" alt="Mapping a group to a team" caption="Team mapping in Reunite" /%}
   ```

   Any Markdoc also works inside `gameSay`, e.g. `![alt](./images/x.gif)` or `{% img src="…" /%}`.
2. **Video (.mp4 / .webm)** — put it under `static/`, e.g. `static/docs-game/team-mapping.mp4`, and
   reference it by absolute path. Videos autoplay muted and loop like a gif; add `autoplay=false`
   to show player controls instead:

   ```md
   {% gameMedia src="/docs-game/team-mapping.mp4" poster="/docs-game/team-mapping.jpg" caption="…" /%}
   {% gameMedia src="/docs-game/walkthrough.webm" autoplay=false /%}
   ```

   Keep videos short (≤ 15 s, < 3 MB) — they load with the page.
3. **External / hosted video** (YouTube, Loom) — drop the provider's `<iframe>` inside `gameSay`;
   Realm allows HTML in Markdown.

Several `gameMedia` tags per step are allowed; they render in order between the text and the question.

## Customize

Per page, in front matter (any field of `GameConfig` in `config.ts`):

```yaml
game:
  title: SSO quest
  cta: Play the SSO quest
  keyboardHints: false
  labels:
    finish: Done
```

Site-wide: edit `defaultGameConfig` in `config.ts`, and re-skin via CSS tokens in `@theme/styles.css`
(`--docs-game-accent`, `--docs-game-surface`, `--docs-game-radius`, `--docs-game-font-heading`,
`--docs-game-character`, `--docs-game-golf-green`, …). Components fall back to Redocly theme variables.

Opt a page out with `game: false` in its front matter.
Deep-link into game mode with `?mode=game`.

## Character artwork

Frames live in `images/game/` (originals) and `images/game/web/` (optimized copies that the code
imports). Per state the character plays a sequence of frames, see `CHARACTER_FRAMES` in
`Character.tsx`; states without their own artwork reuse `idle`, motion (run/jump/wobble) is CSS.

To add a frame, e.g. `run-1.svg`:

```sh
# add viewBox + optimize (originals are 300–500 KB, web copies ~130 KB)
sed 's|width="432" height="578">|width="432" height="578" viewBox="0 0 432 578">|' images/game/run-1.svg \
  | npx svgo --multipass -p 1 -o images/game/web/run-1.svg -
```

Run frames are already wired (`run-1..3.svg`, 110 ms each).
Keep every frame on the same 432×578 canvas with the character at the same spot, facing right.
