---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
description: Show a cookie consent banner and load analytics only after the visitor agrees.
---
# `consent`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Show a cookie consent banner and load analytics integrations only after the visitor agrees.
Or load them at once and give the visitor a footer link to opt out.
Set `mode` to turn the feature on.
The default is `none`, so the block alone changes nothing.

{% admonition type="info" name="You own the wording" %}
Redocly supplies the banner and the gate, not legal advice.
You are responsible for the text of the banner, the category descriptions, and your privacy policy.
Consent law differs by country and by US state, so ask your own counsel which rules apply to your site.
Every string on this page is configurable for that reason.
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- mode
- string
- How the site asks for consent.
  `auto` picks `opt-in` or `opt-out` for each visitor from where they are.
  See [Auto mode](#auto-mode).
  `opt-in` shows the banner on the first visit and loads nothing until the visitor accepts.
  `opt-out` shows no banner, loads analytics and marketing at once, and gives the visitor a footer link to refuse.
  `none` shows no banner and no link, and loads everything, as if the block were absent.
  `onetrust`, `cookiebot`, `trustarc`, and `tcf` are consent providers.
  A provider value hands the banner, the decision and the geo-targeting to that consent manager.
  Realm gates its integrations and your scripts from the provider's state.
  See [Use your own consent provider](#use-your-own-consent-provider).
  Possible values: `auto`, `opt-in`, `opt-out`, `none`, `onetrust`, `cookiebot`, `trustarc`, `tcf`.
  Default: `none`

---

- privacyPolicyUrl
- string
- Link to the privacy policy.
  The banner shows it after the message.

---

- expires
- number
- How long the browser keeps the choice, in days.
  Default: `365`

---

- settingsLink
- string
- Where the settings link appears.
  The link reads **Cookie preferences** in every mode.
  Possible values: `auto`, `footer`, `none`.
  `auto` uses the footer when your project shows one, and shows no link when it does not.
  `footer` puts the link in the footer.
  `none` shows no link, and you place your own.
  Default: `auto`

{% /table %}

Every string in the banner and the dialog is a translation key.
The [predefined translation keys](../content/localization/translation-keys.md) page lists them all.
Change the wording of any string in your `translations.yaml` file.

### Categories

Consent has three fixed categories.
You cannot add a category.
Change the title and the description of each one with translation keys.

{% table %}

- Category
- What it covers
- Visitor control

---

- necessary

- Cookies the site needs to work, such as the consent choice itself, the color mode, and Realm telemetry.

- Always on.
  The settings dialog shows the category and explains why it has no toggle.

---

- analytics

- Tools that measure how visitors use the site, such as Google Analytics, Segment, or Amplitude.

- Off until the visitor accepts in `opt-in` mode.
  On until the visitor refuses in `opt-out` mode.

---

- marketing

- Tools that build an advertising audience or attribute a signup to a campaign, such as a Meta or LinkedIn pixel.

- Off until the visitor accepts in `opt-in` mode.
  On until the visitor refuses in `opt-out` mode.
  Off when the browser sends the Global Privacy Control signal, in both modes.

{% /table %}

Realm ships no marketing integration, so the marketing category gates only the scripts you add.

## Which integrations wait for which category

{% table %}

- Integration
- Category

---

- Google Analytics, Google Tag Manager, Segment, Rudderstack, Amplitude, Heap, FullStory, Adobe
- analytics

---

- Realm telemetry
- necessary.
  The anonymous ID changes every session and identifies nobody across visits.

{% /table %}

## Example

```yaml
consent:
  mode: auto
  privacyPolicyUrl: https://example.com/privacy
```

With `mode: auto`, a visitor in an opt-in country sees the banner on the first visit.
A visitor who accepts analytics gets the Google Analytics script at once, on the same page, with no reload.
Google Tag Manager, Segment, and Heap record the page the visitor accepted on.
Google Analytics and Rudderstack record from the next page view.
A visitor who rejects it never loads the script.
A **Cookie preferences** link in the footer reopens the dialog.

## Opt-out mode

Use `opt-out` mode for a site whose visitors live where the law requires a way to refuse, not a question up front.
The US state privacy laws work this way.

```yaml
consent:
  mode: opt-out
  privacyPolicyUrl: https://example.com/privacy
```

The visitor sees no banner.
Analytics and marketing load on the first page view.
A **Cookie preferences** link in the footer opens the settings dialog, with every category on.
When a visitor turns a category off, Realm reloads the page, so scripts that already run stop.

If your visitors live in both opt-in and opt-out places, use `mode: auto`.

## Global Privacy Control

Some browsers send the Global Privacy Control signal, which asks the site not to sell or share the visitor's data.
Realm treats the signal as a refusal of the marketing category, in both modes.
Marketing scripts do not load, the settings dialog shows the marketing toggle off, and the dialog says the browser asked for it.
The visitor cannot change the marketing toggle while the browser sends the signal.

## Use your own consent provider

Use a provider mode when your company already has a consent manager.
The provider shows the banner, keeps the decision, and selects the visitors who see the banner.
Realm reads the state from the provider.
Then Realm gates its analytics integrations and your scripts on that state.

Add the provider script to the `scripts` config.
Do not add the `consent` property to it, because the provider must load on each page view.
Realm adds no provider script and needs no provider settings.

```yaml
consent:
  mode: onetrust
scripts:
  head:
    - src: https://cdn.cookielaw.org/scripttemplates/otSDKStub.js
      data-domain-script: 0190abcd-1234-7000-8000-000000000000
```

Each provider has its own category names.
Realm maps them to the analytics category and the marketing category.

{% table %}

- Provider
- `mode` value
- Analytics category
- Marketing category

---

- OneTrust
- `onetrust`
- The Performance group, `C0002`
- The Targeting group, `C0004`

---

- Cookiebot
- `cookiebot`
- The statistics category
- The marketing category

---

- TrustArc
- `trustarc`
- The functional and analytics bucket, number 2
- The advertising bucket, number 3

---

- IAB TCF
- `tcf`
- Purpose 1 and one of the purposes 8, 9, or 10
- Purpose 1 and one of the purposes 2, 3, or 4

{% /table %}

Use `tcf` with a consent manager that supplies the IAB TCF version 2.2 API, such as Didomi, Usercentrics, or Sourcepoint.

A provider mode changes what Realm does:

- Realm shows no banner and no settings dialog.
- The **Cookie preferences** link opens the preference center of the provider.
  Before the provider script loads, the link writes a warning to the browser console and does nothing.
  With `tcf`, the link opens the Didomi or Usercentrics preference center.
  The TCF API has no command that shows a preference center, so with another TCF consent manager, add your own trigger.
- Realm keeps no consent cookie, because the provider keeps the decision.
- Realm pushes no Google consent mode command, because the provider pushes its own.

Analytics and marketing stay off until the provider reports a grant.
If the provider script does not load in 15 seconds, Realm writes one warning to the browser console.
Analytics and marketing stay off.

## Auto mode

With `mode: auto`, visitors in places that require consent up front get the banner.
Visitors in places that require a way to refuse get the footer link.

```yaml
consent:
  mode: auto
  privacyPolicyUrl: https://example.com/privacy
```

Realm finds the visitor's country from the browser's time zone.
The browser reports a zone name such as `America/Chicago`, and Realm maps the zone to its country with the tz database's country table.
This finds the country, not the state or province.
The table lists one country for each zone, and that country decides.
A visitor in a place that shares a zone with a neighboring country gets the mode of that country.

The country then picks the mode:

{% table %}

- Visitor's country
- Mode

---

- A country whose law requires consent before non-essential cookies.
  The EEA, the UK, Switzerland, Brazil, Japan, South Korea, China, Turkey, South Africa, Thailand, Saudi Arabia, India, Israel, Argentina, and Canada.
  The territories and microstates of the EU and the UK count as opt-in too.
- `opt-in`

---

- Every other country
- `opt-out`

---

- Unknown
- `opt-in`

{% /table %}

`auto` never picks `none`.
Realm changes the list only in a release, with a changelog entry.
If you disagree with the choice for a place, set `mode: opt-in` or `mode: opt-out` for every visitor.

## Gate your own scripts

Add the `consent` property to a script in the `scripts` config.
The script loads only while the consent state allows that category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.
Possible values: `analytics`, `marketing`.
A script without the property loads on every page view.

```yaml
scripts:
  head:
    - src: https://connect.facebook.net/en_US/fbevents.js
      consent: marketing
```

A returning visitor who granted the category gets the script on the first page view.
Gated scripts load in the order of the config.
A pixel inside a Google Tag Manager container follows Google consent mode and needs no `consent` property.
That pixel loads only when the visitor grants the analytics category, because the container itself waits for analytics.

## Place the settings link yourself

Set `settingsLink: none`, or hide the footer.
Then open the dialog from any element of your own.

```js
document.querySelector('#cookie-settings').addEventListener('click', () => {
  window.redocly.consent.open();
});
```

Use this when you want the link on a specific page.
`window.redocly.consent.close()` closes the dialog.

## Read the state from a script

A script that is more than one tag can read the state and wait for a category.

```js
window.redocly.consent.on('change', (state) => {
  if (state.analytics) {
    loadMyAnalytics();
  }
});
```

## Resources

- **[Analytics configuration](./analytics/index.md)** - The integrations that wait for the analytics category
- **[Scripts configuration](./scripts.md)** - How to add your own scripts and the `consent` property that gates them
- **[Localization](./l10n.md)** - How to translate the banner text
