import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep the REACT_APP_ names so the Cloudflare Pages variables stay as they are.
  envPrefix: "REACT_APP_",
  // Cloudflare Pages publishes the build/ directory.
  build: { outDir: "build" },
});
