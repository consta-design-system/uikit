import './AvatarGroup.css';

import React, { forwardRef } from 'react';

import { useForkRef } from '##/hooks/useForkRef';
import {
  getHiddenCount,
  useHideElementsInLine,
} from '##/hooks/useHideElementsInLineCanary';

import { cn } from '../../utils/bem';
import { Avatar, avatarPropFormDefault, cnAvatar } from '../Avatar/Avatar';
import { withDefaultGetters } from './helpers';
import {
  AvatarGroupComponent,
  AvatarGroupProps,
  avatarGroupPropSizeDefault,
} from './types';

const cnAvatarGroup = cn('AvatarGroup');

const AvatarGroupRender = (
  props: AvatarGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items = [],
    form = avatarPropFormDefault,
    size = avatarGroupPropSizeDefault,
    visibleCount = 4,
    getItemName,
    getItemUrl,
    monochrome,
    ...otherProps
  } = withDefaultGetters(props);

  const itemLenght = items.length;
  const elementsLength = itemLenght + 1;

  const { elementsRefs, parentRef, visibleMap } = useHideElementsInLine(
    elementsLength,
    0,
    0,
    [visibleCount],
  );

  const autoMode = visibleCount === 'auto';

  const itemsForRender = autoMode
    ? [...items].reverse()
    : [...items].slice(0, visibleCount).reverse();

  return (
    <div
      className={cnAvatarGroup({ size })}
      ref={useForkRef([parentRef, ref])}
      {...otherProps}
    >
      {(autoMode || itemLenght > visibleCount) && (
        <div
          className={cnAvatar({ size, form }, [
            cnAvatarGroup('More', {
              hidden: !visibleMap[0] && autoMode,
            }),
          ])}
          ref={elementsRefs[0]}
        >
          {`+${
            autoMode ? getHiddenCount(visibleMap) : itemLenght - visibleCount
          }`}
        </div>
      )}
      {itemsForRender.map((item, index) => {
        return (
          <Avatar
            key={cnAvatarGroup({ index })}
            url={getItemUrl(item)}
            name={getItemName(item)}
            className={cnAvatarGroup('Avatar', {
              hidden: !visibleMap[index + 1] && autoMode,
            })}
            size={size}
            form={form}
            ref={elementsRefs[index + 1]}
            monochrome={monochrome}
          />
        );
      })}
    </div>
  );
};

export const AvatarGroup = forwardRef(
  AvatarGroupRender,
) as AvatarGroupComponent;

export * from './types';
