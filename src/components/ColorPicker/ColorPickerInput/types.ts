import React from 'react';

import {
  FieldPropForm,
  FieldPropSize,
  FieldPropView,
} from '##/components/FieldComponents';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { ColorInputFormat, ColorModel, HsvaColor } from '../types';

export type ColorPickerInputProps<T> = PropsWithHTMLAttributesAndRef<
  {
    model: ColorModel<T>;
    value?: T;
    onChange?: (
      value: T,
      props: {
        e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
      },
    ) => void;
    size?: FieldPropSize;
    disabled?: boolean;
    format?: ColorInputFormat;
    alpha?: boolean;
    id?: string;
    view?: FieldPropView;
    name?: string;
    form?: FieldPropForm;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
  },
  HTMLDivElement
>;

export type ColorPickerInputComponent = <T>(
  props: ColorPickerInputProps<T>,
) => React.ReactElement;

export type ColorPickerInputPartPropOnChange = (
  value: HsvaColor,
  props: {
    e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
  },
) => void;
