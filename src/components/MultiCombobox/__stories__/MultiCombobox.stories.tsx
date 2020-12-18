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

type Option = {
  label: string;
  value: string;
};

type Group = { label: string; items: Option[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', multiComboboxPropSize, multiComboboxPropSizeDefault),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

const Default = (
  props: {
    value?: Option[] | null;
    getItemLabel?: (item: Option) => string;
    onCreate?(str: string): void;
    onChange?(item: Option[] | null): void;
  } & (
    | {
        items?: Group[];
        getGroupOptions?: (group: Group) => Option[];
      }
    | {
        getGroupOptions?: never;
        items?: Option[];
      }
  ),
): JSX.Element => {
  const getItemLabelDefault = (option: Option): string => option.label;
  const [value, setValue] = useState<Option[] | null | undefined>();
  const {
    items = simpleItems,
    getItemLabel = getItemLabelDefault,
    getGroupOptions,
    onCreate,
    onChange = setValue,
  } = props;

  const options = items;
  const val = value !== undefined ? value : props.value;

  return (
    <div>
      <MultiCombobox
        {...getKnobs()}
        id="example"
        options={options as Option[]}
        value={val}
        getOptionLabel={getItemLabel}
        getGroupOptions={getGroupOptions as never}
        onCreate={onCreate}
        onChange={onChange}
      />
    </div>
  );
};

export const WithValueStory = createStory(() => <Default value={[simpleItems[4]]} />, {
  name: 'c заданным значением',
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const WithCreateStory = createStory(
  () => {
    const [options, setOptions] = useState(simpleItems);
    const [value, setValue] = useState<Option[] | undefined | null>();

    const handleCreate = (label: string): void => {
      setValue([...(value || []), { label, value: label }]);
      setOptions([{ label, value: label }, ...options]);
    };

    return <Default items={options} onCreate={handleCreate} value={value} onChange={setValue} />;
  },
  {
    name: 'c cозданием новой опции',
  },
);

export const WithGroupsStory = createStory(
  () => <Default items={groups} getGroupOptions={(group) => group.items} />,
  {
    name: 'c группами опций',
  },
);

export default createMetadata({
  title: 'Компоненты|/MultiCombobox',
  id: 'components/MultiCombobox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
