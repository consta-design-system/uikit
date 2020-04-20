import './User.css';

import React from 'react';
import { cn } from '../../utils/bem';
import { Avatar } from '../Avatar/Avatar';
import { Text, TextPropSize } from '../Text/Text';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { IconPropSize } from '../../icons/Icon/Icon';
import { componentIsFunction } from '../../utils/componentIsFunction';

export type UserPropSize = 's' | 'm';
export type UserPropView = 'clear' | 'ghost';
export type UserPropWidth = 'default' | 'full';
export type UserPropStatus = 'available' | 'remote' | 'out';

declare type UserProps = {
  avatarUrl?: string;
  name?: string;
  as?: React.ElementType;
  className?: string;
  size?: UserPropSize;
  view?: UserPropView;
  width?: UserPropWidth;
  status?: UserPropStatus;
  onlyAvatar?: boolean;
  withArrow?: boolean;
  info?: string;
  innerRef?: React.Ref<any>;
};

export type IUser<T = {}> = UserProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof (UserProps & T)> & Omit<T, keyof UserProps>);

const cnUser = cn('User');

export function User<T>(props: IUser<T>): React.ReactElement | null {
  const {
    as = 'div',
    className,
    size = 'm',
    avatarUrl,
    name,
    view = 'clear',
    width,
    onlyAvatar: propOnlyAvatar,
    withArrow,
    info,
    status,
    innerRef,
    ...otherProps
  } = props;
  const Component = as;
  const onlyAvatar = propOnlyAvatar || (!name && !info);

  const getInfoSizeByUserSize = (userSize: UserPropSize): TextPropSize => {
    const sizeObj: Record<UserPropSize, TextPropSize> = {
      s: '2xs',
      m: 'xs',
    };

    return sizeObj[userSize];
  };

  const getArrowSizeByUserSize = (userSize: UserPropSize): IconPropSize => {
    const sizeObj: Record<UserPropSize, IconPropSize> = {
      s: 'xs',
      m: 's',
    };

    return sizeObj[userSize];
  };

  const infoSize = getInfoSizeByUserSize(size);
  const arrowSize = getArrowSizeByUserSize(size);

  return (
    <Component
      {...otherProps}
      className={cnUser({ size, view, width, withArrow, minified: onlyAvatar }, [className])}
      ref={innerRef}
      {...(componentIsFunction(Component) && { innerRef })}
    >
      <div className={cnUser('AvatarWrapper', { status })}>
        <Avatar className={cnUser('Avatar', { status })} size={size} url={avatarUrl} name={name} />
      </div>
      {!onlyAvatar && (name || info) && (
        <div className={cnUser('Block')}>
          {name && (
            <Text className={cnUser('Name')} size={size} view="primary" lineHeight="2xs">
              {name}
            </Text>
          )}
          {info && (
            <Text className={cnUser('Info')} size={infoSize} view="secondary" lineHeight="2xs">
              {info}
            </Text>
          )}
        </div>
      )}
      {withArrow && <IconSelect className={cnUser('Arrow')} size={arrowSize} view="secondary" />}
    </Component>
  );
}
