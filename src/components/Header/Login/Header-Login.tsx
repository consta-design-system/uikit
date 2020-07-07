import React from 'react';

import { Button } from '../../Button/Button';
import { User, UserPropStatus } from '../../User/User';
import { cnHeader } from '../Header';

type Props = {
  isLogged?: boolean;
  onClick?: React.EventHandler<React.MouseEvent>;
  personName?: string;
  personInfo?: string;
  personStatus?: UserPropStatus;
  personAvatarUrl?: string;
  isMinified?: boolean;
  className?: string;
  children?: never;
};

export const HeaderLogin: React.FC<Props> = ({
  isLogged,
  onClick,
  personName,
  personInfo,
  personStatus,
  personAvatarUrl,
  isMinified,
  className,
}) => {
  return isLogged ? (
    <User
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
      className={cnHeader('Login', [className])}
    />
  ) : (
    <Button
      className={cnHeader('Login', [className])}
      onClick={onClick}
      size="s"
      view="primary"
      label="Войти"
    />
  );
};
