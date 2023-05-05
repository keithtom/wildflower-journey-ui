module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    ENV: process.env.VERCEL_ENV,
    HIGHLIGHT_SECRET: process.env.HIGHLIGHT_SECRET,
  },
};
