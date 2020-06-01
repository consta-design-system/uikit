import './Radio.css';

import React, { ChangeEventHandler } from 'react';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type RadioPropSize = 'm' | 'l';
export type RadioPropOnChangeArguments = {
  e: React.ChangeEvent<HTMLInputElement>;
  name: string;
  value: string;
  checked: boolean;
};

export type RadioPropOnChange = (object: RadioPropOnChangeArguments) => void;

export type Props = {
  checked: boolean | undefined;
  size?: RadioPropSize;
  disabled?: boolean;
  intermediate?: boolean;
  className?: string;
  label?: string;
  onChange?: RadioPropOnChange;
  name: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  ariaLabel?: string;
  id?: string;
  value?: string;
};

export type RadioProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const cnRadio = cn('Radio');

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  const {
    checked = false,
    name,
    value = '',
    size = 'm',
    disabled,
    className,
    label,
    onChange,
    onFocus,
    onBlur,
    readOnly,
    required,
    step,
    tabIndex,
    inputRef,
    id,
    ariaLabel,
    ...otherProps
  } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange({ value, name, e, checked: !checked });
  };

  return (
    <label {...otherProps} className={cnRadio({ size, disabled }, [className])} ref={ref}>
      <input
        type="radio"
        name={name}
        className={cnRadio('Input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        required={required}
        step={step}
        tabIndex={tabIndex}
        id={id}
        value={value}
        aria-label={ariaLabel}
        ref={inputRef}
      />
      {label && <span className={cnRadio('Label')}>{label}</span>}
    </label>
  );
});
