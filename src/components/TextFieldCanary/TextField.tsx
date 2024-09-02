import './TextField.css';

import React, { forwardRef } from 'react';

import { TextFieldTypeText } from './TextFieldTypeText';
import {
  TextFieldComponent,
  TextFieldProps,
  TextFieldTypeComponent,
} from './types';

const typeMap: Record<string, TextFieldTypeComponent<'text'>> = {
  text: TextFieldTypeText,
};

const TextFieldRender = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = typeMap[props.type || 'text'];

  return <Component ref={ref} {...(props as TextFieldTypeComponent<TYPE>)} />;
};

export const TextField = forwardRef(TextFieldRender) as TextFieldComponent;
