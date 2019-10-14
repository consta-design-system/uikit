import React from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import ValueKeeper from '../../utils/testHelpers/ValueKeeper';
import ChoiceGroup from '.';

const knobs = () => ({
  wpSize: select('Size', ['xs', 's', 'm', 'l'], 'm'),
  form: select('Form', ['default', 'round', 'brick'], 'default'),
  disabled: boolean('Disabled', false),
});

storiesOf('ChoiceGroup', module)
  .addDecorator(withKnobs)
  .add('Один вариант выбора', () => {
    const items = [
      {
        value: 1,
        label: '1 choice',
      },
      {
        value: 2,
        label: '2 choice',
      },
    ];

    return (
      <ValueKeeper
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        render={({ value, onChange, onBlur }) => {
          return (
            <ChoiceGroup
              isMultiple={false}
              value={value}
              items={items}
              {...knobs()}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
        }}
      />
    );
  })
  .add('Множественный выбор', () => {
    const items = [
      {
        value: 1,
        label: '1 choice',
      },
      {
        value: 2,
        label: '2 choice',
      },
      {
        value: 3,
        label: '3 choice',
      },
    ];
    return (
      <ValueKeeper<number[]>
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        render={({ value, onChange, onBlur }) => {
          return (
            <ChoiceGroup
              isMultiple={true}
              value={value || []}
              items={items}
              {...knobs()}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
        }}
      />
    );
  });
