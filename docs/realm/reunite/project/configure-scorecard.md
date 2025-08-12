# Configure scorecard

In Reunite, you can configure the scorecard feature to evaluate your API description files against rules.
Reunite includes the following three built-in rulesets:

- [`minimal`](https://redocly.com/docs/cli/rules/minimal):
The minimal ruleset is a good starting point for an existing API that doesn't currently conform to any standard.
It has fewer rules that cause an error, with others either downgraded to a warning or turned off completely.
- [`recommended`](https://redocly.com/docs/cli/rules/recommended):
The recommended ruleset is our unabashedly opinionated recommendation of what we think a good API looks like.
It's a great place to start, before adapting to your own context.
- [`recommended-strict`](https://redocly.com/docs/cli/rules/recommended#recommended-strict-ruleset):
The recommended-strict ruleset is identical to the recommended ruleset, except it elevates all warnings to errors.
It's the ideal option for those who don't want to miss anything.

You can use these rulesets only, or extend them with custom rules according to your needs.

## Before you begin

Make sure you have the following before you begin:

- a `redocly.yaml` configuration file

## Add scorecard to your project with Redocly rulesets

To add a scorecard to your project using only the built-in rules:

1. Add the following configuration to your `redocly.yaml` file:

   ```yaml {% title="redocly.yaml" %}
   scorecard:
     levels: # an ordered list of levels (from lowest to highest)
       - name: Baseline
         extends:
           - minimal
       - name: Superior
         extends:
           - recommended
   ```

2. (Optional) You can change the level `name` values to suit your project.
3. Commit and merge your changes.

After you commit, the scorecard information displays in Reunite and the preview build.
When you merge and the production deploy completes, the scorecard labels and reports also display on your production environment.

## Configure custom scorecard rulesets

Instead of using Redocly's built-in rulesets, you can define your own scorecard levels and build rulesets with your criteria.
Building rules in Reunite is very similar to [building API standard rulesets in Redocly CLI](https://redocly.com/docs/cli/api-standards).

### Configure scorecard rulesets in `redocly.yaml`

If you have a small amount of custom rules and you want to include them all in the `redocly.yaml` file you can add your rules directly.

To configure custom rules in `redocly.yaml`:

1. Add the following configuration to your `redocly.yaml` file:

    ```yaml {% title="redocly.yaml" %}
    scorecard:
      levels:
    ```

2. For each level you want to add, add the following configuration:

    ```yaml {% title="redocly.yaml" %}
        - name: # provide a name for the ruleset
          rules:
    ```

    The levels should be listed in order from the lowest to the highest.

3. In the `rules` object, add a map of rules.
   You can use any combination of Redocly's [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) or create [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules).

    Example:

    ```yaml {% title="redocly.yaml" %}
    scorecard:
      levels:
      - name: Baseline
          rules: # The following rules are built-in rules with their severity set to error
            no-unresolved-refs: error # This rule checks that the $ref mentioned in the description exists
            no-server-example.com: error # This rule checks that example.com is not being used for the server URL
      - name: Superior
          rules: # The following rules are built-in rules except for rule/operation-summary-min-length, which is a configurable rule
            no-unresolved-refs: error
            no-unused-components: error # This rule checks to make sure all components listed in the description are used
            no-server-example.com: error
            rule/operation-summary-min-length: # This configurable rule checks that the summary for an operation OpenAPI node type is at least 20 characters in length
              subject:
                type: Operation
                property: summary
              message: Operation summary must have minimum of 20 chars length
              assertions:
                minLength: 20
    ```

4. Commit and merge your changes.

After you commit, the scorecard information displays in Reunite and the preview build.
When you merge and the production deploy completes, the scorecard labels and reports also display on your production environment.

### Configure scorecard rulesets in separate files

If you have many rulesets or your rulesets are complex, you can put them into separate YAML files.
Putting your rulesets in different files means you can have one file per scorecard level, making it easier to maintain rule sets and your `redocly.yaml` file.

To configure scorecard rulesets in separate files:

1. Create a YAML file for each scorecard levels you want to add.
2. In each of the files, add a `rules` object and a map of rules for this scorecard level.
  You can use any combination of Redocly's [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) or create [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules).
  
    Example:

    ```yaml {% title="api-ruleset-baseline.yaml" %}
      rules:
        no-empty-servers: warn
        rule/info-description-property-defined: # This configurable rule enforces the inclusion of a description the the info OpenAPI node type
          subject:
            type: Info
            property: description
          assertions:
            defined: true
          severity: warning
        boolean-parameter-prefixes: # This built-in rule enforces specific and consistent naming for request parameters with boolean type by requiring they all start with "is" or "can"
          severity: error
          prefixes:
            - is
            - can
        info-license: error # This built-in rule enforces the license section of the info OpenAPI node type to be defined
        info-license-url: error # This built-in rule enforces a url be included in the license section of the info OpenAPI node type
    ```

3. Add the following configuration to your `redocly.yaml` file:

    ```yaml
    scorecard:
      levels:
    ```

4. For each level, add a `name` object and an `extends` object with a path to the ruleset file.

    Example:

    ```yaml {% title="redocly.yaml" %}
    scorecard:
      levels:
        - name: Baseline
          extends:
            - ./api-ruleset-baseline.yaml
          rules:
            boolean-parameter-prefixes: # This turns off the boolean-parameter-prefixes rule for the baseline ruleset
              severity: off
        - name: Silver
          extends:
            - ./api-ruleset-silver.yaml
        - name: Gold
          extends:
            - ./api-ruleset-gold.yaml
    ```

5. Commit and merge your changes.

After you commit, the scorecard information displays in Reunite and the preview build.
When you merge and the production deploy completes, the scorecard labels and reports also display on your production environment.

## Publish project with non-compliant APIs

By default, if one or more of your API description files does not comply with the rules in the lowest level ruleset, your project's build will be success, but the deploy will be blocked to published to production.
In certain situations, you might want to bypass this behavior.

To publish projects with non-compliant APIs:

1. In `redocly.yaml`, inside `reunite` add the `ignoreLint: true` parameter, as in the following example:

    ```yaml {% title="redocly.yaml" %}
    reunite:
      ignoreLint: true
    ```

    You can also choose specific files or directories to be ignored by the linter:
    ```yaml {% title="redocly.yaml" %}
    reunite:
      ignoreLint:
        docs/museum/**: true
        docs/travel.yaml: true
    ```

2. Commit and merge your changes.

After the production build finishes, the APIs that do not meet the lowest level criteria are marked with a "Non-compliant" label in Reunite and on your published project.

## Exclude APIs from scorecard

The scorecard feature evaluates all API description files in your project, regardless of their location in the file tree.
You might want to exclude APIs that are still being developed, or sample APIs you use for training or testing.

If you have APIs you want to exclude from evaluation, list the API description files' locations in the `ignore` object in `redocly.yaml`.

{% admonition type="warning" %}
When you add an API description file to the `ignore` object, it is not published.
To avoid broken links, make sure you remove any links to that file from your project.
{% /admonition %}

To exclude API description files from scorecard and publishing:

1. In your `redocly.yaml` file, add an `ignore` object.
2. Inside the object, add an array of paths to the API description files to exclude.

    For example:

    ```yaml {% title="redocly.yaml" %}
    ignore:
      - ./apis/WIP/my-work-in-progress.yaml 
      - ./test-api2.yaml
      - ./internal/projects/user-management.yaml
    ```

3. Commit and merge your changes.

After you publish the updated project, the listed API description files are excluded from the scorecard reports in Reunite and on your published project.

## Resources

- **[Add OpenAPI descriptions](../../content/api-docs/add-openapi-docs.md)** - Step-by-step guide to add OpenAPI descriptions to your project for scorecard evaluation and documentation
- **[Configure a catalog](../../config/catalog-classic.md)** - Organize multiple API descriptions with structured catalogs for better navigation and user experience
- **[Scorecard feature overview](./scorecard.md)** - Understand what scorecards display, how to access reports, and their role in API quality management
- **[Scorecard configuration reference](../../config/scorecard.md)** - Complete reference for all scorecard configuration options, rulesets, and customization settings
