import './ContextMenuLevel.css';

import React, { createRef, forwardRef, useEffect, useMemo } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { animateTimeout } from '../../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { getGroups } from '../../../utils/getGroups';
import { Popover } from '../../Popover/Popover';
import { Text } from '../../Text/Text';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import { getItem, getItemIndex, getMappersAndProps, sizeMapHeader } from '../helper';
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
      size={getByMap(sizeMapHeader, size)}
    >
      {groupLabel}
    </Text>
  );
};

function ContextMenuLevelRender<ITEM, GROUP>(
  propsComponent: ContextMenuLevelProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { itemMappers, groupMappers, otherProps: props } = getMappersAndProps(propsComponent);

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
    sortGroup,
    onItemClick,
    direction,
    possibleDirections,
    offset,
    onSetDirection,
    hoveredParenLevel,
    spareDirection,
    anchorRef,
    ...otherProps
  } = props;

  const [hovered, { on, off }] = useFlag(false);
  const [active, setActive] = useFlag(levelDepth !== 0);

  useEffect(() => {
    if (levelDepth === 0) {
      // Необходимо для того чтобы при открытии и проигрывании анимации первый уровень автоматически не открывался
      setTimeout(setActive.on, animateTimeout);
    }
  }, []);

  const groups = getGroups<ITEM, GROUP>(
    items,
    itemMappers.getItemGroupId,
    groupsProp,
    groupMappers.getGroupId,
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
    if (active) {
      const subMenu = itemMappers.getItemSubMenu(item);
      const disabled = itemMappers.getItemDisabled(item);
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
      {...otherProps}
    >
      {groups.map((group, groupIndex) => {
        return (
          <div className={cnContextMenuLevel('Group')} key={group.key}>
            {renderHeader(
              group.group && groupMappers.getGroupLabel(group.group),
              groupIndex === 0,
              size,
            )}
            {group.items.map((item, index) => {
              const standardizedItem = getItem(item, itemMappers);
              const itemIndex = getItemIndex(group.key, index);
              const ref = itemsRefs[itemIndex];
              const atributes = { ...standardizedItem }.attributes ?? {};
              const withSubMenu = !!{ ...standardizedItem }.subMenu;
              const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (!standardizedItem.disabled) {
                  if (typeof standardizedItem.onClick === 'function') {
                    standardizedItem.onClick?.(e);
                  }
                  if (typeof onItemClick === 'function') {
                    onItemClick?.({ e, item });
                  }
                }
              };
              delete standardizedItem.attributes;
              delete standardizedItem.subMenu;
              delete standardizedItem.groupId;
              return (
                <ContextMenuItem
                  {...atributes}
                  {...standardizedItem}
                  ref={ref}
                  onClick={onClick}
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
