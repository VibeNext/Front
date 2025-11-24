//local서버에서만 작동

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr(), ],
  server: {
    proxy: {
      "/missions": {
        target: "https://nextvibe.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
      "/solutions": {
        target: "https://nextvibe.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "https://nextvibe.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
