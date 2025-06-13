import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    // Load .env file based on current mode (e.g. "development" or "production")
    const env = loadEnv(mode, process.cwd());

    const RENDER_URL = env.VITE_RENDER_URL || "http://localhost:5000";

    return {
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
    };
});
