---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Deploy your project

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Reunite automatically builds, validates, and deploys your project whenever you push changes.
Control which branches deploy, review deployment history, and enforce API quality gates before content reaches production.

## Deployment configuration and monitoring

- [Branches and deployments](../../reunite/project/branches-and-deployments.md): Control which branches trigger deployments and configure preview builds for pull requests.
- [Deployments](../../reunite/project/deployments.md): View deployment history, monitor build status, and promote or re-deploy builds from the Deployments page.

## API quality and validation

- [API linting](../../reunite/project/lint.md): Understand the Lint deployment step and how scorecard reports surface API validation results.
- [Configure classic scorecard](../../reunite/project/configure-classic-scorecard.md): Add built-in or custom rulesets to evaluate API description files against your quality standards.
- [Ignore link checker](../../reunite/project/ignore-link-checker.md): Publish deployments with broken links by overriding the default link checker behavior.

## Resources

- **[Classic scorecard configuration reference](../../config/scorecard-classic.md)** - Complete reference for `scorecardClassic` configuration options
- **[Reunite configuration reference](../../config/reunite.md)** - Configure deployment options, including `ignoreLint` and `ignoreLinkChecker`
