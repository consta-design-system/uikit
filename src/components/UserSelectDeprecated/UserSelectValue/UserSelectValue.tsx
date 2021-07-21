import './UserSelectValue.css';

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

const cnUserValue = cn('UserSelectValueDeprecated');

export const UserSelectValue: React.FC<UserValueProps> = (props) => {
  const { size = tagBasePropSizeDefault, label, subLabel, disabled, onCancel, url } = props;

  const withCancel = typeof onCancel === 'function';

  return (
    <User
      className={cnUserValue({ withCancel })}
      avatarUrl={url}
      name={label}
      info={subLabel}
      size={size}
      view="ghost"
      iconRight={!disabled ? IconClose : undefined}
      onIconRightClick={!disabled ? onCancel : undefined}
    />
  );
};
