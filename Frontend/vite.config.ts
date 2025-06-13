import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": {
                target: RENDER_URL,
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
