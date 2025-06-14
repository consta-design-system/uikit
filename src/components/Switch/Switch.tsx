import './Switch.css';

import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import {
  switchPropAlignDefault,
  switchPropOnChangeDefault,
  SwitchProps,
  switchPropSizeDefault,
  switchPropViewDefault,
} from './types';

export const cnSwitch = cn('Switch');

export const COMPONENT_NAME = 'Switch' as const;

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  (props, ref) => {
    const switchRef = useRef<HTMLLabelElement>(null);
    const {
      checked = false,
      name,
      size = switchPropSizeDefault,
      view = switchPropViewDefault,
      align = switchPropAlignDefault,
      disabled,
      className,
      label,
      onChange = switchPropOnChangeDefault,
      onFocus,
      onBlur,
      readOnly,
      required,
      step,
      tabIndex,
      inputRef,
      inputId,
      ...otherProps
    } = usePropsHandler(COMPONENT_NAME, props, switchRef);

    return (
      <label
        {...otherProps}
        className={cnSwitch({ size, view, disabled, align }, [className])}
        ref={useForkRef([switchRef, ref])}
      >
        <input
          type="checkbox"
          name={name}
          className={cnSwitch('Input', [cnMixFocus()])}
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
          id={inputId}
        />
        {label && <span className={cnSwitch('Label')}>{label}</span>}
      </label>
    );
  },
);
