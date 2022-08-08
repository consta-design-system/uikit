import './AvatarGroup.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { Avatar, avatarPropFormDefault } from '../Avatar/Avatar';

import { withDefaultGetters } from './helpers';
import { AvatarGroupComponent, AvatarGroupProps, avatarGroupPropSizeDefault } from './types';

const cnAvatarGroup = cn('AvatarGroup');

function AvatarGroupRender(props: AvatarGroupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    items = [],
    form = avatarPropFormDefault,
    size = avatarGroupPropSizeDefault,
    visibleCount = 4,
    getItemName,
    getItemAs,
    getItemUrl,
    onMoreClick,
    ...otherProps
  } = withDefaultGetters(props);

  return (
    <div className={cnAvatarGroup(null, { size })} ref={ref} {...otherProps}>
      {items.length > visibleCount && (
        <Avatar
          className={cnAvatarGroup('ShowMore')}
          onClick={onMoreClick}
          name={`+ ${items.length - visibleCount}`}
          as={onMoreClick ? 'button' : 'div'}
          size={size}
          form={form}
        />
      )}
      {items.slice(0, visibleCount).map((item, index) => (
        <Avatar
          key={cnAvatarGroup({ index })}
          url={getItemUrl(item)}
          as={getItemAs(item) ?? 'div'}
          name={getItemName(item)}
          className={cnAvatarGroup('Avatar')}
          size={size}
          form={form}
        />
      ))}
    </div>
  );
}

export const AvatarGroup = forwardRef(AvatarGroupRender) as AvatarGroupComponent;

export * from './types';
