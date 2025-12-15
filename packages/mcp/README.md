# Pelatform UI - MCP Server

MCP server for exploring Pelatform UI library packages, components, and documentation.

## Overview

This MCP server provides access to:

- **7 packages** in the Pelatform UI library
- **Component discovery** and search
- **Source code reading** for development
- **Usage examples** and documentation

## Available Packages

### Core Packages (2)

- `@pelatform/ui.general` - General components and utilities
- `@pelatform/ui.hook` - React hooks collection

### Component Packages (4)

- `@pelatform/ui.animation` - Animation components
- `@pelatform/ui.aria` - Accessible ARIA components
- `@pelatform/ui.base` - Headless base components
- `@pelatform/ui.default` - Styled default components

### Main Package (1)

- `pelatform-ui` - Main entry point package

## Setup

### Build

```bash
cd packages/mcp
bun run build
```

### Development

```bash
cd packages/mcp
bun run dev
```

### Testing

```bash
cd packages/mcp
bun run test
```

## Configuration

Add the MCP server to your MCP client configuration:

### Example Configuration

```json
{
  "mcpServers": {
    "Pelatform UI": {
      "command": "node",
      "args": [
        "D:\\PROJECTS\\PELATFORM FOUNDATIONS\\ui\\packages\\mcp\\dist\\index.js"
      ],
      "cwd": "D:\\PROJECTS\\PELATFORM FOUNDATIONS\\ui"
    }
  }
}
```

### Configuration Parameters

- **command**: `"node"` - Runtime to execute the server
- **args**: Array containing the path to the built server file
- **cwd**: Working directory (project root)

### Path Guidelines

- Use absolute paths in the `args` array
- Update paths according to your system:
  - **Windows**: Use backslashes or forward slashes
  - **macOS/Linux**: Use forward slashes
- Ensure the path points to the compiled `dist/index.js` file

## Available Tools

### 1. `list_packages`

Lists all available packages in the Pelatform UI library.

**Parameters:**

- `category` (optional): Filter by "components", "core", "main", or "all" (default: "all")

**Example Prompts:**

```
Show me all available packages.
List all component packages only.
What core packages are available?
```

### 2. `get_package_info`

Gets detailed information about a specific package.

**Parameters:**

- `package_name` (required): Full package name (e.g., "@pelatform/ui.animation")

**Example Prompts:**

```
Tell me about the @pelatform/ui.animation package.
What's in the base package?
Show me details for @pelatform/ui.default.
What's in the main pelatform-ui package?
```

### 3. `find_component`

Searches for components across all packages.

**Parameters:**

- `component_name` (required): Name to search for
- `package_filter` (optional): Filter by package name

**Example Prompts:**

```
Find the AnimatedGrid component.
Search for "Button" components.
Look for form components in the base package.
Find all animation-related components.
```

### 4. `read_component_code`

Reads the source code of a specific component.

**Parameters:**

- `package_name` (required): Package containing the component
- `component_path` (required): Relative path from src/ directory

**Example Prompts:**

```
Show me the code for AnimatedGrid component in the animation package.
Read the Button implementation.
Display the source code for Dialog component in base package.
```

### 5. `get_usage_example`

Gets usage examples for packages or components.

**Parameters:**

- `package_name` (required): Package name
- `component_name` (optional): Specific component name

**Example Prompts:**

```
Give me usage examples for the animation package.
How do I use the base components?
Show me examples for the AnimatedGrid component.
What's the correct way to implement forms?
How do I use the main pelatform-ui package?
```

## Usage Examples

### Exploring Packages

Use the tools to discover and explore available packages:

- List all packages with `list_packages`
- Get detailed information with `get_package_info`
- Find specific components with `find_component`
- Read source code with `read_component_code`
- Get usage examples with `get_usage_example`

## Common Workflows

### 1. Package Discovery

1. Use `list_packages` to see all available packages
2. Filter by category if needed (components/core)
3. Use `get_package_info` for detailed package information

### 2. Component Search and Analysis

1. Use `find_component` to locate relevant components
2. Use `read_component_code` to examine implementation
3. Use `get_usage_example` for usage patterns

### 3. Learning Patterns

1. Find a component type (e.g., forms, modals, tables)
2. Read multiple implementations
3. Analyze common patterns and best practices

## Tips for Best Results

### Be Specific with Names

- Use full package names: `@pelatform/ui.animation` not just "animation"
- Use exact component names when possible
- Include file extensions in component paths

### Combine Tools

- First `find_component`, then `read_component_code`
- Use `get_package_info` before `get_usage_example`
- Search across packages when unsure of location

### Understand the Structure

- **Components**: Animation, ARIA, Base, and Default UI components
- **Core**: General utilities and React hooks
- **Main**: Main entry point package
- Each package has its own `src/` directory with TypeScript/React files

## Troubleshooting

### Build Issues

1. **Build errors**
   - Run `bun run clean && bun run build`
   - Check TypeScript version
   - Verify all imports resolve correctly

2. **Path resolution**
   - Ensure working directory is correct
   - Check if packages have `src/` directories
   - Verify file paths are accessible

3. **Component access**
   - Use exact file paths from `src/` directory
   - Include file extension (.ts, .tsx, .js, .jsx)
   - Ensure component exists in the specified package

## File Structure Reference

```
packages/
├── mcp/                  # MCP server (current directory)
│   ├── src/              # Source code
│   ├── dist/             # Built output
│   └── README.md         # This file
├── components/           # UI component packages
│   ├── animation/        # Animation components
│   ├── aria/             # ARIA components
│   ├── base/             # Headless components
│   └── default/          # Styled components
├── core/                 # Infrastructure packages
│   ├── general/          # Core utilities
│   └── hook/             # React hooks
└── main/                 # Main package
```

Each package contains:

- `src/` - Source code directory
- `package.json` - Package metadata
- TypeScript/React components and utilities

## Development

### Build

```bash
bun run build
```

### Development Mode

```bash
bun run dev
```

### Type Checking

```bash
bun run types:check
```

### Clean Build

```bash
bun run clean && bun run build
```

## Getting Help

- Check this README.md for basic setup
- Examine existing components for implementation patterns
- Start with simple package exploration before complex searches
- Use the available tools to discover and explore packages

## Notes

- Requires access to the Pelatform UI source code
- Runs directly from source with no npm publishing required
- Designed for development and exploration
