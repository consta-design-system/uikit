import './UserValue.css';

import React from 'react';

import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { tagBasePropSizeDefault } from '../../TagBase/TagBase';
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
  const view = disabled ? 'filled' : 'stroked';

  const withUser = true;

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
        iconRight={IconClose}
        onIconClick={onCancel}
      />
    </div>
  );
};
