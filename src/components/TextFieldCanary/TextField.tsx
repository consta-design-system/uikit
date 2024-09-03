import './TextField.css';

import React, { forwardRef } from 'react';

import { TextFieldTypeText } from './TextFieldTypeText';
import { TextFieldTypeTextArea } from './TextFieldTypeTextArea';
import {
  TextFieldComponent,
  TextFieldProps,
  TextFieldTypeComponent,
} from './types';

const typeMap: Record<
  string,
  TextFieldTypeComponent<'text'> | TextFieldTypeComponent<'textarea'>
> = {
  text: TextFieldTypeText,
  textarea: TextFieldTypeTextArea,
};

const TextFieldRender = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = typeMap[props.type || 'text'] || typeMap.text;

  return <Component ref={ref} {...(props as TextFieldTypeComponent<TYPE>)} />;
};

export const TextField = forwardRef(TextFieldRender) as TextFieldComponent;
