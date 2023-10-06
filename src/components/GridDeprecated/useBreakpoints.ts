import { ClassNameFormatter } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import { isEmpty } from '../../utils/object';

type Breakpoint = Record<string, string | number | undefined>;
export type Breakpoints = Record<string, Breakpoint | undefined>;

const generateBreakpointCn = (
  cn: ClassNameFormatter,
  size: string,
  breakpoint: Breakpoint,
): string | undefined => {
  const cnProps = Object.keys(breakpoint).reduce((previous, current) => {
    return {
      ...previous,
      [`${size}:${current}`]:
        breakpoint[current] === undefined
          ? undefined
          : `${breakpoint[current]}`,
    };
  }, {});

  return cn(cnProps);
};

export const generateBreakpointsCn = (
  cn: ClassNameFormatter,
  breakpoints?: Breakpoints,
): string => {
  if (!breakpoints || isEmpty(breakpoints)) {
    return '';
  }

  return Object.keys(breakpoints).reduce((previous, current) => {
    const breakpoint = breakpoints[current];

    if (breakpoint && !isEmpty(breakpoint)) {
      return classnames(
        previous,
        generateBreakpointCn(cn, current, breakpoint),
      );
    }
    return '';
  }, '');
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
 * breakpoints = {
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
 * }
 *
 * =>
 *
 * Grid Grid_xs:gap_0 Grid_xs:cols_12 Grid_xs:xAlign_center Grid_xs:yAlign_center Grid_s:gap_33 Grid_s:cols_12 Grid_s:xAlign_center Grid_s:yAlign_center
 *
 */
export const useBreakpoints = (
  cn: ClassNameFormatter,
  breakpoints?: Breakpoints,
) => generateBreakpointsCn(cn, breakpoints);
