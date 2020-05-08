import './Switch.css';

import React, { ChangeEventHandler } from 'react';
import { cn } from '../../utils/bem';

export type SwitchPropName = string;
export type SwitchPropChecked = boolean;
export type SwitchPropSize = 'm' | 'l';

export type SwitchProps = {
  checked?: SwitchPropChecked;
  size?: SwitchPropSize;
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: SwitchPropName;
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

declare type ISwitch = SwitchProps &
  Omit<React.InputHTMLAttributes<HTMLLabelElement>, keyof SwitchProps>;

export const cnSwitch = cn('Switch');

export function Switch(props: ISwitch): React.ReactElement | null {
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
    <label {...otherProps} className={cnSwitch({ size, disabled }, [className])} ref={innerRef}>
      <input
        type="checkbox"
        name={name}
        className={cnSwitch('Input')}
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
      {label && <span className={cnSwitch('Label')}>{label}</span>}
    </label>
  );
}
