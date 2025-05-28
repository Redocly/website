# Use mTLS with Respect in Redocly CLI

Respect supports Mutual TLS (mTLS) authentication when running API tests.
This feature enables you to securely authenticate with servers that require client certificates.

## What is mTLS?

Mutual TLS (mTLS) is a two-way authentication process where both the client and server present certificates to verify their identity.
This authentication method provides an additional layer of security beyond the standard TLS/SSL.

## Using mTLS with Respect

When running tests with Respect in Redocly CLI, provide the necessary certificates using the following command-line options:

```bash
npx @redocly/cli respect FILE_PATH.yaml --client-cert <client-cert> --client-key <client-key> --ca-cert <ca-cert>
```

Replace `<client-cert>`, `<client-key>`, and `<ca-cert>` with the actual paths or valid stringified values to your client certificate, client key, and CA certificate files.

## Available options

- `client-cert`: Path to the client certificate file.
- `client-key`: Path to the client key file.
- `ca-cert`: Path to the CA certificate file (optional).

## Example

```bash
npx @redocly/cli respect api-tests.arazzo.yaml \
--client-cert ./certs/client-cert.pem \
--client-key ./certs/client-key.pem \
--ca-cert ./certs/ca-cert.pem
```

Or by using environment variables:

```bash
REDOCLY_CLI_RESPECT_CLIENT_CERT="-----BEGIN PRIVATE KEY-----YOUR_CLIENT_CERT-----END PRIVATE KEY-----" REDOCLY_CLI_RESPECT_CLIENT_KEY="-----BEGIN PRIVATE KEY-----YOUR_CLIENT_KEY-----END PRIVATE KEY-----" REDOCLY_CLI_RESPECT_CA_CERT="-----BEGIN CERTIFICATE-----YOUR_CA_CERT-----END CERTIFICATE-----" npx @redocly/cli respect api-tests.arazzo.yaml
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
