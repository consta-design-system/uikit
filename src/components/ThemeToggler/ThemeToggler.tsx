import { AnimateIconBaseProvider } from '@consta/icons/AnimateIconBaseProvider';
import { IconCheck } from '@consta/icons/IconCheck';
import { withAnimateBaseHOC } from '@consta/icons/withAnimateBaseHOC';
import React, { forwardRef, useMemo, useRef } from 'react';

import { Button } from '##/components/Button';
import { ContextMenu } from '##/components/ContextMenu';
import { usePropsHandler } from '##/components/EventInterceptor/usePropsHandler';
import { useChoiceGroup } from '##/hooks/useChoiceGroup';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';

import { contextMenuSizeMap, iconSizeMap, withDefaultGetters } from './helpers';
import {
  ThemeTogglerComponent,
  ThemeTogglerItemDefault,
  ThemeTogglerPropGetItemKey,
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
    animateTransition,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, withDefaultGetters(props), buttonRef);

  const [isOpen, setIsOpen] = useFlag(false);

  const getItemIconRef = useMutableRef(getItemIcon);

  const getKey: ThemeTogglerPropGetItemKey<ThemeTogglerItemDefault> = (item) =>
    getItemKey(item) || getItemLabel(item);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey,
    callBack: onChange,
    multiple: false,
  });

  const ButtonIcon = useMemo(
    () =>
      withAnimateBaseHOC({
        icons: items.map(getItemIconRef.current),
        transition: animateTransition,
      }),
    [items.map(getKey).join('-')],
  );

  const iconSize = iconSizeMap[size];
  const contextMenuSize = contextMenuSizeMap[size];

  const onButtonClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (items.length > 2) {
      setIsOpen.toggle();
    } else {
      getOnChange(items[getChecked(items[0]) ? 1 : 0])(e);
    }
  };

  const renderIcons = (item: ThemeTogglerItemDefault) => {
    const Icon = getItemIcon(item);

    if (Icon) {
      return <Icon size={iconSize} />;
    }
  };

  const renderChecks = (item: ThemeTogglerItemDefault) => {
    if (getChecked(item)) {
      return <IconCheck size={iconSize} />;
    }
  };

  const animateIconIndex = items.findIndex((theme) => getChecked(theme));

  if (items.length <= 1) {
    return null;
  }

  return (
    <>
      <AnimateIconBaseProvider
        activeIndex={animateIconIndex >= 0 ? animateIconIndex : 0}
      >
        <Button
          {...otherProps}
          ref={buttonRef}
          iconLeft={ButtonIcon}
          onClick={onButtonClick}
          onlyIcon
          size={size}
          view={view}
          style={style}
        />
      </AnimateIconBaseProvider>
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
