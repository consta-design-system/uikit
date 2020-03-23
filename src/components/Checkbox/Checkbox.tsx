import React from 'react';
// import { cn } from '../../utils/bem';
import bem from '../../utils/bem';

import './Checkbox.css';

const b = bem('checkbox');

export type CheckboxProps = {
  value?: boolean;
  wpSize: 'm' | 'l';
  disabled?: boolean;
  intermediate?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>;

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  id,
  name,
  wpSize,
  disabled,
  intermediate,
  className,
  children,
  ...rest
}) => {
  return (
    <label className={b({ size: wpSize, disabled, intermediate }, className || '')}>
      <input
        {...rest}
        type="checkbox"
        id={id}
        name={name}
        className={b('input')}
        checked={value}
        disabled={disabled}
      />
      <div className={b('box')} />
      <span className={b('text')}>{children}</span>
    </label>
  );
};

export default Checkbox;
