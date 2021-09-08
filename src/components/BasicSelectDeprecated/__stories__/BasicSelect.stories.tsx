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
} from '../../SelectComponentsDeprecated/types';
import { BasicSelect } from '../BasicSelectDeprecated';

import mdx from './BasicSelect.docs.mdx';

type SelectOption = {
  value: string;
  label: string;
  id: number;
};

const items = [
  { label: 'Синий', value: 'blue', id: 1 },
  { label: 'Белый', value: 'white', id: 2 },
  { label: 'Красный', value: 'red', id: 3 },
  { label: 'Жёлтый', value: 'yellow', id: 4 },
  { label: 'Зелёный', value: 'green', id: 5 },
  {
    label: 'Серо-буро-малиновый в крапинку',
    value: 'mix',
    id: 6,
  },
  { label: 'Оранжевый', value: 'orange', id: 7 },
  { label: 'Фиолетовый', value: 'violet', id: 8 },
  { label: 'Лиловый', value: 'lilas', id: 9 },
  { label: 'В клеточку', value: 'checked', id: 10 },
  { label: 'В полосочку', value: 'striped', id: 11 },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', sizes, DefaultPropSize),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Выберите цвет'),
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
  title: 'Компоненты|/Базовые/BasicSelect(Deprecated)',
  id: 'components/BasicSelectDeprecated',
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
