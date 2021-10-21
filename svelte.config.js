import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $components: resolve('src/components'),
          $types: resolve('src/types'),
        },
      },
    },
  },
};
