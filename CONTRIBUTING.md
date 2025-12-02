# Contributing to Bun Package Template

Thank you for your interest in contributing! This template aims to provide a clean, production-ready Bun monorepo setup for building and publishing TypeScript/Node packages.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers via email (replace with your contact email).

## Why Contribute?

This template is community-driven. Your contributions help:

- Improve developer experience and documentation
- Fix issues and enhance reliability
- Extend tooling and workflow capabilities

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.3 or higher
- Node.js 22 or higher
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Project

```bash
# Run all workspaces in development mode
bun run dev

# Build all workspaces
bun run build

# Type-check all workspaces
bun run types:check

# Lint (check)
bun run lint

# Lint (auto-fix)
bun run lint:fix

# Format code
bun run format
```

### Working on a Specific Package

```bash
# Navigate to a package directory
cd packages/your-package

# Run package-specific commands (if defined in that package)
bun run dev            # Development with watch mode
bun run build          # Build the package
bun run types:check    # Type-check the package
```

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting to ensure consistent code quality.

### Code Standards

- **Indentation**: 2 spaces
- **Line Width**: 100 characters
- **Quotes**: Single quotes for JavaScript/TypeScript
- **Semicolons**: Always required
- **Trailing Commas**: All
- **Arrow Parentheses**: Always

### Lint dan Format

Before committing, always run:

```bash
# Lint (check)
bun run lint

# Lint (auto-fix)
bun run lint:fix

# Format only
bun run format
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-capability` - For new features
- `fix/build-script-bug` - For bug fixes
- `docs/update-readme` - For documentation
- `refactor/simplify-structure` - For refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(template): add package scaffolding script
fix(ci): correct bun run command in workflow
docs(readme): clarify release process
refactor(workspace): simplify outputs in turbo.json
test(package): add basic type check script
```

**Format**: `type(scope): description`

**Types**:

- `feat` or `feature`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Maintenance tasks

### Writing Code

1. **Follow existing patterns**: Look at existing code for consistency
2. **Write TypeScript**: All code should be properly typed
3. **Keep it simple**: Avoid over-engineering solutions
4. **Add comments**: Only where the code isn't self-explanatory
5. **Export cleanly**: Follow the existing export patterns in each package

### Testing

**All changes must pass the following checks** before submitting:

```bash
# Type-check all workspaces
bun run types:check

# Build to ensure no build errors
bun run build

# Lint (check)
bun run lint

# Format code
bun run format
```

Make sure:

- All TypeScript types are correct
- No build errors or warnings
- Code follows the style guide
- Existing functionality is not broken

## Submitting Changes

### Pull Request Process

1. **Update your branch** with the latest changes from main:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub targeting the `main` branch

4. **Fill in the PR template** with:
   - **Clear title**: Use conventional commit format (e.g., "feat(animation): add text reveal component")
   - **Description**: Explain what changed and why
   - **Breaking changes**: Clearly document any breaking changes
   - **Related issues**: Reference issues (e.g., "Fixes #123", "Closes #456")
   - **Screenshots/videos**: Add visual proof for UI changes
   - **Testing**: Describe how you tested the changes

5. **Wait for review**: Maintainers will review your PR and may request changes

**Keep PRs focused**: Large pull requests are harder to review. Try to keep changes focused on a single feature or fix.

### Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] All checks pass (`bun run types:check`)
- [ ] Build succeeds (`bun run build`)
- [ ] Code is properly formatted (`bun run lint:format`)
- [ ] Commit messages follow conventional commits
- [ ] Documentation is updated (if needed)
- [ ] No breaking changes (or clearly documented if necessary)

## Package Development

### Adding a New Package

1. Create a new directory in `packages/`
2. Copy the structure from an existing package
3. Update `package.json` with appropriate metadata
4. (Optional) Create `tsup.config.ts` for build configuration
5. Ensure the package is included in the workspace

### Package Structure

```
packages/your-package/
├── src/
│   ├── index.ts          # Main exports
│   ├── types.ts          # Type definitions
│   └── ...
├── package.json          # Package metadata
├── tsup.config.ts        # Build configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Package documentation
```

### Publishing Packages (Maintainers Only)

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

1. **Create a changeset**:

   ```bash
   npx changeset
   ```

   Follow the prompts to describe your changes.

2. **Version packages**:

   ```bash
   bun run version
   ```

   This updates package versions and changelogs.

3. **Publish to npm**:

   ```bash
   bun run release
   ```

   This builds and publishes all changed packages.

## Security

If you discover a security vulnerability, please report it privately as described in [SECURITY.md](./SECURITY.md). Replace the contact email with your own when using this template.

**Do not report security issues through public GitHub issues.**

## Questions and Support

If you have questions or need help:

- Check the [documentation](./README.md) and package READMEs
- Open an issue in your repository
- Start a discussion in your repository

## License

By contributing to this template, you agree that your contributions will be licensed under the MIT License.
