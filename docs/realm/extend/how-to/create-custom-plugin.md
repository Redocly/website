---
rbac:
  redocly.owners: read
  redocly.members: read
  Employee: read
---
# Create a custom plugin to render additional types of content

This guide walks you through the process of creating a plugin for your project that renders content types not supported by the project out of the box.
While this guide focuses on implementing a simple plugin for rendering WSDL APIs, the same principles can be applied to create plugins for other types of content as well.

## Prerequisites

Before you begin, ensure that you have set up a project. If you haven't done so yet, you can follow the [getting started guides](../../get-started/index.md) to set up a project.

## Build the plugin

To render WSDL APIs in your project, follow the steps below.

### Add dependencies to `package.json`

To facilitate parsing and rendering of WSDL definitions, add the following dependencies to your `package.json`:

- `soap`
- `react`
- `xml-formatter`

```bash
npm install soap react@17.0.2 xml-formatter
```

### Create `@theme` folder

Redocly looks for plugins in the `@theme` folder. If your project does not have this folder already, you need to create it.

### Create a project plugin

The first step is to identify the files you want to render and instruct the project to include them as pages. To achieve this, create a `plugin.js` file in the `@theme` folder with the following content:

**_plugin.js_**

```typescript plugin.js
import { WSDL, Client } from 'soap';
import formatXml from 'xml-formatter';

import { fromCurrentDir } from '@redocly/realm/dist/server/utils/paths.js';
import { getApiConfigByPath } from '@redocly/realm/dist/server/plugins/get-api-config.js';
import logger from '@redocly/realm/dist/server/utils/reporter/logger.js';

const SOAP_TEMPLATE_ID = 'soap-docs';

const STUB_SOAP_RESPONSE = `HTTP/1.0 200 OK
Content-Type: text/xml; charset = utf-8
Content-Length: 42

<?xml version = "1.0"?>
<SOAP-ENV:Envelope
   xmlns:SOAP-ENV = "http://www.w3.org/2001/12/soap-envelope"
   SOAP-ENV:encodingStyle = "http://www.w3.org/2001/12/soap-encoding">

   <SOAP-ENV:Body xmlns:m = "http://www.xyz.org/quotation">
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

/**
 * A function called when plugin is initialized
 */
export default function soapPlugin() {
  /**
   * Return an object with function for each plugin lifecycle stage
   */
  return {
    /**
     * Define a loader for WSDL files
     */
    loaders: {
      wsdl: async (relativePath, context) => {
        /**
         * Get config from `redocly.yaml` closest to the file
         * Alternatively, use `context.getConfig()` to get the root `redocly.yaml` config specifically
         */
        const config = await context.getConfig(relativePath);

        /**
         * Get metadata for file from apis config in redocly.yaml
         */
        const { metadata } = getApiConfigByPath(config.apis, relativePath);

        /**
         * Read file and load content
         */
        const content = await context.fs.read(relativePath);

        /**
         * Initialize WSDL client and get API information
         */
        const wsdl = await new Promise((resolve) => {
          const wsdl = new WSDL(content, relativePath, {});
          wsdl.onReady(() => resolve(wsdl));
        });

        const info = new Client(wsdl, undefined, {
          // We do not want to make requests to a real server here, so we need to mock the HTTP client
          httpClient: {
            request: (location, data, cb) => {
              cb(undefined, { status: 200 }, STUB_SOAP_RESPONSE);
            },
          },
        });
        const meta = info.describe();

        const serviceName = Object.keys(meta)[0];

        const bindingName = Object.keys(meta[serviceName])[0];
        const endpoints = meta[serviceName][bindingName];

        return {
          endpoints,
          metadata,
          serviceName,
          info,
          content
        };
      },
    },

    /**
     * processContent is called after project content has been scanned and config file was loaded
     * @param {*} actions Actions allowed at this stage - addRoute, createTemplate, etc.
     * @param {*} context Provides access to the file system through `context.fs` object,
     *                    caching and data loading through `context.cache` object,
     *                    and helper functions like getConfig and isIgnored
     */
    processContent: async (actions, context) => {
      /**
       * Create a template by providing a path to the React component which knows how to render WSDL docs
       */
      const soapTemplateId = actions.createTemplate(
        SOAP_TEMPLATE_ID,
        fromCurrentDir(import.meta.url, './SoapDocs.jsx'),
      );

      /**
       * Go through all files and identify which are WSDL
       */
      for (const fileInfo of await context.fs.scan(/(\.wsdl)$/)) {
        /**
         * Skip if the file is ignored
         */
        if (await context.isPathIgnored(fileInfo.relativePath)) {
          continue;
        }

        /**
         * Load information about the WSDL file using a loader defined in the `loaders` property of the plugin
         * The second parameter of the cache.load function is the name of that loader
         */
        const wsdlRecord = await context.cache.load(fileInfo.relativePath, 'wsdl');
        const { endpoints, metadata, serviceName, info, content } = wsdlRecord.data;

        for (const endpointName of Object.keys(endpoints)) {
          /**
           * Add a page for operation
           */
          actions.addRoute({
            fsPath: fileInfo.relativePath,
            slugSuffix: slugFromEndpoint(endpointName),
            // Specify ID of a template that knows how to render WSDL
            templateId: soapTemplateId,
            // Text used if route is referenced in navbar or footer
            getNavText: async () => endpointName,
            // Data used by template to render WSDL
            getStaticData: async () => {
              return {
                props: {
                  title: endpointName,
                  meta: {},
                  endpointName,
                  request: await generateRequestExample(
                    endpointName,
                    info,
                    endpoints[endpointName].input,
                  ),
                },
              };
            },
          });
        }

        /**
         * Add a route with general information
         */
        actions.addRoute({
          fsPath: fileInfo.relativePath,
          // Specify ID of a template that knows how to render WSDL
          templateId: soapTemplateId,
          // API metadata used in API Catalog
          metadata: {
            type: 'soap',
            title: serviceName,
            description: '',
            tags: ['SOAP'],
            ...metadata,
          },
          // Sidebar items: main route as a top-level item and a group with all operations
          getSidebar: (route) => {
            const operationSidebarItems = [];

            for (const endpointName of Object.keys(endpoints)) {
              const routeSlug = `${route.slug}${slugFromEndpoint(endpointName)}/`;
              /**
               * Create sidebar item for operation
               */
              operationSidebarItems.push({
                type: 'link',
                link: routeSlug,
                label: endpointName,
                routeSlug,
              });
            }

            return [
              {
                type: 'link',
                link: route.slug,
                routeSlug: route.slug,
                label: serviceName + ' WSDL',
              },
              {
                type: 'group',
                label: 'Operations',
                items: operationSidebarItems,
              },
            ];
          },
          // Text used if route is referenced in navbar or footer
          getNavText: async () => serviceName,
          // Data used by template to render WSDL
          getStaticData: async () => {
            return {
              props: {
                title: serviceName,
                wsdl: formatXml(content, { indentation: '  ' }),
              },
            };
          },
        });
      }
    },
  };
}

/**
 * Simple function which generates an example request XML
 */
const generateRequestExample = async (endpointName, info, inputParams) => {
  const mockInput = mockProperties(endpointName, inputParams, 1);

  const requestXml = await new Promise((resolve) => {
    // Request XML is a fifth argument in the callback
    info[endpointName](mockInput, (...params) => {
      resolve(params[4]);
    });
  });

  return formatXml(requestXml, { indentation: '  ', throwOnFailure: false });
};

const mockProperties = (endpointName, inputParams, recursiveLevel) => {
  const mockInput = {};

  // Possible cycle references in WSDL can cause stack overflow
  if (recursiveLevel > 10) {
    return mockInput;
  }

  const paramNames = Object.keys(inputParams || {});

  for (let paramName of paramNames) {
    if (['targetNamespace', 'targetNSAlias'].includes(paramName)) {
      continue;
    }

    const paramValue = inputParams[paramName];

    if (paramName.endsWith('[]')) {
      paramName = paramName.slice(0, -2);
    }

    if (paramValue && typeof paramValue === 'object') {
      mockInput[paramName] = mockProperties(endpointName, paramValue, recursiveLevel + 1);
    } else if (typeof paramValue === 'string') {
      const paramType = paramValue.split(':')[1];
      switch (paramType) {
        case 'string':
          mockInput[paramName] = 'Lorem ipsum';
          break;

        case 'date':
          mockInput[paramName] = '2023-07-06';
          break;

        case 'decimal':
          mockInput[paramName] = 42;
          break;

        default:
          mockInput[paramName] = paramName;
      }
    } else {
      const error = `Can't generate request example. Request param ${paramName} not supported in endpoint ${endpointName}`;
      mockInput[paramName] = { error };
      logger.warn(error);
      continue;
    }
  }
  return mockInput;
};

/**
 * Function that generates a slug from an operation name
 */
const slugFromEndpoint = (name) => {
  return (
    name
      .trim()
      .replace(/[^\w\-]/g, '-')
      .replaceAll(/-+/g, '-')
      .toLowerCase()
      .replace(/^-|-$/g, '') + '/'
  );
};

```

### Create a React component to render WSDL content

In the previous step, we informed the project that a React component named `SoapDocs.jsx` knows how to render WSDL content.
Now let's implement this component building on top of the default theme to render WSDL API information in a simple manner, showcasing the capabilities.

Create a file named `SoapDocs.jsx` next to `plugin.js` and add the following content:

```typescript
import { Button, CodeBlock, H1, H2, highlight, DocumentationLayout } from '@redocly/theme';
import React from 'react';

/**
 * A simple React component that knows how to render WSDL
 * 'pageProps' are received from `getStaticData` function defined when adding a route in plugin
 */
function SoapDocs({ pageProps }) {
  return (
    <DocumentationLayout
      tableOfContent={undefined}
      feedback={undefined}
      markdownWrapper={
        <>
          {/* Render page with general information*/}
          {!pageProps.request ? (
            <>
              <H1>{pageProps.title} Service WSDL</H1>
              <Button variant="primary" size="small">
                Download WSDL
              </Button>
              <CodeBlock
                lang="xml"
                source={pageProps.wsdl}
                highlightedHtml={highlight(pageProps.wsdl || '', 'xml')}
              />
            </>
          ) : (
            <>
              {/* Render a page with operation information */}
              <H1>{pageProps.title}</H1>
              <div>{pageProps.description || 'No description'}</div>

              <H2> Request example </H2>
              <CodeBlock
                lang="xml"
                source={pageProps.request}
                highlightedHtml={highlight(pageProps.request || '')}
              />
            </>
          )}
        </>
      }
    />
  );
}

export default React.memo(SoapDocs);
```

### Add a WSDL definition to your project

Place a WSDL definition file in the desired directory of your project. You can use an example file from [this tutorial](https://www.tutorialspoint.com/wsdl/wsdl_example.htm).

### Include WSDL definitions in the API catalog

To include WSDL definitions in the API catalog, add the following configuration to your `redocly.yaml` (notice the "soap" addition to the `includeByMetadata` type):

```yaml
catalog:
  main:
    title: API Catalog
    description: 'My catalog description'
    slug: '/api-catalog/'
    groupByFirstFilter: false
    filters:
      - title: API Category
        property: category
        missingCategoryName: Other
    items:
      - directory: ./
        flatten: true
        includeByMetadata:
          type: [openapi, soap]
apis:
  my-api:
    root: ./path/to/my-soap-api.wsdl
  metadata:
    category: Sample
```

### Start the project

Run the project with the following command:

```sh
npx @redocly/cli preview
```

After the project starts you can view your WSDL docs in the API catalog by going to http://localhost:4000/api-catalog/.

With these steps, you have created a custom plugin that allows your project to render WSDL APIs. Explore and modify the plugin to suit your specific needs. Extend it to support additional types of content as well.
