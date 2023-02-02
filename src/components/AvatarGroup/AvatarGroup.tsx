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
    ...otherProps
  } = withDefaultGetters(props);

  const elementsLength = items.length + 1;

  const { elementsRefs, parentRef, visibleMap } = useHideElementsInLine(
    elementsLength,
    elementsLength - 1,
    0,
    [visibleCount],
  );

  const autoMode = visibleCount === 'auto';

  const itemsForRender = autoMode ? items : items.slice(0, visibleCount);

  return (
    <div
      className={cnAvatarGroup({ size })}
      ref={useForkRef([parentRef, ref])}
      {...otherProps}
    >
      {itemsForRender.map((item, index) => {
        return (
          <Avatar
            key={cnAvatarGroup({ index })}
            url={getItemUrl(item)}
            name={getItemName(item)}
            className={cnAvatarGroup('Avatar', {
              hidden: !visibleMap[index] && autoMode,
            })}
            size={size}
            form={form}
            ref={elementsRefs[index]}
          />
        );
      })}
      {(autoMode || items.length > visibleCount) && (
        <div
          className={cnAvatar({ size, form }, [
            cnAvatarGroup('More', {
              hidden: !visibleMap[elementsLength - 1] && autoMode,
            }),
          ])}
          ref={elementsRefs[elementsLength - 1]}
        >
          {`+${
            autoMode ? getHiddenCount(visibleMap) : items.length - visibleCount
          }`}
        </div>
      )}
    </div>
  );
};

export const AvatarGroup = forwardRef(
  AvatarGroupRender,
) as AvatarGroupComponent;

export * from './types';
