/* eslint-disable no-unused-vars */
import { useMemo } from 'react';

import { cnTheme, useTheme } from '../../components/Theme/Theme';
import { defaultVars } from './helpers';

export { defaultVars } from './helpers';

export type Vars = {
  readonly color: {
    readonly primary: readonly string[];
    readonly accent: readonly string[];
    readonly invert: readonly string[];
  };
  readonly control: readonly string[];
  readonly font: readonly string[];
  readonly size: readonly string[];
  readonly space: readonly string[];
  readonly shadow: readonly string[];
};

export type ThemeVars<T extends Vars = typeof defaultVars> = {
  color: {
    primary: { [key in T['color']['primary'][number]]: string };
    accent: { [key in T['color']['accent'][number]]: string };
    invert: { [key in T['color']['invert'][number]]: string };
  };
  control: { [key in T['control'][number]]: string };
  font: { [key in T['font'][number]]: string };
  size: { [key in T['size'][number]]: string };
  space: { [key in T['space'][number]]: string };
  shadow: { [key in T['shadow'][number]]: string };
};

type UseThemeVarsOptions<T> = {
  vars?: T;
  deps?: [];
};

const getVars = <T extends string>(
  cssVars: readonly T[],
  element: HTMLDivElement,
): { [key in T]: string } => {
  const vars: { [key in T]: string } = {} as { [key in T]: string };

  const style = getComputedStyle(element);

  for (let i = 0; i < cssVars.length; i++) {
    vars[cssVars[i]] = style.getPropertyValue(cssVars[i]).trim();
  }

  return vars;
};

const addElement = (mods: {}): HTMLDivElement => {
  const element = document.createElement('div');
  element.setAttribute('class', cnTheme(mods));
  document.body.append(element);
  return element;
};

export const useThemeVars = <T extends Vars = typeof defaultVars>(
  options?: UseThemeVarsOptions<T>,
) => {
  const variables = options?.vars || defaultVars;

  const { theme } = useTheme();

  return useMemo(() => {
    const elementPrimary = addElement({
      ...theme,
      color: theme.color.primary,
    });
    const elementAccent = addElement({ color: theme.color.accent });
    const elementInvert = addElement({ color: theme.color.invert });

    const themeVars: ThemeVars<T> = {
      color: {
        primary: getVars<T['color']['primary'][number]>(
          variables.color.primary,
          elementPrimary,
        ),
        accent: getVars<T['color']['accent'][number]>(
          variables.color.accent,
          elementAccent,
        ),
        invert: getVars<T['color']['invert'][number]>(
          variables.color.invert,
          elementInvert,
        ),
      },
      control: getVars<T['control'][number]>(variables.control, elementPrimary),
      font: getVars<T['font'][number]>(variables.font, elementPrimary),
      size: getVars<T['size'][number]>(variables.size, elementPrimary),
      space: getVars<T['space'][number]>(variables.space, elementPrimary),
      shadow: getVars<T['shadow'][number]>(variables.shadow, elementPrimary),
    };

    document.body.removeChild(elementPrimary);
    document.body.removeChild(elementAccent);
    document.body.removeChild(elementInvert);

    return themeVars;
  }, [
    theme.color.primary,
    theme.color.accent,
    theme.color.invert,
    theme.control,
    theme.font,
    theme.size,
    theme.space,
    theme.shadow,
    ...(options?.deps ? options.deps : []),
  ]);
};
