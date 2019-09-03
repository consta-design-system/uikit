import React from 'react';
import bem from '../../utils/bem';
import '../Input/styles.css';
import { WpSize } from '../types';

const b = bem('input');

export type TextareaProps = {
  placeholder?: string;
  view?: 'default';
  width?: 'full' | 'default';
  wpSize?: WpSize;
  form?: 'default' | 'brick' | 'round';
  state?: '' | 'alert' | 'success' | 'warning';
  disabled?: boolean;
  className?: string;
  value?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  view,
  width,
  wpSize,
  state,
  className,
  value,
  disabled,
  children,
  ...rest
}) => {
  return (
    <textarea
      {...rest}
      disabled={disabled}
      placeholder={placeholder}
      className={b(
        { view, width, size: wpSize, state, disabled, type: 'textarea' },
        className || '',
      )}
      value={value}
    >
      {children}
    </textarea>
  );
};

export default Textarea;
