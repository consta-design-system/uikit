import './HeaderLoginExample.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';

import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Header, HeaderLogin, HeaderModule } from '../../../Header';

const cnExample = cn('HeaderLoginExample');

export function HeaderLoginExample() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const handleLogin = () => setIsLogged(!isLogged);

  return (
    <Example col={1}>
      <Header
        className={cnExample()}
        rightSide={
          <HeaderModule indent="s">
            <HeaderLogin
              isLogged={isLogged}
              personName="Михаил Зерно"
              personInfo="В другом офисе"
              personStatus="available"
              onClick={handleLogin}
              className={cnExample('Login', { isLogged })}
            />
          </HeaderModule>
        }
      />
    </Example>
  );
}

export function HeaderLoginExampleType() {
  return (
    <Example col={{ 1: 0, 3: 720 }}>
      <>
        <p className={cnDocsExample('Caption')}>Полная версия</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          className={cnMixSpace({ mB: 'm' })}
        />
        <p className={cnDocsExample('Caption')}>
          Пользователь авторизован. Есть аватарка, имя и фамилия.
        </p>
      </>
      <>
        <p className={cnDocsExample('Caption')}>Краткая версия</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          isMinified
          className={cnMixSpace({ mB: 'm' })}
        />
        <p className={cnDocsExample('Caption')}>
          Пользователь авторизован. Есть только аватарка и стрелочка.
        </p>
      </>
      <>
        <p className={cnDocsExample('Caption')}>Не авторизован</p>
        <HeaderLogin
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="available"
          className={cnMixSpace({ mB: 'm' })}
        />
        <p className={cnDocsExample('Caption')}>
          Предлагаем пользователю войти в аккаунт.
        </p>
      </>
    </Example>
  );
}

export function HeaderLoginExampleStatus() {
  return (
    <Example col={{ 1: 0, 2: 600, 4: 800 }}>
      <>
        <p className={cnDocsExample('Caption')}>Без статуса</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Нет статуса</p>
      </>
      <>
        <p className={cnDocsExample('Caption')}>available</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="available"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Онлайн / На месте</p>
      </>
      <>
        <p className={cnDocsExample('Caption')}>remote</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="remote"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Занят / Работает удаленно</p>
      </>
      <>
        <p className={cnDocsExample('Caption')}>out</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="out"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Офлайн / Нет на месте</p>
      </>
    </Example>
  );
}
