import React from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('switch');

export type SwitchProps = {
  value?: boolean;
  wpSize: 'm' | 'l';
  disabled?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>;

const Switch: React.FC<SwitchProps> = ({
  value,
  id,
  name,
  wpSize,
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <label className={b({ size: wpSize, disabled }, className || '')}>
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

export default Switch;
