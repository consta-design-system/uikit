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
  e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
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
    step?: number | string | number[];
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

export type TextFieldComponent = <TYPE extends string>(
  props: TextFieldProps<TYPE> & React.RefAttributes<HTMLElement>,
) => React.ReactElement | null;

export const sizeMap: Record<TextFieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

export const getValueByStepArray = (params: {
  value?: string | null;
  steps: number[];
  min?: number | string;
  max?: number | string;
  isIncrement?: boolean;
}): number | null => {
  const { value, steps, min, isIncrement = false } = params;
  const currentValue = Number(value ?? min);
  const minValue = Number(min);
  if (typeof value !== 'string') {
    return typeof min !== 'undefined' ? minValue : 0;
  }
  if (currentValue < steps[0]) {
    return steps[0];
  }
  if (currentValue > steps[steps.length - 1]) {
    return steps[steps.length - 1];
  }
  if (
    (!isIncrement && currentValue === steps[0]) ||
    (isIncrement && currentValue === steps[steps.length - 1])
  ) {
    return currentValue;
  }
  for (let i = 0; i < steps.length; i++) {
    if (currentValue === steps[i] || (steps[i] < currentValue && steps[i + 1] > currentValue)) {
      return steps[i + (isIncrement ? 1 : -1)];
    }
  }
  return null;
};

export const getValueByStepNumber = (params: {
  value?: string | null;
  step: number | string;
  isIncrement?: boolean;
  min?: number | string;
  max?: number | string;
}): string => {
  const { value, step, isIncrement, max, min } = params;
  const minValue = Number(min);
  const maxValue = Number(max);
  const currentValue: number =
    (typeof value === 'string' ? Number(value) : 0) + Number(step) * (isIncrement ? 1 : -1);
  if (!Number.isNaN(minValue) && currentValue <= minValue) {
    return minValue.toString();
  }
  if (!Number.isNaN(maxValue) && currentValue >= maxValue) {
    return maxValue.toString();
  }
  return currentValue.toFixed(
    Number(
      /* Необходимо для того, чтобы избежать ситуации, когда по нажатию
на кнопку прибавляется число с погрешностью.
Здесь мы берем разрядность дробной части шага и ограничиваем
результирующее число этой разрядностью */
      Number(step)
        .toString()
        .split('.')[1]?.length,
    ) || 0,
  );
};

export const getIncrementFlag = (event: React.KeyboardEvent): boolean | null => {
  if (event?.key !== 'ArrowUp' && event?.key !== 'ArrowDown') {
    return null;
  }
  return event?.key === 'ArrowUp';
};
