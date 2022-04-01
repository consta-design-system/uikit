import './ComboboxStories.css';

import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { groups, Item, items, myData, myGroup, MyItem } from '../__mocks__/data.mock';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propStatus,
  propView,
} from '../../SelectComponents/types';
import { Combobox } from '../Combobox';

import mdx from './Combobox.docs.mdx';

const cnComboboxStories = cn('ComboboxStories');

const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['m', 's', 'l'], defaultPropSize),
  view: select('view', propView, defaultPropView),
  form: select('form', propForm, defaultPropForm),
  required: boolean('required', false),
  caption: text('caption', 'Хорошо подумайте, это важно'),
  label: text('label', 'Здесь можно выбрать цвет'),
  status: select('status', ['', ...propStatus], ''),
  labelPosition: select('labelPosition', ['top', 'left'], 'top'),
  placeholder: text('placeholder', 'Placeholder'),
  withGroups: boolean('withGroups', false),
  isLoading: boolean('isLoading', false),
});

export function Playground(): JSX.Element {
  const {
    size,
    disabled,
    view,
    form,
    required,
    status,
    placeholder,
    withGroups,
    label,
    isLoading,
    labelPosition,
    caption,
  } = getKnobs();
  const [value, setValue] = useState<Item | null>(null);
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const multiple = boolean('multiple', false);

  if (multiple) {
    return (
      <Combobox
        key="multiple"
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        required={required}
        status={status || undefined}
        placeholder={placeholder}
        items={items}
        value={valueMultiple}
        onChange={({ value }) => setValueMultiple(value)}
        groups={withGroups ? groups : []}
        multiple
        isLoading={isLoading}
        label={label}
        labelPosition={labelPosition}
        caption={caption}
      />
    );
  }
  return (
    <Combobox
      key="not-multiple"
      size={size}
      disabled={disabled}
      view={view}
      form={form}
      isLoading={isLoading}
      required={required}
      status={status || undefined}
      placeholder={placeholder}
      items={items}
      value={value}
      onChange={({ value }) => setValue(value)}
      groups={withGroups ? groups : []}
      label={label}
      labelPosition={labelPosition}
      caption={caption}
    />
  );
}

export const WithRender = createStory(
  () => {
    const {
      size,
      disabled,
      view,
      status,
      form,
      required,
      placeholder,
      withGroups,
      label,
      labelPosition,
      isLoading,
      caption,
    } = getKnobs();
    const [value, setValue] = useState<MyItem | null>();

    return (
      <Combobox
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        status={status || undefined}
        placeholder={placeholder}
        items={myData}
        required={required}
        value={value}
        onChange={({ value }) => setValue(value)}
        groups={withGroups ? myGroup : []}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnComboboxStories('MyItem', { active, hovered })}
            role="option"
            tabIndex={0}
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            {item.name}
          </div>
        )}
        renderValue={({ item }) => (
          <div>
            <span role="img" aria-label="Panda">
              🐼
            </span>{' '}
            - {item.name}
          </div>
        )}
        getGroupKey={(group) => group}
        getGroupLabel={(group) => group}
        getItemGroupKey={(item) => item.group}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        label={label}
        isLoading={isLoading}
        labelPosition={labelPosition}
        caption={caption}
      />
    );
  },
  {
    name: 'со своим списком и заначением',
  },
);

export const WithCreate = createStory(
  () => {
    const {
      size,
      disabled,
      view,
      form,
      required,
      status,
      placeholder,
      withGroups,
      label,
      labelPosition,
      caption,
      isLoading,
    } = getKnobs();
    const [value, setValue] = useState<Item | null>();
    const [list, setList] = useState<Item[]>(items);
    return (
      <Combobox
        key="not-multiple"
        size={size}
        disabled={disabled}
        view={view}
        required={required}
        form={form}
        status={status || undefined}
        placeholder={placeholder}
        items={list}
        value={value}
        isLoading={isLoading}
        onChange={({ value }) => setValue(value)}
        groups={withGroups ? groups : []}
        onCreate={({ label }) => setList([{ label, id: `${label}_${list.length + 1}` }, ...list])}
        label={label}
        labelPosition={labelPosition}
        caption={caption}
      />
    );
  },
  {
    name: 'с созданием новой опции',
  },
);

export default createMetadata({
  title: 'Компоненты|/Базовые/Combobox',
  id: 'components/Combobox',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=11065%3A140493',
    },
  },
});
