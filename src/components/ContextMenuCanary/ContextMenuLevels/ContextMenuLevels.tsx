import React, { useEffect, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { useRefs } from '../../../hooks/useRefs/useRefs';
import { Direction, directions } from '../../Popover/Popover';
import { clearTimers, ContextMenuLevel } from '../ContextMenuLevel/ContextMenuLevel';
import { getLevels, withDefaultGetters } from '../helper';
import {
  AddLevel,
  ContextMenuComponent,
  contextMenuPropDefaultSubMenuDirection,
  ContextMenuProps,
  contextMenuPropSubMenuDirections,
  Level,
} from '../types';

function ContextMenuLevelsRender(propsComponent: ContextMenuProps, ref: React.Ref<HTMLDivElement>) {
  const props = withDefaultGetters(propsComponent);
  const {
    items,
    anchorRef,
    position,
    direction,
    possibleDirections = directions,
    offset,
    onClickOutside,
    getItemKey,
    getItemLabel,
    getItemSubMenu,
    style,
    spareDirection,
    subMenuDirection: subMenuDirectionProp = contextMenuPropDefaultSubMenuDirection,
    ...otherProps
  } = props;

  type Item = typeof items[number];

  const defaultLevels = [
    {
      items,
      anchorRef,
      position,
      direction,
      possibleDirections,
      offset,
    },
  ] as Level<Item>[];

  const [levels, setLevels] = useState<Level<Item>[]>(defaultLevels);
  const [subMenuDirection, setSubMenuDirection] = useState<Direction>(subMenuDirectionProp);
  const [hoveredParenLevel, setHoveredParenLevel] = useState<number>(-1);

  const levelsRefs = useRefs<HTMLDivElement>(levels.length);

  const addLevel: AddLevel<Item> = ({ level, items, anchorRef, activeItem }) => {
    const newLevels = [...levels];
    const oldDirection =
      newLevels[level] && newLevels.length - level > 1 ? newLevels[level].direction : undefined;

    if (newLevels[level] && newLevels.length - level > 1 && oldDirection) {
      setSubMenuDirection(oldDirection);
    }

    newLevels[level - 1].activeItem = activeItem;
    newLevels.splice(level);
    newLevels.push({
      items,
      anchorRef,
      direction: oldDirection || subMenuDirection,
      possibleDirections: contextMenuPropSubMenuDirections,
      position: undefined,
    });
    setLevels(newLevels);
  };

  const deleteLevel = (level: number) => {
    const newLevels = [...levels];
    newLevels.splice(level);
    newLevels[level - 1] = { ...newLevels[level - 1], activeItem: undefined };
    setLevels(newLevels);
  };

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [...levelsRefs, anchorRef || { current: null }],
    handler: (e) => onClickOutside?.(e),
  });

  useEffect(() => {
    clearTimers();
    setLevels(
      getLevels({
        levels,
        items,
        getItemLabel,
        getItemKey,
        getItemSubMenu,
      }),
    );
    return () => clearTimers();
  }, [items]);

  const firstLevelRef = useForkRef([levelsRefs[0], ref]);

  return (
    <>
      {levels.map((level, index) => (
        <ContextMenuLevel
          {...otherProps}
          {...level}
          key={`ContextMenu-${index}`}
          style={{
            ...style,
            ...{
              zIndex: typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined,
            },
          }}
          levelDepth={index}
          getItemLabel={getItemLabel}
          addLevel={addLevel}
          deleteLevel={deleteLevel}
          onSetDirection={index > 0 ? setSubMenuDirection : props.onSetDirection}
          hoveredParenLevel={hoveredParenLevel}
          setHoveredParenLevel={setHoveredParenLevel}
          getItemSubMenu={getItemSubMenu}
          getItemKey={getItemKey}
          ref={index === 0 ? firstLevelRef : levelsRefs[index]}
          spareDirection={index === 0 ? spareDirection : 'rightStartUp'}
        />
      ))}
    </>
  );
}

export const ContextMenuLevels = React.forwardRef(ContextMenuLevelsRender) as ContextMenuComponent;
