import React from 'react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NumberInput from '.';

const knobs = () => ({
  allowNegative: boolean('Можно отрицательные', true),
});

type WrapperState = { value?: number };
storiesOf('NumberInput', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ width: '200px' }}>
        <NumberInput
          wpSize="s"
          onValueChange={action('onValueChange')}
          onChange={action('onChange')}
          {...knobs()}
        />
      </div>
    );
  })
  .add('c ограничениями', () => {
    return (
      <div style={{ width: '200px' }}>
        <NumberInput
          wpSize="s"
          onValueChange={action('onValueChange')}
          onChange={action('onChange')}
          max={number('Макс', 2000)}
          min={number('Мин', 0)}
          {...knobs()}
        />
      </div>
    );
  });
