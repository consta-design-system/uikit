import './User.css';

import React from 'react';
import { cn } from '../../utils/bem';
import { Avatar } from '../Avatar/Avatar';
import { Text, TextPropSize, TextPropLineHeight } from '../Text/Text';
import { ArrowDown } from '../Icon/icons/ArrowDown';

export type UserPropSize = 's' | 'm';

declare type UserProps = {
  avatarUrl?: string;
  name?: string;
  as?: React.ElementType;
  className?: string;
  size?: UserPropSize;
  view: 'clear' | 'secondary';
  status?: 'available' | 'remote' | 'out' | '';
  onlyAvatar?: boolean;
  withArrow?: boolean;
  info?: string;
};

export type IUser<T = {}> = UserProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof UserProps> | Omit<T, keyof UserProps>);

const cnUser = cn('user');

export function User<T>(props: IUser<T>): React.ReactElement | null {
  const {
    as = 'div',
    className,
    size = 'm',
    avatarUrl,
    name,
    view = 'clear',
    onlyAvatar,
    withArrow,
    info,
    status,
    ...otherProps
  } = props;
  const Component = as;

  const getInfoSizeByUserSize = (userSize: UserPropSize): TextPropSize => {
    const sizeObj: Record<UserPropSize, TextPropSize> = {
      s: '2xs',
      m: 'xs',
    };

    return sizeObj[userSize];
  };

  const getNameLineHeightByUserSize = (userSize: UserPropSize): TextPropLineHeight => {
    const sizeObj: Record<UserPropSize, TextPropLineHeight> = {
      s: '2xs',
      m: 'xs',
    };

    return sizeObj[userSize];
  };

  const infoSize = getInfoSizeByUserSize(size);
  const nameLineHeight = getNameLineHeightByUserSize(size);

  return (
    <Component
      className={cnUser({ size, view, 'with-arrow': withArrow }, [className])}
      {...otherProps}
    >
      <div className={cnUser('avatar-wrapper', { status })}>
        <Avatar className={cnUser('avatar', { status })} size={size} url={avatarUrl} name={name} />
      </div>
      {!onlyAvatar && (name || info) && (
        <div className={cnUser('block')}>
          {name && (
            <Text className={cnUser('name')} size={size} view="primary" lineHeight={nameLineHeight}>
              {name}
            </Text>
          )}
          {info && (
            <Text className={cnUser('info')} size={infoSize} view="secondary" lineHeight="2xs">
              {info}
            </Text>
          )}
        </div>
      )}
      {withArrow && <ArrowDown className={cnUser('arrow')} size={size} view="secondary" />}
    </Component>
  );
}
