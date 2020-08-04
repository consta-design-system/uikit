import React from 'react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { BasicSelect } from '../BasicSelect/BasicSelect';

type SelectOption = {
  value: string;
  label: string;
};

const items = [
  { label: 'Neptunium', value: 'Neptunium' },
  { label: 'Plutonium', value: 'Plutonium' },
  { label: 'Americium', value: 'Americium' },
  { label: 'Curium', value: 'Curium' },
  { label: 'Berkelium', value: 'Berkelium' },
  {
    label: 'Californium Berkelium Curium Plutonium',
    value: 'Californium Berkelium Curium Plutonium',
  },
  { label: 'Einsteinium', value: 'Einsteinium' },
  { label: 'Fermium', value: 'Fermium' },
  { label: 'Mendelevium', value: 'Mendelevium' },
  { label: 'Nobelium', value: 'Nobelium' },
  { label: 'Lawrencium', value: 'Lawrencium' },
  { label: 'Rutherfordium', value: 'Rutherfordium' },
  { label: 'Dubnium', value: 'Dubnium' },
  { label: 'Seaborgium', value: 'Seaborgium' },
  { label: 'Bohrium', value: 'Bohrium' },
  { label: 'Hassium', value: 'Hassium' },
  { label: 'Meitnerium', value: 'Meitnerium' },
  { label: 'Darmstadtium', value: 'Darmstadtium' },
  { label: 'Roentgenium', value: 'Roentgenium' },
  { label: 'Copernicium', value: 'Copernicium' },
  { label: 'Nihonium', value: 'Nihonium' },
  { label: 'Flerovium', value: 'Flerovium' },
  { label: 'Moscovium', value: 'Moscovium' },
  { label: 'Livermorium', value: 'Livermorium' },
  { label: 'Tennessine', value: 'Tennessine' },
  { label: 'Oganesson', value: 'Oganesson' },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const knobsContainer = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['xs', 's', 'm', 'l'], 'm'),
  view: select('view', ['default', 'clear'], 'default'),
  width: select('width', ['full', 'default'], 'default'),
  form: select(
    'form',
    [
      'default',
      'brick',
      'round',
      'clearRound',
      'roundClear',
      'clearDefault',
      'defaultClear',
      'defaultBrick',
      'brickDefault',
      'brickClear',
      'clearBrick',
      'clearClear',
    ],
    'default',
  ),
  placeholder: text('placeholder', 'Placeholder'),
});

storiesOf('BasicSelect', module)
  .addDecorator(withKnobs)
  .add('по умолчанию', () => {
    const getItemLabel = (option: SelectOption): string => option.label;
    const getItemKey = (option: SelectOption): string => option.value;
    const getItemValue = (option: SelectOption): string => option.value;

    return (
      <>
        <div style={{ width: '250px' }}>
          <BasicSelect<SelectOption>
            {...knobsContainer()}
            id="example"
            options={items}
            getOptionLabel={getItemLabel}
            getOptionKey={getItemKey}
            getOptionValue={getItemValue}
          />
        </div>
      </>
    );
  })
  .add('с заданным значением', () => {
    const getItemLabel = (option: SelectOption): string => option.label;
    const getItemKey = (option: SelectOption): string => option.value;
    const getItemValue = (option: SelectOption): string => option.value;

    return (
      <>
        <div style={{ width: '250px' }}>
          <BasicSelect<SelectOption>
            {...knobsContainer()}
            id="example"
            value={{ label: 'Nihonium', value: 'Nihonium' }}
            options={items}
            getOptionLabel={getItemLabel}
            getOptionKey={getItemKey}
            getOptionValue={getItemValue}
          />
        </div>
      </>
    );
  });
