- page
- string
- **CONDITIONALLY REQUIRED.**
  Relative or absolute path to the file (extension included), or a full route slug which represents the page to link to.
  **Mutually exclusive** with the `href` option.
  If you don't include a `label` option, the link text matches the level 1 heading of the page.
  **Examples**: `./index.md`, `/docs/tutorial.md`, `../../glossary.md`, `/info#admonition`, `./test.md#rename`.

---

- href
- string
- **CONDITIONALLY REQUIRED.**
  URL to link to.
  **Mutually exclusive** with the `page` option.
  If you don't include the `label` option, the link text matches the value of `href`.
  **Examples**: `https://redocly.com`, `https://www.openapis.org/`.