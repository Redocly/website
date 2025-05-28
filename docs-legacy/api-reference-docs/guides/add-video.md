---
seo:
  title: Add a video to your reference docs
---

# Add a video to Reference docs

Redocly enables you to add an external video to your API reference documentation. This page describes how to add a video from an external source (YouTube, Loom etc) to your reference docs.

You can link to a video in Markdown-supported `description` properties and in any Markdown file referenced in your OpenAPI definition. You cannot insert video files directly into the API definition file - the video must be hosted on a service that provides you with an embed code or link.

## Prerequisites

You need the embed code from YouTube (or other sources like Loom). For more information on how to retrieve:

- YouTube video embed code, see [Embed YouTube video](https://support.google.com/youtube/answer/171780)
- Loom video embed code, see [Embed Loom video](https://support.loom.com/hc/en-us/articles/360002208317-How-to-embed-your-video-into-a-webpage)

## Add a video to your reference docs

1. Open the Markdown page where you want to add the video in the reference docs.
2. Copy the embed code for the video from YouTube (or other sources).
3. Add the following text in your Markdown page where you want to add the video:

```markdown
# Embedded video

<iframe width="560" height="315" src="<**your video embed code**>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

For an OpenAPI document, you can also edit the relevant Markdown-supported description property with the embed code.

```yaml
openapi: 3.1.0
info:
  version: '2.1'
  title: Example REST API
  termsOfService: 'https://www.example.com'
  description: >
    # Introduction

    The Example API is built on HTTP.

    ## Embedded video

    <iframe width="560" height="315" src="<**your video embed code**>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    ## Learn more
servers:
(...)
```

{% admonition type="info" name="Tip" %}
You can edit video properties as required, including width and height properties. Redocly supports all [standard iframe attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).
{% /admonition %}

4. Save changes to your Markdown file or OpenAPI definition, and rebuild your Reference docs.

## Example - Embedded video

To see an example of how the video is rendered in the reference docs, refer to the [Redocly embedded video](https://preview.redoc.ly/proud-starfish-69/video-test/) demo.
