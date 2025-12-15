#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { glob } from "glob";
import { z } from "zod";

// Check for test flag
const isTestMode = process.argv.includes("--test");

if (isTestMode) {
  console.log("✅ MCP server executable test passed");
  process.exit(0);
}

// Get current directory for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Handle both development (src) and built (dist) environments
const PACKAGES_ROOT = resolve(__dirname, "..", ".."); // packages/mcp/src|dist -> packages
const COMPONENTS_ROOT = join(PACKAGES_ROOT, "components");
const CORE_ROOT = join(PACKAGES_ROOT, "core");
const MAIN_ROOT = join(PACKAGES_ROOT, "main");

// Package information cache
// biome-ignore lint/suspicious/noExplicitAny: <>
const packages = new Map<string, any>();
// biome-ignore lint/suspicious/noExplicitAny: <>
const components = new Map<string, any>();

class PelatformUIMCPServer {
  private async loadPackageInfo(): Promise<void> {
    try {
      // Scan components, core, and main directories
      const componentsDirs = await glob(join(COMPONENTS_ROOT, "*"), {
        windowsPathsNoEscape: true,
      });
      const coreDirs = await glob(join(CORE_ROOT, "*"), {
        windowsPathsNoEscape: true,
      });
      // Add main directory directly (it contains one package)
      const allPackageDirs = [...componentsDirs, ...coreDirs, MAIN_ROOT];

      for (const packageDir of allPackageDirs) {
        const packageJsonPath = join(packageDir, "package.json");

        try {
          await access(packageJsonPath);
          const packageJsonContent = await readFile(packageJsonPath, "utf-8");
          const packageJson = JSON.parse(packageJsonContent);

          if (
            packageJson.name?.startsWith("@pelatform/ui.") ||
            packageJson.name === "pelatform-ui"
          ) {
            const srcDir = join(packageDir, "src");

            try {
              await access(srcDir);

              // Get all TypeScript/TSX files in src directory
              const componentFiles = await glob(join(srcDir, "**/*.{ts,tsx}"), {
                windowsPathsNoEscape: true,
              });

              // Extract exported components/members from package.json exports
              const exports = Object.keys(packageJson.exports || {})
                .filter((key) => key !== "./package.json")
                .map((key) => key.replace("./", ""));

              const packageInfo = {
                name: packageJson.name,
                version: packageJson.version,
                description: packageJson.description,
                main: packageJson.main,
                exports: exports,
                dependencies: packageJson.dependencies || {},
                devDependencies: packageJson.devDependencies || {},
                srcDir,
                componentFiles,
                category: this.getPackageCategory(packageJson.name),
              };

              packages.set(packageJson.name, packageInfo);

              // Index components
              for (const componentFile of componentFiles) {
                const componentName = basename(componentFile, extname(componentFile));
                const relativePath = relative(srcDir, componentFile).replace(/\\/g, "/");

                components.set(componentName, {
                  name: componentName,
                  package: packageJson.name,
                  path: relativePath,
                  fullPath: componentFile,
                });
              }
            } catch (_error) {}
          }
        } catch (_error) {}
      }
    } catch (error) {
      console.error("Error loading package info:", error);
    }
  }

  private getPackageCategory(packageName: string): string {
    if (packageName.includes(".general") || packageName.includes(".hook")) {
      return "core";
    }
    if (
      packageName.includes(".animation") ||
      packageName.includes(".aria") ||
      packageName.includes(".base") ||
      packageName.includes(".default")
    ) {
      return "components";
    }
    if (packageName.includes(".main") || packageName === "pelatform-ui") {
      return "main";
    }
    return "other";
  }

  async listPackages(category: string = "all") {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    let filteredPackages = Array.from(packages.values());

    if (category !== "all") {
      filteredPackages = filteredPackages.filter((pkg) => pkg.category === category);
    }

    return {
      content: [
        {
          type: "text" as "text",
          text: JSON.stringify(
            {
              packages: filteredPackages.map((pkg) => ({
                name: pkg.name,
                version: pkg.version,
                description: pkg.description,
                category: pkg.category,
                exportsCount: pkg.exports.length,
              })),
              total: filteredPackages.length,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  async getPackageInfo(packageName: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    const pkg = packages.get(packageName);
    if (!pkg) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Package ${packageName} not found`,
                availablePackages: Array.from(packages.keys()),
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as "text",
          text: JSON.stringify(pkg, null, 2),
        },
      ],
    };
  }

  async findComponent(componentName: string, packageFilter?: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    let matchingComponents = Array.from(components.values()).filter((comp) =>
      comp.name.toLowerCase().includes(componentName.toLowerCase()),
    );

    if (packageFilter) {
      matchingComponents = matchingComponents.filter((comp) =>
        comp.package.includes(packageFilter),
      );
    }

    return {
      content: [
        {
          type: "text" as "text",
          text: JSON.stringify(
            {
              components: matchingComponents,
              total: matchingComponents.length,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  async readComponentCode(packageName: string, componentPath: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    const pkg = packages.get(packageName);
    if (!pkg) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Package ${packageName} not found`,
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    const fullPath = join(pkg.srcDir, componentPath);

    try {
      await access(fullPath);
      const code = await readFile(fullPath, "utf-8");

      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                package: packageName,
                component: componentPath,
                code,
                fullPath,
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (_error) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Component file not found: ${componentPath}`,
                package: packageName,
                searchedPath: fullPath,
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  async getUsageExample(packageName: string, componentName?: string) {
    if (packages.size === 0) {
      await this.loadPackageInfo();
    }

    const pkg = packages.get(packageName);
    if (!pkg) {
      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                error: `Package ${packageName} not found`,
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    // Try to find README or examples
    const readmePath = join(pkg.srcDir, "..", "README.md");

    try {
      await access(readmePath);
      const readme = await readFile(readmePath, "utf-8");

      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                package: packageName,
                component: componentName,
                readme,
                note: componentName
                  ? `Specific examples for ${componentName} not found. Showing package README.`
                  : "Package README and usage examples",
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (_error) {
      // Generate basic usage example
      const example = this.generateUsageExample(packageName, componentName);

      return {
        content: [
          {
            type: "text" as "text",
            text: JSON.stringify(
              {
                package: packageName,
                component: componentName,
                example,
                note: "Generated usage example",
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  private generateUsageExample(packageName: string, componentName?: string): string {
    const shortName = packageName.replace("@pelatform/ui.", "").replace("pelatform-ui", "ui");

    if (componentName) {
      return `import { ${componentName} } from "${packageName}";

// Usage example for ${componentName}
function Example() {
  return (
    <${componentName}
      // Add props as needed
    />
  );
}

export default Example;`;
    }

    return `// Example usage for ${packageName}
import { ${shortName.charAt(0).toUpperCase() + shortName.slice(1)}Provider } from "${packageName}";

// Configure in your app
function App() {
  return (
    <${shortName.charAt(0).toUpperCase() + shortName.slice(1)}Provider>
      {/* Your app components */}
    </${shortName.charAt(0).toUpperCase() + shortName.slice(1)}Provider>
  );
}`;
  }
}

// Create server instance
const server = new McpServer({
  name: "Pelatform UI",
  version: "0.1.0",
});

// Instance of our business logic
const pelatformServer = new PelatformUIMCPServer();

// Register tools using the new API
server.registerTool(
  "list_packages",
  {
    description: "List all available Pelatform UI packages",
    inputSchema: {
      category: z
        .enum(["core", "components", "main", "all"])
        .default("all")
        .describe("Filter packages by category"),
    },
  },
  async ({ category }) => {
    const result = await pelatformServer.listPackages(category || "all");
    return result;
  },
);

server.registerTool(
  "get_package_info",
  {
    description: "Get detailed information about a specific package",
    inputSchema: {
      package_name: z
        .string()
        .min(1, "Package name is required")
        .describe("The name of the package (e.g., @pelatform/ui.animation)"),
    },
  },
  async ({ package_name }) => {
    const result = await pelatformServer.getPackageInfo(package_name);
    return result;
  },
);

server.registerTool(
  "find_component",
  {
    description: "Find a specific component in the packages",
    inputSchema: {
      component_name: z
        .string()
        .min(1, "Component name is required")
        .describe("The name of the component to find"),
      package_filter: z
        .string()
        .optional()
        .describe("Optional package to search in (e.g., admin, auth)"),
    },
  },
  async ({ component_name, package_filter }) => {
    const result = await pelatformServer.findComponent(component_name, package_filter);
    return result;
  },
);

server.registerTool(
  "read_component_code",
  {
    description: "Read the source code of a specific component",
    inputSchema: {
      package_name: z
        .string()
        .min(1, "Package name is required")
        .describe("The package containing the component"),
      component_path: z
        .string()
        .min(1, "Component path is required")
        .describe("The relative path to the component from src/"),
    },
  },
  async ({ package_name, component_path }) => {
    const result = await pelatformServer.readComponentCode(package_name, component_path);
    return result;
  },
);

server.registerTool(
  "get_usage_example",
  {
    description: "Get usage examples for a package or specific component",
    inputSchema: {
      package_name: z
        .string()
        .min(1, "Package name is required")
        .describe("The package to get examples for"),
      component_name: z.string().optional().describe("Optional specific component name"),
    },
  },
  async ({ package_name, component_name }) => {
    const result = await pelatformServer.getUsageExample(package_name, component_name);
    return result;
  },
);

/**
 * Main entry point for the Pelatform UI MCP Server
 *
 * This script initializes the MCP server using the official MCP SDK and
 * provides tools and resources for exploring the Pelatform UI packages.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Pelatform UI MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
