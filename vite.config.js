import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "78b4d64bb511.ngrok-free.app",
    },
    allowedHosts: ["78b4d64bb511.ngrok-free.app"],
  },
  plugins: [react()],
});
