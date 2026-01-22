# Login button tag

The `login-button` tag renders a login button that links to the login URL.
The button is only visible to unauthenticated users and automatically hides when a user is logged in.

## Syntax and usage

Use the `login-button` tag to add a login call-to-action anywhere in your content.
It is especially useful for prompting anonymous users to authenticate to access restricted content.

**Example syntax:**

````markdoc {% process=false %}
{% login-button /%}
````

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- variant
- string
- The visual style of the button.
  Accepts: `primary`, `secondary`, `outlined`, `text`, `link`, `ghost`.
  Default: `primary`

---

- size
- string
- The size of the button.
  Accepts: `small`, `medium`, `large`.
  Default: `medium`

---

- label
- string
- Custom button label text. When provided, this overrides the translation.

---

- labelTranslationKey
- string
- Translation key for the button label. Use this to specify an alternative translation key.
  Default: `userMenu.login`

{% /table %}

## Examples

### Basic usage

To display a simple login button:

````markdoc {% process=false %}
{% login-button /%}
````

### With variant and size

You can customize the button appearance:

````markdoc {% process=false %}
{% login-button variant="secondary" size="small" /%}
````

### With custom label

You can provide a custom label for the button:

````markdoc {% process=false %}
{% login-button label="Sign in to continue" /%}
````

### With custom translation key

If you have custom translations, you can specify an alternative translation key:

````markdoc {% process=false %}
{% login-button labelTranslationKey="custom.loginButton" /%}
````

### Conditional display for anonymous users

A common pattern is to show the login button only to anonymous users along with a warning message:

````markdoc {% process=false %}
{% if includes($rbac.teams, "anonymous") %}
{% admonition type="info" name="Log in" %}
Some content is available only for authenticated users. Log in to get full access to our documentation.

{% login-button /%}

{% /admonition %}
{% /if %}
````

This example uses:
- the `includes` function to check if the user belongs to the "anonymous" team
- the `$rbac.teams` variable that contains the list of teams the current user belongs to
- an admonition to highlight the message

## Related topics

- [Role-based access control (RBAC)](../../access/rbac.md)
- [Markdoc variables](../../customization/markdoc-variables.md)
