import { useEffect, useRef, useState } from 'react';

import { generateDeps, useTheme } from '##/components/Theme';
import { isEq } from '##/utils/object';

import { getStyleProps } from './getStyleProps';
import { varIsArray } from './helpers';
import { Value } from './types';

const isEqState = <K extends string, V extends unknown>(
  state: Record<K, V> | string,
  newState: Record<K, V> | string,
) => {
  if (typeof state === 'string' || typeof newState === 'string') {
    return state === newState;
  }
  return isEq(state, newState);
};

const getCssVarsHash = (
  vars: string | string[] | readonly string[],
): string => {
  if (varIsArray(vars)) {
    vars.join();
  } else {
    return vars;
  }
  return '';
};

export const useStyleProps = <
  Element extends HTMLElement | SVGElement = HTMLDivElement,
  StyleProps extends string | string[] | readonly string[] = string,
>(
  props: StyleProps,
): [React.RefObject<Element>, Value<StyleProps>] => {
  const { theme } = useTheme();
  const ref = useRef<Element>(null);
  const [value, setValue] = useState<Value<StyleProps>>(
    varIsArray(props) ? ({} as Value<StyleProps>) : ('' as Value<StyleProps>),
  );

  useEffect(() => {
    setValue((state) => {
      const newState = ref.current
        ? getStyleProps(ref.current, props)
        : undefined;

      if (typeof newState !== 'undefined' && !isEqState(value, newState)) {
        return newState;
      }

      return state;
    });
  }, [generateDeps(theme), ref.current, getCssVarsHash(props)]);

  return [ref, value];
};
