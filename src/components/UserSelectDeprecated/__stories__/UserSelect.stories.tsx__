import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { groups, simpleItems } from '../__mocks__/data.mock';
import { createMetadata, createStory } from '../../../utils/storybook';
import {
  DefaultPropForm,
  DefaultPropView,
  form,
  view,
} from '../../SelectComponentsDeprecated/types';
import { UserSelect, userSelectPropSize, userSelectPropSizeDefault } from '../UserSelectDeprecated';

import mdx from './UserSelect.docs.mdx';

type Option = {
  label: string;
  subLabel?: string;
  value?: string;
  url?: string;
  id: number;
};

type Group = { label: string; items: Option[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getKnobs = () => ({
  disabled: boolean('disabled', false),
  multiple: boolean('multiple', false),
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
  const getItemNameDefault = (option: Option): string => option.label;
  const getItemKeyDefault = (option: Option): number => option.id;
  const getItemAdditionalInfoDefault = (option: Option): string => option.subLabel || '';
  const getItemUrlDefault = (option: Option): string => option.url || '';
  const [value, setValue] = useState<Option[] | null | undefined>();
  const {
    items = simpleItems,
    getItemLabel = getItemNameDefault,
    getGroupOptions,
    onChange = setValue,
  } = props;

  const options = items;
  let val: Option[] | null | undefined = [];
  if (value) {
    if (Array.isArray(value)) {
      val = value;
    } else {
      val.push(value);
    }
  } else {
    val = props.value;
  }

  return (
    <div>
      <UserSelect
        {...getKnobs()}
        id="example"
        name="item"
        options={options as Option[]}
        value={val}
        getOptionLabel={getItemLabel}
        getOptionKey={getItemKeyDefault}
        getOptionAdditionalInfo={getItemAdditionalInfoDefault}
        getOptionAvatarUrl={getItemUrlDefault}
        getGroupOptions={getGroupOptions as never}
        onChange={onChange}
      />
    </div>
  );
};

export const WithGroupsStory = createStory(
  () => <Default items={groups} getGroupOptions={(group) => group.items} />,
  {
    name: 'c группами опций',
  },
);

export default createMetadata({
  title: 'Компоненты|/Базовые/UserSelect(Deprecated)',
  id: 'components/UserSelectDeprecated',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=367%3A5636',
    },
  },
});
