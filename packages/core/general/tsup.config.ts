import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    clean: true,
    dts: true,
    external: ["react"],
    entry: ["./src/index.ts", "./src/server.ts"],
    format: "esm",
    target: "ES2022",
  };
});
