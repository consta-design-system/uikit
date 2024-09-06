import React, { forwardRef, useCallback } from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldCounter,
  FieldInput,
  renderSide,
} from '##/components/Field';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';
import { useSortSteps } from '##/hooks/useSortSteps';

import { TextFieldTypeComponent } from '../types';
import { useTextField } from '../useTextField';
import { cnTextFieldTypeNumber } from './cnTextFieldTypeNumber';
import { getIncrementFlag, getValueByStep } from './helpers';

export const TextFieldTypeNumber: TextFieldTypeComponent<'number'> = forwardRef(
  (props, componentRef) => {
    const {
      className,
      value,
      defaultValue,
      onChange,
      id,
      name,
      inputRef: inputRefProp,
      maxLength,
      disabled,
      size = 'm',
      view,
      form,
      status,
      onBlur,
      onFocus,
      autoFocus,
      placeholder,
      leftSide,
      rightSide,
      autoComplete,
      withClearButton,
      readOnly,
      type,
      tabIndex,
      ariaLabel,
      iconSize,
      onClick,
      incrementButtons,
      max,
      min,
      step,
      // onkey props
      onKeyDown,
      onKeyDownCapture,
      onKeyPress,
      onKeyPressCapture,
      onKeyUp,
      onKeyUpCapture,
      ...otherProps
    } = props;

    const {
      handleBlur,
      handleChange,
      handleClear,
      handleFocus,
      focused,
      withValue,
      ref,
      inputRef,
      handleClick,
      mutableRefs,
      setWithValue,
    } = useTextField({
      onClick,
      onChange,
      onBlur,
      onFocus,
      disabled,
      id,
      name,
    });

    const stepsRef = useMutableRef([
      useSortSteps({ step, min, max }),
      min,
      max,
    ] as const);

    const changeNumberValue = useCallback(
      <T extends React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent>(
        e: T,
        isIncrement: boolean,
      ) => {
        if (!inputRef.current || mutableRefs.current[4]) {
          return;
        }

        const newValue = getValueByStep(
          stepsRef.current[0],
          inputRef.current.value,
          isIncrement,
          stepsRef.current[1],
          stepsRef.current[2],
        );

        mutableRefs.current[0]?.(newValue, {
          e,
          id: mutableRefs.current[5],
          name: mutableRefs.current[6],
        });

        inputRef.current.value = newValue;
        setWithValue.on();
      },
      [],
    );

    const handleIncrementButton = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => changeNumberValue(e, true),
      [],
    );

    const handleDecrementButton = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => changeNumberValue(e, false),
      [],
    );

    const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
      const flag = getIncrementFlag(e);

      // onKeyDown?.(e);
      if (typeof flag === 'boolean') {
        e.preventDefault();
        changeNumberValue(e, flag);
      }
    }, []);

    return (
      <FieldControlLayout
        {...otherProps}
        className={cnTextFieldTypeNumber({ incrementButtons }, [className])}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          withClearButton && !disabled && withValue && !incrementButtons && (
            <FieldClearButton size={size} onClick={handleClear} />
          ),
          incrementButtons && !disabled && (
            <FieldCounter
              onIncrementClick={handleIncrementButton}
              onIncrementFocus={handleFocus}
              onDecrementClick={handleDecrementButton}
              onDecrementFocus={handleFocus}
            />
          ),
        ]}
        focused={focused}
        view={view}
        ref={useForkRef([componentRef, ref])}
        disabled={disabled}
        onClick={handleClick}
      >
        <FieldInput
          className={cnTextFieldTypeNumber('Input')}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          defaultValue={defaultValue || undefined}
          value={value || undefined}
          ref={useForkRef([inputRefProp, inputRef])}
          readOnly={readOnly}
          tabIndex={tabIndex}
          aria-label={ariaLabel}
          onKeyDown={handleInputKeyDown}
          onKeyDownCapture={onKeyDownCapture}
          // TODO: разобраться
          onKeyPress={onKeyPress}
          onKeyPressCapture={onKeyPressCapture}
          onKeyUp={onKeyUp}
          onKeyUpCapture={onKeyUpCapture}
          maxLength={maxLength}
          disabled={disabled}
          type={type}
          max={max}
          min={min}
        />
      </FieldControlLayout>
    );
  },
);
