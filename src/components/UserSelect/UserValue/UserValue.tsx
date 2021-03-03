import './UserValue.css';

import React from 'react';

import { IconPropSize } from '../../../icons/Icon/Icon';
import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { TagBasePropSize, tagBasePropSizeDefault } from '../../TagBase/TagBase';
import { User } from '../../User/User';

type UserValueProps = {
  label: string;
  onCancel: (e: React.SyntheticEvent) => void;
  size: 's' | 'm' | 'l';
  disabled: boolean;
  children?: never;
  url?: string;
  subLabel?: string;
};

const cnUserValue = cn('UserValue');

const sizeMap: Record<TagBasePropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const UserValue: React.FC<UserValueProps> = (props) => {
  const {
    size = tagBasePropSizeDefault,
    label,
    subLabel,
    disabled,
    onCancel,
    url,
    ...otherProps
  } = props;

  const withCancel = typeof onCancel === 'function';
  const IconCloseSize = getSizeByMap(sizeMap, size);
  const view = disabled ? 'filled' : 'stroked';

  const withUser = true;

  const IconRight = () => {
    return (
      <button className={cnUserValue('CancelButton')} type="button" onClick={onCancel}>
        <IconClose className={cnUserValue('CancelIcon')} size={IconCloseSize} />
      </button>
    );
  };

  return (
    <div
      {...otherProps}
      className={cnUserValue({
        size,
        view,
        withCancel,
        withUser,
      })}
    >
      <User
        avatarUrl={url}
        name={label}
        info={subLabel}
        size={size}
        view="ghost"
        iconRight={IconRight}
      />
    </div>
  );
};
