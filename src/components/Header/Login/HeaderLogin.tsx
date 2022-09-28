import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Button } from '../../Button/Button';
import { User, UserPropStatus } from '../../User/User';

export const cnHeaderLogin = cn('HeaderLogin');

type Props = Omit<
  PropsWithJsxAttributes<
    {
      isLogged?: boolean;
      authorized?: boolean;
      onClick?: React.EventHandler<React.MouseEvent>;
      personName?: string;
      personInfo?: string;
      personStatus?: UserPropStatus;
      personAvatarUrl?: string;
      isMinified?: boolean;
      className?: string;
      children?: never;
    },
    'button'
  >,
  'form'
>;

export const HeaderLogin = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const {
      isLogged,
      onClick,
      personName,
      personInfo,
      personStatus,
      personAvatarUrl,
      isMinified,
      className,
      authorized,
      ...otherProps
    } = props;

    return isLogged || authorized ? (
      <User
        {...otherProps}
        as="button"
        view="clear"
        size="m"
        avatarUrl={personAvatarUrl}
        status={personStatus}
        name={personName}
        info={personInfo}
        onlyAvatar={isMinified}
        withArrow={isMinified}
        onClick={onClick}
        className={cnHeaderLogin({ authorized: true }, [className])}
        ref={ref}
      />
    ) : (
      <Button
        {...otherProps}
        className={cnHeaderLogin({ authorized: false }, [className])}
        onClick={onClick}
        size="s"
        view="primary"
        label="Войти"
        ref={ref}
      />
    );
  },
);
