import './TabsMoreItems.css';

import FocusTrap from 'focus-trap-react';
import React, { useEffect, useRef, useState } from 'react';
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
import { TabsPropGetLabel } from '../TabsDeprecated';

const cnTabsMoreItems = cn('TabsMoreItems');

type TabsMoreItems = <ITEM>(
  props: {
    items: ITEM[];
    renderItem: (item: ITEM, onClick: () => void) => React.ReactNode;
    getLabel: TabsPropGetLabel<ITEM>;
    getChecked: (item: ITEM) => boolean;
    height: number;
  } & React.RefAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) => React.ReactElement | null;

export const TabsMoreItems: TabsMoreItems = React.forwardRef(
  ({ items, renderItem, getLabel, getChecked, height }, ref) => {
    const [isOpen, { off, toogle }] = useFlag(false);
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
            onClick={toogle}
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
                      key={getLabel(item)}
                      className={cnTabsMoreItems('Item', {
                        active: getChecked(item),
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
  },
);
