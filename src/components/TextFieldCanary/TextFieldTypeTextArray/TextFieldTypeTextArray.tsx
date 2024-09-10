import React, { forwardRef, useCallback } from 'react';

import {
  FieldArrayValueInlineControl,
  FieldArrayValueItem,
  FieldClearButton,
  FieldControlLayout,
  FieldInput,
  renderSide,
} from '##/components/Field';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';

import { TextFieldTypeComponent } from '..';
import { useTextField } from '../useTextField';

export const TextFieldTypeTextArray: TextFieldTypeComponent<'textArray'> =
  forwardRef((props, componentRef) => {
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
      // onkey props
      onKeyDown,
      onKeyDownCapture,
      onKeyUp,
      onKeyUpCapture,

      incrementButtons,
      ...otherProps
    } = props;

    const {
      handleBlur,
      handleChange,
      handleClear: inputHandleClear,
      handleFocus,
      focused,
      withValue,
      ref,
      inputRef,
      handleClick,
    } = useTextField({
      onClick,
      onChange: undefined,
      onBlur,
      onFocus,
      disabled,
      id,
      name,
    });

    const mutableRefs = useMutableRef([
      onChange,
      inputHandleClear,
      value,
    ] as const);

    console.log(mutableRefs);

    const getRemoveItem = (index: number) => (e: React.MouseEvent) => {
      if (value?.length) {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange?.(newValue.length ? newValue : null, { e });
      }
    };

    const handleClear = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        mutableRefs.current[1](e);
        if (value?.length) {
          mutableRefs.current[0]?.(null, { e });
        }
      },
      [],
    );

    return (
      <FieldControlLayout
        {...otherProps}
        className={className}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          withClearButton && !disabled && (withValue || value?.length) && (
            <FieldClearButton size={size} onClick={handleClear} />
          ),
          renderSide(rightSide, size, iconSize),
        ]}
        focused={focused}
        view={view}
        ref={useForkRef([componentRef, ref])}
        disabled={disabled}
        onClick={handleClick}
      >
        <FieldArrayValueInlineControl
          size={size}
          inputRef={inputRef}
          value={value ?? []}
          onInputFocus={handleFocus}
          onInputBlur={handleBlur}
          onInputChange={handleChange}
          inputAutoFocus={autoFocus}
          renderValue={(item, index) => (
            <FieldArrayValueItem
              key={index}
              size={size}
              label={item}
              disabled={disabled}
              onRemove={getRemoveItem(index)}
            />
          )}
        />
        {/* <FieldInput
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
          onKeyDown={onKeyDown}
          onKeyDownCapture={onKeyDownCapture}
          onKeyUp={onKeyUp}
          onKeyUpCapture={onKeyUpCapture}
          maxLength={maxLength}
          disabled={disabled}
          type={type}
        /> */}
      </FieldControlLayout>
    );
  });
