import './UserSelectStories.css';

import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { groups, Item, items, myGroup, MyItem, myItems } from '../__mocks__/data.mock';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propView,
} from '../../SelectComponents/types';
import { Text } from '../../Text/Text';
import { UserSelect } from '../UserSelect';

import mdx from './UserSelect.docs.mdx';

const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', ['m', 's', 'l'], defaultPropSize),
  view: select('view', propView, defaultPropView),
  form: select('form', propForm, defaultPropForm),
  placeholder: text('placeholder', 'Placeholder'),
  withGroups: boolean('withGroups', false),
});

const cnUserSelectStories = cn('UserSelectStories');

export function Playground(): JSX.Element {
  const { size, disabled, view, form, placeholder, withGroups } = getKnobs();
  const [value, setValue] = useState<Item | null>(null);
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const multiple = boolean('multiple', false);

  if (multiple) {
    return (
      <UserSelect
        key="multiple"
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        placeholder={placeholder}
        items={items}
        value={valueMultiple}
        onChange={({ value }) => setValueMultiple(value)}
        groups={withGroups ? groups : []}
        multiple
      />
    );
  }
  return (
    <UserSelect
      key="not-multiple"
      size={size}
      disabled={disabled}
      view={view}
      form={form}
      placeholder={placeholder}
      items={items}
      value={value}
      onChange={({ value }) => setValue(value)}
      groups={withGroups ? groups : []}
      multiple={false}
    />
  );
}

const searchFunction = (item: MyItem, searchValue: string): boolean => {
  const searchOfName =
    item.name.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1;

  if (searchOfName) {
    return searchOfName;
  }

  const searchOfEmail =
    item.email?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1;

  if (searchOfEmail) {
    return searchOfEmail;
  }

  return item.position?.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1;
};

export const WithRender = createStory(
  () => {
    const { size, disabled, view, form, placeholder, withGroups } = getKnobs();
    const [value, setValue] = useState<MyItem | null>();

    return (
      <UserSelect
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        placeholder={placeholder}
        items={myItems}
        value={value}
        onChange={({ value }) => setValue(value)}
        groups={withGroups ? myGroup : []}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnUserSelectStories('MyItem', { active, hovered })}
            role="option"
            tabIndex={0}
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            {item.name}
            <Text view="secondary" size="xs">
              {item.email}
            </Text>
            <Text view="secondary" size="xs">
              {item.position}
            </Text>
          </div>
        )}
        renderValue={({ item }) => (
          <div className={cnUserSelectStories('MyValue')}>
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
        getItemAvatarUrl={(item) => item.avatarUrl}
        getItemSubLabel={(item) => item.email}
        searchFunction={searchFunction}
      />
    );
  },
  {
    name: 'со своим списком и заначением',
  },
);

export const WithCreate = createStory(
  () => {
    const { size, disabled, view, form, placeholder, withGroups } = getKnobs();
    const [value, setValue] = useState<Item | null>();
    const [list, setList] = useState<Item[]>(items);

    return (
      <UserSelect
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        placeholder={placeholder}
        items={list}
        value={value}
        onChange={({ value }) => setValue(value)}
        groups={withGroups ? groups : []}
        onCreate={({ label }) => setList([{ label, id: `${label}_${list.length + 1}` }, ...list])}
      />
    );
  },
  {
    name: 'с созданием новой опции',
  },
);

export default createMetadata({
  title: 'Компоненты|/Базовые/UserSelect',
  id: 'components/UserSelect',
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
