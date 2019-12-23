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
  inputRef?: React.RefObject<HTMLInputElement>;
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
  inputRef,
  ...rest
}) => {
  return (
    <input
      {...rest}
      ref={inputRef}
      disabled={disabled}
      placeholder={placeholder}
      className={b({ view, width, size: wpSize, state, form, disabled }, className)}
    >
      {children}
    </input>
  );
};

type InputStubProps = {
  view?: InputProps['view'];
  width?: InputProps['width'];
  wpSize: WpSize;
  form?: InputProps['form'];
  state: InputProps['state'];
  disabled?: boolean;
  className?: string;
  inputRef?: React.RefObject<HTMLDivElement>;
};

export const InputStub: React.FC<InputStubProps> = ({
  view,
  width,
  wpSize,
  form,
  state,
  disabled,
  className,
  children,
  inputRef,
}) => {
  return (
    <div
      ref={inputRef}
      className={b({ view, width, size: wpSize, state, form, disabled }, className)}
    >
      {children}
    </div>
  );
};

export default Input;
