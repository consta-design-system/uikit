import './WithoutMenuExample.css';

import React, { useState, Fragment } from 'react';
import { Text } from '../../../../Text/Text';
import { Header } from '../../../Header';
import { HeaderButton } from '../../../Button/Header-Button';
import { HeaderLogin } from '../../../Login/Header-Login';
import { HeaderLogo } from '../../../Logo/Header-Logo';
import { HeaderSearchBar } from '../../../SearchBar/Header-SearchBar';
import { HeaderModule } from '../../../Module/Header-Module';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { IconChat } from '../../../../../icons/IconChat/IconChat';
import { cn } from '../../../../../utils/bem';

const cnExample = cn('WithoutMenuExample');

export function WithoutMenuExample() {
  const [value, setValue] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const handleChange = ({ value }) => setValue(value);
  const handleSearch = ({ value }) => alert(`Произведен поиск, запрос - ${value} `);
  const handleLogin = () => setIsLogged(!isLogged);

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
            <HeaderSearchBar
              placeholder="я ищу"
              label="поиск"
              value={value}
              onChange={handleChange}
              onSearch={handleSearch}
            />
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
