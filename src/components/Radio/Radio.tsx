import './Radio.css';

import React, { ChangeEventHandler } from 'react';
import { cn } from '../../utils/bem';

export type RadioPropName = string;
export type RadioPropChecked = boolean;
export type RadioPropIntermediate = boolean;
export type RadioPropSize = 'm' | 'l';

export type RadioProps = {
  checked?: RadioPropChecked;
  size?: RadioPropSize;
  disabled?: boolean;
  intermediate?: RadioPropIntermediate;
  className?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: RadioPropName;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  innerRef?: React.Ref<HTMLLabelElement>;
};

declare type IRadio = RadioProps &
  Omit<React.InputHTMLAttributes<HTMLLabelElement>, keyof RadioProps>;

export const cnRadio = cn('Radio');

export function Radio(props: IRadio): React.ReactElement | null {
  const {
    checked = false,
    name,
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
    innerRef,
    ...otherProps
  } = props;

  return (
    <label {...otherProps} className={cnRadio({ size, disabled }, [className])} ref={innerRef}>
      <input
        type="radio"
        name={name}
        className={cnRadio('Input')}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        required={required}
        step={step}
        tabIndex={tabIndex}
        ref={inputRef}
      />
      {label && <span className={cnRadio('Label')}>{label}</span>}
    </label>
  );
}
