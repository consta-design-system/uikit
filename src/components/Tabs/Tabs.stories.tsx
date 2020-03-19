import React, { useState } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import '../Common/styles.css';
import './styles.css';

import Tabs from '../Tabs';

const items = [
  {
    id: 'tab1',
    label: 'Пункт',
  },
  {
    id: 'tab2',
    label: 'Пункт 2',
  },
  {
    id: 'tab3',
    label: 'Пункт 2.2',
  },
  {
    id: 'tab4',
    label: 'Пунктик 3',
  },
];

const itemsBackend = [
  {
    name: 'tab1',
    description: 'Пункт',
  },
  {
    name: 'tab2',
    description: 'Пункт 2',
  },
  {
    name: 'tab3',
    description: 'Пункт 2.2',
  },
  {
    name: 'tab4',
    description: 'Пунктик 3',
  },
];

const defaultKnobs = () => ({
  wpSize: select('Size', ['s', 'm'], 'm'),
  view: select('View', ['bordered', 'clear'], 'bordered'),
});

const getKey = item => item.name;
const getLabel = item => item.description;

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Табы в контенте', () => {
    const [value, setValue] = useState(itemsBackend[0]);

    const activeItem = itemsBackend.find(item => getKey(item) === getKey(value));
    const onChange = ({ value }) => {
      setValue(value);
    };

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div
            style={{ textAlign: 'center', background: 'green', width: '200px', marginRight: 50 }}
          >
            Любой компонент
          </div>
          <Tabs
            getKey={getKey}
            getLabel={getLabel}
            value={value}
            items={itemsBackend}
            onChange={onChange}
            {...defaultKnobs()}
          />
        </div>
        <div>{activeItem && <div>Контент для {getLabel(activeItem)}</div>}</div>
      </div>
    );
  })
  .add('Табы', () => {
    const [value, setValue] = useState(items[2]);

    const onChange = ({ value }) => {
      setValue(value);
    };

    return (
      <div>
        <Tabs value={value} items={items} onChange={onChange} {...defaultKnobs()} />
        <div>{value && <div>Контент для {value.label}</div>}</div>
      </div>
    );
  });
