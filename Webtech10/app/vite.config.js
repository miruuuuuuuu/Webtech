import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Any fetch("/posts...") from the React app during `npm run dev`
      // is forwarded to the Express server, avoiding CORS issues.
      "/posts": {
        target: "http://localhost:5050",
        changeOrigin: true,
      },
    },
  },
});
