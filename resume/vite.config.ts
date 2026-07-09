import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { qrcode } from "vite-plugin-qrcode";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react(), svgr(), qrcode()],
  base: "./",
  server: { watch: { usePolling: true }, host: true },
  css: { postcss: { plugins: [autoprefixer({})] } },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/i18next") || id.includes("node_modules/react-i18next")) {
            return "vendor-i18n";
          }
          if (id.includes("node_modules/jspdf") || id.includes("node_modules/html2canvas")) {
            return "vendor-pdf";
          }
        },
      },
    },
  },
});
