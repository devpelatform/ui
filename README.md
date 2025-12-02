# Bun Package Template

**A minimal, production-ready Bun monorepo template for building and publishing TypeScript/Node packages.**

This template provides a ready-to-use setup for multi-package repositories with Bun as the package manager, Turborepo for task orchestration, Biome for linting/formatting, Changesets for versioning and releases, and GitHub Actions for CI.

## Features

- Monorepo workspaces: `packages/**`, optional `apps/**`
- Bun-first workflows: `bun install`, `bun run <script>`
- Turborepo pipelines for `dev`, `build`, `start`, `types:check`
- Biome-based lint and format with consistent project style
- Versioning and publishing via Changesets
- CI workflows for linting and releases

## Getting Started

```bash
# Install dependencies
bun install

# Development
bun run dev

# Build all workspaces
bun run build

# Type-check
bun run types:check

# Lint (check)
bun run lint

# Lint (auto-fix)
bun run lint:fix

# Format code
bun run format
```

## Workspace Layout

- `packages/` – Each published or internal package lives here
- `apps/` – Optional applications (e.g., docs, demos) consuming packages

Example package structure:

```
packages/your-package/
├── src/
│   ├── index.ts
│   └── ...
├── package.json
├── tsconfig.json
├── tsup.config.ts (optional)
└── README.md
```

## Releases

This template uses Changesets.

```bash
# Create a changeset describing your changes
npx changeset

# Version packages (CI will also do this)
bun run version

# Publish updated packages (CI release workflow)
bun run release
```

Ensure `NPM_TOKEN` is configured in CI for publishing.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) and follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

Please report vulnerabilities privately as described in [SECURITY.md](./SECURITY.md). Replace the contact email with your own when using this template.

## License

MIT License – see [LICENSE](./LICENSE).

By contributing to this template, you agree that your contributions will be licensed under the MIT License.
