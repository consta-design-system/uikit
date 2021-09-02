import './TabsMoreItems.css';

import React from 'react';
import FocusTrap from 'focus-trap-react';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { IconMeatball } from '../../../icons/IconMeatball/IconMeatball';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Popover } from '../../Popover/Popover';
import { TabsPropGetLabel } from '../Tabs';

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
    const [isMoreItemsVisible, setIsMoreItemsVisible] = React.useState(false);
    const buttonRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (items.length === 0) {
        setIsMoreItemsVisible(false);
      }
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
            onClick={() => setIsMoreItemsVisible((state) => !state)}
          />
        </div>
        {isMoreItemsVisible && buttonRef.current && (
          <Popover
            anchorRef={buttonRef}
            offset={-1}
            direction="downStartRight"
            spareDirection="downStartLeft"
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
                fallbackFocus: buttonRef.current,
                clickOutsideDeactivates: (e) => {
                  const isClickInsideButton = buttonRef.current?.contains(e.target as Node);
                  return !isClickInsideButton;
                },
                allowOutsideClick: true,
                onDeactivate: () => setIsMoreItemsVisible(false),
              }}
            >
              <div className={cnTabsMoreItems('Popover')}>
                {items.map((item) => (
                  <div
                    key={getLabel(item)}
                    className={cnTabsMoreItems('Item', { active: getChecked(item) })}
                  >
                    {renderItem(item, () => setIsMoreItemsVisible(false))}
                  </div>
                ))}
              </div>
            </FocusTrap>
          </Popover>
        )}
      </>
    );
  },
);
