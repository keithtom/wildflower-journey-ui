const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  localePath: path.resolve("./public/locales"),
  returnEmptyString: false, // Treat empty strings as missing keys
  returnNull: false, // Treat null as missing keys
};
