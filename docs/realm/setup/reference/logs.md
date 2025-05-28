# Project Logs

You can control the format of project logs. Currently two formats are supported: plain text (default) and JSON. To enable JSON logs format, set `PORTAL_LOG_FORMAT` environment variable with value `JSON`:

```text
PORTAL_LOG_FORMAT=JSON
```

## Examples

### Plain text

```text
[info] time="2023-05-31T18:03:43.477" msg="Starting portal develop mode."
[info] time="2023-05-31T18:03:43.516" msg="Content scan finished" dur="38ms"
[info] time="2023-05-31T18:03:43.713" msg="Processing scorecard..."
[info] time="2023-05-31T18:03:43.744" msg="Scorecard processed" dur="31ms"
[info] time="2023-05-31T18:03:44.038" msg="Creating default redirect for index page => /get-started/"
[info] time="2023-05-31T18:03:49.158" msg="Server compiled" dur="1369ms"
[info] time="2023-05-31T18:03:49.292" msg="Client compiled" dur="1503ms"
[success] time="2023-05-31T18:03:49.294" msg="Server started: http://127.0.0.1:3000"
[success] time="2023-05-31T18:03:49.294" msg="No errors found"
```

### JSON

```json
{"time":"2023-05-31T18:07:50.749","level":"INFO","message":"Starting portal develop mode."}
{"time":"2023-05-31T18:07:50.789","level":"INFO","message":"Content scan finished","duration":39.20954200066626}
{"time":"2023-05-31T18:07:50.985","level":"INFO","message":"Processing scorecard..."}
{"time":"2023-05-31T18:07:51.017","level":"INFO","message":"Scorecard processed","duration":32.29391700029373}
{"time":"2023-05-31T18:07:51.285","level":"INFO","message":"Creating default redirect for index page => /get-started/"}
{"time":"2023-05-31T18:07:56.280","level":"INFO","message":"Server compiled","duration":1398.7201669998467}
{"time":"2023-05-31T18:07:56.348","level":"INFO","message":"Client compiled","duration":1466.476584000513}
{"time":"2023-05-31T18:07:56.351","level":"SUCCESS","message":"Server started: http://127.0.0.1:3000"}
```
