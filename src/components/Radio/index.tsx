import React from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('radio');

export type RadioProps = {
  value?: boolean;
  wpSize: 'm' | 'l';
  disabled?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>;

const Radio: React.FC<RadioProps> = ({
  value,
  id,
  name,
  wpSize,
  disabled,
  children,
  className,
  ...rest
}) => {
  return (
    <label className={b({ size: wpSize, disabled }, className || '')}>
      <input
        {...rest}
        type="radio"
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

export default Radio;
