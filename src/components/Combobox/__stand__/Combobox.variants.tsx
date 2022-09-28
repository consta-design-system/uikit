import './Combobox.variants.css';

import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propStatus,
  propView,
} from '../../SelectComponents/types';
import { groups, Item, items } from '../__mocks__/data.mock';
import { Combobox } from '../Combobox';

const cnComboboxVariants = cn('ComboboxVariants');

const Variants = () => {
  const disabled = useBoolean('disabled', false);
  const size = useSelect('size', ['m', 's', 'l'], defaultPropSize);
  const view = useSelect('view', propView, defaultPropView);
  const form = useSelect('form', propForm, defaultPropForm);
  const required = useBoolean('required', false);
  const caption = useText('caption', 'Хорошо подумайте, это важно');
  const label = useText('label', 'Здесь можно выбрать цвет');
  const status = useSelect('status', propStatus);
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const placeholder = useText('placeholder', 'Placeholder');
  const withGroups = useBoolean('withGroups', false);
  const isLoading = useBoolean('isLoading', false);

  const [value, setValue] = useState<Item | null>(null);
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>(null);
  const multiple = useBoolean('multiple', false);

  if (multiple) {
    return (
      <div className={cnComboboxVariants()}>
        <Combobox
          key="multiple"
          size={size}
          disabled={disabled}
          view={view}
          form={form}
          required={required}
          status={status}
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
      </div>
    );
  }
  return (
    <div className={cnComboboxVariants()}>
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
    </div>
  );
};

export default Variants;
