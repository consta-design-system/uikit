import React, { forwardRef, useCallback, useMemo } from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldCounter,
  FieldInput,
  renderSide,
} from '##/components/FieldComponents';
import { useForkRef } from '##/hooks/useForkRef';
import { useKeys } from '##/hooks/useKeys';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';
import { useSortSteps } from '##/hooks/useSortSteps';

import { TextFieldTypeComponent } from '../types';
import { useTextField } from '../useTextField';
import { cnTextFieldTypeNumber } from './cnTextFieldTypeNumber';
import { getValueByStep, stepIsActive } from './helpers';

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
      view = 'default',
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
      // onKey props
      onKeyDown,
      onKeyDownCapture,
      onKeyUp,
      onKeyUpCapture,
      onCopy,
      onCopyCapture,
      onCut,
      onCutCapture,
      onPaste,
      onPasteCapture,
      onClear,
      onWheel,
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
      onClear,
    });

    const sortSteps = useSortSteps({ step, min, max });

    const refs = useMutableRef([
      sortSteps,
      min,
      max,
      onKeyDown,
      stepIsActive(sortSteps, disabled),
      onWheel,
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
          refs.current[0],
          inputRef.current.value,
          isIncrement,
          refs.current[1],
          refs.current[2],
        );

        mutableRefs.current[0]?.(newValue, { e });

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

    const handleInputKeyDown = useKeys(
      useMemo(
        () => ({
          isActive: true,
          keys: {
            ArrowUp: (e) => {
              e.preventDefault();
              refs.current[4] && changeNumberValue(e, true);
            },
            ArrowDown: (e) => {
              e.preventDefault();
              refs.current[4] && changeNumberValue(e, false);
            },
          },
          onEvent: refs.current[3],
        }),
        [],
      ),
    );

    const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
      if (refs.current[5]) {
        refs.current[5](e);
      } else {
        inputRef.current?.blur();
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
          incrementButtons && refs.current[4] && (
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
          value={value === null ? '' : value}
          ref={useForkRef([inputRefProp, inputRef])}
          readOnly={readOnly}
          tabIndex={tabIndex}
          aria-label={ariaLabel}
          onKeyDown={handleInputKeyDown}
          onKeyDownCapture={onKeyDownCapture}
          onKeyUp={onKeyUp}
          onKeyUpCapture={onKeyUpCapture}
          onWheel={handleWheel}
          maxLength={maxLength}
          disabled={disabled}
          type={type}
          max={max}
          min={min}
          id={id}
          name={name}
          onCopy={onCopy}
          onCopyCapture={onCopyCapture}
          onCut={onCut}
          onCutCapture={onCutCapture}
          onPaste={onPaste}
          onPasteCapture={onPasteCapture}
        />
      </FieldControlLayout>
    );
  },
);
