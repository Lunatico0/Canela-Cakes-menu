// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@styles": "/src/styles",
        "@data": "/src/data",
        "@layouts": "/src/layouts",
        "@components": "/src/components",
        "@public": "/public",
      },
    },
  }
});
