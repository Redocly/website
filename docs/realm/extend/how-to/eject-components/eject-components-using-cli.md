---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Eject components using the CLI

The `eject component` command unlocks powerful component customization, allowing you to tailor components to specific project needs.
Ejecting a component creates a local copy of its source code in your project, where you can modify the component's styles, structure, or behavior.
This guide provides instructions on how to eject and override components from Realm, Revel, or Reef.

## Eject command options

The `eject component` command supports the following options:

- Passing a filepath to a component for ejecting a single file or filepath with glob pattern for ejecting multiple files, as in the following examples:

  - **Filepath:** `npx @redocly/cli eject component 'Filter/Filter.tsx'`
  - **Filepath with glob pattern:** `npx @redocly/cli eject component 'Footer/**'`

- The `-f` or `--force` option skips the "overwrite existing" confirmation when ejecting a component that is already ejected in the destination, as in the following example:

  - `npx @redocly/cli eject component 'Filter/Filter.tsx' --force`

- The `-d` or `--project-dir` option provides a destination folder to eject components into, as in the following example:

  - `npx @redocly/cli eject component 'Filter/Filter.tsx' --project-dir docs-components` would eject the file to `docs-components/@theme/components/Filter/Filter.tsx`

## Trigger component selection prompt

You can use a terminal prompt to select components to eject.
Use a folder name followed by "/\*\*" to trigger the selection prompt for top-level folders, such as `icons`, `markdoc`, or `components`.

The following example command triggers the selection prompt for the `components` folder:

```bash
npx @redocly/cli eject component 'components/**'
```

The following example command triggers the selection prompt for all components inside `Footer`:

```bash
npx @redocly/cli eject component 'Footer/**'
```

## Override core components

After ejection, customized components "override" the standard components used to render pages when two criteria are met:

- The new component's function name and filename matches the ejected component.
- The new component is located inside your project's `@theme` folder and has a matching filepath as the ejected component.

The following example shows the file structure for a project that ejected and customized the `ColorModeSwitcher` component:

```treeview
your-awesome-project/
├── @theme/
│   ├── components/
│   │   └── ColorModeSwitcher/
│   │       └── ColorModeSwitcher.tsx
│   └── ...
├── guides/
├── redocly.yaml
└── ...
```

## Related how-tos

- Learn more about when to [Eject components](./index.md).
- Follow steps to [Eject components in Reunite](./eject-components-in-reunite.md).

## Resources

- Discover more about the [Redocly CLI eject command](https://redocly.com/docs/cli/commands/eject).
