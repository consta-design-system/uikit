import './HeaderLoginExample.css';

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { cn } from '../../../../../utils/bem';
import { Header, HeaderLogin, HeaderModule } from '../../../Header';

const cnExample = cn('HeaderLoginExample');

export function HeaderLoginExample() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const handleLogin = () => setIsLogged(!isLogged);

  return (
    <Header
      className={cnExample()}
      rightSide={
        <>
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
        </>
      }
    />
  );
}

export function HeaderLoginExampleType() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Полная версия</p>
        <HeaderLogin isLogged personName="Михаил Зерно" personInfo="В другом офисе" />
        <p className={cnDocsExample('Caption')}>
          Пользователь авторизован. Есть аватарка, имя и фамилия.
        </p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Краткая версия</p>
        <HeaderLogin isLogged personName="Михаил Зерно" personInfo="В другом офисе" isMinified />
        <p className={cnDocsExample('Caption')}>
          Пользователь авторизован. Есть только аватарка и стрелочка.
        </p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Не авторизован</p>
        <HeaderLogin
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="available"
        />
        <p className={cnDocsExample('Caption')}>Предлагаем пользователю войти в аккаунт.</p>
      </div>
    </div>
  );
}

export function HeaderLoginExampleStatus() {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1-1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Без статуса</p>
        <HeaderLogin isLogged personName="Михаил Зерно" personInfo="В другом офисе" isMinified />
        <p className={cnDocsExample('Caption')}>Нет статуса</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>available</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="available"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Онлайн / На месте</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>remote</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="remote"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Занят / Работает удаленно</p>
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>out</p>
        <HeaderLogin
          isLogged
          personName="Михаил Зерно"
          personInfo="В другом офисе"
          personStatus="out"
          isMinified
        />
        <p className={cnDocsExample('Caption')}>Офлайн / Нет на месте</p>
      </div>
    </div>
  );
}
