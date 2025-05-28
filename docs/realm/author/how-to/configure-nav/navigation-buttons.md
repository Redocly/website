# Configure navigation buttons

You can configure the button text on the navigation buttons.

## Update button text

Update the text of the navigation buttons for your entire portal.

To update the text:

1. If you don't already have a `redocly.yaml` file, create one and add it to the root of your project.
2. Add the `nextButton` object, under the `navigation` object, and the `text` option with the value for the updated text.
   For example, the following configuration updates the navigation button text for the right-hand side button to "Go to {label for next page in sidebar}":
   ```yaml
   navigation:
     nextButton:
       text: Go to
   ```
3. Add the `previousButton` object, under the `navigation` object, and the `text` option with the value for the updated text.
   For example, the following configuration updates the navigation button text for the left-hand side button to "Go back to {label for previous page in sidebar}":
   ```yaml
   navigation:
     nextButton:
       text: Go to
     previousButton:
       text: Go back to
   ```
