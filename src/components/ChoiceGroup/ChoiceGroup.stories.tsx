import React, { useState } from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ChoiceGroup } from '../ChoiceGroup/ChoiceGroup';

declare type Item = string;

const items = ['один', 'два', 'три'];

const knobs = () => ({
  multiply: boolean('multiply', false),
});

storiesOf('ChoiceGroup', module)
  .addDecorator(withKnobs)
  .add('Custom', () => {
    const [value, setValue] = useState<Item[] | null>(null);
    return (
      <ChoiceGroup<Item>
        {...knobs()}
        items={items}
        value={value}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        className="choice-group_view_primary"
      />
    );
  });
