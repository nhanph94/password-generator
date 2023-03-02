import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_NAME__: JSON.stringify(process.env.npm_package_displayName),
    __APP_DESCRIPTION__: JSON.stringify(process.env.npm_package_description),
    __BUILD_VERSION__: `${new Date().getFullYear()}${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}${("0" + new Date().getDate()).slice(-2)}`,
  },
});
