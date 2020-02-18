import React from 'react';
import { storiesOf } from '@storybook/react';

import '../Common/styles.css';
import './styles.css';

import Tabs from '../Tabs';

const list = [
  {
    label: 'Пункт',
    content: <p>Test content 1</p>,
  },
  {
    label: 'Пункт 2',
    content: <p>Test content 2</p>,
  },
  {
    label: 'Пункт 2.2',
    content: <p>Test content 3</p>,
  },
  {
    label: 'Пунктик 3',
    content: <p>Test content 4</p>,
  },
];

storiesOf('Tabs', module).add('Табы', () => (
  <div>
    <Tabs view="bordered" wpSize="m" list={list} />
  </div>
));
