import './Checkbox.css';

import React, { ChangeEventHandler } from 'react';
import { cn } from '../../utils/bem';

export type CheckboxPropName = string;
export type CheckboxPropChecked = boolean;
export type CheckboxPropIntermediate = boolean;
export type CheckboxPropSize = 'm' | 'l';

export type CheckboxProps = {
  checked?: CheckboxPropChecked;
  size?: CheckboxPropSize;
  disabled?: boolean;
  intermediate?: CheckboxPropIntermediate;
  className?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: CheckboxPropName;
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

declare type ICheckbox = CheckboxProps &
  Omit<React.HTMLAttributes<HTMLLabelElement>, keyof CheckboxProps>;

export const cnCheckbox = cn('Checkbox');

export function Checkbox(props: ICheckbox): React.ReactElement | null {
  const {
    checked = false,
    id,
    name,
    size = 'm',
    disabled,
    intermediate = false,
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
    <label
      {...otherProps}
      className={cnCheckbox({ size, disabled, intermediate }, [className])}
      ref={innerRef}
    >
      <input
        type="checkbox"
        name={name}
        className={cnCheckbox('Input')}
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
      {label && <span className={cnCheckbox('Label')}>{label}</span>}
    </label>
  );
}
