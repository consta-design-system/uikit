import React from 'react';
import bem from '../../../../utils/bem';

import Button from '../../../Button';
import User from '../../../User';

const b = bem('login');

type Props = {
  isLogged: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
      type={'button'}
      view={'clear'}
      size={'m'}
      avatar={linkToPhoto}
      status={personStatus}
      name={personName}
      info={personInfo}
      onlyAvatar={isMinified}
      onClick={onClick}
      className={b({}, className)}
    />
  ) : (
    <Button type="button" onClick={onClick} wpSize="s" view="primary" className={b({}, className)}>
      Войти
    </Button>
  );
};

export { Login };
