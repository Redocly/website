# Apigee API operations used by Redocly

## Summary

{% table %}

- Name
- Method
- HTTP Request

---

- [List API products](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.apiproducts/list)
- `organizations.apiproducts.list`
- `GET /organizations/{org_name}/apiproducts?expand=true`

---

- [Create a developer](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers/create)
- `organizations.developers.create`
- `POST /organizations/{org_name}/developers`

---

- [List developer apps](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps/list)
- `organizations.developers.apps.list`
- `GET /organizations/{org_name}/developers/{email}/apps?expand=true`

---

- [Get developer app](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps/get)
- `organizations.developers.apps.get`
- `GET /organizations/{org_name}/developers/{email}/apps/{appId}`

---

- [Create a new app](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps/create)
- `organizations.developers.apps.create`
- `POST /organizations/{org_name}/developers/{email}/apps`

---

- [Update a developer app or create a new key\*](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps/update)
- `organizations.developers.apps.update`
- `PUT /organizations/{org_name}/developers/{email}/apps/{appId}`

---

- [Delete a developer app](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps/delete)
- `organizations.developers.apps.delete`
- `DELETE /organizations/{org_name}/developers/{email}/apps/{appId}`

---

- [Get developer app key](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps.keys/get)
- `organizations.developers.apps.keys.get`
- `GET /organizations/{org_name}/developers/{email}/apps/{appId}/keys/{keyId}`

---

- [Adds an API product to a developer app key](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps.keys/updateDeveloperAppKey)
- `organizations.developers.apps.keys.updateDeveloperAppKey`
- `PUT /organizations/{org_name}/developers/{email}/apps/{appId}/keys/{keyId}`

---

- [Removes an API product from an app's consumer key](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps.keys.apiproducts/delete)
- `organizations.developers.apps.keys.apiproducts.delete`
- `DELETE /organizations/{org_name}/developers/{email}/apps/{appId}/keys/{keyId}/apiproducts/{apiProductId}`

---

- [Deletes an app's consumer key](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps.keys/delete)
- `organizations.developers.apps.keys.delete`
- `DELETE /organizations/{org_name}/developers/{email}/apps/{appId}/keys/{keyId}`

---

- [Creates a custom consumer key and secret\*\*](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps.keys/create)
- `organizations.developers.apps.keys.create.create`
- `POST /organizations/{org_name}/developers/{email}/apps/{appId}/keys/create`

---

- [Update developer app key\*\*\*](https://cloud.google.com/apigee/docs/reference/apis/apigee/rest/v1/organizations.developers.apps.keys/updateDeveloperAppKey)
- `organizations.developers.apps.keys.updateDeveloperAppKey`

- `POST /organizations/{org_name}/developers/{email}/apps/{appId}/keys/{keyId}`

{% /table %}

\* Is used to app display name and also to generate a new app key with a list of products

\*\* Needed for API credentials sync across organizations.

\*\*\* Needed for API credentials sync across organizations. It's used to add associated products to the imported key.
