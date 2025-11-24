---
template: ../@theme/templates/BlogPost
title: The rise of interactive documentation
description: Learn how interactive documentation is revolutionizing technical writing, empowering developers with immersive learning experiences and dynamic content.
seo:
  title: The rise of interactive documentation
  description: Learn how interactive documentation is revolutionizing technical writing, empowering developers with immersive learning experiences and dynamic content.
author: taylor-krusen
publishedDate: "2024-09-18"
categories:
  - developer-portal
  - docs-as-code
  - technical-documentation:docs-ux
image: blog-7.jpg
---
When today's learners consume technical knowledge, they don't just read; they interact.

In the fast-moving world of technical writing and software, static documentation is no longer enough.
Modern developers expect more than text on a page; aim for a dynamic, interactive experience that bridges the gap between theory and practice.

In this blog post, we'll explore how modern documentation is evolving to more effectively teach and empower developers in their learning journey using interactivity.

## From static to dynamic

Documentation isn't a one-way street of information anymore.
New tools empower authors to craft learning experience where learners _participate_.
This shift from static to dynamic content represents an important, fundamental change in how developers consume and interact with technical information.

In addition to text, modern docs might use a variety of interactive elements:

- Live API clients
- Embedded multimedia content
- Responsive diagrams and visuals
- Interactive code sandboxes

These features do more than present information; they invite developers to engage, tinker, and learn by _doing_.
This hands-on approach to learning improves engagement, comprehension, and retention.

> I hear and I forget. I see and I remember. I do and I understand.
> - Xunzi

## Components as authoring tools

There's more to this evolution of technical writing than adding interactivity for readers.
It's also about empowering authors with new ways to create content, manage documentation, and craft _learning experiences_.

New tools unlock the ability to build custom components and _expose them as authoring tools_.
These authoring tools unlock new capabilities that allow writers to produce dynamic, interactive technical content without ever leaving their Markdown file.

Custom authoring tools serve the following dual purposes:

1. Providing technical writers with powerful, context-specific tools to explain complex concepts.
1. Creating interactive experiences for readers that improve engagement and comprehension.

By **viewing components as authoring tools**, we blur the lines between writing and development, creating mutual benefits for both engineers and authors.
Moving forward, the ability to use (or create) custom authoring tools will become increasingly valuable for technical writers, especially as new tools further bridge the gap between content creation, software development, and knowledge sharing.

## Tools to create interactive documentation

The two leading tools for building interactive documentation are MDX and Markdoc.
Both tools _extend_ Markdown by adding support for custom elements.

### MDX - React components in Markdown

MDX brings support for JSX (React syntax) into your Markdown documents.
That means you can import or build React components, such as an interactive chart, and embed them in your content.
Writing with MDX means using both Markdown syntax and React code inside the same Markdown file.


{% admonition type="info" name="Learn about MDX" %}

    Check out the following resources to learn more about MDX:

    📄 [What is MDX?](https://mdxjs.com/docs/what-is-mdx/) - Explanation and examples of MDX.

    🕹️ [MDX sandbox](https://mdxjs.com/playground/) - Live demo of MDX syntax and rendered output.

{% /admonition %}

### Markdoc - Components built for authors

Markdoc extends Markdown by adding support for a new custom-tag syntax designed to prioritize the authoring experience. By separating code from content, Markdoc empowers writers to use dynamic, interactive elements with less technical expertise required.

{% admonition type="info" name="Learn about Markdoc" %}

    Check out the following resources to learn more about Markdoc:

    📄 [What is Markdoc?](https://markdoc.dev/docs/overview) - Overview and video of Markdoc.

    🕹️ [Markdoc sandbox](https://markdoc.dev/sandbox?mode=preview) - Interactive demo of Markdoc and rendered output.

{% /admonition %}

## Examples of great interactive documentation

Let's explore three great examples using interactive elements in technical writing to create unique, powerful learning experiences.

### React's developer documentation

The [official React documentation](https://react.dev/) combines theoretical concepts with practical, hands-on learning, using the following interactive elements:

- ⭐ Interactive code examples for real-time experimentation in the browser.
  - [JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
  - [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)

- ⭐ Expandable sections to keep users focused on main content.

  - [Guide: Component State](https://react.dev/learn/state-a-components-memory#giving-a-component-multiple-state-variables)

- ⭐ Clear explanations with visual aids to illustrate complex concepts.

  - [Passing data with context](https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props)
  - [Your UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree#your-ui-as-a-tree)

By combining interactive elements with well-structured content, the React documentation empowers readers at all levels of technical expertise.

### Josh Comeau's blog posts

[Josh Comeau's blog](https://www.joshwcomeau.com/) turns challenging technical topics about CSS and React into an enjoyable, game-like experience, using the following interactive elements:

- ⭐ Animated transitions, colorful illustrations, and playful design elements.

  - [Animated Pride Flag](https://www.joshwcomeau.com/animation/pride-flags/)
  - [Using CSS :has](https://www.joshwcomeau.com/css/has/)

- ⭐ Interactive visualizations and diagrams.

  - [Interactive Guide to CSS Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/)
  - [Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)

- ⭐ Live, editable code examples with instant visual feedback.

  - [Snappy UI Optimization](https://www.joshwcomeau.com/react/use-deferred-value/)

Josh's unique approach combines clear explanations, visual metaphors, and hands-on interactivity to create a deeply immersive learning experience that makes complex topics feel approachable.

### Stripe's product documentation

[Stripe's documentation](https://docs.stripe.com/) provides a streamlined path to feature testing and implementation, using the following interactive elements:

- ⭐ API experimentation _within the documentation_.

  - [Get started with Stripe shell](https://docs.stripe.com/stripe-shell/launch)
  - [Checkout quickstart](https://docs.stripe.com/checkout/quickstart)

- ⭐ Step-by-step guides with assisted navigation and progress indicators.

  - [Interactive webhook builder](https://docs.stripe.com/webhooks/quickstart)

- ⭐ Context-specific code examples based on user settings (for example, preferred programming language).

  - [Custom payment flow](https://docs.stripe.com/payments/quickstart)

Stripe's documentation uses interactive elements to create thoughtful, well-crafted feature onboarding flows that significantly reduce friction between reading docs and real-world implementation.

## Challenges of interactive documentation

Interactive elements can be valuable, but come with their own set of challenges:

- **Engineering cost** - Interactive elements require web development skills and increase the complexity of your documentation system.

- **Maintenance** - As products evolve, keeping interactive elements up-to-date takes more effort than static documentation.

- **Performance impact** - Heavy use of interactive elements can cause poor performance, especially on slower connections.

- **Cognitive load** - Too many (or too confusing) interactive elements risks distracting users from core content.

The key is to strike a balance, starting with simple enhancements and gradually introducing more complex features as needed.
Always prioritize the reader's learning experience and ensure that interactivity serves to clarify, not complicate.

## Best practices for interactive documentation

Implement interactive elements _thoughtfully_ to improve the effectiveness of your documentation.
The following list offers some best practices:

- **Purposeful interactivity** - Add interactive elements that genuinely _provide value_, not for the sake of novelty.

- **Accessibility first** - Ensure _all_ interactive elements are usable by everyone and work with assistive technologies.

- **Meaningful visual aids** - Use images, diagrams, and videos that improve comprehension (always with alt text).

- **Prioritize the user** - Tailor content and features to your users' needs and technical skills.

- **Measure impact** - Track engagement and regularly analyze how interactive elements impact your users and their journey.

## The future of technical writing

Evolving user needs and promising authoring tools have pushed technical content from static to dynamic; an evolution that empowers both writers and readers in the following ways:

- Writers gain more control over the user experience with custom authoring tools that render dynamic, interactive elements.
- Readers benefit from a more engaging, hands-on learning experience tailored to their needs.

As documentation continues to evolve, you can expect to see even more innovative ways to blend content with interactivity, further blurring the lines between documentation, tutorials, and interactive learning platforms.

**The future of developer documentation is dynamic, interactive, and user-centric**.
By thoughtfully incorporating interactive elements, technical writers can create documentation that not only informs but truly empowers developers to learn, experiment, and build with confidence.

## Learn more

📣 We're building [something amazing](https://redocly.com/realm). Sign up for our [waitlist](https://auth.cloud.redocly.com/registration) and help us build the future of documentation.

📺 [Code in Content: Interactive Elements in your Tech Writing](https://www.youtube.com/watch?v=jsv8eYNRCKw) - Watch this session from Write the Docs 2024 for a deeper dive into interactive docs.
