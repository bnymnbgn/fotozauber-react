// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "c27c27ee2c02.ngrok-free.app",
    },
    allowedHosts: ["c27c27ee2c02.ngrok-free.app"],
  },
  plugins: [
    react(),
    svgr(), // Die einfache Konfiguration reicht aus
  ],
});
