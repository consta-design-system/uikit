import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import {
  FieldPropForm,
  FieldPropSize,
  FieldPropStatus,
  FieldPropView,
} from '##/components/FieldComponents';
import { AutoCompete } from '##/utils/types/AutoComplete';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type TextFieldPropValue<TYPE> = TYPE extends 'textarray'
  ? string[] | null
  : string | null;

export type TextFieldPropDefaultValue<TYPE> = TYPE extends 'textarray'
  ? never
  : string | null;

export type TextFieldPropSize = FieldPropSize;

export type TextFieldPropOnChange<TYPE> = (
  value: TextFieldPropValue<TYPE>,
  params: {
    e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
  },
) => void;

type InputType<TYPE extends string> = TYPE extends 'textarea'
  ? HTMLTextAreaElement
  : HTMLInputElement;

type TextFieldPropsTypeTextArea<TYPE> = TYPE extends 'textarea'
  ? {
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

export type TextFieldPropRenderValueItem = (props: {
  item: string;
  index: number;
  onRemove: (e: React.MouseEvent) => void;
  size: FieldPropSize;
  disabled: boolean | undefined;
}) => React.ReactNode;

type TextFieldPropsTypeTextArray<TYPE> = TYPE extends 'textarray'
  ? {
      renderValueItem?: TextFieldPropRenderValueItem;
      inputValue?: string | null;
      onInputChange?: TextFieldPropOnChange<string>;
    }
  : {};

type TextFieldPropsTypeNumber<TYPE> = TYPE extends 'number'
  ? {
      max?: number | string;
      min?: number | string;
      step?: number | string | number[];
      incrementButtons?: boolean;
    }
  : {};

type TextFieldPropsTypePassword<TYPE> = TYPE extends 'password'
  ? {
      iconShowPassword?: IconComponent;
      iconHidePassword?: IconComponent;
    }
  : {};

export type TextFieldProps<TYPE extends string> = PropsWithHTMLAttributesAndRef<
  {
    className?: string;
    value?: TextFieldPropValue<TYPE>;
    defaultValue?: TextFieldPropDefaultValue<TYPE>;
    onChange?: TextFieldPropOnChange<TYPE>;
    id?: string;
    name?: string;
    type?: TYPE;
    disabled?: boolean;
    mixLength?: number;
    maxLength?: number;
    size?: TextFieldPropSize;
    view?: FieldPropView;
    form?: FieldPropForm;
    status?: FieldPropStatus;
    onFocus?: React.FocusEventHandler<InputType<TYPE>>;
    onBlur?: React.FocusEventHandler<InputType<TYPE>>;
    autoFocus?: boolean;
    placeholder?: string;
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
    clearButton?: boolean;
    iconClear?: IconComponent;
    autoComplete?: AutoCompete;
    readOnly?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    children?: never;
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
    inputRef?: React.Ref<InputType<TYPE>>;
    onKeyUp?: React.KeyboardEventHandler<InputType<TYPE>>;
    onKeyUpCapture?: React.KeyboardEventHandler<InputType<TYPE>>;
    onKeyDown?: React.KeyboardEventHandler<InputType<TYPE>>;
    onKeyDownCapture?: React.KeyboardEventHandler<InputType<TYPE>>;
    onCopy?: React.ClipboardEventHandler<InputType<TYPE>>;
    onCopyCapture?: React.ClipboardEventHandler<InputType<TYPE>>;
    onCut?: React.ClipboardEventHandler<InputType<TYPE>>;
    onCutCapture?: React.ClipboardEventHandler<InputType<TYPE>>;
    onPaste?: React.ClipboardEventHandler<InputType<TYPE>>;
    onPasteCapture?: React.ClipboardEventHandler<InputType<TYPE>>;
    onWheel?: React.WheelEventHandler<InputType<TYPE>>;
  },
  HTMLDivElement
> &
  TextFieldPropsTypeTextArea<TYPE> &
  TextFieldPropsTypeTextArray<TYPE> &
  TextFieldPropsTypeNumber<TYPE> &
  TextFieldPropsTypePassword<TYPE>;

export type TextFieldComponent = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;

export type TextFieldTypeComponent<TYPE extends string> = (
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;
