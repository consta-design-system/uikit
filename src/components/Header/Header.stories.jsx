import React from 'react';
// import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Header from './';

import Logo from './modules/Logo/index';
import SearchBar from './modules/SearchBar/index';
import Menu from './modules/Menu/index';

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
      children: <p className="text text_size_l text_weight_bold">😀</p>,
    },
  ];

  return <Header leftSide={leftSide} rightSide={rightSide}></Header>;
});
