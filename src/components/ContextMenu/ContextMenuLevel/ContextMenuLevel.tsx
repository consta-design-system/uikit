import './ContextMenuLevel.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef, useEffect, useMemo } from 'react';

import {
  cnListBox,
  List,
  ListDivider,
  ListItem,
  mapIconSize,
  mapVerticalSpase,
} from '##/components/ListCanary';
import { useFlag } from '##/hooks/useFlag/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
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
import { useMenuNavigation } from '../useMenuNavigation';

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
    activeLevelDepth,
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
    getItemRightSide: getItemRightSideProp,
    getItemLeftSide,
    getItemSubMenu,
    getItemStatus,
    getItemDisabled,
    getItemKey,
    getItemOnClick: getItemOnClickProp,
    getItemAs,
    getItemAttributes: getItemAttributesProp,
    getItemGroupId,
    getItemLeftIcon,
    getItemRightIcon,
    // Геттеры для GROUP
    getGroupLabel,
    getGroupId,
    ...otherProps
  } = props;

  const firstLevel = levelDepth === 0;

  const [hovered, setHovered] = useFlag(false);

  const getKey = (item: ContextMenuItemDefault) =>
    (getItemKey(item) || getItemLabel(item)).toString();

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

  const {
    refs,
    onKeyDown,
    activeIndex,
    setActiveIndex,
    setDirection,
    containerRef,
  } = useMenuNavigation({
    items,
    getItemSubMenu,
    addLevel: addCurrentLevel,
    active: activeLevelDepth === levelDepth,
    deleteLevel: () => deleteLevel(levelDepth),
  });

  const itemsRefs = useMemo(() => {
    return items
      .map((item) => getKey(item))
      .reduce((a, v, index) => ({ ...a, [v]: refs[index] }), {}) as Record<
      string,
      React.RefObject<HTMLDivElement>
    >;
  }, [groupsProp, refs]);

  const activeKey = useMemo(() => {
    const item = items[activeIndex];
    return item ? getKey(item) : undefined;
  }, [items, activeIndex]);

  const onMouseEnter = isMobile
    ? undefined
    : (item: ContextMenuItemDefault): React.MouseEventHandler<HTMLDivElement> =>
        (e) => {
          addCurrentLevel(item);
          const onMouseEnter = getItemAttributesProp(item)
            ?.onMouseEnter as JSX.IntrinsicElements['div']['onMouseEnter'];
          setActiveIndex(items.indexOf(item));
          onMouseEnter?.(e);
        };

  // GETTERS

  const getItemOnClick = getItemOnClickProp
    ? (item: ContextMenuItemDefault) => (e: React.MouseEvent) => {
        getItemOnClickProp(item)?.({
          e: e as React.MouseEvent<HTMLDivElement>,
          item,
        });
      }
    : undefined;

  const getItemAttributes = (item: ContextMenuItemDefault) =>
    ({
      ...getItemAttributesProp(item),
      tabIndex: 0,
      onMouseEnter: onMouseEnter?.(item),
    } as JSX.IntrinsicElements[keyof JSX.IntrinsicElements]);

  const getItemActive = (item: ContextMenuItemDefault) => {
    const key = getKey(item);
    return key === activeItem || key === activeKey;
  };

  const getItemRightSide = (item: ContextMenuItemDefault) => {
    const side = getItemRightSideProp(item);
    if (!getItemSubMenu(item)) {
      return side;
    }

    const sides: React.ReactNode[] = Array.isArray(side) ? side : [side];
    sides.push(<IconArrowRight size={mapIconSize[size]} />);
    return sides;
  };

  const onMouseLeave: React.MouseEventHandler = () => {
    setHovered.off();
    setActiveIndex(-1);
  };

  // EFFECTS

  useEffect(() => {
    if (levelDepth === activeLevelDepth) {
      containerRef.current?.focus();
    }
  }, [levelDepth, activeLevelDepth]);

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
      tabIndex={0}
      onKeyDown={onKeyDown}
      onSetDirection={(direction) => {
        onSetDirection?.(direction);
        setDirection(direction);
      }}
      onMouseEnter={setHovered.on}
      onMouseLeave={onMouseLeave}
      ref={useForkRef([ref, containerRef])}
      isMobile={isMobile}
      {...otherProps}
    >
      {parent && (
        <>
          <ListItem
            label={getItemLabel(parent)}
            size={size}
            tabIndex={0}
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
        getItemOnClick={getItemOnClick}
        getItemAs={getItemAs}
        getItemAttributes={getItemAttributes}
        getItemGroupKey={getItemGroupId}
        getItemLeftIcon={getItemLeftIcon}
        getItemRightIcon={getItemRightIcon}
        getItemLeftSide={getItemLeftSide}
        getItemRightSide={getItemRightSide}
        getGroupKey={getGroupId}
        getGroupLabel={getGroupLabel}
        getItemDisabled={getItemDisabled}
        getItemStatus={getItemStatus}
        getItemActive={getItemActive}
        getItemAdditionalClassName={(item) =>
          cnContextMenuLevel('Item', {
            active: getKey(item) === activeItem,
          })
        }
        getItemRef={(item) => itemsRefs[getKey(item)]}
        groups={groupsProp}
        innerOffset={form === 'round' ? 'increased' : 'normal'}
      />
    </ContextMenuLevelWrapper>
  );
};

export const ContextMenuLevel = forwardRef(
  ContextMenuLevelRender,
) as ContextMenuLevelComponent;
