import './ContextMenuLevel.css';

import React, { createRef, forwardRef, useEffect, useMemo } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { getGroups } from '../../../utils/getGroups';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import { getItemIndex, sizeMapHeader } from '../helper';
import {
  contextMenuDefaultSize,
  ContextMenuLevelComponent,
  ContextMenuLevelProps,
  ContextMenuPropSize,
} from '../types';

export const cnContextMenuLevel = cn('ContextMenuLevelCanary');

const renderHeader = (
  groupLabel: string | number | undefined,
  first: boolean,
  size: ContextMenuPropSize = contextMenuDefaultSize,
): React.ReactNode | null => {
  if (!groupLabel) {
    if (first) {
      return null;
    }
    return <div className={cnContextMenuLevel('Divider', { size })} />;
  }
  return (
    <Text
      view="secondary"
      transform="uppercase"
      className={cnContextMenuLevel('Header', { size, first })}
      size={getByMap(sizeMapHeader, size)}
    >
      {groupLabel}
    </Text>
  );
};

function ContextMenuLevelRender<ITEM, GROUP>(
  props: ContextMenuLevelProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    size = contextMenuDefaultSize,
    items,
    groups: groupsProp,
    className,
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

  const groups = getGroups<ITEM, GROUP>(
    items,
    getItemGroupId,
    groupsProp,
    getGroupId,
    sortGroup && ((a, b) => sortGroup(a.key, b.key)),
  );

  const constructItemRefs: () => Record<string, React.RefObject<HTMLDivElement>> = () => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {};

    for (const group of groups) {
      for (let i = 0; i < items.length; i++) {
        refs[getItemIndex(group.key, i)] = createRef<HTMLDivElement>();
      }
    }
    return refs;
  };

  const itemsRefs = useMemo(constructItemRefs, [items, groupsProp]);

  useEffect(() => {
    if (levelDepth !== 0 && !hovered && hoveredParenLevel < levelDepth) {
      setTimeout(() => deleteLevel(levelDepth), 300);
    }
  }, [hovered, hoveredParenLevel]);

  const onMouseEnter = (item: ITEM, itemIndex: string) => {
    const subMenu = getItemSubMenu(item);
    const disabled = getItemDisabled(item);
    if (Array.isArray(subMenu) && !disabled) {
      addLevel({
        level: levelDepth + 1,
        items: subMenu,
        anchorRef: itemsRefs[itemIndex],
        activeItem: itemIndex,
      });
      setHoveredParenLevel(levelDepth + 1);
    } else {
      setHoveredParenLevel(levelDepth);
    }
  };

  return (
    <Popover
      anchorRef={anchorRef}
      className={cnContextMenuLevel({ firstLevel: levelDepth === 0, direction }, [className])}
      possibleDirections={possibleDirections}
      spareDirection={spareDirection}
      direction={direction}
      offset={offset}
      onSetDirection={onSetDirection}
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
      ref={ref}
      {...otherProps}
    >
      {groups.map((group, groupIndex) => {
        return (
          <div className={cnContextMenuLevel('Group', { size })} key={group.key}>
            {renderHeader(group.group && getGroupLabel(group.group), groupIndex === 0, size)}
            {group.items.map((item, index) => {
              const itemIndex = getItemIndex(group.key, index);
              const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
                if (!getItemDisabled(item)) {
                  if (typeof getItemOnClick(item) === 'function') {
                    getItemOnClick(item)?.({ e, item });
                  }
                  if (typeof onItemClick === 'function') {
                    onItemClick?.({ e, item });
                  }
                }
              };
              return (
                <ContextMenuItem
                  label={getItemLabel(item)}
                  rightSide={getItemRightSide(item)}
                  rightIcon={getItemRightIcon(item)}
                  leftSide={getItemLeftSide(item)}
                  leftIcon={getItemLeftIcon(item)}
                  status={getItemStatus(item)}
                  key={cnContextMenuLevel('Item', { groupIndex, index })}
                  disabled={getItemDisabled(item)}
                  onClick={onClick}
                  as={getItemAs(item)}
                  {...(getItemAttributes(item) ?? {})}
                  ref={itemsRefs[itemIndex]}
                  className={cnContextMenuLevel('Item')}
                  onMouseEnter={() => onMouseEnter(item, itemIndex)}
                  active={activeItem === itemIndex}
                  size={size}
                  withSubMenu={!!getItemSubMenu(item)}
                />
              );
            })}
          </div>
        );
      })}
    </Popover>
  );
}

export const ContextMenuLevel = forwardRef(ContextMenuLevelRender) as ContextMenuLevelComponent;
