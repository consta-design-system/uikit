import React from 'react';
import bem from '../../utils/bem';

import './styles.css';
import { WpSize } from '../types';

const b = bem('input');

export type InputProps = {
  value?: string;
  placeholder?: string;
  type?: string;
  view?: 'default';
  width?: 'full' | 'default';
  wpSize: WpSize;
  form?:
    | 'default'
    | 'brick'
    | 'round'
    | 'clear'
    | 'clear-round'
    | 'round-clear'
    | 'clear-default'
    | 'default-clear'
    | 'default-brick'
    | 'brick-default'
    | 'brick-clear'
    | 'clear-brick'
    | 'clear-clear';
  state?: '' | 'alert' | 'success' | 'warning';
  disabled?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'width' | 'form'>;

const Input: React.FC<InputProps> = ({
  placeholder,
  view,
  width,
  wpSize,
  form,
  state,
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <input
      {...rest}
      disabled={disabled}
      placeholder={placeholder}
      className={b({ view, width, size: wpSize, state, form, disabled }, className)}
    >
      {children}
    </input>
  );
};

export default Input;
