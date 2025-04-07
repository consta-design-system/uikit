import React from 'react';

import { cnCanary } from '##/utils/bem';

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

export const cnAutoComplete = cnCanary('AutoComplete');

const AutoCompleteRender = <
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<TYPE, ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const type = props.type || 'text';
  const Component = typeMap[type] || typeMap.text;

  return (
    <Component
      {...(props as unknown as AutoCompleteTypeComponent<TYPE, ITEM, GROUP>)}
      ref={ref}
      className={cnAutoComplete({ type }, [props.className])}
    />
  );
};

export const AutoComplete = React.forwardRef(
  AutoCompleteRender,
) as AutoCompleteComponent;

export * from './types';
