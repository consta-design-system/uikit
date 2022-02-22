import './ContextMenuLevel.css';

import React, { createRef, forwardRef, useEffect, useMemo } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { getGroups } from '../../../utils/getGroups';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import { getItem, getItemIndex, getItemMappers, sizeMap } from '../helper';
import {
  contextMenuDefaultSize,
  ContextMenuLevelComponent,
  ContextMenuLevelProps,
  ContextMenuPropSize,
} from '../types';

export const cnContextMenuLevel = cn('ContextMenuLevel');

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
      size={getByMap(sizeMap, size)}
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
    levelDepth,
    activeItem,
    addLevel,
    className,
    deleteLevel,
    items,
    groups: groupsProp,
    setHoveredParenLevel,
    getItemSubMenu,
    getItemDisabled,
    getItemGroupId,
    sortGroup,
    getGroupId,
    getGroupLabel,
    direction,
    possibleDirections,
    offset,
    onSetDirection,
    hoveredParenLevel,
    spareDirection,
    anchorRef,
  } = props;

  const [hovered, { on, off }] = useFlag(false);

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
      onMouseEnter={on}
      onMouseLeave={off}
      ref={ref}
    >
      {groups.map((group, groupIndex) => {
        return (
          <div className={cnContextMenuLevel('Group')} key={group.key}>
            {group.group && renderHeader(getGroupLabel(group.group), groupIndex === 0, size)}
            {group.items.map((item, index) => {
              const standardizedItem = getItem(item, getItemMappers(props));
              const itemIndex = getItemIndex(group.key, index);
              const ref = itemsRefs[itemIndex];
              const atributes = { ...standardizedItem }.attributes ?? {};
              const withSubMenu = !!{ ...standardizedItem }.subMenu;
              delete standardizedItem.attributes;
              delete standardizedItem.subMenu;
              delete standardizedItem.groupId;
              return (
                <ContextMenuItem
                  {...atributes}
                  {...standardizedItem}
                  ref={ref}
                  key={itemIndex}
                  onMouseEnter={() => onMouseEnter(item, itemIndex)}
                  active={activeItem === itemIndex}
                  withSubMenu={withSubMenu}
                  size={size}
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
