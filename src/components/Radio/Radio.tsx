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
};

declare type IRadio<T = any> = RadioProps<T> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof RadioProps<T>>;

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
    ...otherProps
  } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange({ e, id, name, value, checked: !checked });
    }
  };

  return (
    <label className={cnRadio({ size, disabled }, [className])}>
      <input
        type="radio"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnRadio('Input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...otherProps}
      />
      {label && <span className={cnRadio('Label')}>{label}</span>}
    </label>
  );
}
