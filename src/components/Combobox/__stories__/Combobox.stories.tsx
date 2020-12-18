import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { groups, simpleItems } from '../__mocks__/data.mock';
import { createMetadata, createStory } from '../../../utils/storybook';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  form,
  sizes,
  view,
} from '../../SelectComponents/types';
import { Combobox } from '../Combobox';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Combobox.mdx';

type SelectOption = {
  label: string;
  value: string;
};

type Group = { label: string; items: SelectOption[] };
export type Option = SelectOption | Group;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', sizes, DefaultPropSize),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

const Default = (props: {
  value?: Option | null;
  items?: Option[];
  getItemLabel?(item: Option): string;
  getGroupOptions?(option: Option): SelectOption[];
  onCreate?(str: string): void;
  onChange?(item: Option | null): void;
}): JSX.Element => {
  const getItemLabelDefault = (option: SelectOption): string => option.label;
  const [value, setValue] = useState<Option | null | undefined>();
  const {
    items = simpleItems,
    getItemLabel = getItemLabelDefault,
    getGroupOptions,
    onCreate,
    onChange = setValue,
  } = props;

  const val = value !== undefined ? value : props.value;

  return (
    <div>
      <Combobox
        {...getKnobs()}
        id="example"
        options={items}
        value={val}
        getOptionLabel={getItemLabel}
        getGroupOptions={getGroupOptions}
        onCreate={onCreate}
        onChange={onChange}
      />
    </div>
  );
};

export const DefaultStory = createStory(() => <Default />);

export const WithValueStory = createStory(() => <Default value={simpleItems[4]} />, {
  name: 'c заданным значением',
});

export const WithGroupsStory = createStory(
  () => {
    return (
      <Default items={groups} getGroupOptions={(group: Group): SelectOption[] => group.items} />
    );
  },
  {
    name: 'c группами опций',
  },
);

export const WithCreateStory = createStory(
  () => {
    const [options, setOptions] = useState(simpleItems);
    const [value, setValue] = useState<Option | null | undefined>();

    const handleCreate = (label: string): void => {
      const newVal: SelectOption = { label, value: label };
      setValue(newVal);
      setOptions([newVal, ...options]);
    };

    return <Default items={options} onCreate={handleCreate} value={value} onChange={setValue} />;
  },
  {
    name: 'c cозданием новой опции',
  },
);

export default createMetadata({
  title: 'Компоненты|/Combobox',
  id: 'components/Combobox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
