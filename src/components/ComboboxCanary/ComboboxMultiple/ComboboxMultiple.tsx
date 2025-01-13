import React, { forwardRef } from 'react';

import {
  FieldArrayValueInlineControl,
  FieldArrayValueItem,
  FieldSelectControlLayout,
} from '##/components/FieldComponents';

import {
  cnCombobox,
  ComboboxComponent,
  ComboboxGroupDefault,
  ComboboxItemDefault,
  ComboboxProps,
} from '..';
import { withDefaultGetters } from '../helpers';

const ComboboxMultipleRender = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
>(
  props: ComboboxProps<ITEM, GROUP, true>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { form, status, size, disabled, multiple, value, getItemLabel } =
    withDefaultGetters(props);

  return (
    <FieldSelectControlLayout
      ref={ref}
      className={cnCombobox()}
      form={form}
      status={status}
      size={size}
      disabled={disabled}
      separator
      onClear={() => {}}
      open
    >
      <FieldArrayValueInlineControl
        value={value || undefined}
        renderValue={(items) =>
          items.map((item, index) => (
            <FieldArrayValueItem size={size} label={getItemLabel(item)} />
          ))
        }
      />
    </FieldSelectControlLayout>
  );
};

export const ComboboxMultiple = forwardRef(
  ComboboxMultipleRender,
) as ComboboxComponent;
