import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { BaseCheckGroupField } from './BaseCheckGroupField';

declare type Item = {
  id: string;
};

const knobs = () => ({
  items: [
    {
      id: 'ee',
    },
    {
      id: 'eew',
    },
    {
      id: 'eeeeeee',
    },
  ],
});

//- для того чтобы компонент появился в storyBook раскоментируй код ниже

storiesOf('CheckGroupMainField', module)
  .addDecorator(withKnobs)
  .add('Чекбокс', () => {
    const [value, setValue] = useState<Item[] | null>(null);
    console.log({ value });
    return (
      <BaseCheckGroupField<Item>
        {...knobs()}
        value={value}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.id}
        onChange={({ value }) => setValue(value)}
        componentItem={({ label, onChange, id, checked, value }) => (
          <div
            onClick={(e) => {
              console.log({ e, value, id, checked: !checked });
              onChange({ e, value, id, checked: !checked });
            }}
          >
            {label}
            {checked ? ' - !' : ''}
          </div>
        )}
      />
    );
  });
