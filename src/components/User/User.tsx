import './User.css';

import React from 'react';
import { cn } from '../../utils/bem';
import { Avatar } from '../Avatar/Avatar';
import { Text, TextPropSize } from '../Text/Text';
import IconSelect from '../Icon/icons/Select';

export type UserPropSize = 's' | 'm';

declare type UserProps = {
  avatarUrl?: string;
  name?: string;
  as?: React.ElementType;
  className?: string;
  size?: UserPropSize;
  view: 'clear' | 'ghost';
  width?: 'default' | 'full';
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
    width,
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

  const getArrowSizeByUserSize = (userSize: UserPropSize) => {
    const sizeObj = {
      s: 'xs',
      m: 's',
    };

    return sizeObj[userSize];
  };

  const infoSize = getInfoSizeByUserSize(size);
  const arrowSize = getArrowSizeByUserSize(size);

  return (
    <Component
      className={cnUser({ size, view, width, 'with-arrow': withArrow, minified: onlyAvatar }, [
        className,
      ])}
      {...otherProps}
    >
      <div className={cnUser('avatar-wrapper', { status })}>
        <Avatar className={cnUser('avatar', { status })} size={size} url={avatarUrl} name={name} />
      </div>
      {!onlyAvatar && (name || info) && (
        <div className={cnUser('block')}>
          {name && (
            <Text className={cnUser('name')} size={size} view="primary" lineHeight="2xs">
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
      {withArrow && <IconSelect className={cnUser('arrow')} size={arrowSize} view="secondary" />}
    </Component>
  );
}
