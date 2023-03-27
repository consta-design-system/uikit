import './TabsMoreItems.css';

import { IconMeatball } from '@consta/icons/IconMeatball';
import FocusTrap from 'focus-trap-react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { Button } from '##/components/Button';
import { ListBox } from '##/components/ListCanary';
import { Direction, Popover } from '##/components/Popover/Popover';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cn } from '##/utils/bem';

import { TabsMoreItemsComponent, TabsMoreItemsProps } from '../types';

const cnTabsMoreItems = cn('TabsMoreItems');

const TabsMoreItemsRender = (
  props: TabsMoreItemsProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { items, renderItem, getItemLabel, getItemChecked, height, size } =
    props;
  const [open, setOpen] = useFlag(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>('downStartLeft');

  useEffect(() => {
    items.length === 0 && setOpen.off();
  }, [items]);

  return (
    <>
      <div
        ref={useForkRef([ref, buttonRef])}
        className={cnTabsMoreItems('Button')}
        style={{ height }}
      >
        <Button
          size="xs"
          type="button"
          view="ghost"
          onlyIcon
          iconLeft={IconMeatball}
          onClick={setOpen.toggle}
        />
      </div>
      <Transition
        in={open}
        unmountOnExit
        nodeRef={popoverRef}
        timeout={animateTimeout}
      >
        {(animate) => (
          <Popover
            anchorRef={buttonRef}
            offset={-1}
            ref={popoverRef}
            direction="downStartRight"
            spareDirection="downStartLeft"
            className={cnTabsMoreItems('Popover', [
              cnMixPopoverAnimate({ animate, direction }),
            ])}
            onSetDirection={setDirection}
            possibleDirections={[
              'downStartRight',
              'downStartLeft',
              'upStartRight',
              'upStartLeft',
              'downCenter',
              'upCenter',
            ]}
          >
            <FocusTrap
              focusTrapOptions={{
                fallbackFocus: buttonRef.current ?? undefined,
                clickOutsideDeactivates: (e) => {
                  const isClickInsideButton = buttonRef.current?.contains(
                    e.target as Node,
                  );
                  return !isClickInsideButton;
                },
                allowOutsideClick: true,
                onDeactivate: setOpen.off,
              }}
            >
              <ListBox
                shadow
                border
                size={size}
                form="default"
                className={cnTabsMoreItems('Content')}
              >
                {items.map((item) => (
                  <div
                    key={getItemLabel(item)}
                    className={cnTabsMoreItems('Item', {
                      active: getItemChecked(item),
                    })}
                  >
                    {renderItem(item, setOpen.off, true)}
                  </div>
                ))}
              </ListBox>
            </FocusTrap>
          </Popover>
        )}
      </Transition>
    </>
  );
};

export const TabsMoreItems = forwardRef(
  TabsMoreItemsRender,
) as TabsMoreItemsComponent;
