import './Switch.css';

import React, { ChangeEventHandler } from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type SwitchPropSize = 'm' | 'l';

export type SwitchPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

type Props = {
  checked: boolean | undefined;
  size?: SwitchPropSize;
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange: SwitchPropOnChange;
  name?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
};

export type SwitchProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const cnSwitch = cn('Switch');

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>((props, ref) => {
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
    ...otherProps
  } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({ e, checked: !checked });
  };

  return (
    <label {...otherProps} className={cnSwitch({ size, disabled }, [className])} ref={ref}>
      <input
        type="checkbox"
        name={name}
        className={cnSwitch('Input')}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
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
});
