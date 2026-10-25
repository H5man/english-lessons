import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Сайт живёт на https://h5man.github.io/english-lessons/
export default defineConfig({
  base: "/english-lessons/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
