// vite.config.js
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/vue-chat-bot.js", // Entry point for your library
      name: "VueChatBot", // Name of the global variable when included in the browser
      fileName: (format) => `vue-chat-bot.${format}.js`, // Output file names
    },
    rollupOptions: {
      external: ["vue"], // Vue will be externalized to avoid bundling it
      output: {
        globals: {
          vue: "Vue", // This is the global variable for Vue
        },
      },
    },
  },
});
