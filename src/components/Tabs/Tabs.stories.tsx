import React, { useState } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import '../Common/styles.css';
import './styles.css';

import Tabs from '../Tabs';

const items = [
  {
    value: 'tab1',
    label: 'Пункт',
  },
  {
    value: 'tab2',
    label: 'Пункт 2',
  },
  {
    value: 'tab3',
    label: 'Пункт 2.2',
  },
  {
    value: 'tab4',
    label: 'Пунктик 3',
  },
];

const defaultKnobs = () => ({
  wpSize: select('Size', ['s', 'm'], 'm'),
  view: select('View', ['bordered', 'clear'], 'bordered'),
});

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Табы', () => {
    const [value, setValue] = useState(items[2].value);

    const activeItem = items.find(item => item.value === value);

    return (
      <div>
        <Tabs value={value} items={items} onChange={setValue} {...defaultKnobs()} />
        <div>{activeItem && <div>Контент для {activeItem.label}</div>}</div>
      </div>
    );
  })
  .add('Табы в контенте', () => {
    const [value, setValue] = useState(items[0].value);

    const activeItem = items.find(item => item.value === value);
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div
            style={{ textAlign: 'center', background: 'green', width: '200px', marginRight: 50 }}
          >
            Любой компонент
          </div>
          <Tabs value={value} items={items} onChange={setValue} {...defaultKnobs()} />
        </div>
        <div>{activeItem && <div>Контент для {activeItem.label}</div>}</div>
      </div>
    );
  });
