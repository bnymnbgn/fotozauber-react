// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "e29548a3cb0c.ngrok-free.app",
    },
    allowedHosts: ["e29548a3cb0c.ngrok-free.app"],
  },
  plugins: [
    react(),
    svgr(), // Die einfache Konfiguration reicht aus
  ],
});
