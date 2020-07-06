import './TextField.css';

import React, { FocusEvent, useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type TextFieldPropValue = string | null;
export type TextFieldPropName = string;
export type TextFieldPropId = string | number;
export type TextFieldPropSize = 'xs' | 's' | 'm' | 'l';
export type TextFieldPropOnChange = (args: TextFieldOnChangeArguments) => void;
export type TextFieldOnChangeArguments = {
  e: React.ChangeEvent;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  value: TextFieldPropValue;
};
export type TextFieldPropView = 'default' | 'clear';
export type TextFieldPropForm =
  | 'default'
  | 'brick'
  | 'round'
  | 'clear'
  | 'clearRound'
  | 'roundClear'
  | 'clearDefault'
  | 'defaultClear'
  | 'defaultBrick'
  | 'brickDefault'
  | 'brickClear'
  | 'clearBrick'
  | 'clearClear';
export type TextFieldPropState = 'alert' | 'success' | 'warning';
export type TextFieldPropWidth = 'full' | 'default';
export type TextFieldPropAutoComplete = 'on' | 'off';

type Props = {
  className?: string;
  value?: TextFieldPropValue;
  onChange?: TextFieldPropOnChange;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  type?: string;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  size?: TextFieldPropSize;
  view?: TextFieldPropView;
  form?: TextFieldPropForm;
  state?: TextFieldPropState;
  width?: TextFieldPropWidth;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  autoFocus?: boolean;
  placeholder?: string;
  leftSide?: string | React.FC<IconProps>;
  rightSide?: string | React.FC<IconProps>;
  autoComplete?: TextFieldPropAutoComplete;
  max?: number | string;
  min?: number | string;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
  ariaLabel?: string;
  children?: never;
};

export type TextFieldProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

const cnTextField = cn('TextField');

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const {
    className,
    type = 'text',
    value,
    onChange,
    id,
    name,
    rows,
    cols,
    minRows,
    maxRows,
    inputRef,
    maxLength,
    disabled,
    size = 'm',
    view = 'default',
    form = 'default',
    state,
    width,
    onBlur,
    onFocus,
    autoFocus = false,
    placeholder,
    leftSide,
    rightSide,
    autoComplete,
    max,
    min,
    readOnly,
    required,
    step,
    tabIndex,
    ariaLabel,
    ...otherProps
  } = props;
  const [focus, setFocus] = useState<boolean>(autoFocus);
  const textarea = type === 'textarea';
  const LeftIcon = leftSide;
  const RightIcon = rightSide;
  const leftSideIsString = typeof leftSide === 'string';
  const rightSideIsString = typeof rightSide === 'string';

  const getIconSizeByTextFieldSize = (textFieldSize: TextFieldPropSize): IconPropSize => {
    const sizeObj: Record<TextFieldPropSize, IconPropSize> = {
      xs: 'xs',
      s: 's',
      m: 's',
      l: 'm',
    };

    return sizeObj[textFieldSize];
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    !disabled && onChange && onChange({ e, id, name, value: value || null });
  };

  const handleBlur = (e: FocusEvent) => {
    setFocus(false);
    onBlur && onBlur(e);
  };

  const handleFocus = (e: FocusEvent) => {
    setFocus(true);
    onFocus && onFocus(e);
  };

  const commonProps = {
    'className': cnTextField('Input'),
    'value': value || '',
    'onChange': handleChange,
    maxLength,
    disabled,
    'onBlur': handleBlur,
    'onFocus': handleFocus,
    autoFocus,
    placeholder,
    autoComplete,
    readOnly,
    required,
    tabIndex,
    name,
    'id': id ? id.toString() : '',
    'aria-label': ariaLabel,
  };

  const textareaProps = {
    rows,
    cols,
    minRows,
    maxRows,
    inputRef:
      inputRef === null
        ? undefined
        : (inputRef as (node: HTMLTextAreaElement) => void | React.RefObject<HTMLTextAreaElement>),
  };

  const inputProps = {
    type,
    max,
    min,
    step,
    ref: inputRef as React.Ref<HTMLInputElement>,
  };

  return (
    <div
      className={cnTextField(
        {
          size,
          view,
          form,
          state,
          disabled,
          width,
          type,
          focus,
          withValue: !!value,
        },
        [className],
      )}
      ref={ref}
      {...otherProps}
    >
      {LeftIcon && (
        <div
          className={cnTextField('Side', {
            position: 'left',
            type: leftSideIsString ? 'string' : 'icon',
          })}
        >
          {leftSideIsString ? (
            leftSide
          ) : (
            <LeftIcon className={cnTextField('Icon')} size={getIconSizeByTextFieldSize(size)} />
          )}
        </div>
      )}
      {textarea ? (
        <TextAreaAutoSize {...commonProps} {...textareaProps} />
      ) : (
        <input {...commonProps} {...inputProps} />
      )}
      {RightIcon && (
        <div
          className={cnTextField('Side', {
            position: 'right',
            type: rightSideIsString ? 'string' : 'icon',
          })}
        >
          {rightSideIsString ? (
            rightSide
          ) : (
            <RightIcon className={cnTextField('Icon')} size={getIconSizeByTextFieldSize(size)} />
          )}
        </div>
      )}
    </div>
  );
});
