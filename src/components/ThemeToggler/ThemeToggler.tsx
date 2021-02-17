import './ThemeToggler.css';

import React, { FC, useRef, useState } from 'react';
import { cn } from '@bem-react/classname';

import { IconProps } from '../../icons/Icon/Icon';
import { IconCheck } from '../../icons/IconCheck/IconCheck';
import { Button } from '../Button/Button';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { Theme, ThemePreset } from '../Theme/Theme';

export const themeTogglerPropSize = ['m', 's', 'xs', 'l'] as const;
export type ThemeTogglerPropSize = typeof themeTogglerPropSize[number];
export const themeTogglerPropSizeDefault: ThemeTogglerPropSize = themeTogglerPropSize[0];

type Theme = {
  label: string;
  theme: ThemePreset;
  icon: FC<IconProps>;
};

type Props = {
  size?: ThemeTogglerPropSize;
  className?: string;
  contextMenuClassName?: string;
  themes: Theme[];
  value: ThemePreset;
  setValue: (themePreset: ThemePreset) => void;
  getThemeLabel?: (theme: Theme) => string;
  getThemeValue: (theme: Theme) => ThemePreset;
  getThemeIcon: (theme: Theme) => FC<IconProps>;
};

export const cnThemeToggler = cn('ThemeToggler');

export const ThemeToggler = (props: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    size = themeTogglerPropSizeDefault,
    className,
    contextMenuClassName,
    themes,
    value,
    setValue,
    getThemeLabel,
    getThemeValue,
    getThemeIcon,
    ...otherProps
  } = props;

  const recalcSize = () => {
    if (size === 'l') {
      return 'm';
    }
    if (size === 'm') {
      return 's';
    }
    return size;
  };

  const getTogglerBody = () => {
    if (themes.length === 2) {
      const Icon = getThemeIcon(themes[0]);
      const IconTwo = getThemeIcon(themes[1]);

      return (
        <div className={cnThemeToggler()}>
          {value === getThemeValue(themes[0]) && (
            <Icon
              onClick={() => setValue(getThemeValue(themes[1]))}
              className={cnThemeToggler('Icon')}
              size={recalcSize()}
            />
          )}
          {value === getThemeValue(themes[1]) && (
            <IconTwo
              onClick={() => setValue(getThemeValue(themes[0]))}
              className={cnThemeToggler('Icon')}
              size={recalcSize()}
            />
          )}
        </div>
      );
    }
    if (themes.length === 3) {
      const Icon = getThemeIcon(themes[0]);
      const IconTwo = getThemeIcon(themes[1]);
      const IconThree = getThemeIcon(themes[2]);
      const getPreviewIcon = () => {
        if (value === getThemeValue(themes[0])) {
          return Icon;
        }
        if (value === getThemeValue(themes[1])) {
          return IconTwo;
        }
        return IconThree;
      };
      const PreviewIcon = getPreviewIcon();
      const renderIcons = (item: Theme) => {
        const Icon = getThemeIcon(item);
        return <Icon size={recalcSize()} />;
      };
      const renderChecks = (item: Theme) => {
        return getThemeValue(item) === value && <IconCheck size={recalcSize()} />;
      };
      const emptyFn = () => '';

      return (
        <>
          <Button
            className={cnThemeToggler('PreviewIcon')}
            ref={ref}
            onlyIcon
            iconLeft={PreviewIcon}
            view="clear"
            onClick={() => setIsOpen(!isOpen)}
            size={recalcSize()}
          />
          {isOpen && (
            <ContextMenu
              className={cnThemeToggler('ContextMenu', [contextMenuClassName])}
              offset={-14}
              items={themes}
              getLabel={getThemeLabel || emptyFn}
              anchorRef={ref}
              direction="downStartLeft"
              getLeftSideBar={renderIcons}
              getRightSideBar={renderChecks}
              onClickOutside={() => setIsOpen(false)}
              getOnClick={(item) => () => setValue(getThemeValue(item))}
            />
          )}
        </>
      );
    }

    return <div>В данный момент есть возможность передавать только 2 или 3 темы.</div>;
  };

  return (
    <div {...otherProps} className={className}>
      {getTogglerBody()}
    </div>
  );
};
