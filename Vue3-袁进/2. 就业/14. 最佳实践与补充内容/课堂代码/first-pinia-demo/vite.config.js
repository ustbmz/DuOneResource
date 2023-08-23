import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

const pathResolve = (dir) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathResolve("./src"),
    },
  },
});
