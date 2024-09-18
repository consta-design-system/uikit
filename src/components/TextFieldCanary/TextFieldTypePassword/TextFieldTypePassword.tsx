import React, { forwardRef } from 'react';

import {
  FieldClearButton,
  FieldControlLayout,
  FieldInput,
  FieldToggleVisiblePasswordButton,
  renderSide,
} from '##/components/Field';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';

import { TextFieldTypeComponent } from '..';
import { useTextField } from '../useTextField';

export const TextFieldTypePassword: TextFieldTypeComponent<'password'> =
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
      // onkey props
      onKeyDown,
      onKeyDownCapture,
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
    } = useTextField({
      onClick,
      onChange,
      onBlur,
      onFocus,
      disabled,
    });

    const [visiblePassword, setVisiblePassword] = useFlag();

    return (
      <FieldControlLayout
        {...otherProps}
        className={className}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          withClearButton && !disabled && withValue && (
            <FieldClearButton size={size} onClick={handleClear} />
          ),
          withValue && (
            <FieldToggleVisiblePasswordButton
              size={size}
              onClick={setVisiblePassword.toggle}
              active={visiblePassword}
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
          type={visiblePassword ? 'text' : 'password'}
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
          id={id}
          name={name}
        />
      </FieldControlLayout>
    );
  });
