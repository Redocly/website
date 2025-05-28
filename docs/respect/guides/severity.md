# Severity levels

Severity levels in checks determine the importance and urgency of issues found during job execution.
This guide explains how to override default severities and customize them for your needs.

## Understanding severity levels

Respect supports the following severity levels (from highest to lowest):
- `error`: The check fails and the test is marked as failed. This is the default severity level for all checks.
- `warn`: The check fails and the test is marked as passed.
- `off`: The check is ignored and the test is marked as passed.

## Overriding check severity levels

You can override the default severity of checks with the `--severity` option.
This is useful when you want to adjust the importance of certain checks based on your project's requirements.

For example, to set the severity level for the `STATUS_CODE_CHECK` check to `warn`, you can run:

```sh
npx @redocly/cli respect test-file.yaml --severity 'STATUS_CODE_CHECK=warn'
```

You can also pass the severity overrides as an environment variable, as in the following example: `REDOCLY_CLI_RESPECT_SEVERITY='STATUS_CODE_CHECK=warn'`.

## Supported checks

- `STATUS_CODE_CHECK`: checks if the response status code matches the described status code in the OpenAPI description.
- `SUCCESS_CRITERIA_CHECK`: checks the Arazzo Success Criteria.
- `SCHEMA_CHECK`: checks if the response body matches the described schema in the OpenAPI description.
- `CONTENT_TYPE_CHECK`: checks if the response content type matches the described content type in the OpenAPI description.

## Best practices

Redocly recommends using the default `error` severity level for all checks.
This strategy helps you monitor if the OpenAPI description is correct and catches all issues before deploying your API.

### Disable OpenAPI description checks

If you know that your OpenAPI description is not correct and ready for testing yet, you can disable all checks that are related to the OpenAPI description files.

```sh
npx @redocly/cli respect test-file.yaml --severity 'STATUS_CODE_CHECK=off' --severity 'SCHEMA_CHECK=off' --severity 'CONTENT_TYPE_CHECK=off'
```

Alternatively, you can turn all errors into warnings:

```sh
npx @redocly/cli respect test-file.yaml --severity 'STATUS_CODE_CHECK=warn' --severity 'SCHEMA_CHECK=warn' --severity 'CONTENT_TYPE_CHECK=warn'
```

## Default checks that can't be disabled

- Check that reports network errors.
- Check that reports unexpected errors (such as Respect crashing).
