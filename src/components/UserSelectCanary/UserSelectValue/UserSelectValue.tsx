import './UserSelectValue.css';

import { IconClose } from '@consta/icons/IconClose';
import React from 'react';

import { cnCanary } from '../../../utils/bem';
import { User } from '../../User/User';

type UserValueProps = {
  label: string;
  size: 's' | 'm' | 'l';
  subLabel?: string;
  avatarUrl?: string;
  handleRemove?: (e: React.SyntheticEvent) => void;
  multiple?: boolean;
  disabled?: boolean;
  children?: never;
};

export const cnUserSelectValue = cnCanary('UserSelectValue');

export const UserSelectValue: React.FC<UserValueProps> = (props) => {
  const { size, label, subLabel, disabled, handleRemove, avatarUrl, multiple } =
    props;

  return (
    <User
      className={cnUserSelectValue({ multiple, size, disabled })}
      avatarUrl={avatarUrl}
      name={label}
      info={subLabel}
      size={size}
      view={multiple ? 'ghost' : 'clear'}
      iconRight={!disabled && multiple ? IconClose : undefined}
      onIconRightClick={!disabled && multiple ? handleRemove : undefined}
    />
  );
};
