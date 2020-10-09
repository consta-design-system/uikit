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
type Option = SelectOption | Group;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', sizes, DefaultPropSize),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

const Default = (props: {
  value?: SelectOption;
  items?: Option[];
  getItemLabel?(item: Option): string;
  getGroupOptions?(option: Option): SelectOption[];
  onCreate?(str: string): void;
}): JSX.Element => {
  const getItemLabelDefault = (option: SelectOption): string => option.label;
  const {
    items = simpleItems,
    getItemLabel = getItemLabelDefault,
    getGroupOptions,
    onCreate,
  } = props;

  return (
    <div>
      <Combobox
        {...getKnobs()}
        id="example"
        options={items}
        value={props.value}
        getOptionLabel={getItemLabel}
        getGroupOptions={getGroupOptions}
        onCreate={onCreate}
      />
    </div>
  );
};

export const DefaultStory = createStory(() => <Default />);

export const WithValueStory = createStory(() => <Default value={simpleItems[4]} />, {
  name: 'c заданным значением',
});

export const WithGroupsStory = createStory(
  () => <Default items={groups} getGroupOptions={(group: Group): SelectOption[] => group.items} />,
  {
    name: 'c группами опций',
  },
);

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

export default createMetadata({
  title: 'Components|/Combobox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
