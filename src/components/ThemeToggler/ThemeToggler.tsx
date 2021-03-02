import './ThemeToggler.css';

import React, { useRef, useState } from 'react';
import { cn } from '@bem-react/classname';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconCheck } from '../../icons/IconCheck/IconCheck';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { Button } from '../Button/Button';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { ThemePreset } from '../Theme/Theme';

export const themeTogglerPropSize = ['m', 's', 'xs', 'l'] as const;
export type ThemeTogglerPropSize = typeof themeTogglerPropSize[number];
export const themeTogglerPropSizeDefault: ThemeTogglerPropSize = themeTogglerPropSize[0];

export type ThemePropSetValue<ITEM, ITEM_ELEMENT> = (props: {
  e: React.MouseEvent<ITEM_ELEMENT>;
  value: ITEM;
}) => void;
export type ThemePropGetLabel<ITEM> = (item: ITEM) => string;
export type ThemePropGetValue<ITEM> = (item: ITEM) => ThemePreset;
export type ThemePropGetIcon<ITEM> = (item: ITEM) => React.FC<IconProps>;

type Props<ITEM, ITEM_ELEMENT extends HTMLElement = HTMLButtonElement> = {
  size?: ThemeTogglerPropSize;
  className?: string;
  contextMenuClassName?: string;
  themes: ITEM[];
  value: ITEM;
  setValue: ThemePropSetValue<ITEM, ITEM_ELEMENT>;
  getThemeLabel: ThemePropGetLabel<ITEM>;
  getThemeValue: ThemePropGetValue<ITEM>;
  getThemeIcon: ThemePropGetIcon<ITEM>;
};

type ThemeToggler = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const cnThemeToggler = cn('ThemeToggler');

export const ThemeToggler: ThemeToggler = (props) => {
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

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getThemeLabel,
    callBack: setValue,
    multiple: false,
  });

  const sizeMap: Record<ThemeTogglerPropSize, IconPropSize> = {
    l: 'm',
    m: 's',
    s: 's',
    xs: 'xs',
  };

  const iconSize = getSizeByMap(sizeMap, size);

  const getTogglerBody = () => {
    if (themes.length === 2) {
      const IconOne = getThemeIcon(themes[0]);
      const IconTwo = getThemeIcon(themes[1]);

      return (
        <div className={cnThemeToggler()}>
          {getThemeValue(value) === getThemeValue(themes[0]) ? (
            <IconOne
              onClick={getOnChange(themes[1])}
              className={cnThemeToggler('Icon')}
              size={iconSize}
            />
          ) : (
            <IconTwo
              onClick={getOnChange(themes[0])}
              className={cnThemeToggler('Icon')}
              size={iconSize}
            />
          )}
        </div>
      );
    }
    if (themes.length > 2) {
      const PreviewIcon = themes
        .filter((theme) => getChecked(theme))
        .map((theme) => {
          const Icon = getThemeIcon(theme);
          return Icon;
        })[0];
      const renderIcons = (item: any) => {
        const Icon = getThemeIcon(item);
        return <Icon size={iconSize} />;
      };
      const renderChecks = (item: any) => {
        return getChecked(item) && <IconCheck size={iconSize} />;
      };
      const emptyFn = () => '';

      return (
        <div className={cnThemeToggler()}>
          <Button
            className={cnThemeToggler('PreviewIcon')}
            ref={ref}
            onlyIcon
            iconLeft={PreviewIcon}
            view="clear"
            onClick={() => setIsOpen(!isOpen)}
            size={iconSize}
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
              getOnClick={(item) => (e) => getOnChange(item)(e as never)}
            />
          )}
        </div>
      );
    }

    return <div>Необходимо передать как минимум 2 темы</div>;
  };

  return (
    <div {...otherProps} className={className}>
      {getTogglerBody()}
    </div>
  );
};
