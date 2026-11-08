import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep the REACT_APP_ names so the Cloudflare Pages variables stay as they are.
  envPrefix: "REACT_APP_",
  // Cloudflare Pages publishes the build/ directory.
  build: { outDir: "build" },
  // Away from MakerRepo (3000, Vite 3036/3037) and the staff app (Vite default 5173; its README says 3001).
  // strictPort: fail loudly instead of drifting to another port.
  server: { port: 3002, strictPort: true },
  preview: { port: 3003, strictPort: true },
});
