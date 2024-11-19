module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    fallbackLng: "en",
  },
  localePath: path.resolve("./public/locales"),
  returnEmptyString: false, // Treat empty strings as missing keys
  returnNull: false, // Treat null as missing keys
};
