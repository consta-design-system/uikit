import React from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
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
      {
        value: 3,
        label: '3 choice',
      },
    ];

    return <ChoiceGroup isMultiple={false} groupName={'test'} items={items} {...knobs()} />;
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
    return <ChoiceGroup isMultiple={true} items={items} groupName={'test'} {...knobs()} />;
  });
