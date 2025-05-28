---
seo:
  title: Block and flow scalars
---
# Lesson 5: Block and flow scalars

Write a string across more than one line using literal blocks, folded blocks, or flows.

This is also the course's first introduction to indentation within YAML files.
YAML is commonly indented with two-space increments.
It's important to use spaces and not "tab" characters for indentation.
It's okay to use tabs if your editor converts them to spaces (most do have that as a setting).

## Literal blocks

A literal style block starts with a `|` followed by a line break and indentation.
Then, the string starts on the next line.
Indent all the lines for the same string the same way.

```yaml
summary: regular scalar
description: |
  This is my sentence with the literal scalar.
  And another sentence.
operationId: jasmint
```

The literal style block has a line break after the first sentence in the example.
Line breaks are taken literally (as actual line breaks within the string).

## Folded blocks

A folded style block starts with a `>` followed by a line break.
But the line breaks are treated as a line break if there are multiple consecutive line breaks.
Otherwise, they're treated as spaces.

```yaml
summary: regular scalar
description: >
  This is my sentence with the folded scalar.
  And another sentence starts without a preceding line break.

  And a sentence starts with a preceding line break, because there are two consecutive line breaks preceding this line.
operationId: jasmint
```

## Line breaks to end blocks

The block type can be followed with nothing (as shown in the examples above) which is the default clip.

|Line break style|Description|
|---|---|
|Clip  (default)|  Adds single line break at the end of the string|
|Strip (-)|Removes line breaks from the end of the string|
|Keep (+)|Keeps (more than one) line breaks at the end of the string|

**Examples with literal style**

```yaml Clip
description: |
  This has the default
  Clip behavior.
```

```yaml Strip
description: |-
  This has the strip
  behavior.
```

```yaml Keep
description: |+
  This has the keep
  behavior.
```

**Examples with folded style**

```yaml Clip
description: >
  This has the default
  Clip behavior.
```

```yaml Strip
description: >-
  This has the strip
  behavior.
```

```yaml Keep
description: >+
  This has the keep
  behavior.
```

## Flow scalars

You should be aware of flow scalars (but probably not use them because you have less explicit control of the behavior).

```yaml No escape
Summary: regular scalar
Description: This is my sentence with a flow scalar.
  And this is my next sentence.
operationId: scaly
```

```yaml Single quote
Summary: regular scalar
Description: 'This is my sentence with a flow scalar.
  And this is my next sentence.'
operationId: scaly
```

```yaml Double quote
Summary: regular scalar
Description: "This is my sentence with a flow scalar.
  And this is my next sentence."
operationId: scaly
```

The single quote removes the ending line break.

## Exercise 5.1: Find the problematic scalars (multiple choice)

A)
```yaml
# Example A
Description: |
This is my description of a wonderful exercise.
```
B)
```yaml
# Example B
Description: {
  This is my description of a wonderful exercise.
```

C)
```yaml
# Example C
Description: <
  This is my description of a wonderful exercise.
```
D)
```yaml
# Example D
Description: This is my first sentence.
This is my description of a wonderful exercise.
```


Which scalar is problematic?
- Example A
- Example B
- Example C
- Example D
- All of the above


<details>
<summary>See answer</summary>

**All of the above.**

Example A is missing indentation.
```diff
# Example A
Description: |
- This is my description of a wonderful exercise.
+   This is my description of a wonderful exercise.
```

Example B used a wrong token `{` instead of `|` or `>`.

```diff
# Example B
- Description: {
+ Description: |
    This is my description of a wonderful exercise.
```
Example C had the mirror of the correct symbol `>`.
```diff
# Example C
- Description: <
+ Description: >
    This is my description of a wonderful exercise.
```
Example D uses a flow scalar but lacks the indentation.
```diff
# Example D
Description: This is my first sentence.
- This is my description of a wonderful exercise.
+   This is my description of a wonderful exercise.
```

</details>



<!-- TODO
## Exercise 5.2: Which is valid

Example A
Example B
Example C

 -->
