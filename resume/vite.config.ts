import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { qrcode } from "vite-plugin-qrcode";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react(), svgr(), qrcode()],
  base: "/",
  server: { watch: { usePolling: true }, host: true },
  css: { postcss: { plugins: [autoprefixer({})] } },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
