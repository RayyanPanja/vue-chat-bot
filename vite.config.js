import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/vue-ai-chat-bot.js",
      name: "VueChatBot",
      fileName: (format) => `vue-ai-chat-bot.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    minify: "esbuild",
    sourcemap: true,
  },
  esbuild: {
    target: "esnext",
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
});
