export function generateThemeStyles(themes) {
  const { light, dark } = themes;

  const createVariables = theme =>
    Object.entries(theme).reduce((vars, [key, value]) => {
      vars[`--color-${key}`] = value;
      return vars;
    }, {});

  const lightVariables = createVariables(light);
  const darkVariables = createVariables(dark);

  return {
    base: {
      ':root': lightVariables,
      '.dark': darkVariables,
    },
  };
}
