# Make docs AI ready

Your readers no longer arrive only through a browser.
They ask AI assistants questions, and their agents query your documentation directly.
Realm serves both: it answers questions inside your site, and it exposes your content to external AI tools in formats they consume.

## Answer questions inside your site

Readers ask a question and get an answer grounded in your documentation.

- **[AI assistant configuration](../config/ai-assistant.md)** - Enable and configure the AI assistant on your site
- **[AI assistant web component](../ai-assistant-web-component/ai-assistant-web-component.md)** - Embed the assistant in your own applications outside the docs site

## Serve your docs to agents

External AI agents and coding assistants connect to your documentation and query it as a data source.
Realm also creates an `llms.txt` file for your site.
It lists your pages and links a clean Markdown copy of each, in the [llmstxt.org](https://llmstxt.org) format that LLM tools read.
For a real one, see [Redocly's llms.txt](https://redocly.com/llms.txt).

- **[Agent skills](../customization/agent-skills/index.md)** - Package task instructions that agents load on demand
- **[llms.txt configuration](../config/seo.md#llmstxt-object)** - Set the file's title, description, and sections, or turn it off
- **[MCP servers](../customization/mcp-server/index.md)** - Serve your documentation and APIs over the Model Context Protocol
- **[x-mcp extension](../content/api-docs/openapi-extensions/x-mcp.md)** - Control how API operations appear to MCP clients
- **[Page actions](../config/navigation.md#pageaction-object)** - Copy or view any page as Markdown, ask ChatGPT or Claude about it, or connect an editor to your MCP server

## Resources

- **[AI governance FAQ](../faq/ai-governance.md)** - Answers for security and compliance reviews of Redocly AI features
- **[Tune search and SEO](../search-and-seo/index.md)** - Help people and search engines find your documentation
