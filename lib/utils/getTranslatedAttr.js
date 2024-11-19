export const getTranslatedAttr = (lang, attr) => {
  if (!lang || lang === "en") {
    return attr;
  }
  return `${attr}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
};
