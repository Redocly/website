# Use mTLS with Respect in Redocly CLI

Respect supports Mutual TLS (mTLS) authentication when running API tests.
This feature enables you to securely authenticate with servers that require client certificates.

## What is mTLS?

Mutual TLS (mTLS) is a two-way authentication process where both the client and server present certificates to verify their identity.
This authentication method provides an additional layer of security beyond the standard TLS/SSL.

## Using mTLS with Respect

When running tests with Respect in Redocly CLI, provide the necessary certificates using the following command-line options:

```bash
npx @redocly/cli respect FILE_PATH.yaml --mtls='{"<domain>":{"ca-cert":"<client-cert>","client-key":"<client-key>","client-cert":"<ca-cert>"}}'
```

Replace `<domain>',`<client-cert>`,`<client-key>`, and`<ca-cert>` with the actual paths or valid stringified values to your client certificate, client key, and CA certificate files.

## Available options

- `--mtls`: JSON configuration for mTLS certificates per domain. The JSON should contain server URLs as keys, with certificate paths as values.
  - `ca-cert`: Path to the CA certificate file (optional).
  - `client-key`: Path to the client key file.
  - `client-cert`: Path to the client certificate file.

## Example

```bash
npx @redocly/cli respect api-tests.arazzo.yaml --mtls='{"https://localhost:3443":{"ca-cert":"./certs/ca-cert.pem","client-key":"./certs/client-key.pem","client-cert":"./certs/client-cert.pem"}}'
```

Or by using environment variables:

```bash
export CLIENT_KEY="-----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----"
export CLIENT_CERT="-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----"
export CA_CERT="-----BEGIN CERTIFICATE-----... -----END CERTIFICATE-----"

MTLS_CONFIG=$(jq -n \
  --arg clientKey "$CLIENT_KEY" \
  --arg clientCert "$CLIENT_CERT" \
  --arg caCert "$CA_CERT" \
  '{"https://localhost:3443": {"client-key": $clientKey, "client-cert": $clientCert, "ca-cert": $caCert}}')


npx @redocly/cli respect api-tests.arazzo.yaml --mtls="$MTLS_CONFIG"
```

## Multiple servers example

You can configure mTLS for multiple servers in a single command:

```bash
npx @redocly/cli respect api-tests.arazzo.yaml \
--mtls='{"https://localhost:3443":{"ca-cert":"./certs/ca-cert.pem","client-key":"./certs/client-key.pem","client-cert":"./certs/client-cert.pem"},"https://localhost:3543":{"ca-cert":"./certs-2/ca-cert.pem","client-key":"./certs-2/client-key.pem","client-cert":"./certs-2/client-cert.pem"}}'
```

This command runs the API tests specified in `api-tests.arazzo.yaml` using the provided client certificate, client key, and CA certificate.

## Certificate file formats

The certificates must be in PEM format.
Make sure you have the following files ready:
- Client certificate (public key)
- Client private key
- CA certificate (if using a custom Certificate Authority)

## Security considerations

- Keep your client private key secure and never commit it to version control
- Ensure certificates are stored with appropriate file permissions
- Use environment variables or secure secret management for sensitive certificate paths in CI/CD pipelines
