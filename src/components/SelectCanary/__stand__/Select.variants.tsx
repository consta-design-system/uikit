import './Select.variants.css';

import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useRef, useState } from 'react';

import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/FieldComponents/__mocks__/variants';
import { cn } from '##/utils/bem';

import { Select, SelectPropOnCreate } from '..';
import { groups, Item, items } from '../__mocks__/data.mock';

const getUndefined = () => undefined;

const conditionalGetter = (conditional: boolean) =>
  conditional ? undefined : getUndefined;

const cnSelectCanaryVariants = cn('SelectCanaryVariants');

const Variants = () => {
  const placeholder = useText('placeholder', 'Placeholder');
  const withGroups = useBoolean('withGroups', false);
  const isLoading = useBoolean('isLoading', false);
  const multiple = useBoolean('multiple', false);
  const withCreateButton = useBoolean('onCreate', false);
  const clearButton = useBoolean('clearButton', false);
  const input = useBoolean('input', false);
  const selectAll = useBoolean('selectAll', false, multiple);
  const allSelectedAllLabel = useText('allSelectedAllLabel', 'Все', selectAll);
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const form = useSelect('form', fieldPropForm, fieldPropFormDefault);
  const dropdownForm = useSelect(
    'dropdownForm',
    ['default', 'brick', 'round'],
    undefined,
  );
  const disabled = useBoolean('disabled', false);
  const itemsDisabled = useBoolean('itemsDisabled', false);
  const status = useSelect('status', fieldPropStatus);

  const [value, setValue] = useState<Item | null>();
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>([items[8]]);
  const onCreate: SelectPropOnCreate | undefined = withCreateButton
    ? (label) => alert(label ? `Создание "${label}"` : 'Создание элемента')
    : undefined;

  const ref = useRef(null);

  if (multiple) {
    return (
      <div className={cnSelectCanaryVariants()}>
        <Select
          key="multiple"
          size={size}
          disabled={disabled}
          view={view}
          selectAll={selectAll}
          onCreate={onCreate}
          form={form}
          status={status}
          // allSelectedAllLabel={allSelectedAllLabel}
          dropdownForm={dropdownForm}
          placeholder={placeholder}
          items={items}
          value={valueMultiple}
          onChange={setValueMultiple}
          // groups={withGroups ? groups : []}
          multiple
          isLoading={isLoading}
          getItemDisabled={conditionalGetter(itemsDisabled)}
          clearButton={clearButton}
          input={input}
        />
      </div>
    );
  }
  return (
    <div className={cnSelectCanaryVariants()}>
      <Select
        key="not-multiple"
        size={size}
        disabled={disabled}
        view={view}
        form={form}
        onCreate={onCreate}
        isLoading={isLoading}
        dropdownForm={dropdownForm}
        status={status || undefined}
        placeholder={placeholder}
        items={items}
        value={value}
        onChange={setValue}
        groups={withGroups ? groups : []}
        getItemDisabled={conditionalGetter(itemsDisabled)}
        clearButton={clearButton}
        input={input}
        ref={ref}
      />
    </div>
  );
};

export default Variants;
