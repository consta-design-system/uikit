import './ThemeToggler.css';

import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { IconMoon } from '../../icons/IconMoon/IconMoon';
import { IconSun } from '../../icons/IconSun/IconSun';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Theme, ThemePreset } from '../Theme/Theme';

export const themeTogglerPropSize = ['m', 's', 'xs', 'l'] as const;
export type ThemeTogglerPropSize = typeof themeTogglerPropSize[number];
export const themeTogglerPropSizeDefault: ThemeTogglerPropSize = themeTogglerPropSize[0];

export type ThemeTogglerPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

type Props = {
  size?: ThemeTogglerPropSize;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  children?: never;
  getPreset: (themeName: string) => ThemePreset;
};

export type ThemeTogglerProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

const cnThemeToggler = cn('ThemeToggler');

export const ThemeToggler = React.forwardRef<HTMLLabelElement, ThemeTogglerProps>((props) => {
  const {
    size = themeTogglerPropSizeDefault,
    // className,
    // onFocus,
    // onBlur,
    // inputRef,
    getPreset,
    // ...otherProps
  } = props;

  const [theme, setTheme] = useState<string>('gpnDefault');
  const recalcSize = size === 'l' ? 'm' : size;

  return (
    <Theme preset={getPreset(theme)} className={cnThemeToggler()}>
      {theme === 'gpnDefault' && (
        <IconSun
          onClick={() => setTheme('gpnDark')}
          className={cnThemeToggler('Icon')}
          size={recalcSize}
        />
      )}
      {theme === 'gpnDark' && (
        <IconMoon
          onClick={() => setTheme('gpnDefault')}
          className={cnThemeToggler('Icon')}
          size={recalcSize}
        />
      )}
    </Theme>
  );
});
