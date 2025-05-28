---
seo:
  title: Evaluating Markdoc for your documentation
  description: Evaluate the benefits and tradeoffs of adopting Markdoc for your technical writing and documentation.
---

# Evaluate Markdoc for your documentation

For folks working with documentation, [Markdoc](https://markdoc.dev/) is an important evolution in technical writing. Markdoc is a Markdown-based markup language that gives writers a new level of control and flexibility over technical content.

This guide introduces and explores Markdoc through the lens of adopting it as a writing tool for your documentation. It covers benefits, tradeoffs, and provides guidance around successful adoption.

## Consider your documentation needs

You have a platform for your technical documentation. Where do your documentation stakeholders have unmet needs?

For most teams, writing tools (like Markdown) start to fall short as technical documentation becomes more complex. Technical writers need the flexibility to meet more use cases. For example, a writer might need:

- Tighter control over content structure or composition
- Dynamic or tailored content
- Business logic baked into the page
- Advanced formatting of elements
- Interactive elements for user interaction

Because the needs around documentation are complex, authoring tools continue to evolve. In May of 2022, Stripe open sourced [Markdoc](https://markdoc.dev/), which they built in-house to empower their own technical writers managing the product documentation.

## Benefits of Markdoc

Markdoc enhances Markdown by adding support for customizable, interactive elements that make building technical documentation more efficient and versatile. If you're part of a team managing technical documentation, then adopting Markdoc can add tremendous value by improving collaboration and providing your writers better tools.

{% admonition type="info" %}
You can learn more about Markdoc in our guide: [Markdown for Writers](index.md)
{% /admonition %}

### Improve collaboration on documentation

Markdoc's design inherently supports and enhances collaboration for both authors _and_ developers. Some of the ways it does that:

- **Customizable writing tools** - Markdoc provides a _system of extensibility_ that teams can use to tailor their documentation to their requirements and preferences. Better writing tools also make authors more productive and happy!

- **Separation of concerns** - Markdoc enforces separation between code and content. Authors benefit from the custom tools and capabilities without having to see or touch the implementation.

  - Developers build custom React components and define schemas to expose them as Markdoc tags.
  - Authors use Markdoc's tag syntax to add those components to their documents.

- **Align engineering with documentation** - For teams already using React for their product or front end, Markdoc allows them to benefit from existing work. Reusing existing components can improve the quality of the documentation and create a more consistent look and feel.

- **Built-in validation** - Markdoc provides schema validation out-of-the-box, so writers get instant feedback when using tags incorrectly. Additionally, developers can add custom validation to tags and give authors more useful feedback.

Markdoc can make contributing to the documentation a more rewarding experience for all documentation stakeholders, which leads to better docs. Technical documentation becomes truly exceptional when you can cultivate a sense of shared ownership.

### Empower technical writers with Markdoc

Markdoc was specifically designed around the _needs of technical writers_. Markdoc gives authors much more control and flexibility over content while minimizing the complexity that typically comes from mixing code with content.

Some ways that Markdoc helps writers:

- **Familiar syntax** - Markdoc _extends_ basic Markdown by adding support for "tags", allowing authors to write with a familiar syntax while providing access to tools that can handle more complex needs.
- **Control display logic** - Authors can add custom logic into their documents using tags. This is especially useful for personalized or interactive documentation (i.e. tutorials or guides that require user action).

- **Custom tags** - Using Markdoc tags, authors can integrate custom components directly into their documents, allowing them to add features that enhance user experience (i.e. diagrams, forms, embeddable widgets). Developers can build new tags for authors to use as their needs evolve.

Markdoc has potential to create lots of value for teams managing documentation, but changing your writing tool is a big decision with big implications. It's important to be pragmatic in your evaluation.

## Evaluate the Markdoc tradeoffs

As a technical writer, you _should_ learn and use Markdoc. It's an important evolution in writing technology that can help you grow as a writer. However, whether you decide to adopt Markdoc to maintain public-facing documentation warrants deeper thinking.

Your documentation stakeholders have unique needs and you'll have other tradeoffs to consider, but we wanted to give you a push in the right direction. These are some of the tradeoffs you should think about:

**Complexity vs functionality** - More advanced features means increased complexity. Evaluate your team's skills around writing and development. _Can_ you use the advanced features effectively? Do you have engineers that could build tags and can your writers learn to use them?

**Performance implications** - More dynamic and interactive features could impact performance. Markdoc performs much better than MDX, but it should still be considered. Are there pages where functionality improvements aren't worth _any_ kind of performance impact?

**Integration with existing docs workflow** - Think about how well Markdoc integrates with your current tools and processes. The transition should enhance your doc process, not disrupt it.

**Learning curve** - Adopting Markdoc means learning Markdoc syntax and features for writers _and_ developers. That takes time and investment, especially for bigger teams used to Markdown. You should plan to invest in training.

## Transition from Markdown to Markdoc

Pretend you've made the decision to adopt Markdoc for your documentation. Commendable choice -- Redocly approves!

The goal should be to enhance your documentation _effectively_, adding enhancements that improve the experience of your authors, developers, and users. You should be _thoughtful_ in your transition from Markdown to Markdoc. Making deliberate, planned decisions at this stage can be the difference between success and failure.

Consider the following strategies when planning your transition:

1. **Identify opportunities for enhancement**

Review your documentation for areas of high complexity or friction. Look for places where better formatting, content display logic, or more user engagement could be beneficial. Make a list to track those opportunities and discuss them with your team.

When looking for enhancements, consider who would this change help and why? For example, would a visual element aid user comprehension? Would defining a new Markdoc tag make authors more productive?

2. **Prioritize _high-impact_ upgrades**

Start with the sections of your documentation that are the most important. These could be resources that are popular, essential to understanding your product, or are accessed by customers during an important stage of their journey. Enhancements in these areas have the most potential to improve the experience for users producing and consuming your documentation.

{% admonition type="info" %}
Markdoc is a powerful tool, but it's most valuable when used thoughtfully. _Effective_ documentation is more important than _engaging_ documentation.
{% /admonition %}

## Adopt Markdoc for your documentation

Markdoc is a major step forward in the evolution of technical writing that unlocks exciting, new capabilities that improve the effectiveness of your documentation. By adopting Markdoc, you're not just updating a tool; you're upgrading your team's ability to collaborate, innovate, and communicate complex information. When considering the benefits and tradeoffs of Markdoc, think about how the capabilities can transform your documentation process and make your team more productive.

Want to keep learning about Markdoc? Try these resources:

- [Markdoc Overview](index.md)
- [Write with Markdoc](./write-with-markdoc.md)
