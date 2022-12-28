import './HeaderWithoutMenuExample.css';

import { IconChatStroked } from '@consta/icons/IconChatStroked';
import { IconRing } from '@consta/icons/IconRing';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import {
  Header,
  HeaderButton,
  HeaderLogin,
  HeaderLogo,
  HeaderModule,
  HeaderSearchBar,
} from '../../../Header';
import {
  SearchBarPropOnChange,
  SearchBarPropOnSearch,
} from '../../../SearchBar/HeaderSearchBar';

const cnExample = cn('HeaderWithoutMenuExample');

export function HeaderWithoutMenuExample() {
  const [value, setValue] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const handleChange: SearchBarPropOnChange = ({ value }) => setValue(value);
  // eslint-disable-next-line no-alert
  const handleSearch: SearchBarPropOnSearch = ({ value }) =>
    alert(`Произведен поиск, запрос - ${value} `);
  const handleLogin = () => setIsLogged(!isLogged);

  return (
    <Example col={1}>
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
              <HeaderSearchBar
                placeholder="я ищу"
                label="поиск"
                value={value}
                onChange={handleChange}
                onSearch={handleSearch}
              />
            </HeaderModule>
          </>
        }
        rightSide={
          <>
            <HeaderModule indent="s">
              <HeaderButton iconLeft={IconChatStroked} />
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
    </Example>
  );
}
