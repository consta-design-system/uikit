import React from 'react';

import { IconComponent, IconPropSize } from '../../icons/Icon/Icon';
import { AutoCompete } from '../../utils/types/AutoComplete';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type TextFieldPropValue = string | null;
export type TextFieldPropName = string;
export type TextFieldPropId = string | number;

export const textFieldPropSize = ['m', 'xs', 's', 'l'] as const;
export type TextFieldPropSize = typeof textFieldPropSize[number];
export const textFieldPropSizeDefault: TextFieldPropSize = textFieldPropSize[0];

export type TextFieldPropOnChange = (args: TextFieldOnChangeArguments) => void;
export type TextFieldOnChangeArguments = {
  e: React.ChangeEvent | React.MouseEvent;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  value: TextFieldPropValue;
};

export const textFieldPropView = ['default', 'clear'] as const;
export type TextFieldPropView = typeof textFieldPropView[number];
export const textFieldPropViewDefault: TextFieldPropView = textFieldPropView[0];

export const textFieldPropForm = [
  'default',
  'defaultClear',
  'defaultBrick',
  'brick',
  'brickDefault',
  'brickClear',
  'brickRound',
  'round',
  'roundClear',
  'roundBrick',
  'clearRound',
  'clearDefault',
  'clearBrick',
  'clearClear',
] as const;
export type TextFieldPropForm = typeof textFieldPropForm[number];
export const textFieldPropFormDefault: TextFieldPropForm = textFieldPropForm[0];

export const textFieldPropStatus = ['alert', 'success', 'warning'] as const;
export type TextFieldPropStatus = typeof textFieldPropStatus[number];

export const textFieldPropWidth = ['default', 'full'] as const;
export type TextFieldPropWidth = typeof textFieldPropWidth[number];
export const textFieldPropWidthDefault: TextFieldPropWidth = textFieldPropWidth[0];

export type TextFieldPropsTextareaType<TYPE> = TYPE extends 'textarea'
  ?
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
  : {
      rows?: never;
      minRows?: never;
      maxRows?: never;
    };

export type TextFieldPropRightSide<TYPE> = TYPE extends 'number'
  ? {
      rightSide?: never;
    }
  : {
      rightSide?: string | IconComponent;
    };

export type TextFieldProps<TYPE extends string> = PropsWithHTMLAttributes<
  {
    className?: string;
    value?: TextFieldPropValue;
    cols?: number;
    onChange?: TextFieldPropOnChange;
    id?: TextFieldPropId;
    name?: TextFieldPropName;
    type?: TYPE;
    disabled?: boolean;
    maxLength?: number;
    size?: TextFieldPropSize;
    view?: TextFieldPropView;
    form?: TextFieldPropForm;
    state?: TextFieldPropStatus;
    status?: TextFieldPropStatus;
    width?: TextFieldPropWidth;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    autoFocus?: boolean;
    placeholder?: string;
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
    withClearButton?: boolean;
    autoComplete?: AutoCompete;
    max?: number | string;
    min?: number | string;
    readOnly?: boolean;
    required?: boolean;
    step?: number | string;
    tabIndex?: number;
    inputContainerRef?: React.Ref<HTMLDivElement>;
    inputRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    children?: never;
    label?: string;
    caption?: string;
    labelPosition?: 'top' | 'left';
    focused?: boolean;
  },
  HTMLDivElement
> &
  TextFieldPropsTextareaType<TYPE> &
  TextFieldPropRightSide<TYPE>;

// export type TextFieldProps<TYPE extends string> = PropsWithJsxAttributes<Props<TYPE>, 'div'>;

export type TextFieldComponent = <TYPE extends string>(
  props: TextFieldProps<TYPE> & React.RefAttributes<HTMLElement>,
) => React.ReactElement | null;

export const sizeMap: Record<TextFieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};
