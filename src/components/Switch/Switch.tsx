import './Switch.css';

import React from 'react';
import { cn } from '../../utils/bem';

export type SwitchPropName = string;
export type SwitchPropId = string | number;
export type SwitchPropValue<T = any> = T | null;
export type SwitchPropChecked = boolean;
export type SwitchPropSize = 'm' | 'l';
export type SwitchOnChangeArguments<T = any> = {
  e: React.ChangeEvent<HTMLInputElement>;
  id?: SwitchPropId;
  name?: SwitchPropName;
  value: SwitchPropValue<T>;
  checked: SwitchPropChecked;
};

export type SwitchProps<T = any> = {
  value?: SwitchPropValue<T>;
  checked?: SwitchPropChecked;
  size?: SwitchPropSize;
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange?: (object: SwitchOnChangeArguments<T>) => void;
  id?: SwitchPropId;
  name?: SwitchPropName;
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

declare type ISwitch<T = any> = SwitchProps<T> &
  Omit<React.InputHTMLAttributes<HTMLLabelElement>, keyof SwitchProps<T>>;

export const cnSwitch = cn('Switch');

export function Switch<T = any>(props: ISwitch<T>): React.ReactElement | null {
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
    <label {...otherProps} className={cnSwitch({ size, disabled }, [className])} ref={innerRef}>
      <input
        type="checkbox"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnSwitch('Input')}
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
      {label && <span className={cnSwitch('Label')}>{label}</span>}
    </label>
  );
}
