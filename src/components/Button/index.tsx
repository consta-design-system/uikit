import React, { FocusEventHandler } from 'react';
import bem from '../../utils/bem';

import './Button.css';
import { WpSize } from '../types';

const b = bem('button');

type Props = {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  wpSize: WpSize;
  view: 'clear' | 'ghost' | 'primary' | 'secondary';
  width?: 'auto' | 'full';
  form?:
    | 'default'
    | 'brick'
    | 'round'
    | 'brick-round'
    | 'round-brick'
    | 'brick-default'
    | 'default-brick';
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  tabIndex?: number;
};

const Button: React.FC<Props> = ({
  type,
  disabled,
  wpSize,
  view,
  width,
  form,
  onClick,
  onBlur,
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={b({ size: wpSize, view, width, form, disabled }, className)}
      onClick={onClick}
      onBlur={onBlur}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
