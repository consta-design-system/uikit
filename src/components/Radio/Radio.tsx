import './Radio.css';

import React, { ChangeEventHandler } from 'react';

import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export const radioPropSize = ['m', 'l'] as const;
export type RadioPropSize = typeof radioPropSize[number];
export const radioPropSizeDefault: RadioPropSize = radioPropSize[0];

export type RadioPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

export type Props = {
  checked: boolean | undefined;
  size?: RadioPropSize;
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange: RadioPropOnChange;
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

export type RadioProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const cnRadio = cn('Radio');

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  const {
    checked = false,
    name,
    size = radioPropSizeDefault,
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
    <label {...otherProps} className={cnRadio({ size, disabled }, [className])} ref={ref}>
      <input
        type="radio"
        name={name}
        className={cnRadio('Input', [cnMixFocus()])}
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
      {label && <span className={cnRadio('Label')}>{label}</span>}
    </label>
  );
});
