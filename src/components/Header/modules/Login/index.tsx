import React from 'react';
import bem from '../../../../utils/bem';

import { Button } from '../../../Button/Button';
import { User } from '../../../User/User';

const b = bem('login');

type Props = {
  isLogged: boolean;
  onClick: React.EventHandler<React.MouseEvent>;
  personName: string;
  personInfo?: string;
  personStatus?: undefined | 'available' | 'remote' | 'out';
  linkToPhoto?: string;
  isMinified?: boolean;
  className?: string;
};

const Login: React.FC<Props> = ({
  isLogged,
  onClick,
  personName,
  personInfo,
  personStatus,
  linkToPhoto,
  isMinified,
  className,
}) => {
  const isLoggedIn = isLogged;

  return isLoggedIn ? (
    <User
      as="button"
      view="clear"
      size="m"
      avatarUrl={linkToPhoto}
      status={personStatus}
      name={personName}
      info={personInfo}
      onlyAvatar={isMinified}
      withArrow={isMinified}
      onClick={(e) => onClick(e)}
      className={b({}, className)}
    />
  ) : (
    <Button
      className={b({}, className)}
      type="button"
      onClick={onClick}
      size="s"
      view="primary"
      label="Войти"
    />
  );
};

export { Login };
