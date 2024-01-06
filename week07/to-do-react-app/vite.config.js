import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import fs from "fs/promises"; //config jsx to js except main.jsx because JSX's syntax

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //config jsx to js except main.jsx because JSX's syntax
  //link: https://github.com/vitejs/vite/discussions/3448
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
});
