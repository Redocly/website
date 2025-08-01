---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Eject components

In some cases, it may be necessary to extend the functionality of existing components, such as the Search, Footer, Markdoc Card, or `NotFound` components.
The eject feature allows you to create a local copy of the component’s source code within your project.
After that, you can customize the component's styles, structure, or behavior.

For example, you can eject the `NotFound` component to customize your 404 error pages with custom styling, messaging, or additional functionality.

{% admonition type="warning" name="Eject component warning" %}
  Once a component is ejected and customized, it's your responsibility to maintain the implementation moving forward. Make sure a component cannot be customized [in other ways](#before-you-begin) before ejecting.
{% /admonition %}

## Before you begin

Make sure you have the following before you begin:

- A Redocly project in Reunite.
- Check if your component can be customized without ejecting
  - The [redocly.yaml config file](../../config/index.md) allows you to configure the component.
  - The [styles.css file](../../branding/customize-styles.md) allows you to customize component styles using CSS variables.
  - The [translations.yaml file](../../content/localization/translation-keys.md) allows you to customize component text and labels.

## Find components with browser dev tools

Before you eject a component, you need to determine the correct files to eject to achieve the effect you want to make.
The browser developer tools can help you identify which components are ejectable.

To determine the component to eject using Google Chrome developer tools do the following:

1. Open developer tools - right-click the element you're interested in and select **Inspect** or press `F12`.

    {% img
      alt="Inspect component"
      src="../images/inspect-component.png"
      height=300
      withLightbox=true
    /%}

1. Identify component name - find `data-component-name` attribute and see its value.

    {% img
      alt="Find data component name"
      src="../images/find-data-component-name.png"
      height=400
      withLightbox=true
    /%}

## Eject component

After you have determined you need to alter a component by ejecting it and what component you want to alter, eject your component in one of the following ways:

- [Using the Reunite web editor (recommended)](./eject-components-in-reunite.md): Use the UI in Reunite to select the component and eject the files into your project.
- [Using Redocly CLI](./eject-components-using-cli.md): Use Redocly CLI to select the component and eject the files.
  Before you can eject components using Redocly CLI, you must download all of your project files, so you can work with them locally.
  Afterward, the ejected component files need to be added to your files in Reunite.

## Related how-tos

- Learn more about [custom styles](../../branding/customize-styles.md) for your project.

## Resources

- Discover more about the [Redocly CLI eject command](https://redocly.com/docs/cli/commands/eject).
- Learn how to [Eject components](./eject-components-tutorial) in practice.
