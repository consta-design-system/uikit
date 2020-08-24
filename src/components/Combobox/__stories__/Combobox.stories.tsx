import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata, createStory } from '../../../utils/storybook';
import { Combobox } from '../Combobox';

import mdx from './Combobox.mdx';

type SelectOption = {
  label: string;
  value: string;
};

const simpleItems = [
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

type Group = { label: string; items: SelectOption[] };

const groups = [
  {
    label: 'First',
    items: [
      { label: 'Neptunium', value: 'Neptunium' },
      { label: 'Plutonium', value: 'Plutonium' },
      { label: 'Americium', value: 'Americium' },
      { label: 'Curium', value: 'Curium' },
      { label: 'Berkelium', value: 'Berkelium' },
    ],
  },
  {
    label: 'Second',
    items: [
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
    ],
  },
  {
    label: 'Third',
    items: [
      { label: 'Bohrium', value: 'Bohrium' },
      { label: 'Hassium', value: 'Hassium' },
      { label: 'Meitnerium', value: 'Meitnerium' },
      { label: 'Darmstadtium', value: 'Darmstadtium' },
      { label: 'Roentgenium', value: 'Roentgenium' },
      { label: 'Copernicium', value: 'Copernicium' },
      { label: 'Nihonium', value: 'Nihonium' },
      { label: 'Flerovium', value: 'Flerovium' },
    ],
  },
  {
    label: 'Four',
    items: [
      { label: 'Moscovium', value: 'Moscovium' },
      { label: 'Livermorium', value: 'Livermorium' },
      { label: 'Tennessine', value: 'Tennessine' },
      { label: 'Oganesson', value: 'Oganesson' },
    ],
  },
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

const Default = (props: {
  value?: SelectOption;
  items?: SelectOption[] | Group[];
  getItemLabel?(item: SelectOption | Group): string;
  getGroupOptions?(option: Group): SelectOption[];
}): JSX.Element => {
  const getItemLabelDefault = (option: SelectOption): string => option.label;
  const { items = simpleItems, getItemLabel = getItemLabelDefault, getGroupOptions } = props;

  const options = items;

  const handleCreate = (): void => {};

  return (
    <>
      <div>
        <Combobox
          {...getKnobs()}
          id="example"
          options={options}
          value={props.value}
          getOptionLabel={getItemLabel}
          getGroupOptions={getGroupOptions}
          onCreate={handleCreate}
        />
      </div>
    </>
  );
};

export const DefaultStory = createStory(() => <Default />, {
  name: 'по умолчанию',
});

export const WithValueStory = createStory(() => <Default value={simpleItems[4]} />, {
  name: 'c заданным значением',
});

export const WithGroupsStory = createStory(
  () => <Default items={groups} getGroupOptions={(group: Group): SelectOption[] => group.items} />,
  {
    name: 'c группами опций',
  },
);

export default createMetadata({
  title: 'Components|/Combobox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
