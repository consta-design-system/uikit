import React, { useEffect, useRef, useState } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { IconComponent, IconPropSize } from '../../icons/Icon/Icon';
import { IconCheck } from '../../icons/IconCheck/IconCheck';
import { getByMap } from '../../utils/getByMap';
import { setRef } from '../../utils/setRef';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../Button/Button';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { ContextMenuPropSize } from '../ContextMenu/helpers';
import { Direction } from '../Popover/Popover';

export const themeTogglerPropSize = ['m', 'l', 's', 'xs'] as const;
export type ThemeTogglerPropSize = typeof themeTogglerPropSize[number];
export const themeTogglerPropSizeDefault: ThemeTogglerPropSize = themeTogglerPropSize[0];

export type ThemePropSetValue<ITEM> = (props: { e: React.MouseEvent; value: ITEM }) => void;
export type ThemePropGetKey<ITEM> = (item: ITEM) => string | number;
export type ThemePropGetLabel<ITEM> = (item: ITEM) => string;
export type ThemePropGetIcon<ITEM> = (item: ITEM) => IconComponent;

export type Props<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    size?: ThemeTogglerPropSize;
    className?: string;
    items: ITEM[];
    value: ITEM;
    onChange: ThemePropSetValue<ITEM>;
    getItemKey?: ThemePropGetKey<ITEM>;
    getItemLabel: ThemePropGetLabel<ITEM>;
    getItemIcon: ThemePropGetIcon<ITEM>;
    direction?: Direction;
    possibleDirections?: readonly Direction[];
    children?: never;
  },
  HTMLButtonElement
>;

type ThemeToggler = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

const iconSizeMap: Record<ThemeTogglerPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

const contextMenuSizeMap: Record<ThemeTogglerPropSize, ContextMenuPropSize> = {
  l: 'l',
  m: 'm',
  s: 's',
  xs: 's',
};

export const ThemeToggler: ThemeToggler = React.forwardRef((props, componentRef) => {
  const {
    size = themeTogglerPropSizeDefault,
    items,
    value,
    onChange,
    getItemKey,
    getItemLabel,
    getItemIcon,
    direction,
    possibleDirections,
    style,
    ...otherProps
  } = props;

  type Item = typeof items[number];

  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (componentRef) {
      setRef(componentRef, ref.current);
    }
  });

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemKey || getItemLabel,
    callBack: onChange,
    multiple: false,
  });

  const iconSize = getByMap(iconSizeMap, size);
  const contextMenuSize = getByMap(contextMenuSizeMap, size);

  const getButtonIcon = () => getItemIcon(items.find((theme) => getChecked(theme))!);

  const onButtonClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (items.length > 2) {
      setIsOpen(!isOpen);
    } else {
      const isFirstThemeSelected = getChecked(items[0]);
      getOnChange(items[isFirstThemeSelected ? 1 : 0])(e);
    }
  };

  const renderIcons = (item: Item) => {
    const Icon = getItemIcon(item);
    return <Icon size={iconSize} />;
  };

  const renderChecks = (item: Item) => {
    return getChecked(item) && <IconCheck size={iconSize} />;
  };

  if (items.length <= 1) {
    return null;
  }

  return (
    <>
      <Button
        {...otherProps}
        ref={ref}
        iconLeft={getButtonIcon()}
        onClick={onButtonClick}
        onlyIcon
        size={size}
        view="clear"
        style={style}
      />
      {items.length > 2 && isOpen && (
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
          getItemOnClick={getOnChange}
          size={contextMenuSize}
          style={typeof style?.zIndex === 'number' ? { zIndex: style.zIndex + 1 } : undefined}
        />
      )}
    </>
  );
});
