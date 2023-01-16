import './Radio.css';

import React, { ChangeEventHandler, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

export const radioPropSize = ['m', 'l', 's', 'xs'] as const;
export type RadioPropSize = typeof radioPropSize[number];
export const radioPropSizeDefault: RadioPropSize = radioPropSize[0];

export const radioPropView = ['primary', 'ghost'] as const;
export type RadioPropView = typeof radioPropView[number];
export const radioPropViewDefault: RadioPropView = radioPropView[0];

export const radioPropAlign = ['center', 'top'] as const;
export type RadioPropAlign = typeof radioPropAlign[number];
export const radioPropAlignDefault: RadioPropAlign = radioPropAlign[0];

export type RadioPropOnChange = (object: {
  e: React.ChangeEvent<HTMLInputElement>;
  checked: boolean;
}) => void;

export type Props = {
  checked?: boolean;
  size?: RadioPropSize;
  view?: RadioPropView;
  align?: RadioPropAlign;
  disabled?: boolean;
  className?: string;
  label?: string;
  onChange?: RadioPropOnChange;
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

export type RadioProps = PropsWithHTMLAttributes<Props, HTMLLabelElement>;

export const cnRadio = cn('Radio');

export const COMPONENT_NAME = 'Radio' as const;

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  (props, ref) => {
    const radioRef = useRef<HTMLLabelElement>(null);

    const {
      checked = false,
      name,
      size = radioPropSizeDefault,
      view = radioPropViewDefault,
      align = radioPropAlignDefault,
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
      inputId,
      inputRef,
      ...otherProps
    } = usePropsHandler(COMPONENT_NAME, props, radioRef);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) {
        onChange({ e, checked: !checked });
      }
    };

    return (
      <label
        {...otherProps}
        className={cnRadio({ size, view, disabled, align }, [className])}
        ref={useForkRef([ref, radioRef])}
      >
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
          id={inputId}
          tabIndex={tabIndex}
          ref={inputRef}
        />
        {label && <span className={cnRadio('Label')}>{label}</span>}
      </label>
    );
  },
);
