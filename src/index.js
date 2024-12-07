import tailwindPlugin from "tailwindcss/plugin";
import themeConfig from "./themeConfig.js";
import generateThemeStyles from "./utils.js";
import generatedCss from "./generatedCss.js";

export default (options = {}) =>
  tailwindPlugin(function ({ addBase, addComponents }) {
    const themes = options.themes || themeConfig.themes;
    const { base } = generateThemeStyles(themes);
    addBase(base);

    // Now addComponents receives final CSS (no @apply or @tailwind)
    addComponents({
      generatedCss,
    });
  });