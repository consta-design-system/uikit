import React from 'react';
import { cn } from '../../utils/bem';

import './Radio.css';

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

export interface IRadio {
  value?: PropValue;
  checked?: boolean;
  size: 'm' | 'l';
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange?: (object: PropOnClickProps) => void;
  id?: PropId;
  name?: PropName;
}

declare type excludeInputHTMLAttributes =
  | 'value'
  | 'size'
  | 'checked'
  | 'disabled'
  | 'className'
  | 'label'
  | 'onChange'
  | 'id'
  | 'name';
declare type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  excludeInputHTMLAttributes
>;

const cnRadio = cn('radio');

export const Radio: React.FC<IRadio & InputProps> = ({
  value,
  id,
  name,
  size,
  disabled,
  label,
  className,
  checked,
  onChange,
  ...otherProps
}) => {
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
        onChange={handleChange}
        className={cnRadio('input')}
        checked={checked}
        disabled={disabled}
        {...otherProps}
      />
      <div className={cnRadio('box')} />
      {label && <span className={cnRadio('label')}>{label}</span>}
    </label>
  );
};
