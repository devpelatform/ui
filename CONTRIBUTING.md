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
cd packages/core/general  # or packages/core/hook, packages/components/animation

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

- `feature/add-new-animation-component` - For new features
- `fix/hook-hydration-bug` - For bug fixes
- `docs/update-readme` - For documentation
- `refactor/simplify-components` - For refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) - commit messages automatically generate release notes!

```
feat(animation): add new text reveal component
fix(hook): resolve hydration mismatch in useMounted
docs(general): update utility function documentation
refactor(base): simplify button component variants
test(default): add unit tests for data grid filtering
perf(hook): optimize useMediaQuery performance
```

**Format**: `type(scope): description`

**Types** (mapped to release notes sections):

- `feat`: New feature → 🚀 Features
- `fix`: Bug fix → 🐛 Bug Fixes
- `perf`: Performance improvement → ⚡ Performance Improvements
- `docs`: Documentation changes → 📚 Documentation
- `refactor`: Code refactoring → ♻️ Code Refactoring
- `test`: Adding or updating tests → ✅ Tests
- `style`: Code style changes → 💎 Styles
- `build`: Build system changes → 🏗️ Build System
- `ci`: CI configuration changes → 👷 Continuous Integration
- `chore`: Maintenance tasks (hidden from release notes)
- `revert`: Revert previous commit → ⏪ Reverts

**Scopes**: Package names (general, hook, animation, aria, base, default, react)

**Breaking Changes**: Add `!` after type or add `BREAKING CHANGE:` in footer

```bash
# Breaking change with !
feat(hook)!: change useMediaQuery API

# Breaking change in footer
feat(hook): change useMediaQuery API

BREAKING CHANGE: useMediaQuery now returns object instead of boolean
```

**How it works**:
1. You write commits with conventional format
2. Push to GitHub
3. Release-please automatically creates a Release PR with:
   - Updated versions based on commit types
   - Generated CHANGELOG from commits
   - Beautiful release notes categorized by type
4. Merge the PR → Automatic publish to npm + GitHub release

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

This project uses [Release Please](https://github.com/googleapis/release-please) for automated releases:

**How it works**:

1. **Write commits** with conventional format (see Commit Messages above)

   ```bash
   feat(hook): add new useLocalStorage hook
   fix(general): resolve cn() merge conflict
   ```

2. **Push to main branch**:

   ```bash
   git push origin main
   ```

3. **Release Please creates PR automatically**:
   - Analyzes commits since last release
   - Determines version bumps (feat = minor, fix = patch, BREAKING = major)
   - Generates CHANGELOG with categorized commits
   - Updates package.json versions
   - Creates beautiful release notes

4. **Review and merge the Release PR**:
   - Check the generated CHANGELOG
   - Verify version bumps are correct
   - Merge when ready

5. **Automatic publish**:
   - Packages automatically published to npm
   - GitHub releases created with formatted notes
   - Tags pushed to repository

**Manual publish** (if needed):

```bash
bun run build
cd packages/core/general
npm publish --access public
```

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to pelatformdev@gmail.com.

## Questions?

If you have questions or need help:

- Open an issue on GitHub
- Check existing issues and discussions
- Review the package documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
