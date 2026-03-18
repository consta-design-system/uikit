import './ColorPickerInput.css';

import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import { FieldGroup } from '##/components/FieldGroup';
import { TextField } from '##/components/TextFieldCanary';
import { useMutableRef } from '##/hooks/useMutableRef';
import { useRefs } from '##/hooks/useRefs';
import { cn } from '##/utils/bem';

import { HsvaColor } from '../types';
import { equalColorObjects } from '../utils/compare';
import { roundHsva } from '../utils/convert';
import {
  getCountParts,
  getOnBlur,
  getPartName,
  getValue,
  leftSideMap,
  maxMap,
  rightSideMap,
} from './helpers';
import {
  ColorPickerInputComponent,
  ColorPickerInputPartPropOnChange,
  ColorPickerInputProps,
} from './types';

const cnColorPickerInput = cn('ColorPickerInput');

const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur();
  }
};

export const ColorPickerInputRender = <T,>(
  {
    model,
    value = model.defaultColor,
    onChange,
    size,
    disabled,
    format = 'hex',
    alpha,
    id = 'color-picker-input',
    view,
    name = 'color-picker-input',
    form,
    className,
    onFocus,
    onBlur,
    ...otherProps
  }: ColorPickerInputProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const hsva = model.toHsva(value);
  const countParts = getCountParts(format, alpha);
  const refs = useMutableRef([hsva, onChange, onFocus] as const);
  const inputsRefs = useRefs<HTMLInputElement>(countParts);
  const valueRef = useRef(hsva);
  const setValueRef = useCallback((hsva: HsvaColor) => {
    valueRef.current = hsva;
  }, []);

  const handleChange: ColorPickerInputPartPropOnChange = useCallback(
    (value, props) => {
      setValueRef(value);

      if (equalColorObjects(roundHsva(value), roundHsva(refs.current[0])))
        return;

      refs.current[1]?.(model.fromHsva(value), props);
    },
    [],
  );

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.target.select();
      refs.current[2]?.(e);
    },
    [],
  );

  useEffect(() => {
    if (!model.equal(value, model.fromHsva(valueRef.current))) {
      setValueRef(model.toHsva(value));
      inputsRefs.forEach((ref, index) => {
        if (!ref.current) return;
        ref.current.value = getValue(hsva, getPartName(format, index), format);
      });
    }
  }, [value]);

  return (
    <FieldGroup
      {...otherProps}
      ref={ref}
      className={cnColorPickerInput({ view, size }, [className])}
      size={size}
      form={form}
    >
      {Array(countParts)
        .fill(0)
        .map((_, index) => {
          const partName = getPartName(format, index);
          const isHex = partName === 'hex';

          return (
            <TextField
              inputRef={inputsRefs[index]}
              key={`${format}-${partName}`}
              className={cnColorPickerInput('Part', { name: partName, view })}
              view={view}
              form={form}
              size={size}
              disabled={disabled}
              name={`${name}-${partName}`}
              id={`${id}-${partName}`}
              type={isHex ? 'text' : 'number'}
              min={isHex ? undefined : 0}
              max={maxMap[partName]}
              defaultValue={getValue(hsva, partName, format)}
              leftSide={leftSideMap[partName]}
              rightSide={rightSideMap[partName]}
              onBlur={getOnBlur(
                partName,
                format,
                valueRef,
                handleChange,
                onBlur,
              )}
              onKeyUp={onKeyUp}
              onFocus={handleFocus}
            />
          );
        })}
    </FieldGroup>
  );
};

export const ColorPickerInput = forwardRef(
  ColorPickerInputRender,
) as ColorPickerInputComponent;
