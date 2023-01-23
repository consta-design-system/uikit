import './ContextMenuLevel.css';

import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef, useEffect } from 'react';

import { cnListBox, iconSizeMap, List } from '##/components/ListCanary';
import { Popover } from '##/components/Popover';
import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag/useFlag';
import { useRefs } from '##/hooks/useRefs/useRefs';
import { cn } from '##/utils/bem';

import {
  contextMenuDefaultSize,
  ContextMenuItemDefault,
  ContextMenuLevelComponent,
  ContextMenuLevelProps,
} from '../types';

export const cnContextMenuLevel = cn('ContextMenuLevelCanary');

let timers: ReturnType<typeof setTimeout>[] = [];
export function clearTimers() {
  for (const timer of timers) {
    clearTimeout(timer);
  }
  timers = [];
}

const closeDelay = 300;

const ContextMenuLevelRender = (
  props: ContextMenuLevelProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    size = contextMenuDefaultSize,
    items,
    groups: groupsProp,
    className,
    form = 'default',
    // Свойства относящиеся к меню
    levelDepth,
    activeItem,
    addLevel,
    deleteLevel,
    setHoveredParenLevel,
    hoveredParenLevel,
    sortGroup,
    onItemClick,
    // Свойства для поповера
    direction,
    possibleDirections,
    offset,
    onSetDirection,
    spareDirection,
    anchorRef,
    // Геттеры для ITEM
    getItemLabel,
    getItemRightSide,
    getItemLeftSide,
    getItemSubMenu,
    getItemStatus,
    getItemDisabled,
    getItemKey,
    getItemOnClick,
    getItemAs,
    getItemAttributes,
    getItemGroupId,
    getItemLeftIcon,
    getItemRightIcon,
    // Геттеры для GROUP
    getGroupLabel,
    getGroupId,

    ...otherProps
  } = props;

  const [hovered, setHovered] = useFlag(false);
  // скрываем блок пока не найдем тоную позицию для оображения
  const [visible, setVisible] = useFlag(false);

  const setVisibleTrue = useDebounce(setVisible.on, 20);

  const getKey = (item: ContextMenuItemDefault) =>
    (getItemKey(item) || getItemLabel(item)).toString();

  const itemsRefs = useRefs<HTMLDivElement, string[]>(
    items.map((item) => getKey(item)),
    [groupsProp],
  );

  useEffect(() => {
    if (levelDepth !== 0 && !hovered && hoveredParenLevel < levelDepth) {
      clearTimeout(timers[levelDepth]);
      timers[levelDepth] = setTimeout(
        () => deleteLevel(levelDepth),
        closeDelay,
      );
    }
    return () => clearTimeout(timers[levelDepth]);
  }, [hovered, hoveredParenLevel]);

  const onMouseEnter =
    (
      item: ContextMenuItemDefault,
    ): JSX.IntrinsicElements['div']['onMouseEnter'] =>
    (e) => {
      const subMenu = getItemSubMenu(item);
      const disabled = getItemDisabled(item);
      const onMouseEnter = getItemAttributes(item)
        ?.onMouseEnter as JSX.IntrinsicElements['div']['onMouseEnter'];

      onMouseEnter?.(e);

      if (Array.isArray(subMenu) && !disabled) {
        const key = getKey(item);
        addLevel({
          level: levelDepth + 1,
          items: subMenu,
          anchorRef: itemsRefs[key],
          activeItem: key,
        });
        setHoveredParenLevel(levelDepth + 1);
      } else {
        setHoveredParenLevel(levelDepth);
      }
    };

  return (
    <Popover
      anchorRef={anchorRef}
      className={cnContextMenuLevel(
        { firstLevel: levelDepth === 0, direction, visible },
        [cnListBox({ size, form, border: true, shadow: true }), className],
      )}
      possibleDirections={possibleDirections}
      spareDirection={spareDirection}
      direction={direction}
      offset={offset}
      onSetDirection={(item) => {
        setVisibleTrue();
        onSetDirection?.(item);
      }}
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
      ref={ref}
      {...otherProps}
    >
      <List
        size={size}
        items={items}
        getItemLabel={getItemLabel}
        onItemClick={
          onItemClick
            ? (item, { e }) =>
                onItemClick({ item, e: e as React.MouseEvent<HTMLDivElement> })
            : undefined
        }
        sortGroup={sortGroup ? (a, b) => sortGroup(a.key, b.key) : undefined}
        getItemOnClick={
          getItemOnClick
            ? (item) => (e) =>
                getItemOnClick(item)?.({
                  e: e as React.MouseEvent<HTMLDivElement>,
                  item,
                })
            : undefined
        }
        getItemAs={getItemAs}
        getItemAttributes={(item) =>
          ({
            ...getItemAttributes(item),
            onMouseEnter: onMouseEnter(item),
          } as JSX.IntrinsicElements[keyof JSX.IntrinsicElements])
        }
        getItemGroupKey={getItemGroupId}
        getItemLeftIcon={getItemLeftIcon}
        getItemRightIcon={getItemRightIcon}
        getItemLeftSide={getItemLeftSide}
        getItemRightSide={(item) => {
          const side = getItemRightSide(item);
          if (!getItemSubMenu(item)) {
            return side;
          }

          const sides: React.ReactNode[] = Array.isArray(side) ? side : [side];
          sides.push(<IconArrowRight size={iconSizeMap[size]} />);
          return sides;
        }}
        getGroupKey={getGroupId}
        getGroupLabel={getGroupLabel}
        getItemDisabled={getItemDisabled}
        getItemStatus={getItemStatus}
        getItemRef={(item) => itemsRefs[getKey(item)]}
        groups={groupsProp}
        getItemActive={(item) => getKey(item) === activeItem}
        indent={form === 'round' ? 'increased' : 'normal'}
      />
    </Popover>
  );
};

export const ContextMenuLevel = forwardRef(
  ContextMenuLevelRender,
) as ContextMenuLevelComponent;
