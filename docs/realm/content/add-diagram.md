# Add diagrams using Mermaid

Redocly projects have built-in support for the [Mermaid](https://mermaid.js.org/) diagramming and charting tool.
Use Mermaid to add diagrams, charts and other visualizations to your pages.

Adding diagrams can help your users to quickly grasp the structure or concept that your content conveys.
It's good practice to use diagrams alongside explanatory text to make sure that all users can access the information.

## Add a flowchart

Create your first Mermaid diagram, a flowchart, by copying the following snippet and adding it to a page in your own project:

````text
```mermaid
graph LR;
  Design --> Lint
  Design --> Preview
  Lint --> Publish
  Preview --> Publish
```
````

The diagram that is produced looks like the following:

```mermaid
graph LR;
  Design --> Lint
  Design --> Preview
  Lint --> Publish
  Preview --> Publish
```

Use the special code markup to indicate where in the content the diagram starts and ends.

## Add a piechart

Most of the chart types are supported, for example the following snippet shows a pie chart:

````text
```mermaid
pie showData
    title Team pets
    "Dog": 15
    "Rabbit": 8
    "Cat": 5
    "Shark": 1
```
````

When added to your own content, the output shows up like the following diagram:

```mermaid
pie showData
    title Team pets
    "Dog": 15
    "Rabbit": 8
    "Cat": 5
    "Shark": 1
```

Most chart types are supported; sometimes there is a delay before adding the very newest ones, so let us know if there's something you'd like to use that hasn't been added yet.

## Resources

- **[Mermaid documentation](https://mermaid.js.org/intro/#diagram-types)** - Complete guide to creating flowcharts, pie charts, sequence diagrams, and other visualizations with Mermaid syntax
- **[Navigation configuration](../navigation/index.md)** - Configure site navigation, menus, and page organization to help users discover your diagram content
