import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { createMetadata, createStory } from '../../../utils/storybook';
import { groups, simpleItems } from '../../Combobox/__mocks__/data.mock';
import { DefaultPropForm, DefaultPropView, form, view } from '../../SelectComponents/types';
import {
  MultiCombobox,
  multiComboboxPropSize,
  multiComboboxPropSizeDefault,
} from '../MultiCombobox';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './MultiCombobox.mdx';

type SelectOption = {
  label: string;
  value: string;
};

type Group = { label: string; items: SelectOption[] };
type Option = SelectOption | Group;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', multiComboboxPropSize, multiComboboxPropSizeDefault),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

const Default = (props: {
  value?: SelectOption[];
  items?: Option[];
  getItemLabel?(item: Option): string;
  getGroupOptions?(option: Option): SelectOption[];
  onCreate?(str: string): void;
}): JSX.Element => {
  const getItemLabelDefault = (option: Option): string => option.label;
  const {
    items = simpleItems,
    getItemLabel = getItemLabelDefault,
    getGroupOptions,
    onCreate,
  } = props;

  const options = items;

  return (
    <div>
      <MultiCombobox
        {...getKnobs()}
        id="example"
        options={options}
        value={props.value}
        getOptionLabel={getItemLabel}
        getGroupOptions={getGroupOptions}
        onCreate={onCreate}
      />
    </div>
  );
};

export const DefaultStory = createStory(() => <Default />, {
  name: 'по умолчанию',
});

export const WithValueStory = createStory(() => <Default value={[simpleItems[4]]} />, {
  name: 'c заданным значением',
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const WithCreateStory = createStory(
  () => {
    const [opions, setOptions] = useState(simpleItems);

    const handleCreate = (label: string): void => {
      setOptions([{ label, value: label }, ...opions]);
    };

    return <Default items={opions} onCreate={handleCreate} />;
  },
  {
    name: 'c cозданием новой опции',
  },
);

export const WithGroupsStory = createStory(
  () => <Default items={groups} getGroupOptions={(group: Group): SelectOption[] => group.items} />,
  {
    name: 'c группами опций',
  },
);

export default createMetadata({
  title: 'Components|/MultiCombobox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
