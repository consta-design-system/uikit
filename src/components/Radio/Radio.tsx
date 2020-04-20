import './Radio.css';

import React from 'react';
import { cn } from '../../utils/bem';

export type RadioPropName = string;
export type RadioPropId = string | number;
export type RadioPropValue<T = any> = T | null;
export type RadioPropChecked = boolean;
export type RadioPropIntermediate = boolean;
export type RadioPropSize = 'm' | 'l';
export type RadioOnChangeArguments<T = any> = {
  e: React.ChangeEvent<HTMLInputElement>;
  id?: RadioPropId;
  name?: RadioPropName;
  value: RadioPropValue<T>;
  checked: RadioPropChecked;
};

export type RadioProps<T = any> = {
  value?: RadioPropValue<T>;
  checked?: RadioPropChecked;
  size?: RadioPropSize;
  disabled?: boolean;
  intermediate?: RadioPropIntermediate;
  className?: string;
  label?: string;
  onChange?: (object: RadioOnChangeArguments<T>) => void;
  id?: RadioPropId;
  name?: RadioPropName;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  innerRef?: React.Ref<HTMLLabelElement>;
};

declare type IRadio<T = any> = RadioProps<T> &
  Omit<React.InputHTMLAttributes<HTMLLabelElement>, keyof RadioProps<T>>;

export const cnRadio = cn('Radio');

export function Radio<T = any>(props: IRadio<T>): React.ReactElement | null {
  const {
    value = null,
    checked = false,
    id,
    name,
    size = 'm',
    disabled,
    className,
    label,
    onChange,
    onFocus,
    onBlur,
    readOnly,
    required,
    step,
    tabIndex,
    inputRef,
    innerRef,
    ...otherProps
  } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange({ e, id, name, value, checked: !checked });
    }
  };

  return (
    <label {...otherProps} className={cnRadio({ size, disabled }, [className])} ref={innerRef}>
      <input
        type="radio"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnRadio('Input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        required={required}
        step={step}
        tabIndex={tabIndex}
        ref={inputRef}
      />
      {label && <span className={cnRadio('Label')}>{label}</span>}
    </label>
  );
}
