const path = require("path");
const { defineConfig } = require("vite");

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "AutoSidebar",
      fileName: (format: string) =>
        format == "es"
          ? `vitepress-plugin-auto-sidebar.${format}.mjs`
          : `vitepress-plugin-auto-sidebar.${format}.js`,
    },
    rollupOptions: {
      external: ["fs", "path"],
    },
  },
});
