---
rbac:
  corporate-sso: read
products:
  - Realm
  - Redoc
  - Revel
  - Reef
plans:
  - Enterprise+
---

# Analytics

Reunite offers a built-in analytics tool for your projects as an alternative to third-party solutions.
With Reunite's Analytics you can track page views, identify the most popular content, and analyze search queries including AI-powered search.
The insights you gain from the collected data can help you improve the user experience of your project and identify potential gaps in documentation.

Reunite's Analytics collects data on a project basis.
If you have multiple projects, each has its own Analytics page.
Reunite starts collecting data from user activity after you publish your project for the first time.
With newly-deployed projects, it may take some time for users to generate enough data.

The **Analytics** page in Reunite contains the collected data with charts for visualizing that data.
To access the **Analytics** page in Reunite you must have an Owner role in your project.

## Views tab

On the **Analytics** page in Reunite, the **Views** tab displays a graph of total page views for your project, and the **Pages** table with the most often visited page URLs in your project.
Both elements display data for the selected period. If not set, the default time period is the last seven days.
You can change this period by clicking the date input field in the top-right side of the page.
You can further refine the data by selecting between **All** views and views from **Unique** users.

The **Pages** table displays the 10 page-URLs with the most visits.
To see records with fewer visits, click the **View more** button at the bottom of the page.

{% img withLightbox=true src="./images/reunite-analytics-views.png" alt="Screen capture of the Views tab on the Reunite Analytics page presenting a graph of changes in page views in time and the Pages table with URLs of project pages with the most visits" /%}

### Search queries tab

The **Search queries** tab displays the total number of searches in the selected period, a queries table with search queries sorted by the number of searches, and a bar chart with the number of searches in the last seven days.

You can change the period for which the **Total searches** field and table display the data.
The default period is the last 7 days.
The bar chart only displays data for the last 7 days.
You can use the drop-down in the top-right side of the page to display data for search queries entered manually or prompts for AI-powered search.

The queries table displays 10 queries with the highest number of occurrences.
You can filter the table data to queries that yielded no results.
To see more queries, click the **View more** button.

{% img src="./images/reunite-analytics-search-queries.png" alt="Screen capture of the Search queries tab on the Reunite Analytics page presenting a table with search queries and a bar chart with the number of queries in the last seven days" /%}

## Resources

- Discover other features Reunite offers in the [Reunite](../../author/concepts/reunite.md) concept documentation.
- Learn how to configure third-party analytics tools for your project in the [Analytics](../../config/analytics/index.md) configuration reference.
