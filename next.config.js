const { i18n } = require("./next-i18next.config");
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    ENV: process.env.VERCEL_ENV,
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID:
      process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};
