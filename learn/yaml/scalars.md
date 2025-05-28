---
seo:
  title: Scalars
---
# Lesson 4: Scalars

A scalar is an atomic data type.
This includes strings, numbers, boolean values true and false, and null.

The following example is a bare document with a single scalar value.

```yaml
My single value document.
```

The following example demonstrates a map with various scalar types of values.

```yaml
greeting: Hello
favoriteNumber: 123
favoriteDessert: 3.14
favoriteChild: null
areYouASentientBeing: true
partyTime: 2021-12-31T23:59:59Z
```

## Escaped characters

{% admonition type="info" name="Escape" %}
Escape means to remove special meaning from a character so it can be used literally.
{% /admonition %}

Keys or values that contain the following characters **must** be escaped:
- starts with a `-` character followed by a space
- has a `:` character followed by a space
- has a `#` character preceded by a space
- all non-printable characters.

Escape a single character with single quotes, or all characters in a scalar with double quotes.
Another option that escapes is using blocks covered in the next lesson.

The following is an example of some problem unescaped values and their corresponding escaped solutions.

|Problem|Solution|
|---|---|
|- plums|'- plums'|
|Space: An Odyssey|'Space: An Odyssey'|
|The #3 YAML mistake|'The #3 YAML mistake'|


### Exercise 4.1: Spot the key with the problem value

```yaml
Author: Szy de'Root
bookTitle: Docs: investment in productivity
publicationDate: 2021-12-31
```

<details>
<summary>See answer</summary>

The `bookTitle` corresponding value must be escaped because it has a `:` followed by a space.

The correct YAML is:

```yaml
Author: Szy de'Root
bookTitle: 'Docs: investment in productivity'
publicationDate: 2021-12-31
```

It could also be escaped with double quotes:

```yaml
Author: Szy de'Root
bookTitle: "Docs: investment in productivity"
publicationDate: 2021-12-31
```
</details>

### Exercise 4.2: Spot the key with the problem value

```yaml
Author: R2:D2
bookTitle: Lessons - From Observing Life
chapterTitle: Lesson #1
publicationDate: 2021-12-31
```

<details>
<summary>See answer</summary>

The `chapterTitle` corresponding value needs to be escaped because it has a `#` preceded by a space.

The correct YAML is:

```yaml
Author: R2:D2
bookTitle: Lessons - From Observing Life
chapterTitle: 'Lesson #1'
publicationDate: 2021-12-31
```

It could also be escaped with double quotes:

```yaml
Author: R2:D2
bookTitle: Lessons - From Observing Life
chapterTitle: "Lesson #1"
publicationDate: 2021-12-31
```

Some characters didn't need to be escaped:
- the `:` in `R2:D2` because it's not followed by a space
- the `-` in `Lessons - From Observing Life` because the string doesn't start with `-`.
- the `-` in the `2021-12-31` because the string doesn't start with `-`.
</details>
