import './Checkbox.css';

import React from 'react';
import { cn } from '../../utils/bem';

export type CheckboxPropName = string;
export type CheckboxPropId = string | number;
export type CheckboxPropValue<T = any> = T | null;
export type CheckboxPropChecked = boolean;
export type CheckboxPropIntermediate = boolean;
export type CheckboxPropSize = 'm' | 'l';
export type CheckboxOnChangeArguments<T = any> = {
  e: React.ChangeEvent<HTMLInputElement>;
  id?: CheckboxPropId;
  name?: CheckboxPropName;
  value: CheckboxPropValue<T>;
  checked: CheckboxPropChecked;
  intermediate: CheckboxPropIntermediate;
};

export type CheckboxProps<T = any> = {
  value?: CheckboxPropValue<T>;
  checked?: CheckboxPropChecked;
  size?: CheckboxPropSize;
  disabled?: boolean;
  intermediate?: CheckboxPropIntermediate;
  className?: string;
  label?: string;
  onChange?: (object: CheckboxOnChangeArguments<T>) => void;
  id?: CheckboxPropId;
  name?: CheckboxPropName;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<any>;
  innerRef?: React.Ref<any>;
};

declare type ICheckbox<T = any> = CheckboxProps<T> &
  Omit<React.HTMLAttributes<Element>, keyof CheckboxProps<T>>;

export const cnCheckbox = cn('Checkbox');

export function Checkbox<T = any>(props: ICheckbox<T>): React.ReactElement | null {
  const {
    value = null,
    checked = false,
    id,
    name,
    size = 'm',
    disabled,
    intermediate = false,
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
      onChange({ e, id, name, value, checked: !checked, intermediate });
    }
  };

  return (
    <label
      {...otherProps}
      ref={innerRef}
      className={cnCheckbox({ size, disabled, intermediate }, [className])}
    >
      <input
        type="checkbox"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnCheckbox('Input')}
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
      {label && <span className={cnCheckbox('Label')}>{label}</span>}
    </label>
  );
}
