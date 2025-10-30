---
seo:
    title: Use AI to accelerate and improve reviews
    description: Practical ways to use AI for reviewing style, API design, naming, structure, and content before implementation.
---

# Use AI to accelerate and improve reviews

AI excels at catching patterns, inconsistencies, and gaps that humans might miss during reviews.
This article focuses on **what** to review with AI, not **how** to automate it — though most of these techniques work well in CI/CD pipelines.

The key is providing enough context so AI can be genuinely helpful, not just superficial.

---

## Review against your style guide

One of the most practical uses of AI is enforcing style consistency across documentation.

### How to do it effectively

Share your style guide with the AI and ask it to review content against those rules.

**Critical tip:** Shorter style guides perform better than longer ones — just like with human reviewers.
A 50-page style manual is hard to apply consistently. A one-page checklist gets better results.

### Example checklist format

Instead of:
> "Use active voice. Passive voice makes documentation harder to read and can obscure who is responsible for actions. Technical documentation should clearly indicate the actor performing each action..."

Use:
```markdown
- [ ] Active voice (e.g., "The API returns..." not "Data is returned...")
- [ ] Present tense for current features
- [ ] Use "you" to address the reader
- [ ] Code elements in backticks: `GET /users`
- [ ] No future tense ("will") unless describing unreleased features
```

Checklists outperform prose-heavy guidelines.

### Real example: Redocly changelog reviews

At Redocly, we automatically review every changelog entry with AI before merging:

1. Developer writes a changelog entry in the pull request
2. AI reviews it against our style checklist and the PR context
3. If it passes: "✅ Good job on the changelog."
4. If it needs work: AI posts a GitHub suggestion with the improved version and explains why

**Before AI review:**
> "Fixed bug in API"

**After AI review:**
> "Fixed authentication timeout in OAuth2 flow when refresh tokens exceed 60-minute expiration window"

The AI catches vague language, adds specificity, and ensures consistency — all before a human reviewer even looks at the PR.

---

## Review API design before implementation

This is where AI can save you from costly mistakes.

Before writing any code, share your API design (OpenAPI description, schema draft, or even just endpoint descriptions) with an AI and ask it to find gaps and problems.

### Provide domain context

Generic reviews aren't helpful. You need to give AI enough context about your domain:

```markdown
Context: We're building a library management system. 
Users are librarians and patrons. 
Key workflows: checking out books, managing holds, handling fines.

Review this API design for gaps and inconsistencies:
[paste your OpenAPI spec or design notes]
```

### What AI can catch

- **Missing endpoints:** You have `POST /checkout` but no `POST /checkin`
- **Inconsistent patterns:** Some endpoints use `/resource/{id}` while others use `/resource?id=`
- **Forgotten edge cases:** What happens when a patron has unpaid fines? Is there a way to check fine balance?
- **Domain gaps:** You can place a hold, but can you cancel it? Can you see your hold queue position?

I've used this successfully to find **entire sections of forgotten domain areas** that would have only surfaced during QA or alpha-testing — when they're much more expensive to fix.

### Example prompt

```markdown
You are reviewing an API design for [domain description].

Please identify:
1. Missing CRUD operations (if we can create X, can we read/update/delete it?)
2. Incomplete workflows (are there dead-ends where users get stuck?)
3. Naming inconsistencies
4. Edge cases we haven't considered
5. Authentication/authorization gaps

[Paste your API design here]
```

---

## Review property names for clarity and conciseness

Property names are API's user interface. Unclear names lead to support tickets and frustrated developers.

### What to ask AI

Share your schema and ask:
- Are these property names clear to someone unfamiliar with the domain?
- Are any names ambiguous or misleading?
- Could any names be shorter without losing clarity?
- Are we consistent with naming conventions (camelCase vs snake_case, abbreviations, etc.)?

### Example review

**Original schema:**
```json
{
  "usrNm": "string",
  "date": "string",
  "amount": "number",
  "transaction_type": "string"
}
```

**AI feedback:**
- `usrNm` is too abbreviated — use `userName` or `username`
- `date` is ambiguous — date of what? Use `transactionDate` or `createdAt`
- `amount` lacks clarity — is this in cents or dollars? Consider `amountCents` or `amountUSD`
- Inconsistent casing: `usrNm` and `transaction_type` should match. Use `transactionType` if using camelCase.

---

## Review JSON Schema constraints

AI can spot missing or insufficient constraints that would let invalid data through.

### What to review

Share your JSON schema and ask AI to check:
- Are string fields constrained by `minLength`, `maxLength`, or `pattern`?
- Are numeric fields constrained by `minimum`, `maximum`, or `multipleOf`?
- Should any fields be `required`?
- Are enums used where values are limited?
- Are formats specified (email, uuid, date-time)?

### Example

**Original:**
```json
{
  "type": "object",
  "properties": {
    "email": { "type": "string" },
    "age": { "type": "number" },
    "role": { "type": "string" }
  }
}
```

**AI suggests:**
```json
{
  "type": "object",
  "required": ["email", "role"],
  "properties": {
    "email": { 
      "type": "string",
      "format": "email",
      "maxLength": 255
    },
    "age": { 
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "role": { 
      "type": "string",
      "enum": ["admin", "user", "guest"]
    }
  }
}
```

This catches validation issues before they become bugs.

---

## Review content for task completion

Documentation exists to help people accomplish tasks. AI can evaluate whether your content actually supports that goal.

### How to use this

Provide AI with:
1. Your documentation content
2. A list of tasks users need to accomplish with it

Then ask: Does the structure and content support easy task completion? What could make it easier?

### Example prompt

```markdown
Users need to accomplish these tasks:
1. Authenticate with the API
2. Create a new user
3. Update user profile
4. Handle authentication errors

Review this documentation and identify:
- Which tasks are well-supported?
- Which tasks are missing steps or context?
- What would make each task easier to complete?
- Are tasks in a logical order?

[Paste your documentation]
```

### What AI might find

- Task 1 (authentication) is explained, but the example doesn't show where to get API keys
- Task 3 (update profile) doesn't mention which fields are editable vs read-only
- Task 4 (error handling) lists error codes but doesn't explain what action to take for each
- Tasks aren't in the order users would naturally encounter them (should authenticate before creating users)

---

## Review content organization

AI can evaluate whether your file/folder/navigation structure makes sense.

### What to ask

Share your sitemap or folder structure and ask:
- Is this organization intuitive for someone new to the product?
- Are related topics grouped together?
- Is the navigation depth appropriate (not too shallow or deep)?
- Are any sections misplaced?
- Would any content be easier to find with different labeling or grouping?

### Example structure to review

```
docs/
├── getting-started/
├── api-reference/
├── webhooks/
├── authentication/
├── rate-limiting/
├── errors/
└── examples/
```

**AI might suggest:**

```
docs/
├── getting-started/
│   ├── authentication.md     ← moved from root
│   ├── first-api-call.md
│   └── rate-limits.md         ← moved from root
├── api-reference/
│   ├── endpoints/
│   └── errors.md              ← moved from root
├── guides/
│   ├── webhooks.md            ← promoted from root
│   └── examples/              ← moved under guides
└── advanced/
```

The AI can justify each change: authentication and rate-limiting are foundational concepts for getting started; errors are reference material; examples are guides, not standalone concepts.

---

## Automation considerations

While this article focuses on **what** to review rather than **how** to automate, these techniques work well in CI/CD:

- **PR checks:** Review changelog entries, commit messages, or doc changes on every pull request
- **Pre-commit hooks:** Catch style issues before code is even pushed
- **Scheduled reviews:** Periodically review entire doc sets for consistency drift
- **Build-time validation:** Check that new API changes align with existing patterns

The key is making AI reviews **fast and actionable** — provide clear feedback with specific suggestions, not just "this could be better."

---

## Best practices

### 1. Be specific with context
Generic prompts get generic results. The more domain context you provide, the more useful AI's feedback becomes.

### 2. Use checklists, not essays
When providing style guides or review criteria, checklists dramatically outperform prose.

### 3. Review iteratively
Don't try to review everything at once. Focus on one aspect (naming, then constraints, then structure).

### 4. Combine AI with deterministic tools
AI catches subjective issues (clarity, completeness). Linters and validators catch objective ones (syntax, spec compliance). Use both.

### 5. Human judgment is final
AI suggests; humans decide. Not every AI suggestion will be right for your context.

---

## What AI reviews can't replace

AI is excellent at pattern matching and consistency checking, but it can't:

- Understand your product roadmap and strategic priorities
- Make judgment calls about trade-offs
- Validate factual accuracy against your actual implementation
- Understand your specific user needs and constraints

Use AI to accelerate reviews and catch common issues. Use humans for judgment, strategy, and domain expertise.

Together, they make reviews faster and more thorough than either could alone.
