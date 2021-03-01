import { useMemo } from 'react';
import { ClassNameFormatter } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

type Breakpoint = { [key: string]: string | number | undefined };
type Breakpoints = { [key: string]: Breakpoint | undefined };

const generateBreakpointCn = (
  cn: ClassNameFormatter,
  size: string,
  breakpoint?: Breakpoint,
): string | undefined => {
  if (!breakpoint) {
    return undefined;
  }

  let cnProps = {};

  const breakpointProps = Object.keys(breakpoint);

  for (let i = 0; i < breakpointProps.length; i++) {
    cnProps = {
      ...cnProps,
      [`${size}:${breakpointProps[i]}`]:
        breakpoint[breakpointProps[i]] === undefined
          ? undefined
          : `${breakpoint[breakpointProps[i]]}`,
    };
  }

  return cn(cnProps);
};

const generateBreakpointsCn = (
  cn: ClassNameFormatter,
  breakpoints?: Breakpoints,
): string | undefined => {
  if (!breakpoints) {
    return undefined;
  }

  let className: string | undefined;

  const sizes = Object.keys(breakpoints);

  for (let i = 0; i < sizes.length; i++) {
    className = classnames(className, generateBreakpointCn(cn, sizes[i], breakpoints[sizes[i]]));
  }

  return className;
};

/**
 *
 * @param cn ClassNameFormatter
 * @param breakpoints Breakpoints
 *
 * хук вернет сгенерированный класс на основе `breakpoints`
 *
 * Пример:
 *
 * cn = cn('Grid')
 *
 * xs: {
 *   gap: 0,
 *   cols: 12,
 *   xAlign: 'center',
 *   yAlign: 'center',
 * },
 * s: {
 *   gap: 33,
 *   cols: 12,
 *   xAlign: 'center',
 *   yAlign: 'center',
 * }
 *
 * =>
 *
 * Grid Grid_xs:gap_0 Grid_xs:cols_12 Grid_xs:xAlign_center Grid_xs:yAlign_center Grid_s:gap_33 Grid_s:cols_12 Grid_s:xAlign_center Grid_s:yAlign_center
 *
 */
export const useBreakpoints = (cn: ClassNameFormatter, breakpoints?: Breakpoints) =>
  useMemo(() => generateBreakpointsCn(cn, breakpoints), [breakpoints]);
