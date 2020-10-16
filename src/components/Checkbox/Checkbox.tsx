import './Checkbox.css';

import React, { ChangeEventHandler } from 'react';

import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const checkboxPropSize = ['m', 'l'] as const;
export type CheckboxPropSize = typeof checkboxPropSize[number];
export const checkboxPropSizeDefault: CheckboxPropSize = checkboxPropSize[0];

export const checkboxPropAlign = ['center', 'top'] as const;
export type CheckboxPropAlign = typeof checkboxPropAlign[number];
export const checkboxPropAlignDefault: CheckboxPropAlign = checkboxPropAlign[0];

export type CheckboxPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

type Props = {
  checked: boolean | undefined;
  size?: CheckboxPropSize;
  align?: CheckboxPropAlign;
  disabled?: boolean;
  intermediate?: boolean;
  label?: string;
  onChange: CheckboxPropOnChange;
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

export type CheckboxProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const cnCheckbox = cn('Checkbox');

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const {
    checked = false,
    name,
    size = checkboxPropSizeDefault,
    align = checkboxPropAlignDefault,
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
    ...otherProps
  } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({ e, checked: !checked });
  };

  return (
    <label
      {...otherProps}
      className={cnCheckbox({ size, disabled, intermediate, align }, [className])}
      ref={ref}
    >
      <input
        type="checkbox"
        name={name}
        className={cnCheckbox('Input', [cnMixFocus()])}
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
      {label && <span className={cnCheckbox('Label')}>{label}</span>}
    </label>
  );
});
