# API linting

Reunite's deployment process has a Lint step that performs scorecard tests and validation of API description files in your project.
This step relies on the [`scorecardClassic` configuration](../../config/scorecard-classic.md).

Scorecard tests API description files against built-in or custom rulesets.
These rulesets help maintaining quality across your existing APIs and ensure that newly-added or updated APIs match your criteria.
Your project can include multiple sets of rules, corresponding to different quality levels.

When new quality criteria arise, you can add more levels to reflect the evolving standards.
There is no limit to the number of levels you can have.

You can set up a baseline ruleset and prevent APIs that do not meet this standard from publishing to your production project.

## Scorecard information

After you define the rules for the API scorecard, reports display in Reunite and on your production project.
If you have versioned APIs, each version displays as a separate row.
Reports show if an API description file complies with the applied rulesets.

### Scorecard reports in the Lint CI job

You can view scorecard reports on Reunite's **Deployments** page.
Choose a preview or production deploy and click it to open its status page.
Under **Summary**, click **Lint** to display the report.

{% img
  src="../images/reunite-deploy-scorecard.png"
  alt="Classic scorecard information in Deployments"
  withLightbox=true
/%}

You can expand each row of the table, switch between the scorecard levels and drill down the table to display warnings and errors.

{% img
  src="../images/reunite-deploy-scorecard-expanded.png"
  alt="Expanded classic scorecard report in Deployments"
  withLightbox=true
/%}

If you have an open pull request, you can access the same report by opening the pull request, selecting the **Checks** tab, and clicking **Lint**.

{% img
  src="../images/reunite-pull-request-scorecard.png"
  alt="Classic scorecard report in a pull request"
  withLightbox=true
/%}

## Scorecard labels

After you define scorecard levels and commit the changes, labels representing the scorecard levels display next to the names of your API descriptions in Reunite and on your published project.

## Resources

- **[Configure classic scorecard](./configure-classic-scorecard.md)** - Add Redocly built-in or custom rulesets to classic scorecards for comprehensive API quality assessment and tracking
- **[Classic scorecard configuration reference](../../config/scorecard-classic.md)** - Complete reference for `scorecardClassic` configuration options and customization settings
- **[Classic catalog configuration reference](../../config/catalog-classic.md)** - Complete reference for  `catatlogClassic` configuration options and customization settings