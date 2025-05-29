---
rbac:
  redocly.owners: read
  redocly.members: read
  Employee: read
---
# Custom plugins

The file `plugin.js` allows a theme to perform certain actions on different stages when the project starts.

## Usage

`plugin.js` file has to export a default function which returns a [Plugin instance object](#plugin-instance-object)

```javascript
export default function () {
  return {
    processContent: (processContentActions, context) => {
      // Processing project content, creating routes, etc.
    },
    afterRoutesCreated: (afterRoutesCreatedActions, context) => {
      // Additional actions after all routes are already created
    },
  };
}
```

### Plugin instance object

{% table %}

- Property
- Type
- Description

---

- processContent
- Function
- Can scan file system or get data from APIs, create routes and perform [certain other actions](#processcontent-actions)

---

- afterRoutesCreated
- Function
- Can use routes information to create some shared data and perform [certain other actions](#afterroutescreated-actions)

{% /table %}

<!-- TODO: Need to review what actions should be available on each step and add an in-depth description and guide for each of them -->

### `processContent` actions

{% table %}

- Action
- Description

---

- createSharedData
- Add shared data for all routes

---

- addRouteSharedData
- Add shared data for a certain route

---

- setGlobalConfig
- Set / override global config

---

- setGlobalData
- Set global data

---

- getConfig
- Get config from `redocly.yaml` file

---

- addRoute
- Create a route

---

- addRedirect
- Register a redirect

---

- createTemplate
- Create a template that can be used to render specific routes

---

- registerServerPropsGetter
- Register a server props getter

---

- addSsrComponents
- Add JSX components, or HTML serialized to string that will be rendered in `head` or `body` of a project

---

-

{% /table %}

### `afterRoutesCreated` actions

{% table %}

- Action
- Description

---

- createSharedData
- Add shared data for all routes

---

- addRouteSharedData
- Add shared data for a certain route

---

- getRouteByFsPath
- Returns a Route object by it's path relative to project root

---

- getRouteBySlug
- Returns a Route object by it's slug

---

- getConfig
- Get config from `redocly.yaml` file

---

- getGlobalConfig
- Returns a global config

---

- getAllRoutes
- Returns an array of all available routes

---

- setGlobalConfig
- Set / override global config

---

- setGlobalData
- Set global data

---

- addRedirect
- Register a redirect

{% /table %}
