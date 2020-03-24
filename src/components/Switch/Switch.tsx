import './Switch.css';

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

export interface ISwitch {
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

const cnSwitch = cn('switch');

export const Switch: React.FC<ISwitch & InputProps> = ({
  value,
  checked,
  id,
  name,
  size,
  disabled,
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
    <label className={cnSwitch({ size, disabled }, [className])}>
      <input
        type="checkbox"
        id={id ? id.toString() : undefined}
        name={name}
        className={cnSwitch('input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...otherProps}
      />
      <div className={cnSwitch('box')} />
      {label && <span className={cnSwitch('label')}>{label}</span>}
    </label>
  );
};
