import type { Schema } from '@markdoc/markdoc';

/**
 * Markdoc tags for the docs mini-game.
 *
 * Usage inside any .md page (the page must use the `DocsWithGame` template,
 * which is applied to `docs/realm/**` in redocly.yaml):
 *
 * {% gameStep id="team-mapping" title="Who gets which role?" type="golf" %}
 *   {% gameSay %}Nice! Now let's connect IdP groups to Redocly teams.{% /gameSay %}
 *   {% gameMedia src="./images/team-mapping.gif" caption="Mapping a group to a team" /%}
 *   {% gameQuestion %}
 *     A user is in the IdP group `docs-admins`. Where do you decide their role?
 *     {% gameOption correct=true %}Team mapping{% /gameOption %}
 *     {% gameOption feedback="Domains only control sign-up." %}Verified domains{% /gameOption %}
 *   {% /gameQuestion %}
 * {% /gameStep %}
 */

export const GameStepSchema: Schema = {
  render: 'GameStep',
  attributes: {
    /** Stable id, used for progress persistence. Defaults to an auto id based on order. */
    id: { type: String, required: false },
    /** Short title shown in the HUD / bubble header */
    title: { type: String, required: false },
    /** Interaction kind: `tip`, `quiz` (default when options exist), `golf`, … (see ./kinds) */
    type: { type: String, required: false, matches: ['tip', 'quiz', 'golf', 'match'] },
    /** Emphasise the step: sticker, pulsing border, attention flash, character holds a sign */
    highlight: { type: Boolean, required: false, default: false },
    /** Sticker text for a highlighted step */
    badge: { type: String, required: false },
    /** Sign the character holds up on a highlighted step */
    sign: { type: String, required: false },
    /** `match` kind: column labels and how many misses still count as correct */
    leftLabel: { type: String, required: false },
    rightLabel: { type: String, required: false },
    allowedMistakes: { type: Number, required: false, default: 0 },
    /** Character state to show when arriving at this step (idle | talk | point | happy) */
    mood: { type: String, required: false, matches: ['idle', 'talk', 'point', 'happy', 'confused'] },
  },
};

export const GameMediaSchema: Schema = {
  render: 'GameMedia',
  selfClosing: true,
  attributes: {
    /** Image / gif (relative path is resolved like `img`), or a video under /static referenced by absolute path */
    src: { type: String, required: true, resolver: 'imageSrc' } as any,
    alt: { type: String, required: false },
    caption: { type: String, required: false },
    poster: { type: String, required: false },
    autoplay: { type: Boolean, required: false },
    loop: { type: Boolean, required: false },
  },
};

export const GameSaySchema: Schema = {
  render: 'GameSay',
  attributes: {},
};

export const GameQuestionSchema: Schema = {
  render: 'GameQuestion',
  attributes: {},
};

export const GameOptionSchema: Schema = {
  render: 'GameOption',
  attributes: {
    correct: { type: Boolean, required: false, default: false },
    /** Explanation shown after the option is chosen (plain text) */
    feedback: { type: String, required: false },
  },
};

export const GamePairSchema: Schema = {
  render: 'GamePair',
  selfClosing: true,
  attributes: {
    left: { type: String, required: true },
    right: { type: String, required: true },
  },
};

export const docsGameTags = {
  gameStep: GameStepSchema,
  gameSay: GameSaySchema,
  gameQuestion: GameQuestionSchema,
  gameOption: GameOptionSchema,
  gameMedia: GameMediaSchema,
  gamePair: GamePairSchema,
};
