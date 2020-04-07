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
};

declare type ISwitch<T = any> = SwitchProps<T> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof SwitchProps<T>>;

export const cnCheckbox = cn('Switch');

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
    ...otherProps
  } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange({ e, id, name, value, checked: !checked });
    }
  };

  return (
    <label className={cnCheckbox({ size, disabled }, [className])}>
      <input
        type="checkbox"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnCheckbox('Input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...otherProps}
      />
      {label && <span className={cnCheckbox('Label')}>{label}</span>}
    </label>
  );
}
