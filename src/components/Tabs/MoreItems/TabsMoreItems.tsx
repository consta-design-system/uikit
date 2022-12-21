import './TabsMoreItems.css';

import FocusTrap from 'focus-trap-react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { IconMeatball } from '../../../icons/IconMeatball/IconMeatball';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Direction, Popover } from '../../Popover/Popover';
import { TabsMoreItemsComponent, TabsMoreItemsProps } from '../types';

const cnTabsMoreItems = cn('TabsMoreItems');

const TabsMoreItemsRender = (
  props: TabsMoreItemsProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { items, renderItem, getItemLabel, getItemChecked, height } = props;
  const [isOpen, { off, toggle }] = useFlag(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>('downStartLeft');

  useEffect(() => {
    items.length === 0 && off();
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
          view="ghost"
          onlyIcon
          iconLeft={IconMeatball}
          onClick={toggle}
        />
      </div>
      <Transition
        in={isOpen}
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
                onDeactivate: off,
              }}
            >
              <div className={cnTabsMoreItems('Content')}>
                {items.map((item) => (
                  <div
                    key={getItemLabel(item)}
                    className={cnTabsMoreItems('Item', {
                      active: getItemChecked(item),
                    })}
                  >
                    {renderItem(item, off)}
                  </div>
                ))}
              </div>
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
