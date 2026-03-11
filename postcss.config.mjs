// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // ← use this instead of "tailwindcss"
  },
};
export default config;
