/* eslint-disable no-unused-vars */
import { useMemo } from 'react';

import { cnTheme, useTheme } from '##/components/Theme/Theme';
import { getStyleProps } from '##/hooks/useStyleProps';

import { defaultVars } from './helpers';

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

const addElements = (...array: {}[]): HTMLDivElement[] => {
  const elements: HTMLDivElement[] = [];
  for (let index = 0; index < array.length; index++) {
    const mods = array[index];
    const element = document.createElement('div');
    element.setAttribute('class', cnTheme(mods));
    document.body.append(element);
    elements.push(element);
  }
  return elements;
};

const removeElements = (array: HTMLDivElement[]) => {
  for (let index = 0; index < array.length; index++) {
    document.body.removeChild(array[index]);
  }
};

export const useThemeVars = <T extends Vars = typeof defaultVars>(
  options?: UseThemeVarsOptions<T>,
) => {
  const variables = options?.vars || defaultVars;

  const { theme } = useTheme();

  return useMemo(() => {
    const elements = addElements(
      {
        ...theme,
        color: theme.color.primary,
      },
      { color: theme.color.accent },
      { color: theme.color.invert },
    );

    const themeVars = {
      color: {
        primary: getStyleProps(elements[0], variables.color.primary),
        accent: getStyleProps(elements[1], variables.color.accent),
        invert: getStyleProps(elements[2], variables.color.invert),
      },
      control: getStyleProps(elements[0], variables.control),
      font: getStyleProps(elements[0], variables.font),
      size: getStyleProps(elements[0], variables.size),
      space: getStyleProps(elements[0], variables.space),
      shadow: getStyleProps(elements[0], variables.shadow),
    } as ThemeVars<T>;

    removeElements(elements);

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
