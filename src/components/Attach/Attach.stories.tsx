import React from 'react';
import { storiesOf } from '@storybook/react';
import Attach from '../Attach';

storiesOf('Attach', module)
  .add('Загружен', () => <Attach status="loaded" />)
  .add('Загрузка', () => <Attach status="loading" />)
  .add('Ошибка', () => <Attach status="error" />)
  .add('Контент', () => <Attach status="content" />);
