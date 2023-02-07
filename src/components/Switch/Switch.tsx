import './Switch.css';

import React, { ChangeEventHandler, useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { cn } from '../../utils/bem';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import {
  switchPropAlignDefault,
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
      onChange,
      onFocus,
      onBlur,
      readOnly,
      required,
      step,
      tabIndex,
      inputRef,
      ...otherProps
    } = usePropsHandler(COMPONENT_NAME, props, switchRef);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) {
        onChange({ e, checked: !checked });
      }
    };

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
  },
);
