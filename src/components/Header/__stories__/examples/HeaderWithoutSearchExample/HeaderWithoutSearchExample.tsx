import './HeaderWithoutSearchExample.css';

import React, { useState } from 'react';

import { IconChat } from '../../../../../icons/IconChat/IconChat';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import {
  Header,
  HeaderButton,
  HeaderLogin,
  HeaderLogo,
  HeaderMenu,
  HeaderModule,
} from '../../../Header';

const cnExample = cn('HeaderWithoutSearchExample');

export function HeaderWithoutSearchExample() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleLogin = () => setIsLogged(!isLogged);

  const menuItems = [
    {
      label: 'Проекты',
      href: '#projects',
      active: true,
    },
    {
      label: 'Задачи',
      href: '#tasks',
    },
    {
      label: 'Еще',
      // eslint-disable-next-line no-alert
      onClick: () => alert('Еще'),
    },
  ];

  return (
    <Header
      className={cnExample()}
      leftSide={
        <>
          <HeaderModule>
            <HeaderLogo>
              <Text as="p" size="l" weight="bold">
                Logotype
              </Text>
            </HeaderLogo>
          </HeaderModule>
          <HeaderModule indent="l">
            <HeaderMenu items={menuItems} />
          </HeaderModule>
        </>
      }
      rightSide={
        <>
          <HeaderModule indent="s">
            <HeaderButton iconLeft={IconChat} />
          </HeaderModule>
          <HeaderModule indent="s">
            <HeaderButton iconLeft={IconRing} />
          </HeaderModule>
          <HeaderModule indent="s">
            <HeaderLogin
              isLogged={isLogged}
              personName="Вадим Матвеев"
              personInfo="В другом офисе"
              personStatus="available"
              onClick={handleLogin}
              className={cnExample('Login', { isLogged })}
            />
          </HeaderModule>
        </>
      }
    />
  );
}
