import React, { forwardRef } from 'react';

import {
  ComboboxComponent,
  ComboboxGroupDefault,
  ComboboxItemDefault,
  ComboboxProps,
} from '.';
import { ComboboxMultiple } from './ComboboxMultiple';
import { ComboboxSingle } from './ComboboxSingle';

const componentMap: Record<number, ComboboxComponent> = {
  0: ComboboxSingle,
  1: ComboboxMultiple,
};

const ComboboxRender = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: ComboboxProps<ITEM, GROUP, MULTIPLE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = componentMap[props.multiple ? 1 : 0];

  return <Component ref={ref} {...props} />;
};

export const Combobox = forwardRef(ComboboxRender) as ComboboxComponent;
