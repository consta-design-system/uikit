import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata, createStory } from '../../../utils/storybook';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  DefaultPropWidth,
  form,
  sizes,
  view,
  width,
} from '../../SelectComponents/types';
import { BasicSelect } from '../BasicSelect';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
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
  size: select('size', sizes, DefaultPropSize),
  view: select('view', view, DefaultPropView),
  width: select('width', width, DefaultPropWidth),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

const Default = (props: { value?: SelectOption }): JSX.Element => {
  const getItemLabel = (option: SelectOption): string => option.label;

  return (
    <>
      <div>
        <BasicSelect
          {...getKnobs()}
          id="example"
          options={items}
          value={props.value}
          getOptionLabel={getItemLabel}
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
