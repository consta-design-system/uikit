import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';

import { FieldPropSize } from '../types';
import { cnFieldArrayValueInlineControl } from './cnFieldArrayValueInlineControl';
import {
  FieldArrayValueInlineControlComponent,
  FieldArrayValueInlineControlProps,
} from './types';

const gapMap: Record<FieldPropSize, string> = {
  l: 'calc(var(--space-3xs) + var(--space-2xs))',
  m: 'var(--space-2xs)',
  s: 'var(--space-3xs)',
  xs: 'var(--space-3xs)',
};

const verticalPaddingMap: Record<FieldPropSize, string> = {
  l: 'var(--space-xs)',
  m: 'calc(var(--space-xs) - var(--space-3xs))',
  s: 'var(--space-2xs)',
  xs: 'var(--space-3xs)',
};

const inputHeightMap: Record<FieldPropSize, string> = {
  l: 'var(--space-2xl)',
  m: 'calc(var(--space-2xl) - var(--space-2xs))',
  s: 'var(--space-xl)',
  xs: 'var(--space-l)',
};

const FieldArrayValueInlineControlRender = (
  props: FieldArrayValueInlineControlProps<unknown>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    inputRef: inputRefProp,
    inputMaxLength,
    value,
    renderValue,
    onInputFocus,
    onInputBlur,
    inputAutoFocus,
    inputTabIndex,
    inputAriaLabel,
    onInputKeyDown,
    onInputKeyDownCapture,
    onInputChange,
    onInputKeyUp,
    onInputKeyUpCapture,
    disabled,
    style,
    size = 'm',
    ...otherProps
  } = props;

  const [inputValue, setInputValue] = useState('');
  const onInputChangeRef = useMutableRef(onInputChange);
  const fakeInputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setInputValue(e.target.value);
      onInputChangeRef.current?.(e);
    },
    [],
  );

  useEffect(() => {
    setInputValue(inputRef.current?.value || '');
  }, [inputRef.current?.value]);

  const { width: inputMinWidth } = useComponentSize(fakeInputRef);

  return (
    <div
      {...otherProps}
      className={cnFieldArrayValueInlineControl(null, [className])}
      ref={ref}
      style={{
        ...style,
        ['--field-array-value-inline-control-items-gap' as string]:
          gapMap[size],
        ['--field-array-value-inline-control-input-min-width' as string]: `${inputMinWidth}px`,
        ['--field-array-value-inline-control-vertical-padding' as string]: `${verticalPaddingMap[size]}`,
        ['--field-array-value-inline-control-input-height' as string]: `${inputHeightMap[size]}`,
      }}
    >
      {value.map(renderValue)}
      <input
        className={cnFieldArrayValueInlineControl('Input')}
        onChange={handleChange}
        ref={useForkRef([inputRef, inputRefProp])}
        maxLength={inputMaxLength}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={inputAutoFocus}
        tabIndex={inputTabIndex}
        aria-label={inputAriaLabel}
        onKeyDown={onInputKeyDown}
        onKeyDownCapture={onInputKeyDownCapture}
        onKeyUp={onInputKeyUp}
        onKeyUpCapture={onInputKeyUpCapture}
        disabled={disabled}
        type="text"
      />
      <div
        ref={fakeInputRef}
        className={cnFieldArrayValueInlineControl('HelperInputFakeElement')}
      >
        {inputValue}
      </div>
    </div>
  );
};

export const FieldArrayValueInlineControl = forwardRef(
  FieldArrayValueInlineControlRender,
) as FieldArrayValueInlineControlComponent;
