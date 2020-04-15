import './WithoutSearchExample.css';

import React, { useState, Fragment } from 'react';
import { Text } from '../../../../Text/Text';
import { Header } from '../../../Header';
import { HeaderButton } from '../../../Button/Header-Button';
import { HeaderLogin } from '../../../Login/Header-Login';
import { HeaderLogo } from '../../../Logo/Header-Logo';
import { HeaderMenu } from '../../../Menu/Header-Menu';
import { HeaderModule } from '../../../Module/Header-Module';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { IconChat } from '../../../../../icons/IconChat/IconChat';
import { cn } from '../../../../../utils/bem';

const cnExample = cn('WithoutSearchExample');

export function WithoutSearchExample() {
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
      label: 'Какой-то пункт',
      onClick: () => alert('Какой-то пункт'),
    },
  ];

  return (
    <Header
      className={cnExample()}
      leftSide={
        <Fragment>
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
        </Fragment>
      }
      rightSide={
        <Fragment>
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
              personAvatarUrl="https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png"
              onClick={handleLogin}
              className={cnExample('Login', { isLogged })}
            />
          </HeaderModule>
        </Fragment>
      }
    />
  );
}
