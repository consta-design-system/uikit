import './SelectStories.css';

import React, { useState } from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';

import { groups, Item, items, myData, myGroup, MyItem } from '../__mocks__/data.mock';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import {
  eventInterceptorMap,
  EventInterceptorProvider,
} from '../../EventInterceptor/EventInterceptor';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propSize,
  propView,
} from '../../SelectComponents/types';
import { Select } from '../Select';

import mdx from './Select.docs.mdx';

const cnSelectStories = cn('SelectStories');

const getKnobs = () => ({
  disabled: boolean('disabled', false),
  size: select('size', propSize, defaultPropSize),
  view: select('view', propView, defaultPropView),
  form: select('form', propForm, defaultPropForm),
  placeholder: text('placeholder', 'Выберите цвет'),
  withGroups: boolean('withGroups', false),
});

export function Playground(): JSX.Element {
  const { size, disabled, view, form, placeholder, withGroups } = getKnobs();
  const [value, setValue] = useState<Item | null | undefined>();

  return (
    <EventInterceptorProvider eventHandler={console.log} map={eventInterceptorMap}>
      <div>
        <Select
          size={size}
          disabled={disabled}
          view={view}
          form={form}
          placeholder={placeholder}
          items={items}
          value={value}
          onChange={({ value }) => setValue(value)}
          groups={withGroups ? groups : []}
        />
      </div>
    </EventInterceptorProvider>
  );
}

export const WithRender = createStory(
  () => {
    const { size, disabled, view, form, placeholder, withGroups } = getKnobs();
    const [value, setValue] = useState<MyItem | null | undefined>();
    return (
      <Select
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        placeholder={placeholder}
        items={myData}
        value={value}
        onChange={({ value }) => setValue(value)}
        groups={withGroups ? myGroup : []}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnSelectStories('MyItem', { active, hovered })}
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
      />
    );
  },
  {
    name: 'со своим списком и заначением',
  },
);

export default createMetadata({
  title: 'Компоненты|/Базовые/Select',
  id: 'components/Select',
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
