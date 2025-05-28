# Embed Markdown in Redocly API reference docs

Redocly enables you to embed external Markdown file contents into description fields by passing an object to a description with a `$ref` JSON reference.

Sample excerpt of a OpenAPI YAML file:

```yaml
openapi: '3.0.0'
info:
  version: 1.0.0
  title: My example API
  description:
    $ref: /path/to/file.md
```

To learn more about Markdown, visit: [https://spec.commonmark.org/0.29/](https://spec.commonmark.org/0.29/)

## Redocly description tags

There are three special HTML tags supported in the Markdown description.

### Security definitions

Use the “SecurityDefinitions” tag to insert the section about authentication described within the security definitions of your OpenAPI definition.

```markdown
# Authentication

We love security!
<SecurityDefinitions />
```

### Pull Right

Use the “PullRight” tag to pull content into the right-most panel.

```markdown
# Tutorial (displayed in the left navigation)

<PullRight>
This part will appear in the right pane.
</PullRight>

This part is in the body. Lorem ipsum dolor!
```

### Redoc Response

Use the “RedocResponse” tag to insert a section about a response. This is useful for describing errors where you want to link to the documentation directly to a specific error response. It can help you adopt or support problem+json: <https://tools.ietf.org/html/rfc7807>

```markdown
# Errors

We follow the error response format proposed in [RFC 7807](https://tools.ietf.org/html/rfc7807)
also known as Problem Details for HTTP APIs. As with our normal API responses,
your client must be prepared to gracefully handle additional members of the response.

## Unauthorized

<RedocResponse pointer={"#/components/responses/Unauthorized"} />

## AccessForbidden

<RedocResponse pointer={"#/components/responses/AccessForbidden"} />
```
