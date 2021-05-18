import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata } from '../../../utils/storybook';
import {
  eventInterceptorMap,
  EventInterceptorProvider,
} from '../../EventInterceptor/EventInterceptor';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  form,
  sizes,
  view,
} from '../../SelectComponents/types';
import { BasicSelect } from '../BasicSelect';

import mdx from './BasicSelect.docs.mdx';

type SelectOption = {
  value: string;
  label: string;
  id: number;
};

const items = [
  { label: 'Neptunium', value: 'Neptunium', id: 1 },
  { label: 'Plutonium', value: 'Plutonium', id: 2 },
  { label: 'Americium', value: 'Americium', id: 3 },
  { label: 'Curium', value: 'Curium', id: 4 },
  { label: 'Berkelium', value: 'Berkelium', id: 5 },
  {
    label: 'Californium Berkelium Curium Plutonium',
    value: 'Californium Berkelium Curium Plutonium',
    id: 6,
  },
  { label: 'Einsteinium', value: 'Einsteinium', id: 7 },
  { label: 'Fermium', value: 'Fermium', id: 8 },
  { label: 'Mendelevium', value: 'Mendelevium', id: 9 },
  { label: 'Nobelium', value: 'Nobelium', id: 10 },
  { label: 'Lawrencium', value: 'Lawrencium', id: 11 },
  { label: 'Rutherfordium', value: 'Rutherfordium', id: 12 },
  { label: 'Dubnium', value: 'Dubnium', id: 13 },
  { label: 'Seaborgium', value: 'Seaborgium', id: 14 },
  { label: 'Bohrium', value: 'Bohrium', id: 15 },
  { label: 'Hassium', value: 'Hassium', id: 16 },
  { label: 'Meitnerium', value: 'Meitnerium', id: 17 },
  { label: 'Darmstadtium', value: 'Darmstadtium', id: 18 },
  { label: 'Roentgenium', value: 'Roentgenium', id: 19 },
  { label: 'Copernicium', value: 'Copernicium', id: 20 },
  { label: 'Nihonium', value: 'Nihonium', id: 21 },
  { label: 'Flerovium', value: 'Flerovium', id: 22 },
  { label: 'Moscovium', value: 'Moscovium', id: 23 },
  { label: 'Livermorium', value: 'Livermorium', id: 24 },
  { label: 'Tennessine', value: 'Tennessine', id: 25 },
  { label: 'Oganesson', value: 'Oganesson', id: 26 },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', sizes, DefaultPropSize),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

export function Playground(props: {
  value?: SelectOption;
  onChange?(item: SelectOption | null): void;
}): JSX.Element {
  const getItemLabel = (option: SelectOption): string => option.label;
  const getItemKey = (option: SelectOption): number => option.id;
  const [value, setValue] = useState<SelectOption | null | undefined>(props.value);

  const { onChange = setValue } = props;

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div>
        <BasicSelect
          {...getKnobs()}
          id="example"
          name="item"
          options={items}
          value={value}
          onChange={onChange}
          getOptionLabel={getItemLabel}
          getOptionKey={getItemKey}
        />
      </div>
    </EventInterceptorProvider>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/BasicSelect',
  id: 'components/BasicSelect',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9701%3A190445',
    },
  },
});
