import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: ["react"],
    entry: [
      "./src/index.ts",
      "./src/animation.ts",
      "./src/aria.ts",
      "./src/base.ts",
      "./src/default.ts",
      "./src/hooks.ts",
      "./src/components.ts",
      "./src/server.ts",
    ],
    format: "esm",
    target: "ES2022",
  };
});
