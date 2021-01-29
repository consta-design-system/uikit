import './Switch.css';

import React, { ChangeEventHandler } from 'react';

import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const switchPropSize = ['m', 's', 'l'] as const;
export type SwitchPropSize = typeof switchPropSize[number];
export const switchPropSizeDefault: SwitchPropSize = switchPropSize[0];

export const switchPropView = ['primary', 'ghost'] as const;
export type SwitchPropView = typeof switchPropView[number];
export const switchPropViewDefault: SwitchPropView = switchPropView[0];

export const switchPropAlign = ['center', 'top'] as const;
export type SwitchPropAlign = typeof switchPropAlign[number];
export const switchPropAlignDefault: SwitchPropAlign = switchPropAlign[0];

export type SwitchPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

type Props = {
  checked: boolean | undefined;
  size?: SwitchPropSize;
  view?: SwitchPropView;
  align?: SwitchPropAlign;
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange?: SwitchPropOnChange;
  name?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  children?: never;
};

export type SwitchProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const cnSwitch = cn('Switch');

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>((props, ref) => {
  const {
    checked = false,
    name,
    size = switchPropSizeDefault,
    view = switchPropViewDefault,
    align = switchPropAlignDefault,
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
    if (onChange) {
      onChange({ e, checked: !checked });
    }
  };

  return (
    <label
      {...otherProps}
      className={cnSwitch({ size, view, disabled, align }, [className])}
      ref={ref}
    >
      <input
        type="checkbox"
        name={name}
        className={cnSwitch('Input', [cnMixFocus()])}
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
