import React, { useState } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import '../Common/styles.css';
import './styles.css';

import Tabs from '../Tabs';

const list = [
  {
    code: 'tab1',
    label: 'Пункт',
  },
  {
    code: 'tab2',
    label: 'Пункт 2',
  },
  {
    code: 'tab3',
    label: 'Пункт 2.2',
  },
  {
    code: 'tab4',
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
    const [activeCode, setActiveCode] = useState(list[0].code);

    return (
      <div>
        <Tabs activeCode={activeCode} list={list} onChange={setActiveCode} {...defaultKnobs()} />
        <div>
          {activeCode === list[0].code && <div>Контент для {list[0].label}</div>}
          {activeCode === list[1].code && <div>Контент для {list[1].label}</div>}
          {activeCode === list[2].code && <div>Контент для {list[2].label}</div>}
          {activeCode === list[3].code && <div>Контент для {list[3].label}</div>}
        </div>
      </div>
    );
  })
  .add('Табы в контенте', () => {
    const [activeCode, setActiveCode] = useState(list[0].code);

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div
            style={{ textAlign: 'center', background: 'green', width: '200px', marginRight: 50 }}
          >
            Любой компонент
          </div>
          <Tabs activeCode={activeCode} list={list} onChange={setActiveCode} {...defaultKnobs()} />
        </div>
        <div>
          {activeCode === list[0].code && <div>Контент для {list[0].label}</div>}
          {activeCode === list[1].code && <div>Контент для {list[1].label}</div>}
          {activeCode === list[2].code && <div>Контент для {list[2].label}</div>}
          {activeCode === list[3].code && <div>Контент для {list[3].label}</div>}
        </div>
      </div>
    );
  });
