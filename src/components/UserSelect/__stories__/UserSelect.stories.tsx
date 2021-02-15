import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { groups, simpleItems } from '../__mocks__/data.mock';
import { createMetadata, createStory } from '../../../utils/storybook';
import { DefaultPropForm, DefaultPropView, form, view } from '../../SelectComponents/types';
import { UserSelect, userSelectPropSize, userSelectPropSizeDefault } from '../UserSelect';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './UserSelect.mdx';

type Option = {
  label: string;
  subLabel?: string;
  value?: string;
  url?: string;
};

type Group = { label: string; items: Option[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  multi: boolean('multi', true),
  size: select('size', userSelectPropSize, userSelectPropSizeDefault),
  view: select('view', view, DefaultPropView),
  form: select('form', form, DefaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
});

const Default = (
  props: {
    value?: Option[] | null;
    getItemLabel?: (item: Option) => string;
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
  const getItemSubLabelDefault = (option: Option): string => option.subLabel || '';
  const getItemUrlDefault = (option: Option): string => option.url || '';
  const [value, setValue] = useState<Option[] | null | undefined>();
  const {
    items = simpleItems,
    getItemLabel = getItemLabelDefault,
    getGroupOptions,
    onChange = setValue,
  } = props;

  const options = items;
  const val = value !== undefined ? value : props.value;

  return (
    <div>
      <UserSelect
        {...getKnobs()}
        id="example"
        name="item"
        options={options as Option[]}
        value={val}
        getOptionLabel={getItemLabel}
        getOptionSubLabel={getItemSubLabelDefault}
        getOptionUrl={getItemUrlDefault}
        getGroupOptions={getGroupOptions as never}
        onChange={onChange}
      />
    </div>
  );
};

export const WithValueStory = createStory(() => <Default value={[simpleItems[4]]} />, {
  name: 'c заданным значением',
});

export const WithGroupsStory = createStory(
  () => <Default items={groups} getGroupOptions={(group) => group.items} />,
  {
    name: 'c группами опций',
  },
);

export default createMetadata({
  title: 'Компоненты|/UserSelect',
  id: 'components/UserSelect',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
