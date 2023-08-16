import { varIsArray, varIsString } from './helpers';
import { Value } from './types';

export const getStyleProps = <
  StyleProps extends string | string[] | readonly string[] = string,
>(
  element: HTMLElement | SVGElement,
  props: StyleProps,
): Value<StyleProps> => {
  if (varIsString(props)) {
    return getComputedStyle(element).getPropertyValue(props) as Value<
      typeof props
    >;
  }
  if (varIsArray(props)) {
    const value: Record<string, string> = {};
    const style = getComputedStyle(element);
    for (let index = 0; index < props.length; index++) {
      value[props[index]] = style.getPropertyValue(props[index]);
    }
    return value as Value<StyleProps>;
  }
  return '' as Value<StyleProps>;
};
