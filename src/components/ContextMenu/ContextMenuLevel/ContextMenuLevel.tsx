import './ContextMenuLevel.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef, useEffect } from 'react';

import {
  cnListBox,
  List,
  ListDivider,
  ListItem,
  mapIconSize,
  mapVerticalSpase,
} from '##/components/ListCanary';
import { useFlag } from '##/hooks/useFlag/useFlag';
import { useRefs } from '##/hooks/useRefs/useRefs';
import { cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { ContextMenuLevelWrapper } from '../ContextMenuLevelWrapper';
import {
  contextMenuDefaultSize,
  ContextMenuItemDefault,
  ContextMenuLevelComponent,
  ContextMenuLevelProps,
} from '../types';

export const cnContextMenuLevel = cn('ContextMenuLevel');

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
    animate,
    // Свойства относящиеся к меню
    levelDepth,
    activeItem,
    addLevel,
    deleteLevel,
    setHoveredParenLevel,
    hoveredParenLevel,
    sortGroup,
    onItemClick,
    isOpen,
    parent,
    isMobile,

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

  useEffect(() => {
    if (!isOpen) {
      clearTimeout(timers[levelDepth]);
    }
  }, [isOpen]);

  const addCurrentLevel = (item: ContextMenuItemDefault) => {
    const subMenu = getItemSubMenu(item);
    const disabled = getItemDisabled(item);

    if (Array.isArray(subMenu) && !disabled) {
      const key = getKey(item);
      addLevel({
        level: levelDepth + 1,
        items: subMenu,
        anchorRef: itemsRefs[key],
        activeItem: key,
        parent: item,
      });
      setHoveredParenLevel(levelDepth + 1);
    } else {
      setHoveredParenLevel(levelDepth);
    }
  };

  const onMouseEnter = isMobile
    ? undefined
    : (
          item: ContextMenuItemDefault,
        ): JSX.IntrinsicElements['div']['onMouseEnter'] =>
        (e) => {
          addCurrentLevel(item);
          const onMouseEnter = getItemAttributes(item)
            ?.onMouseEnter as JSX.IntrinsicElements['div']['onMouseEnter'];

          onMouseEnter?.(e);
        };

  const firstLevel = levelDepth === 0;

  return (
    <ContextMenuLevelWrapper
      anchorRef={anchorRef}
      className={
        isMobile
          ? cnContextMenuLevel('Mobile', { animate }, [className])
          : cnContextMenuLevel('Desktop', { firstLevel }, [
              cnListBox({ size, form, border: true, shadow: true }),
              cnMixSpace({
                pV: mapVerticalSpase[size],
              }),
              cnMixPopoverAnimate({ animate }),
              firstLevel ? className : undefined,
            ])
      }
      possibleDirections={possibleDirections}
      spareDirection={spareDirection}
      direction={direction}
      offset={offset}
      onSetDirection={onSetDirection}
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
      ref={ref}
      isMobile={isMobile}
      {...otherProps}
    >
      {parent && (
        <>
          <ListItem
            label={getItemLabel(parent)}
            size={size}
            leftIcon={IconArrowLeft}
            onClick={() => deleteLevel(levelDepth)}
          />
          <ListDivider size={size} space={{ mV: mapVerticalSpase[size] }} />
        </>
      )}
      <List
        size={size}
        items={items}
        getItemLabel={getItemLabel}
        onItemClick={(item, { e }) => {
          isMobile && addCurrentLevel(item);
          onItemClick?.({
            item,
            e: e as React.MouseEvent<HTMLDivElement>,
          });
        }}
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
        getItemAttributes={
          onMouseEnter
            ? (item) =>
                ({
                  ...getItemAttributes(item),
                  onMouseEnter: onMouseEnter(item),
                } as JSX.IntrinsicElements[keyof JSX.IntrinsicElements])
            : getItemAttributes
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
          sides.push(<IconArrowRight size={mapIconSize[size]} />);
          return sides;
        }}
        getGroupKey={getGroupId}
        getGroupLabel={getGroupLabel}
        getItemDisabled={getItemDisabled}
        getItemStatus={getItemStatus}
        getItemRef={(item) => itemsRefs[getKey(item)]}
        groups={groupsProp}
        getItemActive={(item) => getKey(item) === activeItem}
        innerOffset={form === 'round' ? 'increased' : 'normal'}
      />
    </ContextMenuLevelWrapper>
  );
};

export const ContextMenuLevel = forwardRef(
  ContextMenuLevelRender,
) as ContextMenuLevelComponent;
