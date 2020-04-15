import '../../utils/whitepaper/whitepaper.css';
import './Theme.css';
import './_color/Theme_color_gpnDark.css';
import './_color/Theme_color_gpnDefault.css';
import './_color/Theme_color_gpnDisplay.css';
import './_control/Theme_control_gpnDefault.css';
import './_font/theme_font_gpnDefault.css';
import './_size/Theme_size_gpnDefault.css';
import './_space/Theme_space_gpnDefault.css';

import React from 'react';
import { cn } from '../../utils/bem';

export const cnTheme = cn('Theme');
export type IThemePropColor = 'gpnDark' | 'gpnDefault' | 'gpnDisplay';

export type ThemeProps = {
  className?: string;
};

export type HOCArguments = {
  color?: IThemePropColor;
  control?: 'gpnDefault';
  font?: 'gpnDefault';
  size?: 'gpnDefault';
  space?: 'gpnDefault';
};

export type IComponentWithTheme<T = {}> = ThemeProps & Omit<T, keyof ThemeProps>;

export type ITheme = HOCArguments & Omit<React.HTMLAttributes<Element>, keyof HOCArguments>;

export function withThemeHOC<T>(props: HOCArguments | undefined = {}) {
  const {
    color = 'gpnDefault',
    control = 'gpnDefault',
    size = 'gpnDefault',
    font = 'gpnDefault',
    space = 'gpnDefault',
  } = props;
  return function(Component: React.ElementType) {
    return function ComponentWithTheme({
      className,
      ...otherProps
    }: IComponentWithTheme<T>): React.ReactElement {
      return (
        <Component
          className={cnTheme({ color, control, size, font, space }, [className])}
          {...otherProps}
        />
      );
    };
  };
}

export function Theme(props: ITheme): React.ReactElement {
  const {
    color = 'gpnDefault',
    control = 'gpnDefault',
    size = 'gpnDefault',
    font = 'gpnDefault',
    space = 'gpnDefault',
    ...otherProps
  } = props;

  const DivWithTheme = withThemeHOC({ color, control, size, font, space })('div');

  return <DivWithTheme {...otherProps} />;
}
