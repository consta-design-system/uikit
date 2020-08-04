import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata, createStory } from '../../../utils/storybook';
import { BasicSelect } from '../BasicSelect/BasicSelect';

import mdx from './BasicSelect.mdx';

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
const getKnobs = () => ({
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

// storiesOf('BasicSelect', module)
//   .addDecorator(withKnobs)
//   .add('по умолчанию', () => {})
//   .add('с заданным значением', () => {});

const Default = (props: { value?: SelectOption }): JSX.Element => {
  const getItemLabel = (option: SelectOption): string => option.label;
  const getItemKey = (option: SelectOption): string => option.value;
  const getItemValue = (option: SelectOption): string => option.value;

  return (
    <>
      <div style={{ width: '250px' }}>
        <BasicSelect<SelectOption>
          {...getKnobs()}
          id="example"
          options={items}
          value={props.value}
          getOptionLabel={getItemLabel}
          getOptionKey={getItemKey}
          getOptionValue={getItemValue}
        />
      </div>
    </>
  );
};

export const DefaultStory = createStory(() => <Default />, {
  name: 'по умолчанию',
});

export const WithValueStory = createStory(() => <Default value={items[4]} />, {
  name: 'c заданным значением',
});

export default createMetadata({
  title: 'Components|/BasicSelect',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
