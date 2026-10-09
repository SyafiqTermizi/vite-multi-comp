import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "build"),
    emptyOutDir: true,
    manifest: true, // useful if a backend (Django/Flask) needs to find hashed files
    rollupOptions: {
      input: {
        style: path.resolve(__dirname, "src/scss/index.scss"),
        comp_1: path.resolve(__dirname, "src/ts/comp_1/index.tsx"),
        comp_2: path.resolve(__dirname, "src/ts/comp_2/index.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith(".css"))) {
            return "css/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});