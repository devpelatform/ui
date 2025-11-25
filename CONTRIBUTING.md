# Contributing to Pelatform UI

Thank you for your interest in contributing to Pelatform UI! This document provides guidelines and instructions for contributing to this monorepo.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3.3 or higher
- Node.js 20 or higher
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ui.git
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
bun lint:format
```

### Working on a Specific Package

```bash
# Navigate to the package directory
cd packages/email  # or packages/storage, packages/utils

# Run package-specific commands
bun dev            # Development with watch mode
bun build          # Build the package
bun types:check    # Type-check the package
```

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

- **Indentation**: 2 spaces
- **Line Width**: 100 characters
- **Quotes**: Single quotes
- **Semicolons**: Always
- **Trailing Commas**: All

Run the following command before committing:

```bash
bun lint:format
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-email-provider` - For new features
- `fix/storage-upload-bug` - For bug fixes
- `docs/update-readme` - For documentation
- `refactor/simplify-utils` - For refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(email): add support for SendGrid provider
fix(storage): resolve S3 presigned URL expiration issue
docs(utils): update function documentation
refactor(email): simplify template rendering logic
test(storage): add unit tests for Cloudinary provider
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

Before submitting your changes:

```bash
# Type-check all packages
bun types:check

# Build to ensure no build errors
bun build

# Lint and format
bun lint:format
```

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

3. **Create a Pull Request** on GitHub with:

   - Clear title describing the change
   - Description of what changed and why
   - Reference any related issues (e.g., "Fixes #123")
   - Screenshots (if applicable)

4. **Wait for review**: Maintainers will review your PR and may request changes

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

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to pelatformdev@gmail.com.

## Questions?

If you have questions or need help:

- Open an issue on GitHub
- Check existing issues and discussions
- Review the package documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
