import React from 'react';
// import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Header from './';

import Logo from './modules/Logo/index';
import SearchBar from './modules/SearchBar/index';
import Menu from './modules/Menu/index';
import Login from './modules/Login/index';

// const props = () => ({
//   logo: 'Logotipee',
//   searchBar: true,
// });

storiesOf('Header', module).add('Шапка', () => {
  const menuItems = [
    {
      name: 'Проекты',
      link: '#projects',
      active: true,
    },
    {
      name: 'Задачи',
      link: '#tasks',
    },
    {
      name: 'Какой-то пункт',
      link: '#some',
    },
  ];

  const leftSide = [
    {
      children: (
        <Logo>
          <p className="text text_size_l text_weight_bold">Logotype</p>
        </Logo>
      ),
    },
    {
      children: <SearchBar placeholder={'Я ищу'} label={'Поиск'} />,
    },
    {
      children: <Menu items={menuItems} />,
    },
  ];

  const rightSide = [
    {
      children: (
        <Login
          isLogged={true}
          isMinified={true}
          personName={'Вадим Матвеев'}
          personInfo={'В другом офисе'}
          personStatus={'active'}
          linkToPhoto={
            'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png'
          }
          altForPhoto={'Фотография Вадима Матвеева'}
        />
      ),
    },
  ];

  return <Header leftSide={leftSide} rightSide={rightSide}></Header>;
});
