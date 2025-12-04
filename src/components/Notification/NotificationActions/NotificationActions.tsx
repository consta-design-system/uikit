import { IconKebab } from '@consta/icons/IconKebab';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import { Button } from '##/components/Button';
import { ContextMenu } from '##/components/ContextMenu';
import { Text } from '##/components/Text';
import { withTooltip } from '##/hocs/withTooltip';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { getItemClick } from '##/utils/getItemClick';

import { withDefaultGetters } from './helpers';
import {
  NotificationActionsComponent,
  NotificationActionsProps,
} from './types';

const ButtonWithTooltip = withTooltip({ size: 's' })(Button);

const NotificationActionsRender = (
  props: NotificationActionsProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    items = [],
    className,
    children,
    onlyIcon,
    opened = false,
    onOpen: onOpenProp,
    getItemIcon,
    getItemLabel,
    getItemOnClick,
    onItemClick,
    scrollContainerRef,
    title,
    ...otherProps
  } = withDefaultGetters(props);

  const buttonRef = useRef(null);

  const [visibleMenu, setVisibleMenu] = useFlag(opened);

  const toggleMenu = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setVisibleMenu.toggle();
    },
    [setVisibleMenu],
  );

  const onOpen = useMutableRef(onOpenProp);
  const menuRef = useForkRef([buttonRef, ref]);

  const elementZIndex =
    typeof props.style?.zIndex === 'number'
      ? props.style.zIndex + 1
      : undefined;

  useEffect(() => {
    setVisibleMenu[opened ? 'on' : 'off']();
  }, [opened]);

  useEffect(() => {
    onOpen.current?.(visibleMenu);
  }, [visibleMenu, onOpen]);

  useEffect(() => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.addEventListener('scroll', setVisibleMenu.off);
    }
    return () => {
      if (scrollContainerRef?.current) {
        scrollContainerRef.current.removeEventListener(
          'scroll',
          setVisibleMenu.off,
        );
      }
    };
  }, [scrollContainerRef]);

  if (items.length === 1 && !onlyIcon) {
    return (
      <Button
        {...otherProps}
        className={className}
        size="xs"
        view="clear"
        iconLeft={getItemIcon(items[0])}
        onClick={getItemClick(items[0], getItemOnClick, onItemClick)}
        label={getItemLabel(items[0])}
        ref={ref}
      />
    );
  }

  if (items.length === 1 && getItemIcon(items[0]) && onlyIcon) {
    return (
      <ButtonWithTooltip
        {...otherProps}
        className={className}
        size="xs"
        view="clear"
        iconLeft={getItemIcon(items[0])}
        onClick={getItemClick(items[0], getItemOnClick, onItemClick)}
        tooltipProps={{
          tooltipContent: (
            <Text view="primary" size="xs">
              {getItemLabel(items[0])}
            </Text>
          ),
        }}
        ref={ref}
      />
    );
  }

  return (
    <>
      <Button
        {...otherProps}
        className={className}
        size="xs"
        view="clear"
        iconLeft={IconKebab}
        ref={menuRef}
        onClick={toggleMenu}
      />
      <ContextMenu
        role="listbox"
        offset="2xs"
        isOpen={visibleMenu}
        size="s"
        items={items}
        getItemLabel={getItemLabel}
        onItemClick={onItemClick}
        getItemOnClick={getItemOnClick}
        getItemKey={getItemLabel}
        getItemLeftIcon={getItemIcon}
        anchorRef={buttonRef}
        onClickOutside={setVisibleMenu.off}
        possibleDirections={['downStartRight', 'upStartRight']}
        direction="downStartRight"
        style={{ zIndex: elementZIndex }}
      />
    </>
  );
};

export const NotificationActions = forwardRef(
  NotificationActionsRender,
) as NotificationActionsComponent;
