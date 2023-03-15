import { IconCheck } from '@consta/icons/IconCheck';
import React, { forwardRef, useRef } from 'react';

import { Button } from '##/components/Button';
import { ContextMenu } from '##/components/ContextMenu';
import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { useChoiceGroup } from '##/hooks/useChoiceGroup';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';

import { contextMenuSizeMap, iconSizeMap, withDefaultGetters } from './helpers';
import {
  ThemeTogglerComponent,
  ThemeTogglerProps,
  themeTogglerPropSizeDefault,
} from './types';

export const COMPONENT_NAME = 'ThemeToggler' as const;

const ThemeTogglerRender = (
  props: ThemeTogglerProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useForkRef([anchorRef, ref]);

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
    view = 'clear',
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, withDefaultGetters(props), buttonRef);

  const [isOpen, setIsOpen] = useFlag(false);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemKey || getItemLabel,
    callBack: onChange,
    multiple: false,
  });

  type Item = typeof items[number];

  const iconSize = iconSizeMap[size];
  const contextMenuSize = contextMenuSizeMap[size];

  const getButtonIcon = () =>
    getItemIcon(items.find((theme) => getChecked(theme)) ?? items[0]);

  const onButtonClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (items.length > 2) {
      setIsOpen.toggle();
    } else {
      getOnChange(items[getChecked(items[0]) ? 1 : 0])(e);
    }
  };

  const renderIcons = (item: Item) => {
    const Icon = getItemIcon(item);

    if (Icon) {
      return <Icon size={iconSize} />;
    }
  };

  const renderChecks = (item: Item) => {
    if (getChecked(item)) {
      return <IconCheck size={iconSize} />;
    }
  };

  if (items.length <= 1) {
    return null;
  }

  return (
    <>
      <Button
        {...otherProps}
        ref={buttonRef}
        iconLeft={getButtonIcon()}
        onClick={onButtonClick}
        onlyIcon
        size={size}
        view={view}
        style={style}
      />
      {items.length > 2 && (
        <ContextMenu
          isOpen={isOpen}
          offset="s"
          items={items}
          getItemLabel={getItemLabel}
          getItemKey={getItemKey || getItemLabel}
          anchorRef={anchorRef}
          direction={direction}
          possibleDirections={possibleDirections}
          getItemLeftSide={renderIcons}
          getItemRightSide={renderChecks}
          onClickOutside={setIsOpen.off}
          onItemClick={(params) => getOnChange(params.item)(params.e)}
          size={contextMenuSize}
          style={
            typeof style?.zIndex === 'number'
              ? { zIndex: style.zIndex + 1 }
              : undefined
          }
        />
      )}
    </>
  );
};

export const ThemeToggler = forwardRef(
  ThemeTogglerRender,
) as ThemeTogglerComponent;

export * from './types';
