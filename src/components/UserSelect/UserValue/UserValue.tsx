import './UserValue.css';

import React from 'react';

import { IconPropSize } from '../../../icons/Icon/Icon';
import { IconClose } from '../../../icons/IconClose/IconClose';
// import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { forwardRefWithAs } from '../../../utils/types/PropsWithAsAttributes';
import { Avatar } from '../../Avatar/Avatar';
import { cnTagBase, TagBasePropSize, tagBasePropSizeDefault } from '../../TagBase/TagBase';

type UserValueProps = {
  label: string;
  onCancel: (e: React.SyntheticEvent) => void;
  size: 's' | 'm' | 'l';
  disabled: boolean;
  children?: never;
  url?: string;
  subLabel?: string;
};

// const cnUserValue = cn('UserValue');

const sizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

const avatarSizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export const UserValue = forwardRefWithAs<UserValueProps>((props, ref) => {
  const {
    size = tagBasePropSizeDefault,
    label,
    subLabel,
    className,
    disabled,
    onCancel,
    url,
    ...otherProps
  } = props;

  const withCancel = typeof onCancel === 'function';
  const IconCloseSize = getSizeByMap(sizeMap, size);
  const AvatarSize = getSizeByMap(avatarSizeMap, size);
  const view = disabled ? 'filled' : 'stroked';

  const withUser = true;

  return (
    <div
      {...otherProps}
      className={cnTagBase(
        {
          size,
          view,
          withCancel,
          withUser,
        },
        [className],
      )}
      ref={ref}
    >
      <>
        <span className={cnTagBase('IconWrapper')}>
          <Avatar size={AvatarSize} url={url} name={label} />
        </span>
        <div className={cnTagBase('UserLabelsWrapper')}>
          <div className={cnTagBase('UserLabel')}>{label}</div>
          {subLabel && size !== 's' && <div className={cnTagBase('SubUserLabel')}>{subLabel}</div>}
        </div>
        {withCancel && !disabled && (
          <button className={cnTagBase('CancelButton')} type="button" onClick={onCancel}>
            <IconClose className={cnTagBase('CancelIcon')} size={IconCloseSize} />
          </button>
        )}
      </>
    </div>
  );
});
