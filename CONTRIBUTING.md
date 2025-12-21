# Contributing to Pelatform UI

Thank you for your interest in contributing to Pelatform UI! We appreciate your time and effort in helping us build a comprehensive React UI library for TypeScript.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to pelatformdev@gmail.com.

## Why Contribute?

Pelatform UI is a community-driven project aiming to provide a comprehensive, accessible, and well-documented UI library for the TypeScript ecosystem. Your contributions help:

- Build better components for developers worldwide
- Improve accessibility and user experience
- Expand the library's capabilities
- Fix bugs and improve performance
- Enhance documentation for better developer experience

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.3 or higher
- Node.js 22 or higher
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/pelatformlabs/ui.git
   cd ui
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
# Run all packages in development mode
bun dev

# Build all packages
bun build

# Type-check all packages
bun types:check

# Lint and format code
bun run lint
bun run format
```

### Working on a Specific Package

```bash
# Navigate to the package directory
cd packages/core/general  # or packages/core/hook
cd packages/components/animation  # or aria, base, default
cd packages/main  # aggregate entry package

# Run package-specific commands
bun dev            # Development with watch mode
bun build          # Build the package
bun types:check    # Type-check the package
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

### Format and Lint

Before committing, always run:

```bash
# Lint and format
bun run lint
bun run format

# Fix lint issues
bun run lint:fix
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-animation-component` - For new features
- `fix/hook-hydration-bug` - For bug fixes
- `docs/update-readme` - For documentation
- `refactor/simplify-components` - For refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(animation): add new text reveal component
fix(hook): resolve hydration mismatch in useMounted
docs(general): update utility function documentation
refactor(base): simplify button component variants
test(default): add unit tests for data grid filtering
```

**Format**: `type(scope): description`

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
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
# Type-check all packages
bun types:check

# Build to ensure no build errors
bun build

# Lint and format
bun lint:format
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
- [ ] All tests pass (`bun types:check`)
- [ ] Build succeeds (`bun build`)
- [ ] Code is properly formatted (`bun lint:format`)
- [ ] Commit messages follow conventional commits
- [ ] Documentation is updated (if needed)
- [ ] No breaking changes (or clearly documented if necessary)

## Package Development

### Adding a New Package

1. Create a new directory in `packages/`
2. Copy the structure from an existing package
3. Update `package.json` with appropriate metadata
4. Create `tsup.config.ts` for build configuration
5. Add the package to the workspace

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

If you discover a security vulnerability within Pelatform UI, please send an email to pelatformdev@gmail.com. All security vulnerabilities will be promptly addressed.

**Do not report security issues through public GitHub issues.**

## Questions and Support

If you have questions or need help:

- Check the [documentation](./README.md) and package READMEs
- Search [existing issues](https://github.com/pelatformlabs/ui/issues) and [discussions](https://github.com/pelatformlabs/ui/discussions)
- Open a new [discussion](https://github.com/pelatformlabs/ui/discussions) for questions
- Open an [issue](https://github.com/pelatformlabs/ui/issues) for bug reports

## License

By contributing to Pelatform UI, you agree that your contributions will be licensed under the MIT License.
