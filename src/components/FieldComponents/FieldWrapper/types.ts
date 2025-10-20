import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { FieldPropSize, FieldPropStatus } from '../types';

type Counter = string | number | [string | number, string | number];

export type FieldWrapperProps = {
  children: React.ReactNode;
  size?: FieldPropSize;
  label?: string;
  labelIcon?: IconComponent;
  labelIconRef?: React.Ref<HTMLSpanElement>;
  labelPosition?: 'top' | 'left';
  labelHtmlFor?: string;
  caption?: string;
  required?: boolean;
  status?: FieldPropStatus;
  side?: React.ReactNode;
  counter?: Counter;
  counterStatus?: 'alert';
};
