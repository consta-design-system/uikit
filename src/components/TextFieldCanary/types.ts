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

export type TextFieldPropValue<TYPE> = TYPE extends 'textArray'
  ? string[] | null
  : string | null;

export type TextFieldPropDafaultValue<TYPE> = TYPE extends 'textArray'
  ? never
  : string | null;

export type TextFieldPropName = string;
export type TextFieldPropId = string;

export type TextFieldPropSize = FieldPropSize;

export type TextFieldOnChangeArguments = {
  e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
};

export type TextFieldPropOnChange<TYPE> = (
  value: TextFieldPropValue<TYPE>,
  params: TextFieldOnChangeArguments,
) => void;

export type TextFieldPropView = FieldPropView;
export type TextFieldPropForm = FieldPropForm;
export type TextFieldPropStatus = FieldPropStatus;

type TextFieldPropsTypetextArea<TYPE> = TYPE extends 'textArea'
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

type TextFieldPropInputRef<TYPE> = TYPE extends 'textArea'
  ? React.Ref<HTMLTextAreaElement>
  : React.Ref<HTMLInputElement>;

export type TextFieldProps<TYPE extends string> = PropsWithHTMLAttributesAndRef<
  {
    className?: string;
    value?: TextFieldPropValue<TYPE>;
    defaultValue?: TextFieldPropDafaultValue<TYPE>;
    onChange?: TextFieldPropOnChange<TYPE>;
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
    onKeyUp?: React.KeyboardEventHandler;
    onKeyUpCapture?: React.KeyboardEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyDownCapture?: React.KeyboardEventHandler;
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
    inputRef?: TextFieldPropInputRef<TYPE>;
  },
  HTMLDivElement
> &
  TextFieldPropsTypetextArea<TYPE> &
  TextFieldPropsTypeNumber<TYPE>;

export type TextFieldComponent = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;

export type TextFieldTypeComponent<TYPE extends string> = (
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;
