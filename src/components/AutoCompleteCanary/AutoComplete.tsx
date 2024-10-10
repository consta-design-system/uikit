import React from 'react';

import { AutoCompleteTypeText } from './AutoCompleteTypeText';
import { AutoCompleteTypeTextArray } from './AutoCompleteTypeTextArray';
import {
  AutoCompleteComponent,
  AutoCompleteGroupDefault,
  AutoCompleteItemDefault,
  AutoCompleteProps,
  AutoCompleteTypeComponent,
} from './types';

const typeMap: Record<
  string,
  AutoCompleteTypeComponent<string> | AutoCompleteTypeComponent<'textarray'>
> = {
  text: AutoCompleteTypeText,
  textarray: AutoCompleteTypeTextArray,
};

const AutoCompleteRender = <
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<TYPE, ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = typeMap[props.type || 'text'] || typeMap.text;

  return (
    <Component
      ref={ref}
      {...(props as unknown as AutoCompleteTypeComponent<TYPE, ITEM, GROUP>)}
    />
  );
};

export const AutoComplete = React.forwardRef(
  AutoCompleteRender,
) as AutoCompleteComponent;

export * from './types';
