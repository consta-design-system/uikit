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

export type TextFieldPropDafaultValue<TYPE> = TYPE extends 'textarray'
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

type TextFieldPropInputRef<TYPE> = TYPE extends 'textarea'
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
    view?: FieldPropView;
    form?: FieldPropForm;
    status?: FieldPropStatus;
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
    onCopy?: React.ClipboardEventHandler<InputType<TYPE>>;
    onCopyCapture?: React.ClipboardEventHandler<InputType<TYPE>>;
    onCut?: React.ClipboardEventHandler<InputType<TYPE>>;
    onCutCapture?: React.ClipboardEventHandler<InputType<TYPE>>;
    onPaste?: React.ClipboardEventHandler<InputType<TYPE>>;
    onPasteCapture?: React.ClipboardEventHandler<InputType<TYPE>>;
  },
  HTMLDivElement
> &
  TextFieldPropsTypeTextArea<TYPE> &
  TextFieldPropsTypeTextArray<TYPE> &
  TextFieldPropsTypeNumber<TYPE>;

export type TextFieldComponent = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;

export type TextFieldTypeComponent<TYPE extends string> = (
  props: TextFieldProps<TYPE>,
) => React.ReactElement | null;
