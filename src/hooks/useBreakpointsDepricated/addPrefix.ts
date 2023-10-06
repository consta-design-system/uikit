const firstLetterUppercase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const addPrefix = (
  breakpoints: Record<string, boolean>,
  prefix = 'breakpoint',
) => {
  const keys = Object.keys(breakpoints);
  const mods: Record<string, boolean> = {};
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    mods[`${prefix}${firstLetterUppercase(key)}`] = breakpoints[key];
  }
  return mods;
};
