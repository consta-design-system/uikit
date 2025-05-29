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

  const [isOpen, setIsOpen] = useFlag();

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemKey || getItemLabel,
    callBack: onChange,
    multiple: false,
  });

  type Item = typeof items[number];

  const iconSize = iconSizeMap[size];
  const contextMenuSize = contextMenuSizeMap[size];

  const Icon = useMemo(
    () =>
      withAnimateBaseHOC({ icons: items.map(getItemIcon), transition: 260 }),
    [items],
  );

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
      <AnimateIconBaseProvider
        activeIndex={items.findIndex((theme) => getChecked(theme)) ?? items[0]}
      >
        <Button
          {...otherProps}
          ref={buttonRef}
          iconLeft={Icon}
          onClick={onButtonClick}
          onlyIcon
          type="button"
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
          onItemClick={(item, { e }) => getOnChange(item)(e)}
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
