# Analytics

Reunite offers built-in analytics for your projects as an alternative to third-party solutions.
Track page views, identify popular content, and analyze search queries including AI-powered search.
Use these insights to improve user experience and identify documentation gaps.

Reunite collects analytics data on a project basis.
Each project has its own Analytics page.
Data collection begins after you publish your project for the first time.
Newly-deployed projects may take time to generate sufficient data.

## How does Redocly Analytics collect data?

Redocly Analytics helps you understand how your documentation is used by tracking:
- Page views – counted each time a documentation page is requested
- Search queries – recorded when users perform a search, including searches that return no results

This data is collected server-side, directly from web requests. We log:
- The page path or search term
- A timestamp of the event
- The IP address from the request, used for operational purposes such as deduplicating traffic, filtering bots, and ensuring accurate reporting

All data is collected on behalf of your organization and used only to provide aggregated insights in your Analytics dashboard.
We do not use analytics data for advertising or tracking users across sites, and we do not attempt to identify individual visitors.

The Analytics page contains collected data with charts for visualization.
To access the Analytics page, you must have an Owner role in your project.

The dashboard includes graphs and tables for each category:
- Page views
- AI-powered search
- Search queries

Change the time period by clicking the date input field in the top-right corner.
Navigate to detailed views for each category from the dashboard.
Export data to CSV files from detailed view pages.

## Page views

The Page views section displays a time series chart of views and unique users, plus a table with the most visited page URLs.
Both elements show data for the selected period.
Refine the data by selecting between All views and Unique users.

Select **View more** for detailed page views.

The detailed view page offers three different views:
- **Pages:** Lists the most visited pages
- **Paths:** Lists the most visited URL paths
- **Domains:** Lists domains that refer the most traffic to your project

## Search queries

The Search queries section displays the total number of searches in the selected period, a table with search queries sorted by search count, and a time series chart with searches and unique users.

Select **View more** for detailed search queries.
Toggle between viewing all, found (with results), or not-found (no results) search queries.

## AI-powered search

The AI-powered search section displays the total number of AI-powered searches in the selected period and a bar chart with search counts.

Select **View more** for detailed AI-powered search queries.
Inspect each query to see the full question, AI-provided answer, and corresponding source resources.

## Resources

- Discover other features Reunite offers in the [Reunite](../reunite.md) concept documentation
- Learn how to configure third-party analytics tools for your project in the [Analytics](../../config/analytics/index.md) configuration reference
