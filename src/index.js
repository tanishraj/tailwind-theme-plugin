import tailwindPlugin from "tailwindcss";
import themeConfig from "./themeConfig";
import { generateThemeStyles } from "./utils";
import generatedCss from "./generatedCss";

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