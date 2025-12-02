import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: ["react"],
    entry: ["./src/index.ts"],
    format: "esm",
    target: "ES2022",
    banner: { js: '"use client";' },
  };
});
