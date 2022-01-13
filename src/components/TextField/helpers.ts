import React from 'react';

import { IconComponent, IconPropSize } from '../../icons/Icon/Icon';
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

export type TextFieldPropAutoComplete = 'on' | 'off';

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
    autoComplete?: TextFieldPropAutoComplete;
    max?: number | string;
    min?: number | string;
    readOnly?: boolean;
    required?: boolean;
    step?: number | string | number[];
    tabIndex?: number;
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

export const getValueByStepArray = (params: {
  event?: React.KeyboardEvent;
  value?: string | null;
  steps: number[];
  min?: number | string;
  max?: number | string;
  isIncrement?: boolean;
}): number | null => {
  const { event, value, steps, min, max, isIncrement } = params;
  const currentValue = Number(value || min);
  const minValue = Number(min);
  const maxValue = Number(max);
  let increment = !!isIncrement;
  let validKeyCode = false;
  if (event?.key === 'ArrowUp') {
    validKeyCode = true;
    increment = true;
  } else if (event?.key === 'ArrowDown') {
    increment = false;
    validKeyCode = true;
  }
  if (validKeyCode || typeof isIncrement === 'boolean') {
    if (typeof value !== 'string') {
      return typeof min !== 'undefined' ? minValue : 0;
    }
    const stepsArr = [...steps];
    // Для того чтобы правильно рассчитывалось при нажатии
    // кнопок стрелочек на самом инпуте
    const miniStep = typeof isIncrement === 'boolean' ? 0 : 1;
    if (typeof min !== 'undefined' && steps[0] !== minValue) {
      stepsArr.unshift(minValue);
    }
    if (typeof max !== 'undefined' && steps[steps.length - 1] !== maxValue) {
      stepsArr.push(maxValue);
    }
    if (currentValue < stepsArr[0]) {
      return stepsArr[0] + miniStep * (increment ? -1 : 1);
    }
    if (currentValue > stepsArr[stepsArr.length - 1]) {
      return stepsArr[stepsArr.length - 1] + miniStep * (increment ? -1 : 1);
    }
    if (
      (!increment && currentValue === stepsArr[0]) ||
      (increment && currentValue === stepsArr[stepsArr.length - 1])
    ) {
      return currentValue + miniStep * (increment ? -1 : 1);
    }
    for (let i = 0; i < stepsArr.length; i++) {
      if (
        currentValue === stepsArr[i] ||
        (stepsArr[i] < currentValue && stepsArr[i + 1] > currentValue)
      ) {
        if (increment) return stepsArr[i + 1] - miniStep;
        return stepsArr[i - 1] + miniStep;
      }
    }
    return null;
  }
  return null;
};
