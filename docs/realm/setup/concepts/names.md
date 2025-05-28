---
seo:
  title: Names
---

# Effective names

Naming can be a challenging task, whether it's naming a child, a file, an image, an API, a path, a parameter, or a property.

## Key principles of naming

To create effective names, it's important to follow these basic principles: consistency, meaning, and readability.

### Consistency

Names should adhere to consistent strategies in terms of length, casing, and word types for any given type of data being named.
Adhering to a consistent strategy will help users understand the structure and logic behind the naming convention.

### Choose meaningful names

Names should serve as signposts, guiding users to understand if they are in the right context.
A meaningful name can provide crucial information about the item or concept it represents.

### Readability

Names should be easy to read and comprehend.
Complex or difficult-to-read names increase the likelihood that users will misinterpret or ignore the name, reducing its effectiveness in communication.

## The limitations of names

Names have their limitations; it is essential to be aware of what names aren't.

### Not unique

Names are not inherently unique.
Although identifiers, such as full file paths or combinations of personal information, can provide uniqueness, names alone often lack this quality.
However, that doesn't mean names aren't useful; they still serve as essential communication tools.

Examples:

```treeview
payments/openapi.yaml
loans/openapi.yaml
```

- Adam Altman (full name)
- Fraud Engine (product name)
- New Hope (Movie and product name)

### The role of explanations

Names identify things, while descriptions explain them.
A perfect name that requires no explanation is rare.
While it's crucial to invest time in creating effective names, it's equally important to recognize that names alone may not provide sufficient context.
Additional information, such as descriptions or related data, can help users fully understand the named item or concept.

## Summary

The art of effective naming is a critical skill that can enhance organization and communication.
By following the principles of consistency, meaning, and readability, and understanding the limitations of names, we can create more effective and useful naming systems.

## Applications in Redocly

Redocly can help enforce naming through [lint rules](https://redocly.com/docs/cli/rules/).

In addition, Redocly uses names to categorize and organize information.
File names and paths influence the URL routes for corresponding content.

Having identical full paths is impossible.
Yet, having near identical names can also be confusing to users.
Use precautions and judgement to resolve confusion.

Redocly also uses names in search.
The more unique names are, the easier it is search on them.
In search, the term is selectiveness.

Names and selectiveness are crucial in building search indexes, as they directly impact the efficiency, relevance, and user experience of the search system.
Here's how they play a significant role:

1. Names: The quality of naming in a search index affects the search process in several ways:
   - a. Relevance: Effective naming ensures that indexed items have meaningful and descriptive names, making it easier for search algorithms to match user queries with relevant results.
     - b. Clarity: Well-named items help users quickly understand and assess the relevance of search results, leading to a better user experience.
   - c. Consistency: Consistent naming conventions across the index help maintain a coherent structure, enabling search algorithms to process and rank results more efficiently.
1. Selectiveness: Being selective in building search indexes is essential for optimizing the search process:
   - a. Index size: Being selective about what to include in the index helps maintain a manageable size, reducing storage requirements and improving search performance.
   - b. Query speed: A selective index that only includes relevant and valuable data ensures that search algorithms can process queries faster, leading to quicker response times for users.
   - c. Precision: By focusing on indexing the most pertinent information, a selective search index can deliver more accurate and relevant search results.
   - d. Noise reduction: Selectiveness helps to filter out irrelevant or low-quality data, reducing the noise that can negatively impact search results and overall user experience.

In summary, effective naming and selectiveness are crucial factors in building search indexes.
They contribute to the efficiency, relevance, and user experience of the search system, enhancing the overall performance and utility of the search engine.
