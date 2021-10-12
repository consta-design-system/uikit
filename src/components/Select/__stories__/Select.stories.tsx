import './SelectStories.css';

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
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
  propStatus,
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
  status: select('status', ['', ...propStatus], ''),
  caption: text('caption', 'Подпись'),
  label: text('label', 'Заголовок'),
  labelPosition: select('labelPosition', ['top', 'left'], 'top'),
  placeholder: text('placeholder', 'Выберите цвет'),
  withGroups: boolean('withGroups', false),
});

export function Playground(): JSX.Element {
  const {
    size,
    disabled,
    view,
    form,
    status,
    placeholder,
    withGroups,
    label,
    labelPosition,
    caption,
  } = getKnobs();
  const [value, setValue] = useState<Item | null | undefined>();

  return (
    <EventInterceptorProvider eventHandler={action('EventInterceptor')} map={eventInterceptorMap}>
      <div>
        <Select
          size={size}
          disabled={disabled}
          view={view}
          form={form}
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
      </div>
    </EventInterceptorProvider>
  );
}

export const WithRender = createStory(
  () => {
    const {
      size,
      disabled,
      view,
      form,
      placeholder,
      withGroups,
      status,
      label,
      labelPosition,
      caption,
    } = getKnobs();
    const [value, setValue] = useState<MyItem | null | undefined>();
    return (
      <Select
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        status={status || undefined}
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
        label={label}
        labelPosition={labelPosition}
        caption={caption}
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
