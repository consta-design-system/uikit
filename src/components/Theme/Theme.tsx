import React from 'react';
import { cn } from '../../utils/bem';

export type IThemePropColor = 'gpnDark' | 'gpnDefault' | 'gpnDisplay';
export type IThemePropGap = 's' | 'm' | 'l';
export type ThemeProps = {
  className?: string;
};
export type HOCArguments = {
  color?: IThemePropColor;
  control?: 'gpnDefault';
  font?: 'gpnDefault';
  size?: 'gpnDefault';
  space?: 'gpnDefault';
  gap?: IThemePropGap;
};
export type IComponentWithTheme<T = {}> = ThemeProps & Omit<T, keyof ThemeProps>;
export type ITheme = HOCArguments & Omit<React.HTMLAttributes<Element>, keyof HOCArguments>;

export const cnTheme = cn('Theme');

export function withThemeHOC<T>(props: HOCArguments | undefined = {}) {
  const { color, control, size, font, space, gap } = props;
  return function(Component: React.ElementType) {
    return function ComponentWithTheme({
      className,
      ...otherProps
    }: IComponentWithTheme<T>): React.ReactElement {
      return (
        <Component
          className={cnTheme({ color, control, size, font, space, gap }, [className])}
          {...otherProps}
        />
      );
    };
  };
}

export function Theme(props: ITheme): React.ReactElement {
  const { color, control, size, font, space, gap, ...otherProps } = props;
  const DivWithTheme = withThemeHOC({ color, control, size, font, space, gap })('div');

  return <DivWithTheme {...otherProps} />;
}
