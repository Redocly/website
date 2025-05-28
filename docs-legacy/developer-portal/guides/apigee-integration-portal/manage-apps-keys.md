---
seo:
  title: Manage apps and API keys using the Developer portal
excludeFromSearch: true

---

{% admonition type="warning" %}
The following content is sample documentation for end users of your Developer portal. Organization owners can reuse this content for your own Developer portal.

Before users can use the Developer portal for managing apps and API keys, organization owners need to set up the Apigee integration and configure access control for the Developer portal. See [Overview](overview.md) for more information.
{% /admonition %}

# Manage apps and API keys using the Developer portal

Using the Developer portal, users can:

- Read documentation published on the Developer portal
- Create a new app to generate an API key
- Manage API keys
- Manage apps, and
- Use the Try it out console to test the APIs

## Create a new app to generate an API key

1. On the Developer portal, select **Sign in** (top right of the screen).
  ![Developer portal sign in](./images/dp-signin.png '#display=block;margin=auto;width=600px;')
2. Sign in using your credentials.
3. Once you have signed in, from the user account dropdown, select **Apps**.
  ![Developer portal sign in](./images/dp-apps.png '#display=block;margin=auto;width=400px;')
The _My apps_ page displays.
4. Select **Create new App** to create a new app. The _Create a new app_ page displays.
5. Type a name for the app, and select the API products you want to associate this app with.
  ![Create new app](./images/create-app.png '#display=block;margin=auto;width=500px;')
**Note**: When you enter the app name, the Developer portal validates it and display errors if the name contains special or invalid characters.
6. Select **Create app** to confirm your changes.
An API key/secret pair is automatically generated for your app and your newly created app displays on the _My apps_ page. The details include the API key, secret information, products associated with the API key and the status of the API key and products associated with it.
  ![App created](./images/new-app-created.png '#display=block;margin=auto;width=500px;')

A new app is a unique ID and is associated with a specific URL for the portal.

## Manage API keys

Using the Developer portal, users can create a new API key for a different app/product pairing, update or delete an existing API key.

### Create key

Users can create a new key to associate your app with a different products combination.

To create a new key:

1. On the _My apps_ page, select the app you want to create a new API key for. The selected app details display.
2. Click **Create API key** to display the _Create key_ dialog.
  ![Add new key](./images/add-new-key.png '#display=block;margin=auto;width=500px;')
3. Select the products you want to uniquely associate to your existing app with this API key, and select **Create key**. A new API key is now created for your app/product pairing.

### Update key

In some cases, users may want to add or remove the products associated with an app. This affects the API key associated with this app/product pairing.

To update the key with this information:

1. On the _My apps_ page, select the app you want to update the API key for. The selected app details display.
2. For the API key you want to update, select the vertical menu icon, and select **Edit** to display the _Update key_ dialog.
  ![Edit API key](./images/edit-key-icon.png '#display=block;margin=auto;width=500px;')
4. Select the product associations to add or remove from the app, and click **Update key**. The API key is now updated with the app and product combination.

### Delete key

Occasionally, users may want to refresh API credentials for an app/product pairing. You can delete an existing API key associated with an existing app.

To delete an API key:

1. On the _My apps_ page, select the app you want to delete an API key for. The selected app details display.
2. For the API key you want to update, select the vertical menu icon, and select **Delete key**.
  ![Delete API key](./images/delete-key-icon.png '#display=block;margin=auto;width=500px;')
The selected API key is now deleted from the app.

## Manage app

Using Developer portal, users can add multiple apps or edit and delete an existing app. Using the _My apps_ page, they can also sort the app names alphabetically, or by ascending/descending dates for easier searchability and navigation.

### Edit app

Editing an app allows users to change the display name for clear organization and findability if you have multiple apps set up in your Developer portal.

To edit an app:

1. On the _My apps_ page, select the app you want to edit. The selected app details display.
2. Select **Edit** to display the _Change display name_ dialog.
3. Enter in a new name or make changes, and select **Save changes**.
  ![Edit app name](./images/edit-app-name.png '#display=block;margin=auto;width=500px;')

{% admonition type="info" %}
Changing the app name only changes the display name for the app, and does not affect the app/product pairing or the API key value.
{% /admonition %}

### Delete app

Users can delete an existing app if it is no longer required for the Developer portal.

To delete an app:

1. On the _My apps_ page, select the app you want to delete. The selected app details display.
2. Select *_Delete_. The _Delete app_ warning dialog displays.
3. Select **Delete app**.
  ![Delete app](./images/delete-app-dialog.png '#display=block;margin=auto;width=500px;')
The selected app is deleted and removed from your _My apps_ page.

{% admonition type="info" %}
Deleting an app removes its app/product pairings and the API keys.
{% /admonition %}
