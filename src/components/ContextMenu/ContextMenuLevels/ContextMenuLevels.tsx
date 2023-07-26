import React, { Fragment, useEffect, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { Direction } from '##/components/Popover';
import { useClickOutside } from '##/hooks/useClickOutside';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { useRefs } from '##/hooks/useRefs';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';

import { clearTimers, ContextMenuLevel } from '../ContextMenuLevel';
import { getLevels, withDefaultGetters } from '../helpers';
import {
  AddLevel,
  ContextMenuItemDefault,
  ContextMenuLevelsComponent,
  ContextMenuLevelsProps,
  contextMenuPropDefaultSubMenuDirection,
  contextMenuPropSubMenuDirections,
  Level,
} from '../types';
import { useSize } from './useSize';

const ContextMenuLevelsRender = (
  propsComponent: ContextMenuLevelsProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const props = withDefaultGetters(propsComponent);
  const {
    items,
    anchorRef,
    position,
    direction,
    possibleDirections,
    offset,
    onClickOutside,
    getItemKey,
    getItemLabel,
    getItemSubMenu,
    style,
    spareDirection,
    subMenuDirection:
      subMenuDirectionProp = contextMenuPropDefaultSubMenuDirection,
    isMobile,
    isOpen,
    setComponentSize,
    enableAnimationBack,
    disableAnimationBack,
    ...otherProps
  } = props;

  const isOpenRef = useMutableRef(isOpen);

  type Item = typeof items[number];

  const defaultLevels: Level<ContextMenuItemDefault>[] = [
    {
      items,
      anchorRef,
      position,
      direction,
      possibleDirections,
      offset,
    },
  ];

  const [levels, setLevels] = useState<
    Level<ContextMenuItemDefault & { isParent?: boolean }>[]
  >(isMobile ? defaultLevels : []);
  const [subMenuDirection, setSubMenuDirection] =
    useState<Direction>(subMenuDirectionProp);
  const [hoveredParenLevel, setHoveredParenLevel] = useState<number>(-1);

  const levelsRefs = useRefs<HTMLDivElement>(levels.length);

  const addLevel: AddLevel<Item> = ({
    level,
    items,
    anchorRef,
    activeItem,
    parent,
  }) => {
    const newLevels: Level<ContextMenuItemDefault & { isParent?: boolean }>[] =
      [...levels];
    const oldDirection =
      newLevels[level] && newLevels.length - level > 1
        ? newLevels[level].direction
        : undefined;

    if (newLevels[level] && newLevels.length - level > 1 && oldDirection) {
      setSubMenuDirection(oldDirection);
    }

    newLevels[level - 1].activeItem = activeItem;
    newLevels.splice(level);
    newLevels.push({
      items,
      anchorRef: isMobile ? props.anchorRef : anchorRef,
      direction: isMobile ? props.direction : oldDirection || subMenuDirection,
      possibleDirections: isMobile
        ? props.possibleDirections
        : contextMenuPropSubMenuDirections,
      position: isMobile ? props.position : undefined,
      offset: isMobile ? props.offset : undefined,
      parent,
    });

    isOpenRef.current ? setLevels(newLevels) : setLevels([]);
  };

  const deleteLevel = (level: number) => {
    enableAnimationBack();
    const newLevels = [...levels];
    newLevels.splice(level);
    newLevels[level - 1] = { ...newLevels[level - 1], activeItem: undefined };
    setLevels(newLevels);
    disableAnimationBack();
  };

  useClickOutside({
    isActive: onClickOutside && isOpen,
    ignoreClicksInsideRefs: [...levelsRefs, anchorRef || { current: null }],
    handler: onClickOutside,
  });

  useEffect(() => {
    clearTimers();
    setLevels(
      getLevels({
        levels,
        items,
        getItemKey,
        getItemSubMenu,
      }),
    );
    return () => clearTimers();
  }, [items]);

  const firstLevelRef = useForkRef([levelsRefs[0], ref]);

  useEffect(() => {
    setLevels(defaultLevels);
  }, [position]);

  useEffect(() => {
    setLevels(isOpen ? defaultLevels : []);
  }, [isOpen]);

  useSize(levelsRefs, setComponentSize, isMobile);

  return (
    <TransitionGroup component={Fragment}>
      {levels.map((level, index) => {
        const key = `${index}-${level.parent ? getItemKey(level.parent) : ''}`;

        const last = index !== levels.length - 1;

        if (isMobile && last) {
          return <Fragment key={index} />;
        }

        return (
          <Transition
            key={key}
            timeout={animateTimeout}
            nodeRef={levelsRefs[index]}
          >
            {(animate) => (
              <ContextMenuLevel
                {...otherProps}
                {...level}
                key={`${index}-${level.parent ? getItemKey(level.parent) : ''}`}
                isMobile={isMobile}
                isOpen={isOpen}
                style={{
                  ...style,
                  ...{
                    zIndex:
                      typeof style?.zIndex === 'number'
                        ? style.zIndex + 1
                        : undefined,
                  },
                }}
                levelDepth={index}
                getItemLabel={getItemLabel}
                addLevel={addLevel}
                deleteLevel={deleteLevel}
                onSetDirection={
                  index > 0 ? setSubMenuDirection : props.onSetDirection
                }
                hoveredParenLevel={hoveredParenLevel}
                setHoveredParenLevel={setHoveredParenLevel}
                getItemSubMenu={getItemSubMenu}
                getItemKey={getItemKey}
                ref={index === 0 ? firstLevelRef : levelsRefs[index]}
                spareDirection={index === 0 ? spareDirection : 'rightStartUp'}
                parent={isMobile ? level.parent : undefined}
                animate={animate}
              />
            )}
          </Transition>
        );
      })}
    </TransitionGroup>
  );
};

export const ContextMenuLevels = React.forwardRef(
  ContextMenuLevelsRender,
) as ContextMenuLevelsComponent;
