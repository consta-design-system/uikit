import React, { createRef, forwardRef, useEffect, useMemo, useState } from 'react';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { Direction, directions } from '../Popover/Popover';

import { clearTimers, ContextMenuLevel } from './ContextMenuLevel/ContextMenuLevel';
import {
  AddLevel,
  ContextMenuComponent,
  contextMenuPropDefaultSubMenuDirection,
  contextMenuPropSubMenuDirections,
  DeleteLevel,
  Level,
} from './helpers';

export const ContextMenu: ContextMenuComponent = forwardRef((props, ref) => {
  const {
    items,
    anchorRef,
    position,
    direction,
    possibleDirections = directions,
    offset,
    getKey: getKeyProp,
    getSubItems,
    subMenuDirection: propSubMenuDirection = contextMenuPropDefaultSubMenuDirection,
    getLabel,
    onClickOutside,
    spareDirection,
    style,
    ...otherProps
  } = props;

  type Item = typeof items[number];

  const getKey = getKeyProp || getLabel;

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
  const [subMenuDirection, setSubMenuDirection] = useState<Direction>(propSubMenuDirection);
  const [hoveredParenLevel, setHoveredParenLevel] = useState<number>(-1);

  const addLevel: AddLevel<Item> = (level, items, anchorRef, activeItem) => {
    const newLevels = Array.from(levels);

    let oldDirection: Direction | undefined;

    if (newLevels[level] && newLevels.length - level > 1) {
      oldDirection = newLevels[level].direction;

      if (oldDirection) {
        setSubMenuDirection(oldDirection);
      }
    }

    newLevels[level - 1].activeItem = activeItem;
    newLevels.splice(level);
    newLevels.push({
      items,
      anchorRef,
      direction: oldDirection || subMenuDirection,
      possibleDirections: contextMenuPropSubMenuDirections,
    });
    setLevels(newLevels);
  };

  const deleteLevel: DeleteLevel = (level) => {
    const newLevels = Array.from(levels);
    newLevels.splice(level);
    newLevels[level - 1] = { ...newLevels[level - 1], activeItem: undefined };
    setLevels(newLevels);
  };

  const constructItemRefs: () => React.RefObject<HTMLDivElement>[] = () => {
    const refs: React.RefObject<HTMLDivElement>[] = [];

    for (let i = 0; i < levels.length; i++) {
      refs[i] = createRef<HTMLDivElement>();
    }

    return refs;
  };

  const levelsRefs = useMemo(constructItemRefs, [levels]);

  const firstLevelRef = useForkRef([levelsRefs[0], ref]);

  useClickOutside({
    isActive: !!onClickOutside,
    ignoreClicksInsideRefs: [...levelsRefs, anchorRef || { current: null }],
    handler: (e) => onClickOutside && onClickOutside(e),
  });

  useEffect(() => {
    // из-за отложенного рендера закрытия подпунктов меню
    // может возникнуть ситуация когда таймер еще не успел отработать и вызвать рендер на закрытие меню,
    // и если в этот изменяется props.items в компоненте, то сразу после рендера который вызван сменой props.items
    // вызовется отложенный что приведет к неверному рендеру, который должен был вызваться до изменения props.items
    // По этому останавливаем отложенный перерендр закрытия, чтобы избежать ошибки
    clearTimers();
    // пересобираем levels при изменении пропсов
    function find(items: Item[], key: string | number): Item | undefined {
      for (const item of items) {
        if (getKey(item) === key) {
          return item;
        }
        const subItems = typeof getSubItems === 'function' && getSubItems(item);
        if (subItems) {
          const subItem = find(subItems, key);
          if (subItem) {
            return subItem;
          }
        }
      }
      return undefined;
    }

    const newLevels = levels.map((level) => {
      return {
        ...level,
        items: level.items.map((item) => find(props.items, getKey(item))),
      };
    });

    // привел к типа м так как TS не понимает что по ключу всегда найдется нужный нам item
    setLevels(newLevels as Level<Item>[]);
    return () => clearTimers();
  }, [props.items, getSubItems, getKey]);

  return (
    <>
      {levels.map((level, index) => {
        const onSetDirection = index > 0 ? setSubMenuDirection : undefined;

        return (
          <ContextMenuLevel
            {...otherProps}
            style={{
              ...style,
              ...(typeof style?.zIndex === 'number' && { zIndex: style?.zIndex + index }),
            }}
            offset={level.offset}
            key={index}
            items={level.items}
            level={index}
            addLevel={addLevel}
            deleteLevel={deleteLevel}
            anchorRef={level.anchorRef}
            position={level.position}
            activeItem={level.activeItem}
            direction={level.direction}
            possibleDirections={level.possibleDirections}
            onSetDirection={onSetDirection}
            hoveredParenLevel={hoveredParenLevel}
            setHoveredParenLevel={setHoveredParenLevel}
            getSubItems={getSubItems}
            getLabel={getLabel}
            ref={index === 0 ? firstLevelRef : levelsRefs[index]}
            spareDirection={index === 0 ? spareDirection : 'rightStartUp'}
          />
        );
      })}
    </>
  );
});
