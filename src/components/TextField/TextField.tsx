import './TextField.css';

import React, { useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';
import { cn } from '../../utils/bem';
import { IIcon, IconPropSize } from '../../icons/Icon/Icon';

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
export type TextFieldPropType =
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
  | 'week'
  | 'password';
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

export type TextFieldProps = {
  className?: string;
  value?: TextFieldPropValue;
  onChange?: TextFieldPropOnChange;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  type?: TextFieldPropType;
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
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  autoFocus?: boolean;
  placeholder?: string;
  leftSide?: string | React.FC<IIcon>;
  rightSide?: string | React.FC<IIcon>;
  autoComplete?: TextFieldPropAutoComplete;
  max?: number | string;
  min?: number | string;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<any>;
  innerRef?: React.Ref<HTMLDivElement>;
};

export type ITextField = TextFieldProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof TextFieldProps>;

const cnTextField = cn('TextField');

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
    const value = e.target.value;
    !disabled && onChange && onChange({ e, id, name, value: value ? value : null });
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
    inputRef:
      inputRef === null
        ? undefined
        : (inputRef as
            | ((node: HTMLTextAreaElement) => void)
            | React.RefObject<HTMLTextAreaElement>),
  };

  const inputProps = {
    type,
    max,
    min,
    step,
    ref: inputRef,
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
        [className]
      )}
      ref={innerRef}
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
      <Input
        className={cnTextField('Input')}
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
        name={name}
        {...(textarea ? textareaProps : inputProps)}
      />
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
};
