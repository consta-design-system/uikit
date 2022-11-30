import './Checkbox.css';

import React, { ChangeEventHandler } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

export const checkboxPropSize = ['m', 'xs', 's', 'l'] as const;
export type CheckboxPropSize = typeof checkboxPropSize[number];
export const checkboxPropSizeDefault: CheckboxPropSize = checkboxPropSize[0];

export const checkboxPropView = ['primary', 'ghost'] as const;
export type CheckboxPropView = typeof checkboxPropView[number];
export const checkboxPropViewDefault: CheckboxPropView = checkboxPropView[0];

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
  view?: CheckboxPropView;
  align?: CheckboxPropAlign;
  disabled?: boolean;
  intermediate?: boolean;
  label?: string;
  onChange?: CheckboxPropOnChange;
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
  for?: string;
  inputId?: string;
};

export type CheckboxProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const COMPONENT_NAME = 'Checkbox' as const;
export const cnCheckbox = cn(COMPONENT_NAME);

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (props, ref) => {
    const checkboxRef = React.useRef<HTMLLabelElement>(null);

    const {
      checked = false,
      name,
      size = checkboxPropSizeDefault,
      view = checkboxPropViewDefault,
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
      inputId,
      inputRef,
      ...otherProps
    } = usePropsHandler(COMPONENT_NAME, props, checkboxRef);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) {
        onChange({ e, checked: !checked });
      }
    };

    return (
      <label
        {...otherProps}
        className={cnCheckbox({ size, view, disabled, intermediate, align }, [
          className,
        ])}
        ref={useForkRef([ref, checkboxRef])}
      >
        <input
          type="checkbox"
          name={name}
          className={cnCheckbox('Input', [cnMixFocus()])}
          checked={checked}
          id={inputId}
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
  },
);
