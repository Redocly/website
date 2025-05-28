---
seo:
  title: Troubleshooting
---
# Lesson 7: Troubleshooting

Thousands of YAML files have been shared with us.
These are the most common issues grouped into categories:

## Indentation

- Valid indentation but invalid outcome. For example, a map key belonging to the wrong map due to an indentation issue.
- Using wrong (and invisible to the eye) characters like a tab instead of a space.

**Solution:** use spaces, and two space increments are standard for levels of indentation for YAML (even though others space increments are valid).
Two spaces are most recognized by users.

## Missed space after colon

- Map keys need a colon followed by a space

**Solution:** add the space

## Not escaped characters

Not escaping characters including `:`, `-`, and `#`.

**Solution:** use block scalars or quotes.

## Character set

YAML processors should support UTF-8, UTF-16, and UTF-32.

Be wary if you're using anything else.
