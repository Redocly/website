---
template: ../@theme/templates/BlogPost
title: Presenting multiple APIs for better discovery
seo:
  title: Presenting multiple APIs for better discovery
author: adam-altman
publishedDate: "2021-01-26"
categories:
  - api-catalog:discovery
image: blog-api-discovery.png
---
Does your organization own documentation for multiple APIs?

How can users find them?
This topic is commonly called API discovery.

Let's pretend your organization has three APIs: rock, paper, and scissors.

They are each maintained by separate teams following the [microservices approach](../docs-legacy/developer-portal/guides/document-microservices.md).

## Sidebar navigation

Redocly supports a few options for presenting the sidebar (which typically appears as the left navigation) to users.

### Unified sidebar

A unified sidebar approach would show all of the APIs in a single sidebar.

```yaml
unified:
  - page: openapi/rock.page.yaml
  - page: openapi/paper.page.yaml
  - page: openapi/scissors.page.yaml
```

![unified-sidebars](https://user-images.githubusercontent.com/1161871/105851165-4f07fc80-5fa8-11eb-95bc-319e8716f30f.png)


### Different sidebars

When someone navigates to the API, they would land on this page.

Here is a snippet from the `sidebars.yaml` that shows three different sidebars defined.

```yaml
rock:
  - page: openapi/rock.page.yaml
paper:
  - page: openapi/paper.page.yaml
scissors:
  - page: openapi/scissors.page.yaml/*
```

The sidebar will be contextual to the API.

For example, when visiting the Paper API, it is the only API displayed in the sidebar.

![different-sidebars-paper](https://user-images.githubusercontent.com/1161871/105852892-a8712b00-5faa-11eb-8ceb-51a58f57e826.png)

The `/*` at the end of the scissors sidebar showcases a different behavior by removing the initial group with the API name.
Here is an example:

![different-scissors-group](https://user-images.githubusercontent.com/1161871/105853075-e8381280-5faa-11eb-88e8-6dfe8bdb7ed7.png)


### Drilldown sidebar

The drilldown sidebar allows the user to see the top level API catalog in the sidebar.
When they click on an API product, they drill down deeper into the sidebar.
This behavior is similar to a hybrid between the unified and different sidebars.
In the drilldown behavior, the sidebar only shows the appropriate segment of navigation, with a back link to return to the parent sidebar.

```yaml
drilldown-style:
  - group: Rock
    menuStyle: drilldown
    pages:
      - page: openapi/rock.page.yaml/*
  - group: Paper
    menuStyle: drilldown
    pages:
      - page: openapi/paper.page.yaml/*
  - group: Scissors
    menuStyle: drilldown
    pages:
      - page: openapi/scissors.page.yaml/*
```

![drilldown-sidebars](https://user-images.githubusercontent.com/1161871/105854064-00f4f800-5fac-11eb-8665-f241b3b2505e.gif)

See the [example pull request](https://github.com/Redocly/developer-portal-starter/pull/58) for more details.

## API catalog

You may want to showcase your API catalog on a landing page.
One common idea is to use a tile to represent each product in the API catalog.

```tsx
  <FlexSection justifyContent="space-around" flexWrap="wrap">
    <ThinTile to="openapi/rock.page.yaml" icon={rock} header="Rock">
        This is the Rock API. It thinks it is better than the Scissors API. But it has to watch out for paper.
    </ThinTile>
    <ThinTile to="openapi/paper.page.yaml" icon={paper} header="Paper">
        The Paper API frightens the Rock API.
    </ThinTile>
    <ThinTile to="openapi/scissors.page.yaml" icon={scissors} header="Scissors">
        The Scissors API is great as long as it stays away from the Rock API.
    </ThinTile>
  </FlexSection>
```

![tiles](https://user-images.githubusercontent.com/1161871/105868033-597fc180-5fbb-11eb-9242-4f13ae7010bc.png)

## Search

Another popular method of API discovery is a search feature.

You can enable search for your Redocly Developer portal in the `siteConfig.yaml` within the `nav` section:

```yaml
  - search: true
```

How will you organize your APIs to make them discoverable by your consumers? Do you have a different approach you want to see us support? Let us know.
