import React from 'react';
import { storiesOf } from '@storybook/react';

import '../Common/styles.css';
import './styles.css';

import Tabs from '../Tabs';

const list = [
  {
    label: 'Пункт_1',
    content: <p>Test content</p>,
  },
  {
    label: 'Пункт_2',
    content: <p>Test content</p>,
  },
  {
    label: 'Пункт_3',
    content: <p>Test content</p>,
  },
  {
    label: 'Пункт_4',
    content: <p>Test content</p>,
  },
];

storiesOf('Tabs', module).add('Табы', () => (
  <div>
    <Tabs view="bordered" wpSize="m" list={list} />
  </div>
));
