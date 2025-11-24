---
template: ../@theme/templates/BlogPost
title: Two approaches to API design - Resources vs Workflows
description: Exploring resource-first and workflow-first approaches to API design, and why thinking about use cases early can lead to better APIs.
seo:
  title: Two approaches to API design - Resources vs Workflows
  description: Exploring resource-first and workflow-first approaches to API design, and why thinking about use cases early can lead to better APIs.
  image: ./images/api-design-approaches.png
author: adam-altman
publishedDate: "2025-10-28"
categories:
  - api-lifecycle:design
image: api-design-approaches.png
---
When designing a new API, there's a fundamental choice that shapes everything that follows: where do you start?
Do you begin by modeling your domain with resources and schemas, or do you start by mapping out the workflows and use cases your API needs to support?

Both approaches can lead to successful APIs, but they often result in very different designs.
Let's explore these two philosophies and understand when each makes sense.

## The resource-first approach

The resource-first (or schema-first) approach is perhaps the most intuitive starting point for API design.
You begin by identifying the key entities in your domain and modeling them as resources.

### How it works

1. **Identify your domain entities**: What are the "nouns" in your system? Users, orders, products, invoices, etc.
2. **Define schemas**: Create detailed data models for each resource with all their properties
3. **Add CRUD operations**: Implement standard HTTP methods for each resource:
   - `POST /users` - Create a new user
   - `GET /users/{id}` - Get a specific user
   - `GET /users` - List all users
   - `PUT /users/{id}` - Update a user
   - `DELETE /users/{id}` - Delete a user

This approach feels natural because it mirrors how we think about databases and object-oriented programming.
Each resource gets its own set of endpoints, and the API becomes a direct interface to your data model.

### The strengths

- **Predictable and consistent**: Once developers understand one resource, they can guess how others work
- **Easy to document**: Each resource follows the same pattern
- **Straightforward implementation**: Often maps directly to database tables and ORM models
- **RESTful**: Aligns well with REST principles and resource-based thinking

### The challenges

However, this approach has some inherent limitations:

- **Not all operations fit CRUD**: Real-world use cases often require operations that don't map cleanly to create, read, update, or delete
- **Multiple calls for common workflows**: Simple user tasks often require chaining multiple API calls together
- **Over-fetching or under-fetching**: Resources designed in isolation may not contain the right data for actual use cases
- **Implementation details leak**: The structure of your database or domain model becomes visible in your API, making it harder to evolve

## The workflow-first approach

The workflow-first approach flips the script.
Instead of starting with what you have (your data model), you start with what users need to do.

### How it works

1. **Identify key use cases**: What are the main jobs users are trying to complete with your API?
   - "Check out a shopping cart"
   - "Onboard a new employee"
   - "Generate a monthly report"
2. **Map out the workflow**: For each use case, what's the ideal sequence of operations?
3. **Design endpoints to support workflows**: Create API operations that align with these real-world tasks
4. **Model resources to support the workflows**: Design your data structures based on what the workflows need

This approach prioritizes the developer experience and real-world usage patterns over internal implementation details.

### The strengths

- **Optimized for actual use**: Your API is designed around what people actually need to do
- **Fewer round trips**: Complex operations can be accomplished in one or two calls instead of many
- **Better performance**: You can optimize for the actual data needed in each workflow
- **More intuitive**: The API reflects the user's mental model, not your database schema
- **Easier to evolve**: Because workflows are separate from your data model, you can refactor internal structures without breaking the API

### The challenges

- **Less predictable**: Each endpoint might work differently based on its specific use case
- **Requires deeper domain knowledge**: You need to really understand how your API will be used
- **Can become RPC-style**: If taken too far, you might end up with an action-based API that abandons REST principles entirely
- **More upfront design work**: Understanding workflows takes time and user research

## Finding the balance

In practice, the best APIs often blend both approaches.
Here's how you might combine them:

### Start with workflows, validate with resources

1. **Map your key workflows first**: Understand the 3-5 most important use cases
2. **Design endpoints for those workflows**: Create operations that make those use cases efficient
3. **Identify common resources**: Look for entities that appear across multiple workflows
4. **Add standard CRUD where it makes sense**: For resources that benefit from direct manipulation, provide standard endpoints

### Use Arazzo to document workflows

Even if you start with a resource-first design, you can layer workflow thinking on top using the [Arazzo specification](https://redocly.com/learn/arazzo/what-is-arazzo).
Arazzo lets you describe sequences of API calls as workflows, helping developers understand how to accomplish real-world tasks.

This gives you the best of both worlds:
- A clean, resource-based API structure
- Clear documentation showing how to combine those resources for common use cases

## Real-world example

Let's say you're building an e-commerce API.

**Resource-first thinking** might give you:
```txt
POST   /carts
POST   /carts/{id}/items
GET    /carts/{id}
POST   /orders
PUT    /orders/{id}
POST   /payments
GET    /orders/{id}
```

To complete a purchase, developers need to:
1. Create a cart
2. Add items to the cart
3. Get the cart to show totals
4. Create an order from the cart
5. Create a payment
6. Check the order status

That's six API calls for one user workflow.

**Workflow-first thinking** might give you:
```txt
POST   /checkout
GET    /orders/{id}
```

The `/checkout` endpoint accepts all the information needed (items, shipping, payment) and handles the entire workflow in one operation, returning the completed order.

You might still have resource endpoints for managing products, viewing order history, etc., but the critical checkout workflow is optimized.

## When to use each approach

### Use resource-first when:
- You're building an internal API where consumers understand your domain model
- Your API is essentially a database interface
- Your resources have well-defined, independent lifecycles
- You need maximum flexibility in how data is accessed and combined

### Use workflow-first when:
- You're building a public API for external developers
- You have well-defined use cases and user journeys
- Performance and efficiency matter (minimizing round trips)
- You want to hide implementation complexity

### Use both when:
- You're building a mature, production API (most of the time!)
- You want to support both simple operations and complex workflows
- You have both power users (who want fine-grained control) and beginners (who want simplicity)

## Conclusion

There's no universally "right" way to design an API.
The resource-first approach offers consistency and predictability, while the workflow-first approach optimizes for real-world usage and developer experience.

The key is to be intentional about your choice.
Don't just default to CRUD endpoints because that's what you've always done.
Take time to understand how your API will actually be used, identify the critical workflows, and design an API that makes those workflows efficient and intuitive.

Your API consumers will thank you for it.

---

*What approach do you take when designing APIs?
Have you found success with workflow-first design?
We'd love to hear about your experiences.*
