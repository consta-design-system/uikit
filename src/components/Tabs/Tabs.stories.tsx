import React from 'react';
import { storiesOf } from '@storybook/react';

import '../Common/styles.css';
import './styles.css';

import Tabs from '../Tabs';

const list = [
  {
    label: 'Tab_1',
    content: <p>Test content</p>,
  },
  {
    label: 'Tab_2',
    content: <p>Test content</p>,
  },
  {
    label: 'Tab_3',
    content: <p>Test content</p>,
  },
  {
    label: 'Tab_4',
    content: <p>Test content</p>,
  },
];

storiesOf('Tabs', module).add('Табы', () => (
  <div>
    <Tabs style="border" wpSize="m" list={list} />
  </div>
));
