import React, { useEffect, useRef, useState } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { IconCheck } from '../../icons/IconCheck/IconCheck';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { setRef } from '../../utils/setRef';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../Button/Button';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { Direction } from '../Popover/Popover';
import { ThemePreset } from '../Theme/Theme';

export const themeTogglerPropSize = ['l', 'm', 's', 'xs'] as const;
export type ThemeTogglerPropSize = typeof themeTogglerPropSize[number];
export const themeTogglerPropSizeDefault: ThemeTogglerPropSize = themeTogglerPropSize[0];

export type ThemePropSetValue<ITEM> = (props: { e: React.MouseEvent; value: ITEM }) => void;
export type ThemePropGetKey<ITEM> = (item: ITEM) => string | number;
export type ThemePropGetLabel<ITEM> = (item: ITEM) => string;
export type ThemePropGetValue<ITEM> = (item: ITEM) => ThemePreset;
export type ThemePropGetIcon<ITEM> = (item: ITEM) => React.FC<IconProps>;

type Props<ITEM> = {
  size?: ThemeTogglerPropSize;
  className?: string;
  items: ITEM[];
  value: ITEM;
  onChange: ThemePropSetValue<ITEM>;
  getItemKey?: ThemePropGetKey<ITEM>;
  getItemLabel: ThemePropGetLabel<ITEM>;
  getItemValue: ThemePropGetValue<ITEM>;
  getItemIcon: ThemePropGetIcon<ITEM>;
  direction?: Direction;
  possibleDirections?: readonly Direction[];
  children?: never;
};

type ThemeToggler = <ITEM>(
  props: PropsWithHTMLAttributesAndRef<Props<ITEM>, HTMLButtonElement>,
) => React.ReactElement | null;

const sizeMap: Record<ThemeTogglerPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

export const ThemeToggler: ThemeToggler = React.forwardRef((props, componentRef) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (componentRef) {
      setRef(componentRef, ref.current);
    }
  });

  const {
    size = themeTogglerPropSizeDefault,
    items,
    value,
    onChange,
    getItemKey,
    getItemLabel,
    getItemValue,
    getItemIcon,
    direction,
    possibleDirections,
    ...otherProps
  } = props;

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemKey || getItemLabel,
    callBack: onChange,
    multiple: false,
  });

  const iconSize = getSizeByMap(sizeMap, size);

  if (items.length === 2) {
    const IconOne = getItemIcon(items[0]);
    const IconTwo = getItemIcon(items[1]);
    const isFirstThemeSelected = getItemValue(value) === getItemValue(items[0]);

    return (
      <Button
        {...otherProps}
        ref={ref}
        onlyIcon
        iconLeft={isFirstThemeSelected ? IconOne : IconTwo}
        view="clear"
        onClick={getOnChange(items[isFirstThemeSelected ? 1 : 0])}
        size={iconSize}
      />
    );
  }

  if (items.length > 2) {
    const PreviewIcon = items
      .filter((theme) => getChecked(theme))
      .map((theme) => {
        const Icon = getItemIcon(theme);
        return Icon;
      })[0];
    const renderIcons = (item: any) => {
      const Icon = getItemIcon(item);
      return <Icon size={iconSize} />;
    };
    const renderChecks = (item: any) => {
      return getChecked(item) && <IconCheck size={iconSize} />;
    };

    return (
      <>
        <Button
          {...otherProps}
          ref={ref}
          onlyIcon
          iconLeft={PreviewIcon}
          view="clear"
          onClick={() => setIsOpen(!isOpen)}
          size={iconSize}
        />
        {isOpen && (
          <ContextMenu
            offset={8}
            items={items}
            getLabel={getItemLabel}
            anchorRef={ref}
            direction={direction}
            possibleDirections={possibleDirections}
            getLeftSideBar={renderIcons}
            getRightSideBar={renderChecks}
            onClickOutside={() => setIsOpen(false)}
            getOnClick={(item) => (e) => getOnChange(item)(e as never)}
          />
        )}
      </>
    );
  }

  return <div>Необходимо передать как минимум 2 темы</div>;
});
