import './Checkbox.css';

import React from 'react';
import { cn } from '../../utils/bem';

export type PropName = string | undefined;
export type PropId = string | number | undefined;
export type PropValue = any;
export type PropChecked = boolean;
export type PropOnClickProps = {
  e: React.ChangeEvent<HTMLInputElement>;
  id?: PropId;
  name?: PropName;
  value?: PropValue;
  checked?: PropChecked;
};

export interface ICheckbox {
  value?: PropValue;
  checked?: boolean;
  size: 'm' | 'l';
  disabled?: boolean;
  intermediate?: boolean;
  className?: string;
  label?: string;
  onChange?: (object: PropOnClickProps) => void;
  id?: PropId;
  name?: PropName;
}

declare type excludeInputHTMLAttributes = 'value' | 'size';
declare type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  excludeInputHTMLAttributes
>;

const cnCheckbox = cn('checkbox');

export const Checkbox: React.FC<ICheckbox & InputProps> = ({
  value,
  checked,
  id,
  name,
  size,
  disabled,
  intermediate,
  className,
  label,
  onChange,
  ...otherProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange({ e, id, name, value, checked: !checked });
    }
  };

  return (
    <label className={cnCheckbox({ size, disabled, intermediate }, [className])}>
      <input
        type="checkbox"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnCheckbox('input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...otherProps}
      />
      <div className={cnCheckbox('box')} />
      {label && <span className={cnCheckbox('text')}>{label}</span>}
    </label>
  );
};

export default Checkbox;
