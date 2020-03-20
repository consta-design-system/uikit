import './Button.css';
import React, { FocusEventHandler } from 'react';
import bem from '../../utils/bem';

const b = bem('button');

type CommonProps = {
  wpSize: 'xs' | 's' | 'm' | 'l';
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
  iconOnly?: boolean;
  withIcon?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  tabIndex?: number;
};

type ButtonProps = {
  isLink?: false;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
} & CommonProps;

type LinkProps = {
  isLink: true;
  href: string;
  target?: string;
  rel?: string;
} & CommonProps;

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  const { wpSize, view, width, form, iconOnly, withIcon, children, className } = props;

  if (props.isLink) {
    return (
      <a
        href={props.href}
        className={b(
          { size: wpSize, view, width, form, 'with-icon': withIcon, 'icon-only': iconOnly },
          className
        )}
        target={props.target}
        rel={props.rel}
        tabIndex={props.tabIndex}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={props.onClick}
      onBlur={props.onBlur}
      className={b(
        {
          size: wpSize,
          view,
          width,
          form,
          disabled: props.disabled,
          'with-icon': withIcon,
          'icon-only': iconOnly,
        },
        className
      )}
      type={props.type}
      disabled={props.disabled}
      tabIndex={props.tabIndex}
    >
      {children}
    </button>
  );
};

export default Button;
