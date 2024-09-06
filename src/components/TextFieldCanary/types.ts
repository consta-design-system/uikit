import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import {
  FieldPropForm,
  FieldPropSize,
  FieldPropStatus,
  FieldPropView,
} from '##/components/Field';
import { AutoCompete } from '##/utils/types/AutoComplete';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type TextFieldPropValue = string | null;
export type TextFieldPropName = string;
export type TextFieldPropId = string | number;

export type TextFieldPropSize = FieldPropSize;

export type TextFieldPropOnChange = (
  value: TextFieldPropValue,
  params: TextFieldOnChangeArguments,
) => void;
export type TextFieldOnChangeArguments = {
  e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
};

export type TextFieldPropView = FieldPropView;
export type TextFieldPropForm = FieldPropForm;
export type TextFieldPropStatus = FieldPropStatus;

type TextFieldPropsTypeTextarea<TYPE> = TYPE extends 'textarea'
  ? {
      cols?: number;
      resize?: boolean | 'auto';
    } & (
      | {
          minRows?: never;
          maxRows?: never;
          rows?: number;
        }
      | {
          rows?: never;
          minRows?: number;
          maxRows?: number;
        }
    )
  : {};

type TextFieldPropsTypeNumber<TYPE> = TYPE extends 'number'
  ? {
      max?: number | string;
      min?: number | string;
      step?: number | string | number[];
      incrementButtons?: boolean;
    }
  : {};

type InputRef<TYPE> = TYPE extends 'textarea'
  ? { inputRef?: React.Ref<HTMLTextAreaElement> }
  : { inputRef?: React.Ref<HTMLInputElement> };

export type TextFieldProps<TYPE extends string> = PropsWithHTMLAttributesAndRef<
  {
    className?: string;
    value?: TextFieldPropValue;
    defaultValue?: TextFieldPropValue;
    onChange?: TextFieldPropOnChange;
    id?: TextFieldPropId;
    name?: TextFieldPropName;
    type?: TYPE;
    disabled?: boolean;
    mixLength?: number;
    maxLength?: number;
    size?: TextFieldPropSize;
    view?: TextFieldPropView;
    form?: TextFieldPropForm;
    status?: TextFieldPropStatus;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    autoFocus?: boolean;
    placeholder?: string;
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
    withClearButton?: boolean;
    autoComplete?: AutoCompete;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    children?: never;
    onKeyDownCapture?: React.KeyboardEventHandler;
    onKeyPress?: React.KeyboardEventHandler;
    onKeyPressCapture?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    onKeyUpCapture?: React.KeyboardEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
  },
  HTMLDivElement
> &
  InputRef<TYPE> &
  TextFieldPropsTypeTextarea<TYPE> &
  TextFieldPropsTypeNumber<TYPE>;

export type TextFieldComponent = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;

export type TextFieldTypeComponent<TYPE extends string> = (
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;
