import './TextField.css';

import React, { useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';
import { cn } from '../../utils/bem';
import { IIconProps, PropSize as IconPropSize } from '../Icon';

export type PropValue = string | null;
export type PropName = string;
export type PropId = string | number;
export type PropSize = 'xs' | 's' | 'm' | 'l';
export type PropOnChange = (args: PropOnChangeFunctionArgs) => void;

export type PropOnChangeFunctionArgs = {
  e: React.ChangeEvent;
  id?: PropId;
  name?: PropName;
  value?: PropValue;
};

export type TextFieldProps = {
  className?: string;
  value?: PropValue;
  onChange?: PropOnChange;
  id?: PropId;
  name?: PropName;
  type?:
    | 'text'
    | 'textarea'
    | 'color'
    | 'email'
    | 'number'
    | 'search'
    | 'tel'
    | 'date'
    | 'time'
    | 'datetime'
    | 'datetime-local'
    | 'url'
    | 'month'
    | 'week';
  disabled?: boolean;
  innerRef?: (node: HTMLDivElement) => void;
  inputRef?: (node: HTMLTextAreaElement | HTMLInputElement) => void;
  rows?: number;
  cols?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  size?: PropSize;
  view?: 'default';
  form?:
    | 'default'
    | 'brick'
    | 'round'
    | 'clear'
    | 'clear-round'
    | 'round-clear'
    | 'clear-default'
    | 'default-clear'
    | 'default-brick'
    | 'brick-default'
    | 'brick-clear'
    | 'clear-brick'
    | 'clear-clear';
  state?: 'alert' | 'success' | 'warning' | '';
  width?: 'full' | 'default';
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  autoFocus?: boolean;
  placeholder?: string;
  leftSide?: string | React.FC<IIconProps>;
  rightSide?: string | React.FC<IIconProps>;
  autoComplete?: 'on' | 'off';
  max?: number | string;
  min?: number | string;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
};

export type ITextField = TextFieldProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof TextFieldProps>;

const cnTextField = cn('text-field');

export const TextField: React.FC<ITextField> = ({
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
  innerRef,
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
  ...otherProps
}) => {
  const [focus, setFocus] = useState<boolean>(autoFocus);
  const textarea = type === 'textarea';
  const Input = textarea ? TextAreaAutoSize : 'input';
  const LeftIcon = leftSide;
  const RightIcon = rightSide;
  const leftSideIsString = typeof leftSide === 'string';
  const rightSideIsString = typeof rightSide === 'string';

  const getIconSizeByTextFieldSize = (textFieldSize: PropSize): IconPropSize => {
    const sizeObj: Record<PropSize, IconPropSize> = {
      xs: 'xs',
      s: 's',
      m: 's',
      l: 's',
    };

    return sizeObj[textFieldSize];
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    !disabled && onChange && onChange({ e, id, name, value: value ? value : null });
  };

  const getRef = (func) => (el) => {
    if (el && func) {
      func(el);
    }
  };

  const handleBlur = (e) => {
    setFocus(false);
    onBlur && onBlur(e);
  };

  const handleFocus = (e) => {
    setFocus(true);
    onFocus && onFocus(e);
  };

  const textareaProps = {
    rows,
    cols,
    minRows,
    maxRows,
    inputRef,
  };

  const inputProps = {
    ref: getRef(inputRef),
    type,
    max,
    min,
    step,
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
          'with-value': !!value,
        },
        [className]
      )}
      ref={getRef(innerRef)}
      {...otherProps}
    >
      {LeftIcon && (
        <div
          className={cnTextField('side', {
            position: 'left',
            type: leftSideIsString ? 'string' : 'icon',
          })}
        >
          {leftSideIsString ? (
            leftSide
          ) : (
            <LeftIcon className={cnTextField('icon')} size={getIconSizeByTextFieldSize(size)} />
          )}
        </div>
      )}
      <Input
        className={cnTextField('input')}
        value={value || ''}
        onChange={handleChange}
        maxLength={maxLength}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        autoFocus={autoFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
        required={required}
        tabIndex={tabIndex}
        {...(textarea ? textareaProps : inputProps)}
      />
      {RightIcon && (
        <div
          className={cnTextField('side', {
            position: 'right',
            type: rightSideIsString ? 'string' : 'icon',
          })}
        >
          {rightSideIsString ? (
            rightSide
          ) : (
            <RightIcon className={cnTextField('icon')} size={getIconSizeByTextFieldSize(size)} />
          )}
        </div>
      )}
    </div>
  );
};
