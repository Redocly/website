# Telemetry

Redocly includes a telemetry feature that collects anonymous usage information. This information is utilized to gain insights into the project's feature usage and enhance the Redocly project based on those insights.

## Opt-out

You have the option to opt-out of telemetry by simply setting the `REDOCLY_TELEMETRY` environment variable to `off`.

## Sensitive data

The data that is sent as part of Redocly telemetry goes through an additional step that ensures that secrets and other sensitive data are not included.
