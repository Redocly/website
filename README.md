# Redocly website

This repo is the source of the Redocly website (https://redocly.com).

## Development

### Prerequisites

- Node.js (version specified in `.tool-versions`)
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

### Available Scripts

- `npm start` - Start the development server using Redocly CLI preview
- `npm run lint:markdown` - Lint markdown files
- `npm run lint:markdown:fix` - Fix markdown linting issues

## Project Structure

```
.
├── docs/           # Documentation content
├── pages/          # Website pages
├── static/         # Static assets
├── images/         # Image assets
├── blog/           # Blog content
├── learn/          # Learning resources
└── @theme/         # Theme components
```

## Remote content

The `/docs/cli`, `/docs/realm`, and `/docs/redoc` content are sourced from other repositories using the [remote content feature](https://redocly.com/docs/realm/setup/concepts/remote-content).

```treeview
docs
├── cli
├── realm
├── redoc
```

## Sidebars

The sidebars are located in the root of the repo:

- docs-cli.sidebars.yaml
- docs-realm.sidebars.yaml
- etc...

## Contributing

Please ensure your contribution follows our style guidelines:
- Use Prettier for code formatting
- Follow the markdown linting rules defined in `.markdownlint.yaml`
- Follow the ESLint configuration

## License

This project is proprietary. See the [LICENSE](LICENSE) file for details.
