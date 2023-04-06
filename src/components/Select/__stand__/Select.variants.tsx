import './Select.variants.css';

import { IconQuestion } from '@consta/icons/IconQuestion';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../utils/bem';
import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propSize,
  propStatus,
  propView,
} from '../../SelectComponents/types';
import {
  groups,
  Item,
  items,
  myData,
  myGroup,
  MyItem,
} from '../__mocks__/data.mock';
import { Select } from '../Select';

const cnSelectVariants = cn('SelectVariants');

const Variants = () => {
  const example = useSelect(
    'пример',
    ['обычный', 'с кастомным списком'],
    'обычный',
  );
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', propSize, defaultPropSize);
  const view = useSelect('view', propView, defaultPropView);
  const form = useSelect('form', propForm, defaultPropForm);
  const dropdownForm = useSelect(
    'dropdownForm',
    ['default', 'brick', 'round'],
    undefined,
  );
  const required = useBoolean('required', false);
  const status = useSelect('status', propStatus);
  const caption = useText('caption', 'Подпись');
  const label = useText('label', 'Заголовок');
  const withLabelIcon = useBoolean('withLabelIcon', false);
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const placeholder = useText('placeholder', 'Выберите цвет');
  const withGroups = useBoolean('withGroups', false);
  const isLoading = useBoolean('isLoading', false);

  const [value1, setValue1] = useState<Item | null | undefined>();
  const [value2, setValue2] = useState<MyItem | null | undefined>();

  if (example === 'обычный') {
    return (
      <Select
        className={cnSelectVariants()}
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        labelIcon={withLabelIcon ? IconQuestion : undefined}
        required={required}
        status={status}
        placeholder={placeholder}
        items={items}
        isLoading={isLoading}
        value={value1}
        onChange={({ value }) => setValue1(value)}
        groups={withGroups ? groups : []}
        label={label}
        labelPosition={labelPosition}
        caption={caption}
      />
    );
  }

  if (example === 'с кастомным списком') {
    return (
      <Select
        className={cnSelectVariants()}
        size={size}
        disabled={disabled}
        view={view}
        required={required}
        form={form}
        status={status}
        dropdownForm={dropdownForm}
        placeholder={placeholder}
        items={myData}
        value={value2}
        isLoading={isLoading}
        onChange={({ value }) => setValue2(value)}
        groups={withGroups ? myGroup : []}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnSelectVariants('MyItem', { active, hovered })}
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
            – {item.name}
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
  }
};

export default Variants;
