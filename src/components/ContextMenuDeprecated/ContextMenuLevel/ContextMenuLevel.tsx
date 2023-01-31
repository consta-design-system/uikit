import './ContextMenuLevel.css';

import React, { createRef, useEffect, useMemo, useState } from 'react';

import { cn } from '../../../utils/bem';
import { getGroups } from '../../../utils/getGroups';
import { Popover } from '../../Popover/Popover';
import { ContextMenuDivider } from '../ContextMenuDivider/ContextMenuDivider';
import { ContextMenuGroupHeader } from '../ContextMenuGroupHeader/ContextMenuGroupHeader';
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import {
  contextMenuDefaultSize,
  ContextMenuLevelType,
  ContextMenuPropSize,
} from '../helpers';

export const cnContextMenuLevel = cn('ContextMenuLevelDeprecated');

function renderHeader(
  groupLabel: string | number | undefined,
  first: boolean,
  length: number,
  size?: ContextMenuPropSize,
): React.ReactNode | null {
  if (!groupLabel) {
    if (first) {
      return null;
    }
    return <ContextMenuDivider size={size} />;
  }
  return (
    <ContextMenuGroupHeader label={groupLabel} first={first} size={size} />
  );
}

let timers: ReturnType<typeof setTimeout>[] = [];
export function clearTimers() {
  for (const timer of timers) {
    clearTimeout(timer);
  }
  timers = [];
}
const closeDelay = 300;

export const ContextMenuLevel: ContextMenuLevelType = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      // props относящиеся к уровню меню
      size = contextMenuDefaultSize,
      level,
      activeItem,
      addLevel,
      className,
      deleteLevel,
      items,
      setHoveredParenLevel,

      // props относящиеся к пунктам меню
      getLabel,
      getRightSideBar,
      getLeftSideBar,
      getSubItems,
      getGroupId,
      getAccent,
      getDisabled,
      getOnClick,
      getItemOnClick,
      onItemClick,
      getItemHTMLAttributes,
      getItemAs,

      // props относящиеся к группам меню
      sortGroup,
      getGroupLabel,

      // props относящиеся к поповеру
      direction,
      possibleDirections,
      offset,
      onSetDirection,
      hoveredParenLevel,
      spareDirection,
      anchorRef,
      ...otherProps
    } = props;

    const [hovered, setHovered] = useState<boolean>(false);

    const groups = getGroups(
      items,
      getGroupId,
      undefined,
      undefined,
      sortGroup && ((a, b) => sortGroup(a.key, b.key)),
    );

    const getItemIndex = (groupId: number | string, itemIndex: number) =>
      `${groupId}-${itemIndex}`;

    const constructItemRefs: () => Record<
      string,
      React.RefObject<HTMLDivElement>
    > = () => {
      const refs: Record<string, React.RefObject<HTMLDivElement>> = {};

      for (const group of groups) {
        for (let i = 0; i < items.length; i++) {
          refs[getItemIndex(group.key, i)] = createRef<HTMLDivElement>();
        }
      }
      return refs;
    };

    const itemsRefs = useMemo(constructItemRefs, [items]);

    useEffect(() => {
      if (level !== 0 && !hovered && hoveredParenLevel < level) {
        clearTimeout(timers[level]);
        timers[level] = setTimeout(() => deleteLevel(level), closeDelay);
      }
      return () => {
        clearTimeout(timers[level]);
      };
    }, [hovered, hoveredParenLevel]);

    return (
      <Popover
        {...otherProps}
        anchorRef={anchorRef}
        className={cnContextMenuLevel({ firstLevel: level === 0, direction }, [
          className,
        ])}
        possibleDirections={possibleDirections}
        spareDirection={spareDirection}
        direction={direction}
        offset={offset}
        onSetDirection={onSetDirection}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={ref}
      >
        {groups.map((group, groupIndex) => {
          const groupLabel =
            typeof getGroupLabel === 'function'
              ? getGroupLabel(group.key)
              : undefined;
          return (
            <div className={cnContextMenuLevel('Group')} key={group.key}>
              {renderHeader(groupLabel, groupIndex === 0, groups.length, size)}
              {group.items.map((item, index) => {
                const itemIndex = getItemIndex(group.key, index);
                const ref = itemsRefs[itemIndex];
                const disabled =
                  typeof getDisabled === 'function' ? getDisabled(item) : false;
                const label = getLabel(item);
                const leftSide =
                  typeof getLeftSideBar === 'function'
                    ? getLeftSideBar(item)
                    : undefined;
                const rightSide =
                  typeof getRightSideBar === 'function'
                    ? getRightSideBar(item)
                    : undefined;
                const subItems =
                  typeof getSubItems === 'function'
                    ? getSubItems(item)
                    : undefined;
                const onClick = (
                  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                ) => {
                  if (!disabled) {
                    if (typeof getItemOnClick === 'function') {
                      getItemOnClick(item)?.(e);
                    }
                    if (typeof getOnClick === 'function') {
                      getOnClick(item)?.(e);
                    }
                    if (typeof onItemClick === 'function') {
                      onItemClick?.({ e, item });
                    }
                  }
                };
                const onMouseEnter =
                  subItems && !disabled
                    ? () => {
                        addLevel(level + 1, subItems, ref, itemIndex);
                        setHoveredParenLevel(level + 1);
                      }
                    : () => {
                        setHoveredParenLevel(level);
                      };
                const accent =
                  typeof getAccent === 'function' ? getAccent(item) : undefined;
                const atributes =
                  typeof getItemHTMLAttributes === 'function'
                    ? getItemHTMLAttributes(item)
                    : {};
                const as =
                  typeof getItemAs === 'function' ? getItemAs(item) : undefined;

                return (
                  <ContextMenuItem
                    {...atributes}
                    ref={ref}
                    label={label}
                    leftSide={leftSide}
                    rightSide={rightSide}
                    size={size}
                    key={itemIndex}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    active={activeItem === itemIndex}
                    withSubMenu={Boolean(subItems)}
                    accent={accent}
                    disabled={disabled}
                    as={as}
                  />
                );
              })}
            </div>
          );
        })}
      </Popover>
    );
  },
);
