import './AvatarGroup.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { Avatar, avatarPropFormDefault, cnAvatar } from '../Avatar/Avatar';

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

  const ShowMoreTag = onMoreClick ? 'button' : 'div';

  return (
    <div className={cnAvatarGroup({ size })} ref={ref} {...otherProps}>
      {items.length > visibleCount && (
        <ShowMoreTag
          className={cnAvatar({ size, form }, [cnAvatarGroup('ShowMore')])}
          onClick={onMoreClick}
        >
          {`+${items.length - visibleCount}`}
        </ShowMoreTag>
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
