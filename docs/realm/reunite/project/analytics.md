---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---
# Analytics

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Reunite offers built-in analytics for your projects as an alternative to third-party solutions.
Track page views, identify popular content, and analyze search queries including AI-powered search.
Use these insights to improve user experience and identify documentation gaps.

Reunite collects analytics data on a project basis.
Each project has its own Analytics page.
Data collection begins after you publish your project for the first time.
Newly-deployed projects may take time to generate sufficient data.

## Analytics data collection

Analytics in Reunite help you understand how your documentation is used by tracking:
- page views: counted each time a documentation page is requested
- search queries: recorded when users perform a search, including searches that return no results

This data is collected server-side, directly from web requests.
Reunite logs:
- page paths or search terms
- timestamps of the event
- requests' IP addresses, used for operational purposes such as deduplicating traffic, filtering bots, and ensuring accurate reporting

All data is collected on behalf of your organization and used only to provide aggregated insights in your Analytics dashboard.
Redocly does not use analytics data for advertising or tracking users across sites, and does not attempt to identify individual visitors.

The Analytics page contains collected data with charts for visualization.
The Analytics page is available to users with the admin or maintainer project role.
By default, organization owners and members are assigned the admin role for projects.
If a user’s role is changed to a role other than admin or maintainer, they lose access to Analytics.
Organization owners always retain access.

All elements on the **Analytics** page display the data for the period selected in the date input field top-right corner of the page.
You can change this period by clicking the date input field.

## Pages

The **Pages** section displays a table with the most visited page URLs, and a time series chart of views and unique users.

### Top 5 viewed pages

The **Top 5 viewed pages** table displays the five most visited pages, together with the number of unique users and the number of views for each page.

### Views and users

Click the **View details** button to open **Page views**.

The **Page views** page displays more granular data and offers three different views:

- **Pages:** lists the most visited pages
- **Paths:** lists the most visited URL paths
- **Domains:** lists domains that refer the most traffic to your project

On this page you can:

- change the period for the displayed data
- export the data from the selected period to a CSV file
- search in pages, paths or domains

## Search

The **Search** section displays:
- time series chart with AI searches and unique users
- time series chart with manual searches and unique users
- table with the top search queries

### AI Searches and Users

The **AI Searches and Users** section displays a time series of AI-powered searches in the selected period.

Click the **View details** button to open **AI Search queries**.

The **AI Search queries** page displays granular data on the use of AI-powered search.
Expand each query to see the full question, AI-provided answer, and corresponding sources.

On this page you can:

- change the period for the displayed data
- export the data from the selected period to a CSV file
- view the counts for liked and disliked answers
- filter the results by feedback
- search query text

### Top 5 search queries

The **Top 5 search queries** table displays the five most searched terms, together with the number of unique users and the number of searches for each query.

You can use the toggle in the top-right corner of the table to switch the displayed data between:

- **All queries** - displays data for all queries, regardless of the number of results.
- **Most not found** - displays data for queries that returned no results.

### Searches and users

The **Searches and users** section displays a time series chart with searches and unique users.

Click the **View details** button to open **Search queries**.

On this page you can:

- change the period for the displayed data
- export the data from the selected period to a CSV file
- filter the results by  **All queries** or **Most not found**
- search query text

## Resources

- **[Reunite features overview](../reunite.md)** - Explore other collaborative content management and project workflow features available in Reunite
- **[Analytics configuration reference](../../config/analytics/index.md)** - Configure third-party analytics tools like Google Analytics for comprehensive project usage tracking
