const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nested = require('postcss-nested');
const tailwindcss = require('tailwindcss');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
  plugins: [
    nested(),
    tailwindcss(),
    autoprefixer(),
    !dev &&
      cssnano({
        preset: 'default',
      }),
  ],
};
